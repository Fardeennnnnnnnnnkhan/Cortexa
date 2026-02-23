// 'use client'
// import { BackLink } from "@/components/BackLink";
// import MarkdownRenderer from "@/components/MarkdownRenderer";
// import { Button } from "@/components/ui/button";
// import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Textarea } from "@/components/ui/textarea";
// import { JobInfoTable, questionDifficulties, questionDifficulty, questionDifficultyLevelEnum } from "@/drizzle/schema";
// import { formatQuestionDifficulty } from "@/features/questions/formatQuestionDifficulty";
// import { useState } from "react";
// import {useCompletion} from '@ai-sdk/react'
// import { errorToast } from "@/lib/errorToast";
// import { LoadingSwap } from "@/components/ui/loading-swap";

// type Status = 'awaiting-answer' | 'awaiting-difficulty' | 'init'
// export default function NewQuestionClientPage(
//     {jobInfo} : {jobInfo : Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title" | "userId" >}
// ){

//     const [status , setStatus] = useState<Status>('init')
//     const [answer , setAnswer] = useState<string | null>(null)
//    const questionId = null
//    const {
//     complete: generateQuestion, 
//     completion: question, 
//     setCompletion: setQuestion, 
//     isLoading: isGeneratingQuestion, 
//     data,
// } = useCompletion({
//     api:'/api/ai/questions/generate-question',
//     streamProtocol: 'data',
//     onFinish : ()=>{
//         setStatus('awaiting-answer')
//     },
//     onError : (error)=>{
//         errorToast(error.message)

//     },
// }
//    )

//    console.log(data)
//    const {
//     complete: generateFeedback, 
//     completion: feedback, 
//     setCompletion: setFeedback, 
//     isLoading: isGeneratingFeedback,
// } = useCompletion({
//     api:'/api/ai/questions/generate-feedback',
//     streamProtocol: 'text',
//     onFinish : ()=>{
//         setStatus('awaiting-difficulty')
//     },
//     onError : (error)=>{
//         errorToast(error.message)

//     },
// }
//    )
//     return   <div className="flex flex-col items-center gap-4 w-full mx-w-[2000px] mx-auto flex-grow h-screen-header">
//         <div className="container flex gap-4 items-center mt-4 justify-between">
//             <div className="flex-grow basis-0">
//                 <BackLink 
//                 href={`/app/job-infos/${jobInfo.id}/questions`}>
//                 {jobInfo.name}</BackLink>
//             </div>

// <Controls    
// reset={()=>{
//     setStatus('awaiting-difficulty')
//     setQuestion("")
//     setFeedback("")
//     setAnswer(null)
// }}  
// disabledAnswerButton={answer == null || answer.trim() === "" || questionId == null}
// generateQuestion={
//     (difficulty)=>{
//         setQuestion("")
//         setFeedback("")
//         setAnswer(null)
//         generateQuestion(difficulty , {body : {jobInfoId : jobInfo.id}})
//     }   
//     } 
//     generateFeedback={()=>{
//         if(answer == null || answer.trim() === "" || questionId == null) return
//         // todo: GET QUESTION ID
//         generateFeedback(answer?.trim() , {body : {questionId :questionId  }})    
//     }}  
//         status={status} 
//         isLoading = {isGeneratingQuestion || isGeneratingFeedback}
//         jobInfoId={jobInfo.id}/>
// <div className="flex-grow hidden md:block"/>
//         </div>
//         <QuestionContainer
//         question={question}
//         feedback={feedback}
//         answer={answer}
//         status={status}
//         setAnswer={setAnswer}
//         />  
//     </div>
// }
    
// function Controls({status, isLoading , generateQuestion , generateFeedback , jobInfoId , reset , disabledAnswerButton} : {
//     status : Status , 
//     isLoading : boolean
//     generateQuestion : (difficulty : questionDifficulty) => void
//     generateFeedback : ()=> void
//     jobInfoId : string
//     reset : ()=> void
//     disabledAnswerButton : boolean
// }){
//     return(
//         <div className="flex gap-2">
//             {status ==="awaiting-answer" ?(
//                 <>
//             <Button onClick={reset}  disabled={isLoading} variant="outline" className="btn btn-primary">
//                 <LoadingSwap isLoading={isLoading}>
//                 Skip
//                 </LoadingSwap>
//                 </Button>
//             <Button onClick={generateFeedback}  disabled={ disabledAnswerButton }  className="btn btn-primary">
//                 <LoadingSwap isLoading={isLoading}>
//                 Answer    
//                 </LoadingSwap>
//             </Button>
//                 </>
//             ):(
//                 questionDifficulties.map(difficulty=>(
//                     <Button key={difficulty} size='sm' disabled={isLoading} 
//                     onClick={()=> 
//                         // TODO : Implement
//                         generateQuestion(difficulty)
//                     } className="btn btn-primary">
//                         <LoadingSwap isLoading={isLoading}>
//                       {formatQuestionDifficulty(difficulty)}
//                         </LoadingSwap>
//                     </Button>
//                 ))
//             )}  
//         </div>  
//     )
// }
// function QuestionContainer({
//     question ,
//     feedback,
//     answer ,
//     status,
//     setAnswer
// }: {
//     question : string | null
//     feedback : string | null
//     answer : string | null
//     status : Status
//     setAnswer : (answer : string) => void
// }   ){
//     return (
//     <ResizablePanelGroup direction="horizontal" className="flex-grow border-t">
//         <ResizablePanel id="question-and-feedback" defaultSize={50} minSize={20}>
//                <ResizablePanelGroup direction="vertical" className="flex-grow ">
//                     <ResizablePanel id="question" defaultSize={25} minSize={5}> 
//                             <ScrollArea className="h-full min-w-48 *:h-full">
//                                {status === "init" && !question ?(
//                                 <p className="md:text-lg flex items-center justify-center h-full p-6">Get Started by Selecting a question difficulty above.</p>
//                                ) :(
//                                  <MarkdownRenderer className="p-6">
//                                      {question}
//                                  </MarkdownRenderer>
//                                )}
//                             </ScrollArea>     
//                     </ResizablePanel>
//                     {feedback && (<>
//                     <ResizableHandle withHandle />
//                     <ResizablePanel id="feedback" defaultSize={75} minSize={5}> 
//                         <ScrollArea className="h-full min-w-48 *:h-full">
//                                 <MarkdownRenderer className="p-6">
//                                     {feedback}
//                                 </MarkdownRenderer>
//                             </ScrollArea>  
//                     </ResizablePanel>
//                     </>
//                     )}
//                </ResizablePanelGroup>

//         </ResizablePanel>
//         <ResizableHandle withHandle />
//         <ResizablePanel id="answer" defaultSize={50} minSize={20}>
//           <ScrollArea className="h-full min-w-48 *:h-full">
//             <Textarea 
//             disabled={status !== 'awaiting-answer'}
//             onChange={e=>setAnswer(e.target.value)}
//             value={answer ?? ""} 
//             placeholder="Type Your Answer Here..." 
//             className="w-full h-full resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6">
//             </Textarea>
//           </ScrollArea>
//         </ResizablePanel>
//     </ResizablePanelGroup>
//     )
// }   

// Claude Fix : 
'use client'
import { BackLink } from "@/components/BackLink"
import MarkdownRenderer from "@/components/MarkdownRenderer"
import { Button } from "@/components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { JobInfoTable, questionDifficulties, questionDifficulty } from "@/drizzle/schema"
import { formatQuestionDifficulty } from "@/features/questions/formatQuestionDifficulty"
import { useMemo, useState } from "react"
import { errorToast } from "@/lib/errorToast"
import { LoadingSwap } from "@/components/ui/loading-swap"
import z from "zod"

type Status = 'awaiting-answer' | 'awaiting-difficulty' | 'init'

export default function NewQuestionClientPage(
    { jobInfo }: { jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title" | "userId"> }
) {
    const [status, setStatus] = useState<Status>('init')
    const [answer, setAnswer] = useState<string>("")
    const [question, setQuestion] = useState<string>("")
    const [questionIds, setQuestionIds] = useState<string[]>([]) // Array of question IDs
    const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false)
    const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false)
    const [feedback, setFeedback] = useState<string>("")

    const generateQuestion = async (difficulty: questionDifficulty) => {
        setQuestion("")
        setFeedback("")
        setAnswer("")
        setIsGeneratingQuestion(true)
        
        try {
            const response = await fetch('/api/ai/questions/generate-question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    difficulty, 
                    jobInfoId: jobInfo.id 
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate question')
            }

            const data = await response.json()
            setQuestion(data.question)
            
            // Append the new question ID to the beginning of the array
            setQuestionIds(prev => [data.questionId, ...prev])
            console.log(questionIds)
            setStatus('awaiting-answer')
        } catch (error) {
            errorToast(error instanceof Error ? error.message : 'Failed to generate question')
        } finally {
            setIsGeneratingQuestion(false)
        }
    }

    const generateFeedback = async () => {
        // Get the most recent question ID (first element in array)
        const currentQuestionId = questionIds[0]
        
        if (!answer.trim() || !currentQuestionId) return
        
        setIsGeneratingFeedback(true)
        
        try {
            const response = await fetch('/api/ai/questions/generate-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    answer: answer.trim(),
                    questionId: currentQuestionId 
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.error || 'Failed to generate feedback')
            }

            const data = await response.json()
            setFeedback(data.feedback)
            setStatus('awaiting-difficulty')
        } catch (error) {
            errorToast(error instanceof Error ? error.message : 'Failed to generate feedback')
        } finally {
            setIsGeneratingFeedback(false)
        }
    }

    const reset = () => {
        setStatus('awaiting-difficulty')
        setQuestion("")
        setFeedback("")
        setAnswer("")
        // Don't clear questionIds - keep the history
    }

    // Get the current (most recent) question ID
    const questionId = questionIds[0] || null

    return (
        <div className="flex flex-col w-full max-w-[2000px] mx-auto h-[calc(100vh-4rem)] overflow-hidden">
            <div className="container flex gap-4 items-center mt-4 justify-between">
                <div className="flex-grow basis-0">
                    <BackLink href={`/app/job-infos/${jobInfo.id}/questions`}>
                        {jobInfo.name}
                    </BackLink>
                </div>

                <Controls    
                    reset={reset}  
                    disabledAnswerButton={!answer.trim() || !questionId}
                    generateQuestion={generateQuestion} 
                    generateFeedback={generateFeedback}  
                    status={status} 
                    isLoading={isGeneratingQuestion || isGeneratingFeedback}
                    jobInfoId={jobInfo.id}
                />
                <div className="flex-grow hidden md:block"/>
            </div>
            <div className="flex-grow min-h-0 w-full">
                <QuestionContainer
                    question={question}
                    feedback={feedback}
                    answer={answer}
                    status={status}
                    setAnswer={setAnswer}
                />  
            </div>
            
            {/* Debug info - you can remove this later */}
            {questionIds.length > 0 && (
                <div className="text-xs text-muted-foreground">
                    Current Question ID: {questionIds[0]} | Total Questions: {questionIds.length}
                </div>
            )}
        </div>
    )
}
    
function Controls({ status, isLoading, generateQuestion, generateFeedback, jobInfoId, reset, disabledAnswerButton }: {
    status: Status, 
    isLoading: boolean
    generateQuestion: (difficulty: questionDifficulty) => void
    generateFeedback: () => void
    jobInfoId: string
    reset: () => void
    disabledAnswerButton: boolean
}) {
    return (
        <div className="flex gap-2">
            {status === "awaiting-answer" ? (
                <>
                    <Button onClick={reset} disabled={isLoading} variant="outline" className="btn btn-primary">
                        <LoadingSwap isLoading={isLoading}>
                            Skip
                        </LoadingSwap>
                    </Button>
                    <Button onClick={generateFeedback} disabled={disabledAnswerButton || isLoading} className="btn btn-primary">
                        <LoadingSwap isLoading={isLoading}>
                            Answer    
                        </LoadingSwap>
                    </Button>
                </>
            ) : (
                questionDifficulties.map(difficulty => (
                    <Button 
                        key={difficulty} 
                        size='sm' 
                        disabled={isLoading} 
                        onClick={() => generateQuestion(difficulty)} 
                        className="btn btn-primary"
                    >
                        <LoadingSwap isLoading={isLoading}>
                            {formatQuestionDifficulty(difficulty)}
                        </LoadingSwap>
                    </Button>
                ))
            )}  
        </div>  
    )
}

function QuestionContainer({
    question,
    feedback,
    answer,
    status,
    setAnswer
}: {
    question: string
    feedback: string
    answer: string
    status: Status
    setAnswer: (answer: string) => void
}) {
    return (
        <ResizablePanelGroup direction="horizontal" className="flex-grow w-full h-full border-t">
            <ResizablePanel id="question-and-feedback" defaultSize={50} minSize={20}>
                <ResizablePanelGroup direction="vertical" className="flex-grow">
                    <ResizablePanel id="question" defaultSize={25} minSize={5}> 
                        <ScrollArea className="h-full min-w-48 *:h-full">
                            {status === "init" && !question ? (
                                <p className="md:text-lg flex items-center justify-center h-full p-6">
                                    Get Started by Selecting a question difficulty above.
                                </p>
                            ) : (
                                <MarkdownRenderer className="p-6">
                                    {question}
                                </MarkdownRenderer>
                            )}
                        </ScrollArea>     
                    </ResizablePanel>
                    {feedback && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel id="feedback" defaultSize={75} minSize={5}> 
                                <ScrollArea className="h-full min-w-48 *:h-full">
                                    <MarkdownRenderer className="p-6">
                                        {feedback}
                                    </MarkdownRenderer>
                                </ScrollArea>  
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel id="answer" defaultSize={50} minSize={20}>
                <ScrollArea className="h-full min-w-48 *:h-full">
                    <Textarea 
                        disabled={status !== 'awaiting-answer'}
                        onChange={e => setAnswer(e.target.value)}
                        value={answer} 
                        placeholder="Type Your Answer Here..." 
                        className="w-full h-full resize-none border-none rounded-none focus-visible:ring focus-visible:ring-inset !text-base p-6"
                    />
                </ScrollArea>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}