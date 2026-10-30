import { artDirection, type ArtDirection } from "./art-direction"
import { brand, approvedLogoData } from "./brand"
import { escapeXml as esc, isRtl, fontFamily, measure, wrapMeasured } from "./typography"

export interface GraphicInput {
  title:string
  body:string
  eyebrow?:string
  number?:number
  total?:number
  kind:"slide"|"linkedin"|"article"|"story"
  topicKey?:string
}
const p=brand.palette
type Colors={ink:string;secondary:string;paper:string;line:string;accent:string}
const text=(s:string,x:number,y:number,size:number,color:string=p.navy,weight=400,anchor="start",mono=false,display=false)=>`<text x="${x}" y="${y}" text-anchor="${anchor}" direction="${isRtl(s)?"rtl":"ltr"}" unicode-bidi="plaintext" font-family="${fontFamily(s,mono,display)}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`
function paragraph(s:string,x:number,y:number,width:number,size:number,color:string,display=false,leading=1.42) {
  const rows=wrapMeasured(s,width-14,size,400,display), rtl=isRtl(s)
  return {height:rows.length*size*leading,svg:rows.map((row,i)=>text(row,rtl?x+width:x,y+i*size*leading,size,color,400,rtl?"end":"start",false,display)).join("")}
}
const panel=(x:number,y:number,w:number,h:number,fill:string=p.white,line:string=p.sky,r=14)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${line}" stroke-width="1.5"/>`
function hexagon(cx:number,cy:number,r:number,color:string,opacity:number) {
  const points=Array.from({length:6},(_,i)=>{const a=(30+i*60)*Math.PI/180;return [cx+Math.cos(a)*r,cy+Math.sin(a)*r]})
  // Rounded corners echo the emblem frame without redrawing the logo artwork.
  const corner=0.14
  const towards=(a:number[],b:number[],n:number)=>[a[0]+(b[0]-a[0])*n,a[1]+(b[1]-a[1])*n]
  const start=towards(points[0],points[5],corner)
  let d=`M${start.join(" ")}`
  for(let i=0;i<6;i++) {
    const point=points[i], next=points[(i+1)%6], end=towards(point,next,corner), beforeNext=towards(next,point,corner)
    d+=`Q${point.join(" ")} ${end.join(" ")}L${beforeNext.join(" ")}`
  }
  return `<path d="${d}Z" fill="none" stroke="${color}" stroke-opacity="${opacity}" stroke-width="3"/>`
}
function editor(a:ArtDirection,x:number,y:number,w:number,h:number) {
  let size=w<650?18:24
  while(Math.max(...a.code.map(s=>measure(s,size,400,true)))>w-105&&size>13)size--
  if(Math.max(...a.code.map(s=>measure(s,size,400,true)))>w-105)throw Error(`Code exceeds card: ${a.filename}`)
  const step=(h-120)/Math.max(6,a.code.length)
  return `${panel(x,y,w,h,p.white,p.sky)}
    <path d="M${x+1} ${y+58}H${x+w-1}" stroke="${p.sky}"/>
    ${[0,1,2].map(i=>`<circle cx="${x+25+i*18}" cy="${y+29}" r="4" fill="${p.petroleum}" fill-opacity="${1-i*0.25}"/>`).join("")}
    ${text(a.filename,x+w-24,y+35,w<650?14:17,p.petroleum,400,"end",true)}
    ${a.code.map((s,i)=>text(String(i+1).padStart(2,"0"),x+24,y+96+i*step,14,p.petroleum,400,"start",true)+text(s,x+70,y+96+i*step,size,s.trim().startsWith("//")||s.trim().startsWith("/*")?p.navy:i%2?p.petroleum:p.navy,400,"start",true)).join("")}
    ${text("ILLUSTRATIVE EXAMPLE",x+24,y+h-20,11,p.petroleum,400,"start",true)}`
}
function comparison(a:ArtDirection,x:number,y:number,w:number,h:number) {
  const gap=22,cw=(w-gap)/2
  return [0,1].map(i=>{
    const cx=x+i*(cw+gap)
    const heading=paragraph(a.compare[i*2],cx+25,y+51,cw-50,17,p.petroleum)
    let size=37
    let body=paragraph(a.compare[i*2+1],cx+25,y+122,cw-50,size,p.navy,true,1.2)
    while(body.height>h-165&&size>26){size--;body=paragraph(a.compare[i*2+1],cx+25,y+122,cw-50,size,p.navy,true,1.2)}
    if(body.height>h-150)throw Error(`Comparison copy exceeds card: ${a.filename}`)
    return `${panel(cx,y,cw,h,i?p.sky:p.white,p.sky)}<rect x="${cx+25}" y="${y+23}" width="32" height="3" fill="${i?p.petroleum:p.lilac}"/>${heading.svg}${body.svg}${text(i?"THE DECISION":"THE ASSUMPTION",cx+25,y+h-24,12,p.petroleum,400,"start",true)}`
  }).join("")
}
function flow(a:ArtDirection,x:number,y:number,w:number,h:number,c:Colors) {
  const gap=30,cw=(w-2*gap)/3,cy=y+h/2
  return `${text("FOLLOW THE STATE",x,y+23,17,c.secondary,400,"start",true)}${a.flow.map((s,i)=>{
    const cx=x+i*(cw+gap)
    let size=23
    while(measure(s,size,400,true)>cw-34&&size>13)size--
    return `${panel(cx,cy-62,cw,125,p.white,p.sky)}${text(String(i+1).padStart(2,"0"),cx+18,cy-25,16,p.petroleum,400,"start",true)}${text(s,cx+cw/2,cy+19,size,p.navy,400,"middle",true)}${i<2?`<path d="M${cx+cw+5} ${cy}h${gap-10}m-7 -6 7 6-7 6" stroke="${c.ink}" stroke-width="1.5" fill="none"/>`:""}`
  }).join("")}${text("A clear boundary makes the next decision easier.",x,y+h-17,18,c.secondary)}`
}
function checklist(a:ArtDirection&{checks:string[]},x:number,y:number,w:number,h:number) {
  return `${panel(x,y,w,h,p.white,p.sky)}${text("TAKE THIS INTO YOUR PROJECT",x+30,y+43,17,p.petroleum,400,"start",true)}${a.checks.map((s,i)=>`<circle cx="${x+43}" cy="${y+100+i*70}" r="13" fill="${i===1?p.lilac:p.sage}"/>${text(String(i+1),x+43,y+105+i*70,13,p.navy,400,"middle",true)}${text(s,x+77,y+109+i*70,31,p.navy,400,"start",false,true)}`).join("")}`
}

export function renderEditorialSvg(input:GraphicInput) {
  const a=artDirection(input.topicKey),article=input.kind==="article",story=input.kind==="story"
  const w=article?1600:input.kind==="linkedin"?1200:1080,h=article?900:story?1920:1350
  const pad=article?80:76,width=w-pad*2
  const dark=!article&&!story&&(input.kind==="linkedin"||input.number===1)
  const c:Colors={ink:dark?p.white:p.petroleum,secondary:dark?p.sky:p.navy,paper:dark?p.petroleum:p.white,line:p.sky,accent:p.petroleum}
  const logoW=article?450:story?540:440,logoY=story?175:48,logoH=logoW/3
  const logoX=story?(w-logoW)/2:pad
  const titleY=article?340:story?575:360,tw=article?760:width
  const headline=input.title.replace(/: /g,"\n")
  let titleSize=article?66:story?86:isRtl(input.title)?80:76,bodySize=article?28:32
  const maxBottom=article?715:story?1020:695
  let title=paragraph(headline,pad,titleY,tw,titleSize,c.ink,true,1.32)
  let body=paragraph(input.body,pad,titleY+title.height+32,tw,bodySize,c.secondary)
  while(titleY+title.height+32+body.height>maxBottom&&titleSize>38) {
    titleSize-=2;bodySize=Math.max(25,bodySize-1)
    title=paragraph(headline,pad,titleY,tw,titleSize,c.ink,true,1.32)
    body=paragraph(input.body,pad,titleY+title.height+32,tw,bodySize,c.secondary)
  }
  if(titleY+title.height+32+body.height>maxBottom)throw Error(`Graphic copy exceeds safe area: ${input.title}`)
  const vx=article?930:pad,vy=article?330:story?1120:775,vw=article?590:width,vh=article?350:story?400:355
  const stage=input.kind==="slide"?input.number:undefined
  const illustration=stage===2?comparison(a,vx,vy,vw,vh):stage===3?flow(a,vx,vy,vw,vh,c):stage===5?checklist(a,vx,vy,vw,vh):input.topicKey==="11-shopify-decision"&&input.kind==="linkedin"?comparison(a,vx,vy,vw,vh):editor(a,vx,vy,vw,vh)
  const chipY=article?742:story?1595:1173
  let chipX=article?930:pad
  const chips=a.tags.map(tag=>{
    const cw=measure(tag,17,400,true)+28,x=chipX;chipX+=cw+12
    return `<rect x="${x}" y="${chipY}" width="${cw}" height="35" rx="5" fill="${dark?p.petroleum:p.white}" stroke="${dark?p.sky:p.petroleum}" stroke-opacity="0.55"/>${text(tag,x+14,chipY+24,17,c.secondary,400,"start",true)}`
  }).join("")
  if(chipX-12>w-pad)throw Error(`Badge exceeds safe area: ${input.topicKey}`)
  const eyebrow=input.eyebrow??"Frontend / Commerce",eyebrowY=article?288:story?470:278
  if(measure(eyebrow,20)>width)throw Error(`Eyebrow exceeds safe area: ${eyebrow}`)
  const footerY=story?1755:h-80
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <metadata>${esc(JSON.stringify({brand:brand.name,revision:brand.revision,logo:brand.logo,logoWidth:logoW,logoHeight:logoH,clearSpace:logoH/4}))}</metadata>
    <rect width="${w}" height="${h}" fill="${p.white}"/>
    ${dark?`<rect y="235" width="${w}" height="${h-235}" fill="${p.petroleum}"/>`:""}
    ${hexagon(w+(article?160:310),h*(story?0.65:0.45),article?420:510,p.sky,dark?0.24:0.9)}
    ${!article&&!story?`<path d="M${w-260} ${h-140}L${w-100} ${h-250}H${w}V${h-140}Z" fill="${p.lilac}" fill-opacity="${dark?0.2:0.22}"/>`:""}
    <image data-brand-logo="approved-primary" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" xlink:href="${approvedLogoData()}"/>
    ${!story?text("NOVEMBER / 2026",w-pad,118,15,p.navy,400,"end",true):""}
    ${article?`<path d="M${pad} 220H${w-pad}" stroke="${p.sky}"/>`:!story?`<path d="M${pad} 223H${w-pad}" stroke="${p.sky}"/>`:""}
    ${text(eyebrow,isRtl(eyebrow)?w-pad:pad,eyebrowY,20,c.secondary,400,isRtl(eyebrow)?"end":"start")}
    ${title.svg}${body.svg}
    ${text(a.label,vx,vy-23,13,c.secondary,400,"start",true)}
    ${illustration}${chips}
    <path d="M${pad} ${footerY-34}H${w-pad}" stroke="${p.sky}" stroke-opacity="${dark?0.55:1}"/>
    ${text("thekatanani.com",pad,footerY,21,c.ink,400,"start",true)}
    ${text(input.number?`${String(input.number).padStart(2,"0")} / ${String(input.total??5).padStart(2,"0")}`:"< web developer />",w-pad,footerY,17,c.secondary,400,"end",true)}
    ${stage?Array.from({length:input.total??5},(_,i)=>`<rect x="${w-pad-144+i*30}" y="${footerY+28}" width="22" height="3" fill="${i+1===stage?p.sage:p.sky}" fill-opacity="${i+1===stage?1:0.45}"/>`).join(""):""}
  </svg>`
}
