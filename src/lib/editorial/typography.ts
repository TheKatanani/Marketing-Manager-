import { Resvg } from "@resvg/resvg-js"
import path from "node:path"
export const fontOptions = () => ({ fontFiles: ["NotoSansArabic.ttf", "NotoSans.ttf", "JetBrainsMono.ttf"].map(f => path.join(process.cwd(), "public/fonts", f)), loadSystemFonts: false, defaultFontFamily: "Noto Sans" })
export const escapeXml = (s: string) => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}[c]!))
export const isRtl = (s: string) => /[\u0600-\u06ff]/.test(s)
const cache = new Map<string, number>()
export function measure(text: string, size: number, weight = 400, mono = false): number {
  const key = `${size}/${weight}/${mono}/${text}`
  const cached = cache.get(key)
  if (cached !== undefined) return cached
  const family = mono ? "JetBrains Mono" : isRtl(text) ? "Noto Sans Arabic" : "Noto Sans"
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="5000" height="500"><text x="2500" y="200" direction="${isRtl(text) ? "rtl" : "ltr"}" font-family="${family}" font-size="${size}" font-weight="${weight}">${escapeXml(text)}</text></svg>`
  const width = new Resvg(svg, {font:fontOptions()}).getBBox()?.width ?? 0
  cache.set(key, width)
  return width
}
export function wrapMeasured(text: string, width: number, size: number, weight = 400) {
  const rows: string[] = []
  for (const paragraph of text.split("\n")) {
    let line = ""
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (measure(word, size, weight) > width) throw new Error(`Unbreakable text exceeds width: ${word}`)
      const candidate = line ? `${line} ${word}` : word
      if (line && measure(candidate, size, weight) > width) { rows.push(line); line = word }
      else line = candidate
    }
    if (line) rows.push(line)
  }
  return rows
}
