import { db } from "@/drizzle/db";
import { JobInfoTable, QuestionTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { revalidateQuestionCache } from "./dbCache";


export async function insertQuestion( questions : typeof QuestionTable.$inferInsert){
    const [newQuestion] = await db.insert(QuestionTable).values(questions).returning({
        id:QuestionTable.id,
        jobInfoId : QuestionTable.jobInfoId,
    })
    revalidateQuestionCache({id : newQuestion.id , jobInfoId  : newQuestion.jobInfoId})
    
    return newQuestion
}
