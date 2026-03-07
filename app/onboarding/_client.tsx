"use client";

import { getUser, syncUser } from "@/features/users/actions";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export  function OnBoardingClient({userId} : {userId : string}) {
    const router = useRouter()
  useEffect(() => {
    syncUser()
  }, [])
  useEffect(() => {
    const intervalId = setInterval( async() => {
      const user = await getUser(userId);
      if (user == null) return;
      router.replace("/app")
      
    }, 1000);
    return () =>{
        clearInterval(intervalId)
    }
  }, [userId , router]);
  return <Loader2Icon className="animate-spin size-24" />;
};

export default OnBoardingClient;
