import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'
import OnBoardingClient from './_client'

const onBoardingPage = async() => {
    const {userId , user} = await getCurrentUser({allData : true})

    if(userId == null){
        return redirect("/")
    }
    // if(user != null)return redirect("/app");
  return (
    <div className='container flex flex-col items-center justify-center h-screen  gap-4'>
      <h1 className='text-4xl'>
        Creating your account...
      </h1>
      <OnBoardingClient userId = {userId}/>
    </div>
  )
}

export default onBoardingPage
