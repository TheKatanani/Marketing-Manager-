"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toggleAccountConnection } from "@/actions/account-actions"
import { CheckCircle2, AlertCircle, ShieldAlert, Link as LinkIcon, ExternalLink } from "lucide-react"
import { LinkedInIcon, InstagramIcon, XTwitterIcon } from "@/components/ui/platform-icons"
import { useLanguage } from "@/lib/i18n"

interface AccountItem {
  id: string
  platform: string
  accountName: string
  profileUrl: string | null
  isConnected: boolean
  lastSyncAt: Date | string | null
}

interface AccountManagerProps {
  accounts: AccountItem[]
}

export function AccountManager({ accounts }: AccountManagerProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)

  const handleToggle = async (platform: string, defaultName: string, defaultUrl: string) => {
    setLoadingPlatform(platform)
    await toggleAccountConnection(platform, defaultName, defaultUrl)
    setLoadingPlatform(null)
    router.refresh()
  }

  const platformsConfig = [
    {
      platform: "LINKEDIN",
      name: "LinkedIn",
      icon: LinkedInIcon,
      color: "text-[#0A4D68] bg-[#EBF4F9] border-[#D2E5F0]",
      description: isRtl
        ? "واجهة برمجة تطبيقات لينكد إن الرسمية (OAuth 2.0 Member & Page API)"
        : "Official LinkedIn Member & Company Page API (OAuth 2.0)",
      defaultName: "Mohammed Katanani (Senior Architect)",
      defaultUrl: "https://linkedin.com/in/mohammed-katanani",
    },
    {
      platform: "INSTAGRAM",
      name: "Instagram Professional",
      icon: InstagramIcon,
      color: "text-[#3C2F5E] bg-[#EFEAF7] border-[#B9AED8]",
      description: isRtl
        ? "واجهة Meta Graph API لحسابات المبدعين وصناع المحتوى (Creator / Business)"
        : "Meta Graph API for Instagram Professional / Creator Accounts",
      defaultName: "@katanani.tech",
      defaultUrl: "https://instagram.com/katanani.tech",
    },
    {
      platform: "X",
      name: "X (Twitter) Developer API",
      icon: XTwitterIcon,
      color: "text-[#2B3451] bg-[#F5F9FC] border-[#D2E5F0]",
      description: isRtl
        ? "واجهة X API v2 لدعم نشر الثريدات والمنشورات عبر OAuth 2.0"
        : "X API v2 with OAuth 2.0 User Context & Thread Posting",
      defaultName: "@mkatanani_dev",
      defaultUrl: "https://x.com/mkatanani_dev",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {platformsConfig.map((cfg) => {
          const acc = accounts.find((a) => a.platform === cfg.platform)
          const isConnected = acc?.isConnected ?? false

          return (
            <div
              key={cfg.platform}
              className="bg-white border border-[#D2E5F0] rounded-2xl p-6 space-y-5 hover:shadow-md transition-shadow flex flex-col justify-between shadow-2xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl border ${cfg.color}`}>
                    <cfg.icon className="h-5 w-5" />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full font-bold ${
                      isConnected
                        ? "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                        : "bg-[#F5F9FC] text-[#5E6C8E] border border-[#D2E5F0]"
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 text-[#1E4E30]" />
                        <span>{isRtl ? "متصل" : "Connected"}</span>
                      </>
                    ) : (
                      <span>{isRtl ? "غير متصل" : "Not Connected"}</span>
                    )}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#2B3451]">{cfg.name}</h3>
                  <p className="text-xs text-[#5E6C8E] leading-relaxed">
                    {cfg.description}
                  </p>
                </div>

                {isConnected && acc && (
                  <div className="p-3 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs space-y-1">
                    <div className="text-[#5E6C8E] text-[10px] font-bold">
                      {isRtl ? "الحساب المتصل:" : "Connected Handle:"}
                    </div>
                    <div className="text-[#2B3451] font-bold">{acc.accountName}</div>
                    {acc.profileUrl && (
                      <a
                        href={acc.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0A4D68] hover:text-[#07384C] text-[11px] inline-flex items-center gap-1 pt-1 font-semibold"
                      >
                        <span>{isRtl ? "عرض الحساب" : "View Profile"}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleToggle(cfg.platform, cfg.defaultName, cfg.defaultUrl)}
                disabled={loadingPlatform === cfg.platform}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isConnected
                    ? "bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#2B3451] border border-[#D2E5F0]"
                    : "bg-[#0A4D68] hover:bg-[#07384C] text-white shadow-sm shadow-[#0A4D68]/20"
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" />
                <span>
                  {loadingPlatform === cfg.platform
                    ? isRtl ? "جارٍ التحديث..." : "Updating..."
                    : isConnected
                    ? isRtl ? "إلغاء ربط الحساب" : "Disconnect Account"
                    : isRtl ? "ربط الحساب الآن" : "Connect Account"}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {/* Security & Official API Compliance Card */}
      <div className="p-5 rounded-2xl bg-white border border-[#D2E5F0] space-y-2 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-[#2B3451]">
          <ShieldAlert className="h-4 w-4 text-[#0A4D68]" />
          <span>{isRtl ? "سياسة النشر والأمان عبر الـ API الرسمي" : "Official Social API & Publishing Policy"}</span>
        </div>
        <p className="text-xs text-[#5E6C8E] leading-relaxed">
          {isRtl
            ? "يستخدم BrandPilot واجهات برمجة التطبيقات الرسمية لكل منصة مع تشفير تام للبيانات. لا يتم نشر أي منشور تلقائياً دون مراجعتك واعتمادك الشخصي في قائمة المراجعة (Approval Queue)."
            : "BrandPilot AI uses official platform APIs with encrypted server-side tokens. Automated publishing is restricted by default — all posts require your explicit approval in the Approval Queue before distribution."}
        </p>
      </div>
    </div>
  )
}
