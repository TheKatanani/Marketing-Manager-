"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createLead, updateLeadStatus } from "@/actions/analytics-actions"
import {
  TrendingUp,
  Plus,
  Briefcase,
  Users,
  DollarSign,
  CheckCircle2,
  PhoneCall,
  Award,
  ChevronRight,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface LeadItem {
  id: string
  contactName: string
  company: string
  role: string
  sourcePlatform: string
  type: string
  status: string
  estimatedValue: string | null
  notes: string | null
  createdAt: Date | string
}

interface LeadTrackerProps {
  leads: LeadItem[]
}

export function LeadTracker({ leads }: LeadTrackerProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    contactName: "",
    company: "",
    role: "",
    sourcePlatform: "LINKEDIN" as "LINKEDIN" | "X" | "INSTAGRAM" | "DIRECT",
    type: "RECRUITER_JOB" as "RECRUITER_JOB" | "FREELANCE_CLIENT" | "ADVISORY",
    status: "INQUIRY" as "INQUIRY" | "CALL_SCHEDULED" | "INTERVIEW" | "OFFER" | "CLOSED",
    estimatedValue: "",
    notes: "",
  })
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const res = await createLead(formData)
    setSubmitting(false)

    if (res.success) {
      setIsModalOpen(false)
      setFormData({
        contactName: "",
        company: "",
        role: "",
        sourcePlatform: "LINKEDIN",
        type: "RECRUITER_JOB",
        status: "INQUIRY",
        estimatedValue: "",
        notes: "",
      })
      router.refresh()
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    await updateLeadStatus(id, newStatus)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#2B3451] tracking-tight">
            {isRtl ? "مسار الفرص وعروض العمل المحققة" : "Real Career & Business Opportunities Pipeline"}
          </h3>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "النتائج الحقيقية المرتبطة مباشرة بمنشوراتك على لينكد إن، إنستغرام، وإكس."
              : "Attributed directly to your content published on LinkedIn, Instagram, and X."}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{isRtl ? "+ تسجيل فرصة جديدة" : "+ Record Opportunity"}</span>
        </button>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-[#D2E5F0] rounded-2xl overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className={`w-full text-xs ${isRtl ? "text-right" : "text-left"}`}>
            <thead className="bg-[#F5F9FC] border-b border-[#D2E5F0] text-[#5E6C8E] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-5 py-3.5">{isRtl ? "جهة الاتصال والشركة" : "Contact & Company"}</th>
                <th className="px-5 py-3.5">{isRtl ? "المنصة" : "Platform"}</th>
                <th className="px-5 py-3.5">{isRtl ? "نوع الفرصة" : "Opportunity Type"}</th>
                <th className="px-5 py-3.5">{isRtl ? "القيمة المتوقعة" : "Estimated Value"}</th>
                <th className="px-5 py-3.5">{isRtl ? "مرحلة التفاوض" : "Pipeline Status"}</th>
                <th className="px-5 py-3.5">{isRtl ? "ملاحظات وتفاصيل" : "Outcome Notes"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D2E5F0]">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-[#F5F9FC]/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-[#2B3451]">{lead.contactName}</div>
                    <div className="text-[#5E6C8E] text-[11px]">
                      {lead.role} • {lead.company}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 rounded bg-[#F5F9FC] text-[#0A4D68] border border-[#D2E5F0] font-mono text-[10px] font-bold">
                      {lead.sourcePlatform}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        lead.type === "RECRUITER_JOB"
                          ? "bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]"
                          : "bg-[#E8F2EC] text-[#1E4E30] border border-[#A7C8B4]"
                      }`}
                    >
                      {lead.type === "RECRUITER_JOB"
                        ? isRtl ? "وظيفة ريموت" : "Remote Career Role"
                        : isRtl ? "مشروع فريلانس" : "Freelance Client Deal"}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-bold text-[#1E4E30] font-mono">
                    {lead.estimatedValue || "N/A"}
                  </td>

                  <td className="px-5 py-4">
                    <select
                      value={lead.status}
                      onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                      className="px-2.5 py-1 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[11px] font-bold text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                    >
                      <option value="INQUIRY">{isRtl ? "استفسار أولي / رسالة" : "Inquiry / DM"}</option>
                      <option value="CALL_SCHEDULED">{isRtl ? "مكالمة استكشافية" : "Discovery Call"}</option>
                      <option value="INTERVIEW">{isRtl ? "مقابلة عمل" : "Interview Round"}</option>
                      <option value="OFFER">{isRtl ? "عرض رسمي مستلم" : "Offer Received"}</option>
                      <option value="CLOSED">{isRtl ? "تم الاتفاق بنجاح" : "Closed & Won"}</option>
                    </select>
                  </td>

                  <td className="px-5 py-4 text-[#5E6C8E] text-[11px] max-w-xs leading-relaxed">
                    {lead.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Lead Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-bold text-[#2B3451]">
              {isRtl ? "تسجيل فرصة عمل أو عميل جديد" : "Record Recruiter / Client Lead"}
            </h3>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "اسم الشخص *" : "Contact Name *"}
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "الشركة *" : "Company *"}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. TechFlow Systems"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "المسمى الوظيفي" : "Role / Title"}
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Engineering Manager"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                  />
                </div>
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "المنصة المصدر" : "Source Platform"}
                  </label>
                  <select
                    value={formData.sourcePlatform}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sourcePlatform: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                  >
                    <option value="LINKEDIN">LinkedIn</option>
                    <option value="X">X (Twitter)</option>
                    <option value="INSTAGRAM">Instagram</option>
                    <option value="DIRECT">Direct Referral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "نوع الفرصة" : "Opportunity Type"}
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                  >
                    <option value="RECRUITER_JOB">{isRtl ? "وظيفة ريموت" : "Remote Career Role"}</option>
                    <option value="FREELANCE_CLIENT">{isRtl ? "عميل فريلانس" : "Freelance Client Deal"}</option>
                    <option value="ADVISORY">{isRtl ? "استشارة تقنية" : "Technical Advisory"}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#5E6C8E] font-bold mb-1">
                    {isRtl ? "القيمة المتوقعة" : "Estimated Value"}
                  </label>
                  <input
                    type="text"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                    placeholder="e.g. $110,000 / yr or $8,500"
                    className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#5E6C8E] font-bold mb-1">
                  {isRtl ? "ملاحظات إضافية" : "Notes"}
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder={
                    isRtl
                      ? "وصل عبر رسائل لينكد إن بعد قراءة دراسة حالة تحسين قاعدة البيانات."
                      : "Reached out via LinkedIn DM after reading the database optimization post."
                  }
                  className="w-full px-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-[#2B3451]"
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
                    ? isRtl ? "جارٍ الحفظ..." : "Saving..."
                    : isRtl ? "حفظ الفرصة" : "Save Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
