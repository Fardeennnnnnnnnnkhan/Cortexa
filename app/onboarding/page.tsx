import { getCurrentUser } from '@/services/clerk/components/lib/getCurrentUser'
import { redirect } from 'next/navigation'
import React from 'react'
import OnBoardingClient from './_client'
import { currentUser } from '@clerk/nextjs/server'
import { upsertUser } from '@/features/users/db'

const onBoardingPage = async () => {
  const { userId, user } = await getCurrentUser({ allData: true })

  if (userId == null) {
    return redirect("/")
  }

  // If user already exists in our DB, we can just go to /app
  if (user != null) {
    return redirect("/app")
  }

  // If user is not in our DB, let's sync them manually
  // This helps during local development where webhooks might not reach the local server
  const clerkUser = await currentUser()
  if (clerkUser != null) {
    await upsertUser({
      id: clerkUser.id,
      name: clerkUser.firstName ?? "User",
      email: clerkUser.emailAddresses[0].emailAddress,
      imageUrl: clerkUser.imageUrl,
      createdAt: new Date(clerkUser.createdAt),
      updatedAt: new Date(clerkUser.updatedAt),
    }, { revalidate: false })

    // After manual sync, we should be able to redirect to /app
    // The OnBoardingClient polling will also detect this and handle the client-side redirect
    // but doing it here prevents unnecessary loops.
  }

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
