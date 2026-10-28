"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Save,
  X,
  Copy,
  Check,
  Eye,
  Edit3,
  Globe,
  Share2,
  Trash2,
  ExternalLink,
  Sparkles,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { updateBlogPost, createBlogPost, deleteBlogPost, toggleBlogPostPublish } from "@/actions/blog-actions"

interface BlogEditorModalProps {
  post?: any | null
  isOpen: boolean
  onClose: () => void
}

export function BlogEditorModal({ post, isOpen, onClose }: BlogEditorModalProps) {
  const router = useRouter()
  const { isRtl } = useLanguage()

  const [activeTab, setActiveTab] = useState<"EDIT" | "PREVIEW">("EDIT")
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [category, setCategory] = useState(post?.category || "TECH")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [content, setContent] = useState(post?.content || "")
  const [tags, setTags] = useState(post?.tags?.join(", ") || "")
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">(post?.status || "DRAFT")
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copiedMd, setCopiedMd] = useState(false)
  const [copiedHtml, setCopiedHtml] = useState(false)

  if (!isOpen) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const tagList = tags.split(",").map((t: string) => t.trim()).filter(Boolean)

    if (post?.id) {
      const res = await updateBlogPost(post.id, {
        title,
        slug,
        category,
        excerpt,
        content,
        tags: tagList,
        status,
      })
      setSaving(false)
      if (res.success) {
        router.refresh()
        onClose()
      } else {
        setError(res.error || "Failed to update post")
      }
    } else {
      const res = await createBlogPost({
        title,
        slug,
        category,
        excerpt,
        content,
        tags: tagList,
        status,
      })
      setSaving(false)
      if (res.success) {
        router.refresh()
        onClose()
      } else {
        setError(res.error || "Failed to create post")
      }
    }
  }

  const copyMarkdown = () => {
    const fullMarkdown = `---
title: "${title}"
slug: "${slug}"
category: "${category}"
excerpt: "${excerpt}"
date: "${new Date().toISOString()}"
author: "Mohammed Katanani"
---

${content}`
    navigator.clipboard.writeText(fullMarkdown)
    setCopiedMd(true)
    setTimeout(() => setCopiedMd(false), 2000)
  }

  const copyHtml = () => {
    // Basic Markdown to HTML conversion for quick copy
    let html = content
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      .replace(/^\> (.*$)/gim, "<blockquote>$1</blockquote>")
      .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*)\*/gim, "<em>$1</em>")
      .replace(/\n\n/gim, "<p></p>")
    navigator.clipboard.writeText(html)
    setCopiedHtml(true)
    setTimeout(() => setCopiedHtml(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white border border-[#D2E5F0] rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D2E5F0] flex items-center justify-between bg-[#F5F9FC]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#0A4D68] text-white flex items-center justify-center font-bold">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-[#2B3451]">
                {post ? (isRtl ? "محرر مقال المدونة" : "Edit Blog Article") : (isRtl ? "كتابة مقال جديد" : "New Blog Article")}
              </h3>
              <p className="text-[11px] text-[#5E6C8E]">
                {isRtl ? "تعديل المحتوى، النسخ كـ Markdown، والنشر المباشر في معرض أعمالك." : "Format article, copy as Markdown, and publish."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Markdown Button */}
            <button
              type="button"
              onClick={copyMarkdown}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer"
              title="نسخ المقال كاملاً بصيغة Markdown مع بيانات الـ Frontmatter"
            >
              {copiedMd ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedMd ? (isRtl ? "تم نسخ الـ Markdown!" : "Markdown Copied!") : "Copy Markdown"}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5E6C8E] hover:text-[#2B3451] hover:bg-white transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab switch (Edit vs Live Preview) */}
        <div className="px-5 pt-3 border-b border-[#D2E5F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("EDIT")}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "EDIT"
                  ? "bg-white text-[#0A4D68] border-b-2 border-[#0A4D68]"
                  : "text-[#5E6C8E] hover:text-[#2B3451]"
              }`}
            >
              ✏️ {isRtl ? "تحرير المقال" : "Editor"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("PREVIEW")}
              className={`px-3 py-1.5 rounded-t-lg text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "PREVIEW"
                  ? "bg-white text-[#0A4D68] border-b-2 border-[#0A4D68]"
                  : "text-[#5E6C8E] hover:text-[#2B3451]"
              }`}
            >
              👁️ {isRtl ? "معاينة القراءة (Preview)" : "Live Preview"}
            </button>
          </div>

          <div className="flex items-center gap-2 pb-2">
            <button
              type="button"
              onClick={() => setStatus((prev) => (prev === "PUBLISHED" ? "DRAFT" : "PUBLISHED"))}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                status === "PUBLISHED"
                  ? "bg-[#E8F2EC] text-[#1E4E30] border-[#A7C8B4]"
                  : "bg-[#F5F9FC] text-[#5E6C8E] border-[#D2E5F0]"
              }`}
            >
              {status === "PUBLISHED" ? (isRtl ? "● منشور (Published)" : "● Published") : (isRtl ? "○ مسودة (Draft)" : "○ Draft")}
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {error}
            </div>
          )}

          {activeTab === "EDIT" ? (
            <form id="blog-form" onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "عنوان المقال الرئيسي:" : "Article Title:"}
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs font-bold text-[#2B3451] focus:outline-none focus:border-[#0A4D68] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "التصنيف (Category):" : "Category:"}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs font-bold text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  >
                    <option value="TECH">💻 تطوير الويب (TECH)</option>
                    <option value="FREELANCE">💼 العمل الحر (FREELANCE)</option>
                    <option value="MARKETING">📈 تسويق ومبيعات (MARKETING)</option>
                    <option value="ECOMMERCE">🛒 تجارة وشوبيفاي (ECOMMERCE)</option>
                    <option value="CASE_STUDY">🛠️ دراسة حالة (CASE_STUDY)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "الرابط اللطيف (Slug):" : "Slug (URL):"}
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="e.g. nextjs-performance-guide"
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] font-mono focus:outline-none focus:border-[#0A4D68]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                    {isRtl ? "الوسوم (مفصولة بفواصل):" : "Tags (comma separated):"}
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Next.js, Upwork, CRO..."
                    className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                  {isRtl ? "مقتطف المقال (Excerpt / SEO Description):" : "Excerpt / Meta Description:"}
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#5E6C8E]">
                    {isRtl ? "محتوى المقال كاملاً (Markdown):" : "Article Content (Markdown):"}
                  </label>
                  <button
                    type="button"
                    onClick={copyHtml}
                    className="text-[11px] text-[#0A4D68] hover:underline font-bold cursor-pointer"
                  >
                    {copiedHtml ? (isRtl ? "تم نسخ الـ HTML!" : "HTML Copied!") : (isRtl ? "نسخ كـ HTML" : "Copy HTML")}
                  </button>
                </div>
                <textarea
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# عنوان المقال..."
                  className="w-full p-3.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] text-xs font-mono text-[#2B3451] leading-relaxed focus:outline-none focus:border-[#0A4D68] focus:bg-white"
                  required
                />
              </div>
            </form>
          ) : (
            /* Live Markdown Reading Preview */
            <div className="p-6 rounded-2xl bg-white border border-[#D2E5F0] space-y-4 max-w-3xl mx-auto shadow-2xs">
              <div className="space-y-2 border-b border-[#D2E5F0] pb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] text-[11px] font-bold">
                  {category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A4D68] leading-tight">
                  {title}
                </h1>
                <p className="text-xs text-[#5E6C8E] leading-relaxed font-medium">
                  {excerpt}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-[#5E6C8E] pt-1">
                  <span>محمد القطناني (thekatanani.com)</span>
                  <span>•</span>
                  <span>5 دقائق قراءة</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-xs text-[#2B3451] leading-relaxed space-y-3 whitespace-pre-line font-sans">
                {content}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#D2E5F0] bg-[#F5F9FC] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#5E6C8E] hover:text-[#2B3451] transition-colors cursor-pointer"
          >
            {isRtl ? "إلغاء" : "Cancel"}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="submit"
              form="blog-form"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>{saving ? (isRtl ? "جارٍ الحفظ..." : "Saving...") : (isRtl ? "حفظ التعديلات" : "Save Changes")}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
