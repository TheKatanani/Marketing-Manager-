"use client"

import { useState, useRef } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  Check,
  Sparkles,
  LayoutGrid,
  Square,
  Share2,
  Bookmark,
  Layers,
  Image as ImageIcon,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { buildUnifiedInstagramArtPrompt } from "@/lib/ai/prompts"

export interface SlideItem {
  slideNumber: number
  title: string
  bodyText: string
  visualCue?: string
}

interface InstagramSlideCanvasProps {
  slides: SlideItem[]
  caption?: string
  hashtags?: string[]
  topicTitle?: string
  masterImagePrompt?: string
}

export function InstagramSlideCanvas({
  slides,
  caption,
  hashtags,
  topicTitle = "Carousel Masterclass",
  masterImagePrompt,
}: InstagramSlideCanvasProps) {
  const { isRtl } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<"SINGLE" | "GRID">("SINGLE")
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedSlide, setCopiedSlide] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const currentSlide = slides[currentIndex] || slides[0]
  const totalSlides = slides.length

  const finalMasterPrompt =
    masterImagePrompt ||
    buildUnifiedInstagramArtPrompt({
      topic: topicTitle,
      slideCount: totalSlides,
      slides,
    })

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(finalMasterPrompt)
    setCopiedPrompt(true)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const copyCurrentSlideText = () => {
    if (!currentSlide) return
    const text = `[شريحة ${currentSlide.slideNumber}/${totalSlides}: ${currentSlide.title}]\n\n${currentSlide.bodyText}`
    navigator.clipboard.writeText(text)
    setCopiedSlide(true)
    setTimeout(() => setCopiedSlide(false), 2000)
  }

  // HTML5 Canvas direct client-side PNG generator
  const downloadSlideAsImage = (slide: SlideItem) => {
    try {
      setDownloading(true)
      const canvas = document.createElement("canvas")
      const size = 1080
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, size, size)
      grad.addColorStop(0, "#0A4D68")
      grad.addColorStop(1, "#052634")
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, size, size)

      // Decorative geometric border
      ctx.strokeStyle = "rgba(210, 229, 240, 0.25)"
      ctx.lineWidth = 12
      ctx.strokeRect(36, 36, size - 72, size - 72)

      // Top Brand Header
      ctx.fillStyle = "#D2E5F0"
      ctx.font = "bold 32px 'Segoe UI', Tahoma, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("محمد القطناني | thekatanani.com", 70, 110)

      // Slide Badge
      ctx.fillStyle = "rgba(210, 229, 240, 0.15)"
      ctx.fillRect(size - 220, 72, 150, 52)
      ctx.fillStyle = "#D2E5F0"
      ctx.font = "bold 26px 'Segoe UI', Tahoma, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${slide.slideNumber} / ${totalSlides}`, size - 145, 108)

      // Visual Cue Tag (if exists)
      if (slide.visualCue) {
        ctx.fillStyle = "#A7C8B4"
        ctx.font = "600 24px 'Segoe UI', Tahoma, sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(`• ${slide.visualCue.slice(0, 45)}`, 70, 200)
      }

      // Slide Title
      ctx.fillStyle = "#FFFFFF"
      ctx.font = "bold 58px 'Segoe UI', Tahoma, sans-serif"
      ctx.textAlign = "left"

      // Simple text wrap for title
      const titleWords = slide.title.split(" ")
      let line = ""
      let y = 310
      for (let n = 0; n < titleWords.length; n++) {
        const testLine = line + titleWords[n] + " "
        const metrics = ctx.measureText(testLine)
        if (metrics.width > size - 140 && n > 0) {
          ctx.fillText(line, 70, y)
          line = titleWords[n] + " "
          y += 75
        } else {
          line = testLine
        }
      }
      ctx.fillText(line, 70, y)

      // Separator line
      y += 40
      ctx.strokeStyle = "rgba(185, 174, 216, 0.4)"
      ctx.lineWidth = 4
      ctx.beginPath()
      ctx.moveTo(70, y)
      ctx.lineTo(240, y)
      ctx.stroke()

      // Slide Body Text
      y += 70
      ctx.fillStyle = "#D2E5F0"
      ctx.font = "400 34px 'Segoe UI', Tahoma, sans-serif"
      const bodyLines = slide.bodyText.split("\n")
      for (const rawLine of bodyLines) {
        const words = rawLine.split(" ")
        let bLine = ""
        for (let i = 0; i < words.length; i++) {
          const test = bLine + words[i] + " "
          if (ctx.measureText(test).width > size - 150 && i > 0) {
            ctx.fillText(bLine, 70, y)
            bLine = words[i] + " "
            y += 50
          } else {
            bLine = test
          }
        }
        ctx.fillText(bLine, 70, y)
        y += 50
      }

      // Bottom Bar
      ctx.fillStyle = "#A7C8B4"
      ctx.font = "600 28px 'Segoe UI', Tahoma, sans-serif"
      ctx.textAlign = "left"
      ctx.fillText("أبني لك الموقع الصحيح بالأداة الصحيحة", 70, size - 80)

      ctx.fillStyle = "rgba(210, 229, 240, 0.6)"
      ctx.font = "500 24px 'Segoe UI', Tahoma, sans-serif"
      ctx.textAlign = "right"
      ctx.fillText("Save & Share 🔖", size - 70, size - 80)

      // Download trigger
      const link = document.createElement("a")
      link.download = `katanani-slide-${slide.slideNumber}.png`
      link.href = canvas.toDataURL("image/png")
      link.click()
      setDownloading(false)
    } catch (e) {
      console.error("Canvas export failed:", e)
      setDownloading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-[#D2E5F0] shadow-2xs">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-[#EBF4F9] text-[#0A4D68]">
            <ImageIcon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#2B3451]">
              {isRtl ? "معاين ومصدر شرائح إنستغرام الذكي" : "Visual Instagram Slide Studio"}
            </h4>
            <p className="text-[11px] text-[#5E6C8E]">
              {isRtl
                ? `${totalSlides} شرائح مصممة بهوية thekatanani جاهزة للمعاينة والتحميل.`
                : `${totalSlides} on-brand slides ready to preview and export as PNG.`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle View Mode */}
          <button
            type="button"
            onClick={() => setViewMode((prev) => (prev === "SINGLE" ? "GRID" : "SINGLE"))}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer"
          >
            {viewMode === "SINGLE" ? (
              <>
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{isRtl ? "عرض كل الشرائح (شبكة)" : "Grid View"}</span>
              </>
            ) : (
              <>
                <Square className="h-3.5 w-3.5" />
                <span>{isRtl ? "عرض شريحة واحدة" : "Single Slide"}</span>
              </>
            )}
          </button>

          {/* Master AI Image Prompt Copy */}
          <button
            type="button"
            onClick={copyPrompt}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#EFEAF7] hover:bg-[#e0d6f0] text-[#3C2F5E] border border-[#B9AED8] transition-colors cursor-pointer"
            title="نسخ برومبت صور موحد لجميع الشرائح للاستخدام في Midjourney / DALL-E"
          >
            {copiedPrompt ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-700">{isRtl ? "تم نسخ البرومبت!" : "Prompt Copied!"}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" />
                <span>{isRtl ? "نسخ برومبت الصور الموحد" : "Copy Master Image Prompt"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Single Slide Interactive Canvas View */}
      {viewMode === "SINGLE" && (
        <div className="space-y-3">
          <div className="relative mx-auto max-w-md w-full aspect-square rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-lg overflow-hidden border border-[#D2E5F0]/30 select-none bg-gradient-to-br from-[#0A4D68] via-[#083b50] to-[#041c26] text-white">
            {/* Geometric luxury background accents */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-[#D2E5F0]/15 via-transparent to-transparent pointer-events-none rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-[#A7C8B4]/15 via-transparent to-transparent pointer-events-none rounded-tr-full" />

            {/* Slide Header */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-[#D2E5F0] text-[#0A4D68] flex items-center justify-center font-extrabold text-xs shadow-2xs">
                  MK
                </div>
                <div className="text-[11px] font-bold text-[#D2E5F0] tracking-wide">
                  thekatanani.com
                </div>
              </div>

              <div className="px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-[11px] font-bold text-white">
                {currentSlide.slideNumber} / {totalSlides}
              </div>
            </div>

            {/* Slide Content Body */}
            <div className="relative z-10 space-y-3 my-auto py-4">
              {currentSlide.visualCue && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#A7C8B4]/20 border border-[#A7C8B4]/40 text-[#A7C8B4] text-[10px] font-bold">
                  <span>{currentSlide.visualCue}</span>
                </div>
              )}

              <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight tracking-tight">
                {currentSlide.title}
              </h3>

              <div className="h-0.5 w-16 bg-[#B9AED8]/60 rounded-full" />

              <p className="text-xs sm:text-sm text-[#D2E5F0] leading-relaxed whitespace-pre-line font-medium">
                {currentSlide.bodyText}
              </p>
            </div>

            {/* Slide Footer */}
            <div className="relative z-10 flex items-center justify-between pt-3 border-t border-white/15 text-[10px] text-[#A7C8B4] font-semibold">
              <div className="flex items-center gap-1">
                <span>محمد القطناني</span>
                <span>•</span>
                <span>أبني لك الموقع بالأداة الصحيحة</span>
              </div>
              <div className="flex items-center gap-1 text-[#D2E5F0]/70">
                <Bookmark className="h-3 w-3" />
                <span>حفظ ومشاركة</span>
              </div>
            </div>
          </div>

          {/* Navigation & Download Bar */}
          <div className="max-w-md mx-auto flex items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer shadow-2xs"
                title={isRtl ? "الشريحة السابقة" : "Previous slide"}
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded-xl bg-white hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer shadow-2xs"
                title={isRtl ? "الشريحة التالية" : "Next slide"}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Slide dots */}
              <div className="flex items-center gap-1 px-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? "w-5 bg-[#0A4D68]" : "w-2 bg-[#D2E5F0] hover:bg-[#B9AED8]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={copyCurrentSlideText}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-[#F5F9FC] text-[#5E6C8E] border border-[#D2E5F0] transition-colors cursor-pointer"
              >
                {copiedSlide ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedSlide ? (isRtl ? "تم النسخ" : "Copied") : (isRtl ? "نسخ النص" : "Copy")}</span>
              </button>

              <button
                type="button"
                onClick={() => downloadSlideAsImage(currentSlide)}
                disabled={downloading}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>{downloading ? (isRtl ? "جارٍ التحميل..." : "Exporting...") : (isRtl ? "تحميل كصورة PNG" : "Download PNG")}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid View: All Slides Laid Out */}
      {viewMode === "GRID" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {slides.map((s, idx) => (
            <div
              key={s.slideNumber || idx}
              className="aspect-square rounded-2xl p-5 flex flex-col justify-between shadow-sm border border-[#D2E5F0]/30 select-none bg-gradient-to-br from-[#0A4D68] via-[#083b50] to-[#041c26] text-white relative group"
            >
              <div className="flex items-center justify-between border-b border-white/15 pb-2 text-[10px]">
                <span className="font-bold text-[#D2E5F0]">thekatanani.com</span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 font-bold">
                  {s.slideNumber} / {totalSlides}
                </span>
              </div>

              <div className="space-y-1.5 py-2">
                <h4 className="text-sm font-bold text-white line-clamp-2">{s.title}</h4>
                <p className="text-[11px] text-[#D2E5F0] line-clamp-4 leading-relaxed font-normal">
                  {s.bodyText}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/15">
                <span className="text-[9px] text-[#A7C8B4] font-medium">محمد القطناني</span>
                <button
                  type="button"
                  onClick={() => downloadSlideAsImage(s)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  title="تحميل هذه الشريحة كصورة PNG"
                >
                  <Download className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Master Art Prompt Card Preview */}
      <div className="p-3.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[#0A4D68] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isRtl ? "برومبت الصور الموحد (لـ Midjourney / DALL-E / Flux):" : "Unified Master Image Prompt:"}</span>
          </span>
          <button
            type="button"
            onClick={copyPrompt}
            className="text-[11px] font-bold text-[#0A4D68] hover:underline cursor-pointer"
          >
            {copiedPrompt ? (isRtl ? "تم النسخ!" : "Copied!") : (isRtl ? "نسخ البرومبت" : "Copy Prompt")}
          </button>
        </div>
        <p className="text-[#5E6C8E] text-[11px] font-mono leading-relaxed bg-white p-2.5 rounded-lg border border-[#D2E5F0]">
          {finalMasterPrompt}
        </p>
      </div>
    </div>
  )
}
