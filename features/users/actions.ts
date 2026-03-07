"use server"

import { cacheTag } from "next/cache"
import { getUserIdTag } from "./dbCache"
import { db } from "@/drizzle/db"
import { eq } from "drizzle-orm"
import { UserTable } from "@/drizzle/schema"
import { currentUser } from "@clerk/nextjs/server"
import { upsertUser as upsertUserDb } from "./db"

export async function getUser(id: string) {
    "use cache"
    cacheTag(getUserIdTag(id))

    return db.query.UserTable.findFirst({
        where: eq(UserTable.id, id),
    })
}

export async function syncUser() {
    const clerkUser = await currentUser()
    if (clerkUser == null) return

    await upsertUserDb({
        id: clerkUser.id,
        name: clerkUser.firstName ?? "User",
        email: clerkUser.emailAddresses[0].emailAddress,
        imageUrl: clerkUser.imageUrl,
        createdAt: new Date(clerkUser.createdAt),
        updatedAt: new Date(clerkUser.updatedAt),
    })

    return { success: true }
}