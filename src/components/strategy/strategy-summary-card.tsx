"use client"

import {
  Target,
  Briefcase,
  Layers,
  Sparkles,
  Compass,
  MessageSquare,
  Globe,
  ExternalLink,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface StrategySummaryCardProps {
  profile: {
    professionalTitle: string
    bioSummary: string
    primaryGoal: string
    coreSkills: string[]
    targetRoles: string[]
    freelanceServices: string[]
    toneOfVoice: string
    targetAudienceSummary: string
    contentPillars: string[]
    languages: string[]
    portfolioUrl?: string | null
    githubUrl?: string | null
    linkedinUrl?: string | null
    twitterUrl?: string | null
  }
}

export function StrategySummaryCard({ profile }: StrategySummaryCardProps) {
  const { isRtl } = useLanguage()

  const goalLabels: Record<string, string> = {
    CAREER: isRtl ? "الأولوية 1: وظيفة ريموت (Remote Job)" : "Priority 1: Remote Engineering Job",
    FREELANCE: isRtl ? "الأولوية 2: عقود ومشاريع فريلانس" : "Priority 2: Freelance & Client Contracts",
    BRAND: isRtl ? "الأولوية 3: بناء البراند الشخصي" : "Priority 3: Authority & Personal Brand",
    CAREER_AND_FREELANCE: isRtl ? "تركيز مزدوج: وظيفة ريموت + مشاريع فريلانس" : "Dual Focus: Remote Job + High-End Freelance",
  }

  return (
    <div className="bg-white border border-[#D2E5F0] rounded-xl p-6 shadow-2xs space-y-6">
      {/* Title & Goal Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
              {goalLabels[profile.primaryGoal] || profile.primaryGoal}
            </span>
            <span className="text-xs text-[#5E6C8E] font-medium">
              {isRtl ? "لغات النشر:" : "Languages:"} {profile.languages.join(", ")}
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#2B3451] tracking-tight">
            {profile.professionalTitle}
          </h2>
          <p className="text-xs text-[#5E6C8E] max-w-2xl leading-relaxed">
            {profile.bioSummary}
          </p>
        </div>

        {/* Social / Portfolio Links */}
        <div className="flex items-center gap-2 shrink-0">
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors"
              title="GitHub Profile"
            >
              <Globe className="h-4 w-4" />
            </a>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors"
              title="LinkedIn Profile"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>

      {/* Grid: 3 Pillars of Strategy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Column 1: Core Skills & Target Roles */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A4D68] mb-2">
              <Layers className="h-3.5 w-3.5" />
              <span>{isRtl ? "المهارات التقنية الموثقة" : "Core Skills Verified"}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {profile.coreSkills.map((skill) => (
                <span
                  key={skill}
                  className="text-xs font-medium px-2 py-0.5 rounded bg-[#F5F9FC] text-[#2B3451] border border-[#D2E5F0]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5E6C8E] mb-2">
              <Briefcase className="h-3.5 w-3.5 text-[#5E6C8E]" />
              <span>{isRtl ? "الأدوار الوظيفية المستهدفة" : "Target Career Roles"}</span>
            </div>
            <ul className="space-y-1">
              {profile.targetRoles.map((role) => (
                <li key={role} className="text-xs text-[#2B3451] flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#0A4D68]" />
                  {role}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 2: Audience & Tone */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E4E30] mb-2">
              <Target className="h-3.5 w-3.5" />
              <span>{isRtl ? "الجمهور المستهدف" : "Target Audiences"}</span>
            </div>
            <p className="text-xs text-[#2B3451] leading-relaxed bg-[#F5F9FC] p-3 rounded-lg border border-[#D2E5F0]">
              {profile.targetAudienceSummary}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0A4D68] mb-2">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>{isRtl ? "نبرة الصوت وأسلوب الخطاب" : "Tone of Voice Directives"}</span>
            </div>
            <p className="text-xs text-[#2B3451] leading-relaxed bg-[#F5F9FC] p-3 rounded-lg border border-[#D2E5F0]">
              {profile.toneOfVoice}
            </p>
          </div>
        </div>

        {/* Column 3: Content Pillars & Freelance Services */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3C2F5E] mb-2">
              <Compass className="h-3.5 w-3.5" />
              <span>{isRtl ? "ركائز المحتوى المعتمدة" : "Approved Content Pillars"}</span>
            </div>
            <div className="space-y-1.5">
              {profile.contentPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="text-xs p-2 rounded bg-[#EFEAF7] text-[#3C2F5E] border border-[#B9AED8] flex items-center gap-2 font-medium"
                >
                  <Sparkles className="h-3 w-3 text-[#B9AED8] shrink-0" />
                  <span>{pillar}</span>
                </div>
              ))}
            </div>
          </div>

          {profile.freelanceServices && profile.freelanceServices.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#5E6C8E] mb-2">
                <span>{isRtl ? "خدمات العمل الحر والعملاء" : "Client & Freelance Services"}</span>
              </div>
              <ul className="space-y-1">
                {profile.freelanceServices.map((svc) => (
                  <li key={svc} className="text-xs text-[#2B3451] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1E4E30]" />
                    {svc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
