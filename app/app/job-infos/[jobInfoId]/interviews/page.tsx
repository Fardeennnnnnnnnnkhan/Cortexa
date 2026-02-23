import JobInfoBackLink from '@/components/JobInfoBackLink'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/drizzle/db'
import { InterviewTable } from '@/drizzle/schema'
import { getInterviewJobInfo } from '@/features/interviews/dbCache'
import { getJobInfoIdTag } from '@/features/jobinfos/dbCache'
import formatDateTime from '@/lib/formatDateTime'
import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser'
import { and, desc, eq, isNotNull } from 'drizzle-orm'
import { ArrowRightIcon, Loader2Icon, PlusIcon } from 'lucide-react'
import { cacheTag } from 'next/cache'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import  { Suspense } from 'react'

const InterviewPage = async ({params} : {params : Promise<{jobInfoId : string}>}) => {

    const {jobInfoId} = await params
  return (
    <div className="container py-4 space-y-4 h-screen-header flex flex-col items-start">
    <JobInfoBackLink jobInfoId={jobInfoId} />
    <Suspense
    fallback={<Loader2Icon className='size-24 animate-spin m-auto'/>}
    >

     <SuspendedPage jobInfoId = {jobInfoId}/>
    </Suspense>

  </div>
  )
}

export default InterviewPage


async function SuspendedPage({jobInfoId} : {jobInfoId : string}){
    const {userId ,redirectToSignIn } = await getCurrentUser()
    if(userId == null) return redirectToSignIn()
    const interviews = await getInterviews(jobInfoId , userId)

    if(interviews.length === 0){
        return redirect(`/app/job-infos/${jobInfoId}/interviews/new`)
    }
    await new Promise(resolve => setTimeout(resolve , 2000))
    return (
      <div className="container my-4 spac-y-6">
      <div className="flex gap-2 justify-between ">
        <h1 className="text-md md:text-4xl lg:text-3xl ">
       Interviews
        </h1>
  
        <Button asChild>
          <Link href={`/app/job-infos/${jobInfoId}/interviews/new`}>
            <PlusIcon />
            New Interview
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 has-hover:*:not-hover:opacity-70">
      <Link className="transition-opacity" href = { `/app/job-infos/${jobInfoId}/interviews/new` } >
<Card className="h-full flex items-center justify-center border-dashed border-3 bg-transparent hover:border-primary/50 transition-colors shadow-none">
<div className="text-lg flex items-center gap-2 justify-center">

    <PlusIcon className="size-6 mb-2" />
    <p className="">New Interview</p>
</div>

</Card>
</Link>

        {interviews.map((interview)=>(
          <Link className="hover:scale-[1.02] transition-[transform_opacity] " href={`/app/job-infos/${jobInfoId}/interviews/${interview.id}`} key={interview.id}>
          <Card className="h-full">
<div className="flex items-center justify-between h-full">

    <CardHeader className='gap-1 flex-grow'>
      <CardTitle className="text-lg">{formatDateTime(interview.createdAt)}</CardTitle>
      <CardDescription className=''>{interview.duration}</CardDescription>
    </CardHeader>
  </div>

  <CardContent>
    <ArrowRightIcon className="size-6" />
  </CardContent>
</Card>

          </Link>
        ))}
  
      </div>
    </div>
    )
    
    
}

async function   getInterviews(jobInfoId : string , userId  : string){
    "use cache"
    cacheTag(getInterviewJobInfo(jobInfoId))
    cacheTag(getJobInfoIdTag(jobInfoId))

   const data =  await db.query.InterviewTable.findMany({
        where:and(
            eq(InterviewTable.jobInfoId , jobInfoId),
            isNotNull(InterviewTable.humeChatId)
        ),
        with: {
            jobInfos: {
              columns: { userId: true },
            },
          },
        orderBy : desc(InterviewTable.updatedAt),
    })
    
    return data.filter(interview => interview.jobInfos.userId === userId)
}