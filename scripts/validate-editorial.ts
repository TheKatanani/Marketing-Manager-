import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {createHash} from "node:crypto"
import {novemberPack as pack} from "../src/lib/editorial/november-2026"

const versions=pack.topics.flatMap(t=>t.versions)
assert.equal(pack.topics.length,22)
assert.equal(versions.length,50)
assert.equal(pack.articles.length,4)
assert.equal(new Set(pack.topics.map(t=>t.key)).size,22)
assert.equal(versions.filter(v=>v.platform==="INSTAGRAM").length,14)
const publishable=JSON.stringify({topics:pack.topics.map(t=>({title:t.title,versions:t.versions})),articles:pack.articles})
assert.ok(!/geepas/i.test(publishable),"No Geepas recycling")
assert.ok(!/\b\d+(?:\.\d+)?\s*%/.test(publishable),"No invented percentage hooks")
for(const topic of pack.topics) for(const v of topic.versions) {
  assert.ok(!Number.isNaN(Date.parse(v.scheduledFor)))
  if(v.platform==="X") for(const tweet of v.content.split("\n---\n")) {
    const weighted=Array.from(tweet.replace(/https?:\/\/\S+/g,"x".repeat(23))).length
    assert.ok(weighted<=280,`${topic.key}: X length ${weighted}`)
  }
  if(v.platform==="LINKEDIN")assert.ok(v.content.length+v.hashtags.join(" #").length+2<=3000,topic.key)
  if(v.platform==="INSTAGRAM") {
    assert.ok(v.content.length<2200)
    assert.equal(v.slides?.length,5)
    assert.deepEqual(v.slides?.map(s=>s.slideNumber),[1,2,3,4,5])
    assert.match(v.slides![4].bodyText,/الملف|المقالات|البورتفوليو/)
  }
  if(topic.articleKey) {
    const article=pack.articles.find(a=>a.key===topic.articleKey)
    assert.ok(article)
    assert.ok(Date.parse(article.scheduledFor)<=Date.parse(v.scheduledFor))
    assert.ok(topic.sourceUrl?.includes(article.slug))
  }
}
for(const article of pack.articles) for(const lang of ["ar","en"] as const) {
  assert.ok(article.content[lang].split(/\s+/).length>=400,`${article.key}/${lang}: technical depth`)
  assert.match(article.content[lang],/```/)
  assert.ok(article.content[lang].includes(`/${lang}/contact`))
  assert.equal((article.content[lang].match(/```/g)||[]).length%2,0)
}
const mahseri=pack.topics.find(t=>t.key==="12-mahseri")!
assert.match(JSON.stringify(mahseri.versions),/Wix Studio/)
assert.match(JSON.stringify(mahseri.versions),/Velo/)
assert.ok(!/Next\.js/.test(JSON.stringify(mahseri.versions)))
const coach=pack.topics.find(t=>t.key==="03-coachspace")!
assert.match(coach.versions[0].content,/Team Leader and Frontend Developer/)
assert.match(coach.versions[0].content,/shared Django\/DRF API/)
const index=JSON.parse(fs.readFileSync("public/editorial/2026-11/asset-index.json","utf8"))
assert.equal(index.images,96)
assert.equal(index.assets.length,96)
assert.equal(new Set(index.assets.map((a:{path:string})=>a.path)).size,96)
const portfolio=process.argv[2]
for(const asset of index.assets) {
  const filename=path.join("public",asset.path)
  const png=fs.readFileSync(filename)
  assert.equal(createHash("sha256").update(png).digest("hex"),asset.sha256)
  const expected=asset.kind==="article"?[1600,900]:asset.kind==="story"?[1080,1920]:asset.kind==="linkedin"?[1200,1350]:[1080,1350]
  assert.deepEqual([png.readUInt32BE(16),png.readUInt32BE(20)],expected)
  if(portfolio)assert.deepEqual(fs.readFileSync(path.join(portfolio,"public",asset.path)),png,`Portfolio asset ${asset.path}`)
}
for(const version of versions)for(const asset of version.assets)assert.ok(index.assets.some((a:{path:string})=>a.path===asset))
console.log(JSON.stringify({topics:22,versions:50,articles:4,languages:2,graphics:96,carouselSlides:70,xLength:"pass",truthBoundaries:"pass",dimensionsAndHashes:"pass",portfolioAssets:portfolio?"identical":"not requested"},null,2))
