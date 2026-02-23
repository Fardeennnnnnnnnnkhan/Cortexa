import { db } from '@/drizzle/db';
import { JobInfoTable } from '@/drizzle/schema';
import { getJobInfoIdTag } from '@/features/jobinfos/dbCache';
import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser';
import { and, eq } from 'drizzle-orm';
import { Loader2Icon } from 'lucide-react'
import { cacheTag } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import  { Suspense } from 'react'
import {fetchAccessToken} from 'hume'
import { VoiceProvider } from "@humeai/voice-react";
import StartCall from './_StartCall';
import { canCreateInterview } from '@/features/interviews/permissions';

const NewInterviewPage = async ({params}  : {params : Promise<{jobInfoId : string}>}) => {
    const {jobInfoId } = await params;
  return (
    <Suspense
    fallback={
    <div className='h-screen-header flex items-center justify-center '>
        <Loader2Icon className='size-24 animate-spin m-auto'/>
    </div>
}
    >
     <SuspendedComponent jobInfoId = {jobInfoId}/>
    </Suspense>

  )
}
export default NewInterviewPage
async function SuspendedComponent({jobInfoId}  : {jobInfoId : string}){
    const {userId , redirectToSignIn , user}  = await getCurrentUser({allData  :true})
    if(userId == null || user == null) return redirectToSignIn() 

    if(!await canCreateInterview())return redirect('/app/upgrade')
    
    const jobInfo = await getJobInfo(jobInfoId ,userId)
    if(jobInfo == null) return notFound()
      
    const accessToken = await fetchAccessToken({
        apiKey: String(process.env.HUME_API_KEY),
        secretKey: String(process.env.HUME_SECRET_KEY),
    });

return  (
<VoiceProvider>
    <StartCall jobInfo= {jobInfo} user = {user} accessToken = {accessToken}/>
</VoiceProvider>
)
}

async function getJobInfo(id : string , userId : string){
    "use cache"
    cacheTag(getJobInfoIdTag(id))

    return db.query.JobInfoTable.findFirst({
        where : and(eq(JobInfoTable.id , id) , eq(JobInfoTable.userId , userId)),
    })
}

