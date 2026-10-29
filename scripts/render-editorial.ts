import fs from "node:fs"
import path from "node:path"
import { novemberPack } from "../src/lib/editorial/november-2026"
import { renderEditorialPng } from "../src/lib/editorial/png"
const output=path.join(process.cwd(),"public/editorial/2026-11")
fs.mkdirSync(output,{recursive:true})
let count=0
function write(name:string,input:Parameters<typeof renderEditorialPng>[0]) {
  const cleanName = name.replace(/^\/+/, "")
  const filename = path.join(process.cwd(), "public", cleanName)
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, renderEditorialPng(input))
  count++
}
for(const topic of novemberPack.topics) {
  const ig=topic.versions.find(v=>v.platform==="INSTAGRAM")
  if(!ig?.slides)continue
  for(const s of ig.slides) write(`editorial/2026-11/${topic.key}/slide-${s.slideNumber}.png`,{kind:"slide",title:s.title,body:s.bodyText,eyebrow:topic.theme,number:s.slideNumber,total:ig.slides.length})
  const li=topic.versions.find(v=>v.platform==="LINKEDIN")!
  write(`editorial/2026-11/${topic.key}/linkedin.png`,{kind:"linkedin",title:topic.title,body:li.language==="ar"?"خطوات عملية لمشروعك القادم":"Practical notes for your next project",eyebrow:topic.theme})
}
for(const [i,a] of novemberPack.articles.entries()) {
  write(a.cover,{kind:"article",title:a.title.ar,body:a.title.en,eyebrow:`دليل عملي / ${String(i+1).padStart(2,"0")}`})
  write(`editorial/2026-11/stories/week-${i+1}-1.png`,{kind:"story",title:a.title.ar,body:"اقرأ الدليل الكامل\nفي مقالات البورتفوليو",eyebrow:"دليل الأسبوع",number:1,total:2})
  write(`editorial/2026-11/stories/week-${i+1}-2.png`,{kind:"story",title:"اختار خطوة وجرّبها",body:"احتفظ بالقائمة للرجوع إليها.\nوشارك سؤالك عن تطبيقها.",eyebrow:"من الفكرة للتسليم",number:2,total:2})
}
fs.writeFileSync(path.join(output,"asset-index.json"),JSON.stringify({images:count,stories:novemberPack.articles.map((a,i)=>({date:a.scheduledFor,caption:a.excerpt.ar,linkSticker:`https://thekatanani.com/ar/blog/${a.slug}`,assets:[`stories/week-${i+1}-1.png`,`stories/week-${i+1}-2.png`]}))},null,2))
console.log(`Rendered ${count} branded PNG graphics.`)
