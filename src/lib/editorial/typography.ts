import { Resvg } from "@resvg/resvg-js"
import path from "node:path"
const files = {"Noto Sans Arabic":"NotoSansArabic.ttf","Noto Sans":"NotoSans.ttf","JetBrains Mono":"JetBrainsMono.ttf","Source Serif 4":"SourceSerif4-Regular.ttf","Noto Naskh Arabic":"NotoNaskhArabic.ttf"}
export const fontFamily = (s:string, mono=false, display=false) => mono ? "JetBrains Mono" : display ? isRtl(s) ? "Noto Naskh Arabic" : "Source Serif 4" : isRtl(s) ? "Noto Sans Arabic" : "Noto Sans"
export const fontOptions = (family?:string) => ({ fontFiles: (family ? [files[family as keyof typeof files], ...(family.includes("Arabic")?[files["Noto Sans"]]:[])] : Object.values(files)).map(f => path.join(process.cwd(), "public/fonts", f)), loadSystemFonts: false, defaultFontFamily: "Noto Sans" })
export const escapeXml = (s: string) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]!))
export const isRtl = (s: string) => /[\u0600-\u06ff]/.test(s)
const cache = new Map<string, number>()
export function measure(text: string, size: number, weight = 400, mono = false, display = false): number {
  const family=fontFamily(text,mono,display)
  const key = `${size}/${weight}/${family}/${text}`
  const cached = cache.get(key)
  if (cached !== undefined) return cached
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="500"><text x="2500" y="200" direction="${isRtl(text) ? "rtl" : "ltr"}" font-family="${family}" font-size="${size}" font-weight="${weight}">${escapeXml(text)}</text></svg>`
  const width = new Resvg(svg, {font:fontOptions(family)}).getBBox()?.width ?? 0
  cache.set(key, width)
  return width
}
export function wrapMeasured(text: string, width: number, size: number, weight = 400, display = false) {
  const rows: string[] = []
  for (const paragraph of text.split("\n")) {
    let line = ""
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (measure(word, size, weight,false,display) > width) throw new Error(`Unbreakable text exceeds width: ${word}`)
      const candidate = line ? `${line} ${word}` : word
      if (line && measure(candidate, size, weight,false,display) > width) { rows.push(line); line = word }
      else line = candidate
    }
    if (line) rows.push(line)
  }
  return rows
}
