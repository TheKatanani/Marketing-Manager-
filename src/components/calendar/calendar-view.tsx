"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { schedulePost, unschedulePost } from "@/actions/calendar-actions"
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Plus,
  Trash2,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

interface CalendarPost {
  id: string
  title: string
  status: string
  scheduledFor: Date | string | null
  idea?: {
    title: string
    contentPillar: string
  } | null
  versions: {
    platform: string
  }[]
}

interface CalendarViewProps {
  posts: CalendarPost[]
}

export function CalendarView({ posts }: CalendarViewProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [schedulingId, setSchedulingId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState("2026-10-26T10:00")
  const [submitting, setSubmitting] = useState(false)

  // Current Week days (Oct 26 - Nov 1, 2026)
  const days = [
    { name: isRtl ? "الإثنين" : "Mon", dateStr: "2026-10-26", label: "Oct 26" },
    { name: isRtl ? "الثلاثاء" : "Tue", dateStr: "2026-10-27", label: "Oct 27" },
    { name: isRtl ? "الأربعاء" : "Wed", dateStr: "2026-10-28", label: "Oct 28" },
    { name: isRtl ? "الخميس" : "Thu", dateStr: "2026-10-29", label: "Oct 29" },
    { name: isRtl ? "الجمعة" : "Fri", dateStr: "2026-10-30", label: "Oct 30" },
    { name: isRtl ? "السبت" : "Sat", dateStr: "2026-10-31", label: "Oct 31" },
    { name: isRtl ? "الأحد" : "Sun", dateStr: "2026-11-01", label: "Nov 01" },
  ]

  const scheduledPosts = posts.filter((p) => p.scheduledFor)
  const unscheduledPosts = posts.filter((p) => !p.scheduledFor)

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!schedulingId) return

    setSubmitting(true)
    const res = await schedulePost(schedulingId, selectedDate)
    setSubmitting(false)

    if (res.success) {
      setSchedulingId(null)
      router.refresh()
    }
  }

  const handleUnschedule = async (postId: string) => {
    await unschedulePost(postId)
    router.refresh()
  }

  return (
    <div className="space-y-8">
      {/* Week Grid */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((day) => {
          // Find posts scheduled for this day
          const dayPosts = scheduledPosts.filter((p) => {
            if (!p.scheduledFor) return false
            const d = new Date(p.scheduledFor).toISOString().slice(0, 10)
            return d === day.dateStr
          })

          return (
            <div
              key={day.dateStr}
              className="bg-white border border-[#D2E5F0] rounded-2xl p-4 min-h-[260px] flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#D2E5F0] mb-3">
                  <span className="text-xs font-bold text-[#2B3451] tracking-wide">
                    {day.name}
                  </span>
                  <span className="text-[11px] text-[#5E6C8E] font-mono">
                    {day.label}
                  </span>
                </div>

                {/* Day posts */}
                <div className="space-y-2">
                  {dayPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-2.5 rounded-xl bg-[#EBF4F9] border border-[#D2E5F0] text-xs space-y-1.5 group hover:border-[#0A4D68] transition-colors shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <LinkedInIcon className="h-3 w-3 text-[#0A4D68]" />
                          <InstagramIcon className="h-3 w-3 text-[#B9AED8]" />
                          <XTwitterIcon className="h-3 w-3 text-[#2B3451]" />
                        </div>
                        <button
                          onClick={() => handleUnschedule(post.id)}
                          title={isRtl ? "إلغاء الجدولة" : "Unschedule post"}
                          className="opacity-0 group-hover:opacity-100 text-[#5E6C8E] hover:text-rose-600 transition-opacity cursor-pointer"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>

                      <div className="text-[#2B3451] font-bold text-[11px] line-clamp-2">
                        {post.title}
                      </div>

                      <div className="text-[10px] text-[#0A4D68] flex items-center gap-1 font-mono font-semibold">
                        <Clock className="h-2.5 w-2.5" />
                        <span>
                          {new Date(post.scheduledFor!).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  ))}

                  {dayPosts.length === 0 && (
                    <div className="text-[11px] text-[#5E6C8E] text-center py-10 font-medium">
                      {isRtl ? "متاح للنشر" : "Open Slot"}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedDate(`${day.dateStr}T10:00`)
                  if (unscheduledPosts.length > 0) {
                    setSchedulingId(unscheduledPosts[0].id)
                  }
                }}
                disabled={unscheduledPosts.length === 0}
                className="w-full mt-2 py-1.5 rounded-lg bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[11px] font-bold text-[#0A4D68] border border-[#D2E5F0] transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center gap-1 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
                <span>{isRtl ? "جدولة منشور" : "Slot Post"}</span>
              </button>
            </div>
          )
        })}
      </div>

      {/* Scheduling Dialog Modal */}
      {schedulingId && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "جدولة المنشور للنشر التلقائي" : "Schedule Post for Publication"}
            </h3>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5E6C8E] font-bold mb-1">
                  {isRtl ? "اختر المنشور المعتمد" : "Select Approved Draft"}
                </label>
                <select
                  value={schedulingId}
                  onChange={(e) => setSchedulingId(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451] font-medium"
                >
                  {unscheduledPosts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[#5E6C8E] font-bold mb-1">
                  {isRtl ? "تاريخ ووقت النشر" : "Publication Date & Time"}
                </label>
                <input
                  type="datetime-local"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451] font-medium"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSchedulingId(null)}
                  className="px-4 py-2 rounded-lg text-[#5E6C8E] hover:text-[#2B3451] font-bold cursor-pointer"
                >
                  {isRtl ? "إلغاء" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-[#0A4D68] hover:bg-[#07384C] text-white font-bold transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
                >
                  {submitting
                    ? isRtl ? "جارٍ الجدولة..." : "Scheduling..."
                    : isRtl ? "تأكيد الجدولة" : "Confirm Schedule"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Unscheduled Pool */}
      <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-[#2B3451]">
              {isRtl
                ? `مسودات معتمدة بانتظار الجدولة (${unscheduledPosts.length})`
                : `Approved Drafts Ready to Schedule (${unscheduledPosts.length})`}
            </h3>
            <p className="text-xs text-[#5E6C8E]">
              {isRtl
                ? "حدد موعد نشر هذه المنشورات المعتمدة عبر التقويم."
                : "Assign these verified posts into your calendar queue."}
            </p>
          </div>
        </div>

        {unscheduledPosts.length === 0 ? (
          <div className="text-xs text-[#5E6C8E] text-center py-4">
            {isRtl
              ? "جميع المنشورات مجدولة حالياً على التقويم بنجاح."
              : "All posts are currently placed in your publication schedule."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {unscheduledPosts.map((post) => (
              <div
                key={post.id}
                className="p-3.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1 min-w-0">
                  <div className="font-bold text-[#2B3451] truncate">
                    {post.title}
                  </div>
                  <div className="text-[10px] text-[#0A4D68] font-mono font-semibold">
                    {post.idea?.contentPillar || "Full-Stack"}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSchedulingId(post.id)
                    setSelectedDate("2026-10-26T10:00")
                  }}
                  className="px-2.5 py-1 rounded bg-[#0A4D68] hover:bg-[#07384C] text-white text-[11px] font-bold shrink-0 transition-colors cursor-pointer shadow-2xs"
                >
                  {isRtl ? "جدولة" : "Schedule"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
