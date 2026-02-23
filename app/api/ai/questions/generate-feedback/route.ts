import { db } from "@/drizzle/db"
import { JobInfoTable, QuestionTable } from "@/drizzle/schema"
import { getJobInfoIdTag } from "@/features/jobinfos/dbCache"
import { getQuestionIdTag } from "@/features/questions/dbCache"
import { canCreateQuestion } from "@/features/questions/permissions"
import { PLAN_LIMIT_MESSAGE } from "@/lib/errorToast"
import { generateAIFeedback } from "@/services/clerk/ai/feedback"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { eq } from "drizzle-orm"
import { cacheTag } from "next/cache"
import z from "zod"

const schema = z.object({
    answer: z.string().min(1),
    questionId: z.string().min(1)
})

export async function POST(req: Request) {
    const body = await req.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
        return Response.json({ error: "Invalid request data" }, { status: 400 })
    }
    
    const { answer, questionId } = result.data 
    const { userId } = await getCurrentUser()

    if (userId == null) {
        return Response.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    if (!(await canCreateQuestion())) {
        return Response.json({ error: PLAN_LIMIT_MESSAGE }, { status: 403 })
    }
    
    const question = await getQuestion(questionId, userId)

    if (question == null) {
        return Response.json({ error: "Question not found or unauthorized" }, { status: 404 })
    }

    try {
        // Generate feedback (non-streaming)
        const feedbackText = await generateAIFeedback({
            question: question.text,
            answer: answer,
            difficulty: question.difficulty,
        })

        // Return the feedback
        return Response.json({ 
            feedback: feedbackText
        })
    } catch (error) {
        console.error("Error generating feedback:", error)
        return Response.json({ 
            error: "Failed to generate feedback" 
        }, { status: 500 })
    }
}
async function getQuestion(id: string, userId: string) {
    "use cache"
    cacheTag(getQuestionIdTag(id))

    const question = await db.query.QuestionTable.findFirst({
        where: eq(QuestionTable.id, id),
        with: {
            jobInfo: {
                columns: {
                    id: true,
                    userId: true,
                    description: true,
                    experienceLevel: true,
                    title: true,
                }
            }
        }
    })
    
    if (question == null) return null
    
    // Add cache tag for jobInfo AFTER confirming question exists
    cacheTag(getJobInfoIdTag(question.jobInfo.id))

    // Check authorization
    if (question.jobInfo.userId !== userId) return null
    
    return question
}