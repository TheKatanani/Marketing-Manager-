"use server"

import { getActiveUser } from "@/lib/active-user"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"



export async function getReviewQueue() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
        status: { in: ["IN_REVIEW", "DRAFT"] },
      },
      include: {
        versions: true,
        idea: {
          include: {
            project: {
              select: {
                title: true,
                businessImpact: true,
                keyMetrics: true,
              },
            },
          },
        },
        approvals: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return posts
  } catch (error) {
    console.error("Failed to fetch review queue:", error)
    return []
  }
}

export async function submitReviewDecision(
  postId: string,
  decision: "APPROVED" | "REJECTED" | "REVISION_REQUESTED",
  feedback?: string
) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const newPostStatus = decision === "APPROVED" ? "APPROVED" : "DRAFT"

    const post = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: { status: newPostStatus },
    })

    await prisma.approval.create({
      data: {
        postId: post.id,
        userId: user.id,
        decision,
        feedback: feedback || null,
      },
    })

    revalidatePath("/dashboard/review")
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard")

    return { success: true, post }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record review decision"
    return { success: false, error: message }
  }
}
