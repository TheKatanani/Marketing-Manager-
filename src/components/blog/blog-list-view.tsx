"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Copy,
  Check,
  Edit,
  Trash2,
  ExternalLink,
  Sparkles,
  Clock,
  Eye,
  CheckCircle2,
} from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { BlogAIGeneratorModal } from "./blog-ai-generator-modal"
import { BlogEditorModal } from "./blog-editor-modal"
import { toggleBlogPostPublish, deleteBlogPost } from "@/actions/blog-actions"

interface BlogPostItem {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  readTimeMinutes: number
  tags: string[]
  status: string
  publishedAt: Date | string | null
  createdAt: Date | string
}

interface BlogListViewProps {
  posts: BlogPostItem[]
}

export function BlogListView({ posts }: BlogListViewProps) {
  const router = useRouter()
  const { t, isRtl } = useLanguage()

  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const [selectedStatus, setSelectedStatus] = useState("ALL")
  const [search, setSearch] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [editingPost, setEditingPost] = useState<BlogPostItem | null>(null)
  const [isNewModalOpen, setIsNewModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const categories = [
    { id: "ALL", labelAr: "الكل", labelEn: "All Posts" },
    { id: "TECH", labelAr: "💻 تطوير الويب", labelEn: "Web Dev" },
    { id: "FREELANCE", labelAr: "💼 العمل الحر", labelEn: "Freelancing" },
    { id: "MARKETING", labelAr: "📈 تسويق ومبيعات", labelEn: "Marketing & CRO" },
    { id: "ECOMMERCE", labelAr: "🛒 تجارة وشوبيفاي", labelEn: "E-Commerce" },
    { id: "CASE_STUDY", labelAr: "🛠️ دراسات حالة", labelEn: "Case Studies" },
  ]

  const filteredPosts = posts.filter((p) => {
    if (selectedCategory !== "ALL" && p.category !== selectedCategory) return false
    if (selectedStatus !== "ALL" && p.status !== selectedStatus) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return true
  })

  const copyMarkdown = (post: BlogPostItem) => {
    const md = `---
title: "${post.title}"
slug: "${post.slug}"
category: "${post.category}"
excerpt: "${post.excerpt}"
readTime: ${post.readTimeMinutes}
author: "Mohammed Katanani"
website: "thekatanani.com"
---

${post.content}`
    navigator.clipboard.writeText(md)
    setCopiedId(post.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleTogglePublish = async (id: string) => {
    await toggleBlogPostPublish(id)
    router.refresh()
  }

  const handleDelete = async (id: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف هذا المقال؟" : "Are you sure you want to delete this post?")) {
      setDeletingId(id)
      await deleteBlogPost(id)
      setDeletingId(null)
      router.refresh()
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D2E5F0]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF4F9] border border-[#D2E5F0] text-[#0A4D68] text-xs font-bold mb-1">
            <BookOpen className="h-3.5 w-3.5" />
            <span>{isRtl ? "مدونة معرض الأعمال (thekatanani.com)" : "Portfolio Blog & Article Manager"}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2B3451] tracking-tight">
            {isRtl ? "مقالات ومدونة البورتفوليو" : "Portfolio Blog Articles"}
          </h1>
          <p className="text-xs text-[#5E6C8E] max-w-2xl leading-relaxed">
            {isRtl
              ? "اكتب وأدر مقالات مدونتك حسب التصنيف، مع إمكانية التوليد الذكي والنسخ كـ Markdown جاهز للنشر في موقعك."
              : "Draft, categorize, and generate full blog posts. Copy as clean Markdown to paste into your portfolio repository."}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#F5F9FC] text-[#2B3451] border border-[#D2E5F0] transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>{isRtl ? "+ كتابة مقال يدوي" : "+ New Article"}</span>
          </button>

          <BlogAIGeneratorModal />
        </div>
      </div>

      {/* Category Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#0A4D68] text-white shadow-2xs"
                  : "bg-white border border-[#D2E5F0] text-[#5E6C8E] hover:text-[#2B3451] hover:bg-[#F5F9FC]"
              }`}
            >
              {isRtl ? cat.labelAr : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="h-3.5 w-3.5 text-[#5E6C8E] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={isRtl ? "بحث في المقالات..." : "Search articles..."}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
          />
        </div>
      </div>

      {/* Blog Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-white border border-[#D2E5F0] space-y-4 shadow-2xs">
            <div className="h-12 w-12 rounded-full bg-[#EBF4F9] text-[#0A4D68] flex items-center justify-center mx-auto">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-sm font-bold text-[#2B3451]">
                {isRtl ? "لا توجد مقالات في هذا التصنيف حالياً" : "No articles found in this category"}
              </h3>
              <p className="text-xs text-[#5E6C8E]">
                {isRtl
                  ? "ابدأ بتوليد مقال متعمق بنقرة واحدة عبر الذكاء الاصطناعي أو اكتب مقالك يدوياً."
                  : "Generate your first comprehensive article with AI or write one manually."}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <BlogAIGeneratorModal />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white border border-[#D2E5F0] rounded-2xl p-5 hover:border-[#0A4D68]/40 hover:shadow-xs transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0]">
                      {post.category}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleTogglePublish(post.id)}
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border transition-colors cursor-pointer ${
                        post.status === "PUBLISHED"
                          ? "bg-[#E8F2EC] text-[#1E4E30] border-[#A7C8B4]"
                          : "bg-[#F5F9FC] text-[#5E6C8E] border-[#D2E5F0]"
                      }`}
                      title={isRtl ? "اضغط لتبديل حالة النشر" : "Click to toggle publish status"}
                    >
                      {post.status === "PUBLISHED"
                        ? isRtl ? "● منشور في الموقع" : "● Published"
                        : isRtl ? "○ مسودة" : "○ Draft"}
                    </button>

                    <span className="text-[11px] text-[#5E6C8E] flex items-center gap-1 font-medium">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTimeMinutes || 5} {isRtl ? "دقائق قراءة" : "min read"}</span>
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    {/* Copy Markdown */}
                    <button
                      type="button"
                      onClick={() => copyMarkdown(post)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#0A4D68] border border-[#D2E5F0] transition-colors cursor-pointer"
                      title="نسخ المقال كاملاً بصيغة Markdown للنشر في thekatanani.com"
                    >
                      {copiedId === post.id ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedId === post.id ? (isRtl ? "تم النسخ!" : "Copied!") : "Copy MD"}</span>
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => setEditingPost(post)}
                      className="p-1.5 rounded-lg bg-[#F5F9FC] hover:bg-[#EBF4F9] text-[#2B3451] border border-[#D2E5F0] transition-colors cursor-pointer"
                      title={isRtl ? "تعديل ومعاينة المقال" : "Edit & Preview"}
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="p-1.5 rounded-lg bg-[#F5F9FC] hover:bg-rose-50 text-[#5E6C8E] hover:text-rose-600 border border-[#D2E5F0] transition-colors cursor-pointer"
                      title={isRtl ? "حذف المقال" : "Delete"}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3
                    onClick={() => setEditingPost(post)}
                    className="text-base font-bold text-[#2B3451] hover:text-[#0A4D68] cursor-pointer transition-colors"
                  >
                    {post.title}
                  </h3>
                  <p className="text-xs text-[#5E6C8E] leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-[#F5F9FC] text-[#5E6C8E] border border-[#D2E5F0]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal for existing post */}
      {editingPost && (
        <BlogEditorModal
          post={editingPost}
          isOpen={Boolean(editingPost)}
          onClose={() => setEditingPost(null)}
        />
      )}

      {/* Editor Modal for new post */}
      {isNewModalOpen && (
        <BlogEditorModal
          isOpen={isNewModalOpen}
          onClose={() => setIsNewModalOpen(false)}
        />
      )}
    </div>
  )
}
