import fs from "node:fs"
import path from "node:path"
import { novemberPack } from "../src/lib/editorial/november-2026"
import { renderEditorialPng } from "../src/lib/editorial/png"
import { articleTopic, artDirection } from "../src/lib/editorial/art-direction"
import { createHash } from "node:crypto"
import { brand } from "../src/lib/editorial/brand"
const output=path.join(process.cwd(),"public/editorial/2026-11")
fs.mkdirSync(output,{recursive:true})
let count=0
const assets: {path:string;kind:string;width:number;height:number;sha256:string}[]=[]
function write(name:string,input:Parameters<typeof renderEditorialPng>[0]) {
  const cleanName = name.replace(/^\/+/, "")
  const filename = path.join(process.cwd(), "public", cleanName)
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  const png=renderEditorialPng(input)
  // Avoid touching unchanged files and replace changed assets atomically on Windows.
  if(!fs.existsSync(filename)||!fs.readFileSync(filename).equals(png)) {
    const pending=filename+".next"
    fs.writeFileSync(pending,png)
    for(let attempt=0;;attempt++) {
      try {fs.renameSync(pending,filename);break}
      catch(error) {if(attempt>=10)throw error;Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,100)}
    }
  }
  assets.push({path:`/${cleanName}`,kind:input.kind,width:png.readUInt32BE(16),height:png.readUInt32BE(20),sha256:createHash("sha256").update(png).digest("hex")})
  count++
}
for(const topic of novemberPack.topics) {
  const ig=topic.versions.find(v=>v.platform==="INSTAGRAM")
  if(!ig?.slides)continue
  for(const s of ig.slides) write(`editorial/2026-11/${topic.key}/slide-${s.slideNumber}.png`,{kind:"slide",title:s.title,body:s.bodyText,eyebrow:topic.theme,number:s.slideNumber,total:ig.slides.length,topicKey:topic.key})
  const li=topic.versions.find(v=>v.platform==="LINKEDIN")!
  write(`editorial/2026-11/${topic.key}/linkedin.png`,{kind:"linkedin",title:topic.title,body:artDirection(topic.key).flow.join(" / "),eyebrow:topic.theme,topicKey:topic.key})
}
for(const [i,a] of novemberPack.articles.entries()) {
  const topicKey=articleTopic[a.key]
  write(a.cover,{kind:"article",title:a.title.ar,body:a.title.en,eyebrow:`دليل عملي / ${String(i+1).padStart(2,"0")}`,topicKey})
  write(`editorial/2026-11/stories/week-${i+1}-1.png`,{kind:"story",title:a.title.ar,body:a.excerpt.ar,eyebrow:"دليل الأسبوع",number:1,total:2,topicKey})
  write(`editorial/2026-11/stories/week-${i+1}-2.png`,{kind:"story",title:"اختبر قرارًا في مشروعك اليوم",body:"افتح الدليل من ملصق الرابط.\nاحفظ المثال وطبّقه على رحلة واحدة.",eyebrow:a.tags.slice(0,2).join(" / "),number:2,total:2,topicKey})
}
if(count!==96) throw Error(`Expected 96 graphics, received ${count}`)
// Retire only the replaced campaign cover; the portfolio keeps its older article.
fs.rmSync(path.join(output,"articles/handoff.png"),{force:true})
fs.writeFileSync(path.join(output,"asset-index.json"),JSON.stringify({images:count,brand:{...brand,logoSha256:createHash("sha256").update(fs.readFileSync(path.join(process.cwd(),"public",brand.logo))).digest("hex")},assets,stories:novemberPack.articles.map((a,i)=>({date:a.scheduledFor,caption:a.excerpt.ar,linkSticker:`https://thekatanani.com/ar/blog/${a.slug}`,assets:[`stories/week-${i+1}-1.png`,`stories/week-${i+1}-2.png`]}))},null,2))
console.log(`Rendered ${count} branded PNG graphics.`)
