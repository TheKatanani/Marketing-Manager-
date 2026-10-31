import assert from "node:assert/strict"
import fs from "node:fs"
import path from "node:path"
import {createHash} from "node:crypto"
import {brand,approvedLogoData} from "../src/lib/editorial/brand"
import {renderEditorialSvg,type GraphicInput} from "../src/lib/editorial/render"
const provenance=JSON.parse(fs.readFileSync("public/brand/katanani/provenance.json","utf8"))
for(const asset of provenance.assets)assert.equal(createHash("sha256").update(fs.readFileSync(path.join("public/brand/katanani",asset.file))).digest("hex"),asset.sha256,`Original artwork: ${asset.file}`)
const inputs:GraphicInput[]=[
  {kind:"slide",title:"اختبر قرارًا في مشروعك",body:"مثال قابل للتطبيق",number:1,total:5},
  {kind:"slide",title:"راجع حدود التكامل",body:"حدد مصدر البيانات",number:3,total:5},
  {kind:"linkedin",title:"A clear contract before code",body:"Scope / Review / Delivery"},
  {kind:"article",title:"حدّد طبقة المشكلة",body:"Choose the implementation layer"},
  {kind:"story",title:"اختر رحلة واحدة",body:"اقرأ الدليل الكامل"},
]
const allowed=new Set(Object.values(brand.palette).map(s=>s.toUpperCase()))
for(const input of inputs) {
  const svg=renderEditorialSvg(input)
  assert.equal((svg.match(/data-brand-logo="approved-primary"/g)||[]).length,1)
  assert.ok(svg.includes(approvedLogoData()),"The original logo bytes are embedded")
  const dimensions=svg.match(/data-brand-logo="approved-primary"[^>]*width="([\d.]+)" height="([\d.]+)"/)!
  assert.equal(Number(dimensions[1])/Number(dimensions[2]),3,"Original logo aspect ratio")
  assert.ok(!/<(?:linearGradient|radialGradient|feGaussianBlur|feDropShadow)\b/.test(svg),"Flat approved brand surfaces")
  const dark=input.kind==="linkedin"||(input.kind==="slide"&&input.number===1)
  if(dark) {
    assert.match(svg,/data-canvas="petroleum"/)
    assert.match(svg,/filter="url\(#brand-white\)"/)
    assert.ok(!/<rect y="235"/.test(svg),"No white header strip")
  } else assert.ok(!/filter="url\(#brand-white\)"/.test(svg),"Dark artwork stays unchanged on light canvases")
  assert.ok(!/>MK<|>MOHAMMED KATANANI<|>THE KATANANI</.test(svg),"No replacement wordmark")
  for(const hex of svg.match(/#[a-f\d]{6}\b/gi)||[])assert.ok(allowed.has(hex.toUpperCase()),`Unapproved color: ${hex}`)
}
const index=JSON.parse(fs.readFileSync("public/editorial/2026-11/asset-index.json","utf8"))
assert.equal(index.brand.revision,brand.revision)
assert.equal(index.brand.logoSha256,provenance.assets.find((a:{file:string})=>a.file==="primary-transparent.png").sha256)
console.log("PASS: original logo bytes and proportions; approved six-color palette; no substitute wordmark, gradients or glow; all four formats branded.")
