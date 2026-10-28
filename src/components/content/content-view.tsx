"use client"

import Link from "next/link"
import {
  PenTool,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import { useLanguage } from "@/lib/i18n"

interface ContentViewProps {
  posts: any[]
}

export function ContentView({ posts }: ContentViewProps) {
  const { t, isRtl } = useLanguage()
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <PenTool className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة د: استوديو صناعة وتنسيق المحتوى" : "Module C: Content Studio"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.studioTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.studioSub}
          </p>
        </div>

        <Link
          href="/dashboard/ideas"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isRtl ? "+ صياغة مسودة من فكرة" : "+ Generate Draft from Idea"}</span>
        </Link>
      </div>

      {/* Post Grid / List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5E6C8E]">
            {isRtl ? `مسودات المحتوى النشطة (${posts.length})` : `Active Content Drafts (${posts.length})`}
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
            <div className="h-12 w-12 rounded-full bg-[#EBF4F9] text-[#0A4D68] flex items-center justify-center mx-auto">
              <PenTool className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#2B3451]">
                {isRtl ? "لا توجد مسودات محتوى حالياً" : "No platform drafts created yet"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "توجه إلى مختبر الأفكار واختر خطافاً تسويقياً لصياغة حزمة المنشورات الأولى."
                  : "Go to the AI Idea Lab, choose an engineering hook, and click 'Draft 3 Posts' to generate your first multi-platform package."}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between group shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-[#5E6C8E]">
                      {post.idea?.contentPillar || "Full-Stack Engineering"}
                    </span>

                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold ${
                        post.status === "APPROVED"
                          ? "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                          : "bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]"
                      }`}
                    >
                      {post.status === "APPROVED" ? (isRtl ? "معتمد" : "APPROVED") : (isRtl ? "مسودة" : "DRAFT")}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors">
                    {post.title}
                  </h3>

                  {post.idea && (
                    <p className="text-xs text-[#5E6C8E] line-clamp-2 italic">
                      &ldquo;{post.idea.hook}&rdquo;
                    </p>
                  )}

                  {/* Platforms Generated */}
                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] text-[11px] font-bold">
                      <LinkedInIcon className="h-3 w-3" />
                      <span>{isRtl ? "دراسة حالة" : "Case Study"}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EFEAF7] text-[#3C2F5E] border border-[#B9AED8] text-[11px] font-bold">
                      <InstagramIcon className="h-3 w-3" />
                      <span>{isRtl ? "سلايدات كاروسيل" : "Carousel"}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#F5F9FC] text-[#2B3451] border border-[#D2E5F0] text-[11px] font-bold">
                      <XTwitterIcon className="h-3 w-3" />
                      <span>{isRtl ? "ثريد إكس" : "Thread"}</span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#D2E5F0] flex items-center justify-between">
                  <span className="text-[11px] text-[#5E6C8E] font-medium">
                    {post.versions.length} {isRtl ? "إصدارات للمنصات" : "Platform Versions"}
                  </span>

                  <Link
                    href={`/dashboard/content/${post.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-2xs cursor-pointer"
                  >
                    <span>{isRtl ? "فتح محرر الاستوديو" : "Open Studio Editor"}</span>
                    <ArrowIcon className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
