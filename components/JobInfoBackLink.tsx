import React, { Suspense } from 'react'
import { BackLink } from './BackLink'
import { cn } from '@/lib/utils'
import { getJobInfoIdTag } from '@/features/jobinfos/dbCache'
import { cacheTag } from 'next/cache'
import { db } from '@/drizzle/db'
import { eq } from 'drizzle-orm'
import { JobInfoTable } from '@/drizzle/schema'

const JobInfoBackLink = ({jobInfoId ,  className} : {jobInfoId : string , className?: string}) => {
  return (
   <BackLink
   href={`/app/job-infos/${jobInfoId}`}
   className={cn("mb-4 " , className)}
   >
    <Suspense>
        <JobName jobInfoId={jobInfoId}/>
    </Suspense>
    Job Description
   </BackLink>
  )
}

export default JobInfoBackLink


async function JobName({jobInfoId} : {jobInfoId : string}){
    const jobInfo = await getJobInfo(jobInfoId)

    return jobInfo?.name ?? "Job Description"
}

async function getJobInfo(id : string){
    "use cache"
    cacheTag(getJobInfoIdTag(id))
    return db.query.JobInfoTable.findFirst({
        where:eq(JobInfoTable.id , id),
    })

}