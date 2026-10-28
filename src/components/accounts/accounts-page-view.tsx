"use client"

import { AccountManager } from "@/components/accounts/account-manager"
import { Share2, ShieldCheck } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface AccountsPageViewProps {
  accounts: any[]
}

export function AccountsPageView({ accounts }: AccountsPageViewProps) {
  const { t, isRtl } = useLanguage()

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <Share2 className="h-3.5 w-3.5" />
            <span>{isRtl ? "الوحدة ح: مركز ربط الحسابات والمنصات" : "Social Accounts Center"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.accountsTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {t.accountsSub}
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#D2E5F0] text-xs font-bold text-[#0A4D68] shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-[#0A4D68]" />
          <span>{isRtl ? "مفاتيح OAuth مشفرة بالكامل" : "OAuth Tokens Encrypted"}</span>
        </div>
      </div>

      <AccountManager accounts={accounts} />
    </div>
  )
}
