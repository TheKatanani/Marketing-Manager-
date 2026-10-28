"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updatePostVersion, updatePostStatus } from "@/actions/content-actions"
import {
  CheckCircle,
  Save,
  Share2,
  FileText,
  AlertCircle,
  Sparkles,
  Layers,
  ArrowLeft,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"
import { InstagramSlideCanvas } from "@/components/content/instagram-slide-canvas"

interface PostEditorProps {
  post: {
    id: string
    title: string
    status: string
    idea?: {
      id: string
      title: string
      hook: string
      targetAudience: string
      contentPillar: string
      project?: {
        title: string
        problemStatement: string
        solutionArchitecture: string
        businessImpact: string
      } | null
    } | null
    versions: {
      id: string
      platform: string
      content: string
      hashtags: string[]
      visualPrompt?: string | null
      carouselSlides?: string | null
      status: string
    }[]
  }
}

export function PostEditor({ post }: PostEditorProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [activePlatform, setActivePlatform] = useState<"LINKEDIN" | "INSTAGRAM" | "X">("LINKEDIN")
  const [postStatus, setPostStatus] = useState(post.status)
  const [saving, setSaving] = useState(false)
  const [savedSuccess, setSavedSuccess] = useState(false)
  const [copied, setCopied] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Find version for active platform
  const currentVersion =
    post.versions.find((v) => v.platform === activePlatform) || post.versions[0]

  const [content, setContent] = useState(currentVersion?.content || "")
  const [hashtags, setHashtags] = useState(currentVersion?.hashtags?.join(", ") || "")

  // Parse carousel slides if on Instagram
  let parsedSlides: { slideNumber: number; title: string; bodyText: string; visualCue: string }[] = []
  if (currentVersion?.carouselSlides) {
    try {
      parsedSlides = JSON.parse(currentVersion.carouselSlides)
    } catch {
      parsedSlides = []
    }
  }

  const handleTabChange = (platform: "LINKEDIN" | "INSTAGRAM" | "X") => {
    setActivePlatform(platform)
    const ver = post.versions.find((v) => v.platform === platform)
    if (ver) {
      setContent(ver.content)
      setHashtags(ver.hashtags?.join(", ") || "")
      setCurrentSlideIndex(0)
    }
  }

  const handleSave = async () => {
    if (!currentVersion) return
    setSaving(true)
    setStatusMessage(null)

    const hashtagArray = hashtags.split(",").map((s) => s.trim()).filter(Boolean)
    const res = await updatePostVersion(currentVersion.id, content, hashtagArray)
    setSaving(false)

    if (res.success) {
      setSavedSuccess(true)
      setTimeout(() => setSavedSuccess(false), 2500)
    }
  }

  const handleCopy = () => {
    const textToCopy = `${content}\n\n${hashtags}`
    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStatusChange = async (newStatus: "APPROVED" | "REJECTED" | "DRAFT") => {
    setSaving(true)
    const res = await updatePostStatus(post.id, newStatus)
    setSaving(false)

    if (res.success) {
      setPostStatus(newStatus)
      const msg = isRtl
        ? `تم تحديث حالة المنشور إلى: ${newStatus === "APPROVED" ? "معتمد للنشر" : newStatus === "DRAFT" ? "مسودة" : "مرفوض"}`
        : `Post status updated to ${newStatus}`
      setStatusMessage(msg)
      setTimeout(() => setStatusMessage(null), 3000)
      router.refresh()
    }
  }

  const BackArrow = isRtl ? ArrowRight : ArrowLeft

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D2E5F0]">
        <div className="space-y-1">
          <Link
            href="/dashboard/content"
            className="text-xs font-bold text-[#0A4D68] hover:text-[#07384C] inline-flex items-center gap-1 mb-1 transition-colors"
          >
            <BackArrow className="h-3.5 w-3.5" />
            <span>{isRtl ? "العودة إلى استوديو المحتوى" : "Back to Content Studio"}</span>
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#2B3451] tracking-tight">
              {post.title}
            </h1>
            <span
              className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold ${
                postStatus === "APPROVED"
                  ? "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                  : "bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]"
              }`}
            >
              {postStatus === "APPROVED" ? (isRtl ? "معتمد" : "APPROVED") : postStatus}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#EBF4F9] text-[#2B3451] border border-[#D2E5F0] transition-colors shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[#1E4E30]" />
                <span className="text-[#1E4E30]">{isRtl ? "تم النسخ!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#0A4D68]" />
                <span>{isRtl ? "نسخ المنشور" : "Copy Post"}</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleStatusChange("APPROVED")}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{isRtl ? "اعتماد للنشر" : "Approve Post"}</span>
          </button>

          <button
            onClick={() => handleStatusChange("DRAFT")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#5E6C8E] border border-[#D2E5F0] transition-colors cursor-pointer"
          >
            <span>{isRtl ? "تحويل لمسودة" : "Mark as Draft"}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-lg bg-[#E8F2EC] border border-[#A7C8B4] text-[#1E4E30] text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-[#1E4E30]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Source Fact Anchor */}
      {post.idea?.project && (
        <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] text-xs space-y-1 shadow-2xs">
          <div className="text-[#5E6C8E] font-medium">
            {isRtl ? "المصدر الهندسي الموثق:" : "Fact Anchor:"}{" "}
            <span className="text-[#0A4D68] font-bold">{post.idea.project.title}</span>
          </div>
          <div className="text-[#2B3451]">
            {isRtl ? "الأثر المحقق:" : "Business Impact:"}{" "}
            <span className="text-[#1E4E30] font-semibold">{post.idea.project.businessImpact}</span>
          </div>
        </div>
      )}

      {/* Platform Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-[#D2E5F0] pb-2">
        <button
          onClick={() => handleTabChange("LINKEDIN")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activePlatform === "LINKEDIN"
              ? "bg-[#0A4D68] text-white shadow-sm"
              : "text-[#5E6C8E] hover:text-[#0A4D68] hover:bg-[#EBF4F9]"
          }`}
        >
          <LinkedInIcon className="h-4 w-4" />
          <span>{isRtl ? "سردية لينكد إن (LinkedIn)" : "LinkedIn Narrative"}</span>
        </button>

        <button
          onClick={() => handleTabChange("INSTAGRAM")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activePlatform === "INSTAGRAM"
              ? "bg-[#B9AED8] text-[#2B3451] shadow-sm font-extrabold"
              : "text-[#5E6C8E] hover:text-[#2B3451] hover:bg-[#EFEAF7]"
          }`}
        >
          <InstagramIcon className="h-4 w-4" />
          <span>{isRtl ? "سلايدات إنستغرام (Carousel)" : "Instagram Carousel"}</span>
        </button>

        <button
          onClick={() => handleTabChange("X")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
            activePlatform === "X"
              ? "bg-[#2B3451] text-white shadow-sm"
              : "text-[#5E6C8E] hover:text-[#2B3451] hover:bg-[#EBF4F9]"
          }`}
        >
          <XTwitterIcon className="h-4 w-4" />
          <span>{isRtl ? "ثريد منصة إكس (X Thread)" : "X (Twitter) Thread"}</span>
        </button>
      </div>

      {/* Editor & Preview Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Editable Copy */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#D2E5F0]">
              <span className="text-xs font-bold text-[#2B3451] uppercase tracking-wider">
                {isRtl ? `محرر نصوص المنصة (${activePlatform})` : `Platform Copy Editor (${activePlatform})`}
              </span>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
              >
                <Save className="h-3.5 w-3.5" />
                <span>
                  {saving
                    ? isRtl ? "جارٍ الحفظ..." : "Saving..."
                    : savedSuccess
                    ? isRtl ? "تم الحفظ!" : "Saved!"
                    : isRtl ? "حفظ التعديلات" : "Save Changes"}
                </span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "نص المنشور الكامل" : "Post Text Content"}
              </label>
              <textarea
                rows={14}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68] font-sans leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "الهاشتاغات (مفصولة بفواصل)" : "Hashtags (comma-separated)"}
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Platform-Specific Preview & Visual Brief */}
        <div className="space-y-4">
          {activePlatform === "INSTAGRAM" && parsedSlides.length > 0 ? (
            <InstagramSlideCanvas
              slides={parsedSlides}
              caption={content}
              hashtags={currentVersion?.hashtags}
              topicTitle={post.title}
              masterImagePrompt={currentVersion?.visualPrompt || undefined}
            />
          ) : activePlatform === "X" ? (
            <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B3451] uppercase tracking-wider">
                <XTwitterIcon className="h-4 w-4 text-[#2B3451]" />
                <span>{isRtl ? "معاينة سلسلة تغريدات إكس" : "Thread Chain Simulation"}</span>
              </div>

              <div className="space-y-2">
                {content.split("---").map((tweet, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs space-y-1"
                  >
                    <div className="text-[10px] text-[#5E6C8E] font-mono font-bold">
                      {isRtl ? `تغريدة ${i + 1}` : `Tweet ${i + 1}`} • {tweet.trim().length} {isRtl ? "حرف" : "chars"}
                    </div>
                    <p className="text-[#2B3451] text-[11px] leading-relaxed whitespace-pre-wrap">
                      {tweet.trim()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A4D68] uppercase tracking-wider">
                <LinkedInIcon className="h-4 w-4" />
                <span>{isRtl ? "معاينة المنشور على لينكد إن" : "LinkedIn Feed Preview"}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-2 pb-2 border-b border-[#D2E5F0]">
                  <div className="h-8 w-8 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    MK
                  </div>
                  <div>
                    <div className="font-bold text-[#2B3451]">Mohammed Katanani</div>
                    <div className="text-[10px] text-[#5E6C8E]">Senior Full-Stack & Next.js Architect</div>
                  </div>
                </div>

                <div className="text-[#2B3451] whitespace-pre-wrap text-[11px] max-h-72 overflow-y-auto leading-relaxed">
                  {content}
                </div>

                <div className="text-[10px] text-[#0A4D68] font-mono font-semibold">
                  {hashtags}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
