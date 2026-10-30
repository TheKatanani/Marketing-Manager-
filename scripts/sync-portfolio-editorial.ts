import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import { novemberArticles } from "../src/lib/editorial/articles"

const portfolio = path.resolve(process.argv[2] || "D:/client/katanani-portfolio-nextjs/katanani-portfolio-next")
const escapeHtml = (s:string) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")
function inline(s:string):string {
  return escapeHtml(s).replace(/`([^`]+)`/g,"<code>$1</code>").replace(/\[([^\]]+)\]\((https:\/\/[^\s)]+|\/(?:ar|en)\/[^\s)]+)\)/g,'<a href="$2">$1</a>')
}
/** Converts the deliberately small Markdown subset used by the campaign. */
export function articleHtml(markdown:string) {
  const blocks=markdown.split(/(```[^\n]*\n[\s\S]*?```)/g).filter(Boolean)
  return blocks.map(block=> {
    if(block.startsWith("```")) {
      const newline=block.indexOf("\n"), lang=block.slice(3,newline).trim()
      return `<pre dir="ltr"><code class="language-${escapeHtml(lang)}">${escapeHtml(block.slice(newline+1,-3).trimEnd())}</code></pre>`
    }
    return block.trim().split(/\n\n+/).filter(Boolean).map(p=>p.startsWith("## ")?`<h2>${inline(p.slice(3))}</h2>`:p.startsWith("- ")?`<ul>${p.split("\n").map(li=>`<li>${inline(li.replace(/^- /,""))}</li>`).join("")}</ul>`:`<p>${inline(p).replace(/\n/g,"<br />")}</p>`).join("\n")
  }).join("\n")
}
async function main() {
  const filename=path.join(portfolio,"src/data/posts.ts")
  const source=fs.readFileSync(filename,"utf8")
  const {posts}=await import(pathToFileURL(filename).href)
  const updated=novemberArticles.map((a,i)=>({
    ...(posts.find((p:{slug:string})=>p.slug===a.slug)??{}),
    slug:a.slug,featured:false,order:a.key==="shopify"?24:20+i,publishAt:a.scheduledFor,
    categoryKey:a.key==="shopify"?"ecommerce":a.key==="brief"?"strategy":"nextjs",
    category:{ar:a.key==="shopify"?"تجارة إلكترونية":"هندسة الواجهات",en:a.key==="shopify"?"E-commerce":"Frontend Engineering"},
    tag:{ar:a.tags[0],en:a.tags[0]},date:{ar:"نوفمبر 2026",en:"November 2026"},
    readMinutes:Math.max(3,Math.ceil(Math.max(...Object.values(a.content).map(t=>t.split(/\s+/).length))/180)),
    icon:"code",grad:"g1",image:{publicId:a.cover,alt:a.title},title:a.title,excerpt:a.excerpt,
    body:{ar:articleHtml(a.content.ar),en:articleHtml(a.content.en)}
  }))
  // Replace only the JSON-formatted November records; preserve the rest of the file verbatim.
  let result=source
  const extras:unknown[]=[]
  for(const post of updated) {
    const marker=`  {\n    "slug": "${post.slug}"`
    const normalized=result.replace(/\r\n/g,"\n")
    const start=normalized.indexOf(marker)
    if(start<0) {extras.push(post);continue}
    let depth=0,inString=false,escaped=false,end=-1
    for(let i=start+2;i<normalized.length;i++) {
      const c=normalized[i]
      if(inString) {if(escaped)escaped=false;else if(c==="\\")escaped=true;else if(c==='"')inString=false}
      else if(c==='"')inString=true
      else if(c==="{")depth++
      else if(c==="}" && --depth===0){end=i+1;break}
    }
    if(end<0)throw Error(`Unclosed post: ${post.slug}`)
    result=normalized.slice(0,start)+JSON.stringify(post,null,2).split("\n").map(l=>"  "+l).join("\n")+normalized.slice(end)
  }
  if(extras.length) {
    const end=result.lastIndexOf("];"), head=result.slice(0,end).trimEnd()
    result=head+(head.endsWith(",")?"\n":",\n")+extras.map(p=>JSON.stringify(p,null,2).split("\n").map(l=>"  "+l).join("\n")).join(",\n")+"\n"+result.slice(end)
  }
  fs.writeFileSync(filename,result)
  const assetRoot=path.join(process.cwd(),"public/editorial/2026-11")
  const index=JSON.parse(fs.readFileSync(path.join(assetRoot,"asset-index.json"),"utf8"))
  if(index.images!==96 || index.assets?.length!==96)throw Error("Render all 96 graphics before synchronizing")
  for(const asset of index.assets) {
    const relative=asset.path.replace(/^\//,"")
    const dest=path.join(portfolio,"public",relative)
    fs.mkdirSync(path.dirname(dest),{recursive:true})
    fs.copyFileSync(path.join(process.cwd(),"public",relative),dest)
  }
  fs.copyFileSync(path.join(assetRoot,"asset-index.json"),path.join(portfolio,"public/editorial/2026-11/asset-index.json"))
  fs.cpSync(path.join(process.cwd(),"public/brand/katanani"),path.join(portfolio,"public/brand/katanani"),{recursive:true})
  console.log("Synchronized four bilingual articles and 96 graphics; preserved the earlier handoff article.")
}
main().catch(error=>{console.error(error);process.exitCode=1})
