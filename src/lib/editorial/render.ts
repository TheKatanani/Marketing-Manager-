import { artDirection, type ArtDirection } from "./art-direction"
import { escapeXml as esc, isRtl, measure, wrapMeasured } from "./typography"

export interface GraphicInput {
  title: string
  body: string
  eyebrow?: string
  number?: number
  total?: number
  kind: "slide" | "linkedin" | "article" | "story"
  topicKey?: string
}
const palette = {ink:"#061E29",cyan:"#38BDF8",sage:"#A7C8B4",violet:"#C084FC",white:"#F3F8FC",muted:"#B4CCD7"}
const text = (s: string, x: number, y: number, size: number, color = palette.white, weight = 400, anchor = "start", mono = false) => `<text x="${x}" y="${y}" text-anchor="${anchor}" direction="${isRtl(s) ? "rtl" : "ltr"}" font-family="${mono ? "JetBrains Mono" : isRtl(s) ? "Noto Sans Arabic" : "Noto Sans"}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`
function paragraph(s: string, x: number, y: number, width: number, size: number, color: string, weight = 400, leading = 1.5) {
  const rows = wrapMeasured(s, width - 12, size, weight)
  const rtl = isRtl(s)
  return {height:rows.length * size * leading, svg: rows.map((row,i) => text(row, rtl ? x + width : x, y + i * size * leading, size, color, weight, rtl ? "end" : "start")).join("")}
}
const card = (x: number, y: number, w: number, h: number, fill = "#FFFFFF", opacity = 0.045, radius = 24) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" fill-opacity="${opacity}" stroke="#FFFFFF" stroke-opacity="0.15"/>`

function editor(a: ArtDirection, x: number, y: number, width: number, height: number) {
  let size = width < 650 ? 19 : 25
  while (Math.max(...a.code.map(s => measure(s, size, 400, true))) > width - 110 && size > 14) size--
  if (Math.max(...a.code.map(s => measure(s,size,400,true))) > width - 110) throw Error(`Code overflow: ${a.filename}`)
  const rowGap = (height - 135) / Math.max(6, a.code.length)
  return `${card(x,y,width,height,"#04151F",0.92)}
    <path d="M${x} ${y+64}H${x+width}" stroke="#FFFFFF" stroke-opacity="0.12"/>
    ${["#FF5F56","#FFBD2E","#27C93F"].map((c,i)=>`<circle cx="${x+28+i*23}" cy="${y+32}" r="7" fill="${c}"/>`).join("")}
    ${text(a.filename,x+width-25,y+39,Math.min(18,width/29),palette.muted,400,"end",true)}
    ${a.code.map((s,i)=>text(String(i+1).padStart(2,"0"),x+27,y+112+i*rowGap,16,"#597989",400,"start",true)+text(s,x+77,y+112+i*rowGap,size,s.trim().startsWith("//")||s.trim().startsWith("/*")?"#7293A3":i%3===0?palette.violet:i%3===1?palette.cyan:palette.sage,400,"start",true)).join("")}
    ${text("ILLUSTRATIVE PATTERN",x+27,y+height-22,12,"#7293A3",600)}
  `
}
function comparison(a: ArtDirection, x: number, y: number, width: number, height: number) {
  const gap=20, cw=(width-gap)/2
  return [0,1].map(i=>{
    const cx=x+i*(cw+gap), color=i?palette.cyan:palette.violet
    const title=paragraph(a.compare[i*2],cx+26,y+65,cw-52,22,color,700)
    const body=paragraph(a.compare[i*2+1],cx+26,y+150,cw-52,30,palette.white,600)
    return `${card(cx,y,cw,height)}<rect x="${cx+26}" y="${y+26}" width="40" height="4" rx="2" fill="${color}"/>${title.svg}${body.svg}${text(i?"DEFINE THE CONTRACT":"QUESTION THE ASSUMPTION",cx+26,y+height-30,12,palette.muted,600)}`
  }).join("")
}
function flow(a: ArtDirection, x: number, y: number, width: number, height: number) {
  const gap=28, cw=(width-gap*2)/3, cy=y+height/2
  return `${text("ARCHITECTURE / FOLLOW THE STATE",x+26,y+42,17,palette.cyan,600)}${a.flow.map((s,i)=>{
    const cx=x+i*(cw+gap), size=Math.min(21,Math.floor((cw-28)/Math.max(1,s.length)*1.45))
    return `${card(cx,cy-66,cw,132)}${text(String(i+1).padStart(2,"0"),cx+20,cy-30,18,palette.violet,700)}${text(s,cx+cw/2,cy+20,size,palette.white,600,"middle")}${i<2?`<path d="M${cx+cw+5} ${cy}h${gap-10}m-7 -7 7 7-7 7" fill="none" stroke="${palette.cyan}" stroke-width="2"/>`:""}`
  }).join("")}${text("Model the failure path before the happy path.",x+26,y+height-35,19,palette.muted)}`
}
function checklist(a: ArtDirection & {checks:string[]}, x: number, y: number, width: number, height: number) {
  return `${card(x,y,width,height)}${text("BEFORE YOU COMMIT",x+30,y+55,23,palette.cyan,700)}${a.checks.map((s,i)=>`<rect x="${x+32}" y="${y+94+i*70}" width="26" height="26" rx="7" fill="${palette.sage}" fill-opacity="0.15" stroke="${palette.sage}"/><path d="M${x+39} ${y+107+i*70}l5 5 8-11" stroke="${palette.sage}" stroke-width="2" fill="none"/>${text(s,x+80,y+116+i*70,27,palette.white,500)}`).join("")}${text(a.tags.join("  /  "),x+32,y+height-25,19,palette.muted)}`
}

export function renderEditorialSvg(input: GraphicInput) {
  const a=artDirection(input.topicKey), article=input.kind==="article", story=input.kind==="story"
  const w=article?1600:input.kind==="linkedin"?1200:1080, h=article?900:story?1920:1350
  const pad=article?80:76, width=w-pad*2
  const tx=pad, tw=article?760:width, titleY=article?255:story?470:290
  let titleSize=article?61:input.kind==="linkedin"?70:64, bodySize=article?29:33
  let title=paragraph(input.title,tx,titleY,tw,titleSize,palette.white,700,1.42)
  let body=paragraph(input.body,tx,titleY+title.height+28,tw,bodySize,palette.muted)
  const maxTextBottom=article?705:story?930:650
  while(titleY+title.height+28+body.height>maxTextBottom && titleSize>38) {
    titleSize-=2; bodySize=Math.max(25,bodySize-1)
    title=paragraph(input.title,tx,titleY,tw,titleSize,palette.white,700,1.42)
    body=paragraph(input.body,tx,titleY+title.height+28,tw,bodySize,palette.muted)
  }
  if(titleY+title.height+28+body.height>maxTextBottom) throw Error(`Graphic text exceeds safe area: ${input.title}`)
  const vizX=article?900:pad, vizY=article?265:story?1030:720, vizW=article?620:width, vizH=article?430:story?460:410
  const stage=input.kind==="slide"?input.number:undefined
  const illustration=stage===2?comparison(a,vizX,vizY,vizW,vizH):stage===3?flow(a,vizX,vizY,vizW,vizH):stage===5?checklist(a,vizX,vizY,vizW,vizH):input.topicKey==="11-shopify-decision" && input.kind==="linkedin"?comparison(a,vizX,vizY,vizW,vizH):editor(a,vizX,vizY,vizW,vizH)
  let chipX=article?900:pad
  const chipY=article?750:story?1560:1177
  const chips=a.tags.map(tag=>{
    const cw=measure(tag,18,600)+36, x=chipX; chipX+=cw+12
    return `<rect x="${x}" y="${chipY}" width="${cw}" height="40" rx="20" fill="${palette.cyan}" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15"/>${text(tag,x+18,chipY+27,18,palette.sage,600)}`
  }).join("")
  if(chipX-12>w-pad) throw Error(`Badge overflow: ${input.topicKey}`)
  const eyebrow=input.eyebrow??"Engineering notes"
  if(measure(eyebrow,23,500)>width) throw Error(`Eyebrow overflow: ${eyebrow}`)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#061E29"/><stop offset="1" stop-color="#0A4D68"/></linearGradient><radialGradient id="halo"><stop stop-color="#38BDF8" stop-opacity="0.16"/><stop offset="1" stop-color="#38BDF8" stop-opacity="0"/></radialGradient><pattern id="grid" width="54" height="54" patternUnits="userSpaceOnUse"><path d="M54 0H0V54" fill="none" stroke="#B4CCD7" stroke-opacity="0.045"/></pattern></defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/><rect width="${w}" height="${h}" fill="url(#grid)"/>
    <ellipse cx="${w*0.9}" cy="${h*0.23}" rx="700" ry="700" fill="url(#halo)"/>
    <path d="M${w-260} 0v190l120 120h140" fill="none" stroke="#38BDF8" stroke-opacity="0.22"/>
    ${card(pad,76,58,58,"#38BDF8",0.1,17)}${text("MK",pad+29,114,24,palette.white,700,"middle")}
    ${text("MOHAMMED KATANANI",pad+80,100,20,palette.white,700)}${text("FRONTEND ENGINEERING / COMMERCE",pad+80,129,13,palette.muted,500)}
    <circle cx="${w-pad-108}" cy="103" r="4" fill="${palette.sage}"/>${text("NOV / 26",w-pad,110,16,palette.sage,600,"end",true)}
    ${text(a.label,pad,article?190:story?315:201,15,palette.cyan,600)}
    ${text(eyebrow,isRtl(eyebrow)?w-pad:pad,article?225:story?382:245,23,palette.sage,500,isRtl(eyebrow)?"end":"start")}
    ${title.svg}${body.svg}${illustration}${chips}
    <path d="M${pad} ${h-108}H${w-pad}" stroke="#FFFFFF" stroke-opacity="0.15"/>
    ${text("thekatanani.com",pad,h-61,23,palette.white,600)}
    ${text(input.number?`${String(input.number).padStart(2,"0")} / ${String(input.total??5).padStart(2,"0")}`:"ENGINEERING NOTES",w-pad,h-61,19,palette.muted,500,"end",true)}
    ${input.kind==="slide"?Array.from({length:input.total??5},(_,i)=>`<rect x="${w-pad-148+i*31}" y="${h-36}" width="23" height="3" rx="1.5" fill="${i+1===input.number?palette.cyan:"#FFFFFF"}" fill-opacity="${i+1===input.number?1:0.18}"/>`).join(""):""}
  </svg>`
}
