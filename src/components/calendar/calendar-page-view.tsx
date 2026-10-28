"use client"

import { CalendarView } from "@/components/calendar/calendar-view"
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface CalendarPageViewProps {
  posts: any[]
}

export function CalendarPageView({ posts }: CalendarPageViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <CalendarIcon className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة هـ: التقويم التحريري وجدولة النشر" : "Module D: Content Calendar"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.calendarTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.calendarSub}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#D2E5F0] text-xs font-bold text-[#0A4D68] shadow-2xs">
          <Clock className="h-4 w-4 text-[#0A4D68]" />
          <span>{isRtl ? "المعدل المستهدف: 3-4 منشورات / أسبوعياً" : "Cadence Target: 3-4 posts / week"}</span>
        </div>
      </div>

      <CalendarView posts={posts} />
    </div>
  )
}
