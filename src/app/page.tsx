"use client"

import Link from "next/link"
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Globe,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function Home() {
  const { t, locale, toggleLocale, isRtl } = useLanguage()
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="min-h-screen bg-[#F5F9FC] text-[#2B3451] flex flex-col justify-between selection:bg-[#0A4D68] selection:text-white">
      {/* Navigation */}
      <header className="border-b border-[#D2E5F0] bg-white sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0A4D68] flex items-center justify-center shadow-md shadow-[#0A4D68]/20">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[#0A4D68] tracking-tight text-base">
                {t.appName}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#D2E5F0] text-[#0A4D68]">
                AI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLocale}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F9FC] hover:bg-[#D2E5F0] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{locale === "ar" ? "English" : "العربية"}</span>
            </button>

            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-xs font-bold text-[#5E6C8E] hover:text-[#2B3451] transition-colors"
            >
              {isRtl ? "تسجيل الدخول" : "Sign In"}
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20"
            >
              <span>{isRtl ? "فتح لوحة القيادة" : "Launch Dashboard"}</span>
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 space-y-10 text-center">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold">
            <Sparkles className="h-3.5 w-3.5 text-[#0A4D68]" />
            <span>{isRtl ? "مصمم لمهندسي البرمجيات والرياديين التقنيين" : "Built for Senior Developers & Technical Founders"}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#2B3451] leading-tight">
            {isRtl ? "فريقك التسويقي الذكي المتكامل" : "Your Personal AI"}{" "}
            <span className="text-[#0A4D68] underline decoration-[#D2E5F0] decoration-wavy">
              {isRtl ? "لإبراز خبراتك التقنية" : "Marketing Department"}
            </span>
          </h1>

          <p className="text-sm md:text-base text-[#5E6C8E] leading-relaxed max-w-2xl mx-auto">
            {isRtl
              ? "تحويل إنجازاتك وخبراتك الهندسية الحقيقية إلى محتوى احترافي عالي التأثير على LinkedIn و Instagram و X لجذب وظائف ريموت مميزة ومشاريع فريلانس عالية القيمة. بدون أي فبركة، وأنت المتحكم بكل قرار."
              : "Turn real-world software engineering achievements and complex problem-solving into platform-ready content for LinkedIn, Instagram, and X. Zero fake metrics, zero generic fluff. You stay in full control."}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-sm font-bold transition-all shadow-md shadow-[#0A4D68]/25"
          >
            <span>{isRtl ? "دخول غرفة القيادة التسويقية" : "Open Command Center"}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>

          <Link
            href="/dashboard/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#EBF4F9] text-[#0A4D68] text-sm font-bold border border-[#D2E5F0] transition-colors shadow-2xs"
          >
            <Layers className="h-4 w-4" />
            <span>{isRtl ? "استكشاف دراسات الحالة" : "Explore Knowledge Base"}</span>
          </Link>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-right md:text-right">
          <div className="p-6 rounded-2xl bg-white border border-[#D2E5F0] space-y-3 shadow-2xs hover:shadow-md transition-shadow text-center">
            <div className="p-2.5 rounded-xl bg-[#EBF4F9] text-[#0A4D68] w-fit mx-auto">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "قاعدة معرفة موثقة 100%" : "Verified Knowledge Base"}
            </h3>
            <p className="text-xs text-[#5E6C8E] leading-relaxed">
              {isRtl
                ? "كل فكرة وكل منشور يرتكز بدقة على مشاكل واقعية وأرقام فعلية من مشاريعك."
                : "Anchor all content on real technical architectures, constraints, and measurable metrics."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D2E5F0] space-y-3 shadow-2xs hover:shadow-md transition-shadow text-center">
            <div className="p-2.5 rounded-xl bg-[#E8F2EC] text-[#1E4E30] w-fit mx-auto">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "الاعتماد البشري الصارم" : "Human-in-the-Loop"}
            </h3>
            <p className="text-xs text-[#5E6C8E] leading-relaxed">
              {isRtl
                ? "أنت المدير التسويقي: لا ينشر أي محتوى دون مراجعتك الشخصية وموافقتك الصريحة."
                : "You are the Marketing Director. Review, adjust, and approve every post before publishing."}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#D2E5F0] space-y-3 shadow-2xs hover:shadow-md transition-shadow text-center">
            <div className="p-2.5 rounded-xl bg-[#EFEAF7] text-[#3C2F5E] w-fit mx-auto">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "عائد حقيقي وفرص عمل" : "Career & Revenue Attribution"}
            </h3>
            <p className="text-xs text-[#5E6C8E] leading-relaxed">
              {isRtl
                ? "قياس استفسارات التوظيف وعقود الفريلانس الناتجة عن محتواك بدلاً من أرقام الإعجاب الزائفة."
                : "Track genuine recruiter inquiries, interviews, and client deals attributed to your posts."}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#D2E5F0] py-6 bg-white text-center text-xs text-[#5E6C8E]">
        BrandPilot AI • {isRtl ? "إصدار محمد قطناني المخصص" : "The Katanani Edition"} • Built with Next.js 16, TypeScript, & Tailwind CSS
      </footer>
    </div>
  )
}
