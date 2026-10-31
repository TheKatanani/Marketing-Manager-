"use client"

import React, { useState, useTransition } from "react"
import {
  Calendar,
  Sparkles,
  Share2,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Download,
  AlertCircle,
  Clock,
  Filter,
  CheckCircle2,
  RefreshCw,
  Eye,
  FileText,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  Shield,
  Layers,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"
import {
  installNovemberPlan,
  saveEditorialVersion,
  saveEditorialArticle,
  recordManualPublication,
  verifyArticleReference,
} from "@/actions/editorial-actions"
import type { Channel, EditorialSlide } from "@/lib/editorial/types"

interface EditorialWorkspaceProps {
  campaign: any
  strategy: {
    voice: string[]
    visuals: string[]
    cadence: string[]
    rules: string[]
    measurement: string[]
  }
}

export function EditorialWorkspace({ campaign, strategy }: EditorialWorkspaceProps) {
  const { isRtl } = useLanguage()
  const [activeTab, setActiveTab] = useState<"topics" | "articles" | "strategy" | "assets">("topics")
  const [selectedTheme, setSelectedTheme] = useState<string>("ALL")
  const [selectedPlatform, setSelectedPlatform] = useState<string>("ALL")
  const [isPending, startTransition] = useTransition()
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null)
  const [selectedVersionPlatforms, setSelectedVersionPlatforms] = useState<Record<string, Channel>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Local draft states for live edits
  const [versionEdits, setVersionEdits] = useState<
    Record<
      string,
      {
        content: string
        hashtags: string[]
        scheduledFor: string
        slides: EditorialSlide[]
      }
    >
  >({})

  const [articleEdits, setArticleEdits] = useState<
    Record<
      string,
      {
        title: string
        excerpt: string
        content: string
        scheduledFor: string
      }
    >
  >({})

  const [publishUrlInputs, setPublishUrlInputs] = useState<Record<string, string>>({})
  const [slidePreviewIndex, setSlidePreviewIndex] = useState<Record<string, number>>({})
  const [articleLangTab, setArticleLangTab] = useState<Record<string, "ar" | "en">>({})
  const [referenceChecks, setReferenceChecks] = useState<Record<string, { live: boolean; message: string }>>({})

  // Weekly themes definition
  const themes = [
    { key: "ALL", labelAr: "جميع الموضوعات (22)", labelEn: "All Topics (22)" },
    { key: "قرارات قبل الكود", labelAr: "الأسبوع 1: قرارات قبل الكود", labelEn: "Week 1: Decisions Before Code" },
    { key: "واجهة تتحمل الواقع", labelAr: "الأسبوع 2: واجهة تتحمل الواقع", labelEn: "Week 2: Real-World Interfaces" },
    { key: "AI تحت المراجعة", labelAr: "الأسبوع 3: مراجعة تغييرات AI", labelEn: "Week 3: Reviewable AI Changes" },
    { key: "تشغيل بلا مفاجآت", labelAr: "الأسبوع 4: التشغيل وشوبيفاي", labelEn: "Week 4: Operations & Shopify" },
    { key: "قرار المشروع التالي", labelAr: "قرار المشروع التالي", labelEn: "Your Next Project" },
  ]

  const handleInstall = () => {
    startTransition(async () => {
      setStatusMessage(null)
      const res = await installNovemberPlan()
      if (res.success) {
        setStatusMessage({ type: "success", text: isRtl ? "تم تثبيت خطة نوفمبر بنجاح!" : "November plan installed successfully!" })
        window.location.reload()
      } else {
        setStatusMessage({ type: "error", text: res.error || (isRtl ? "فشل تثبيت الخطة" : "Failed to install plan") })
      }
    })
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  // Helper to format ISO date to readable Hebron local date
  const formatHebronDate = (dateStr?: string | Date | null) => {
    if (!dateStr) return isRtl ? "غير مجدول" : "Not scheduled"
    try {
      const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr
      return new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
        timeZone: "Asia/Hebron",
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(d)
    } catch {
      return String(dateStr)
    }
  }

  // Get active version for a topic
  const getActiveVersion = (post: any) => {
    const currentPlatform = selectedVersionPlatforms[post.id] || post.versions[0]?.platform || "LINKEDIN"
    return post.versions.find((v: any) => v.platform === currentPlatform) || post.versions[0]
  }

  // Parse JSON helper safely
  const safeParse = <T,>(json: string | null | undefined, fallback: T): T => {
    if (!json) return fallback
    try {
      return JSON.parse(json)
    } catch {
      return fallback
    }
  }

  // Filter posts
  const filteredPosts = (campaign?.posts || []).filter((post: any) => {
    if (selectedTheme !== "ALL" && post.weekTheme !== selectedTheme) return false
    if (selectedPlatform !== "ALL") {
      const hasPlatform = post.versions.some((v: any) => v.platform === selectedPlatform)
      if (!hasPlatform) return false
    }
    return true
  })

  // Save Version Handler
  const handleSaveVersion = (version: any) => {
    const edit = versionEdits[version.id] || {
      content: version.content,
      hashtags: safeParse<string[]>(version.hashtags, []),
      scheduledFor: version.scheduledFor ? new Date(version.scheduledFor).toISOString() : "",
      slides: safeParse<EditorialSlide[]>(version.carouselSlides, []),
    }

    startTransition(async () => {
      setStatusMessage(null)
      const res = await saveEditorialVersion({
        id: version.id,
        content: edit.content,
        hashtags: edit.hashtags,
        scheduledFor: edit.scheduledFor ? new Date(edit.scheduledFor).toISOString() : null,
        slides: edit.slides.length > 0 ? edit.slides : undefined,
      })

      if (res.success) {
        setStatusMessage({ type: "success", text: isRtl ? "تم حفظ التعديلات بنجاح" : "Version saved successfully" })
      } else {
        setStatusMessage({ type: "error", text: res.error || (isRtl ? "حدث خطأ أثناء الحفظ" : "Error saving version") })
      }
    })
  }

  // Save Article Handler
  const handleSaveArticle = (article: any) => {
    const edit = articleEdits[article.id] || {
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      scheduledFor: article.scheduledFor ? new Date(article.scheduledFor).toISOString() : "",
    }

    startTransition(async () => {
      setStatusMessage(null)
      const res = await saveEditorialArticle({
        id: article.id,
        title: edit.title,
        excerpt: edit.excerpt,
        content: edit.content,
        scheduledFor: edit.scheduledFor ? new Date(edit.scheduledFor).toISOString() : null,
      })

      if (res.success) {
        setStatusMessage({ type: "success", text: isRtl ? "تم حفظ المقال بنجاح" : "Article saved successfully" })
      } else {
        setStatusMessage({ type: "error", text: res.error || (isRtl ? "فشل حفظ المقال" : "Error saving article") })
      }
    })
  }

  // Record Manual Publication Handler
  const handleRecordPublication = (versionId: string) => {
    const url = publishUrlInputs[versionId]?.trim()
    if (!url) {
      setStatusMessage({ type: "error", text: isRtl ? "يرجى إدخال رابط المنشور المنشور فعلياً" : "Please enter the published post URL" })
      return
    }

    startTransition(async () => {
      setStatusMessage(null)
      const res = await recordManualPublication(versionId, url)
      if (res.success) {
        setStatusMessage({ type: "success", text: isRtl ? "تم تسجيل رابط النشر وتحديث الحالة!" : "Publication URL recorded!" })
        window.location.reload()
      } else {
        setStatusMessage({ type: "error", text: res.error || (isRtl ? "فشل تسجيل النشر" : "Failed to record publication") })
      }
    })
  }

  // Verify Reference Link
  const handleVerifyReference = async (articleId: string) => {
    const res = await verifyArticleReference(articleId)
    if (res.success) {
      setReferenceChecks((prev) => ({
        ...prev,
        [articleId]: { live: res.live ?? false, message: res.message || "" },
      }))
    }
  }

  // Export Campaign Calendar as ICS
  const handleExportIcs = () => {
    if (!campaign?.posts) return
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//TheKatanani//BrandPilot November 2026//AR\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n"

    for (const post of campaign.posts) {
      for (const v of post.versions) {
        if (!v.scheduledFor) continue
        const d = new Date(v.scheduledFor)
        const dtstart = d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
        const dtend = new Date(d.getTime() + 30 * 60000).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
        icsContent += `BEGIN:VEVENT\nUID:${v.id}@brandpilot.ai\nDTSTAMP:${dtstart}\nDTSTART:${dtstart}\nDTEND:${dtend}\nSUMMARY:[${v.platform}] ${post.title.replace(/\n/g, " ")}\nDESCRIPTION:${v.content.slice(0, 150).replace(/\n/g, "\\n")}...\nSTATUS:CONFIRMED\nEND:VEVENT\n`
      }
    }
    icsContent += "END:VCALENDAR"

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "november-2026-editorial-calendar.ics"
    link.click()
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#0A4D68] text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-[#D2E5F0]">
        <div className="relative mb-6 w-fit max-w-full px-6 py-5">
          <img src="/brand/katanani/primary-transparent.png" alt="THE KATANANI — web developer" width={360} height={120} className="w-[300px] sm:w-[360px] h-auto max-w-full brightness-0 invert" />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#D2E5F0]/20 text-[#D2E5F0] border border-[#D2E5F0]/30">
                {isRtl ? "خطة محتوى شهر نوفمبر 2026" : "November 2026 Editorial Campaign"}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#A7C8B4]/20 text-[#A7C8B4] border border-[#A7C8B4]/30">
                {isRtl ? "تركيز: عملاء الواجهات وشوبيفاي" : "Target: Frontend & Shopify Clients"}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {isRtl ? "من الفكرة للتسليم — استوديو النشر والتوثيق" : "From Idea to Delivery — Editorial Studio"}
            </h1>
            <p className="text-sm md:text-base text-[#D2E5F0] leading-relaxed">
              {isRtl
                ? "حملة متكاملة من 22 موضوعاً و50 منشوراً عبر LinkedIn وX وInstagram مع 4 مقالات هندسية متعمقة في البورتفوليو، مصممة بنبرة مهنية صادقة وبدون وعود وهمية."
                : "A coherent campaign of 22 topics, 50 social versions across LinkedIn, X, and Instagram, plus 4 in-depth portfolio articles without generic claims."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!campaign ? (
              <button
                onClick={handleInstall}
                disabled={isPending}
                className="px-5 py-3 rounded-xl bg-[#A7C8B4] hover:bg-[#A7C8B4]/90 text-[#052634] font-bold text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>{isPending ? (isRtl ? "جارِ التثبيت..." : "Installing...") : isRtl ? "تثبيت خطة نوفمبر 2026" : "Install November Plan"}</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleExportIcs}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>{isRtl ? "تصدير التقويم (.ics)" : "Export Calendar (.ics)"}</span>
                </button>
                <a
                  href="/editorial/2026-11/asset-index.json"
                  download="asset-index.json"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-all flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  <span>{isRtl ? "فهرس الأصول (JSON)" : "Asset Index"}</span>
                </a>
              </>
            )}
          </div>
        </div>

        {/* Campaign Metrics Bar */}
        {campaign && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/15">
            <div>
              <div className="text-2xl font-black text-white">{campaign.posts?.length || 22}</div>
              <div className="text-xs text-[#D2E5F0]">{isRtl ? "موضوعاً تحريرياً" : "Editorial Topics"}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#A7C8B4]">
                {campaign.posts?.reduce((acc: number, p: any) => acc + (p.versions?.length || 0), 0) || 50}
              </div>
              <div className="text-xs text-[#D2E5F0]">{isRtl ? "منشوراً للمنصات" : "Platform Versions"}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#B9AED8]">
                {campaign.blogPosts?.length ? Math.floor(campaign.blogPosts.length / 2) : 4}
              </div>
              <div className="text-xs text-[#D2E5F0]">{isRtl ? "مقالات ثنائية اللغة (8 نسخ)" : "Bilingual Articles (8 Docs)"}</div>
            </div>
            <div>
              <div className="text-2xl font-black text-white">96</div>
              <div className="text-xs text-[#D2E5F0]">{isRtl ? "تصميماً بصرياً جاهزاً" : "Branded PNG Assets"}</div>
            </div>
          </div>
        )}
      </div>

      {/* Status Alert Toast */}
      {statusMessage && (
        <div
          className={cn(
            "p-4 rounded-xl flex items-center justify-between gap-3 text-sm font-semibold transition-all shadow-sm",
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          )}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? <CheckCircle2 className="h-5 w-5 text-emerald-600" /> : <AlertCircle className="h-5 w-5 text-rose-600" />}
            <span>{statusMessage.text}</span>
          </div>
          <button onClick={() => setStatusMessage(null)} className="text-xs opacity-75 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* Main Tabs Navigation */}
      <div className="flex border-b border-[#D2E5F0] gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("topics")}
          className={cn(
            "px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap",
            activeTab === "topics" ? "border-[#0A4D68] text-[#0A4D68]" : "border-transparent text-[#5E6C8E] hover:text-[#2B3451]"
          )}
        >
          <Share2 className="h-4 w-4" />
          <span>{isRtl ? "منشورات المنصات (22 موضوعاً)" : "Social Posts (22 Topics)"}</span>
        </button>

        <button
          onClick={() => setActiveTab("articles")}
          className={cn(
            "px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap",
            activeTab === "articles" ? "border-[#0A4D68] text-[#0A4D68]" : "border-transparent text-[#5E6C8E] hover:text-[#2B3451]"
          )}
        >
          <BookOpen className="h-4 w-4" />
          <span>{isRtl ? "مقالات البورتفوليو (4 أدلة عملية)" : "Portfolio Articles (4 Guides)"}</span>
        </button>

        <button
          onClick={() => setActiveTab("strategy")}
          className={cn(
            "px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap",
            activeTab === "strategy" ? "border-[#0A4D68] text-[#0A4D68]" : "border-transparent text-[#5E6C8E] hover:text-[#2B3451]"
          )}
        >
          <Shield className="h-4 w-4" />
          <span>{isRtl ? "دليل النبرة والاستراتيجية" : "Voice & Strategy Guide"}</span>
        </button>

        <button
          onClick={() => setActiveTab("assets")}
          className={cn(
            "px-4 py-3 text-xs md:text-sm font-bold flex items-center gap-2 border-b-2 transition-colors whitespace-nowrap",
            activeTab === "assets" ? "border-[#0A4D68] text-[#0A4D68]" : "border-transparent text-[#5E6C8E] hover:text-[#2B3451]"
          )}
        >
          <ImageIcon className="h-4 w-4" />
          <span>{isRtl ? "مكتبة التصاميم والقصص (96)" : "Graphics & Stories (96)"}</span>
        </button>
      </div>

      {/* TAB 1: TOPICS AND POSTS */}
      {activeTab === "topics" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl border border-[#D2E5F0] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            {/* Week Theme Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs font-bold text-[#5E6C8E] whitespace-nowrap flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" />
                {isRtl ? "المحور:" : "Theme:"}
              </span>
              <div className="flex gap-1.5">
                {themes.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedTheme(t.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap",
                      selectedTheme === t.key
                        ? "bg-[#0A4D68] text-white shadow-sm"
                        : "bg-[#F5F9FC] text-[#5E6C8E] hover:bg-[#EBF4F9] hover:text-[#2B3451]"
                    )}
                  >
                    {isRtl ? t.labelAr : t.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-bold text-[#5E6C8E]">{isRtl ? "المنصة:" : "Channel:"}</span>
              {["ALL", "LINKEDIN", "X", "INSTAGRAM"].map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPlatform(p)}
                  className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-bold transition-colors",
                    selectedPlatform === p ? "bg-[#2B3451] text-white" : "bg-[#F5F9FC] text-[#5E6C8E] hover:bg-[#EBF4F9]"
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Feed */}
          {filteredPosts.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-[#D2E5F0] space-y-3">
              <Sparkles className="h-8 w-8 text-[#0A4D68] mx-auto opacity-40" />
              <h3 className="font-bold text-base text-[#2B3451]">
                {campaign ? (isRtl ? "لا توجد منشورات تطابق هذا الفلتر" : "No posts match this filter") : isRtl ? "خطة نوفمبر غير مثبتة بعد" : "Plan not installed"}
              </h3>
              <p className="text-xs text-[#5E6C8E] max-w-md mx-auto">
                {!campaign && (isRtl ? "اضغط على زر 'تثبيت خطة نوفمبر 2026' في الأعلى لتحميل الـ 22 موضوعاً والـ 50 منشوراً فوراً." : "Click install in the top banner to load the campaign.")}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredPosts.map((post: any) => {
                const isExpanded = expandedTopic === post.id
                const activeVersion = getActiveVersion(post)
                const isInstagram = activeVersion?.platform === "INSTAGRAM"
                const slides = safeParse<EditorialSlide[]>(activeVersion?.carouselSlides, [])
                const currentSlideIdx = slidePreviewIndex[activeVersion?.id] || 0
                const activeSlide = slides[currentSlideIdx] || slides[0]

                return (
                  <div
                    key={post.id}
                    className="bg-white rounded-2xl border border-[#D2E5F0] shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Topic Header Row */}
                    <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-white to-[#F5F9FC]">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#D2E5F0] text-[#0A4D68]">
                            {formatHebronDate(post.scheduledFor)}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-[#5E6C8E]">
                            {post.weekTheme}
                          </span>
                          {post.sourceType === "ARTICLE" && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#B9AED8]/20 text-[#0A4D68] flex items-center gap-1">
                              <BookOpen className="h-3 w-3" />
                              {isRtl ? "مرتبط بمقال بورتفوليو" : "Linked to Article"}
                            </span>
                          )}
                          {post.sourceType === "PROJECT" && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#A7C8B4]/20 text-[#052634] flex items-center gap-1">
                              <ExternalLink className="h-3 w-3" />
                              {post.sourceLabel || (isRtl ? "دراسة حالة موثقة" : "Case Study")}
                            </span>
                          )}
                          {post.status === "PUBLISHED" ? (
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                              {isRtl ? "منشور" : "Published"}
                            </span>
                          ) : (
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                              {isRtl ? "مجدول تحريرياً" : "Planned Draft"}
                            </span>
                          )}
                        </div>

                        <h3 className="text-base md:text-lg font-bold text-[#2B3451]">{post.title}</h3>
                      </div>

                      {/* Channel Tabs Selector & Toggle */}
                      <div className="flex items-center gap-2 self-start md:self-center">
                        <div className="bg-[#EBF4F9] p-1 rounded-xl flex gap-1">
                          {post.versions.map((v: any) => (
                            <button
                              key={v.platform}
                              onClick={() => {
                                setSelectedVersionPlatforms((prev) => ({ ...prev, [post.id]: v.platform }))
                                setExpandedTopic(post.id)
                              }}
                              className={cn(
                                "px-3 py-1 rounded-lg text-xs font-bold transition-all",
                                (selectedVersionPlatforms[post.id] || post.versions[0].platform) === v.platform
                                  ? "bg-[#0A4D68] text-white shadow-sm"
                                  : "text-[#5E6C8E] hover:text-[#2B3451]"
                              )}
                            >
                              {v.platform}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={() => setExpandedTopic(isExpanded ? null : post.id)}
                          className="p-2 text-[#5E6C8E] hover:text-[#2B3451] hover:bg-[#EBF4F9] rounded-lg transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Expanded Content and Live Editor */}
                    {isExpanded && activeVersion && (
                      <div className="p-4 md:p-6 border-t border-[#D2E5F0] bg-white space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                          {/* Column 1: Copy Editor & Settings (7 cols) */}
                          <div className="lg:col-span-7 space-y-4">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-bold text-[#2B3451] flex items-center gap-1.5">
                                <FileText className="h-4 w-4 text-[#0A4D68]" />
                                <span>{isRtl ? `نص المنشور (${activeVersion.platform})` : `Post Copy (${activeVersion.platform})`}</span>
                              </label>

                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleCopy(versionEdits[activeVersion.id]?.content || activeVersion.content, activeVersion.id)}
                                  className="text-xs font-bold text-[#0A4D68] hover:text-[#0A4D68]/80 flex items-center gap-1 bg-[#D2E5F0]/40 px-2.5 py-1 rounded-md transition-colors"
                                >
                                  {copiedId === activeVersion.id ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                                  <span>{copiedId === activeVersion.id ? (isRtl ? "تم النسخ!" : "Copied!") : isRtl ? "نسخ النص" : "Copy"}</span>
                                </button>
                              </div>
                            </div>

                            {/* Content Textarea */}
                            <textarea
                              rows={8}
                              value={versionEdits[activeVersion.id]?.content ?? activeVersion.content}
                              onChange={(e) =>
                                setVersionEdits((prev) => ({
                                  ...prev,
                                  [activeVersion.id]: {
                                    content: e.target.value,
                                    hashtags: prev[activeVersion.id]?.hashtags ?? safeParse(activeVersion.hashtags, []),
                                    scheduledFor: prev[activeVersion.id]?.scheduledFor ?? activeVersion.scheduledFor ?? "",
                                    slides: prev[activeVersion.id]?.slides ?? safeParse(activeVersion.carouselSlides, []),
                                  },
                                }))
                              }
                              className="w-full p-3.5 rounded-xl border border-[#D2E5F0] bg-[#F5F9FC] text-sm text-[#2B3451] font-mono leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0A4D68]/30 transition-all"
                            />

                            {/* Character & Thread Counter */}
                            <div className="flex items-center justify-between text-xs text-[#5E6C8E]">
                              <div>
                                {activeVersion.platform === "X" ? (
                                  <span>
                                    {isRtl ? "سلسلة تغريدات (Thread): " : "Thread parts: "}
                                    <strong>{(versionEdits[activeVersion.id]?.content ?? activeVersion.content).split(/---|\n\n/).length}</strong>
                                  </span>
                                ) : (
                                  <span>
                                    {isRtl ? "عدد الحروف: " : "Characters: "}
                                    <strong>{(versionEdits[activeVersion.id]?.content ?? activeVersion.content).length}</strong>
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] font-medium text-slate-400">
                                {isRtl ? "تعديل فوري مع حفظ تلقائي عند الحفظ" : "Live editable draft"}
                              </span>
                            </div>

                            {/* Hashtags Editor */}
                            <div className="space-y-1.5 pt-2">
                              <label className="text-xs font-bold text-[#2B3451]">{isRtl ? "الهاشتاغات (Hashtags):" : "Hashtags:"}</label>
                              <div className="flex flex-wrap gap-1.5">
                                {(versionEdits[activeVersion.id]?.hashtags ?? safeParse<string[]>(activeVersion.hashtags, [])).map((tag, idx) => (
                                  <span key={idx} className="px-2 py-0.5 rounded-md bg-[#EBF4F9] text-[#0A4D68] text-xs font-semibold">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Scheduled Time for this Version */}
                            <div className="space-y-1.5 pt-2">
                              <label className="text-xs font-bold text-[#2B3451] flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-[#0A4D68]" />
                                <span>{isRtl ? "موعد النشر المقترح (بتوقيت القدس Hebron):" : "Scheduled Time (Asia/Hebron):"}</span>
                              </label>
                              <div className="text-xs font-semibold text-[#0A4D68] bg-[#D2E5F0]/30 p-2.5 rounded-xl border border-[#D2E5F0]">
                                {formatHebronDate(versionEdits[activeVersion.id]?.scheduledFor ?? activeVersion.scheduledFor)}
                              </div>
                            </div>

                            {/* Save Button */}
                            <div className="pt-3 flex items-center gap-3">
                              <button
                                onClick={() => handleSaveVersion(activeVersion)}
                                disabled={isPending}
                                className="px-5 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                              >
                                <Check className="h-4 w-4" />
                                <span>{isRtl ? "حفظ تعديلات المنشور" : "Save Changes"}</span>
                              </button>
                            </div>
                          </div>

                          {/* Column 2: Graphic Preview & Slides (5 cols) */}
                          <div className="lg:col-span-5 space-y-4 bg-[#F5F9FC] p-4 rounded-xl border border-[#D2E5F0]">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-[#2B3451] flex items-center gap-1.5">
                                <ImageIcon className="h-4 w-4 text-[#0A4D68]" />
                                <span>{isInstagram ? (isRtl ? "شرائح الكاروسيل (Carousel)" : "Carousel Slides") : isRtl ? "التصميم البصري" : "Branded Graphic"}</span>
                              </span>

                              {isInstagram && slides.length > 0 && (
                                <div className="text-xs font-bold text-[#0A4D68]">
                                  {currentSlideIdx + 1} / {slides.length}
                                </div>
                              )}
                            </div>

                            {/* Image Preview Box */}
                            <div className="relative aspect-square sm:aspect-[4/5] bg-[#0A4D68] rounded-xl overflow-hidden shadow-inner flex items-center justify-center border border-[#D2E5F0]">
                              {/* Using dynamic API endpoint or public asset */}
                              <img
                                src={`/api/editorial/assets/${activeVersion.id}?slide=${currentSlideIdx + 1}`}
                                alt={post.title}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  // Fallback to static rendered asset if dynamic endpoint needs auth
                                  const target = e.target as HTMLImageElement
                                  target.src = isInstagram
                                    ? `/editorial/2026-11/${post.id.replace(`nov26-${campaign.userId}-`, "")}/slide-${currentSlideIdx + 1}.png`
                                    : `/editorial/2026-11/${post.id.replace(`nov26-${campaign.userId}-`, "")}/linkedin.png`
                                }}
                              />
                            </div>

                            {/* Carousel Slide Switcher */}
                            {isInstagram && slides.length > 0 && (
                              <div className="space-y-3">
                                <div className="flex items-center justify-center gap-1.5">
                                  {slides.map((_, i) => (
                                    <button
                                      key={i}
                                      onClick={() => setSlidePreviewIndex((prev) => ({ ...prev, [activeVersion.id]: i }))}
                                      className={cn(
                                        "h-2 rounded-full transition-all",
                                        currentSlideIdx === i ? "w-6 bg-[#0A4D68]" : "w-2 bg-[#D2E5F0] hover:bg-[#76A5B2]"
                                      )}
                                    />
                                  ))}
                                </div>

                                {activeSlide && (
                                  <div className="bg-white p-3 rounded-lg border border-[#D2E5F0] text-xs space-y-1">
                                    <div className="font-bold text-[#2B3451]">{activeSlide.title}</div>
                                    <div className="text-[#5E6C8E] line-clamp-2">{activeSlide.bodyText}</div>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Download Graphic Button */}
                            <div className="pt-2">
                              <a
                                href={`/api/editorial/assets/${activeVersion.id}?slide=${currentSlideIdx + 1}&download=1`}
                                download={`${activeVersion.platform.toLowerCase()}-${currentSlideIdx + 1}.png`}
                                className="w-full py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#0A4D68] font-bold text-xs border border-[#D2E5F0] shadow-sm transition-all flex items-center justify-center gap-2"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span>{isRtl ? "تحميل التصميم PNG عالي الدقة" : "Download PNG Graphic"}</span>
                              </a>
                            </div>

                            {/* Manual Publication URL Input */}
                            <div className="pt-3 border-t border-[#D2E5F0]/70 space-y-2">
                              <label className="text-[11px] font-bold text-[#5E6C8E] block">
                                {isRtl ? "توثيق النشر الفعلي (رابط المنشور الحقيقي):" : "Record Live Publication URL:"}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  placeholder={
                                    activeVersion.platform === "LINKEDIN"
                                      ? "https://linkedin.com/posts/..."
                                      : activeVersion.platform === "X"
                                      ? "https://x.com/mkatanani_dev/status/..."
                                      : "https://instagram.com/p/..."
                                  }
                                  value={publishUrlInputs[activeVersion.id] ?? activeVersion.publishedUrl ?? ""}
                                  onChange={(e) =>
                                    setPublishUrlInputs((prev) => ({
                                      ...prev,
                                      [activeVersion.id]: e.target.value,
                                    }))
                                  }
                                  className="flex-1 p-2 text-xs rounded-lg border border-[#D2E5F0] bg-white text-[#2B3451] focus:outline-none focus:ring-1 focus:ring-[#0A4D68]"
                                />
                                <button
                                  onClick={() => handleRecordPublication(activeVersion.id)}
                                  disabled={isPending}
                                  className="px-3 py-2 bg-[#2B3451] hover:bg-[#052634] text-white rounded-lg text-xs font-bold transition-all disabled:opacity-50 shrink-0"
                                >
                                  {isRtl ? "اعتماد" : "Record"}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PORTFOLIO ARTICLES */}
      {activeTab === "articles" && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#D2E5F0] space-y-2">
            <h3 className="font-extrabold text-lg text-[#0A4D68] flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              <span>{isRtl ? "الأدلة الهندسية الأربعة لبورتفوليو thekatanani.com" : "Four Core Portfolio Engineering Articles"}</span>
            </h3>
            <p className="text-xs text-[#5E6C8E] leading-relaxed">
              {isRtl
                ? "هذه المقالات تمثل المرجع الثابت والدائم لخبرتك. كل مقال متوفر بنسختين كاملتين (عربية وألمانية/إنجليزية)، مجدولة للنشر في تواريخ محددة طوال شهر نوفمبر 2026."
                : "These articles serve as durable technical references. Each guide has complete Arabic and English editions scheduled across November 2026."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {(campaign?.blogPosts || []).reduce((acc: any[], item: any) => {
              // Group bilingual pairs by base slug
              const baseSlug = item.slug.replace(/-(ar|en)$/, "")
              let group = acc.find((g) => g.baseSlug === baseSlug)
              if (!group) {
                group = { baseSlug, ar: null, en: null }
                acc.push(group)
              }
              if (item.language === "ar") group.ar = item
              if (item.language === "en") group.en = item
              return acc
            }, []).map((group: any, idx: number) => {
              const currentLang = articleLangTab[group.baseSlug] || "ar"
              const currentArticle = currentLang === "ar" ? group.ar : group.en
              if (!currentArticle) return null

              const check = referenceChecks[currentArticle.id]

              return (
                <div key={group.baseSlug} className="bg-white rounded-2xl border border-[#D2E5F0] shadow-sm overflow-hidden p-6 space-y-5">
                  {/* Article Card Top */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D2E5F0] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0A4D68] text-white">
                          {isRtl ? `الدليل رقم ${idx + 1}` : `Guide #${idx + 1}`}
                        </span>
                        <span className="text-xs font-bold text-[#0A4D68] bg-[#D2E5F0] px-2 py-0.5 rounded">
                          {formatHebronDate(currentArticle.scheduledFor)}
                        </span>
                        <span className="text-xs font-semibold text-[#5E6C8E] bg-slate-100 px-2 py-0.5 rounded">
                          {currentArticle.category}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-[#2B3451]">{currentArticle.title}</h4>
                      <div className="text-xs text-[#0A4D68] font-mono hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        <a href={currentArticle.canonicalUrl || "#"} target="_blank" rel="noreferrer">
                          {currentArticle.canonicalUrl}
                        </a>
                      </div>
                    </div>

                    {/* Language Toggle */}
                    <div className="bg-[#EBF4F9] p-1 rounded-xl flex gap-1 self-start sm:self-center">
                      <button
                        onClick={() => setArticleLangTab((prev) => ({ ...prev, [group.baseSlug]: "ar" }))}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          currentLang === "ar" ? "bg-[#0A4D68] text-white shadow-sm" : "text-[#5E6C8E]"
                        )}
                      >
                        العربية (AR)
                      </button>
                      <button
                        onClick={() => setArticleLangTab((prev) => ({ ...prev, [group.baseSlug]: "en" }))}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-xs font-bold transition-all",
                          currentLang === "en" ? "bg-[#0A4D68] text-white shadow-sm" : "text-[#5E6C8E]"
                        )}
                      >
                        English (EN)
                      </button>
                    </div>
                  </div>

                  {/* Article Excerpt */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2B3451]">{isRtl ? "الموجز (Excerpt):" : "Excerpt:"}</label>
                    <textarea
                      rows={2}
                      value={articleEdits[currentArticle.id]?.excerpt ?? currentArticle.excerpt}
                      onChange={(e) =>
                        setArticleEdits((prev) => ({
                          ...prev,
                          [currentArticle.id]: {
                            title: prev[currentArticle.id]?.title ?? currentArticle.title,
                            excerpt: e.target.value,
                            content: prev[currentArticle.id]?.content ?? currentArticle.content,
                            scheduledFor: prev[currentArticle.id]?.scheduledFor ?? currentArticle.scheduledFor ?? "",
                          },
                        }))
                      }
                      className="w-full p-2.5 rounded-xl border border-[#D2E5F0] bg-[#F5F9FC] text-xs text-[#2B3451] focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Article Markdown Content Body */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#2B3451]">{isRtl ? "محتوى المقال الكامل (Markdown):" : "Full Content (Markdown):"}</label>
                    <textarea
                      rows={10}
                      value={articleEdits[currentArticle.id]?.content ?? currentArticle.content}
                      onChange={(e) =>
                        setArticleEdits((prev) => ({
                          ...prev,
                          [currentArticle.id]: {
                            title: prev[currentArticle.id]?.title ?? currentArticle.title,
                            excerpt: prev[currentArticle.id]?.excerpt ?? currentArticle.excerpt,
                            content: e.target.value,
                            scheduledFor: prev[currentArticle.id]?.scheduledFor ?? currentArticle.scheduledFor ?? "",
                          },
                        }))
                      }
                      className="w-full p-3.5 rounded-xl border border-[#D2E5F0] bg-[#F5F9FC] font-mono text-xs text-[#2B3451] leading-relaxed focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Reference Status Verification Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleVerifyReference(currentArticle.id)}
                        className="px-3.5 py-2 rounded-xl bg-[#EBF4F9] hover:bg-[#D2E5F0] text-[#0A4D68] text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>{isRtl ? "فحص الرابط العام في البورتفوليو" : "Verify Live Portfolio URL"}</span>
                      </button>

                      {check && (
                        <span
                          className={cn(
                            "text-xs font-semibold px-2.5 py-1 rounded-md",
                            check.live ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                          )}
                        >
                          {check.message}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleSaveArticle(currentArticle)}
                      disabled={isPending}
                      className="px-5 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
                    >
                      <Check className="h-4 w-4" />
                      <span>{isRtl ? "حفظ تعديلات المقال" : "Save Article Changes"}</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* TAB 3: STRATEGY & VOICE GUIDE */}
      {activeTab === "strategy" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Voice & Tone */}
          <div className="bg-white p-6 rounded-2xl border border-[#D2E5F0] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0A4D68] flex items-center gap-2 border-b border-[#D2E5F0] pb-3">
              <Shield className="h-4 w-4" />
              <span>{isRtl ? "نبرة الصوت والقواعد التحريرية (Voice & Tone)" : "Voice & Tone Guidelines"}</span>
            </h3>
            <ul className="space-y-2.5">
              {(strategy?.voice || []).map((rule, idx) => (
                <li key={idx} className="text-xs text-[#2B3451] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#0A4D68] font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual Standards */}
          <div className="bg-white p-6 rounded-2xl border border-[#D2E5F0] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0A4D68] flex items-center gap-2 border-b border-[#D2E5F0] pb-3">
              <ImageIcon className="h-4 w-4" />
              <span>{isRtl ? "المعايير البصرية والتصميم (Visual Design)" : "Visual & Design Standards"}</span>
            </h3>
            <ul className="space-y-2.5">
              {(strategy?.visuals || []).map((rule, idx) => (
                <li key={idx} className="text-xs text-[#2B3451] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#0A4D68] font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cadence & Timezone */}
          <div className="bg-white p-6 rounded-2xl border border-[#D2E5F0] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0A4D68] flex items-center gap-2 border-b border-[#D2E5F0] pb-3">
              <Clock className="h-4 w-4" />
              <span>{isRtl ? "جدول ومواعيد النشر (Asia/Hebron UTC+2)" : "Publishing Cadence & Policy"}</span>
            </h3>
            <ul className="space-y-2.5">
              {(strategy?.cadence || []).map((rule, idx) => (
                <li key={idx} className="text-xs text-[#2B3451] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#0A4D68] font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Measurement & Rules */}
          <div className="bg-white p-6 rounded-2xl border border-[#D2E5F0] shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-[#0A4D68] flex items-center gap-2 border-b border-[#D2E5F0] pb-3">
              <Layers className="h-4 w-4" />
              <span>{isRtl ? "مؤشرات النجاح والقيود (Measurement & Guardrails)" : "Measurement & Guardrails"}</span>
            </h3>
            <ul className="space-y-2.5">
              {(strategy?.rules || []).map((rule, idx) => (
                <li key={idx} className="text-xs text-[#2B3451] flex items-start gap-2 leading-relaxed">
                  <span className="text-[#0A4D68] font-bold mt-0.5">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: ASSETS & DOWNLOADS */}
      {activeTab === "assets" && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#D2E5F0] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <h3 className="font-extrabold text-base text-[#2B3451]">
                {isRtl ? "مكتبة التصاميم البصرية الكاملة (96 صورة جاهزة)" : "Complete 96 Branded PNG Graphics Bundle"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "70 شريحة إنستغرام (1080×1350)، 14 غلاف لينكد إن (1200×1350)، 4 أغلفة مقالات (1600×900)، 8 قصص ستوري."
                  : "70 Instagram slides (1080x1350), 14 LinkedIn covers, 4 article headers (1600x900), 8 story frames."}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="/editorial/2026-11/asset-index.json"
                download="asset-index.json"
                className="px-4 py-2.5 rounded-xl bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#0A4D68] text-xs font-bold border border-[#D2E5F0] transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>{isRtl ? "تحميل الفهرس (JSON)" : "Asset Index"}</span>
              </a>
              <a
                href="/editorial/november-2026-editorial-assets.zip"
                download="november-2026-editorial-assets.zip"
                className="px-5 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#0A4D68]/90 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                <span>{isRtl ? "تحميل الحزمة كاملة (ZIP)" : "Download All (ZIP)"}</span>
              </a>
            </div>
          </div>

          {/* Asset Grid Preview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["01-brief", "02-proposal", "03-coachspace", "04-rtl", "05-performance", "06-marwan", "07-ai-review", "08-bug-report", "09-content-workflow", "10-handoff", "11-shopify-decision", "12-mahseri", "13-recap", "14-inquiry"].map((key) => (
              <div key={key} className="bg-white p-2.5 rounded-xl border border-[#D2E5F0] space-y-2 group">
                <div className="aspect-[4/5] bg-[#0A4D68] rounded-lg overflow-hidden flex items-center justify-center shadow-sm">
                  <img
                    src={`/editorial/2026-11/${key}/slide-1.png`}
                    alt={key}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                </div>
                <div className="text-[11px] font-bold text-[#2B3451] truncate text-center">{key}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
