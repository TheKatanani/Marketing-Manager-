"use server"

import { getActiveUser } from "@/lib/active-user"

import { prisma } from "@/lib/prisma"
import { AIService } from "@/lib/ai/provider"
import { revalidatePath } from "next/cache"
import { getBrandProfile } from "./brand-actions"
import { getProjectBySlug, getProjects } from "./project-actions"

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



export async function getIdeas() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const ideas = await prisma.contentIdea.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
        posts: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    })

    return ideas
  } catch (error) {
    console.error("Failed to fetch ideas:", error)
    return []
  }
}

export async function getIdeaById(id: string) {
  try {
    const idea = await prisma.contentIdea.findUnique({
      where: { id },
      include: {
        project: true,
        posts: {
          include: {
            versions: true,
          },
        },
      },
    })

    return idea
  } catch (error) {
    console.error("Failed to fetch idea:", error)
    return null
  }
}

export async function generateAndSaveIdeas(projectId: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const rawProject = await prisma.project.findUnique({
      where: { id: projectId, userId: user.id },
    })

    if (!rawProject) {
      return { success: false, error: "Project not found in Knowledge Base." }
    }

    const project = {
      ...rawProject,
      techStack: safeParseArray(rawProject.techStack),
      keyMetrics: safeParseArray(rawProject.keyMetrics),
    }

    const brand = await getBrandProfile()
    const brandData = {
      toneOfVoice: brand?.toneOfVoice || "Pragmatic, authoritative, technical problem solver.",
      targetAudienceSummary: brand?.targetAudienceSummary || "Tech recruiters and engineering managers.",
      contentPillars: brand?.contentPillars || ["System Design", "Client Case Studies"],
    }

    // Call AI Service
    const generatedIdeas = await AIService.generateIdeas(project, brandData)

    // Save generated ideas to database
    const createdIdeas = []
    for (const idea of generatedIdeas) {
      const created = await prisma.contentIdea.create({
        data: {
          userId: user.id,
          projectId: project.id,
          title: idea.title,
          hook: idea.hook,
          targetAudience: idea.targetAudience,
          contentPillar: idea.contentPillar,
          targetPlatform: "ALL",
          status: "IDEA",
          sourceNotes: `Core Angle: ${idea.coreAngle}\nWhy it works: ${idea.whyItWorks}\nCTA: ${idea.callToAction}`,
        },
      })
      createdIdeas.push(created)
    }

    revalidatePath("/dashboard/ideas")
    revalidatePath("/dashboard")
    revalidatePath("/dashboard/projects")

    return { success: true, ideas: createdIdeas }
  } catch (error: unknown) {
    console.error("Failed to generate ideas:", error)
    const message = error instanceof Error ? error.message : "Idea generation failed"
    return { success: false, error: message }
  }
}

export async function generateFlexibleIdeasAction(input: {
  category: "TECH_TIP" | "FREELANCE_ADVICE" | "MARKETING_CRO" | "PROJECT_STORY" | "CUSTOM"
  customTopic?: string
  projectId?: string
}) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    if (input.category === "PROJECT_STORY" && input.projectId) {
      return await generateAndSaveIdeas(input.projectId)
    }

    const ideasBlueprint: Record<
      string,
      { title: string; hook: string; audience: string; pillar: string; notes: string }[]
    > = {
      TECH_TIP: [
        {
          title: "5 أخطاء شائعة في Next.js تجعل موقعك بطيئاً",
          hook: "هل تعلم أن 40% من مطوري Next.js يستوردون مكتبات ضخمة داخل الـ Client Components دون قصد؟",
          audience: "مطورو الويب، مهندسو البرمجيات، والتقنيون",
          pillar: "نصائح برمجية وتقنية",
          notes: "شرح مفصل لطرق تحسين SSR و Dynamic Imports وضبط الصور عبر next/image.",
        },
        {
          title: "متى تختار React ومتى تختار منصة مثل WordPress أو Shopify؟",
          hook: "لا أبيعك تقنية — أبيعك نتيجة. ليس كل عميل يحتاج تطبيق React مخصص يكلف آلاف الدولارات.",
          audience: "أصحاب الشركات، رواد الأعمال، ومديرو المشاريع",
          pillar: "هندسة الحلول والنتائج",
          notes: "مقارنة عملية بين مسار التطوير المخصص والمنصات الجاهزة وتوفير الوقت والتكلفة.",
        },
        {
          title: "أسرار خفض زمن تحميل الموقع لأقل من ثانية واحدة (Core Web Vitals)",
          hook: "الأداء والوضوح ليسا رفاهية — هما ما يحوّل الزائر إلى عميل. كيف تضمن أعلى درجات Google PageSpeed؟",
          audience: "المطورون وأصحاب المتاجر الإلكترونية",
          pillar: "الأداء والسرعة",
          notes: "خطوات عملية لتحسين LCP و CLS وتقليل الـ JavaScript Payload.",
        },
      ],
      FREELANCE_ADVICE: [
        {
          title: "كيف تحافظ على تقييم 5.0 ومعدل تسليم 100% على Upwork وخمسات",
          hook: "العميل في العمل الحر لا يدفع لك مقابل ساعات جلوسك خلف الشاشة، بل يدفع مقابل راحة البال.",
          audience: "المستقلون، الفريلانسرز، والمطورون الجدد",
          pillar: "أسرار العمل الحر",
          notes: "إدارة توقعات العميل، سرعة الرد (دقيقتان)، وتوثيق نطاق العمل قبل البدء.",
        },
        {
          title: "كيف تسعّر مشاريع الويب بالقيمة والنتيجة وليس بعدد الساعات",
          hook: "إذا كنت تسعّر مشاريعك بالساعة، فأنت تعاقب نفسك كلما أصبحت أسرع وأكثر خبرة!",
          audience: "المستقلون وأصحاب الوكالات البرمجية",
          pillar: "التسعير والبيزنس",
          notes: "كيف تحسب العائد التجاري للمشروع وتضع سعراً يعكس القيمة المقدمة للعميل.",
        },
        {
          title: "أهم أسباب رفض مقترحات العمل الحر (Proposals) وكيف تتفاداها",
          hook: "أغلب المستقلين يكتبون فقرات طويلة عن أنفسهم؛ بينما العميل يبحث فقط عمن يفهم مشكلته ويحلها فوراً.",
          audience: "فريلانسرز منصات Upwork و Mostaql",
          pillar: "استراتيجيات الفريلانس",
          notes: "هيكل المقترح الرابح في 4 أسطر تجعل العميل يفتح المحادثة معك مباشرة.",
        },
      ],
      MARKETING_CRO: [
        {
          title: "لماذا تفشل 80% من المواقع في تحويل الزوار إلى مبيعات؟",
          hook: "يمكنك جلب آلاف الزيارات بميزانية إعلانية ضخمة، لكن إن كانت صفحة الهبوط مشتتة، فالأموال تضيع هباءً.",
          audience: "أصحاب الأعمال، مسؤولو التسويق، وأصحاب المتاجر",
          pillar: "زيادة المبيعات والتحويل (CRO)",
          notes: "أهمية وضوح العرض في أول 5 ثوانٍ، وإزالة الحقول غير الضرورية في نماذج التواصل.",
        },
        {
          title: "قوة زر الواتساب المباشر في مضاعفة مبيعات المواقع العربية",
          hook: "في السوق العربي والخليجي، العميل يفضل المحادثة الفورية على انتظار بريد إلكتروني قد لا يصل أبداً.",
          audience: "أصحاب المتاجر والشركات المحلية",
          pillar: "تجربة المستخدم المحلية",
          notes: "كيف تدمج زر واتساب ذكي بتتبع إحصائيات مع رسائل ترحيبية مخصصة.",
        },
        {
          title: "كل ثانية تأخير في متجرك تخفض مبيعاتك 20%",
          hook: "السرعة ليست شأناً برمجياً بحتاً؛ هي مباشرة في حساب البنك ومعدل إتمام الشراء.",
          audience: "تجار شوبيفاي، ووكومرس، ورواد الأعمال",
          pillar: "أداء المتاجر الإلكترونية",
          notes: "تحسين سرعة إتمام الطلب (Checkout) وضغط الصور وإزالة السكربتات الميتة.",
        },
      ],
      CUSTOM: [
        {
          title: input.customTopic || "رؤية مهنية وتجربة عملية في تطوير الويب",
          hook: `هل تساءلت يوماً عن الأسلوب الأمثل للتعامل مع ${input.customTopic || "التحديات البرمجية"}؟`,
          audience: "مجتمع المطورين وأصحاب المشاريع",
          pillar: "رأي مهني وخبرة عملية",
          notes: "مقال ونقاش يركز على الدروس المستفادة والحلول العملية المباشرة.",
        },
      ],
    }

    const selectedList = ideasBlueprint[input.category] || ideasBlueprint.TECH_TIP
    const createdIdeas = []

    for (const item of selectedList) {
      const created = await prisma.contentIdea.create({
        data: {
          userId: user.id,
          title: item.title,
          hook: item.hook,
          targetAudience: item.audience,
          contentPillar: item.pillar,
          targetPlatform: "ALL",
          status: "IDEA",
          sourceNotes: item.notes,
        },
      })
      createdIdeas.push(created)
    }

    revalidatePath("/dashboard/ideas")
    revalidatePath("/dashboard")

    return { success: true, ideas: createdIdeas }
  } catch (error: unknown) {
    console.error("Failed to generate flexible ideas:", error)
    const message = error instanceof Error ? error.message : "Idea generation failed"
    return { success: false, error: message }
  }
}

export async function getPosts() {
  try {
    const user = await getActiveUser()
    if (!user) return []

    const posts = await prisma.post.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        versions: true,
        idea: {
          select: {
            id: true,
            title: true,
            hook: true,
            contentPillar: true,
            targetAudience: true,
          },
        },
      },
    })

    return posts.map((p) => ({
      ...p,
      versions: p.versions.map((v) => ({
        ...v,
        hashtags: safeParseArray(v.hashtags),
      })),
    }))
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return []
  }
}

export async function getPostById(id: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        versions: true,
        idea: {
          include: {
            project: true,
          },
        },
        approvals: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!post) return null

    return {
      ...post,
      versions: post.versions.map((v) => ({
        ...v,
        hashtags: safeParseArray(v.hashtags),
      })),
    }
  } catch (error) {
    console.error("Failed to fetch post:", error)
    return null
  }
}

export async function generateAndSaveDrafts(ideaId: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const idea = await prisma.contentIdea.findUnique({
      where: { id: ideaId, userId: user.id },
      include: {
        project: true,
      },
    })

    if (!idea) {
      return { success: false, error: "Content idea not found." }
    }

    // If an idea has no linked project, treat it as a standalone tip or practice rather than forcing an unrelated case study
    const rawProject = idea.project
    const project = rawProject
      ? {
          ...rawProject,
          techStack: safeParseArray(rawProject.techStack),
          keyMetrics: safeParseArray(rawProject.keyMetrics),
        }
      : {
          id: "",
          userId: user.id,
          slug: "standalone-insight",
          projectContext: "Industry Best Practice & Practical Tip",
          isFeatured: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          completedAt: null,
          projectUrl: null,
          repositoryUrl: null,
          title: "Standalone Topic / Industry Best Practice",
          problemStatement: idea.hook,
          solutionArchitecture: idea.sourceNotes || "Direct practical advice and engineering insight.",
          techStack: [],
          businessImpact: "Client clarity, technical guidance, and reliable execution.",
          keyMetrics: [],
          constraintsFaced: "",
          lessonsLearned: idea.title,
        }

    const brand = await getBrandProfile()
    const brandData = {
      toneOfVoice: brand?.toneOfVoice || "Pragmatic, authoritative, technical problem solver.",
      targetAudienceSummary: brand?.targetAudienceSummary || "Tech recruiters and engineering managers.",
      contentPillars: brand?.contentPillars || ["System Design", "Client Case Studies"],
    }

    // Call AI Service
    const drafts = await AIService.generatePlatformDrafts(
      {
        title: idea.title,
        hook: idea.hook,
        targetAudience: idea.targetAudience,
        contentPillar: idea.contentPillar,
      },
      project,
      brandData
    )

    // Create Post in database
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        ideaId: idea.id,
        title: idea.title,
        status: "IN_REVIEW",
      },
    })

    // Create LinkedIn Version
    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "LINKEDIN",
        content: drafts.linkedin.content,
        hashtags: JSON.stringify(drafts.linkedin.hashtags),
        status: "DRAFT",
      },
    })

    // Create Instagram Version
    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "INSTAGRAM",
        content: drafts.instagram.caption,
        hashtags: JSON.stringify(drafts.instagram.hashtags),
        visualPrompt: drafts.instagram.imagePrompt,
        carouselSlides: JSON.stringify(drafts.instagram.carouselSlides),
        status: "DRAFT",
      },
    })

    // Create X (Twitter) Version
    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "X",
        content: drafts.xTwitter.tweets.join("\n\n---\n\n"),
        hashtags: JSON.stringify(drafts.xTwitter.hashtags),
        status: "DRAFT",
      },
    })

    // Update Idea status
    await prisma.contentIdea.update({
      where: { id: idea.id },
      data: { status: "DRAFT" },
    })

    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard/ideas")
    revalidatePath("/dashboard")

    return { success: true, postId: post.id }
  } catch (error: unknown) {
    console.error("Failed to generate drafts:", error)
    const message = error instanceof Error ? error.message : "Draft generation failed"
    return { success: false, error: message }
  }
}

export async function updatePostVersion(versionId: string, content: string, hashtags: string[]) {
  try {
    const updated = await prisma.postVersion.update({
      where: { id: versionId },
      data: {
        content,
        hashtags: JSON.stringify(hashtags),
      },
    })

    revalidatePath("/dashboard/content")
    return { success: true, version: updated }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update version"
    return { success: false, error: message }
  }
}

export async function updatePostStatus(postId: string, status: string, feedback?: string) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    const post = await prisma.post.update({
      where: { id: postId, userId: user.id },
      data: { status },
    })

    // Record decision in Approval audit log
    await prisma.approval.create({
      data: {
        postId: post.id,
        userId: user.id,
        decision: status,
        feedback: feedback || null,
      },
    })

    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard")

    return { success: true, post }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update status"
    return { success: false, error: message }
  }
}

export interface CreateFlexiblePostInput {
  category: "TECH_TIP" | "FREELANCE_ADVICE" | "MARKETING_CRO" | "PROJECT_STORY" | "CUSTOM"
  topic: string
  contextNotes?: string
  targetPlatform?: "ALL" | "LINKEDIN" | "X" | "INSTAGRAM"
  language?: "ar" | "en"
  projectId?: string
}

export async function createFlexiblePostAction(input: CreateFlexiblePostInput) {
  try {
    const user = await getActiveUser()
    if (!user) {
      return { success: false, error: "Active user not found." }
    }

    let projectData = null
    if (input.projectId) {
      const raw = await prisma.project.findUnique({
        where: { id: input.projectId, userId: user.id },
      })
      if (raw) {
        projectData = {
          title: raw.title,
          problemStatement: raw.problemStatement,
          solutionArchitecture: raw.solutionArchitecture,
          techStack: safeParseArray(raw.techStack),
          businessImpact: raw.businessImpact,
          keyMetrics: safeParseArray(raw.keyMetrics),
          lessonsLearned: raw.lessonsLearned,
        }
      }
    }

    // Call Flexible AI Service
    const drafts = await AIService.generateFlexibleContent({
      category: input.category,
      topic: input.topic,
      contextNotes: input.contextNotes,
      targetPlatform: input.targetPlatform || "ALL",
      language: input.language || "ar",
      project: projectData,
    })

    // Create Content Idea
    const idea = await prisma.contentIdea.create({
      data: {
        userId: user.id,
        projectId: input.projectId || null,
        title: input.topic,
        hook: drafts.linkedin.headline || input.topic,
        targetAudience:
          input.category === "FREELANCE_ADVICE"
            ? "Freelancers & Remote Clients"
            : input.category === "MARKETING_CRO"
            ? "Business Founders & Store Owners"
            : "Software Engineers & Tech Leaders",
        contentPillar: input.category,
        targetPlatform: input.targetPlatform || "ALL",
        status: "APPROVED",
        sourceNotes: input.contextNotes || `Generated for category ${input.category}`,
      },
    })

    // Create Post
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        ideaId: idea.id,
        title: input.topic,
        status: "APPROVED",
      },
    })

    // Create Versions
    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "LINKEDIN",
        content: drafts.linkedin.content,
        hashtags: JSON.stringify(drafts.linkedin.hashtags),
        status: "APPROVED",
      },
    })

    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "INSTAGRAM",
        content: drafts.instagram.caption,
        hashtags: JSON.stringify(drafts.instagram.hashtags),
        visualPrompt: drafts.instagram.imagePrompt,
        carouselSlides: JSON.stringify(drafts.instagram.carouselSlides),
        status: "APPROVED",
      },
    })

    await prisma.postVersion.create({
      data: {
        postId: post.id,
        platform: "X",
        content: drafts.xTwitter.tweets.join("\n\n---\n\n"),
        hashtags: JSON.stringify(drafts.xTwitter.hashtags),
        status: "APPROVED",
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/content")
    revalidatePath("/dashboard/ideas")
    revalidatePath("/dashboard/review")

    return {
      success: true,
      postId: post.id,
      drafts,
    }
  } catch (error: unknown) {
    console.error("Failed to create flexible post:", error)
    const message = error instanceof Error ? error.message : "Content generation failed"
    return { success: false, error: message }
  }
}
