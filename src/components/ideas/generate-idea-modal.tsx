"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { generateFlexibleIdeasAction } from "@/actions/content-actions"
import { Sparkles, Code, Briefcase, TrendingUp, FolderGit2, PenLine, AlertCircle, CheckCircle, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface GenerateIdeaModalProps {
  projects: { id: string; title: string; projectContext: string; isFeatured: boolean }[]
}

type IdeaCategory = "TECH_TIP" | "FREELANCE_ADVICE" | "MARKETING_CRO" | "PROJECT_STORY" | "CUSTOM"

export function GenerateIdeaModal({ projects }: GenerateIdeaModalProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState<IdeaCategory>("TECH_TIP")
  const [customTopic, setCustomTopic] = useState("")
  const [selectedProjectId, setSelectedProjectId] = useState(projects[0]?.id || "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await generateFlexibleIdeasAction({
      category,
      customTopic: customTopic.trim() || undefined,
      projectId: category === "PROJECT_STORY" ? selectedProjectId : undefined,
    })

    setLoading(false)

    if (res.success) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setIsOpen(false)
        router.refresh()
      }, 1000)
    } else {
      setError(res.error || (isRtl ? "فشل توليد الأفكار." : "Failed to generate ideas."))
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
      >
        <Sparkles className="h-4 w-4" />
        <span>{isRtl ? "+ توليد أفكار وزوايا جديدة" : "+ Generate New Ideas"}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#5E6C8E] hover:text-[#2B3451] p-1 rounded-lg hover:bg-[#F5F9FC] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isRtl ? "مستخرج الأفكار الذكي" : "AI Idea Lab"}</span>
              </div>
              <h2 className="text-lg font-bold text-[#2B3451] tracking-tight">
                {isRtl ? "توليد أفكار المحتوى وزوايا الطرح" : "Generate Content Ideas & Angles"}
              </h2>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "اختر نوع المحتوى الذي تود توليد أفكار عنه: نصائح برمجية، أسرار العمل الحر، تسويق، أو دروس من مشاريعك."
                  : "Pick a content pillar to generate 3 actionable hooks and engagement angles."}
              </p>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 rounded-lg bg-[#E8F2EC] border border-[#A7C8B4] text-[#1E4E30] text-xs flex items-center gap-2 font-bold">
                <CheckCircle className="h-4 w-4 shrink-0 text-[#1E4E30]" />
                <span>{isRtl ? "تمت إضافة الأفكار بنجاح إلى بنك الأفكار!" : "Ideas generated & saved to bank!"}</span>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Category selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5E6C8E]">
                  {isRtl ? "اختر تصنيف الأفكار:" : "Select Category:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: "TECH_TIP" as IdeaCategory, label: isRtl ? "💻 نصائح برمجية" : "Tech Tips" },
                    { id: "FREELANCE_ADVICE" as IdeaCategory, label: isRtl ? "💼 العمل الحر" : "Freelancing" },
                    { id: "MARKETING_CRO" as IdeaCategory, label: isRtl ? "📈 تسويق ومبيعات" : "Marketing & CRO" },
                    { id: "PROJECT_STORY" as IdeaCategory, label: isRtl ? "🛠️ دراسة حالة" : "Project Story" },
                    { id: "CUSTOM" as IdeaCategory, label: isRtl ? "✍️ موضوع مخصص" : "Custom Topic" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center cursor-pointer ${
                        category === cat.id
                          ? "bg-[#0A4D68] text-white border-[#0A4D68] shadow-2xs"
                          : "bg-[#F5F9FC] text-[#5E6C8E] border-[#D2E5F0] hover:bg-white hover:text-[#2B3451]"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {category === "PROJECT_STORY" && (
                <div>
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1.5">
                    {isRtl ? "اختر دراسة الحالة المرجعية من thekatanani.com:" : "Select Source Case Study:"}
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  >
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {category === "CUSTOM" && (
                <div>
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1.5">
                    {isRtl ? "اكتب الموضوع الذي تريد أفكاراً حوله:" : "Topic description:"}
                  </label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder={isRtl ? "مثلاً: نصائح لأول مقابلة عمل ريموت كمطور Next.js..." : "e.g. Tips for landing your first remote Next.js role..."}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                    required
                  />
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-bold text-[#5E6C8E] hover:text-[#2B3451] transition-colors cursor-pointer"
                >
                  {isRtl ? "إلغاء" : "Cancel"}
                </button>

                <button
                  type="submit"
                  disabled={loading || success}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>
                    {loading
                      ? isRtl ? "جارٍ التوليد..." : "Generating..."
                      : isRtl ? "توليد 3 أفكار جديدة" : "Generate 3 Ideas"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
