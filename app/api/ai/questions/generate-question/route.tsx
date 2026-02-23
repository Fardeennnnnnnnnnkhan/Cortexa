// import { db } from "@/drizzle/db"
// import { JobInfoTable, questionDifficulties, QuestionTable } from "@/drizzle/schema"
// import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
// import { insertQuestion } from "@/features/questions/db"
// import { getQuestionJobInfoTag } from "@/features/questions/dbCache"
// import { canCreateQuestion } from "@/features/questions/permissions"
// import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
// import { generateAIQuestion } from "@/services/clerk/ai/question"
// import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
// import { and, asc, eq } from "drizzle-orm"
// import { cacheTag } from "next/cache"
// import z from "zod"
// import { createDataStreamResponse } from "ai"

// const schema = z.object({
//     prompt : z.enum(questionDifficulties),
//     jobInfoId : z.string().min(1)
// })
// export async function POST(req : Request){
//     const body = await req.json()
//     const result = schema.safeParse(body)
//     if(!result.success){
//         return new Response(JSON.stringify({error : "Error Generating Question"}) , {status : 400})
//     }
//     const {prompt: difficulty , jobInfoId} = result.data 
//     const {userId} = await getCurrentUser()

//     if(userId == null){
//         return new Response('You are not logged in' , {status : 401}    )
//     }
    
//     if(!(await canCreateQuestion())){
//         return new Response(PLAN_LIMIT_MESSAGE , {status : 403})
//     }
    

//     const jobInfo = await getJobInfo(jobInfoId , userId)

//     if(jobInfo == null){
//         return new Response('Job Info not found' , {status : 404})
//     }

//     const previousQuestions = await  getQuestions(jobInfoId)

//     return createDataStreamResponse({
//         execute: async (dataStream) => {
//             const res = generateAIQuestion({
//                 previousQuestions,
//                 difficulty,
//                 jobInfo,
//                 onFinish: async (question) => {
//                     const { id } = await insertQuestion({ text: question, jobInfoId, difficulty });
//                     dataStream.writeData({ questionId: id });
//                 },
//             });

//             res.mergeIntoDataStream(dataStream);
//         },
//     });
// }

// async function getQuestions(jobInfoId: string) {
//   "use cache";

//   cacheTag(getQuestionJobInfoTag(jobInfoId));

//   return db.query.QuestionTable.findMany({
//     where: eq(QuestionTable.jobInfoId, jobInfoId),
//     orderBy: asc(QuestionTable.createdAt),
//   });
// }


// async function getJobInfo(id :string , userId: string){
//   "use cache"
//   cacheTag(getJobInfoIdTag(id))
//   await new Promise(resolve=>setTimeout(resolve,2000))
//   return db.query.JobInfoTable.findFirst({
//     where:and(eq(JobInfoTable.id ,id),eq(JobInfoTable.userId ,userId))  
//   })
// }

// Claude Fix :
import { db } from "@/drizzle/db"
import { JobInfoTable, questionDifficulties, QuestionTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
import { insertQuestion } from "@/features/questions/db"
import { getQuestionJobInfoTag } from "@/features/questions/dbCache"
import { canCreateQuestion } from "@/features/questions/permissions"
import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
import { generateAIQuestionNonStreaming } from "@/services/clerk/ai/question"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { and, asc, eq } from "drizzle-orm"
import { cacheTag } from "next/cache"
import z from "zod"

const schema = z.object({
    difficulty: z.enum(questionDifficulties),
    jobInfoId: z.string().min(1)
})

export async function POST(req: Request) {
    const body = await req.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
        return Response.json({ error: "Invalid request data" }, { status: 400 })
    }
    
    const { difficulty, jobInfoId } = result.data 
    const { userId } = await getCurrentUser()

    if (userId == null) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    if (!(await canCreateQuestion())) {
        return Response.json({ error: PLAN_LIMIT_MESSAGE }, { status: 403 })
    }
    
    const jobInfo = await getJobInfo(jobInfoId, userId)

    if (jobInfo == null) {
        return Response.json({ error: "Job info not found" }, { status: 404 })
    }

    const previousQuestions = await getQuestions(jobInfoId)

    try {
        // Generate the question (non-streaming)
        const questionText = await generateAIQuestionNonStreaming({
            previousQuestions,
            difficulty,
            jobInfo,
        })

        // Insert the question into the database
        const newQuestion = await insertQuestion({ 
            text: questionText, 
            jobInfoId, 
            difficulty 
        })

        // Return both the question text and the ID
        return Response.json({ 
            question: questionText,
            questionId: newQuestion.id 
        })
    } catch (error) {
        console.error("Error generating question:", error)
        return Response.json({ 
            error: "Failed to generate question" 
        }, { status: 500 })
    }
}

async function getQuestions(jobInfoId: string) {
    "use cache"
    cacheTag(getQuestionJobInfoTag(jobInfoId))

    return db.query.QuestionTable.findMany({
        where: eq(QuestionTable.jobInfoId, jobInfoId),
        orderBy: asc(QuestionTable.createdAt),
    })
}

async function getJobInfo(id: string, userId: string) {
    "use cache"
    cacheTag(getJobInfoIdTag(id))
    
    return db.query.JobInfoTable.findFirst({
        where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId))  
    })
}