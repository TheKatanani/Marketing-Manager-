export const AI_SYSTEM_INSTRUCTIONS = `
You are BrandPilot AI — the dedicated AI Marketing Department for Mohammed Katanani (محمد القطناني), web developer and founder of thekatanani.com.

BRAND IDENTITY & POSITIONING:
- Professional Title: مطور ويب | Next.js · React · Shopify · WordPress
- Official Website: https://thekatanani.com
- Core Philosophy:
  1. "أبني لك الموقع الصحيح بالأداة الصحيحة" (The right website with the right tool).
  2. "لا أبيعك تقنية — أبيعك نتيجة" (I don't sell tech — I sell tangible results).
  3. "الأداء والوضوح ليسا رفاهية — هما ما يحوّل الزائر إلى عميل" (Performance and clarity turn visitors into paying clients).
  4. Two balanced tracks: Custom Development (Next.js/React/Vue) when the project demands unique UX and high performance, and Platform Implementation (Shopify/WordPress/Wix) when it is smarter for timeline and budget.
  5. Native RTL Arabic expertise combined with cutting-edge global web standards.
  6. Verified record: 5.0 stars on Khamsat, 100% Job Success on Upwork, 100% on-time delivery.

CONTENT EXPERTISE PILLARS:
1. TECH & CODING TIPS (نصائح تقنية وبرمجية):
   - Next.js 15/16, React 19, TypeScript, Tailwind CSS, API integrations, Core Web Vitals, speed optimization.
   - Practical, actionable advice for developers, tech leads, and founders.
2. FREELANCING & CLIENT MASTERY (نصائح العمل الحر والفريلانس):
   - Proven strategies on Upwork and Khamsat: winning proposals, client vetting, project pricing, maintaining 100% job success and 5.0 ratings.
   - Lessons learned from real client interactions.
3. MARKETING, CRO & BUSINESS CONVERSION (نصائح تسويقية وزيادة المبيعات):
   - How websites convert traffic into revenue, landing page design that sells, CTA optimization, WhatsApp sales automation.
   - Helping businesses see websites as growth engines rather than mere expenses.
4. REAL CASE STUDIES & LESSONS (تجارب وقصص من مشاريع حقيقية):
   - Real stories and architectural bottlenecks from verified projects (Geepas Iraq, Aviation Academy, CoachSpace, Babylon Luxury Cars, etc.).
5. CUSTOM & TIMELY TOPICS (مواضيع حرة وتريندات):
   - Perspectives on AI in development, modern web trends, developer productivity, and career growth.

CRITICAL OPERATIONAL RULES:
1. ANTI-HALLUCINATION GUARD: Never invent fictitious client names, fake statistics, or made-up credentials. Ground personal achievements exclusively in thekatanani.com facts.
2. ZERO FLUFF: Start with a powerful hook. Deliver high value in every paragraph. No generic filler phrases.
3. LANGUAGE DUALITY: Produce authentic, natural Arabic (فصحى عصرية وجذابة) or sharp English.
4. ONE CORE IDEA, MULTI-PLATFORM ADAPTATION:
   - LinkedIn: Thought-leadership narrative, actionable tips or story with clean paragraph breaks and strong engagement CTA.
   - Instagram: 5-6 slide educational carousel outline with slide titles, concise punchy copy, and a visual art prompt.
   - X (Twitter): High-impact 3-4 tweet thread with a viral opening hook and concise takeaways.
`

export interface FlexibleContentParams {
  category: "TECH_TIP" | "FREELANCE_ADVICE" | "MARKETING_CRO" | "PROJECT_STORY" | "CUSTOM"
  topic: string
  contextNotes?: string
  targetPlatform?: "ALL" | "LINKEDIN" | "X" | "INSTAGRAM"
  language?: "ar" | "en"
  project?: {
    title: string
    problemStatement: string
    solutionArchitecture: string
    techStack: string[]
    businessImpact: string
    keyMetrics: string[]
    lessonsLearned: string
  } | null
}

export function buildFlexiblePostPrompt(params: FlexibleContentParams) {
  const isAr = params.language !== "en"
  const categoryLabels = {
    TECH_TIP: isAr ? "نصائح برمجية وتقنية للمطورين ورواد الأعمال" : "Web Development & Engineering Tips",
    FREELANCE_ADVICE: isAr ? "نصائح وإرشادات للعمل الحر والفريلانسرز (Upwork / خمسات)" : "Freelancing, Client Acquisition & Remote Career Advice",
    MARKETING_CRO: isAr ? "نصائح تسويقية وزيادة المبيعات والتحويل (CRO & Landing Pages)" : "Marketing, Conversion Rate Optimization & Business Growth",
    PROJECT_STORY: isAr ? "قصة ودرس واقعي من مشروع حقيقي من thekatanani.com" : "Real-World Engineering Case Study from thekatanani.com",
    CUSTOM: isAr ? "موضوع مخصص ورأي مهني" : "Custom Professional Topic",
  }

  let projectContext = ""
  if (params.project) {
    projectContext = `
VERIFIED PROJECT ANCHOR:
- Title: ${params.project.title}
- Problem Solved: ${params.project.problemStatement}
- Solution: ${params.project.solutionArchitecture}
- Stack: ${params.project.techStack?.join(", ")}
- Business Outcome: ${params.project.businessImpact}
- Key Metric: ${params.project.keyMetrics?.join(", ")}
- Lesson: ${params.project.lessonsLearned}
`
  }

  return `
Create a high-impact, platform-ready content package for Mohammed Katanani.

CONTENT CATEGORY: ${categoryLabels[params.category] || params.category}
TOPIC / CENTRAL HOOK: ${params.topic}
${params.contextNotes ? `ADDITIONAL CONTEXT & BULLETS: ${params.contextNotes}` : ""}
${projectContext}
OUTPUT LANGUAGE: ${isAr ? "Arabic (العربية الفصحى العصرية السلسة والمحفزة)" : "English (Clear, authoritative, and engaging)"}

Generate JSON formatted drafts matching the following specifications:
1. LinkedIn Post:
   - High-converting opening hook (first 2 lines before "see more")
   - Value-packed body: 3-5 concise sections with bullet points or numbered insights
   - Actionable takeaway reflecting Mohammed Katanani's philosophy ("أبني لك الموقع الصحيح بالأداة الصحيحة" or "لا أبيعك تقنية — أبيعك نتيجة")
   - Engaging conversational CTA
   - 4-5 relevant hashtags

2. Instagram Post:
   - Caption with a strong hook
   - 5-6 carousel slides structured as:
     * Slide 1: Catchy title & subtitle
     * Slides 2-5: Step-by-step actionable insights
     * Slide 6: Summary + Call to Action
   - 5-6 relevant hashtags
   - DALL-E / Visual art prompt describing the cover image aesthetic

3. X (Twitter) Thread:
   - 3 to 4 connected tweets (array of strings)
   - Tweet 1: High-impact opening hook + thread indicator (🧵)
   - Tweets 2-3: Core actionable advice / breakdown
   - Tweet 4: Summary takeaway + question to spark replies
   - 3-4 hashtags
`
}

export function buildIdeaGenerationPrompt(params: {
  projectTitle: string
  problemStatement: string
  solutionArchitecture: string
  techStack: string[]
  businessImpact: string
  keyMetrics: string[]
  constraintsFaced: string
  lessonsLearned: string
  toneOfVoice: string
  targetAudiences: string
  contentPillars: string[]
}) {
  return `
Analyze the following verified software engineering case study from thekatanani.com and generate 3 compelling, fact-backed content ideas for Mohammed Katanani.

PROJECT CASE STUDY:
- Title: ${params.projectTitle}
- Problem & Bottleneck: ${params.problemStatement}
- Architecture & Solution: ${params.solutionArchitecture}
- Tech Stack: ${params.techStack.join(", ")}
- Business Impact: ${params.businessImpact}
- Key Metrics: ${params.keyMetrics.join(", ")}
- Constraints Faced: ${params.constraintsFaced}
- Lessons Learned: ${params.lessonsLearned}

BRAND STRATEGY GUIDELINES:
- Tone of Voice: ${params.toneOfVoice}
- Target Audiences: ${params.targetAudiences}
- Approved Content Pillars: ${params.contentPillars.join(", ")}

Generate 3 unique content angles. Each idea must have:
- A strong, non-generic hook
- Specific target audience segment
- Appropriate content pillar
- Core angle (the central thesis)
- Strategic rationale (why it works)
- Strong call to action
`
}

export function buildUnifiedInstagramArtPrompt(params: {
  topic: string
  slideCount: number
  slides?: { slideNumber: number; title: string; bodyText: string }[]
}) {
  const slidesSummary = params.slides
    ? params.slides.map((s) => `Slide ${s.slideNumber}: ${s.title}`).join(", ")
    : ""

  return `Modern minimalist tech-editorial carousel graphics set of ${params.slideCount} cohesive slides for Instagram on '${params.topic}'. 
Visual Art Direction: Deep petroleum blue (#0A4D68) luxury dark background with clean sky blue (#D2E5F0) geometric lines and glowing sage green (#A7C8B4) accent chips. High contrast, sharp typography inspired by Apple and Linear design systems, 1:1 square ratio, clean negative space, premium engineering aesthetic, zero clutter, 8k resolution, photorealistic studio lighting.`
}

export function buildBlogPostPrompt(params: {
  topic: string
  category: string
  language?: "ar" | "en"
  targetLength?: "short" | "deep"
}) {
  const isAr = params.language !== "en"

  return `
You are BrandPilot AI writing an authoritative, in-depth blog post for Mohammed Katanani's developer portfolio at thekatanani.com.

TOPIC / IDEA: ${params.topic}
CATEGORY: ${params.category}
TARGET LENGTH: ${params.targetLength === "short" ? "800-1000 words" : "1200-1600 words"}
LANGUAGE: ${isAr ? "Modern Arabic (عربية فصحى راقية وسلسة مع أمثلة عملية وكود نظيف)" : "English (Authoritative, practical, and clear)"}

GUIDELINES & TONE:
- Mohammed Katanani's voice: Pragmatic, business-focused web engineer ("أبني لك الموقع الصحيح بالأداة الصحيحة", "لا أبيعك تقنية — أبيعك نتيجة").
- Real value: Avoid generic surface-level advice. Include actionable steps, code examples or architectural trade-offs where applicable, and real business context.
- Structure:
  * Catchy Title & Excerpt
  * Strong Intro with a compelling hook
  * 3-4 deep H2 sections with concrete takeaways, bullet points, and code/architecture blocks
  * Summary & Call-To-Action connecting back to working with Mohammed or visiting thekatanani.com

Output MUST be a JSON object matching:
{
  "title": string,
  "slug": string (kebab-case, e.g. "nextjs-vs-shopify-guide"),
  "category": "${params.category}",
  "excerpt": string (2-3 sentences summarizing the value),
  "readTimeMinutes": number,
  "tags": string[],
  "seoTitle": string (under 60 chars),
  "seoDescription": string (under 160 chars),
  "imagePrompt": string (Prompt for cover image),
  "content": string (Full Markdown with #, ##, ###, code blocks, lists, bold text)
}
`
}

export function buildPlatformDraftsPrompt(params: {
  ideaTitle: string
  ideaHook: string
  targetAudience: string
  contentPillar: string
  projectTitle: string
  problemStatement: string
  solutionArchitecture: string
  techStack: string[]
  businessImpact: string
  keyMetrics: string[]
  constraintsFaced: string
  lessonsLearned: string
  toneOfVoice: string
}) {
  return `
Generate 3 platform-tailored content drafts for Mohammed Katanani (thekatanani.com) based on this verified case study:

CORE IDEA:
- Title: ${params.ideaTitle}
- Hook: ${params.ideaHook}
- Target Audience: ${params.targetAudience}
- Content Pillar: ${params.contentPillar}

FACTUAL PROJECT SOURCE:
- Project Title: ${params.projectTitle}
- Problem: ${params.problemStatement}
- Architecture: ${params.solutionArchitecture}
- Tech Stack: ${params.techStack.join(", ")}
- Measurable Impact: ${params.businessImpact}
- Key Metrics: ${params.keyMetrics.join(", ")}
- Constraints Faced: ${params.constraintsFaced}
- Lessons Learned: ${params.lessonsLearned}
- Tone of Voice: ${params.toneOfVoice}

PLATFORM SPECIFICATIONS:
1. LinkedIn:
   - Compelling professional headline
   - Problem-solving case study narrative (3-5 paragraphs with clean spacing)
   - Verified business results and metrics highlighted
   - Pragmatic takeaway reflecting "لا أبيعك تقنية — أبيعك نتيجة"
   - 4-5 relevant technical hashtags
   - Professional discussion CTA
2. Instagram:
   - Engaging caption referencing the verified case study
   - Structured 5-6 slide carousel with titles, concise body text, and visual cues
   - 5-6 relevant hashtags
   - DALL-E / Midjourney visual prompt for Creative Director
3. X (Twitter):
   - 3-4 connected tweets separated by '---'
   - Punchy opening tweet with hook
   - Direct breakdown of technical trade-offs and business impact
   - 3-4 focused hashtags
`
}
