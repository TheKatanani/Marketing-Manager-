"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { AIService } from "@/lib/ai/provider"

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

export interface CreateBlogPostInput {
  title: string
  slug?: string
  category: string
  excerpt: string
  content: string
  coverImage?: string
  imagePrompt?: string
  readTimeMinutes?: number
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  status?: "DRAFT" | "PUBLISHED"
}

export async function getBlogPosts(params?: { category?: string; status?: string; search?: string }) {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const whereClause: any = { userId: user.id }

    if (params?.category && params.category !== "ALL") {
      whereClause.category = params.category
    }

    if (params?.status && params.status !== "ALL") {
      whereClause.status = params.status
    }

    if (params?.search) {
      whereClause.OR = [
        { title: { contains: params.search } },
        { excerpt: { contains: params.search } },
        { content: { contains: params.search } },
      ]
    }

    const posts = await prisma.blogPost.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })

    return posts.map((p) => ({
      ...p,
      tags: safeParseArray(p.tags),
    }))
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { id },
    })
    if (!post) return null
    return {
      ...post,
      tags: safeParseArray(post.tags),
    }
  } catch (error) {
    console.error("Failed to fetch blog post by id:", error)
    return null
  }
}

export async function createBlogPost(data: CreateBlogPostInput) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const slug = (data.slug || data.title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u0621-\u064A\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60)

    // Check if slug exists for this user
    let finalSlug = slug
    const existing = await prisma.blogPost.findUnique({
      where: {
        userId_slug: {
          userId: user.id,
          slug: finalSlug,
        },
      },
    })
    if (existing) {
      finalSlug = `${slug}-${Date.now().toString().slice(-4)}`
    }

    const post = await prisma.blogPost.create({
      data: {
        userId: user.id,
        title: data.title,
        slug: finalSlug,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage || null,
        imagePrompt: data.imagePrompt || null,
        readTimeMinutes: data.readTimeMinutes || 5,
        tags: JSON.stringify(data.tags || []),
        seoTitle: data.seoTitle || data.title,
        seoDescription: data.seoDescription || data.excerpt,
        status: data.status || "DRAFT",
        publishedAt: data.status === "PUBLISHED" ? new Date() : null,
      },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/dashboard")
    return { success: true, post }
  } catch (error: unknown) {
    console.error("Failed to create blog post:", error)
    const msg = error instanceof Error ? error.message : "Failed to create post"
    return { success: false, error: msg }
  }
}

export async function updateBlogPost(id: string, data: Partial<CreateBlogPostInput>) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const updateData: any = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.slug !== undefined) updateData.slug = data.slug
    if (data.category !== undefined) updateData.category = data.category
    if (data.excerpt !== undefined) updateData.excerpt = data.excerpt
    if (data.content !== undefined) updateData.content = data.content
    if (data.coverImage !== undefined) updateData.coverImage = data.coverImage
    if (data.imagePrompt !== undefined) updateData.imagePrompt = data.imagePrompt
    if (data.readTimeMinutes !== undefined) updateData.readTimeMinutes = data.readTimeMinutes
    if (data.tags !== undefined) updateData.tags = JSON.stringify(data.tags)
    if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle
    if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription
    if (data.status !== undefined) {
      updateData.status = data.status
      if (data.status === "PUBLISHED") {
        updateData.publishedAt = new Date()
      }
    }

    const updated = await prisma.blogPost.update({
      where: { id, userId: user.id },
      data: updateData,
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/dashboard")
    return { success: true, post: updated }
  } catch (error: unknown) {
    console.error("Failed to update blog post:", error)
    const msg = error instanceof Error ? error.message : "Failed to update post"
    return { success: false, error: msg }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    await prisma.blogPost.delete({
      where: { id, userId: user.id },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error: unknown) {
    console.error("Failed to delete blog post:", error)
    const msg = error instanceof Error ? error.message : "Failed to delete post"
    return { success: false, error: msg }
  }
}

export async function toggleBlogPostPublish(id: string) {
  try {
    const user = await getActiveUser()
    if (!user) return { success: false, error: "User not found" }

    const post = await prisma.blogPost.findUnique({
      where: { id, userId: user.id },
    })
    if (!post) return { success: false, error: "Post not found" }

    const newStatus = post.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED"
    const updated = await prisma.blogPost.update({
      where: { id },
      data: {
        status: newStatus,
        publishedAt: newStatus === "PUBLISHED" ? new Date() : null,
      },
    })

    revalidatePath("/dashboard/blog")
    revalidatePath("/dashboard")
    return { success: true, post: updated }
  } catch (error: unknown) {
    console.error("Failed to toggle publish status:", error)
    const msg = error instanceof Error ? error.message : "Failed to toggle status"
    return { success: false, error: msg }
  }
}

export async function generateAIBlogPostAction(input: {
  topic: string
  category: string
  language?: "ar" | "en"
  targetLength?: "short" | "deep"
}) {
  try {
    const generated = await AIService.generateBlogPostContent({
      topic: input.topic,
      category: input.category,
      language: input.language || "ar",
      targetLength: input.targetLength || "deep",
    })

    const saveResult = await createBlogPost({
      title: generated.title,
      slug: generated.slug,
      category: generated.category || input.category,
      excerpt: generated.excerpt,
      content: generated.content,
      readTimeMinutes: generated.readTimeMinutes || 5,
      tags: generated.tags || [],
      seoTitle: generated.seoTitle,
      seoDescription: generated.seoDescription,
      imagePrompt: generated.imagePrompt,
      status: "DRAFT",
    })

    return {
      success: true,
      blogPost: saveResult.post,
      generated,
    }
  } catch (error: unknown) {
    console.error("Failed to generate AI blog post:", error)
    const msg = error instanceof Error ? error.message : "AI Blog Generation failed"
    return { success: false, error: msg }
  }
}
