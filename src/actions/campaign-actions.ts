"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  objective: z.string().min(10, "Objective must be at least 10 characters"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})

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

export async function getCampaigns() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const campaigns = await prisma.campaign.findMany({
      where: { userId: user.id },
      include: {
        ideas: {
          select: { id: true, title: true, status: true },
        },
        posts: {
          select: { id: true, title: true, status: true },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return campaigns
  } catch (error) {
    console.error("Failed to fetch campaigns:", error)
    return []
  }
}

export async function createCampaign(formData: {
  name: string
  objective: string
  startDate?: string
  endDate?: string
}) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const validated = campaignSchema.parse(formData)

    const campaign = await prisma.campaign.create({
      data: {
        userId: user.id,
        name: validated.name,
        objective: validated.objective,
        startDate: validated.startDate ? new Date(validated.startDate) : null,
        endDate: validated.endDate ? new Date(validated.endDate) : null,
        status: "ACTIVE",
      },
    })

    revalidatePath("/dashboard/campaigns")
    revalidatePath("/dashboard")

    return { success: true, campaign }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create campaign"
    return { success: false, error: message }
  }
}

export async function updateCampaignStatus(id: string, status: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const campaign = await prisma.campaign.update({
      where: { id, userId: user.id },
      data: { status },
    })

    revalidatePath("/dashboard/campaigns")
    return { success: true, campaign }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update campaign"
    return { success: false, error: message }
  }
}
