"use client"

import { CampaignList } from "@/components/campaigns/campaign-list"
import { Flag } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface CampaignsPageViewProps {
  campaigns: any[]
}

export function CampaignsPageView({ campaigns }: CampaignsPageViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <Flag className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة و: الحملات التسويقية الموجهة" : "Marketing Campaigns"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.campaignsTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.campaignsSub}
          </p>
        </div>
      </div>

      <CampaignList campaigns={campaigns} />
    </div>
  )
}
