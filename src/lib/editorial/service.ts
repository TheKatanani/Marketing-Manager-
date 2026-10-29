import { prisma } from "@/lib/prisma"
import { novemberPack } from "./november-2026"

export async function importNovemberPack(userId: string) {
  return prisma.$transaction(async tx => {
    const p=novemberPack
    const campaign=await tx.campaign.upsert({where:{userId_planKey:{userId,planKey:p.key}},update:{},create:{userId,planKey:p.key,name:p.name,objective:p.objective,startDate:new Date(p.startsAt),endDate:new Date(p.endsAt),status:"PLANNING",strategy:JSON.stringify(p.strategy)}})
    const articles=new Map<string,string>()
    for(const a of p.articles) for(const lang of ["ar","en"] as const) {
      const saved=await tx.blogPost.upsert({where:{userId_slug:{userId,slug:`${a.slug}-${lang}`}},update:{},create:{userId,campaignId:campaign.id,slug:`${a.slug}-${lang}`,title:a.title[lang],excerpt:a.excerpt[lang],content:a.content[lang],language:lang,category:a.category,tags:JSON.stringify(a.tags),scheduledFor:new Date(a.scheduledFor),canonicalUrl:`https://thekatanani.com/${lang}/blog/${a.slug}`,coverImage:a.cover,status:"PLANNED",readTimeMinutes:Math.max(3,Math.ceil(a.content[lang].split(/\s+/).length/180)),seoTitle:a.title[lang],seoDescription:a.excerpt[lang],sources:JSON.stringify(a.sources)}})
      articles.set(`${a.key}-${lang}`,saved.id)
    }
    for(const t of p.topics) {
      const id=`nov26-${userId}-${t.key}`
      await tx.post.upsert({where:{id},update:{},create:{id,userId,campaignId:campaign.id,title:t.title,status:"PLANNED",weekTheme:t.theme,sourceType:t.sourceType,sourceUrl:t.sourceUrl,sourceLabel:t.sourceLabel,articleId:t.articleKey?articles.get(`${t.articleKey}-${t.versions[0].language}`):null,scheduledFor:new Date(t.versions[0].scheduledFor),versions:{create:t.versions.map(v=>({platform:v.platform,language:v.language,content:v.content,hashtags:JSON.stringify(v.hashtags),carouselSlides:v.slides?JSON.stringify(v.slides):null,status:"PLANNED",scheduledFor:new Date(v.scheduledFor),assetPaths:JSON.stringify(v.assets)}))}}})
    }
    return {campaignId:campaign.id,topics:p.topics.length,versions:p.topics.reduce((n,t)=>n+t.versions.length,0),articles:p.articles.length}
  },{timeout:60000})
}

export async function getEditorialCampaign(userId: string) {
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
