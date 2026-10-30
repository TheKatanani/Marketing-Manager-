import { prisma } from "@/lib/prisma"
import { novemberPack } from "./november-2026"
export const NOVEMBER_REVISION = "2026-10-29-engineering-v2"

let schemaEnsured = false

export async function ensureDatabaseSchema() {
  if (schemaEnsured) return
  try {
    const statements = [
      `ALTER TABLE "Campaign" ADD COLUMN IF NOT EXISTS "planKey" TEXT;`,
      `ALTER TABLE "Campaign" ADD COLUMN IF NOT EXISTS "strategy" TEXT;`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "Campaign_userId_planKey_key" ON "Campaign"("userId", "planKey");`,

      `ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "sourceType" TEXT DEFAULT 'STANDALONE';`,
      `ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "sourceUrl" TEXT;`,
      `ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "sourceLabel" TEXT;`,
      `ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "articleId" TEXT;`,
      `ALTER TABLE "Post" ADD COLUMN IF NOT EXISTS "weekTheme" TEXT;`,

      `ALTER TABLE "PostVersion" ADD COLUMN IF NOT EXISTS "language" TEXT DEFAULT 'ar';`,
      `ALTER TABLE "PostVersion" ADD COLUMN IF NOT EXISTS "scheduledFor" TIMESTAMP(3);`,
      `ALTER TABLE "PostVersion" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3);`,
      `ALTER TABLE "PostVersion" ADD COLUMN IF NOT EXISTS "publishedUrl" TEXT;`,
      `ALTER TABLE "PostVersion" ADD COLUMN IF NOT EXISTS "assetPaths" TEXT;`,

      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "campaignId" TEXT;`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "language" TEXT DEFAULT 'ar';`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "canonicalUrl" TEXT;`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "coverImage" TEXT;`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "scheduledFor" TIMESTAMP(3);`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "seoTitle" TEXT;`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "seoDescription" TEXT;`,
      `ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "sources" TEXT;`,
      `CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_userId_slug_key" ON "BlogPost"("userId", "slug");`,
    ]

    for (const sql of statements) {
      await prisma.$executeRawUnsafe(sql).catch(() => {})
    }
    schemaEnsured = true
  } catch (err) {
    console.warn("[service] Schema ensure notice:", err)
  }
}

export async function importNovemberPack(userId: string) {
  await ensureDatabaseSchema()
  return prisma.$transaction(async tx => {
    const p=novemberPack
    const campaignContent={name:p.name,objective:p.objective,strategy:JSON.stringify({...p.strategy,revision:NOVEMBER_REVISION})}
    const campaign=await tx.campaign.upsert({where:{userId_planKey:{userId,planKey:p.key}},update:campaignContent,create:{userId,planKey:p.key,...campaignContent,startDate:new Date(p.startsAt),endDate:new Date(p.endsAt),status:"PLANNING"}})
    const articles=new Map<string,string>()
    for(const a of p.articles) for(const lang of ["ar","en"] as const) {
      const content={campaignId:campaign.id,title:a.title[lang],excerpt:a.excerpt[lang],content:a.content[lang],language:lang,category:a.category,tags:JSON.stringify(a.tags),canonicalUrl:`https://thekatanani.com/${lang}/blog/${a.slug}`,coverImage:a.cover,readTimeMinutes:Math.max(3,Math.ceil(a.content[lang].split(/\s+/).length/180)),seoTitle:a.title[lang],seoDescription:a.excerpt[lang],sources:JSON.stringify(a.sources)}
      const saved=await tx.blogPost.upsert({where:{userId_slug:{userId,slug:`${a.slug}-${lang}`}},update:content,create:{userId,slug:`${a.slug}-${lang}`,...content,scheduledFor:new Date(a.scheduledFor),status:"PLANNED"}})
      articles.set(`${a.key}-${lang}`,saved.id)
    }
    for(const t of p.topics) {
      const id=`nov26-${userId}-${t.key}`
      const content={campaignId:campaign.id,title:t.title,weekTheme:t.theme,sourceType:t.sourceType,sourceUrl:t.sourceUrl??null,sourceLabel:t.sourceLabel??null,articleId:t.articleKey?articles.get(`${t.articleKey}-${t.versions[0].language}`)??null:null}
      await tx.post.upsert({where:{id},update:content,create:{id,userId,...content,status:"PLANNED",scheduledFor:new Date(t.versions[0].scheduledFor)}})
      for(const v of t.versions) {
        const versionContent={platform:v.platform,language:v.language,content:v.content,hashtags:JSON.stringify(v.hashtags),carouselSlides:v.slides?JSON.stringify(v.slides):null,assetPaths:JSON.stringify(v.assets)}
        // Refresh the authorized campaign copy without resetting publication evidence or adjusted schedules.
        await tx.postVersion.upsert({where:{postId_platform:{postId:id,platform:v.platform}},update:versionContent,create:{postId:id,...versionContent,status:"PLANNED",scheduledFor:new Date(v.scheduledFor)}})
      }
    }
    // Keep the prior handoff article, but remove it from this four-anchor campaign.
    await tx.blogPost.updateMany({where:{userId,campaignId:campaign.id,slug:{in:["website-handoff-and-maintenance-checklist-ar","website-handoff-and-maintenance-checklist-en"]}},data:{campaignId:null}})
    return {campaignId:campaign.id,topics:p.topics.length,versions:p.topics.reduce((n,t)=>n+t.versions.length,0),articles:p.articles.length}
  },{timeout:60000})
}

export async function getEditorialCampaign(userId: string) {
  await ensureDatabaseSchema()
  return prisma.campaign.findUnique({where:{userId_planKey:{userId,planKey:novemberPack.key}},include:{posts:{orderBy:{scheduledFor:"asc"},include:{versions:{orderBy:{scheduledFor:"asc"}},article:true}},blogPosts:{orderBy:[{scheduledFor:"asc"},{language:"asc"}]}}})
}

export function parseArray<T>(value: string | null | undefined): T[] {
  try { const parsed: unknown=JSON.parse(value||"[]"); return Array.isArray(parsed)?parsed:[] } catch { return [] }
}

export async function sourceIsLive(url: string) {
  const target=new URL(url)
  if(target.protocol!=="https:" || !["thekatanani.com","www.thekatanani.com"].includes(target.hostname)) throw new Error("Reference must be a portfolio URL.")
  const response=await fetch(target,{cache:"no-store",redirect:"error",signal:AbortSignal.timeout(12000)})
  return response.ok
}
