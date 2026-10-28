"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Sparkles,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star,
  Trash2,
} from "lucide-react"
import { deleteProject } from "@/actions/project-actions"
import { generateAndSaveIdeas } from "@/actions/content-actions"
import { useLanguage } from "@/lib/i18n"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    slug: string
    projectContext: string
    problemStatement: string
    solutionArchitecture: string
    techStack: string[]
    businessImpact: string
    keyMetrics: string[]
    constraintsFaced: string
    lessonsLearned: string
    projectUrl?: string | null
    repositoryUrl?: string | null
    isFeatured: boolean
    ideas?: { id: string; title: string; status: string }[]
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [successMsg, setSuccessMsg] = useState(false)

  const handleDelete = async () => {
    const confirmMsg = isRtl
      ? `هل أنت متأكد من حذف مشروع "${project.title}" من قاعدة المعرفة؟`
      : `Are you sure you want to delete "${project.title}" from your knowledge base?`
    if (!confirm(confirmMsg)) {
      return
    }
    setIsDeleting(true)
    await deleteProject(project.id)
    setIsDeleting(false)
  }

  const handleGenerateIdeas = async () => {
    setGenerating(true)
    const res = await generateAndSaveIdeas(project.id)
    setGenerating(false)

    if (res.success) {
      setSuccessMsg(true)
      setTimeout(() => {
        router.push("/dashboard/ideas")
        router.refresh()
      }, 700)
    }
  }

  return (
    <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
                {project.projectContext}
              </span>
              {project.isFeatured && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]">
                  <Star className="h-3 w-3 fill-[#1E4E30] text-[#1E4E30]" />
                  {isRtl ? "قصة إنجاز رئيسية" : "Featured Story"}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-[#2B3451] group-hover:text-[#0A4D68] transition-colors">
              {project.title}
            </h3>
          </div>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            title={isRtl ? "حذف المشروع" : "Delete project"}
            className="text-[#5E6C8E] hover:text-rose-600 p-1.5 rounded hover:bg-rose-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Problem Statement */}
        <div className="mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#5E6C8E] mb-1 flex items-center gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span>{isRtl ? "المشكلة والتحدي" : "Problem & Bottleneck"}</span>
          </div>
          <p className="text-xs text-[#2B3451]/90 leading-relaxed line-clamp-2">
            {project.problemStatement}
          </p>
        </div>

        {/* Solution Architecture */}
        <div className="mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#5E6C8E] mb-1 flex items-center gap-1.5">
            <Cpu className="h-3.5 w-3.5 text-[#0A4D68]" />
            <span>{isRtl ? "الحل والمعمارية البرمجية" : "Architecture & Solution"}</span>
          </div>
          <p className="text-xs text-[#2B3451]/90 leading-relaxed line-clamp-2">
            {project.solutionArchitecture}
          </p>
        </div>

        {/* Business Impact Box (Sage Green Accent) */}
        <div className="mb-4 p-3 rounded-lg bg-[#F0F6F2] border border-[#A7C8B4]">
          <div className="text-[11px] font-bold text-[#1E4E30] uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-[#1E4E30]" />
            <span>{isRtl ? "الأثر الملموس على الأعمال" : "Measurable Business Impact"}</span>
          </div>
          <p className="text-xs text-[#1E4E30] font-medium leading-relaxed">
            {project.businessImpact}
          </p>

          {/* Key Metric Chips */}
          {project.keyMetrics && project.keyMetrics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-[#A7C8B4]/40">
              {project.keyMetrics.map((metric, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white text-[#1E4E30] font-mono font-semibold border border-[#A7C8B4]"
                >
                  <CheckCircle className="h-3 w-3 text-[#1E4E30]" />
                  {metric}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#F5F9FC] text-[#2B3451] border border-[#D2E5F0]"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Collapsible Details: Constraints & Lessons Learned */}
        {expanded && (
          <div className="space-y-3 pt-3 border-t border-[#D2E5F0] text-xs animate-in fade-in duration-200">
            <div>
              <span className="font-bold text-[#2B3451] block mb-1">
                {isRtl ? "القيود والتحديات التقنية التي واجهتها:" : "Engineering Constraints Faced:"}
              </span>
              <p className="text-[#5E6C8E] leading-relaxed">{project.constraintsFaced}</p>
            </div>
            <div>
              <span className="font-bold text-[#2B3451] block mb-1">
                {isRtl ? "الدروس المستفادة معمارياً وهندسياً:" : "Key Architectural Lessons Learned:"}
              </span>
              <p className="text-[#5E6C8E] leading-relaxed">{project.lessonsLearned}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="pt-3 border-t border-[#D2E5F0] flex items-center justify-between gap-2 mt-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-[#5E6C8E] hover:text-[#0A4D68] inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          {expanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>{isRtl ? "إخفاء التفاصيل" : "Less details"}</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>{isRtl ? "كامل تفاصيل الحالة" : "Full case facts"}</span>
            </>
          )}
        </button>

        <button
          onClick={handleGenerateIdeas}
          disabled={generating || successMsg}
          className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-2xs disabled:opacity-50 cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>
            {generating
              ? isRtl ? "جارٍ استخراج الزوايا..." : "Generating..."
              : successMsg
              ? isRtl ? "جارٍ التحويل لمختبر الأفكار..." : "Redirecting to Idea Lab..."
              : isRtl ? "استخراج زوايا المحتوى" : "Extract Content Angles"}
          </span>
        </button>
      </div>
    </div>
  )
}
