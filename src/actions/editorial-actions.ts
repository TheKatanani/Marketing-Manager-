"use server"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getActiveUser } from "@/lib/active-user"
import { importNovemberPack, sourceIsLive } from "@/lib/editorial/service"

const refresh=()=>{for(const p of ["/dashboard/editorial","/dashboard/calendar","/dashboard/blog","/dashboard/content"]) revalidatePath(p)}
export async function installNovemberPlan() {
  try { const user=await getActiveUser(); if(!user) throw new Error("Sign in to continue."); const result=await importNovemberPack(user.id); refresh(); return {success:true,...result} }
  catch(e) { return {success:false,error:e instanceof Error?e.message:"Could not save the plan."} }
}
const slide=z.object({slideNumber:z.number().int().min(1).max(10),title:z.string().min(1).max(160),bodyText:z.string().max(600),visualCue:z.string().max(1000).default("")})
const versionInput=z.object({id:z.string(),content:z.string().trim().min(1).max(20000),hashtags:z.array(z.string().max(60)).max(15),scheduledFor:z.string().datetime().nullable(),slides:z.array(slide).max(10).optional()})
export async function saveEditorialVersion(raw: z.infer<typeof versionInput>) {
  try {
    const data=versionInput.parse(raw); const user=await getActiveUser(); if(!user) throw new Error("Sign in to continue.")
    const version=await prisma.postVersion.findFirst({where:{id:data.id,post:{userId:user.id}}}); if(!version) throw new Error("Version not found.")
    await prisma.postVersion.update({where:{id:version.id},data:{content:data.content,hashtags:JSON.stringify(data.hashtags),scheduledFor:data.scheduledFor?new Date(data.scheduledFor):null,...(data.slides?{carouselSlides:JSON.stringify(data.slides)}:{})}})
    const saved=await prisma.postVersion.findUniqueOrThrow({where:{id:version.id}})
    if(saved.content!==data.content || saved.scheduledFor?.toISOString()!==(data.scheduledFor??undefined)) throw new Error("Save verification failed.")
    refresh(); return {success:true}
  } catch(e) {return {success:false,error:e instanceof Error?e.message:"Could not save version."}}
}
const articleInput=z.object({id:z.string(),title:z.string().trim().min(1).max(250),excerpt:z.string().max(2000),content:z.string().min(20).max(100000),scheduledFor:z.string().datetime().nullable()})
export async function saveEditorialArticle(raw:z.infer<typeof articleInput>) {
  try {
    const data=articleInput.parse(raw); const user=await getActiveUser(); if(!user) throw new Error("Sign in to continue.")
    const old=await prisma.blogPost.findFirst({where:{id:data.id,userId:user.id}}); if(!old) throw new Error("Article not found.")
    const saved=await prisma.blogPost.update({where:{id:old.id},data:{title:data.title,excerpt:data.excerpt,content:data.content,seoTitle:data.title,seoDescription:data.excerpt,scheduledFor:data.scheduledFor?new Date(data.scheduledFor):null}})
    const readBack=await prisma.blogPost.findUniqueOrThrow({where:{id:saved.id}}); if(readBack.content!==data.content) throw new Error("Save verification failed.")
    refresh(); return {success:true}
  } catch(e) {return {success:false,error:e instanceof Error?e.message:"Could not save article."}}
}
export async function recordManualPublication(versionId:string,url:string) {
  try {
    const user=await getActiveUser(); if(!user) throw new Error("Sign in to continue.")
    const version=await prisma.postVersion.findFirst({where:{id:versionId,post:{userId:user.id}},include:{post:{include:{article:true}}}}); if(!version) throw new Error("Version not found.")
    const parsed=new URL(url); const host=parsed.hostname.replace(/^www\./,"")
    const hosts=version.platform==="X"?["x.com","twitter.com"]:version.platform==="LINKEDIN"?["linkedin.com"]:["instagram.com"]
    if(parsed.protocol!=="https:" || !hosts.includes(host)) throw new Error("Enter the published post URL on the selected platform.")
    const a=version.post.article
    if(a) {
      if(a.scheduledFor && a.scheduledFor>new Date()) throw new Error("The reference article is still scheduled for the future.")
      if(!a.canonicalUrl || !(await sourceIsLive(a.canonicalUrl))) throw new Error("Publish and verify the reference article first.")
    }
    await prisma.$transaction(async tx=>{
      await tx.postVersion.update({where:{id:versionId},data:{publishedUrl:url,publishedAt:new Date(),status:"PUBLISHED"}})
      const remaining=await tx.postVersion.count({where:{postId:version.postId,status:{not:"PUBLISHED"}}})
      if(!remaining) await tx.post.update({where:{id:version.postId},data:{status:"PUBLISHED",publishedAt:new Date()}})
    })
    refresh(); return {success:true}
  } catch(e) {return {success:false,error:e instanceof Error?e.message:"Could not record publication."}}
}
export async function verifyArticleReference(id:string) {
  try {
    const user=await getActiveUser(); if(!user) throw new Error("Sign in to continue.")
    const a=await prisma.blogPost.findFirst({where:{id,userId:user.id}}); if(!a?.canonicalUrl) throw new Error("Article reference missing.")
    if(a.scheduledFor && a.scheduledFor>new Date()) return {success:true,live:false,message:"المقال مجدول للمستقبل؛ راجعه بعد موعد الإتاحة."}
    const live=await sourceIsLive(a.canonicalUrl)
    return {success:true,live,message:live?"الرابط العام يعمل.":"المقال غير متاح على الرابط العام بعد."}
  } catch(e) {return {success:false,error:e instanceof Error?e.message:"Could not verify the reference."}}
}
