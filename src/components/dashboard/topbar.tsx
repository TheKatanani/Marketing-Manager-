"use client"

import Link from "next/link"
import { Sparkles, FolderPlus, CheckCircle2, Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface TopbarProps {
  title?: string
  subtitle?: string
}

export function DashboardTopbar({ title, subtitle }: TopbarProps) {
  const { t, locale, toggleLocale, isRtl } = useLanguage()

  return (
    <header className="h-16 px-6 border-b border-[#D2E5F0] bg-white sticky top-0 z-30 flex items-center justify-between shadow-xs">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col">
        {title ? (
          <>
            <h1 className="text-base font-bold text-[#2B3451] tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <span className="text-xs text-[#5E6C8E] font-normal">
                {subtitle}
              </span>
            )}
          </>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#5E6C8E]">
            <span className="font-semibold text-[#0A4D68]">{t.appName}</span>
            <span>/</span>
            <span className="text-[#2B3451] font-medium">{t.navOverview}</span>
          </div>
        )}
      </div>

      {/* Center Status Pill */}
      <div className="hidden lg:flex items-center gap-3">
        <a
          href="https://thekatanani.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF4F9] hover:bg-[#D2E5F0]/80 border border-[#D2E5F0] text-xs text-[#0A4D68] transition-colors"
        >
          <CheckCircle2 className="h-4 w-4 text-[#0A4D68]" />
          <span className="font-bold">{isRtl ? "مصدر الحقائق:" : "Ground Truth:"}</span>
          <span className="font-mono font-bold text-[#2B3451] text-[11px] underline">thekatanani.com</span>
          <span className="h-1 w-1 rounded-full bg-[#0A4D68]/40" />
          <span className="font-semibold text-[#1E4E30] text-[10px] bg-[#E8F2EC] px-2 py-0.5 rounded-full border border-[#A7C8B4]">
            {isRtl ? "بيانات حقيقية موثقة 100%" : "100% Real Facts"}
          </span>
        </a>
      </div>

      {/* Actions & Language Switcher */}
      <div className="flex items-center gap-3">
        {/* Language Switcher Pill */}
        <button
          onClick={toggleLocale}
          type="button"
          title={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F5F9FC] hover:bg-[#D2E5F0]/60 text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer shadow-2xs"
        >
          <Globe className="h-3.5 w-3.5 text-[#0A4D68]" />
          <span>{locale === "ar" ? "English" : "العربية"}</span>
        </button>

        <Link
          href="/dashboard/projects/new"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors shadow-2xs"
        >
          <FolderPlus className="h-3.5 w-3.5 text-[#0A4D68]" />
          <span>{t.addProject}</span>
        </Link>

        <Link
          href="/dashboard/projects"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-colors shadow-sm shadow-[#0A4D68]/20"
        >
          <Sparkles className="h-3.5 w-3.5 text-white" />
          <span>{t.generateIdeas}</span>
        </Link>
      </div>
    </header>
  )
}
