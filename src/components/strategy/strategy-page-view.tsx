"use client"

import { StrategySummaryCard } from "@/components/strategy/strategy-summary-card"
import { BrandProfileForm } from "@/components/strategy/brand-profile-form"
import { Compass, ShieldCheck, Sparkles, Layers } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface StrategyPageViewProps {
  profile: any
}

export function StrategyPageView({ profile }: StrategyPageViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <Compass className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة أ: مركز الهوية والاستراتيجية التسويقية" : "Module A: Brand & Strategy Center"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.brandCenterTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.brandCenterSub}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#D2E5F0] text-xs font-bold text-[#0A4D68] shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-[#0A4D68]" />
          <span>{isRtl ? "حماية الهوية: مفعّلة" : "Strict Brand Guard: Enabled"}</span>
        </div>
      </div>

      {/* Main Strategy Overview Card */}
      {profile ? (
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#5E6C8E] mb-3 flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#0A4D68]" />
              <span>{isRtl ? "المخطط الاستراتيجي الفعّال" : "Active Strategic Blueprint"}</span>
            </h2>
            <StrategySummaryCard profile={profile} />
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#5E6C8E] mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#0A4D68]" />
              <span>{isRtl ? "تعديل المعايير والاستراتيجية" : "Edit Strategy & Guidelines"}</span>
            </h2>
            <BrandProfileForm initialData={profile} />
          </div>
        </div>
      ) : (
        <div className="p-8 rounded-xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
          <div className="text-sm font-bold text-[#2B3451]">
            {isRtl ? "لم يتم إعداد ملف الهوية بعد" : "No Brand Profile configured yet"}
          </div>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "قم بإعداد هويتك وركائز محتواك بالأسفل لبدء تشغيل وكلاء الذكاء الاصطناعي."
              : "Set up your brand identity and pillars below to initialize your AI marketing team."}
          </p>
          <BrandProfileForm initialData={null} />
        </div>
      )}
    </div>
  )
}
