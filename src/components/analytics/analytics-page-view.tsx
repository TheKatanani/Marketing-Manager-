"use client"

import { LeadTracker } from "@/components/analytics/lead-tracker"
import {
  BarChart3,
  TrendingUp,
  Users,
  Briefcase,
  DollarSign,
  Award,
  ArrowUpRight,
} from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import { useLanguage } from "@/lib/i18n"

interface AnalyticsPageViewProps {
  summary: {
    totalImpressions: number
    totalRecruiterInquiries: number
    activeInterviews: number
    closedDeals: number
    platformBreakdown: Record<string, any>
    leads: any[]
  }
}

export function AnalyticsPageView({ summary }: AnalyticsPageViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة ز: قياس العائد وفرص العمل المحققة" : "Module E: Performance & Learning"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.analyticsTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.analyticsSub}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#D2E5F0] text-xs font-bold text-[#0A4D68] shadow-2xs">
          <Award className="h-4 w-4 text-[#0A4D68]" />
          <span>{isRtl ? "الهدف الرئيسي: وظيفة ريموت لمهندس أول" : "Priority 1 Goal: Remote Senior Role"}</span>
        </div>
      </div>

      {/* 4 Outcome Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#5E6C8E]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isRtl ? "إجمالي وصول المحتوى" : "Total Audience Reach"}
            </span>
            <div className="p-2 rounded-lg bg-[#EBF4F9] text-[#0A4D68]">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-[#0A4D68] tracking-tight font-mono">
              {summary.totalImpressions.toLocaleString()}
            </div>
            <div className="text-xs text-[#1E4E30] flex items-center gap-1 font-bold">
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>{isRtl ? "عبر لينكد إن، إنستغرام، وإكس" : "Across LinkedIn, IG & X"}</span>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#5E6C8E]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isRtl ? "استفسارات التوظيف (Recruiters)" : "Recruiter Inquiries"}
            </span>
            <div className="p-2 rounded-lg bg-[#EBF4F9] text-[#0A4D68]">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-[#2B3451] tracking-tight font-mono">
              {summary.totalRecruiterInquiries}
            </div>
            <div className="text-xs text-[#5E6C8E]">
              {isRtl ? "رسائل توظيف مباشرة من شركات تقنية" : "Direct talent acquisition DMs"}
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#5E6C8E]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isRtl ? "المقابلات الجارية" : "Active Interviews"}
            </span>
            <div className="p-2 rounded-lg bg-[#EFEAF7] text-[#3C2F5E]">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-[#0A4D68] tracking-tight font-mono">
              {summary.activeInterviews} {isRtl ? "جولات" : "Rounds"}
            </div>
            <div className="text-xs text-[#5E6C8E]">
              TechFlow Systems & Vanguard
            </div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-[#D2E5F0] rounded-xl p-5 space-y-3 shadow-2xs hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-[#5E6C8E]">
            <span className="text-xs font-bold uppercase tracking-wider">
              {isRtl ? "عقود فريلانس مكتملة" : "Contracts Closed"}
            </span>
            <div className="p-2 rounded-lg bg-[#E8F2EC] text-[#1E4E30]">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-extrabold text-[#1E4E30] tracking-tight font-mono">
              {summary.closedDeals} {isRtl ? "عقد" : "Deal"}
            </div>
            <div className="text-xs text-[#1E4E30] font-bold">
              $14,000 Gulf Retail Holdings
            </div>
          </div>
        </div>
      </div>

      {/* Platform Channel Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LinkedIn Card */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D2E5F0]">
            <div className="flex items-center gap-2 font-bold text-[#0A4D68] text-sm">
              <LinkedInIcon className="h-4 w-4" />
              <span>{isRtl ? "شبكة لينكد إن (LinkedIn)" : "LinkedIn Network"}</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#1E4E30] bg-[#E8F2EC] px-2 py-0.5 rounded border border-[#A7C8B4]">
              {isRtl ? "أعلى عائد توظيف" : "High Recruitment ROI"}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "المشاهدات:" : "Impressions:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.LINKEDIN?.impressions?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "التفاعلات:" : "Engagements:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.LINKEDIN?.engagements?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "استفسارات التوظيف:" : "Recruiter DMs:"}</span>
              <span className="text-[#0A4D68] font-bold font-mono">{summary.platformBreakdown.LINKEDIN?.inquiries || 0}</span>
            </div>
          </div>
        </div>

        {/* Instagram Card */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D2E5F0]">
            <div className="flex items-center gap-2 font-bold text-[#3C2F5E] text-sm">
              <InstagramIcon className="h-4 w-4" />
              <span>{isRtl ? "كاروسيل إنستغرام" : "Instagram Carousels"}</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#3C2F5E] bg-[#EFEAF7] px-2 py-0.5 rounded border border-[#B9AED8]">
              {isRtl ? "فريلانس ومؤسسو مشاريع" : "Freelance & Founders"}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "المشاهدات:" : "Impressions:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.INSTAGRAM?.impressions?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "التفاعلات:" : "Engagements:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.INSTAGRAM?.engagements?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "استفسارات العملاء:" : "Client Inquiries:"}</span>
              <span className="text-[#0A4D68] font-bold font-mono">{summary.platformBreakdown.INSTAGRAM?.inquiries || 0}</span>
            </div>
          </div>
        </div>

        {/* X (Twitter) Card */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#D2E5F0]">
            <div className="flex items-center gap-2 font-bold text-[#2B3451] text-sm">
              <XTwitterIcon className="h-4 w-4 text-[#2B3451]" />
              <span>{isRtl ? "ثريدات إكس التقنية" : "X Technical Threads"}</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#0A4D68] bg-[#EBF4F9] px-2 py-0.5 rounded border border-[#D2E5F0]">
              {isRtl ? "سلطة هندسية" : "Engineering Authority"}
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "المشاهدات:" : "Impressions:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.X?.impressions?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "التفاعلات:" : "Engagements:"}</span>
              <span className="text-[#2B3451] font-mono font-bold">{summary.platformBreakdown.X?.engagements?.toLocaleString() || 0}</span>
            </div>
            <div className="flex justify-between text-[#5E6C8E]">
              <span>{isRtl ? "استفسارات مباشرة:" : "Direct Inquiries:"}</span>
              <span className="text-[#2B3451] font-bold font-mono">{summary.platformBreakdown.X?.inquiries || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Career & Client Opportunity Pipeline */}
      <LeadTracker leads={summary.leads} />
    </div>
  )
}
