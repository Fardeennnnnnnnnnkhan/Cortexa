import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'
import OnBoardingClient from './_client'

const onBoardingPage = async () => {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) {
    return redirect("/")
  }

  // If user already exists in our DB, we can just go to /app
  if (user != null) {
    return redirect("/app")
  }

  // Sync is handled by OnBoardingClient via syncUser server action to avoid revalidateTag during render


  return (
    <div className='container flex flex-col items-center justify-center h-screen  gap-4'>
      <h1 className='text-4xl'>
        Creating your account...
      </h1>
      <OnBoardingClient userId={userId} />
    </div>
  )
}

export default onBoardingPage
