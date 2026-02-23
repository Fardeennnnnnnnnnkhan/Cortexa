import { JobInfoTable } from "@/drizzle/schema"
import { fetchChatMessages } from "../components/Hume/lib/api"
import { google } from "@ai-sdk/google"
import {generateText} from 'ai'
export async function generateAIInterviewFeedback({
    humeChatId,
    jobInfo,
    userName,
  }: {
    humeChatId: string
    jobInfo: Pick<typeof JobInfoTable.$inferSelect, "title" | "description" | "experienceLevel">
    userName: string
  }) {
    const messages = await fetchChatMessages(humeChatId)
  
    const formattedMessages = messages.map((message) => {
      if (message.type !== "USER_MESSAGE" && message.type !== "AGENT_MESSAGE") {
        return null
      }
  
      if (message.messageText == null) return null
  
      return {
        speaker: message.type === "USER_MESSAGE" ? "Interviewee" : "Interviewer",
        text: message.messageText,
        emotionFeatures:
          message.role === "USER" ? message.emotionFeatures : undefined,
      }
    })

    const {text } = await generateText({
        model : google('gemini-2.5-flash'),
        prompt : JSON.stringify(formattedMessages),
        // experimental_continueSteps : true,
        // maxSteps: 10,
        system: `
You are an expert interview coach and evaluator.

Your role is to analyze a mock job interview transcript and provide clear, detailed, and structured feedback on the interviewee’s performance based on the job requirements.

Your output MUST be in markdown format.

---

Additional Context:

Interviewee's name: ${userName}
Job title: ${jobInfo.title}
Job description: ${jobInfo.description}
Job experience level: ${jobInfo.experienceLevel}

---

Transcript JSON Format:

Each message contains:
- speaker: "Interviewee" or "Interviewer"
- text: The spoken message
- emotionFeatures: An object where keys are emotions and values are intensity (0–1). 
  This is ONLY provided for interviewee messages.

---

Your Task:

Review the full transcript and evaluate the interviewee’s performance in relation to the role.

Provide detailed, structured feedback organized into the following primary categories.
Do NOT repeat the subcategory questions in your response. Use them only as internal guidance.

---

1. Communication Clarity
- Was the interviewee articulate and easy to understand?
- Did they use structured and appropriate language for this job and experience level?

2. Confidence and Emotional State
- Based on emotional cues and speech content, how confident did the interviewee appear?
- Highlight any nervous or hesitant moments that may have affected their impression.

3. Response Quality
- Were the answers relevant and well-reasoned?
- Were responses appropriately scoped for the candidate’s experience level?

4. Pacing and Timing
- Analyze delays between questions and answers.
- Note long or unnatural pauses that may indicate uncertainty or lack of preparation.

5. Engagement and Interaction
- Did the interviewee show curiosity?
- Did they engage naturally and reflect genuine interest in the role or company?

6. Role Fit and Alignment
- Based on the job description and answers, how well does the interviewee match the role?
- Identify any skill gaps (technical or soft skills).

7. Overall Strengths and Areas for Improvement
- Summarize key strengths.
- Identify the most important areas for improvement.
- Provide a short overall performance assessment.

---

Additional Notes:

- Reference specific moments from the transcript when helpful.
- Do NOT return raw emotionFeatures data in your response.
- Tailor your feedback specifically to the provided job description and experience level.
- Be clear, constructive, and actionable.
- Write feedback as if speaking directly to the interviewee.
- Include a score (out of 10) in the heading for each category (e.g., "Communication Clarity (7/10)").
- Include an overall rating at the very start of your response.
- Stop generating once the full feedback has been provided.
`

    })

    return text;
  }
  