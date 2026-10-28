"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createProject } from "@/actions/project-actions"
import { ProjectInput } from "@/lib/validations/project"
import {
  FolderPlus,
  ArrowLeft,
  ArrowRight,
  Save,
  AlertCircle,
  TrendingUp,
  Cpu,
  AlertTriangle,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function NewProjectPage() {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    projectContext: isRtl ? "منصة تجارة إلكترونية لعميل" : "Client E-Commerce Platform",
    problemStatement: "",
    solutionArchitecture: "",
    techStack: "Next.js 16, TypeScript, PostgreSQL, Tailwind CSS",
    businessImpact: "",
    keyMetrics: "99.4% Delivery Success Rate, 70% Faster Load Time",
    constraintsFaced: "",
    lessonsLearned: "",
    projectUrl: "",
    repositoryUrl: "",
    isFeatured: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const payload: ProjectInput = {
      title: formData.title,
      projectContext: formData.projectContext,
      problemStatement: formData.problemStatement,
      solutionArchitecture: formData.solutionArchitecture,
      techStack: formData.techStack.split(",").map((t) => t.trim()).filter(Boolean),
      businessImpact: formData.businessImpact,
      keyMetrics: formData.keyMetrics.split(",").map((m) => m.trim()).filter(Boolean),
      constraintsFaced: formData.constraintsFaced,
      lessonsLearned: formData.lessonsLearned,
      projectUrl: formData.projectUrl || undefined,
      repositoryUrl: formData.repositoryUrl || undefined,
      isFeatured: formData.isFeatured,
    }

    const res = await createProject(payload)
    setSaving(false)

    if (res.success) {
      router.push("/dashboard/projects")
      router.refresh()
    } else {
      setError(res.error || (isRtl ? "فشل إنشاء المشروع" : "Failed to create project"))
    }
  }

  const BackArrow = isRtl ? ArrowRight : ArrowLeft

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[#D2E5F0]">
        <div className="space-y-1">
          <Link
            href="/dashboard/projects"
            className="text-xs font-bold text-[#0A4D68] hover:text-[#07384C] inline-flex items-center gap-1 mb-1 transition-colors"
          >
            <BackArrow className="h-3.5 w-3.5" />
            <span>{isRtl ? "العودة لقاعدة المعرفة" : "Back to Knowledge Base"}</span>
          </Link>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {isRtl ? "توثيق دراسة حالة هندسية جديدة" : "Document Technical Case Study"}
          </h1>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "املأ تفاصيل دراسة الحالة أدناه. سيستخدم محرك الذكاء الاصطناعي هذه الحقائق لصياغة منشورات ذات مصداقية عالية."
              : "Fill in the case facts below. The AI Marketing Engine will use these factual building blocks for multi-platform posts."}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-3 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Overview */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A4D68] flex items-center gap-2">
            <FolderPlus className="h-4 w-4" />
            <span>{isRtl ? "1. سياق ونظرة عامة على المشروع" : "1. Overview & Context"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "عنوان المشروع *" : "Project Title *"}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={isRtl ? "مثال: معمارية بوابة إرسال SMS مرنة ومتعددة المزوّدين" : "e.g. Resilient Multi-Carrier SMS Gateway Architecture"}
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "سياق المشروع *" : "Project Context *"}
              </label>
              <input
                type="text"
                value={formData.projectContext}
                onChange={(e) => setFormData({ ...formData, projectContext: e.target.value })}
                placeholder={isRtl ? "مثال: مشروع عميل، تطبيق SaaS، عمل دوام كامل" : "e.g. Client E-Commerce Platform, SaaS App, Full-Time Role"}
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "التقنيات المستخدمة (مفصولة بفواصل) *" : "Tech Stack (comma-separated) *"}
              </label>
              <input
                type="text"
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                placeholder="Next.js 16, TypeScript, PostgreSQL, Redis, Docker"
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "رابط المشروع الحي أو المستودع (اختياري)" : "Live URL or Repository (Optional)"}
              </label>
              <input
                type="url"
                value={formData.projectUrl}
                onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Problem & Architecture */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A4D68] flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>{isRtl ? "2. المشكلة التقنية والمعمارية المنفذة" : "2. Technical Problem & Solution Architecture"}</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
              {isRtl ? "المشكلة والتحدي الهندسي *" : "Problem Statement & Bottleneck *"}
            </label>
            <textarea
              rows={3}
              value={formData.problemStatement}
              onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
              placeholder={
                isRtl
                  ? "ما هو العطل أو التحدي الذي حدث؟ (مثال: مزودو الرسائل القصيرة العالميون فشلوا في إيصال رموز التحقق لشبكات الموبايل المحلية مما أدى لهبوط المبيعات بنسبة 42%)."
                  : "What business or architectural breakdown occurred? (e.g. Existing SMS providers failed to deliver OTP messages to Iraqi mobile networks, causing 42% cart abandonment)."
              }
              className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68] leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
              {isRtl ? "الحل والمعمارية البرمجية المنفذة *" : "Solution & Architecture *"}
            </label>
            <textarea
              rows={3}
              value={formData.solutionArchitecture}
              onChange={(e) => setFormData({ ...formData, solutionArchitecture: e.target.value })}
              placeholder={
                isRtl
                  ? "كيف قمت بحل المشكلة تقنياً؟ (مثال: بناء محرك توجيه ذكي مع Fallback عبر مزودين محليين، مدعوم بقوائم انتظار Redis وWebhooks لإعادة المحاولة الفورية)."
                  : "How did you solve it technically? (e.g. Designed an intelligent multi-carrier fallback routing engine in Node.js with PostgreSQL and Redis, direct telecom aggregator webhooks, and retry queues)."
              }
              className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68] leading-relaxed"
              required
            />
          </div>
        </div>

        {/* Section 3: Business Impact & Outcomes (Sage Green Accent) */}
        <div className="bg-[#F0F6F2] border border-[#A7C8B4] rounded-2xl p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#1E4E30] flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{isRtl ? "3. الأثر الملموس على الأعمال والنتائج الموثقة" : "3. Measurable Business Impact & Metrics"}</span>
          </h2>

          <div>
            <label className="block text-xs font-bold text-[#1E4E30] mb-1">
              {isRtl ? "ملخص الأثر على الأعمال *" : "Business Impact Summary *"}
            </label>
            <textarea
              rows={2}
              value={formData.businessImpact}
              onChange={(e) => setFormData({ ...formData, businessImpact: e.target.value })}
              placeholder={
                isRtl
                  ? "نتائج بالأرقام (مثال: رفع نسبة نجاح إيصال رسائل التحقق من 58% إلى 99.4%، وتقليل مغادرة السلة بنسبة 28% مع توفير 14,000 دولار شهرياً)."
                  : "Quantified business results (e.g. Increased OTP delivery success rate from 58% to 99.4%, reducing user checkout drop-offs by 28% and saving $14,000/mo)."
              }
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#A7C8B4] text-xs text-[#1E4E30] font-medium focus:outline-none leading-relaxed"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1E4E30] mb-1">
              {isRtl ? "الأرقام والنسب المفتاحية (مفصولة بفواصل)" : "Key Metrics (comma-separated chips)"}
            </label>
            <input
              type="text"
              value={formData.keyMetrics}
              onChange={(e) => setFormData({ ...formData, keyMetrics: e.target.value })}
              placeholder="99.4% Delivery SLA, 2.1s avg latency, Zero dropped OTPs"
              className="w-full px-3 py-2 rounded-lg bg-white border border-[#A7C8B4] text-xs text-[#1E4E30] font-mono font-bold focus:outline-none"
            />
          </div>
        </div>

        {/* Section 4: Constraints & Lessons Learned */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-4 shadow-2xs">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#0A4D68] flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span>{isRtl ? "4. القيود والتحديات والدروس المعمارية المستفادة" : "4. Constraints Faced & Lessons Learned"}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "القيود التي واجهتها *" : "Constraints Faced *"}
              </label>
              <textarea
                rows={3}
                value={formData.constraintsFaced}
                onChange={(e) => setFormData({ ...formData, constraintsFaced: e.target.value })}
                placeholder={
                  isRtl
                    ? "واجهات API غير موثقة، قوانين تنظيمية محلية صارمة، وعدم استقرار الشبكات في ساعات الذروة."
                    : "Undocumented regional APIs, strict national regulations, network instability during peak events."
                }
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "الدروس المستفادة هندسياً *" : "Key Lessons Learned *"}
              </label>
              <textarea
                rows={3}
                value={formData.lessonsLearned}
                onChange={(e) => setFormData({ ...formData, lessonsLearned: e.target.value })}
                placeholder={
                  isRtl
                    ? "عدم الاعتماد أبداً على مزود دولي واحد في الأسواق الإقليمية النامية؛ وبناء قواطع دارات (Circuit Breakers) للمسارات الحرجة."
                    : "Never rely on a single international provider for emerging regional markets; build circuit breakers into critical paths."
                }
                className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                required
              />
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="isFeatured"
              checked={formData.isFeatured}
              onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
              className="h-4 w-4 rounded accent-[#0A4D68] cursor-pointer"
            />
            <label htmlFor="isFeatured" className="text-xs font-bold text-[#2B3451] cursor-pointer">
              {isRtl ? "تمييز كدراسة حالة رئيسية (تظهر في الواجهة الأولى)" : "Mark as Featured Case Study (promoted on Dashboard overview)"}
            </label>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            href="/dashboard/projects"
            className="px-4 py-2 rounded-lg text-xs font-bold text-[#5E6C8E] hover:text-[#2B3451] transition-colors"
          >
            {isRtl ? "إلغاء" : "Cancel"}
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>
              {saving
                ? isRtl ? "جارٍ الحفظ في قاعدة المعرفة..." : "Saving to Knowledge Base..."
                : isRtl ? "حفظ دراسة الحالة" : "Save Case Study"}
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
