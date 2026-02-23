import { BackLink } from '@/components/BackLink';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Skeleton from '@/components/Skeleton';
import { SuspendedItem } from '@/components/SuspendedItem';
import { ActionButton } from '@/components/ui/action-button';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { db } from '@/drizzle/db';
import { generateInterviewFeedback } from '@/features/interviews/actions';
import { getInterviewIdTag } from '@/features/interviews/dbCache';
import { getJobInfoIdTag } from '@/features/jobinfos/dbCache';
import formatDateTime from '@/lib/formatDateTime';
import { CondensedMessages } from '@/services/clerk/components/Hume/components/CondensedMessages';
import { fetchChatMessages } from '@/services/clerk/components/Hume/lib/api';
import { condenseChatMessages } from '@/services/clerk/components/Hume/lib/condesedChatMessages';
import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser';
import { Loader2Icon } from 'lucide-react';
import { cacheTag } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

const InterviewPage = async ({params} : {params : Promise<{jobInfoId : string , interviewId : string}>}) => {

  const {jobInfoId , interviewId } = await params;
  const interview =  getCurrentUser().then( async({userId , redirectToSignIn})=>{
    if(userId == null) return redirectToSignIn()

      const interview = await getInterview(interviewId ,userId)
      if(interview == null) return notFound()
return interview

  })
  return (
    <div className='container my-4 space-y-4'>
      <BackLink href={`/app/job-infos/${jobInfoId}/interviews`}>
        All Interview
      </BackLink>
      <div className='container spac-y-6'>
        <div className='flex gap-2 justify-between'>
          <div className='space-y-2 mb-6'>
            <h1>Interview : 
              <SuspendedItem item={interview} fallback={<Skeleton className='w-48'/> } result={i => formatDateTime(i.createdAt)}/>
            </h1>

            <p className="text-muted-foreground">
            <SuspendedItem item={interview} fallback={<Skeleton className='w-24'/> } result={i =>i.duration}/>
            </p>
          </div>
          <SuspendedItem item={interview} fallback={<Skeleton className='w-32'/> } result={i =>
            i.feedback==null ?(
              // TODO : Feedback Generation
                <ActionButton action={generateInterviewFeedback.bind(null ,i.id)}>Generate Feedback </ActionButton>
            ):(
            <Dialog>
              <DialogTrigger asChild>
                <Button>View FeedBack</Button>
              </DialogTrigger>
              <DialogContent className='md:max-w-3xl lg:max-w-4xl max-h-[calc(100%-2rem)]  overflow-y-auto flex flex-col '>
                <DialogTitle>Feedback</DialogTitle>
                <MarkdownRenderer >
                  {i.feedback}
                </MarkdownRenderer>
              </DialogContent>
            </Dialog>
            )}/>

        </div>

        <Suspense fallback={<Loader2Icon className='animate-spin size-24'/>}>
            <Messages interview = {interview} />
        </Suspense>
      </div>
    </div>
  )
}


export default InterviewPage

async function getInterview(id: string, userId: string) {
  "use cache"
  cacheTag(getInterviewIdTag(id))

  const interview = await db.query.InterviewTable.findFirst({
    where: (InterviewTable, { eq }) => eq(InterviewTable.id, id),
    with: {
      jobInfos: {
        columns: {
          id: true,
          userId: true,
        },
      },
    },
  })

  if (interview == null) return null

  cacheTag(getJobInfoIdTag(interview.jobInfos.id))

  if (interview.jobInfos.userId !== userId) return null

  return interview
}

async function Messages({
  interview 
} : {interview : Promise<{humeChatId : string | null}>}){
const {user , redirectToSignIn} = await getCurrentUser({allData:true})

if(user == null) return redirectToSignIn()
const {humeChatId} = await interview
if(humeChatId == null) return notFound()
const condesedMessages = condenseChatMessages(await fetchChatMessages(humeChatId))
  return <CondensedMessages messages = {condesedMessages} user = {user} className='max-w-5xl mx-auto' /> 

}

