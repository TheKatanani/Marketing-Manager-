"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Code, Briefcase, TrendingUp, ShoppingBag, FolderGit2, X, AlertCircle, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { generateAIBlogPostAction } from "@/actions/blog-actions"

interface BlogAIGeneratorModalProps {
  onSuccess?: (post: any) => void
}

export function BlogAIGeneratorModal({ onSuccess }: BlogAIGeneratorModalProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [topic, setTopic] = useState("Next.js vs Shopify: كيف تختار الأداة الأنسب لمشروعك ومتجرك؟")
  const [category, setCategory] = useState("TECH")
  const [language, setLanguage] = useState<"ar" | "en">("ar")
  const [targetLength, setTargetLength] = useState<"short" | "deep">("deep")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const presets: Record<string, string[]> = {
    TECH: [
      "Next.js vs Shopify: كيف تختار الأداة الأنسب لمشروعك ومتجرك؟",
      "أسرار خفض مقياس LCP لأقل من ثانية واحدة وتحسين Core Web Vitals",
      "5 أخطاء شائعة في React و Next.js تقتل سرعة الموقع وتجربة المستخدم",
      "متى تحتاج إلى بناء كود مخصص (Custom Dev) ومتى تكفيك منصة جاهزة؟",
    ],
    FREELANCE: [
      "دليلي للحفاظ على تقييم 5.0 ★ ونسبة نجاح 100% على Upwork وخمسات",
      "كيف تسعّر مشاريع الويب بالقيمة والنتيجة وليس بعدد ساعات العمل",
      "أهم أسباب رفض مقترحات العمل الحر (Proposals) وكيف تجعل العميل يراسلك فوراً",
      "التعامل مع العملاء في المشاريع الكبيرة: كيف تحمي نطاق العمل وتضمن حقوقك",
    ],
    MARKETING: [
      "لا أبيعك تقنية — أبيعك نتيجة: كيف يحول الموقع المصمم باحتراف الزوار إلى عملاء",
      "3 تعديلات بسيطة في صفحة الهبوط (Landing Page) تضاعف مبيعاتك واستفساراتك",
      "لماذا يتفوق زر الواتساب المباشر على نماذج الاتصال التقليدية في السوق العربي؟",
      "السرعة ليست رفاهية: كيف تؤثر كل ثانية تأخير على مبيعاتك وأرباحك",
    ],
    ECOMMERCE: [
      "بناء متجر شوبيفاي متكامل مع أتمتة الواتساب ونظام الضمان: درس تطبيقي",
      "كيف تقلل نسبة التخلي عن سلة الشراء (Cart Abandonment) في المتاجر العربية",
      "تكامل المتاجر الإلكترونية مع أنظمة المخزون مثل Zoho و ERP",
    ],
  }

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!topic.trim()) return

    setLoading(true)
    setError(null)

    const res = await generateAIBlogPostAction({
      topic,
      category,
      language,
      targetLength,
    })

    setLoading(false)

    if (res.success && res.blogPost) {
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setIsOpen(false)
        if (onSuccess) onSuccess(res.blogPost)
        router.refresh()
      }, 1000)
    } else {
      setError(res.error || (isRtl ? "فشل توليد المقال" : "Failed to generate blog post"))
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A4D68] hover:bg-[#07384C] text-white text-xs font-bold transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
      >
        <Sparkles className="h-4 w-4" />
        <span>{isRtl ? "توليد مقال ذكي للمدونة ⚡" : "Generate AI Blog Post ⚡"}</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[#5E6C8E] hover:text-[#2B3451] p-1 rounded-lg hover:bg-[#F5F9FC] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isRtl ? "كاتب المقالات المتعمقة الذكي" : "In-Depth Article Writer"}</span>
              </div>
              <h2 className="text-lg font-bold text-[#2B3451] tracking-tight">
                {isRtl ? "توليد مقال كامل لمدونة معرض أعمالك" : "Generate Portfolio Blog Article"}
              </h2>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "يقوم الذكاء الاصطناعي بصياغة مقال متكامل (العنوان، المقتطف، نص الماركداون الغني، والأمثلة العملية) بأسلوبك وخبراتك."
                  : "Generates a complete, structured article with markdown formatting, SEO title, excerpt, and actionable takeaways."}
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
                <span>{isRtl ? "تم توليد وحفظ المقال بنجاح في المدونة!" : "Article generated & saved to blog!"}</span>
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              {/* Category Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#5E6C8E]">
                  {isRtl ? "اختر تصنيف المقال:" : "Select Category:"}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "TECH", label: isRtl ? "💻 تطوير الويب" : "Web Dev" },
                    { id: "FREELANCE", label: isRtl ? "💼 العمل الحر" : "Freelance" },
                    { id: "MARKETING", label: isRtl ? "📈 تسويق ومبيعات" : "Marketing" },
                    { id: "ECOMMERCE", label: isRtl ? "🛒 تجارة إلكترونية" : "E-Commerce" },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setCategory(cat.id)
                        const list = presets[cat.id]
                        if (list && list.length > 0) setTopic(list[0])
                      }}
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

              {/* Topic Preset Chips */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-[#5E6C8E]">
                  {isRtl ? "مواضيع مقترحة بنقرة واحدة:" : "Preset Inspiration Topics:"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {presets[category]?.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(p)}
                      className={`text-xs px-2.5 py-1 rounded-lg border text-right transition-all cursor-pointer ${
                        topic === p
                          ? "bg-[#0A4D68] text-white border-[#0A4D68] font-bold shadow-2xs"
                          : "bg-[#F5F9FC] text-[#2B3451] border-[#D2E5F0] hover:bg-white hover:border-[#0A4D68]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Topic Input */}
              <div>
                <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                  {isRtl ? "عنوان أو فكرة المقال:" : "Article Topic / Core Angle:"}
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={isRtl ? "اكتب فكرة المقال بالتفصيل..." : "Enter article title or angle..."}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs font-medium text-[#2B3451] focus:outline-none focus:border-[#0A4D68] focus:bg-white"
                  required
                />
              </div>

              {/* Options: Language & Length */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "لغة المقال:" : "Language:"}
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as "ar" | "en")}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  >
                    <option value="ar">العربية (Arabic) 🇸🇦</option>
                    <option value="en">English (الإنجليزية) 🌐</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "عمق وتفصيل المقال:" : "Depth & Length:"}
                  </label>
                  <select
                    value={targetLength}
                    onChange={(e) => setTargetLength(e.target.value as "short" | "deep")}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  >
                    <option value="deep">{isRtl ? "مقال متعمق كامل (~1400 كلمة)" : "In-depth Guide (~1400w)"}</option>
                    <option value="short">{isRtl ? "مقال مركز سريع (~800 كلمة)" : "Focused Article (~800w)"}</option>
                  </select>
                </div>
              </div>

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
                  disabled={loading || success || !topic.trim()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{loading ? (isRtl ? "جارٍ كتابة وتنسيق المقال..." : "Writing Article...") : (isRtl ? "توليد المقال الآن ⚡" : "Generate Article ⚡")}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
