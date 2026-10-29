"use server"

import { getActiveUser } from "@/lib/active-user"

import { prisma } from "@/lib/prisma"
import { projectSchema, type ProjectInput } from "@/lib/validations/project"
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



function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function getProjects() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const rawProjects = await prisma.project.findMany({
      where: { userId: user.id },
      orderBy: [
        { isFeatured: "desc" },
        { createdAt: "desc" },
      ],
      include: {
        ideas: {
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
      },
    })

    return rawProjects.map((p) => ({
      ...p,
      techStack: safeParseArray(p.techStack),
      keyMetrics: safeParseArray(p.keyMetrics),
    }))
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return []
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const user = await getActiveUser()
    if (!user) return null

    const raw = await prisma.project.findUnique({
      where: {
        userId_slug: {
          userId: user.id,
          slug,
        },
      },
      include: {
        ideas: true,
      },
    })

    if (!raw) return null

    return {
      ...raw,
      techStack: safeParseArray(raw.techStack),
      keyMetrics: safeParseArray(raw.keyMetrics),
    }
  } catch (error) {
    console.error("Failed to fetch project:", error)
    return null
  }
}

export async function createProject(data: ProjectInput) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found. Please sign in or seed the database." }
    }

    const validated = projectSchema.parse(data)
    const baseSlug = generateSlug(validated.title)
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`

    const project = await prisma.project.create({
      data: {
        ...validated,
        slug,
        userId: user.id,
        techStack: JSON.stringify(validated.techStack),
        keyMetrics: JSON.stringify(validated.keyMetrics),
        projectUrl: validated.projectUrl || null,
        repositoryUrl: validated.repositoryUrl || null,
      },
    })

    revalidatePath("/dashboard/projects")
    revalidatePath("/dashboard")

    return {
      success: true,
      data: {
        ...project,
        techStack: validated.techStack,
        keyMetrics: validated.keyMetrics,
      },
    }
  } catch (error: unknown) {
    console.error("Failed to create project:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return { success: false, error: message }
  }
}

export async function updateProject(id: string, data: ProjectInput) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const validated = projectSchema.parse(data)

    const updated = await prisma.project.update({
      where: { id, userId: user.id },
      data: {
        ...validated,
        techStack: JSON.stringify(validated.techStack),
        keyMetrics: JSON.stringify(validated.keyMetrics),
        projectUrl: validated.projectUrl || null,
        repositoryUrl: validated.repositoryUrl || null,
      },
    })

    revalidatePath("/dashboard/projects")
    revalidatePath("/dashboard")

    return {
      success: true,
      data: {
        ...updated,
        techStack: validated.techStack,
        keyMetrics: validated.keyMetrics,
      },
    }
  } catch (error: unknown) {
    console.error("Failed to update project:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return { success: false, error: message }
  }
}

export async function deleteProject(id: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    await prisma.project.delete({
      where: { id, userId: user.id },
    })

    revalidatePath("/dashboard/projects")
    revalidatePath("/dashboard")

    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to delete project:", error)
    const message = error instanceof Error ? error.message : "An unexpected error occurred"
    return { success: false, error: message }
  }
}
