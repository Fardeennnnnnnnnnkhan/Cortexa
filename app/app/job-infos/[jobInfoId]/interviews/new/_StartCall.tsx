// "use client"
// import { Button } from "@/components/ui/button"
// import { env } from "@/data/env/client"
// import {   JobInfoTable } from "@/drizzle/schema"
// import { CreateInterview, UpdateInterview } from "@/features/interviews/actions"
// import { errorToast } from "@/lib/errorToast"
// import { CondensedMessages } from "@/services/clerk/components/Hume/components/CondensedMessages"
// import { condenseChatMessages } from "@/services/clerk/components/Hume/lib/condesedChatMessages"
// import { useVoice, VoiceReadyState } from "@humeai/voice-react"
// import { Loader2Icon, MicIcon, MicOffIcon, PhoneOffIcon } from "lucide-react"
// import { useRouter } from "next/navigation"
// import {  useMemo, useEffect, useState, useRef } from "react"

// const StartCall = ({
//     jobInfo,
//     user , 
//     accessToken

// } : {
//     accessToken: string
//     jobInfo : Pick<typeof JobInfoTable.$inferSelect , "id" | "title" | "description" | "experienceLevel">
//     user:{
//         name: string,
//         imageUrl : string
//     }
// }) => {

//     const {connect  , readyState, error, disconnect, messages , chatMetadata , callDurationTimestamp } = useVoice();
//     const [interviewId , setInterviewId] = useState<string | null>(null)
//     const durationRef = useRef(callDurationTimestamp)
//     const router = useRouter()

   
//     // Update duration ref when callDurationTimestamp changes
//     useEffect(() => {
//         durationRef.current = callDurationTimestamp
//     }, [callDurationTimestamp])

//     // Sync Chat ID
//     useEffect(() => {
//       if(chatMetadata?.chatId == null || interviewId == null){
//         return
//       }
//       UpdateInterview( interviewId , {humeChatId : chatMetadata.chatId})
//     }, [chatMetadata?.chatId , interviewId])
    
//     // Sync Duration
//     useEffect(() => {
//       if(interviewId == null){
//         return
//       }
//       const intervalId = setInterval(()=>{
//         if(durationRef.current == null) return
//           UpdateInterview( interviewId , {duration : durationRef.current})
//       } , 10000)
//       return () => clearInterval(intervalId)
//     }, [ interviewId])

//     //Handle Disconnect
//     useEffect(() => {
//         if (readyState !== VoiceReadyState.CLOSED) return
      
//         if (interviewId == null) {
//           return router.push(`/app/job-infos/${jobInfo.id}/interviews`)
//         }
//           // If it opened but no interviewId (rare edge case)
//   if (!interviewId) {
//     return router.push(`/app/job-infos/${jobInfo.id}/interviews`)
//   }
      
//         if (durationRef.current != null) {
//             UpdateInterview( interviewId , {duration : durationRef.current})
//         }
      
//         router.push(`/app/job-infos/${jobInfo.id}/interviews/${interviewId}`)
//       }, [interviewId , readyState , router ,jobInfo.id ])
      
    

    
//     // Check for error messages in the messages array
//     const errorMessage = useMemo(() => {
//         const errorMsg = messages.find((msg: unknown) => {
//             if (typeof msg === 'object' && msg !== null && 'type' in msg) {
//                 return msg.type === 'error';
//             }
//             return false;
//         });
//         if (errorMsg && typeof errorMsg === 'object' && 'message' in errorMsg && typeof errorMsg.message === 'string') {
//             return errorMsg.message;
//         }
//         if (error) {
//             return error.message;
//         }
//         return null;
//     }, [messages, error]);


//      // Handle Hume subscription expiration
// useEffect(() => {
//     if (!errorMessage) return;
  
//     const lowerError = errorMessage.toLowerCase();
  
//     const isSubscriptionError =
//       lowerError.includes("subscription") ||
//       lowerError.includes("expired") ||
//       lowerError.includes("payment") ||
//       lowerError.includes("plan") ||
//       lowerError.includes("forbidden") ||
//       lowerError.includes("401") ||
//       lowerError.includes("403");
  
//     if (isSubscriptionError) {
//       console.error("Hume subscription expired. Redirecting...");
  
//       router.push(`/app/job-infos/${jobInfo.id}/interviews`);
//     }
//   }, [errorMessage, router, jobInfo.id]);
  

//     useEffect(() => {
//         if (error) {
//             console.error("Voice error details:", {
//                 message: error.message,
//                 type: 'type' in error ? error.type : 'unknown',
//                 reason: 'reason' in error ? error.reason : 'unknown',
//                 errorObject: 'error' in error ? error.error : undefined,
//                 fullError: error
//             });
//         }
//     }, [readyState, error]);
    
//     // Log messages to see if we're receiving any connection events
//     useEffect(() => {
//         if (messages.length > 0) {
         
//             const lastMessage = messages[messages.length - 1];            
//             // Check for error messages
//             const errorMsg = messages.find((msg: unknown) => {
//                 return typeof msg === 'object' && msg !== null && 'type' in msg && msg.type === 'error';
//             });
//             if (errorMsg) {
//                 console.error("Error message received:", errorMsg);
//             }
//         }
//     }, [messages]);
    
//     // Listen for connection events
//     useEffect(() => {
//         const handleBeforeUnload = () => {
//         };
//         window.addEventListener("beforeunload", handleBeforeUnload);
//         return () => window.removeEventListener("beforeunload", handleBeforeUnload);
//     }, [readyState]);

//     if(readyState === VoiceReadyState.IDLE){
// return <div className="flex flex-col justify-center items-center h-screen-header gap-4">
//     {errorMessage && (
//         <div className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded max-w-md text-center">
//             {errorMessage}
//         </div>
//     )}
//     <Button size='lg' onClick={ async()=>{
//         const configId = env.NEXT_PUBLIC_HUME_CONFIG_ID;
//         const res = await CreateInterview({jobInfoId : jobInfo.id})
//         if(res.error){
//             return errorToast(res.message)
//         }
//         setInterviewId(res.id)
//         if (!configId) {
//             console.error("NEXT_PUBLIC_HUME_CONFIG_ID is not defined!");
//             alert("Configuration error: Hume Config ID is missing. Please check your environment variables.");
//             return;
//         }
        
//         try {
//             const sessionVars: Record<string, string> = {
//                 userName: user.name || "User",
//                 title: jobInfo.title || "Not Specified",
//             };
            
//             // Only add description and experienceLevel if they exist
//             if (jobInfo.description) {
//                 sessionVars.description = String(jobInfo.description);
//             }
//             if (jobInfo.experienceLevel) {
//                 sessionVars.experienceLevel = String(jobInfo.experienceLevel);
//             }
            
            
//             const connectParams = {
//                 auth: { type: "accessToken" as const, value: accessToken },
//                 configId: configId,
//                 sessionSettings: {
//                     type: "session_settings" as const,
//                     variables: sessionVars
//                 }
//             };
 
//             connect(connectParams);
            
//         } catch (err) {
//             console.error("Connection error:", err);
//             console.error("Error details:", JSON.stringify(err, null, 2));
//             if (err instanceof Error) {
//                 console.error("Error stack:", err.stack);
//             }
//         }
//     }}>Start Interview</Button>
// </div>
//     }
//     if(readyState === VoiceReadyState.CONNECTING){
//         return (
//          <div className='h-screen-header flex flex-col items-center justify-center gap-4'>
//          <Loader2Icon className='size-24 animate-spin m-auto'/>
//          <p className="text-muted-foreground">Connecting to voice session...</p>
//          {errorMessage && (
//             <p className="text-destructive text-sm">{errorMessage}</p>
//          )}
//         </div>
//         )
//     }
//     if(readyState === VoiceReadyState.CLOSED){
//         return (
//          <div className='h-screen-header flex flex-col items-center justify-center gap-4'>
//          {errorMessage ? (
//             <div className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded max-w-md text-center">
//                 {errorMessage}
//             </div>
//          ) : (
//             <p className="text-muted-foreground">Interview closed</p>
//          )}
//          <Button size='lg' onClick={()=>{
//             disconnect();
//             window.location.reload();
//          }}>Retry Connection</Button>
//         </div>
//         )
//     }
//     if (readyState !== VoiceReadyState.OPEN) {
//         return (
//           <div className="h-screen-header flex items-center justify-center">
//             <p className="text-muted-foreground">Waiting for voice session… (State: {readyState})</p>
//           </div>
//         )
//       }
      
//   return (
//     <div className="flex flex-col overflow-y-auto h-screen-header ">
//         <div className="container py-6 flex flex-col items-center justify-end min-h-full">
//         <Messages user = {user} />
//         <Controls />
//         </div>
//     </div>
//   )
// }

// export default StartCall

"use client"

import { Button } from "@/components/ui/button"
import { env } from "@/data/env/client"
import { JobInfoTable } from "@/drizzle/schema"
import { CreateInterview, UpdateInterview } from "@/features/interviews/actions"
import { errorToast } from "@/lib/errorToast"
import { CondensedMessages } from "@/services/clerk/components/Hume/components/CondensedMessages"
import { condenseChatMessages } from "@/services/clerk/components/Hume/lib/condesedChatMessages"
import { useVoice, VoiceReadyState } from "@humeai/voice-react"
import { Loader2Icon, MicIcon, MicOffIcon, PhoneOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMemo, useEffect, useState, useRef } from "react"

const StartCall = ({
  jobInfo,
  user,
  accessToken,
}: {
  accessToken: string
  jobInfo: Pick<typeof JobInfoTable.$inferSelect, "id" | "title" | "description" | "experienceLevel">
  user: { name: string; imageUrl: string }
}) => {
  const { connect, readyState, error, disconnect, messages, chatMetadata, callDurationTimestamp } = useVoice()

  const [interviewId, setInterviewId] = useState<string | null>(null)

  // ✅ NEW: Track if session ever actually opened
  const sessionStartedRef = useRef(false)

  const durationRef = useRef(callDurationTimestamp)
  const router = useRouter()

  /* ------------------ Track Session Open ------------------ */
  useEffect(() => {
    if (readyState === VoiceReadyState.OPEN) {
      sessionStartedRef.current = true
    }
  }, [readyState])

  /* ------------------ Sync Duration Ref ------------------ */
  useEffect(() => {
    durationRef.current = callDurationTimestamp
  }, [callDurationTimestamp])

  /* ------------------ Sync Chat ID ------------------ */
  useEffect(() => {
    if (chatMetadata?.chatId == null || interviewId == null) return
    UpdateInterview(interviewId, { humeChatId: chatMetadata.chatId })
  }, [chatMetadata?.chatId, interviewId])

  /* ------------------ Sync Duration ------------------ */
  useEffect(() => {
    if (interviewId == null) return

    const intervalId = setInterval(() => {
      if (durationRef.current == null) return
      UpdateInterview(interviewId, { duration: durationRef.current })
    }, 10000)

    return () => clearInterval(intervalId)
  }, [interviewId])

  /* ------------------ FIXED: Handle Disconnect ------------------ */
  useEffect(() => {
    if (readyState !== VoiceReadyState.CLOSED) return

    // ✅ If session NEVER opened → go back to interviews list
    if (!sessionStartedRef.current) {
      router.replace(`/app/job-infos/${jobInfo.id}/interviews`)
      return
    }

    // Safety fallback
    if (!interviewId) {
      router.replace(`/app/job-infos/${jobInfo.id}/interviews`)
      return
    }

    if (durationRef.current != null) {
      UpdateInterview(interviewId, { duration: durationRef.current })
    }

    router.replace(`/app/job-infos/${jobInfo.id}/interviews/${interviewId}`)
  }, [readyState, interviewId, jobInfo.id])

  /* ------------------ Error Extraction ------------------ */
  const errorMessage = useMemo(() => {
    const errorMsg = messages.find((msg:any) => msg?.type === "error")
    // if (errorMsg?.message) return errorMsg.message
    if (error) return error.message
    return null
  }, [messages, error])

  /* ------------------ Start Button ------------------ */
  if (readyState === VoiceReadyState.IDLE) {
    return (
      <div className="flex flex-col justify-center items-center h-screen-header gap-4">
        {errorMessage && (
          <div className="text-destructive text-sm bg-destructive/10 px-4 py-2 rounded max-w-md text-center">
            {errorMessage}
          </div>
        )}
        <Button
          size="lg"
          onClick={async () => {
            const configId = env.NEXT_PUBLIC_HUME_CONFIG_ID
            const res = await CreateInterview({ jobInfoId: jobInfo.id })

            if (res.error) return errorToast(res.message)

            setInterviewId(res.id)

            if (!configId) {
              alert("Configuration error: Hume Config ID is missing.")
              return
            }

            connect({
              auth: { type: "accessToken", value: accessToken },
              configId,
              sessionSettings: {
                type: "session_settings",
                variables: {
                  userName: user.name || "User",
                  title: jobInfo.title || "Not Specified",
                  ...(jobInfo.description && { description: String(jobInfo.description) }),
                  ...(jobInfo.experienceLevel && { experienceLevel: String(jobInfo.experienceLevel) }),
                },
              },
            })
          }}
        >
          Start Interview
        </Button>
      </div>
    )
  }

  if (readyState === VoiceReadyState.CONNECTING) {
    return (
      <div className="h-screen-header flex flex-col items-center justify-center gap-4">
        <Loader2Icon className="size-24 animate-spin m-auto" />
        <p className="text-muted-foreground">Connecting to voice session...</p>
      </div>
    )
  }

  if (readyState === VoiceReadyState.CLOSED) {
    return null
  }

  if (readyState !== VoiceReadyState.OPEN) {
    return null
  }

  return (
    <div className="flex flex-col overflow-y-auto h-screen-header">
      <div className="container py-6 flex flex-col items-center justify-end min-h-full">
        <Messages user={user} />
        <Controls />
      </div>
    </div>
  )
}

export default StartCall




function Messages({user} : {user : {name : string , imageUrl : string}  }){
    const {messages , fft} = useVoice()

    const condensedMessages = useMemo(()=>{
        return condenseChatMessages(messages)
    } , [messages])
    return <CondensedMessages
    messages = {condensedMessages} 
    user={user} 
    maxFft = {fft.length > 0 ? Math.max(...fft) : 0} 
    className="max-w-5xl"
    />
    
}

function Controls(){
    const  {disconnect , isMuted , mute , unmute , micFft , callDurationTimestamp} = useVoice()

    return(
        <div className="flex gap-5 rounded border px-5 py-2 w-fit sticky bottom-6 bg-background items-center">
        <Button variant="ghost" size="icon" className="-mx-3" 
        onClick={()=> isMuted ? unmute() : mute()}>
            {isMuted ? <MicOffIcon className="text-destructive" /> : <MicIcon/>}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
        </Button>
        <div className="self-stretch">
            <FfftVisualizer fft={micFft}/>
        </div>
        <div className="text-sm text-muted-foreground tabular-nums">
            {callDurationTimestamp}
        </div>
        <Button 
        variant="ghost"
        size='icon'
        className="-mx-3"
        onClick={disconnect}
        >
            <PhoneOffIcon className="text-destructive"/>
            <span className="sr-only">End Call</span>
        </Button>
        </div>
    )
}

function FfftVisualizer({ fft }: { fft: number[] }) {
    return (
      <div className="flex  gap-1 items-center h-full">
      {fft.map((value , index) =>{
        const percent = (value /4) * 100
        return (
        <div
        key={index}
          className="min-h-0.5 bg-primary/75 w-0.5 rounded"
          style={{ height: `${percent < 10 ? 0 : percent}%` }}
        />
        )
      })}

      </div>
    );
  }
  
