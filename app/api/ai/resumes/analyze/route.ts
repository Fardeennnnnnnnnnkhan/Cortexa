import { Toaster } from "@/components/ui/sonner"
import { db } from "@/drizzle/db"
import { JobInfoTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
import { canRunResumeAnalysis } from "@/features/resume/permissions"
import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { analyzeResumeForJob } from "@/services/resumes/ai"
import { and, eq } from "drizzle-orm"
import { cacheTag } from "next/cache"

export async function POST(req: Request) {
    
    const { userId } = await getCurrentUser()

    if (userId == null) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    const formData = await req.formData()
    const resumeFile = formData.get("resumeFile") as File
    const jobInfoId = formData.get("jobInfoId") as string
    
   if(!resumeFile || !jobInfoId){
    return Response.json({ error: "Invalid request data" }, { status: 400 })
   }

   if (resumeFile.size > 10 * 1024 * 1024) { 
         return new Response("File size exceeds 10MB limit", { status: 400 })
   }
   
       const allowedTypes = [
         "application/pdf",
         "application/msword",
         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
         "text/plain",
       ]
   
       if (!allowedTypes.includes(resumeFile.type)) {
         return new Response("Please upload a PDF, Word document, or text file", { status: 400 })
       }
   
const jobInfo = await getJobInfo(jobInfoId, userId)
if(jobInfo == null){
    return new Response("Job info not found", { status: 404 })
}   

   if(!(await canRunResumeAnalysis())){
    return new Response(PLAN_LIMIT_MESSAGE , {status : 403} )
   }

   const res = await  analyzeResumeForJob({
    resumeFile,
    jobInfo
})

return res.toTextStreamResponse()
}

async function getJobInfo(id :string , userId: string){
  "use cache"
  cacheTag(getJobInfoIdTag(id))
  await new Promise(resolve=>setTimeout(resolve,2000))
  return db.query.JobInfoTable.findFirst({
    where:and(eq(JobInfoTable.id ,id),eq(JobInfoTable.userId ,userId))  
  })
}