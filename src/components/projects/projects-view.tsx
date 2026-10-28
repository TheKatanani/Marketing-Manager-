"use client"

import Link from "next/link"
import { ProjectCard } from "@/components/projects/project-card"
import { Briefcase, FolderPlus, ShieldCheck, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface ProjectsViewProps {
  projects: any[]
}

export function ProjectsView({ projects }: ProjectsViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <Briefcase className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة ب: قاعدة المعرفة الهندسية وحقائق المشاريع" : "Module B: Project & Achievement Knowledge Base"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.projectsTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.projectsSub}
          </p>
        </div>

        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 shrink-0 self-start md:self-auto cursor-pointer"
        >
          <FolderPlus className="h-4 w-4" />
          <span>{isRtl ? "+ توثيق دراسة حالة جديدة" : "+ Document New Project"}</span>
        </Link>
      </div>

      {/* Trust & Anti-Hallucination Callout */}
      <div className="p-4 rounded-xl bg-white border border-[#D2E5F0] flex items-start gap-3 shadow-2xs">
        <ShieldCheck className="h-5 w-5 text-[#0A4D68] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-xs font-bold text-[#0A4D68]">
            {isRtl ? "درع منع الهلوسة والفبركة (Zero Hallucination)" : "Anti-Hallucination Architecture"}
          </div>
          <p className="text-xs text-[#5E6C8E] leading-relaxed">
            {isRtl
              ? "الخطر الأكبر في مولدات الذكاء الاصطناعي التقليدية هو اختراع أرقام وهمية أو عبارات تسويقية فارغة. في BrandPilot، يعتمد كل منشور حصرياً على البيانات الهندسية الموثقة أدناه."
              : "The biggest risk with generic AI generators is inventing fake client stats or unrealistic claims. BrandPilot AI strictly anchors every generated post on verified engineering case studies stored below."}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5E6C8E]">
            {isRtl ? `دراسات الحالة الموثقة (${projects.length})` : `Documented Case Studies (${projects.length})`}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
            <div className="h-12 w-12 rounded-full bg-[#EBF4F9] text-[#0A4D68] flex items-center justify-center mx-auto">
              <Briefcase className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#2B3451]">
                {isRtl ? "لم يتم توثيق أي مشروع بعد" : "No projects documented yet"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "وثّق مشروعاً حقيقياً أو دراسة حالة لتغذية محتواك التسويقي بحقائق وأرقام مؤكدة."
                  : "Document a client project, side venture, or full-time achievement to start generating fact-backed marketing posts."}
              </p>
            </div>
            <Link
              href="/dashboard/projects/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all cursor-pointer"
            >
              <FolderPlus className="h-3.5 w-3.5" />
              <span>{isRtl ? "توثيق أول مشروع" : "Document Project"}</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
