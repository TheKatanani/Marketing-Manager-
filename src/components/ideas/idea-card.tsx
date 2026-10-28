"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateAndSaveDrafts } from "@/actions/content-actions"
import { Sparkles, PenTool, ArrowRight, ArrowLeft, Target, Briefcase, CheckCircle2, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface IdeaCardProps {
  idea: {
    id: string
    title: string
    hook: string
    targetAudience: string
    contentPillar: string
    status: string
    sourceNotes?: string | null
    project?: { id: string; title: string; slug: string } | null
    posts?: { id: string; status: string }[]
  }
}

export function IdeaCard({ idea }: IdeaCardProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [drafting, setDrafting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreateDrafts = async () => {
    setDrafting(true)
    setError(null)

    const res = await generateAndSaveDrafts(idea.id)
    setDrafting(false)

    if (res.success && res.postId) {
      router.push(`/dashboard/content/${res.postId}`)
      router.refresh()
    } else {
      setError(res.error || (isRtl ? "فشل إنشاء المسودات" : "Failed to generate drafts"))
    }
  }

  const existingPost = idea.posts && idea.posts.length > 0 ? idea.posts[0] : null
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group space-y-4">
      <div className="space-y-3">
        {/* Header row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EFEAF7] text-[#3C2F5E] border border-[#B9AED8]">
            {idea.contentPillar}
          </span>

          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${
              idea.status === "APPROVED"
                ? "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                : idea.status === "DRAFT"
                ? "bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]"
                : "bg-slate-100 text-slate-600 border border-slate-200"
            }`}
          >
            {idea.status === "APPROVED" ? (isRtl ? "معتمد" : "APPROVED") : idea.status === "DRAFT" ? (isRtl ? "مسودة فكرة" : "DRAFT") : idea.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors leading-snug">
          {idea.title}
        </h3>

        {/* Hook */}
        <div className="p-3 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] italic leading-relaxed">
          &ldquo;{idea.hook}&rdquo;
        </div>

        {/* Metadata */}
        <div className="space-y-1.5 text-xs pt-1">
          <div className="text-[#5E6C8E] flex items-center gap-1.5">
            <Target className="h-3.5 w-3.5 text-[#0A4D68] shrink-0" />
            <span className="font-semibold">{isRtl ? "الجمهور المستهدف:" : "Target:"}</span>
            <span className="text-[#2B3451] font-medium">{idea.targetAudience}</span>
          </div>

          {idea.project && (
            <div className="text-[#5E6C8E] flex items-center gap-1.5 text-[11px]">
              <Briefcase className="h-3.5 w-3.5 text-[#0A4D68] shrink-0" />
              <span className="font-semibold">{isRtl ? "المشروع المصدر:" : "Source:"}</span>
              <span className="text-[#0A4D68] font-bold truncate">
                {idea.project.title}
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="p-2 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Footer action */}
      <div className="pt-3 border-t border-[#D2E5F0] flex items-center justify-between">
        <span className="text-[11px] text-[#5E6C8E] font-medium">
          LinkedIn • Instagram • X
        </span>

        {existingPost ? (
          <button
            onClick={() => router.push(`/dashboard/content/${existingPost.id}`)}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-white hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer shadow-2xs"
          >
            <PenTool className="h-3.5 w-3.5 text-[#0A4D68]" />
            <span>{isRtl ? "عرض المسودات" : "View Drafts"}</span>
            <ArrowIcon className="h-3 w-3" />
          </button>
        ) : (
          <button
            onClick={handleCreateDrafts}
            disabled={drafting}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>
              {drafting
                ? isRtl ? "جارٍ صياغة 3 منصات..." : "Drafting 3 Platforms..."
                : isRtl ? "صياغة منشورات المنصات" : "Draft 3 Posts"}
            </span>
          </button>
        )}
      </div>
    </div>
  )
}
