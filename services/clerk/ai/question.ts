// import { JobInfoTable, questionDifficulty, QuestionTable } from "@/drizzle/schema"
// import { google } from "@ai-sdk/google"
// import { generateText, streamText } from 'ai'
// import { ModelMessage } from 'ai';

// export function generateAIQuestion({
//     jobInfo,
//     previousQuestions,
//     difficulty,
//     onFinish,
// }: {
//     jobInfo: typeof JobInfoTable.$inferSelect
//     previousQuestions: (typeof QuestionTable.$inferSelect)[]
//     difficulty: questionDifficulty
//     onFinish: (question: string) => void | Promise<void>
// }) {

//     const previousMessages: ModelMessage[] = previousQuestions.flatMap((q) => [
//         { role: "user", content: q.difficulty },
//         { role: "assistant", content: q.text },
//     ]);

//     return streamText({
//         model: google("gemini-2.5-flash"),
//         onFinish: ({ text }) => onFinish(text),
//         messages: [
//             ...previousMessages,
//             {
//                 role: "user",
//                 content: difficulty,
//             },
//         ],
//         // maxSteps: 10,
//         // experimental_continueSteps: true,
//         system: `
// You are an AI assistant that creates technical interview questions tailored to a specific job role. Your task is to generate one "realistic and relevant" technical question that matches the skill requirements of the job and aligns with the difficulty level provided by the user.

// Job Information:

// Job Description: \`${jobInfo.description}\`
// Experience Level: \`${jobInfo.experienceLevel}\`
// ${jobInfo.title ? `\nJob Title: \`${jobInfo.title}\`` : ""}

// Guidelines:

// - The question must reflect the skills and technologies mentioned in the job description.
// - Make sure the question is appropriately scoped for the specified experience level.
// - A difficulty level of "easy", "medium", or "hard" is provided by the user and should be used to tailor the question.
// - Prefer practical, real-world challenges over trivial questions.
// - Return only one question, clearly formatted (e.g., with code snippets or bullet points if needed). Do not include the answer.
// - Return only one question at a time.
// - It is OK to ask a question about just a single part of the job description, such as a specific technology or skill (e.g., if the job description is for a Next.js, Drizzle, and TypeScript developer, you can ask a TypeScript-only question).
// - The question should be formatted as markdown.
// - Stop generating output as soon as you have provided the full question.
// `,
//     });


// }

// Claude Fix :

import { JobInfoTable, questionDifficulty, QuestionTable } from "@/drizzle/schema"
import { google } from "@ai-sdk/google"
import { generateText } from 'ai'

export async function generateAIQuestionNonStreaming({
    jobInfo,
    previousQuestions,
    difficulty,
}: {
    jobInfo: typeof JobInfoTable.$inferSelect
    previousQuestions: (typeof QuestionTable.$inferSelect)[]
    difficulty: questionDifficulty
}): Promise<string> {

    const previousMessages = previousQuestions.flatMap((q) => [
        { role: "user" as const, content: q.difficulty },
        { role: "assistant" as const, content: q.text },
    ])

    const result = await generateText({
        model: google("gemini-2.5-flash"),
        messages: [
            ...previousMessages,
            {
                role: "user",
                content: difficulty,
            },
        ],
        system: `
You are an AI assistant that creates technical interview questions tailored to a specific job role. Your task is to generate one "realistic and relevant" technical question that matches the skill requirements of the job and aligns with the difficulty level provided by the user.

Job Information:

Job Description: \`${jobInfo.description}\`
Experience Level: \`${jobInfo.experienceLevel}\`
${jobInfo.title ? `\nJob Title: \`${jobInfo.title}\`` : ""}

Guidelines:

- The question must reflect the skills and technologies mentioned in the job description.
- Make sure the question is appropriately scoped for the specified experience level.
- A difficulty level of "easy", "medium", or "hard" is provided by the user and should be used to tailor the question.
- Prefer practical, real-world challenges over trivial questions.
- Return only one question, clearly formatted (e.g., with code snippets or bullet points if needed). Do not include the answer.
- Return only one question at a time.
- It is OK to ask a question about just a single part of the job description, such as a specific technology or skill (e.g., if the job description is for a Next.js, Drizzle, and TypeScript developer, you can ask a TypeScript-only question).
- The question should be formatted as markdown.
- Stop generating output as soon as you have provided the full question.
`,
    })

    return result.text
}