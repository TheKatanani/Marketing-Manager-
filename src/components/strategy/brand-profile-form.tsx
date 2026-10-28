"use client"

import { useState } from "react"
import { updateBrandProfile } from "@/actions/brand-actions"
import { BrandProfileInput } from "@/lib/validations/brand"
import { Save, Check, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface BrandProfileFormProps {
  initialData?: {
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
  } | null
}

export function BrandProfileForm({ initialData }: BrandProfileFormProps) {
  const { isRtl } = useLanguage()
  const [formData, setFormData] = useState({
    professionalTitle: initialData?.professionalTitle || "",
    bioSummary: initialData?.bioSummary || "",
    primaryGoal: (initialData?.primaryGoal as "CAREER" | "FREELANCE" | "BRAND" | "CAREER_AND_FREELANCE") || "CAREER_AND_FREELANCE",
    coreSkills: initialData?.coreSkills?.join(", ") || "",
    targetRoles: initialData?.targetRoles?.join(", ") || "",
    freelanceServices: initialData?.freelanceServices?.join(", ") || "",
    toneOfVoice: initialData?.toneOfVoice || "",
    targetAudienceSummary: initialData?.targetAudienceSummary || "",
    contentPillars: initialData?.contentPillars?.join(", ") || "",
    languages: initialData?.languages?.join(", ") || "English, Arabic",
    portfolioUrl: initialData?.portfolioUrl || "",
    githubUrl: initialData?.githubUrl || "",
    linkedinUrl: initialData?.linkedinUrl || "",
    twitterUrl: initialData?.twitterUrl || "",
  })

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const payload: BrandProfileInput = {
      professionalTitle: formData.professionalTitle,
      bioSummary: formData.bioSummary,
      primaryGoal: formData.primaryGoal,
      coreSkills: formData.coreSkills.split(",").map((s) => s.trim()).filter(Boolean),
      targetRoles: formData.targetRoles.split(",").map((s) => s.trim()).filter(Boolean),
      freelanceServices: formData.freelanceServices.split(",").map((s) => s.trim()).filter(Boolean),
      toneOfVoice: formData.toneOfVoice,
      targetAudienceSummary: formData.targetAudienceSummary,
      contentPillars: formData.contentPillars.split(",").map((s) => s.trim()).filter(Boolean),
      languages: formData.languages.split(",").map((s) => s.trim()).filter(Boolean),
      portfolioUrl: formData.portfolioUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      linkedinUrl: formData.linkedinUrl || undefined,
      twitterUrl: formData.twitterUrl || undefined,
    }

    const res = await updateBrandProfile(payload)
    setSaving(false)

    if (res.success) {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError(res.error || (isRtl ? "فشل حفظ الاستراتيجية" : "Failed to update profile"))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#D2E5F0] rounded-xl p-6 shadow-2xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#D2E5F0]">
        <div>
          <h3 className="text-base font-bold text-[#2B3451]">
            {isRtl ? "تعديل هوية البراند والتموضع السوقي" : "Edit Brand Identity & Market Positioning"}
          </h3>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "هذه المعايير توجه وكلاء الذكاء الاصطناعي لضمان المصداقية وصياغة محتوى يحقق أهدافك."
              : "These parameters guide your AI agents to preserve authenticity and target your desired outcomes."}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <span>{isRtl ? "جارٍ الحفظ..." : "Saving changes..."}</span>
          ) : success ? (
            <>
              <Check className="h-3.5 w-3.5 text-white" />
              <span>{isRtl ? "تم الحفظ!" : "Saved!"}</span>
            </>
          ) : (
            <>
              <Save className="h-3.5 w-3.5" />
              <span>{isRtl ? "حفظ الاستراتيجية" : "Save Strategy"}</span>
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Basic Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "المسمى المهني الرئيسي" : "Professional Title"}
          </label>
          <input
            type="text"
            value={formData.professionalTitle}
            onChange={(e) => setFormData({ ...formData, professionalTitle: e.target.value })}
            placeholder={isRtl ? "مثال: كبير مهندسي النظم وتطبيقات Next.js" : "e.g. Senior Full-Stack & Next.js Systems Architect"}
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "الهدف التسويقي الأهم" : "Primary Objective"}
          </label>
          <select
            value={formData.primaryGoal}
            onChange={(e) =>
              setFormData({
                ...formData,
                primaryGoal: e.target.value as "CAREER" | "FREELANCE" | "BRAND" | "CAREER_AND_FREELANCE",
              })
            }
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          >
            <option value="CAREER_AND_FREELANCE">{isRtl ? "الأولوية 1 و 2: وظيفة ريموت + مشاريع فريلانس" : "Priority 1 & 2: Remote Job + Freelance Opportunities"}</option>
            <option value="CAREER">{isRtl ? "الأولوية 1: وظيفة ريموت (مسؤولو التوظيف والمدراء التقنيون)" : "Priority 1: Remote Job (Recruiters & Engineering Managers)"}</option>
            <option value="FREELANCE">{isRtl ? "الأولوية 2: مشاريع فريلانس (أصحاب الأعمال والشركات)" : "Priority 2: Freelance Projects (Small Businesses & Founders)"}</option>
            <option value="BRAND">{isRtl ? "الأولوية 3: سلطة البراند الشخصي (مجتمع المطورين)" : "Priority 3: Authority & Personal Brand (Dev Community)"}</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
          {isRtl ? "النبذة المهنية التعريفية (Elevator Pitch)" : "Professional Bio & Elevator Pitch"}
        </label>
        <textarea
          rows={3}
          value={formData.bioSummary}
          onChange={(e) => setFormData({ ...formData, bioSummary: e.target.value })}
          placeholder={
            isRtl
              ? "ملخص مركز لخبرتك البرمجية، فلسفتك في حل المشاكل، والقيمة المضافة التي تقدمها للأعمال."
              : "Brief summary of your professional experience, technical philosophy, and value proposition."
          }
          className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68] leading-relaxed"
          required
        />
      </div>

      {/* Skills & Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "المهارات التقنية الأساسية (مفصولة بفواصل)" : "Core Verified Skills (comma-separated)"}
          </label>
          <input
            type="text"
            value={formData.coreSkills}
            onChange={(e) => setFormData({ ...formData, coreSkills: e.target.value })}
            placeholder="Next.js 16, React 19, TypeScript, PostgreSQL, Tailwind CSS"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "المسميات الوظيفية المستهدفة (مفصولة بفواصل)" : "Target Career Roles (comma-separated)"}
          </label>
          <input
            type="text"
            value={formData.targetRoles}
            onChange={(e) => setFormData({ ...formData, targetRoles: e.target.value })}
            placeholder="Senior Full-Stack Engineer, Staff Frontend Engineer"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>
      </div>

      {/* Audience, Tone & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "تفصيل الجمهور المستهدف" : "Target Audience Breakdown"}
          </label>
          <textarea
            rows={3}
            value={formData.targetAudienceSummary}
            onChange={(e) => setFormData({ ...formData, targetAudienceSummary: e.target.value })}
            placeholder={
              isRtl
                ? "مثال: مدراء التوظيف والمدراء التقنيون الذين يبحثون عن مهندسين يحلون المشاكل المعقدة؛ وأصحاب المتاجر الإلكترونية الراغبين بتطبيقات متخصصة."
                : "e.g. Recruiters & Engineering Managers hiring remote React/Next.js engineers; e-commerce founders seeking custom apps."
            }
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "توجيهات نبرة الصوت والأسلوب" : "Tone of Voice Directives"}
          </label>
          <textarea
            rows={3}
            value={formData.toneOfVoice}
            onChange={(e) => setFormData({ ...formData, toneOfVoice: e.target.value })}
            placeholder={
              isRtl
                ? "مثال: عملي، ذو سلطة تقنية، بعيد عن المصطلحات التسويقية الفارغة، يركز على العائد الاستثماري للأعمال (Business ROI)."
                : "e.g. Pragmatic, authoritative, technical problem solver. Zero corporate buzzwords. Emphasizes business ROI."
            }
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "ركائز المحتوى المعتمدة (مفصولة بفواصل)" : "Approved Content Pillars (comma-separated)"}
          </label>
          <input
            type="text"
            value={formData.contentPillars}
            onChange={(e) => setFormData({ ...formData, contentPillars: e.target.value })}
            placeholder="Full-Stack Architecture, Real-World Regional Constraints, E-Commerce Engineering"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            {isRtl ? "خدمات الفريلانس والاستشارات (مفصولة بفواصل)" : "Freelance & Consulting Services (comma-separated)"}
          </label>
          <input
            type="text"
            value={formData.freelanceServices}
            onChange={(e) => setFormData({ ...formData, freelanceServices: e.target.value })}
            placeholder="Custom Web Apps, Shopify Integration, Next.js Migrations"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>
      </div>

      {/* Social / Portfolio Links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#D2E5F0]">
        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            placeholder="https://github.com/your-username"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
            placeholder="https://linkedin.com/in/your-profile"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
            X (Twitter) URL
          </label>
          <input
            type="url"
            value={formData.twitterUrl}
            onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
            placeholder="https://x.com/your-handle"
            className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>
      </div>
    </form>
  )
}
