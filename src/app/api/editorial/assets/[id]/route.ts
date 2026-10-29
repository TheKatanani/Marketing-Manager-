import { NextRequest, NextResponse } from "next/server"
import { getActiveUser } from "@/lib/active-user"
import { prisma } from "@/lib/prisma"
import { parseArray } from "@/lib/editorial/service"
import { renderEditorialPng } from "@/lib/editorial/png"
import type { EditorialSlide } from "@/lib/editorial/types"
export const runtime="nodejs"
export async function GET(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
  const user=await getActiveUser(); if(!user) return NextResponse.json({error:"Unauthorized"},{status:401})
  const {id}=await params
  const version=await prisma.postVersion.findFirst({where:{id,post:{userId:user.id}},include:{post:true}})
  if(!version) return NextResponse.json({error:"Not found"},{status:404})
  const n=Number(request.nextUrl.searchParams.get("slide")||"1")
  const slides=parseArray<EditorialSlide>(version.carouselSlides)
  const slide=slides[n-1]
  if(!Number.isInteger(n)||n<1||(version.platform==="INSTAGRAM"&&!slide)||version.platform==="X") return NextResponse.json({error:"Invalid graphic"},{status:400})
  try {
    const png=renderEditorialPng({kind:version.platform==="INSTAGRAM"?"slide":"linkedin",title:slide?.title??version.post.title,body:slide?.bodyText??version.content.split("\n").find(Boolean)?.slice(0,110)??"",eyebrow:version.post.weekTheme??undefined,number:slide?n:undefined,total:slide?slides.length:undefined})
    return new NextResponse(new Uint8Array(png),{headers:{"Content-Type":"image/png","Cache-Control":"private, no-store",...(request.nextUrl.searchParams.has("download")?{"Content-Disposition":`attachment; filename="${version.platform.toLowerCase()}-${n}.png"`}:{})}})
  } catch(e) {return NextResponse.json({error:e instanceof Error?e.message:"Could not render asset"},{status:422})}
}
