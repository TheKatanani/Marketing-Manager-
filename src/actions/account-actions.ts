"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

async function getActiveUser() {
  let user = await prisma.user.findFirst({
    where: { email: "mohammed@thekatanani.com" },
  })

  if (!user) {
    user = await prisma.user.findFirst({
      where: { email: "demo@brandpilot.ai" },
    })
  }

  if (!user) {
    user = await prisma.user.findFirst()
  }

  return user
}

export async function getSocialAccounts() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const accounts = await prisma.socialAccount.findMany({
      where: { userId: user.id },
    })

    return accounts
  } catch (error) {
    console.error("Failed to fetch social accounts:", error)
    return []
  }
}

export async function toggleAccountConnection(platform: string, accountName: string, profileUrl?: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const existing = await prisma.socialAccount.findUnique({
      where: {
        userId_platform: {
          userId: user.id,
          platform,
        },
      },
    })

    const isConnected = existing ? !existing.isConnected : true

    const updated = await prisma.socialAccount.upsert({
      where: {
        userId_platform: {
          userId: user.id,
          platform,
        },
      },
      update: {
        accountName,
        profileUrl: profileUrl || null,
        isConnected,
        lastSyncAt: isConnected ? new Date() : null,
      },
      create: {
        userId: user.id,
        platform,
        accountName,
        profileUrl: profileUrl || null,
        isConnected,
        lastSyncAt: new Date(),
      },
    })

    revalidatePath("/dashboard/accounts")
    return { success: true, account: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to toggle account"
    return { success: false, error: message }
  }
}
