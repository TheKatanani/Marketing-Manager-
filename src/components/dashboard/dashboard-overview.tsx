"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Sparkles,
  Code,
  Briefcase,
  TrendingUp,
  FolderGit2,
  PenLine,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Layers,
  Star,
  Globe,
  Clock,
  Send,
  Zap,
  BookOpen,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { createFlexiblePostAction } from "@/actions/content-actions"
import type { PlatformDraftsOutput } from "@/lib/ai/types"
import { InstagramSlideCanvas } from "@/components/content/instagram-slide-canvas"

interface DashboardOverviewProps {
  userName: string
  totalProjects: number
  featuredCount: number
  ideasCount: number
  postsCount: number
  blogPostsCount?: number
  contentPillarsCount: number
  projects: any[]
  posts: any[]
}

type CategoryType = "TECH_TIP" | "FREELANCE_ADVICE" | "MARKETING_CRO" | "PROJECT_STORY" | "CUSTOM"

export function DashboardOverview({
  userName,
  totalProjects,
  ideasCount,
  postsCount,
  blogPostsCount = 3,
  projects,
  posts,
}: DashboardOverviewProps) {
  const router = useRouter()
  const { t, locale, isRtl } = useLanguage()
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  // Generator State
  const [category, setCategory] = useState<CategoryType>("TECH_TIP")
  const [topic, setTopic] = useState("5 أخطاء شائعة في Next.js تجعل موقعك بطيئاً وكيف تتفاداها")
  const [contextNotes, setContextNotes] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "")
  const [postLanguage, setPostLanguage] = useState<"ar" | "en">(locale === "en" ? "en" : "ar")
  const [targetPlatform, setTargetPlatform] = useState<"ALL" | "LINKEDIN" | "X" | "INSTAGRAM">("ALL")

  // Output State
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PlatformDraftsOutput | null>(null)
  const [activePlatformTab, setActivePlatformTab] = useState<"LINKEDIN" | "X" | "INSTAGRAM">("LINKEDIN")
  const [copied, setCopied] = useState<string | null>(null)

  // Presets by category
  const presetSuggestions: Record<CategoryType, { ar: string; en: string }[]> = {
    TECH_TIP: [
      {
        ar: "5 أخطاء شائعة في Next.js تجعل موقعك بطيئاً وكيف تتفاداها",
        en: "5 Common Next.js Mistakes That Hurt Performance (and fixes)",
      },
      {
        ar: "متى تختار React ومتى تختار منصة جاهزة مثل WordPress أو Shopify؟",
        en: "When to Build Custom React vs Platform Solutions like Shopify",
      },
      {
        ar: "أسرار تحسين Core Web Vitals وخفض LCP لأقل من ثانية واحدة",
        en: "Secrets to Core Web Vitals: Getting LCP Under 1 Second",
      },
      {
        ar: "لماذا لا تحتاج إلى مكتبات معقدة لبناء تجربة مستخدم فائقة السرعة؟",
        en: "Simplicity Beats Over-Engineering: Fast UI with Zero Bloat",
      },
    ],
    FREELANCE_ADVICE: [
      {
        ar: "كيف تحافظ على تقييم 5.0 ومعدل تسليم 100% على Upwork وخمسات",
        en: "How to Maintain a 100% Job Success Score & 5.0 Rating",
      },
      {
        ar: "كيف تسعّر مشروع ويب بناءً على النتيجة والقيمة وليس بعدد الساعات",
        en: "Value-Based Pricing for Web Developers: Stop Selling Hours",
      },
      {
        ar: "أهم أسباب رفض مقترحات العمل الحر (Proposals) وكيف تجعل العميل يراسلك فوراً",
        en: "Why Most Upwork Proposals Fail & How to Write Winning Pitches",
      },
      {
        ar: "علامات العميل المتعب (Red Flags) وكيف تضع حدوداً واضحة لنطاق العمل",
        en: "Client Red Flags in Freelancing & Protecting Project Scope",
      },
    ],
    MARKETING_CRO: [
      {
        ar: "لا أبيعك تقنية — أبيعك نتيجة: كيف يحول الموقع الزوار إلى عملاء حقيقيين",
        en: "Sell Outcomes, Not Tech: Turning Web Visitors into High-Value Leads",
      },
      {
        ar: "3 تعديلات بسيطة في صفحة الهبوط (Landing Page) تضاعف المبيعات",
        en: "3 Landing Page Tweaks That Double Direct Conversions",
      },
      {
        ar: "لماذا يتفوق زر الواتساب المباشر على نماذج الاتصال المعقدة في السوق العربي؟",
        en: "Why 1-Click WhatsApp Beats 6-Field Forms in Arab & Gulf Markets",
      },
      {
        ar: "سرعة تحميل المتجر الإلكتروني: كل ثانية تأخير تكلفك 20% من المبيعات",
        en: "Ecommerce Speed vs Drop-off: Every Second Counts in Revenue",
      },
    ],
    PROJECT_STORY: [
      {
        ar: "كيف حلينا مشكلة المزامنة والضمان في متجر جيباس العراق عبر Remix و Zoho",
        en: "How We Solved Real-Time Warranty Sync for Geepas Iraq",
      },
      {
        ar: "بناء منصة سينمائية سريعة بـ Next.js و GSAP لأكاديمية الطيران",
        en: "Cinematic Next.js & GSAP Architecture for Aviation Academy",
      },
      {
        ar: "تجربة بناء متجر لولو بوتيكات مع أتمتة الطلبات عبر الواتساب في غزة",
        en: "Building Lulu Boutiques E-commerce with WhatsApp Automation",
      },
      {
        ar: "تصميم موقع ماهسري للتجديدات مع خرائط تفاعلية وتقييم 5.0 على Upwork",
        en: "Mahasiri Renovation Platform with Interactive Maps on Upwork",
      },
    ],
    CUSTOM: [
      {
        ar: "رأيي بصراحة في استخدام أدوات الذكاء الاصطناعي في كتابة الكود",
        en: "My Honest Take on AI Coding Tools in Production Workflows",
      },
      {
        ar: "كيف تبني براند شخصي كمطور ويب وتجلب عقود عمل دون إعلانات",
        en: "Building a Developer Personal Brand That Attracts Direct Inbound Deals",
      },
    ],
  }

  const handleSelectCategory = (cat: CategoryType) => {
    setCategory(cat)
    const suggestions = presetSuggestions[cat]
    if (suggestions && suggestions.length > 0) {
      setTopic(postLanguage === "en" ? suggestions[0].en : suggestions[0].ar)
    }
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setGenerating(true)
    setError(null)

    const res = await createFlexiblePostAction({
      category,
      topic,
      contextNotes: contextNotes.trim() || undefined,
      targetPlatform,
      language: postLanguage,
      projectId: category === "PROJECT_STORY" ? selectedProjectId : undefined,
    })

    setGenerating(false)

    if (res.success && res.drafts) {
      setResult(res.drafts)
      router.refresh()
    } else {
      setError(res.error || (isRtl ? "تعذر توليد المحتوى، يرجى المحاولة ثانية." : "Failed to generate content."))
    }
  }

  const copyToClipboard = (text: string, platformKey: string) => {
    navigator.clipboard.writeText(text)
    setCopied(platformKey)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Welcome & Quick Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#D2E5F0] rounded-2xl p-5 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#2B3451]">
              {isRtl ? "مرحباً بك محمد 👋" : "Welcome back, Mohammed 👋"}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
              thekatanani.com
            </span>
          </div>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "اكتب وشارك نصائح برمجية، أسرار العمل الحر، أو استراتيجيات تسويقية بنقرة واحدة."
              : "Generate & publish technical tips, freelance advice, or marketing insights in seconds."}
          </p>
        </div>

        {/* Quick metrics in compact pills */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
          <Link
            href="/dashboard/blog"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] hover:bg-[#D2E5F0] transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{blogPostsCount} {isRtl ? "مقالات بالمدونة" : "Blog Posts"}</span>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]">
            <Star className="h-3.5 w-3.5 fill-[#1E4E30]" />
            <span>5.0 ★ Upwork & خمسات</span>
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F5F9FC] text-[#0A4D68] border border-[#D2E5F0]">
            <Send className="h-3.5 w-3.5" />
            <span>{postsCount} {isRtl ? "منشورات جاهزة" : "Posts Ready"}</span>
          </span>
        </div>
      </div>

      {/* The Fast AI Content Creator (Hero Workspace) */}
      <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 shadow-sm space-y-6">
        {/* Creator Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#D2E5F0]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0A4D68] text-white shadow-sm shadow-[#0A4D68]/20">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2B3451]">
                {isRtl ? "مولد المحتوى الذكي السريع" : "Instant Multi-Platform Content Generator"}
              </h2>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "اختر نوع المحتوى واكتب فكرتك ليقوم الذكاء الاصطناعي بصياغة منشورات جاهزة للنشر فوراً."
                  : "Choose category, select a topic, and generate platform-optimized posts."}
              </p>
            </div>
          </div>

          {/* Language selector */}
          <div className="flex items-center gap-1.5 bg-[#F5F9FC] p-1 rounded-xl border border-[#D2E5F0] self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setPostLanguage("ar")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                postLanguage === "ar"
                  ? "bg-[#0A4D68] text-white shadow-2xs"
                  : "text-[#5E6C8E] hover:text-[#2B3451]"
              }`}
            >
              العربية 🇸🇦
            </button>
            <button
              type="button"
              onClick={() => setPostLanguage("en")}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                postLanguage === "en"
                  ? "bg-[#0A4D68] text-white shadow-2xs"
                  : "text-[#5E6C8E] hover:text-[#2B3451]"
              }`}
            >
              English 🌐
            </button>
          </div>
        </div>

        {/* 5 Simple Category Buttons */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#5E6C8E]">
            {isRtl ? "1. اختر مجال وموضوع المنشور:" : "1. Select Content Category:"}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {[
              {
                id: "TECH_TIP" as CategoryType,
                icon: Code,
                labelAr: "نصائح برمجية",
                labelEn: "Tech Tips",
                descAr: "Next.js, سرعة, كود",
                descEn: "Next.js & Performance",
              },
              {
                id: "FREELANCE_ADVICE" as CategoryType,
                icon: Briefcase,
                labelAr: "العمل الحر",
                labelEn: "Freelance Tips",
                descAr: "Upwork, تسعير, عملاء",
                descEn: "Upwork & Pricing",
              },
              {
                id: "MARKETING_CRO" as CategoryType,
                icon: TrendingUp,
                labelAr: "تسويق ومبيعات",
                labelEn: "Marketing & CRO",
                descAr: "تحويل الزوار لعملاء",
                descEn: "Sales & Landing Pages",
              },
              {
                id: "PROJECT_STORY" as CategoryType,
                icon: FolderGit2,
                labelAr: "قصة من مشروع",
                labelEn: "Project Story",
                descAr: "تجارب thekatanani",
                descEn: "Real Case Studies",
              },
              {
                id: "CUSTOM" as CategoryType,
                icon: PenLine,
                labelAr: "فكرة حرة",
                labelEn: "Custom Topic",
                descAr: "أي موضوع تريده",
                descEn: "Any Custom Thought",
              },
            ].map((cat) => {
              const active = category === cat.id
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`p-3 rounded-xl border text-right transition-all flex flex-col justify-between gap-1 cursor-pointer ${
                    active
                      ? "bg-[#EBF4F9] border-[#0A4D68] text-[#0A4D68] shadow-2xs ring-1 ring-[#0A4D68]"
                      : "bg-[#F5F9FC] border-[#D2E5F0] text-[#5E6C8E] hover:border-[#B9AED8] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`h-4 w-4 ${active ? "text-[#0A4D68]" : "text-[#5E6C8E]"}`} />
                    {active && <span className="h-2 w-2 rounded-full bg-[#0A4D68]" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#2B3451]">
                      {isRtl ? cat.labelAr : cat.labelEn}
                    </div>
                    <div className="text-[10px] text-[#5E6C8E] truncate">
                      {isRtl ? cat.descAr : cat.descEn}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-bold text-[#5E6C8E]">
            {isRtl ? "أفكار ومواضيع مقترحة بنقرة واحدة:" : "Quick Topic Inspirations (Click to use):"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {presetSuggestions[category]?.map((item, idx) => {
              const text = postLanguage === "en" ? item.en : item.ar
              const isSelected = topic === text
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTopic(text)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all text-right cursor-pointer ${
                    isSelected
                      ? "bg-[#0A4D68] text-white border-[#0A4D68] shadow-2xs font-bold"
                      : "bg-[#F5F9FC] text-[#2B3451] border-[#D2E5F0] hover:bg-white hover:border-[#0A4D68]"
                  }`}
                >
                  {text}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleGenerate} className="space-y-4 pt-1">
          {category === "PROJECT_STORY" && (
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "اختر دراسة الحالة المرجعية من thekatanani.com:" : "Select Grounded Project Source:"}
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
              {isRtl ? "2. عنوان المنشور أو الفكرة الأساسية:" : "2. Post Title or Core Hook:"}
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={isRtl ? "اكتب فكرتك أو اختر من المقترحات أعلاه..." : "Enter your topic or pick a suggestion above..."}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs font-medium text-[#2B3451] focus:outline-none focus:border-[#0A4D68] focus:bg-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
              {isRtl ? "تفاصيل أو نقاط إضافية تريد ذكرها (اختياري):" : "Additional Points or Context (Optional):"}
            </label>
            <textarea
              rows={2}
              value={contextNotes}
              onChange={(e) => setContextNotes(e.target.value)}
              placeholder={isRtl ? "مثلاً: اذكر تجربة شخصية، رقم معين، أو نصيحة محددة..." : "e.g. mention specific metrics, an anecdote, or a takeaway..."}
              className="w-full px-3.5 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68] focus:bg-white"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-1.5 text-xs text-[#5E6C8E]">
              <span className="font-bold">{isRtl ? "المنصات المستهدفة:" : "Target:"}</span>
              <span className="px-2 py-0.5 rounded-md bg-[#F5F9FC] border border-[#D2E5F0] text-[#0A4D68] font-bold">
                LinkedIn + X + Instagram
              </span>
            </div>

            <button
              type="submit"
              disabled={generating || !topic.trim()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
              <span>
                {generating
                  ? isRtl ? "جارٍ صياغة وتوليد المحتوى..." : "Drafting Multi-Platform Posts..."
                  : isRtl ? "توليد المحتوى بذكاء ⚡" : "Generate Platform Posts ⚡"}
              </span>
            </button>
          </div>
        </form>

        {/* Live Generated Result Preview Box */}
        {result && (
          <div className="mt-6 pt-6 border-t border-[#D2E5F0] space-y-4 animate-in fade-in duration-300">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1.5 bg-[#F5F9FC] p-1 rounded-xl border border-[#D2E5F0]">
                <button
                  type="button"
                  onClick={() => setActivePlatformTab("LINKEDIN")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activePlatformTab === "LINKEDIN"
                      ? "bg-[#0A4D68] text-white shadow-2xs"
                      : "text-[#5E6C8E] hover:text-[#2B3451]"
                  }`}
                >
                  💼 LinkedIn
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatformTab("X")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activePlatformTab === "X"
                      ? "bg-[#0A4D68] text-white shadow-2xs"
                      : "text-[#5E6C8E] hover:text-[#2B3451]"
                  }`}
                >
                  🐦 X (Twitter Thread)
                </button>
                <button
                  type="button"
                  onClick={() => setActivePlatformTab("INSTAGRAM")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activePlatformTab === "INSTAGRAM"
                      ? "bg-[#0A4D68] text-white shadow-2xs"
                      : "text-[#5E6C8E] hover:text-[#2B3451]"
                  }`}
                >
                  📸 Instagram Carousel
                </button>
              </div>

              {/* Copy Button */}
              <button
                type="button"
                onClick={() => {
                  let textToCopy = ""
                  if (activePlatformTab === "LINKEDIN") {
                    textToCopy = `${result.linkedin.content}\n\n${result.linkedin.hashtags?.join(" ") || ""}`
                  } else if (activePlatformTab === "X") {
                    textToCopy = result.xTwitter.tweets.join("\n\n---\n\n")
                  } else {
                    const slidesText = result.instagram.carouselSlides
                      .map((s) => `[شريحة ${s.slideNumber}: ${s.title}]\n${s.bodyText}`)
                      .join("\n\n")
                    textToCopy = `${result.instagram.caption}\n\n${slidesText}\n\n${result.instagram.hashtags?.join(" ") || ""}`
                  }
                  copyToClipboard(textToCopy, activePlatformTab)
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#E8F2EC] hover:bg-[#d5ebd9] text-[#1E4E30] border border-[#A7C8B4] transition-all cursor-pointer"
              >
                {copied === activePlatformTab ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    <span>{isRtl ? "تم النسخ!" : "Copied!"}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>{isRtl ? "نسخ نص المنشور" : "Copy Post"}</span>
                  </>
                )}
              </button>
            </div>

            {/* Platform Content Card */}
            <div className="p-4 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] space-y-3">
              {activePlatformTab === "LINKEDIN" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-[#0A4D68]">
                    {result.linkedin.headline}
                  </div>
                  <div className="text-xs text-[#2B3451] whitespace-pre-line leading-relaxed font-sans">
                    {result.linkedin.content}
                  </div>
                  {result.linkedin.hashtags && result.linkedin.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#0A4D68] font-bold">
                      {result.linkedin.hashtags.map((h, i) => (
                        <span key={i}>{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activePlatformTab === "X" && (
                <div className="space-y-3">
                  {result.xTwitter.tweets.map((tweet, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-white border border-[#D2E5F0] text-xs text-[#2B3451] whitespace-pre-line leading-relaxed"
                    >
                      {tweet}
                    </div>
                  ))}
                  {result.xTwitter.hashtags && (
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#0A4D68] font-bold">
                      {result.xTwitter.hashtags.map((h, i) => (
                        <span key={i}>{h}</span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activePlatformTab === "INSTAGRAM" && (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-white border border-[#D2E5F0] text-xs text-[#2B3451] whitespace-pre-line leading-relaxed">
                    <span className="font-bold text-[#0A4D68] block mb-1">
                      {isRtl ? "نص البوست وخطاف الانتباه (Instagram Caption):" : "Instagram Caption & Hook:"}
                    </span>
                    {result.instagram.caption}
                  </div>

                  <InstagramSlideCanvas
                    slides={result.instagram.carouselSlides}
                    caption={result.instagram.caption}
                    hashtags={result.instagram.hashtags}
                    topicTitle={topic}
                    masterImagePrompt={result.instagram.imagePrompt}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between text-xs text-[#5E6C8E]">
              <span>{isRtl ? "تم حفظ المنشور تلقائياً في استوديو المحتوى." : "Automatically saved in Content Studio."}</span>
              <Link
                href="/dashboard/content"
                className="font-bold text-[#0A4D68] hover:underline inline-flex items-center gap-1"
              >
                <span>{isRtl ? "فتح استوديو المحتوى الكامل" : "Open Studio"}</span>
                <ArrowIcon className="h-3 w-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Clean Recent Posts List */}
      <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#2B3451]">
              {isRtl ? "منشوراتك الأخيرة في الاستوديو" : "Recent Content Drafts"}
            </h3>
            <p className="text-xs text-[#5E6C8E]">
              {isRtl ? "المنشورات الجاهزة للمراجعة والنشر عبر المنصات." : "Drafts prepared for publishing."}
            </p>
          </div>

          <Link
            href="/dashboard/content"
            className="text-xs font-bold text-[#0A4D68] hover:underline inline-flex items-center gap-1"
          >
            <span>{isRtl ? "عرض الكل" : "View All"} ({posts.length})</span>
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#5E6C8E]">
            {isRtl ? "لم تنشئ أي منشورات بعد. استخدم المولد أعلاه للبدء!" : "No posts drafted yet. Use the generator above!"}
          </div>
        ) : (
          <div className="divide-y divide-[#D2E5F0]">
            {posts.slice(0, 5).map((post) => (
              <div
                key={post.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#F5F9FC] px-2 rounded-lg transition-colors"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-[#2B3451] line-clamp-1">
                    {post.title}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[#5E6C8E]">
                    <span>{post.versions?.length || 3} {isRtl ? "منصات" : "platforms"}</span>
                    <span>•</span>
                    <span className="text-[#1E4E30] font-bold">
                      {post.status === "APPROVED"
                        ? isRtl ? "معتمد وجاهز" : "Ready"
                        : isRtl ? "مسودة" : "Draft"}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/dashboard/content/${post.id}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0A4D68] hover:underline self-end sm:self-auto"
                >
                  <span>{isRtl ? "تعديل ومعاينة" : "Edit & Preview"}</span>
                  <ArrowIcon className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick shortcuts to Blog, Projects & Idea Lab */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/dashboard/blog"
          className="p-4 rounded-xl bg-white border border-[#D2E5F0] hover:border-[#0A4D68] hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors">
              📖 {isRtl ? "مدونة معرض الأعمال" : "Portfolio Blog"}
            </div>
            <div className="text-[11px] text-[#5E6C8E]">
              {isRtl ? `${blogPostsCount} مقالات جاهزة للنشر والنسخ` : `${blogPostsCount} articles ready to copy`}
            </div>
          </div>
          <ArrowIcon className="h-4 w-4 text-[#5E6C8E] group-hover:text-[#0A4D68] transition-colors" />
        </Link>

        <Link
          href="/dashboard/ideas"
          className="p-4 rounded-xl bg-white border border-[#D2E5F0] hover:border-[#0A4D68] hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors">
              💡 {isRtl ? "بنك الأفكار والإلهام" : "Idea Lab & Inspiration Bank"}
            </div>
            <div className="text-[11px] text-[#5E6C8E]">
              {isRtl ? "استكشف أفكار وزوايا المحتوى المحفوظة" : "Browse curated hooks & angles"}
            </div>
          </div>
          <ArrowIcon className="h-4 w-4 text-[#5E6C8E] group-hover:text-[#0A4D68] transition-colors" />
        </Link>

        <Link
          href="/dashboard/projects"
          className="p-4 rounded-xl bg-white border border-[#D2E5F0] hover:border-[#0A4D68] hover:shadow-xs transition-all flex items-center justify-between group"
        >
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors">
              📁 {isRtl ? "دراسات الحالة الموثقة" : "Verified Case Studies"}
            </div>
            <div className="text-[11px] text-[#5E6C8E]">
              {isRtl ? `${totalProjects} مشاريع حقيقية مع تقييمات` : `${totalProjects} real projects & reviews`}
            </div>
          </div>
          <ArrowIcon className="h-4 w-4 text-[#5E6C8E] group-hover:text-[#0A4D68] transition-colors" />
        </Link>
      </div>
    </div>
  )
}
