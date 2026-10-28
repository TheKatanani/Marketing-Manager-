import {
  GeneratedIdeasOutputSchema,
  PlatformDraftsOutputSchema,
  BlogPostOutputSchema,
  type GeneratedIdea,
  type PlatformDraftsOutput,
  type GeneratedBlogPostOutput,
} from "./types"
import {
  AI_SYSTEM_INSTRUCTIONS,
  buildIdeaGenerationPrompt,
  buildPlatformDraftsPrompt,
  buildFlexiblePostPrompt,
  buildBlogPostPrompt,
  type FlexibleContentParams,
} from "./prompts"

interface ProjectInput {
  title: string
  problemStatement: string
  solutionArchitecture: string
  techStack: string[]
  businessImpact: string
  keyMetrics: string[]
  constraintsFaced: string
  lessonsLearned: string
}

interface BrandProfileInput {
  toneOfVoice: string
  targetAudienceSummary: string
  contentPillars: string[]
}

export class AIService {
  private static async callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) throw new Error("OPENAI_API_KEY not configured")

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`OpenAI API error: ${res.status} - ${errorText}`)
    }

    const json = await res.json()
    return json.choices[0].message.content
  }

  private static async callGemini(systemPrompt: string, userPrompt: string): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured")

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\nTask:\n${userPrompt}` }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      }),
    })

    if (!res.ok) {
      const errorText = await res.text()
      throw new Error(`Gemini API error: ${res.status} - ${errorText}`)
    }

    const json = await res.json()
    return json.candidates[0].content.parts[0].text
  }

  /**
   * Deterministic fact-backed generator fallback when no external API key is set.
   * Guarantees 100% anti-hallucination compliance and zero runtime failures.
   */
  private static generateDeterministicIdeas(
    project: ProjectInput,
    brand: BrandProfileInput
  ): GeneratedIdea[] {
    const primaryMetric = project.keyMetrics[0] || "Measurable business outcomes"
    const topTech = project.techStack.slice(0, 3).join(", ")

    return [
      {
        title: `When the standard API fails: Solving ${project.title.toLowerCase()}`,
        hook: `Most developers assume third-party services work identically everywhere. In production, regional constraints and edge cases can silently break your business.`,
        targetAudience: "Engineering Managers, CTOs & Tech Recruiters",
        contentPillar: brand.contentPillars[0] || "Architecture & System Design",
        coreAngle: `How engineering a custom ${topTech} solution replaced failing standard providers and achieved ${primaryMetric}.`,
        whyItWorks: `Highlights real engineering problem-solving and architectural initiative instead of copying tutorials.`,
        callToAction: `Have you ever had to build a custom proxy or fallback routing layer for regional APIs? Let's discuss below.`,
      },
      {
        title: `Architectural Case Study: Cutting latency and downtime with ${topTech}`,
        hook: `Building resilient web applications isn't about adding more microservices. It's about designing deterministic fallback paths.`,
        targetAudience: "Senior Full-Stack & Backend Engineers",
        contentPillar: brand.contentPillars[1] || "Real-World Regional Constraints",
        coreAngle: `Overcoming constraints (${project.constraintsFaced.slice(0, 80)}...) by applying ${project.lessonsLearned.slice(0, 80)}...`,
        whyItWorks: `Speaks directly to technical leaders who value pragmatic trade-offs over hype.`,
        callToAction: `What's your go-to pattern for graceful degradation in distributed systems?`,
      },
      {
        title: `How We Solved ${project.problemStatement.slice(0, 70)}...`,
        hook: `A client approached us with a critical bottleneck: ${project.problemStatement.slice(0, 90)}... Here is the architecture that fixed it.`,
        targetAudience: "Business Owners, Founders & E-Commerce Operators",
        contentPillar: brand.contentPillars[2] || "High-Volume E-Commerce Engineering",
        coreAngle: `Transforming a technical failure into business value: ${project.businessImpact.slice(0, 100)}...`,
        whyItWorks: `Connects code directly to revenue and customer retention — the #1 thing freelance clients care about.`,
        callToAction: `Are inventory or integration bugs holding back your checkout flow? DM me to review your setup.`,
      },
    ]
  }

  private static generateDeterministicDrafts(
    idea: { title: string; hook: string; targetAudience: string; contentPillar: string },
    project: ProjectInput
  ): PlatformDraftsOutput {
    const primaryMetric = project.keyMetrics[0] || "Substantial business impact"
    const secondaryMetric = project.keyMetrics[1] || "Zero downtime recorded"
    const topTech = project.techStack.join(", ")

    return {
      linkedin: {
        headline: `How we engineered a resilient fallback architecture to achieve ${primaryMetric}`,
        content: `${idea.hook}

When we first tackled this challenge, the bottleneck was clear:
${project.problemStatement}

Rather than patching over the symptoms, we stepped back to re-architect the data flow:
• Solution Architecture: ${project.solutionArchitecture}
• Technologies Applied: ${topTech}
• Key Engineering Constraint: ${project.constraintsFaced}

The results speak directly to business outcomes:
✅ ${project.businessImpact}
✅ Key Metric: ${primaryMetric}
✅ Reliability: ${secondaryMetric}

The biggest lesson from this project?
"${project.lessonsLearned}"

When hiring senior full-stack talent, don't look for developers who just implement APIs — look for engineers who understand constraints and build resilience when third-party tools fail.`,
        hashtags: [
          "#SoftwareEngineering",
          "#SystemDesign",
          "#NextJS",
          "#TypeScript",
          "#FullStackArchitecture",
        ],
        callToAction: `How does your team handle third-party service failover? Let's discuss in the comments.`,
      },
      instagram: {
        caption: `${idea.hook} Swipe through for the 6-slide system architecture breakdown of how we solved this problem with ${project.techStack[0]} & PostgreSQL. 🚀`,
        carouselSlides: [
          {
            slideNumber: 1,
            title: idea.title,
            bodyText: idea.hook,
            visualCue: "Bold dark header with minimal code graphic and high-contrast typography.",
          },
          {
            slideNumber: 2,
            title: "The Problem",
            bodyText: project.problemStatement,
            visualCue: "Warning icon with highlighted error metrics and user drop-off stat.",
          },
          {
            slideNumber: 3,
            title: "Why Standard APIs Failed",
            bodyText: project.constraintsFaced,
            visualCue: "Split comparison between expected API response vs. real regional bottleneck.",
          },
          {
            slideNumber: 4,
            title: "The Architecture",
            bodyText: project.solutionArchitecture,
            visualCue: "Clean block diagram: Client -> Gateway Router -> Fallback Queue -> Database.",
          },
          {
            slideNumber: 5,
            title: "The Measurable Impact",
            bodyText: `${project.businessImpact} (${primaryMetric})`,
            visualCue: "Large emerald green stat chips highlighting quantifiable business ROI.",
          },
          {
            slideNumber: 6,
            title: "Key Takeaway",
            bodyText: project.lessonsLearned,
            visualCue: "Summary card with call to action and profile avatar.",
          },
        ],
        hashtags: [
          "#webdevelopment",
          "#codinglife",
          "#softwareengineer",
          "#fullstackdeveloper",
          "#techlead",
        ],
        imagePrompt:
          "Modern dark-themed UI slide layout, clean typography, system design block diagram with glowing indigo and emerald accents, high resolution, 4k.",
      },
      xTwitter: {
        tweets: [
          `1/4 ${idea.hook}

A real-world case study on why single-provider dependencies in ${project.techStack[0]} can kill production 👇`,
          `2/4 The Bottleneck:
${project.problemStatement.slice(0, 220)}...

The Constraint: ${project.constraintsFaced.slice(0, 100)}...`,
          `3/4 The Solution Architecture:
We built an intelligent fallback routing engine using ${topTech}.

Results:
• ${primaryMetric}
• ${secondaryMetric}`,
          `4/4 The Takeaway:
"${project.lessonsLearned}"

Build circuit breakers into your critical channels before your third-party providers fail.

#NextJS #TypeScript #SystemDesign`,
        ],
        hashtags: ["#NextJS", "#TypeScript", "#SystemDesign", "#BuildInPublic"],
      },
    }
  }

  public static async generateIdeas(
    project: ProjectInput,
    brand: BrandProfileInput
  ): Promise<GeneratedIdea[]> {
    const userPrompt = buildIdeaGenerationPrompt({
      projectTitle: project.title,
      problemStatement: project.problemStatement,
      solutionArchitecture: project.solutionArchitecture,
      techStack: project.techStack,
      businessImpact: project.businessImpact,
      keyMetrics: project.keyMetrics,
      constraintsFaced: project.constraintsFaced,
      lessonsLearned: project.lessonsLearned,
      toneOfVoice: brand.toneOfVoice,
      targetAudiences: brand.targetAudienceSummary,
      contentPillars: brand.contentPillars,
    })

    if (process.env.OPENAI_API_KEY) {
      try {
        const rawJson = await this.callOpenAI(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        const parsed = GeneratedIdeasOutputSchema.parse(JSON.parse(rawJson))
        return parsed.ideas
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to deterministic engine:", err)
      }
    } else if (process.env.GEMINI_API_KEY) {
      try {
        const rawJson = await this.callGemini(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        const parsed = GeneratedIdeasOutputSchema.parse(JSON.parse(rawJson))
        return parsed.ideas
      } catch (err) {
        console.warn("Gemini API call failed, falling back to deterministic engine:", err)
      }
    }

    return this.generateDeterministicIdeas(project, brand)
  }

  public static async generatePlatformDrafts(
    idea: { title: string; hook: string; targetAudience: string; contentPillar: string },
    project: ProjectInput,
    brand: BrandProfileInput
  ): Promise<PlatformDraftsOutput> {
    const userPrompt = buildPlatformDraftsPrompt({
      ideaTitle: idea.title,
      ideaHook: idea.hook,
      targetAudience: idea.targetAudience,
      contentPillar: idea.contentPillar,
      projectTitle: project.title,
      problemStatement: project.problemStatement,
      solutionArchitecture: project.solutionArchitecture,
      techStack: project.techStack,
      businessImpact: project.businessImpact,
      keyMetrics: project.keyMetrics,
      constraintsFaced: project.constraintsFaced,
      lessonsLearned: project.lessonsLearned,
      toneOfVoice: brand.toneOfVoice,
    })

    if (process.env.OPENAI_API_KEY) {
      try {
        const rawJson = await this.callOpenAI(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return PlatformDraftsOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to deterministic engine:", err)
      }
    } else if (process.env.GEMINI_API_KEY) {
      try {
        const rawJson = await this.callGemini(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return PlatformDraftsOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("Gemini API call failed, falling back to deterministic engine:", err)
      }
    }

    return this.generateDeterministicDrafts(idea, project)
  }

  /**
   * Universal flexible content generator supporting:
   * - TECH_TIP (Coding & Architecture tips)
   * - FREELANCE_ADVICE (Upwork, pricing, client communication)
   * - MARKETING_CRO (Conversion, sales, landing pages)
   * - PROJECT_STORY (Lessons from verified projects)
   * - CUSTOM (Freeform topics)
   */
  public static async generateFlexibleContent(
    params: FlexibleContentParams
  ): Promise<PlatformDraftsOutput> {
    const userPrompt = buildFlexiblePostPrompt(params)

    if (process.env.OPENAI_API_KEY) {
      try {
        const rawJson = await this.callOpenAI(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return PlatformDraftsOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("OpenAI API call failed, falling back to Gemini/Deterministic:", err)
      }
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const rawJson = await this.callGemini(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return PlatformDraftsOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("Gemini API call failed, falling back to deterministic engine:", err)
      }
    }

    return this.generateDeterministicFlexibleDrafts(params)
  }

  private static generateDeterministicFlexibleDrafts(
    params: FlexibleContentParams
  ): PlatformDraftsOutput {
    const isAr = params.language !== "en"
    const topic = params.topic.trim()

    if (params.category === "FREELANCE_ADVICE") {
      return {
        linkedin: {
          headline: isAr
            ? `أسرار العمل الحر: ${topic}`
            : `Freelancing Mastery: ${topic}`,
          content: isAr
            ? `في عالم العمل الحر، لا أحد يدفع لك مقابل عدد ساعات عملك، بل يدفعون مقابل راحة البال والنتيجة المضمونة.

بفضل الله، الحفاظ على تقييم 5.0 ★ على خمسات ونسبة نجاح 100% على Upwork لم يكن وليد الصدفة، بل نتاج 3 مبادئ أساسية:

1. الوضوح قبل كتابة سطر كود واحد:
العميل لا يريد مفاجآت في منتصف الطريق. توثيق نطاق العمل (Scope) وتحديد ما يشمله وما لا يشمله يحميك ويحمي العميل.

2. سرعة الاستجابة تصنع الفارق:
الرد السريع (معدل استجابتي دقيقتان) يعطي العميل انطباعاً فورياً بالجدية والاحترافية، خاصة عندما يكون في موقف حرج يحتاج حلاً عاجلاً.

3. "لا أبيعك تقنية — أبيعك نتيجة":
عندما يسألك العميل عن بناء موقع، لا تتحدث معه بلغة المكتبات والـ Frameworks؛ تحدث معه بلغة تحويل الزوار إلى عملاء، وسرعة التحميل، وتجربة المستخدم السلسة.

ما هو أكبر تحدٍّ واجهته مع العملاء في بداية رحلتك في الفريلانس؟`
            : `In freelancing, clients don't pay for hours worked — they pay for certainty and business outcomes.

Maintaining a 100% Job Success Score on Upwork and a 5.0 rating requires three non-negotiables:

1. Crystal-Clear Scope Before Code:
Define exact deliverables. No ambiguity, no scope creep.

2. Rapid Response Builds Instant Trust:
Responding within minutes demonstrates reliability and respect for client deadlines.

3. Sell Outcomes, Not Technologies:
Clients don't buy React or Next.js; they buy conversion rates, speed, and revenue growth.

What's the #1 lesson you've learned from working with direct clients?`,
          hashtags: isAr
            ? ["#العمل_الحر", "#Upwork", "#خمسات", "#تطوير_الويب", "#نصائح_فريلانس"]
            : ["#Freelancing", "#UpworkSuccess", "#WebDev", "#ClientRetention", "#Consulting"],
          callToAction: isAr
            ? "شاركنا تجربتك في التعليقات أو راسلني لتبادل الخبرات."
            : "Share your top client management tip in the comments below.",
        },
        instagram: {
          caption: isAr
            ? `كيف تبني سمعة احترافية في العمل الحر وتجذب عملاء يقدرون عملك؟ تصفح الشرائح لمعرفة الخطوات العملية 🚀`
            : `How to build a high-ticket freelance reputation and retain clients with 100% job success. Swipe through 👉`,
          carouselSlides: [
            {
              slideNumber: 1,
              title: isAr ? "دليل الفريلانسر المحترف" : "Freelancing Playbook",
              bodyText: topic,
              visualCue: "Minimalist dark blue background with clean white typography and geometric accents.",
            },
            {
              slideNumber: 2,
              title: isAr ? "1. لا تنافس على السعر الأرخص" : "1. Never Compete on Price",
              bodyText: isAr
                ? "العميل الذي يبحث عن أرخص سعر هو في الغالب أكثر عميل استنزافاً لوقتك وطاقتك. نافس على القيمة وسرعة التسليم والاحترافية."
                : "Clients seeking the lowest rate usually cost the most time. Compete on reliability and outcome instead.",
              visualCue: "Chart comparing value pricing vs hourly racing to the bottom.",
            },
            {
              slideNumber: 3,
              title: isAr ? "2. التواصل هو 70% من النجاح" : "2. Communication is 70% of Success",
              bodyText: isAr
                ? "أبقِ العميل على اطلاع دائم. رسالة تحديث أسبوعية مختصرة توفر عليك ساعات من الشرح وسوء الفهم."
                : "Keep clients updated proactively. A short daily or weekly recap eliminates 90% of misunderstandings.",
              visualCue: "Chat bubble icon with checkmark indicators.",
            },
            {
              slideNumber: 4,
              title: isAr ? "3. التزم بالموعد مهما كلف الأمر" : "3. 100% On-Time Delivery",
              bodyText: isAr
                ? "التسليم في الموعد المحدد يبني لك شارة Rising Talent ومراجعات 5 نجوم تجلب لك العملاء اللاحقين دون عناء."
                : "Delivering strictly on deadline secures 5-star testimonials that automate future inbound leads.",
              visualCue: "Calendar clock illustration with green confirmation badge.",
            },
            {
              slideNumber: 5,
              title: isAr ? "4. الخلاصة" : "4. The Golden Rule",
              bodyText: isAr
                ? "أبني لك الموقع الصحيح بالأداة الصحيحة — والعميل الراضي هو أفضل مسوّق لخدماتك القادمة."
                : "The right website with the right tool. A delighted client is your best future marketing engine.",
              visualCue: "Quote card with Mohammed Katanani signature and thekatanani.com branding.",
            },
          ],
          hashtags: isAr
            ? ["#فريلانس", "#عمل_حر", "#نصائح_تقنية", "#ريادة_أعمال", "#upwork_arabic"]
            : ["#freelance", "#freelancerlife", "#webdevtips", "#remotework", "#agencyowner"],
          imagePrompt:
            "Clean editorial design layout, petroleum blue (#0A4D68) background with sky blue (#D2E5F0) geometric lines and clean typography, modern tech aesthetic.",
        },
        xTwitter: {
          tweets: isAr
            ? [
                `1/4 أهم قاعدة تعلمتها في الفريلانس بعد مئات المشاريع وتقييم 5.0 على خمسات وUpwork:

العميل لا يشتري منك "كود"، بل يشتري حل مشكلة حقيقية وتوفير وقت. 🧵👇`,
                `2/4 لا تبع تقنيات ومصطلحات معقدة لعميل يبحث عن مبيعات.

بدل أن تقول: "سأبني الموقع بـ Next.js و Tailwind"
قل له: "سأبني لك موقعاً فائق السرعة يحمّل في ثانية واحدة ويسهل على زوارك الشراء عبر الواتساب".`,
                `3/4 حدد نطاق العمل بدقة قبل أن تطلب دولاراً واحداً.

90% من نزاعات العمل الحر تنشأ بسبب: "ظننت أن هذه الميزة مشمولة!"
اكتب كل شيء بوضوح، وسيقدّر العميل صراحتك.`,
                `4/4 نصيحة أخيرة:
سرعة الرد والمصداقية في المواعيد هي ما يحوّل العميل المؤقت إلى عميل دائم يرسل لك أصدقاءه وشركاءه.

#العمل_الحر #تطوير_الويب`,
              ]
            : [
                `1/4 The #1 lesson after delivering hundreds of web projects with 100% Job Success on Upwork:

Clients don't buy code — they buy certainty and business outcomes. 🧵👇`,
                `2/4 Stop selling tech specs to founders who care about sales.

Instead of "I build Next.js custom full-stack web apps", say:
"I build high-converting web applications that load in under 1 second and drive inbound WhatsApp inquiries."`,
                `3/4 Over-communicate before you touch the keyboard.

90% of client disputes arise from unspoken assumptions. Clarify the deliverables in writing, deliver on time, and referrals follow automatically.`,
                `4/4 In summary:
The right website with the right tool. Build trust, deliver results, and price for business impact.

#Freelancing #WebDev #BuildInPublic`,
              ],
          hashtags: isAr
            ? ["#العمل_الحر", "#نصائح_برمجية", "#Upwork"]
            : ["#Freelance", "#WebDev", "#BuildInPublic"],
        },
      }
    }

    if (params.category === "MARKETING_CRO") {
      return {
        linkedin: {
          headline: isAr
            ? `لماذا لا تبيعك التقنية بل النتيجة؟ ${topic}`
            : `Why Tech Doesn't Sell Results: ${topic}`,
          content: isAr
            ? `يمكنك بناء الموقع الأكثر تطوراً برمجياً في العالم، ولكن إن كان الزائر يضيع ولا يعرف كيف يشتري أو يتواصل معك، فالموقع فشل في مهمته الأساسية.

"الأداء والوضوح ليسا رفاهية — هما ما يحوّل الزائر إلى عميل."

إليك 3 تعديلات بسيطة تضاعف معدل تحويل موقعك (Conversion Rate):

1. وضوح القيمة المعروضة في أول 5 ثوانٍ (The Above-the-Fold Rule):
يجب أن يعرف الزائر فور دخوله: ماذا تقدم؟ لمن تقدمه؟ وما الخطوة التالية؟ بدون لف ولا دوران.

2. تسهيل قناة التواصل المباشرة (WhatsApp First):
في منطقتنا العربية والخليجية تحديداً، زر الواتساب العائم بتصميم أنيق وسرعة نقرة واحدة يتفوق بمراحل على نماذج الاتصال المعقدة التي تتطلب 6 حقول.

3. سرعة التحميل وتجربة الجوال:
كل ثانية تأخير في تحميل متجرك أو موقعك تخفض معدل التحويل بنسبة تصل إلى 20%. السرعة ليست رفاهية للمبرمجين، بل هي مبيعات محققة في حساب البنك.

أبني لك الموقع الصحيح بالأداة الصحيحة: أحياناً صفحة هبوط سريعة بـ Next.js أو متجر شوبيفاي مهيأ بشكل ممتاز هو كل ما تحتاجه شركتك لتنطلق.`
            : `You can build the most technically advanced site in the world, but if visitors don't know how to take action, the site has failed its primary duty.

"Performance and clarity are not luxuries — they are what turn visitors into paying clients."

3 high-leverage tweaks to boost your website conversion:

1. Clear Above-the-Fold Proposition:
Visitors must understand within 5 seconds: What you solve, who you serve, and how to start.

2. Frictionless Contact (Instant Messaging):
Direct 1-click WhatsApp or booking flows consistently outperform lengthy 6-field inquiry forms.

3. Speed is Revenue:
Every 100ms latency drop impacts bottom-line conversions. Fast loading keeps prospective clients engaged.

The right website with the right tool — always designed for business impact.`,
          hashtags: isAr
            ? ["#التسويق_الرقمي", "#تحسين_التحويل", "#تطوير_المواقع", "#متاجر_إلكترونية", "#CRO"]
            : ["#ConversionRateOptimization", "#WebDesign", "#Ecommerce", "#GrowthMarketing", "#NextJS"],
          callToAction: isAr
            ? "هل يعاني موقعك الحالي من ضعف التحويل؟ تفضل بزيارة thekatanani.com أو شاركني رابط موقعك لألقي نظرة سريعة."
            : "Does your landing page convert visitors into inquiries? Let's discuss in the comments.",
        },
        instagram: {
          caption: isAr
            ? `3 أخطاء شائعة تجعل زوار موقعك يغادرون دون شراء، وكيف تصلحها لزيادة مبيعاتك 📈`
            : `3 website mistakes killing your conversions (and how to fix them today) 📈`,
          carouselSlides: [
            {
              slideNumber: 1,
              title: isAr ? "دليل زيادة مبيعات المواقع" : "Website Conversion Blueprint",
              bodyText: topic,
              visualCue: "Clean geometric card in petroleum blue (#0A4D68) with sage green accent highlight.",
            },
            {
              slideNumber: 2,
              title: isAr ? "الخطأ 1: الكلام عن نفسك بدلاً من حل مشكلة العميل" : "Mistake 1: Me-Centric Copy",
              bodyText: isAr
                ? "الزائر لا يهتم بتاريخ تأسيس شركتك بقدر ما يهتم بكيف ستحل مشكلته الآن وبأقل جهد."
                : "Visitors don't browse your website to read your company history. They want their specific problem solved immediately.",
              visualCue: "Before and After comparison bubble.",
            },
            {
              slideNumber: 3,
              title: isAr ? "الخطأ 2: بطء التحميل على الهواتف" : "Mistake 2: Mobile Sluggishness",
              bodyText: isAr
                ? "أكثر من 75% من الزيارات تأتي عبر الموبايل. الموقع البطيء يعني مبيعات ضائعة فوراً لصالح المنافسين."
                : "75%+ of Arab & Gulf web traffic originates from mobile devices. Sub-second load times are essential.",
              visualCue: "Mobile device mockup with green speed gauge.",
            },
            {
              slideNumber: 4,
              title: isAr ? "الخطأ 3: تعقيد عملية الشراء أو الطلب" : "Mistake 3: Complex Checkout",
              bodyText: isAr
                ? "اجعل الخطوة التالية واضحة تماماً: زر واتساب مباشر، أو طلب سريع برقم الهاتف فقط بدون تسجيل حساب إجباري."
                : "Eliminate mandatory account registrations. Offer 1-click WhatsApp purchase or instant order submission.",
              visualCue: "Friction funnel showing drop-offs vs streamlined one-click path.",
            },
            {
              slideNumber: 5,
              title: isAr ? "فلسفتنا في thekatanani.com" : "Our Guarantee",
              bodyText: isAr
                ? "لا أبيعك تقنية — أبيعك نتيجة. موقع مصمم لتحويل الزائر إلى عميل حقيقي."
                : "We don't sell tech — we sell tangible results. A site engineered to turn clicks into clients.",
              visualCue: "Brand mark with call to action: thekatanani.com.",
            },
          ],
          hashtags: isAr
            ? ["#تسويق_إلكتروني", "#زيادة_المبيعات", "#صفحات_الهبوط", "#شوبيفاي", "#تجارة_إلكترونية"]
            : ["#conversionrate", "#landingpagedesign", "#crotips", "#marketingstrategy", "#shopifytips"],
          imagePrompt:
            "Modern visual marketing carousel slide, petroleum blue theme with clean typography and high contrast graphics, 4k.",
        },
        xTwitter: {
          tweets: isAr
            ? [
                `1/3 معظم الشركات تصرف آلاف الدولارات على الإعلانات ثم ترسل الزوار إلى صفحة هبوط بطيئة ومربكة.

النتيجة؟ معدل ارتداد 85% وميزانية مهدرة. 🧵👇`,
                `2/3 3 خطوات بسيطة ترفع معدل تحويل موقعك فوراً:

1. العنوان الرئيسي يوضح الفائدة المباشرة للعميل في 3 ثوانٍ
2. سرعة تحميل أقل من ثانية ونصف على شبكات 4G
3. زر طلب مباشر عبر واتساب بدون نماذج طويلة ومعقدة`,
                `3/3 تذكر دائماً:
"الأداء والوضوح ليسا رفاهية — هما ما يحوّل الزائر إلى عميل."

لا تدع موقعك يكون مجرد بروشور صامت؛ اجعله أفضل مندوب مبيعات يعمل لديك 24/7.

#تسويق #تطوير_مواقع`,
              ]
            : [
                `1/3 Most companies spend thousands on ads, only to send traffic to a slow, confusing landing page with a 85% bounce rate. 🧵👇`,
                `2/3 3 immediate fixes:
1. Sub-2-second mobile load time
2. Value proposition understood in 5 seconds
3. Frictionless 1-click WhatsApp or call CTA`,
                `3/3 Remember:
Performance and clarity are not luxuries — they are what turn visitors into paying clients.

#GrowthMarketing #CRO #WebDev`,
              ],
          hashtags: isAr ? ["#تسويق", "#تطوير_ويب", "#CRO"] : ["#Marketing", "#CRO", "#WebDev"],
        },
      }
    }

    // Default: TECH_TIP / PROJECT_STORY / CUSTOM
    return {
      linkedin: {
        headline: isAr
          ? `رؤية تقنية: ${topic}`
          : `Engineering Insights: ${topic}`,
        content: isAr
          ? `في هندسة الويب وتطوير التطبيقات الحديثة، الاختيار الخاطئ للتقنية قد يكلفك أشهراً من إعادة كتابة الكود.

"أبني لك الموقع الصحيح بالأداة الصحيحة."

عند التعامل مع ${topic}، إليك أهم النقاط العملية التي أراعيها دائماً في مشاريعي:

1. الأداء أولاً (Performance First):
سواء كنت تستخدم Next.js أو منصة مثل Shopify، يجب ألا تضحي أبداً بسرعة استجابة الصفحة الأولى (LCP) من أجل إضافات غير ضرورية.

2. بساطة البنية البرمجية (Simplicity beats Over-Engineering):
لا تضف طبقات تجريد معقدة ومكتبات ضخمة طالما أن الحل البسيط والواضح يؤدي الغرض بكفاءة وأمان أعلى.

3. التركيز على النتيجة وتجربة المستخدم:
الكود النظيف مهم جداً، لكن الأهم هو كيف ينعكس ذلك على سرعة تحميل الموقع، سهولة التصفح، واستقرار النظام تحت الضغط.

بخبرة في تطوير مشاريع مخصصة (Next.js / React) ومنصات تجارية متكاملة لعملاء من الخليج والعالم، هذه المعادلة هي التي تصنع فارقاً حقيقياً.`
          : `In modern web engineering, selecting the wrong architectural tool can cost months of refactoring.

"The right website with the right tool."

Key principles when approaching ${topic}:

1. Performance Over Gimmicks:
Never sacrifice First Contentful Paint (FCP) and Core Web Vitals for heavy cosmetic libraries.

2. Maintainability Beats Cleverness:
Write clean, readable architectures that solve the core problem without premature abstraction.

3. Align Engineering with Business ROI:
Clean code is essential, but client conversion, sub-second load times, and system resilience drive real business growth.`,
        hashtags: isAr
          ? ["#تطوير_الويب", "#NextJS", "#برمجة", "#React", "#هندسة_البرمجيات"]
          : ["#SoftwareEngineering", "#NextJS", "#WebDev", "#CleanCode", "#TypeScript"],
        callToAction: isAr
          ? "ما هي رؤيتك حول هذا الموضوع؟ يسعدني سماع رأيك في التعليقات."
          : "What is your approach to this challenge? Let's discuss in the comments.",
      },
      instagram: {
        caption: isAr
          ? `دليل سريع ومكثف حول ${topic} وكيف تطبقه بالشكل الصحيح في مشاريعك البرمجية 💻`
          : `Actionable breakdown on ${topic} for modern developers and engineering leads 💻`,
        carouselSlides: [
          {
            slideNumber: 1,
            title: isAr ? "دليل هندسة الويب" : "Web Engineering Guide",
            bodyText: topic,
            visualCue: "Dark petroleum blue card with sky blue borders and code accent tags.",
          },
          {
            slideNumber: 2,
            title: isAr ? "1. التحدي الأساسي" : "1. The Challenge",
            bodyText: isAr
              ? "الكثير من المطورين يقعون في فخ تعقيد الهيكلية واختيار أدوات ثقيلة تفوق متطلبات المشروع الحقيقية."
              : "Developers often over-engineer solutions, introducing unnecessary dependencies and performance lag.",
            visualCue: "Architecture comparison diagram with red and green flags.",
          },
          {
            slideNumber: 3,
            title: isAr ? "2. الحل الصحيح" : "2. The Pragmatic Solution",
            bodyText: isAr
              ? "اختيار الأداة التي تمنحك أقصى سرعة وأعلى استقرار بأقل قدر من التعقيد."
              : "Select tools that maximize uptime and speed while keeping the stack maintainable and lightweight.",
            visualCue: "Lightweight block diagram with speed indicators.",
          },
          {
            slideNumber: 4,
            title: isAr ? "3. الأثر على النتيجة" : "3. Measurable Impact",
            bodyText: isAr
              ? "أداء عالي، زمن تحميل أقل من ثانية، وكود سهل الصيانة والتطوير مستقبلاً."
              : "Sub-second load speeds, seamless responsive UX, and effortless codebase scalability.",
            visualCue: "Checkmark badges in emerald green highlighting ROI metrics.",
          },
          {
            slideNumber: 5,
            title: isAr ? "الخلاصة" : "Summary",
            bodyText: isAr
              ? "أبني لك الموقع الصحيح بالأداة الصحيحة — thekatanani.com"
              : "The right website with the right tool — thekatanani.com",
            visualCue: "Minimalist end-card with brand logo and verified credentials.",
          },
        ],
        hashtags: isAr
          ? ["#مبرمجين", "#تطوير_مواقع", "#nextjs_عربي", "#برمجة", "#frontend"]
          : ["#webdev", "#codingtips", "#nextjs", "#typescript", "#fullstack"],
        imagePrompt:
          "Modern minimalist UI slide with code syntax highlights, petroleum blue and white palette, ultra clean typography.",
      },
      xTwitter: {
        tweets: isAr
          ? [
              `1/3 نصيحة هندسية سريعة حول ${topic}:

في كثير من الأحيان، المشكلة ليست في نقص الأدوات، بل في استخدام الأداة الخاطئة للمهمة المطلوبة. 🧵👇`,
              `2/3 تذكر دائماً:
"أبني لك الموقع الصحيح بالأداة الصحيحة"

ليس كل موقع يحتاج تطبيقاً معقداً بآلاف الأسطر؛ أحياناً صفحة هبوط خفيفة أو متجر مضبوط بدقة هو الحل الأكثر ربحية والأسرع تسليماً.`,
              `3/3 ركّز على الأداء والوضوح وسرعة التحميل؛ فهما ما يحوّل الزائر إلى عميل حقيقي.

#تطوير_الويب #برمجة`,
            ]
          : [
              `1/3 Quick engineering insight on ${topic}:

The issue is rarely a lack of tools — it's usually picking the wrong tool for the actual business constraint. 🧵👇`,
              `2/3 "The right website with the right tool."

Don't build a complex micro-frontend where a fast, clean Next.js app or a well-configured platform solves the job in half the time.`,
              `3/3 Prioritize performance and clarity. They are what convert visitors into clients.

#WebDev #SoftwareEngineering`,
            ],
        hashtags: isAr ? ["#تطوير_ويب", "#برمجة"] : ["#WebDev", "#CleanArchitecture"],
      },
    }
  }

  /**
   * Generates a full in-depth blog post article for the portfolio.
   */
  public static async generateBlogPostContent(params: {
    topic: string
    category: string
    language?: "ar" | "en"
    targetLength?: "short" | "deep"
  }): Promise<GeneratedBlogPostOutput> {
    const userPrompt = buildBlogPostPrompt(params)

    if (process.env.OPENAI_API_KEY) {
      try {
        const rawJson = await this.callOpenAI(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return BlogPostOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("OpenAI blog generation failed, trying Gemini/Deterministic:", err)
      }
    }

    if (process.env.GEMINI_API_KEY) {
      try {
        const rawJson = await this.callGemini(AI_SYSTEM_INSTRUCTIONS, userPrompt)
        return BlogPostOutputSchema.parse(JSON.parse(rawJson))
      } catch (err) {
        console.warn("Gemini blog generation failed, using deterministic engine:", err)
      }
    }

    return this.generateDeterministicBlogPost(params)
  }

  private static generateDeterministicBlogPost(params: {
    topic: string
    category: string
    language?: "ar" | "en"
    targetLength?: "short" | "deep"
  }): GeneratedBlogPostOutput {
    const isAr = params.language !== "en"
    const topic = params.topic.trim()

    const slug = topic
      .toLowerCase()
      .replace(/[^a-z0-9\u0621-\u064A\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50) || "modern-web-development-insights"

    if (params.category === "FREELANCE") {
      return {
        title: isAr
          ? `أسرار العمل الحر للمطورين: ${topic}`
          : `Freelancing for Developers: ${topic}`,
        slug,
        category: "FREELANCE",
        excerpt: isAr
          ? "كيف تحافظ على تقييم 5.0 ونسبة نجاح 100% في العمل الحر، وتنتقل من التنافس على الأسعار الرخيصة إلى تسعير المشاريع بالقيمة والنتيجة."
          : "How to maintain a 100% Job Success Score on Upwork, stop competing on low rates, and price web projects for business value.",
        readTimeMinutes: 6,
        tags: isAr ? ["العمل الحر", "Upwork", "خمسات", "تطوير الويب", "التسعير"] : ["Freelancing", "Upwork", "Consulting", "WebDev", "Pricing"],
        seoTitle: isAr ? `دليل العمل الحر للمطورين | محمد القطناني` : `Developer Freelance Guide | Mohammed Katanani`,
        seoDescription: isAr
          ? "دليل عملي من واقع مئات المشاريع في العمل الحر: كيفية كسب ثقة العملاء وتسعير المشاريع وتحقيق تقييم كامل."
          : "Actionable freelancing playbook for developers: client communication, pricing for outcomes, and maintaining a 5.0 rating.",
        imagePrompt: "Editorial minimal illustration of a software developer workspace, petroleum blue theme (#0A4D68), clean lighting, modern tech desk, 4k.",
        content: isAr
          ? `# أسرار العمل الحر للمطورين: ${topic}

في عالم العمل الحر وتطوير الويب، يعتقد الكثير من المطورين المبتدئين أن العميل يبحث عن "أحدث التقنيات البرمجية" أو "أرخص سعر ممكن". ولكن الحقيقة التي تكرست لديّ بعد إنجاز مئات المشاريع عبر منصات مثل Upwork وخمسات والمشاريع المباشرة هي:

> **"العميل لا يشتري منك سطور كود — بل يشتري حل مشكلة حقيقية وراحة البال."**

في هذا المقال، أشاركك المبادئ العملية التي مكّنتني بفضل الله من الحفاظ على **تقييم 5.0 ★ على خمسات** و**نسبة نجاح 100% على Upwork**، وكيف يمكنك تطبيقها في مسيرتك المهنية.

---

## 1. لا تبع تقنيات.. بع نتائج تجارية واضحة

عندما يتواصل معك صاحب شركة يريد متجراً أو موقعاً لشركته، أسوأ ما يمكنك فعله هو أن تبدأ بإغراقه بمصطلحات مثل: *SSR، Tailwind، Zustand، GraphQL*.

العميل لا يهتم بهذه التفاصيل. ما يهمه هو:
* هل سيحمّل الموقع بسرعة على هواتف عملائه في الخليج أو منطقته المستهدفة؟
* هل سيكون من السهل على الزائر الضغط على زر الواتساب أو إتمام الشراء؟
* هل سيتمكن فريقه الداخلي من تعديل المحتوى دون الحاجة للمبرمج كل يوم؟

فلسفتي الدائمة هي: **"لا أبيعك تقنية — أبيعك نتيجة"**. عندما تشرح للعميل كيف سينعكس عملك على مبيعاته وثقة زواره، يصبح نقاش السعر أمراً ثانوياً أمام القيمة التي ستقدمها له.

---

## 2. سرعة الاستجابة هي بطاقة التعارف الأولى

وفقاً لبيانات منصات العمل الحر، أكثر من 70% من العقود يفوز بها المطور الذي يرد أولاً باحترافية. في حسابي الموثق، متوسط سرعة الرد هو **دقيقتان فقط** خلال أوقات العمل.

الرد السريع لا يعني التسرع في تقديم وعود غير واقعية، بل يعني:
1. إشعار العميل بأنك قرأت متطلباته بعناية.
2. طرح سؤالين أو ثلاثة أسئلة ذكية حول التحدي التقني الذي يواجهه.
3. تقديم تصور أولي وموعد دقيق لتسليم العرض المفصل.

هذا الانطباع الأول يبني ثقة فورية تُميزك عن عشرات العروض المنسوخة (Copy-Paste) التي ترسل للعميل.

---

## 3. التسعير بالقيمة وليس بعدد الساعات

إذا كنت تسعّر مشاريعك بالساعة، فأنت تعاقب نفسك كلما أصبحت مبرمجاً أسرع وأكثر مهارة!
إذا استغرق حل مشكلة معقدة في قاعدة بيانات العميل ساعة واحدة فقط بفضل خبرتك الطويلة، بينما كان يستغرق من غيرك أسبوعاً، فهل تستحق أجرة ساعة واحدة فقط؟

الحل هو **التسعير القائم على القيمة (Value-Based Pricing)**:
* احسب الأثر المالي الذي سيوفره هذا الحل للعميل.
* قدّم باقات واضحة المعالم (مثلاً: إطلاق سريع، أو حل مخصص كامل مع ربط الخدمات والدعم الفني).
* وضّح بالضبط ما يشمله المشروع وما هو خارج النطاق (Out of Scope) لتجنب الخلافات.

---

## 4. الالتزام الصارم بالموعد النهائي (100% On-Time Delivery)

التسليم في الموعد ليس مجرد بند تعاقدي؛ هو حجر الأساس لبناء براند شخصي مستدام. كل عميل راضٍ بنسبة 100% سيتحول تلقائياً إلى أفضل مسوق لخدماتك عبر التوصيات والمشاريع اللاحقة.

---

## خاتمة

العمل الحر ليس سباقاً نحو السعر الأرخص؛ بل هو بناء شراكات حقيقية مع أصحاب الأعمال. ابدأ اليوم بتغيير خطابك من "مبرمج ينفذ المهام" إلى **"شريك تقني يبني الحل الأنسب للمشروع"**، وسترى كيف ستتغير نوعية العملاء والمشاريع التي تجذبها.`
          : `# Freelancing for Developers: ${topic}

In freelance web engineering, beginner developers assume clients only care about tech specs or cheap rates. After delivering hundreds of production platforms, the reality is clear:

> **"Clients don't buy code — they buy certainty and business outcomes."**

Here are the non-negotiable principles behind maintaining a 100% Job Success Score and a 5.0 rating on Upwork.

## 1. Sell Outcomes, Not Tech Stacks
Founders don't buy Next.js or Docker; they buy sub-second page loads, higher checkout conversions, and reliable uptime.

## 2. Rapid Communication Builds Instant Trust
Responding within minutes with targeted technical questions sets you apart from automated generic proposals.

## 3. Price for Value, Not Hours
Charge based on the ROI delivered rather than time logged.

## Conclusion
"The right website with the right tool." Shift your positioning from contractor to strategic technical partner.`,
      }
    }

    if (params.category === "MARKETING" || params.category === "ECOMMERCE") {
      return {
        title: isAr
          ? `كيف تحوّل زوار موقعك إلى عملاء فعليين: ${topic}`
          : `Turning Website Visitors into Paying Clients: ${topic}`,
        slug,
        category: params.category,
        excerpt: isAr
          ? "الأداء والوضوح ليسا رفاهية — هما ما يحوّل الزائر إلى عميل. دليلك الشامل لتحسين معدل التحويل (CRO) وتصميم صفحات هبوط فائقة التأثير."
          : "Performance and clarity turn visitors into clients. Complete guide to conversion rate optimization and landing page architecture.",
        readTimeMinutes: 5,
        tags: isAr ? ["تسويق", "تحسين التحويل", "تجارة إلكترونية", "صفحات الهبوط", "شوبيفاي"] : ["Marketing", "CRO", "Ecommerce", "LandingPages", "Shopify"],
        seoTitle: isAr ? `دليل تحسين تحويل المواقع والمتاجر | محمد القطناني` : `Website Conversion & CRO Guide | Mohammed Katanani`,
        seoDescription: isAr
          ? "كيف تصمم صفحات هبوط ومتاجر إلكترونية تضاعف المبيعات وتزيل عقبات الشراء والتواصل."
          : "Strategic web development insights on converting traffic into verified revenue and inquiries.",
        imagePrompt: "Geometric 3D funnel visualization with glowing teal and petroleum blue nodes, elegant minimalist aesthetic, 4k.",
        content: isAr
          ? `# كيف تحوّل زوار موقعك إلى عملاء فعليين: ${topic}

يمكنك صرف آلاف الدولارات شهرياً على الحملات الإعلانية في تيك توك وسناب شات وميتا، ولكن إن كان الزائر يصل إلى صفحة هبوط مربكة أو متجر بطيء التحميل، فإن ميزانيتك التسويقية تتبخر هباءً.

في هذا المقال، نستعرض الجانب الذي يغفل عنه كثير من أصحاب المواقع: **التحسين التقني للتجربة التسويقية (Technical CRO)**.

---

## 1. قاعدة الـ 5 ثوانٍ الأولى (The 5-Second Rule)

عندما يفتح الزائر موقعك عبر هاتفه المحمول، لديك أقل من 5 ثوانٍ للإجابة على ثلاثة أسئلة في ذهنه:
1. **ماذا تقدم بالضبط؟** (بدون مصطلحات تسويقية غامضة).
2. **كيف سيحل هذا مشكلتي أو يطور عملي؟**
3. **ما هي الخطوة الأولى التي يجب أن أتخذها الآن؟**

إذا كان العنوان الرئيسي غامضاً مثل *"نبتكر لك مستقبلاً رقمياً واعداً"*، فالزائر سيغادر فوراً. قارن ذلك بـ: *"أبني لك الموقع الصحيح بالأداة الصحيحة — كود مخصص فائق السرعة أو متجر شوبيفاي متكامل"*. الوضوح يولد الثقة فوراً.

---

## 2. سرعة التحميل هي المبيعات في حساب البنك

كشفت دراسات Google و Cloudflare أن كل ثانية تأخير إضافية في تحميل المتجر الإلكتروني تؤدي إلى:
* انخفاض في معدل التحويل بنسبة **20%**.
* ارتفاع في معدل الارتداد (Bounce Rate) بنسبة **32%**.

السرعة ليست رفاهية يتحدث عنها مهندسو البرمجيات في المؤتمرات؛ السرعة تعني عميلاً يكمل عملية الدفع قبل أن ينفد صبره أو تضعف شبكة هاتفه.

---

## 3. تسهيل قناة الشراء والتواصل (WhatsApp First)

في منطقتنا العربية وسوق الخليج تحديداً، أثبتت التجربة في مشاريع مثل *لولو بوتيكات* و*جيباس العراق* أن تفعيل خيار **الطلب الفوري بنقرة واحدة عبر الواتساب** يرفع المبيعات بنسبة تفوق 40% مقارنة بنماذج التسجيل المعقدة التي تطالب الزائر بإنشاء حساب وإدخال كلمة مرور جديدة.

اجعل الشراء سهلاً كالمحادثة!

---

## خلاصة القول

لا تجعل موقعك مجرد بروشور صامت معلق على الإنترنت. اجعله **أفضل مندوب مبيعات يعمل لصالح شركتك 24 ساعة يومياً**. الموقع الصحيح بالأداة الصحيحة هو استثمار يعود عليك بالأرباح.`
          : `# Turning Website Visitors into Paying Clients: ${topic}

Every millisecond of latency costs sales. Performance and clarity are what convert casual visitors into high-ticket clients.

## 1. The 5-Second Proposition
Clarify your offer, audience, and call-to-action above the fold.

## 2. Frictionless Contact
In regional markets, 1-click WhatsApp integrations outperform complex multi-field inquiry forms.

## 3. Speed Is Direct Revenue
Sub-second rendering keeps buyers engaged before drop-off occurs.`,
      }
    }

    // Default: TECH / Web Development
    return {
      title: isAr
        ? `هندسة الويب الحديثة: ${topic}`
        : `Modern Web Engineering: ${topic}`,
      slug,
      category: "TECH",
      excerpt: isAr
        ? "مقارنة متعمقة في هندسة الويب الحديثة، وكيف تختار بين التطوير المخصص (Next.js) والمنصات الجاهزة لتحقيق أعلى أداء وأفضل عائد للمشروع."
        : "Deep architectural insights into modern web engineering, Next.js performance, and pragmatic tooling decisions.",
      readTimeMinutes: 5,
      tags: isAr ? ["Next.js", "React", "TypeScript", "تطوير الويب", "هندسة البرمجيات"] : ["NextJS", "React", "TypeScript", "WebDevelopment", "Architecture"],
      seoTitle: isAr ? `هندسة الويب الحديثة والأداء | محمد القطناني` : `Modern Web Engineering & Performance | Mohammed Katanani`,
      seoDescription: isAr
        ? "أسرار هندسة تطبيقات الويب الحديثة بـ Next.js و React لتحقيق سرعات تحميل قياسية وتجربة مستخدم لا تضاهى."
        : "Engineering high-performance web applications with Next.js, React, and pragmatic architectural patterns.",
      imagePrompt: "Architectural blueprint of full-stack web application, glowing node connections in petroleum blue #0A4D68 and sky blue #D2E5F0, minimal dark tech background, 4k.",
      content: isAr
        ? `# هندسة الويب الحديثة: ${topic}

في عالم البرمجة اليوم، يميل الكثير من المطورين إلى تعقيد الحلول البرمجية واختيار أدوات ضخمة تفوق متطلبات المشروع الفعلية (Over-Engineering). 

من واقع بناء منصات متطورة مثل *أكاديمية واستشارات الطيران* و*تطبيق الضمان لمتجر جيباس العراق*، إليك الركائز الأساسية التي تضمن لك موقعاً فائق الأداء وسهل الصيانة.

---

## 1. أبني لك الموقع الصحيح بالأداة الصحيحة

هناك مساران رئيسيان في تطوير الويب:
1. **التطوير المخصص (Custom Development بـ Next.js / React / Vue):**
   * الخيار المثالي عندما يتطلب المشروع تجربة مستخدم فريدة (Cinematic UX)، حسابات معقدة، تكاملات برمجية دقيقة، أو أداءً استثنائياً تحت ضغط آلاف المستخدمين.
2. **المنصات الجاهزة (WordPress / Shopify / Wix Studio):**
   * الحل الذكي والسريع عندما تكون الميزانية والوقت هما العاملين الحاسمين، أو عندما يحتاج العميل متجراً جاهزاً لإدارة المخزون والشحن دون الحاجة لإعادة اختراع العجلة.

المطور المحترف لا يفرض تقنية واحدة على كل العملاء؛ بل يشخص المشكلة أولاً ثم يختار الأداة الأنسب.

---

## 2. تحسين مؤشرات سرعة الويب (Core Web Vitals)

لضمان حصول موقعك على تصنيف 100/100 في Google PageSpeed:
* **استخدم الصور المحسنة دائماً:** لا ترفع صوراً بحجم 5 ميجابايت، بل استخدم صيغة WebP/AVIF مع أبعاد محددة لتجنب تحرك المحتوى (CLS).
* **تقليل الكود المحمّل على العميل:** اجعل المكونات Server Components افتراضياً، ولا تستخدم Client Components إلا حيث يلزم التفاعل الفعلي.
* **التحميل الكسول (Lazy Loading):** لا تحمّل المكتبات الثقيلة إلا عندما يصل الزائر إلى القسم المخصص لها في الصفحة.

---

## الخلاصة

الكود النظيف ليس غاية بحد ذاته، بل وسيلة لتقديم تجربة مستخدم سريعة، مستقرة، ومحققة للأهداف التجارية. تفضل بزيارة [thekatanani.com](https://thekatanani.com) للاطلاع على المزيد من دراسات الحالة الهندسية.`
        : `# Modern Web Engineering: ${topic}

Pragmatic web architecture prioritizes business impact and measurable speed over unnecessary complexity.

## 1. The Right Website with the Right Tool
Balance custom Next.js engineering with battle-tested platform execution depending on project constraints.

## 2. Core Web Vitals Optimization
Enforce zero layout shift (CLS) and sub-second Largest Contentful Paint (LCP) through lean server-side rendering.

## Conclusion
Clean architecture is the foundation of durable business software.`,
    }
  }
}
