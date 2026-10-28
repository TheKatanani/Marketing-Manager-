"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createCampaign, updateCampaignStatus } from "@/actions/campaign-actions"
import {
  Flag,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface CampaignItem {
  id: string
  name: string
  objective: string
  startDate: Date | string | null
  endDate: Date | string | null
  status: string
  ideas: { id: string }[]
  posts: { id: string }[]
}

interface CampaignListProps {
  campaigns: CampaignItem[]
}

export function CampaignList({ campaigns }: CampaignListProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [name, setName] = useState("")
  const [objective, setObjective] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const res = await createCampaign({ name, objective })
    setSubmitting(false)

    if (res.success) {
      setName("")
      setObjective("")
      setIsModalOpen(false)
      router.refresh()
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === "ACTIVE" ? "COMPLETED" : "ACTIVE"
    await updateCampaignStatus(id, nextStatus)
    router.refresh()
  }

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-[#5E6C8E]">
          {isRtl ? `الحملات التسويقية (${campaigns.length})` : `Active Campaigns (${campaigns.length})`}
        </span>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{isRtl ? "+ حملة جديدة" : "New Campaign"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between shadow-2xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
                  {isRtl ? "هدف استراتيجي" : "Targeted Objective"}
                </span>

                <button
                  onClick={() => handleToggleStatus(camp.id, camp.status)}
                  className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase font-bold transition-colors cursor-pointer ${
                    camp.status === "ACTIVE"
                      ? "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                      : "bg-[#F5F9FC] text-[#5E6C8E] border border-[#D2E5F0]"
                  }`}
                >
                  {camp.status === "ACTIVE" ? (isRtl ? "نشطة" : "ACTIVE") : (isRtl ? "مكتملة" : "COMPLETED")}
                </button>
              </div>

              <h3 className="text-lg font-bold text-[#2B3451] tracking-tight">
                {camp.name}
              </h3>

              <p className="text-xs text-[#2B3451] leading-relaxed bg-[#F5F9FC] p-3 rounded-xl border border-[#D2E5F0]">
                {camp.objective}
              </p>
            </div>

            <div className="pt-3 border-t border-[#D2E5F0] flex items-center justify-between text-xs text-[#5E6C8E]">
              <div className="flex items-center gap-3">
                <span className="font-semibold">{camp.ideas.length} {isRtl ? "أفكار مرتبطة" : "Ideas Anchored"}</span>
                <span>•</span>
                <span className="font-semibold">{camp.posts.length} {isRtl ? "منشورات تم إنتاجها" : "Posts Produced"}</span>
              </div>

              <button
                onClick={() => router.push("/dashboard/ideas")}
                className="text-[#0A4D68] hover:text-[#07384C] inline-flex items-center gap-1 font-bold transition-colors cursor-pointer"
              >
                <span>{isRtl ? "توليد محتوى" : "Generate Content"}</span>
                <ArrowIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Campaign Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "إنشاء حملة تسويقية جديدة" : "Create Marketing Campaign"}
            </h3>
            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5E6C8E] font-bold mb-1">
                  {isRtl ? "اسم الحملة" : "Campaign Name"}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRtl ? "مثال: استقطاب وظائف ريموت Q1" : "e.g. Q1 Remote Job Acquisition Sprint"}
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451] font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5E6C8E] font-bold mb-1">
                  {isRtl ? "الهدف الاستراتيجي المحدد" : "Strategic Objective"}
                </label>
                <textarea
                  rows={3}
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder={
                    isRtl
                      ? "ما هو الهدف الملموس؟ (مثال: جذب مدراء التوظيف والشركات التي تبحث عن مهندس React / Next.js يحل المشاكل المعقدة)."
                      : "What is the concrete goal? (e.g. Attract remote engineering managers hiring full-stack Next.js and distributed systems specialists)."
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451] leading-relaxed"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                    ? isRtl ? "جارٍ الإنشاء..." : "Creating..."
                    : isRtl ? "إطلاق الحملة" : "Launch Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
