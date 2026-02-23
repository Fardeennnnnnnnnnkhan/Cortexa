import {pgTable, uuid, varchar} from "drizzle-orm/pg-core"
import { createdAt, id, updatedAt } from "../SchemaHelper"
import { relations } from "drizzle-orm"
import { JobInfoTable } from "./jobInfo"

export const InterviewTable = pgTable("interviews" , {
    id,
    jobInfoId:uuid().references(()=> JobInfoTable.id , {onDelete : "cascade"}).notNull(),
    duration:varchar().notNull(),
    humeChatId:varchar(),
    feedback:varchar(),
    createdAt,
    updatedAt,
})

export const InterviewRelations = relations(InterviewTable , ({one})=>({
    jobInfos : one(JobInfoTable, {
        fields : [InterviewTable.jobInfoId],
        references : [JobInfoTable.id],
    }),
}))