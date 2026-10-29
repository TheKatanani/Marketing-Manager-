"use server"

import { getActiveUser } from "@/lib/active-user"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getCalendarData() {
  try {
    const user = await getActiveUser()
    if (!user) return { posts: [], articles: [] }

    const [posts, articles] = await Promise.all([
      prisma.post.findMany({
        where: {
          userId: user.id,
        },
        include: {
          versions: true,
          article: {
            select: {
              id: true,
              title: true,
              slug: true,
              canonicalUrl: true,
            },
          },
          idea: {
            select: {
              title: true,
              contentPillar: true,
            },
          },
        },
        orderBy: { scheduledFor: "asc" },
      }),
      prisma.blogPost.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          title: true,
          slug: true,
          canonicalUrl: true,
          language: true,
          category: true,
          scheduledFor: true,
          status: true,
        },
        orderBy: { scheduledFor: "asc" },
      }),
    ])

    return { posts, articles }
  } catch (error) {
    console.error("Failed to fetch calendar data:", error)
    return { posts: [], articles: [] }
  }
}

// Backward compatibility helper
export async function getCalendarPosts() {
  const { posts } = await getCalendarData()
  return posts
}

export async function schedulePostVersion(versionId: string, scheduledDate: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "Active user not found." }

    const version = await prisma.postVersion.findFirst({
      where: { id: versionId, post: { userId: user.id } },
    })

    if (!version) return { success: false, error: "Version not found." }

    const newDate = new Date(scheduledDate)
    const updated = await prisma.postVersion.update({
      where: { id: version.id },
      data: {
        scheduledFor: newDate,
        status: "SCHEDULED",
      },
    })

    // Update parent post's scheduledFor if not set or earlier
    await prisma.post.update({
      where: { id: version.postId },
      data: {
        scheduledFor: newDate,
        status: "SCHEDULED",
      },
    })

    revalidatePath("/dashboard/calendar")
    revalidatePath("/dashboard/editorial")
    revalidatePath("/dashboard")

    return { success: true, version: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to schedule"
    return { success: false, error: message }
  }
}

export async function schedulePost(postId: string, scheduledDate: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "Active user not found." }

    const newDate = new Date(scheduledDate)
    const updated = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: {
        scheduledFor: newDate,
        status: "SCHEDULED",
      },
    })

    // Also update all versions of this post that have no scheduled date
    await prisma.postVersion.updateMany({
      where: { postId, post: { userId: user.id } },
      data: {
        scheduledFor: newDate,
        status: "SCHEDULED",
      },
    })

    revalidatePath("/dashboard/calendar")
    revalidatePath("/dashboard/editorial")
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
    if (!user) return { success: false, error: "Active user not found." }

    const updated = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: {
        scheduledFor: null,
        status: "DRAFT",
      },
    })

    await prisma.postVersion.updateMany({
      where: { postId, post: { userId: user.id } },
      data: {
        scheduledFor: null,
        status: "DRAFT",
      },
    })

    revalidatePath("/dashboard/calendar")
    revalidatePath("/dashboard/editorial")
    revalidatePath("/dashboard")

    return { success: true, post: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to unschedule post"
    return { success: false, error: message }
  }
}
