"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const leadSchema = z.object({
  contactName: z.string().min(2, "Contact name required"),
  company: z.string().min(2, "Company required"),
  role: z.string().min(2, "Role required"),
  sourcePlatform: z.enum(["LINKEDIN", "X", "INSTAGRAM", "DIRECT"]),
  type: z.enum(["RECRUITER_JOB", "FREELANCE_CLIENT", "ADVISORY"]),
  status: z.enum(["INQUIRY", "CALL_SCHEDULED", "INTERVIEW", "OFFER", "CLOSED"]),
  estimatedValue: z.string().optional(),
  notes: z.string().optional(),
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

export async function getAnalyticsSummary() {
  try {
    const user = await getActiveUser()
    if (!user) return null

    const [metrics, leads, postsCount, ideasCount] = await Promise.all([
      prisma.postMetric.findMany({
        where: { post: { userId: user.id } },
        include: {
          post: {
            select: { title: true },
          },
        },
      }),
      prisma.lead.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count({ where: { userId: user.id } }),
      prisma.contentIdea.count({ where: { userId: user.id } }),
    ])

    // Calculate aggregated totals
    let totalImpressions = 0
    let totalEngagements = 0
    let totalRecruiterInquiries = 0
    let totalLikes = 0
    let totalComments = 0
    let totalShares = 0

    const platformBreakdown: Record<string, { impressions: number; engagements: number; inquiries: number }> = {
      LINKEDIN: { impressions: 0, engagements: 0, inquiries: 0 },
      INSTAGRAM: { impressions: 0, engagements: 0, inquiries: 0 },
      X: { impressions: 0, engagements: 0, inquiries: 0 },
    }

    for (const m of metrics) {
      totalImpressions += m.impressions
      totalEngagements += m.engagements
      totalRecruiterInquiries += m.recruiterInquiries
      totalLikes += m.likes
      totalComments += m.comments
      totalShares += m.shares

      if (platformBreakdown[m.platform]) {
        platformBreakdown[m.platform].impressions += m.impressions
        platformBreakdown[m.platform].engagements += m.engagements
        platformBreakdown[m.platform].inquiries += m.recruiterInquiries
      }
    }

    const activeInterviews = leads.filter((l) => l.status === "INTERVIEW" || l.status === "OFFER").length
    const closedDeals = leads.filter((l) => l.status === "CLOSED").length

    return {
      totalImpressions,
      totalEngagements,
      totalRecruiterInquiries,
      totalLikes,
      totalComments,
      totalShares,
      postsCount,
      ideasCount,
      activeInterviews,
      closedDeals,
      platformBreakdown,
      leads,
      metrics,
    }
  } catch (error) {
    console.error("Failed to fetch analytics summary:", error)
    return null
  }
}

export async function createLead(formData: {
  contactName: string
  company: string
  role: string
  sourcePlatform: "LINKEDIN" | "X" | "INSTAGRAM" | "DIRECT"
  type: "RECRUITER_JOB" | "FREELANCE_CLIENT" | "ADVISORY"
  status: "INQUIRY" | "CALL_SCHEDULED" | "INTERVIEW" | "OFFER" | "CLOSED"
  estimatedValue?: string
  notes?: string
}) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const validated = leadSchema.parse(formData)

    const lead = await prisma.lead.create({
      data: {
        userId: user.id,
        ...validated,
        estimatedValue: validated.estimatedValue || null,
        notes: validated.notes || null,
      },
    })

    revalidatePath("/dashboard/analytics")
    revalidatePath("/dashboard")

    return { success: true, lead }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to record lead"
    return { success: false, error: message }
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const updated = await prisma.lead.update({
      where: { id, userId: user.id },
      data: { status },
    })

    revalidatePath("/dashboard/analytics")
    return { success: true, lead: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update lead status"
    return { success: false, error: message }
  }
}
