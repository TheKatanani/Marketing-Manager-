import { writeFileSync, mkdirSync } from "node:fs"
import { resolve } from "node:path"
import { novemberPack } from "../src/lib/editorial/november-2026"
import { novemberArticles } from "../src/lib/editorial/articles"

const outDir = resolve(process.argv[2] || "C:/Users/Mohammed Katanani/Documents/Codex/2026-10-27/we-ll-add-certifications-programs-to-2/outputs")
mkdirSync(outDir, {recursive:true})

// 1. Full Articles Markdown
let articlesMd = `# مقالات نوفمبر 2026 التقنية والمترجمة - محمد قطناني
# Mohammed Katanani - November 2026 Technical Articles

هذه المقالات الأربعة تم إعدادها باللغتين العربية والإنجليزية، وتعمل كمرجع تقني دائم وموثوق في المعرض (Portfolio) على thekatanani.com لدعم منشورات لينكدإن وإكس وإنستغرام.

---
`

for (const art of novemberArticles) {
  articlesMd += `
## ${art.title.ar} / ${art.title.en}
- **الرابط الدائم (Slug):** \`${art.slug}\`
- **التصنيف:** ${art.category} | **الوسوم:** ${art.tags.join(", ")}
- **تاريخ النشر المجدول:** ${art.scheduledFor} (توقيت الخليل / UTC+2)
- **الغلاف:** \`${art.cover}\`

### الملخص بالعربية
${art.excerpt.ar}

### English Excerpt
${art.excerpt.en}

---
### النص العربي الكامل:
${art.content.ar}

---
### Full English Text:
${art.content.en}

============================================================
`
}

writeFileSync(resolve(outDir, "november-2026-articles.md"), articlesMd, "utf-8")

// 2. Full Campaign Copy (All 22 topics, 50 versions)
let copyMd = `# حملة محتوى نوفمبر 2026 الكاملة - BrandPilot
# Complete November 2026 Social Campaign Copy

- **الهدف التسويقي:** استقطاب عملاء تطوير الواجهات الأمامية (Frontend) ومتاجر شوبيفاي (Shopify) وتثبيت معرض الأعمال كمرجع هندسي دائم.
- **التوزيع الأسبوعي:**
  1. الأسبوع 1: حدود التكامل واعتماديات التقدير؛ Coach Space: قيادة الفريق وتطوير واجهة الويب مع Django/DRF مشترك.
  2. الأسبوع 2: CLS والخط العربي والتحديث المتفائل؛ رحلة ثنائية اللغة انطلاقًا من مشروع د. مروان.
  3. الأسبوع 3: عقد قبول لتعديلات AI واختبار الرفض وتقارير حالات الفشل ودقة المحتوى.
  4. الأسبوع 4: التسليم والكاش؛ Liquid وAdmin GraphQL وStorefront والمطابقة؛ ماهسري: Wix Studio وVelo.
- **إجمالي المواضيع:** 22 موضوعاً
- **إجمالي المنشورات:** 50 نسخة مصممة ومكتوبة للمنصات (LinkedIn, X, Instagram)

---
`

for (const topic of novemberPack.topics) {
  copyMd += `
## الموضوع: ${topic.title}
- **المفتاح:** ${topic.key}
- **الموضوع الرئيسي:** ${topic.theme}
- **تاريخ النشر المقترح:** ${topic.date}
- **النوع:** ${topic.sourceType}
- **الرابط:** ${topic.sourceUrl || "منشور مستقل (لا يحتاج رابط)"}

`
  for (const v of topic.versions) {
    copyMd += `### منصة [${v.platform.toUpperCase()}] (${(v.language || "ar").toUpperCase()})
- **التوقيت المقترح:** ${v.scheduledFor}
- **الوسوم:** ${v.hashtags ? v.hashtags.join(", ") : "لا يوجد"}
${v.slides ? `- **عدد الشرائح (Slides):** ${v.slides.length}\n` : ""}
**نص المنشور:**
\`\`\`text
${v.content}
\`\`\`

${v.slides?.map(s => `#### ${s.slideNumber}. ${s.title}\n${s.bodyText}\n`).join("\n") || ""}

`
  }
  copyMd += `------------------------------------------------------------\n`
}

writeFileSync(resolve(outDir, "november-2026-campaign-copy.md"), copyMd, "utf-8")

const linkedinPlan = [
  "# November 2026 — LinkedIn publishing plan",
  "Times use Asia/Hebron. This is a manual publishing plan; posts are not automatically published.",
  ...novemberPack.topics.flatMap(topic => {
    const version=topic.versions.find(v=>v.platform==="LINKEDIN")
    if(!version)return []
    const local=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Hebron",dateStyle:"full",timeStyle:"short"}).format(new Date(version.scheduledFor))
    return [`## ${topic.title}\n\n${local}\n\nGraphic: ${version.assets[0]}\n\n${version.content}\n\n${version.hashtags.map(h=>"#"+h).join(" ")}\n`]
  })
].join("\n\n")
writeFileSync(resolve(outDir,"linkedin-publishing-plan-november-2026.md"),linkedinPlan,"utf-8")

// 3. Campaign JSON
const campaignJson = {
  pack: novemberPack,
  articles: novemberArticles
}
writeFileSync(resolve(outDir, "november-2026-campaign.json"), JSON.stringify(campaignJson, null, 2), "utf-8")

// 4. iCalendar (.ics) export
function formatIcsDate(isoStr: string): string {
  const d = new Date(isoStr)
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
}

let ics = [
  "BEGIN:VCALENDAR",
  "VERSION:2.0",
  "PRODID:-//BrandPilot//November 2026 Editorial//EN",
  "CALSCALE:GREGORIAN",
  "METHOD:PUBLISH",
  "X-WR-CALNAME:Mohammed Katanani - November 2026 Campaign",
  "X-WR-TIMEZONE:Asia/Hebron"
]
const icsEscape = (value:string) => value.replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/;/g,"\\;").replace(/,/g,"\\,")
// RFC 5545: fold at 75 octets without splitting UTF-8 characters.
const fold = (line:string) => {
  let row="", bytes=0
  const rows:string[]=[]
  for(const char of line) {
    const length=Buffer.byteLength(char,"utf8")
    if(bytes+length>75) {rows.push(row);row=" ";bytes=1}
    row+=char;bytes+=length
  }
  rows.push(row)
  return rows.join("\r\n")
}

for (const topic of novemberPack.topics) {
  for (const v of topic.versions) {
    const dtStart = formatIcsDate(v.scheduledFor)
    // 30 min duration
    const end = new Date(new Date(v.scheduledFor).getTime() + 30 * 60 * 1000)
    const dtEnd = formatIcsDate(end.toISOString())
    const summary = `[${v.platform.toUpperCase()}] ${topic.title}`
    const desc = v.content

    ics.push(
      "BEGIN:VEVENT",
      `UID:editorial-2026-11-${topic.key}-${v.platform}@thekatanani.com`,
      `DTSTAMP:${formatIcsDate(new Date().toISOString())}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${icsEscape(summary)}`,
      `DESCRIPTION:${icsEscape(desc)}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT"
    )
  }
}

ics.push("END:VCALENDAR")
writeFileSync(resolve(outDir, "november-2026-calendar.ics"), ics.map(fold).join("\r\n")+"\r\n", "utf-8")

console.log("Exported all deliverables to " + outDir)
