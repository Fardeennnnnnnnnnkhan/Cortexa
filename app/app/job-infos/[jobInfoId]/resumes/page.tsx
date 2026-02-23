import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
import { canCreateQuestion } from "@/features/questions/permissions"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { and, eq } from "drizzle-orm"
import { Loader2Icon } from "lucide-react"
import { cacheTag } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { Suspense } from "react"
import JobInfoBackLink from "@/components/JobInfoBackLink"
import { canRunResumeAnalysis } from "@/features/resume/permissions"
import { ResumePageClient } from "./_client"



export default async function ResumePage(
    {params}: {params: Promise<{jobInfoId : string}>}
){
    const {jobInfoId} = await params

    return (
        <div className="container my-4 space-y-4 h-screen-header flex flex-col items-start ">
           <JobInfoBackLink jobInfoId={jobInfoId}/>
            <Suspense fallback={<div className="">
                    <Loader2Icon className="animate-spin size-24 my-auto"/>
                </div>}>
                    <SuspendedComponented jobInfoId = {jobInfoId} />
            </Suspense>
        </div>
    )
} 

async function SuspendedComponented({jobInfoId}: {jobInfoId: string}){

    if(! await canRunResumeAnalysis()) return redirect('/app/upgrade')


    return <ResumePageClient jobInfoId={jobInfoId}/>
            
}   
