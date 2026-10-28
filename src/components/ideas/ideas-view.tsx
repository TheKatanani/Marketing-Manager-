"use client"

import { useState } from "react"
import { IdeaCard } from "@/components/ideas/idea-card"
import { GenerateIdeaModal } from "@/components/ideas/generate-idea-modal"
import { Sparkles, Lightbulb, Filter } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

interface IdeasViewProps {
  ideas: any[]
  projects: any[]
}

export function IdeasView({ ideas, projects }: IdeasViewProps) {
  const { t, isRtl } = useLanguage()
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL")

  const filteredIdeas = ideas.filter((idea) => {
    if (selectedFilter === "ALL") return true
    if (selectedFilter === "TECH") {
      return (
        idea.contentPillar?.includes("برمج") ||
        idea.contentPillar?.includes("تقني") ||
        idea.contentPillar?.includes("TECH") ||
        idea.title?.toLowerCase().includes("next") ||
        idea.title?.toLowerCase().includes("react")
      )
    }
    if (selectedFilter === "FREELANCE") {
      return (
        idea.contentPillar?.includes("حر") ||
        idea.contentPillar?.includes("FREELANCE") ||
        idea.title?.includes("Upwork") ||
        idea.title?.includes("خمسات") ||
        idea.title?.includes("تسعير")
      )
    }
    if (selectedFilter === "MARKETING") {
      return (
        idea.contentPillar?.includes("تسويق") ||
        idea.contentPillar?.includes("CRO") ||
        idea.contentPillar?.includes("مبيعات") ||
        idea.title?.includes("تحويل") ||
        idea.title?.includes("هبوط")
      )
    }
    if (selectedFilter === "PROJECTS") {
      return Boolean(idea.projectId)
    }
    return true
  })

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isRtl ? "بنك الأفكار وزوايا الطرح" : "AI Idea Lab & Angle Bank"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {t.ideasTitle}
          </h1>
          <p className="text-xs text-[#5E6C8E] mt-1 max-w-2xl leading-relaxed">
            {isRtl
              ? "مكتبة من الأفكار والخطافات المقترحة لنصائحك البرمجية، خبرات العمل الحر، واستراتيجيات التسويق."
              : "Repository of ideas, hooks, and content angles ready to be converted into multi-platform posts."}
          </p>
        </div>

        <GenerateIdeaModal projects={projects} />
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "ALL", labelAr: "الكل", labelEn: "All Ideas", count: ideas.length },
          { id: "TECH", labelAr: "💻 نصائح برمجية", labelEn: "Tech Tips" },
          { id: "FREELANCE", labelAr: "💼 العمل الحر", labelEn: "Freelancing" },
          { id: "MARKETING", labelAr: "📈 تسويق ومبيعات", labelEn: "Marketing & CRO" },
          { id: "PROJECTS", labelAr: "🛠️ دراسات حالة", labelEn: "Case Studies" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? "bg-[#0A4D68] text-white shadow-2xs"
                : "bg-white border border-[#D2E5F0] text-[#5E6C8E] hover:text-[#2B3451] hover:bg-[#F5F9FC]"
            }`}
          >
            {isRtl ? tab.labelAr : tab.labelEn}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="space-y-4">
        {filteredIdeas.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
            <div className="h-12 w-12 rounded-full bg-[#EFEAF7] text-[#3C2F5E] flex items-center justify-center mx-auto">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#2B3451]">
                {isRtl ? "لا توجد أفكار في هذا التصنيف حالياً" : "No ideas in this category yet"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "اضغط على زر '+ توليد أفكار وزوايا جديدة' لإضافة أفكار فوراً."
                  : "Click '+ Generate New Ideas' to create ideas for this topic."}
              </p>
            </div>
            <GenerateIdeaModal projects={projects} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
