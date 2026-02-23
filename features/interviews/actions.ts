"use server"

import { getJobInfoTag } from "@/lib/dataCache"
import { getCurrentUser } from "@/services/clerk/components/lib/getCurrentUser"
import { cacheTag, revalidatePath } from "next/cache"
import { getJobInfoIdTag } from "../jobinfos/dbCache"
import { db } from "@/drizzle/db"
import { and, eq } from "drizzle-orm"
import { JobInfoTable } from "@/drizzle/schema"
import { insertInterview, updateInterview as updateInterviewDb } from "./db"
import { getInterviewIdTag } from "./dbCache"
import { canCreateInterview } from "./permissions"
import { PLAN_LIMIT_MESSAGE, RATE_LIMIT_MESSAGE } from "@/lib/errorToast"
import { env } from "@/data/env/server"
import arcjet, { tokenBucket, request } from "@arcjet/next"
import { generateAIInterviewFeedback } from "@/services/clerk/ai/interview"


const aj = arcjet({
    characteristics: ['userId'],
    key: env.ARCJET_KEY,
    rules: [
        tokenBucket({
            capacity: 20,
            refillRate: 4,
            interval: "1d",
            mode: "LIVE",
        })
    ],

})
// Create Interview
export async function CreateInterview({ jobInfoId }: {
    jobInfoId: string
}): Promise<{ error: true; message: string } | { error: false; id: string }> {
    const { userId } = await getCurrentUser()
    if (userId == null) {
        return {
            error: true,
            message: "You Don't have permission to do this "
        }
    }

    // Permissions
    if (!await canCreateInterview()) {
        return {
            error: true,
            message: PLAN_LIMIT_MESSAGE,
        }
    }

    // Rate Limit 
    const decision = await aj.protect(await request(), {
        userId,
        requested: 1,

    })

    if (decision.isDenied()) {
        return {
            error: true,
            message: RATE_LIMIT_MESSAGE,
        }
    }

    // Jobinfo
    const Jobinfo = await getJobInfo(jobInfoId, userId);
    if (Jobinfo == null) {
        return {
            error: true,
            message: "Job Info Not Found or you dont have permissions ",
        }
    }


    // Create Interview in the Database
    const interview = await insertInterview({ jobInfoId, duration: "00:00:00" })

    return {
        error: false,
        id: interview.id
    }
}

// Update Interview
export async function UpdateInterview(
    id: string,
    data: {
        humeChatId?: string,
        duration?: string,

    }
) {
    const { userId } = await getCurrentUser()
    if (userId == null) {
        return {
            error: true,
            message: "You Don't have permission to do this "
        }
    }

    const interview = await getInterview(id, userId)
    if (interview == null) {
        return {
            error: true,
            message: "You don't have permission to do this"
        }
    }
    await updateInterviewDb(id, data)

    return { error: false }
}

export async function generateInterviewFeedback(interviewId: string) {
    const { userId, user } = await getCurrentUser({ allData: true })
    if (userId == null || user == null) {
        return {
            error: true,
            message: "You Don't have permission to do this "
        }
    }

    const interview = await getInterview(interviewId, userId)
    if (interview == null) {
        return {
            error: true,
            message: "You Don't have permission to do this "
        }
    }

    if (interview.humeChatId == null) {
        return {
            error: true,
            message: "Interview has not been completed yet",
        }
    }

    const feedback = await generateAIInterviewFeedback({
        humeChatId: interview.humeChatId,
        jobInfo: interview.jobInfos,
        userName: user.name,
    })

    if (feedback == null) {
        return {
            error: true,
            message: "Failed to generate feedback",
        }
    }

    await updateInterviewDb(interviewId, { feedback })

    revalidatePath(`/app/job-infos/${interview.jobInfos.id}/interviews/${interviewId}`)
    return { error: false }

}
async function getJobInfo(id: string, userId: string) {
    "use cache"
    cacheTag(getJobInfoIdTag(id))

    return db.query.JobInfoTable.findFirst({
        where: and(eq(JobInfoTable.id, id), eq(JobInfoTable.userId, userId))
    })
}

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
                    description: true,
                    title: true,
                    experienceLevel: true,
                },
            },
        },
    })

    if (interview == null) return null

    cacheTag(getJobInfoIdTag(interview.jobInfos.id))

    if (interview.jobInfos.userId !== userId) return null

    return interview
}


