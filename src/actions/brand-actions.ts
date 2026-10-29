"use server"

import { getActiveUser } from "@/lib/active-user"

import { prisma } from "@/lib/prisma"
import { brandProfileSchema, type BrandProfileInput } from "@/lib/validations/brand"
import { revalidatePath } from "next/cache"

function safeParseArray(val: unknown): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === "string") {
    try {
      const parsed = JSON.parse(val)
      if (Array.isArray(parsed)) return parsed
    } catch {
      return val.split(",").map((s) => s.trim()).filter(Boolean)
    }
  }
  return []
}



export async function getBrandProfile() {
  try {
    const user = await getActiveUser()
    if (!user) return null

    const raw = await prisma.brandProfile.findUnique({
      where: { userId: user.id },
    })

    if (!raw) return null

    return {
      ...raw,
      coreSkills: safeParseArray(raw.coreSkills),
      targetRoles: safeParseArray(raw.targetRoles),
      freelanceServices: safeParseArray(raw.freelanceServices),
      contentPillars: safeParseArray(raw.contentPillars),
      languages: safeParseArray(raw.languages),
    }
  } catch (error) {
    console.error("Failed to fetch brand profile:", error)
    return null
  }
}

export async function updateBrandProfile(data: BrandProfileInput) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "No active user found. Please sign in or seed the database." }
    }

    const validated = brandProfileSchema.parse(data)

    const dbPayload = {
      professionalTitle: validated.professionalTitle,
      bioSummary: validated.bioSummary,
      primaryGoal: validated.primaryGoal,
      coreSkills: JSON.stringify(validated.coreSkills),
      targetRoles: JSON.stringify(validated.targetRoles),
      freelanceServices: JSON.stringify(validated.freelanceServices),
      toneOfVoice: validated.toneOfVoice,
      targetAudienceSummary: validated.targetAudienceSummary,
      contentPillars: JSON.stringify(validated.contentPillars),
      languages: JSON.stringify(validated.languages),
      portfolioUrl: validated.portfolioUrl || null,
      githubUrl: validated.githubUrl || null,
      linkedinUrl: validated.linkedinUrl || null,
      twitterUrl: validated.twitterUrl || null,
    }

    const updated = await prisma.brandProfile.upsert({
      where: { userId: user.id },
      update: dbPayload,
      create: {
        ...dbPayload,
        userId: user.id,
      },
    })

    revalidatePath("/dashboard/strategy")
    revalidatePath("/dashboard")

    return {
      success: true,
      data: {
        ...updated,
        coreSkills: validated.coreSkills,
        targetRoles: validated.targetRoles,
        freelanceServices: validated.freelanceServices,
        contentPillars: validated.contentPillars,
        languages: validated.languages,
      },
    }
  } catch (error: unknown) {
    console.error("Failed to update brand profile:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return { success: false, error: message }
  }
}
