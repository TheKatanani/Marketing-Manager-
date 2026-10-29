import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { novemberArticles } from "../src/lib/editorial/articles"
import type { Post } from "../../../../../../client/katanani-portfolio-nextjs/katanani-portfolio-next/src/data/types"

const targetFile = "D:/client/katanani-portfolio-nextjs/katanani-portfolio-next/src/data/posts.ts"

function markdownToHtml(md: string): string {
  // Simple markdown to clean HTML converter for portfolio body
  const lines = md.trim().split("\n")
  const out: string[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const trimmed = raw.trim()

    if (!trimmed) {
      if (inList) {
        out.push("</ul>")
        inList = false
      }
      continue
    }

    if (trimmed.startsWith("## ")) {
      if (inList) {
        out.push("</ul>")
        inList = false
      }
      out.push(`<h2>${trimmed.slice(3).trim()}</h2>`)
    } else if (trimmed.startsWith("### ")) {
      if (inList) {
        out.push("</ul>")
        inList = false
      }
      out.push(`<h3>${trimmed.slice(4).trim()}</h3>`)
    } else if (trimmed.startsWith("- ")) {
      if (!inList) {
        out.push("<ul>")
        inList = true
      }
      out.push(`  <li>${trimmed.slice(2).trim()}</li>`)
    } else {
      if (inList) {
        out.push("</ul>")
        inList = false
      }
      out.push(`<p>${trimmed}</p>`)
    }
  }

  if (inList) {
    out.push("</ul>")
  }

  return out.join("\n")
}

const categoryMap: Record<string, { key: "strategy" | "nextjs" | "ecommerce" | "design", ar: string, en: string, icon: string, grad: string }> = {
  brief: { key: "strategy", ar: "استراتيجية العمل الحر", en: "Freelance Strategy", icon: "file-text", grad: "g1" },
  rtl: { key: "design", ar: "تصميم وواجهات RTL", en: "RTL & UI Engineering", icon: "palette", grad: "g2" },
  ai: { key: "strategy", ar: "سير عمل الواجهات", en: "Frontend Workflow", icon: "code", grad: "g3" },
  shopify: { key: "ecommerce", ar: "متاجر إلكترونية وشوبيفاي", en: "E-Commerce & Shopify", icon: "shopping-bag", grad: "g4" },
}

const newPosts: Post[] = novemberArticles.map((art, idx) => {
  const meta = categoryMap[art.key] || { key: "strategy", ar: "استراتيجية وتطوير", en: "Strategy & Dev", icon: "code", grad: "g1" }
  return {
    slug: art.slug,
    featured: false,
    order: 20 + idx,
    publishAt: art.scheduledFor,
    categoryKey: meta.key,
    category: { ar: meta.ar, en: meta.en },
    tag: { ar: art.tags[0] || "تطوير الويب", en: art.tags[0] || "Web Development" },
    date: { ar: "نوفمبر 2026", en: "November 2026" },
    readMinutes: 6,
    icon: meta.icon,
    grad: meta.grad,
    image: {
      publicId: art.cover,
      alt: { ar: art.title.ar, en: art.title.en }
    },
    title: { ar: art.title.ar, en: art.title.en },
    excerpt: { ar: art.excerpt.ar, en: art.excerpt.en },
    body: {
      ar: markdownToHtml(art.content.ar),
      en: markdownToHtml(art.content.en)
    }
  }
})

let content = readFileSync(targetFile, "utf-8")

// Remove existing ones if already present to make script idempotent
for (const p of newPosts) {
  const marker = `slug: "${p.slug}"`
  if (content.includes(marker)) {
    console.log(`Post ${p.slug} already present in posts.ts, skipping or replacing.`)
  }
}

// Find export const posts: Post[] = [
const endIdx = content.lastIndexOf("];")
if (endIdx === -1) {
  console.error("Could not find closing bracket of posts array")
  process.exit(1)
}

// Filter out any of the 4 slugs from existing content if re-running
const cleanExisting = content.slice(0, endIdx).trimEnd()

// We'll format the new posts nicely
const serializedNew = newPosts
  .filter(p => !content.includes(`slug: "${p.slug}"`))
  .map(p => "  " + JSON.stringify(p, null, 2).replace(/\n/g, "\n  "))
  .join(",\n")

if (serializedNew.trim().length > 0) {
  const updated = cleanExisting.endsWith(",") 
    ? `${cleanExisting}\n${serializedNew}\n];\n`
    : `${cleanExisting},\n${serializedNew}\n];\n`
  writeFileSync(targetFile, updated, "utf-8")
  console.log(`Successfully added ${newPosts.length} November articles to ${targetFile}`)
} else {
  console.log("All November articles already exist in posts.ts")
}
