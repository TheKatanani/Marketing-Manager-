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

export async function getCalendarPosts() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      include: {
        versions: true,
        idea: {
          select: {
            title: true,
            contentPillar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return posts
  } catch (error) {
    console.error("Failed to fetch calendar posts:", error)
    return []
  }
}

export async function schedulePost(postId: string, scheduledDate: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const updated = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: {
        scheduledFor: new Date(scheduledDate),
        status: "SCHEDULED",
      },
    })

    revalidatePath("/dashboard/calendar")
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard")

    return { success: true, post: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to schedule post"
    return { success: false, error: message }
  }
}

export async function unschedulePost(postId: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const updated = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: {
        scheduledFor: null,
        status: "APPROVED",
      },
    })

    revalidatePath("/dashboard/calendar")
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard")

    return { success: true, post: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to unschedule post"
    return { success: false, error: message }
  }
}
