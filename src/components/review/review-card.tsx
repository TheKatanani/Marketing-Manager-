"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { submitReviewDecision } from "@/actions/review-actions"
import {
  CheckCircle,
  XCircle,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Briefcase,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import { useLanguage } from "@/lib/i18n"

interface ReviewCardProps {
  post: {
    id: string
    title: string
    status: string
    idea?: {
      title: string
      hook: string
      contentPillar: string
      targetAudience: string
      project?: {
        title: string
        businessImpact: string
        keyMetrics: string
      } | null
    } | null
    versions: {
      id: string
      platform: string
      content: string
      hashtags: string
      carouselSlides?: string | null
    }[]
  }
}

export function ReviewCard({ post }: ReviewCardProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showFeedbackInput, setShowFeedbackInput] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handleDecision = async (decision: "APPROVED" | "REJECTED" | "REVISION_REQUESTED") => {
    setSubmitting(true)
    const res = await submitReviewDecision(post.id, decision, feedback || undefined)
    setSubmitting(false)

    if (res.success) {
      setStatusMessage(
        decision === "APPROVED"
          ? isRtl ? "تم اعتماد المنشور بنجاح!" : "Post approved!"
          : isRtl ? "تم تسجيل ملاحظات التعديل." : "Feedback recorded."
      )
      setTimeout(() => {
        router.refresh()
      }, 700)
    }
  }

  const linkedinVer = post.versions.find((v) => v.platform === "LINKEDIN")
  const instagramVer = post.versions.find((v) => v.platform === "INSTAGRAM")
  const xVer = post.versions.find((v) => v.platform === "X")
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 shadow-2xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#D2E5F0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
              {isRtl ? "بانتظار موافقة المدير" : "Needs Director Review"}
            </span>
            <span className="text-xs text-[#5E6C8E]">
              {post.idea?.contentPillar || "Full-Stack Architecture"}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#2B3451] tracking-tight">
            {post.title}
          </h3>
          {post.idea && (
            <p className="text-xs text-[#5E6C8E] italic">
              &ldquo;{post.idea.hook}&rdquo;
            </p>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleDecision("APPROVED")}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{isRtl ? "اعتماد للنشر" : "Approve for Publish"}</span>
          </button>

          <button
            onClick={() => setShowFeedbackInput(!showFeedbackInput)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#2B3451] border border-[#D2E5F0] transition-colors cursor-pointer"
          >
            <MessageSquare className="h-3.5 w-3.5 text-[#0A4D68]" />
            <span>{isRtl ? "طلب تعديلات" : "Request Revision"}</span>
          </button>

          <Link
            href={`/dashboard/content/${post.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#EBF4F9] hover:bg-[#D2E5F0] text-[#0A4D68] border border-[#D2E5F0] transition-colors shadow-2xs"
          >
            <span>{isRtl ? "تعديل النص" : "Edit Copy"}</span>
            <ArrowIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-lg bg-[#E8F2EC] border border-[#A7C8B4] text-[#1E4E30] text-xs font-bold flex items-center gap-2">
          <CheckCircle className="h-4 w-4 shrink-0 text-[#1E4E30]" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Revision feedback input */}
      {showFeedbackInput && (
        <div className="p-4 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] space-y-3">
          <label className="block text-xs font-bold text-[#2B3451]">
            {isRtl ? "توجيهات المدير لكاتب المحتوى الذكي:" : "Director Revision Instructions for AI Copywriter:"}
          </label>
          <textarea
            rows={2}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={
              isRtl
                ? "مثال: قلل النبرة التسويقية واذكر نسبة تحسين الأداء 99.4% بوضوح أكبر في السلايد الثاني."
                : "e.g. Tone down the marketing hype, emphasize the 99.4% SLA metric more prominently in slide 4."
            }
            className="w-full px-3 py-2 rounded-lg bg-white border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => handleDecision("REVISION_REQUESTED")}
              disabled={submitting || !feedback.trim()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all disabled:opacity-50 cursor-pointer"
            >
              {isRtl ? "إرسال ملاحظات المراجعة" : "Send Revision Feedback"}
            </button>
          </div>
        </div>
      )}

      {/* Fact Anchor Box */}
      {post.idea?.project && (
        <div className="p-3.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Briefcase className="h-4 w-4 text-[#0A4D68] shrink-0" />
            <span className="text-[#5E6C8E] font-medium">{isRtl ? "مستند إلى دراسة حالة:" : "Grounded in Case Study:"}</span>
            <span className="text-[#2B3451] font-bold">{post.idea.project.title}</span>
          </div>
          <span className="text-[#1E4E30] font-bold truncate max-w-xs bg-[#E8F2EC] px-2.5 py-0.5 rounded-full border border-[#A7C8B4]">
            {post.idea.project.businessImpact}
          </span>
        </div>
      )}

      {/* Platform Drafts Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {/* LinkedIn Snippet */}
        <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] space-y-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-[#0A4D68]">
            <LinkedInIcon className="h-3.5 w-3.5" />
            <span>{isRtl ? "سردية لينكد إن" : "LinkedIn Narrative"}</span>
          </div>
          <p className="text-[#5E6C8E] line-clamp-3 leading-relaxed">
            {linkedinVer?.content || (isRtl ? "لا توجد مسودة لينكد إن" : "No LinkedIn draft")}
          </p>
        </div>

        {/* Instagram Snippet */}
        <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] space-y-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-[#3C2F5E]">
            <InstagramIcon className="h-3.5 w-3.5" />
            <span>{isRtl ? "كاروسيل إنستغرام" : "Instagram Carousel"}</span>
          </div>
          <p className="text-[#5E6C8E] line-clamp-3 leading-relaxed">
            {instagramVer?.content || (isRtl ? "لا توجد مسودة إنستغرام" : "No Instagram draft")}
          </p>
        </div>

        {/* X Thread Snippet */}
        <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] space-y-2 text-xs shadow-2xs">
          <div className="flex items-center gap-1.5 font-bold text-[#2B3451]">
            <XTwitterIcon className="h-3.5 w-3.5" />
            <span>{isRtl ? "ثريد منصة إكس" : "X (Twitter) Thread"}</span>
          </div>
          <p className="text-[#5E6C8E] line-clamp-3 leading-relaxed">
            {xVer?.content?.split("---")[0] || (isRtl ? "لا توجد مسودة إكس" : "No X thread")}
          </p>
        </div>
      </div>
    </div>
  )
}
