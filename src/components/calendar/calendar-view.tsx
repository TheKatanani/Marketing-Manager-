"use client"

import React, { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  BookOpen,
  Share2,
  Sparkles,
  Info,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

interface CalendarItem {
  id: string
  type: "POST" | "ARTICLE"
  platform?: "LINKEDIN" | "INSTAGRAM" | "X"
  title: string
  scheduledFor: Date
  status: string
  weekTheme?: string | null
  canonicalUrl?: string | null
  content?: string
}

interface CalendarViewProps {
  posts: any[]
  articles?: any[]
}

export function CalendarView({ posts, articles = [] }: CalendarViewProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()

  // Default to November 2026
  const [currentYear, setCurrentYear] = useState(2026)
  const [currentMonth, setCurrentMonth] = useState(10) // 0-indexed: 10 = November
  const [selectedChannel, setSelectedChannel] = useState<string>("ALL")
  const [activeItem, setActiveItem] = useState<CalendarItem | null>(null)
  const [viewMode, setViewMode] = useState<"MONTH" | "WEEK">("MONTH")

  // Convert posts and articles into flattened scheduled calendar items
  const calendarItems: CalendarItem[] = useMemo(() => {
    const items: CalendarItem[] = []

    // 1. Social post versions
    for (const post of posts) {
      if (post.versions && post.versions.length > 0) {
        for (const v of post.versions) {
          const d = v.scheduledFor || post.scheduledFor
          if (d) {
            items.push({
              id: v.id,
              type: "POST",
              platform: v.platform,
              title: post.title,
              scheduledFor: new Date(d),
              status: v.status || post.status,
              weekTheme: post.weekTheme,
              content: v.content,
            })
          }
        }
      } else if (post.scheduledFor) {
        items.push({
          id: post.id,
          type: "POST",
          title: post.title,
          scheduledFor: new Date(post.scheduledFor),
          status: post.status,
          weekTheme: post.weekTheme,
        })
      }
    }

    // 2. Portfolio Articles
    for (const art of articles) {
      if (art.scheduledFor) {
        items.push({
          id: art.id,
          type: "ARTICLE",
          title: `${art.title} (${art.language?.toUpperCase() || "AR"})`,
          scheduledFor: new Date(art.scheduledFor),
          status: art.status || "PLANNED",
          canonicalUrl: art.canonicalUrl,
        })
      }
    }

    return items
  }, [posts, articles])

  // Helper to format date in Asia/Hebron timezone
  const getHebronDateParts = (date: Date) => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Hebron",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    })
    const parts = formatter.formatToParts(date)
    const y = Number(parts.find((p) => p.type === "year")?.value)
    const m = Number(parts.find((p) => p.type === "month")?.value) - 1
    const d = Number(parts.find((p) => p.type === "day")?.value)
    const hour = parts.find((p) => p.type === "hour")?.value || "00"
    const minute = parts.find((p) => p.type === "minute")?.value || "00"
    return { y, m, d, timeStr: `${hour}:${minute}` }
  }

  // Filter items by channel
  const filteredItems = useMemo(() => {
    return calendarItems.filter((item) => {
      if (selectedChannel === "ALL") return true
      if (selectedChannel === "ARTICLE") return item.type === "ARTICLE"
      return item.platform === selectedChannel
    })
  }, [calendarItems, selectedChannel])

  // Month navigation helpers
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const handleResetNovember = () => {
    setCurrentYear(2026)
    setCurrentMonth(10) // November 2026
  }

  // Month Calendar Days Grid
  const monthData = useMemo(() => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    // Sunday = 0, Monday = 1, ...
    // Let's start week on Sunday (or Monday)
    const startingDayOfWeek = firstDayOfMonth.getDay() // 0 is Sunday

    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ dayNumber: null, isCurrentMonth: false })
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ dayNumber: d, isCurrentMonth: true })
    }

    return days
  }, [currentYear, currentMonth])

  // Week days names
  const weekDayNames = isRtl
    ? ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const monthName = new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
    month: "long",
    year: "numeric",
  }).format(new Date(currentYear, currentMonth, 1))

  return (
    <div className="space-y-6">
      {/* Calendar Controls & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#D2E5F0] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        {/* Navigation */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F5F9FC] border border-[#D2E5F0] rounded-xl p-1">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg text-[#5E6C8E] hover:text-[#0A4D68] hover:bg-white transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs md:text-sm font-extrabold text-[#0A4D68] min-w-[140px] text-center">
              {monthName}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg text-[#5E6C8E] hover:text-[#0A4D68] hover:bg-white transition-colors"
              title="Next Month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={handleResetNovember}
            className="px-3 py-1.5 rounded-xl bg-[#EBF4F9] hover:bg-[#D2E5F0] text-[#0A4D68] text-xs font-bold border border-[#D2E5F0] transition-colors"
          >
            {isRtl ? "نوفمبر 2026 (الأساسي)" : "Nov 2026"}
          </button>
        </div>

        {/* Channel Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-[#5E6C8E] flex items-center gap-1 ml-1">
            <Filter className="h-3 w-3" />
            {isRtl ? "فلترة:" : "Filter:"}
          </span>

          {[
            { key: "ALL", label: isRtl ? "الكل" : "All" },
            { key: "LINKEDIN", label: "LinkedIn" },
            { key: "X", label: "X (Twitter)" },
            { key: "INSTAGRAM", label: "Instagram" },
            { key: "ARTICLE", label: isRtl ? "مقالات البورتفوليو" : "Articles" },
          ].map((ch) => (
            <button
              key={ch.key}
              onClick={() => setSelectedChannel(ch.key)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                selectedChannel === ch.key
                  ? "bg-[#0A4D68] text-white shadow-sm"
                  : "bg-[#F5F9FC] text-[#5E6C8E] hover:bg-[#EBF4F9] hover:text-[#2B3451]"
              )}
            >
              {ch.label}
            </button>
          ))}
        </div>
      </div>

      {/* Month Calendar Grid */}
      <div className="bg-white rounded-2xl border border-[#D2E5F0] shadow-sm overflow-hidden">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-[#D2E5F0] bg-[#F5F9FC] text-center">
          {weekDayNames.map((name, i) => (
            <div key={i} className="py-2.5 text-xs font-extrabold text-[#5E6C8E]">
              {name}
            </div>
          ))}
        </div>

        {/* Days Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-[#D2E5F0]/60">
          {monthData.map((cell, idx) => {
            if (!cell.isCurrentMonth || !cell.dayNumber) {
              return <div key={idx} className="min-h-[110px] bg-[#FAFBFD]/50 p-2" />
            }

            // Find items scheduled on this exact day in Asia/Hebron
            const dayItems = filteredItems.filter((item) => {
              const { y, m, d } = getHebronDateParts(item.scheduledFor)
              return y === currentYear && m === currentMonth && d === cell.dayNumber
            })

            const isNovActive = currentYear === 2026 && currentMonth === 10
            const hasItems = dayItems.length > 0

            return (
              <div
                key={idx}
                className={cn(
                  "min-h-[110px] md:min-h-[130px] p-2 flex flex-col justify-between transition-colors",
                  hasItems ? "bg-white hover:bg-[#F5F9FC]/60" : "bg-white"
                )}
              >
                {/* Day Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={cn(
                      "text-xs font-bold px-1.5 py-0.5 rounded-md",
                      hasItems ? "bg-[#D2E5F0] text-[#0A4D68]" : "text-[#5E6C8E]"
                    )}
                  >
                    {cell.dayNumber}
                  </span>
                  {hasItems && (
                    <span className="text-[10px] font-bold text-[#0A4D68]">
                      {dayItems.length}
                    </span>
                  )}
                </div>

                {/* Items Badges */}
                <div className="space-y-1 mt-1 flex-1 overflow-y-auto max-h-[90px]">
                  {dayItems.map((item) => {
                    const { timeStr } = getHebronDateParts(item.scheduledFor)
                    const isArticle = item.type === "ARTICLE"

                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveItem(item)}
                        className={cn(
                          "px-2 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all flex items-center justify-between gap-1 shadow-2xs border",
                          isArticle
                            ? "bg-[#B9AED8]/20 text-[#052634] border-[#B9AED8]/40 hover:bg-[#B9AED8]/30"
                            : item.platform === "LINKEDIN"
                            ? "bg-[#0A4D68] text-white border-transparent hover:bg-[#0A4D68]/90"
                            : item.platform === "X"
                            ? "bg-[#2B3451] text-white border-transparent hover:bg-[#2B3451]/90"
                            : "bg-[#D2E5F0] text-[#0A4D68] border-[#A7C8B4] hover:bg-[#D2E5F0]/80"
                        )}
                        title={item.title}
                      >
                        <div className="flex items-center gap-1 min-w-0">
                          {isArticle ? (
                            <BookOpen className="h-3 w-3 shrink-0" />
                          ) : item.platform === "LINKEDIN" ? (
                            <span className="shrink-0">LI</span>
                          ) : item.platform === "X" ? (
                            <span className="shrink-0">X</span>
                          ) : (
                            <span className="shrink-0">IG</span>
                          )}
                          <span className="truncate">{item.title}</span>
                        </div>
                        <span className="text-[9px] opacity-80 shrink-0">{timeStr}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Item Detail Modal / Preview Card */}
      {activeItem && (
        <div className="bg-white p-5 rounded-2xl border border-[#0A4D68]/30 shadow-lg space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#D2E5F0] pb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0A4D68] text-white">
                {activeItem.type === "ARTICLE" ? (isRtl ? "مقال بورتفوليو" : "Portfolio Guide") : activeItem.platform}
              </span>
              <span className="text-xs font-bold text-[#0A4D68] bg-[#D2E5F0] px-2 py-0.5 rounded">
                {new Intl.DateTimeFormat(isRtl ? "ar-EG" : "en-US", {
                  timeZone: "Asia/Hebron",
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(activeItem.scheduledFor)}
              </span>
            </div>
            <button
              onClick={() => setActiveItem(null)}
              className="text-xs text-[#5E6C8E] hover:text-[#2B3451] p-1 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="font-bold text-sm text-[#2B3451]">{activeItem.title}</h4>
            {activeItem.content && (
              <p className="text-xs text-[#5E6C8E] line-clamp-3 font-mono bg-[#F5F9FC] p-2.5 rounded-lg border border-[#D2E5F0]">
                {activeItem.content}
              </p>
            )}
            {activeItem.canonicalUrl && (
              <a
                href={activeItem.canonicalUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#0A4D68] font-semibold hover:underline flex items-center gap-1 pt-1"
              >
                <ExternalLink className="h-3 w-3" />
                <span>{activeItem.canonicalUrl}</span>
              </a>
            )}
          </div>

          <div className="pt-2 flex justify-end">
            <Link
              href="/dashboard/editorial"
              className="px-4 py-1.5 rounded-lg bg-[#0A4D68] text-white text-xs font-bold hover:bg-[#0A4D68]/90 transition-all"
            >
              {isRtl ? "فتح وتعديل في استوديو التحرير" : "Open in Editorial Studio"}
            </Link>
          </div>
        </div>
      )}

      {/* Editorial Policy Disclaimer */}
      <div className="bg-[#F5F9FC] p-4 rounded-xl border border-[#D2E5F0] flex items-start gap-3 text-xs text-[#5E6C8E] leading-relaxed">
        <Info className="h-4 w-4 text-[#0A4D68] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#0A4D68]">
            {isRtl ? "ملاحظة تحريرية صادقة:" : "Editorial Notice:"}{" "}
          </span>
          <span>
            {isRtl
              ? "المواعيد المسجلة في هذا التقويم هي جداول تحريرية معتمدة وفق توقيت القدس (Asia/Hebron UTC+2). لا يتضمن النظام نشراً تلقائياً عبر واجهات برمجية مغلقة، بل يتم نسخ المحتوى والاعتماد بالتوثيق اليدوي الصادق من قبل صاحب الحساب."
              : "All scheduled times represent approved editorial plans in Asia/Hebron (UTC+2). Automatic API publishing is not active; content is published directly by the owner with truthful attribution."}
          </span>
        </div>
      </div>
    </div>
  )
}
