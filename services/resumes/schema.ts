import z from "zod"

const categorySchema = z.object({
    score: z.number().min(0).max(10).describe("Score of teh Category from 1-10"),
    summary: z.string().describe("Short Summary of the category"),
    feedback:z.array(z.object({
        type : z.enum(["strength", 'minor-improvement','major-improvement']),
        name:z.string().describe("Name of the feedback"),
        message:z.string().describe("Message for the feedback"),
    })).describe("Specific feedback on positives and negatives "),  
})      

export const aiAnalyzeSchema = z.object({
    overallScore: z.number().min(0).max(10).describe('Overall score of the resume'),
    ats: categorySchema.describe(
        "Analysis of how well the resume matches ATS requirements"
    ),
    jobMatch: categorySchema.describe(
        "Analysis of how well the resume matches the job requirements"
    ),
    writingAndFormatting: categorySchema.describe(
        "Analysis of the writing quality and formatting of the resume (taking into account of the job requirements)"
    ),
    keywordCoverage: categorySchema.describe(
        "Analysis of the key coverage in the resume (taking into account the job requirements)"
    ),
    other: categorySchema.describe(
        "Any other relevant analysis not covered by the above categories"
    ),
    
})  