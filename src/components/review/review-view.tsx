"use client"

import Link from "next/link"
import { ReviewCard } from "@/components/review/review-card"
import { CheckSquare, ShieldCheck, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface ReviewViewProps {
  pendingPosts: any[]
}

export function ReviewView({ pendingPosts }: ReviewViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <CheckSquare className="h-3.5 w-3.5" />
            <span>{isRtl ? "بوابة التدقيق والاعتماد البشري" : "Human-in-the-Loop Gatekeeper"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.reviewTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.reviewSub}
          </p>
        </div>

        <Link
          href="/dashboard/ideas"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isRtl ? "+ صياغة مسودة جديدة" : "+ Generate New Draft"}</span>
        </Link>
      </div>

      {/* Director Authority Card */}
      <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="h-5 w-5 text-[#0A4D68] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#0A4D68]">
            {isRtl ? "بروتوكول رقابة المدير التنفيذي" : "Director Oversight Protocol"}
          </div>
          <p className="text-xs text-[#5E6C8E] leading-relaxed">
            {isRtl
              ? "المسودات في هذه القائمة لن تنشر أبداً بدون موافقتك. راجع مطابقة النص مع حقائق مشاريعك الحقيقية، واضغط اعتماد للنشر أو اطلب تعديلاً بنقرة واحدة."
              : "Drafts waiting in this queue require your sign-off before entering the publication schedule. Check the factual accuracy, adjust tone if necessary, and approve for multi-platform delivery."}
          </p>
        </div>
      </div>

      {/* Queue Items */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5E6C8E]">
            {isRtl ? `بانتظار المراجعة والاعتماد (${pendingPosts.length})` : `Pending Human Review (${pendingPosts.length})`}
          </span>
        </div>

        {pendingPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
            <div className="h-12 w-12 rounded-full bg-[#E8F2EC] text-[#1E4E30] flex items-center justify-center mx-auto border border-[#A7C8B4]">
              <CheckSquare className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#2B3451]">
                {isRtl ? "القائمة فارغة تماماً!" : "Queue is clear!"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "تمت مراجعة واعتماد جميع المنشورات المسودة. توجه إلى مختبر الأفكار لصياغة محتوى جديد."
                  : "All drafted posts have been approved or scheduled. Visit the AI Idea Lab to draft new content."}
              </p>
            </div>
            <Link
              href="/dashboard/ideas"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{isRtl ? "الانتقال لمختبر الأفكار" : "Go to AI Idea Lab"}</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingPosts.map((post) => (
              <ReviewCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
