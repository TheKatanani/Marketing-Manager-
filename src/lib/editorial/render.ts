export interface GraphicInput {
  title: string
  body: string
  eyebrow?: string
  number?: number
  total?: number
  kind: "slide" | "linkedin" | "article" | "story"
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" }[c]!))

const rtl = (s: string) => /[\u0600-\u06ff]/.test(s)

function wrap(text: string, max: number) {
  const result: string[] = []
  for (const paragraph of text.split("\n")) {
    let line = ""
    for (const word of paragraph.split(/\s+/)) {
      if (!word) continue
      if (line && (line + " " + word).length > max) {
        result.push(line)
        line = word
      } else {
        line += (line ? " " : "") + word
      }
    }
    if (line) result.push(line)
  }
  return result
}

function lines(
  text: string,
  x: number,
  y: number,
  size: number,
  width: number,
  color: string,
  weight = 400,
  lineHeightRatio = 1.45
) {
  const charWidth = size * 0.56
  const maxChars = Math.max(12, Math.floor(width / charWidth))
  const rows = wrap(text, maxChars)
  const lineSpacing = size * lineHeightRatio
  const svg = rows
    .map(
      (line, i) =>
        `<text x="${x}" y="${Math.round(y + i * lineSpacing)}" text-anchor="${
          rtl(line) ? "start" : "end"
        }" direction="${rtl(line) ? "rtl" : "ltr"}" unicode-bidi="plaintext" font-family="${
          rtl(line) ? "Noto Sans Arabic" : "Noto Sans"
        }" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(line)}</text>`
    )
    .join("")

  return { height: rows.length * lineSpacing, rowsCount: rows.length, svg }
}

export function renderEditorialSvg(input: GraphicInput) {
  const isArticle = input.kind === "article"
  const isStory = input.kind === "story"
  const isLinkedIn = input.kind === "linkedin"

  const w = isArticle ? 1600 : isLinkedIn ? 1200 : 1080
  const h = isArticle ? 900 : isStory ? 1920 : 1350
  const pad = isArticle ? 110 : 92
  const right = w - pad
  const availableWidth = w - pad * 2

  const isCover = input.kind !== "slide" || input.number === 1 || input.number === input.total
  const bg = isCover ? "#0A4D68" : "#F5F9FC"
  const fg = isCover ? "#F5F9FC" : "#052634"
  const muted = isCover ? "#D2E5F0" : "#4B6072"
  const accent = isCover ? "#B9AED8" : "#0A4D68"

  // Dynamic responsive typography
  let titleSize = isArticle ? 72 : isLinkedIn ? 76 : isStory ? 66 : 64
  let bodySize = isArticle ? 32 : isStory ? 38 : 40
  let top = isArticle ? 280 : isStory ? 580 : 410
  let gap = isArticle ? 36 : 46

  if (isArticle) {
    if (input.title.length > 50) titleSize = 64
    if (input.title.length > 70) titleSize = 58
  } else if (isLinkedIn) {
    if (input.title.length > 45) titleSize = 68
    if (input.title.length > 70) titleSize = 60
  } else if (input.title.length > 40) {
    titleSize = Math.max(50, titleSize - 8)
  }

  if (input.body.length > 200) bodySize = Math.max(30, bodySize - 4)
  if (input.body.length > 300) bodySize = Math.max(26, bodySize - 8)

  let title = lines(input.title, right, top, titleSize, availableWidth, fg, 700)
  let body = lines(input.body, right, top + title.height + gap, bodySize, availableWidth, muted, 400)

  const maxBottom = h - (isArticle ? 120 : isStory ? 180 : 160)

  // Iteratively scale down if still overflowing safe area
  while (top + title.height + gap + body.height > maxBottom && titleSize > 40) {
    titleSize -= 3
    if (bodySize > 24) bodySize -= 2
    if (top > (isArticle ? 240 : 340)) top -= 8
    gap = Math.max(24, gap - 3)
    title = lines(input.title, right, top, titleSize, availableWidth, fg, 700)
    body = lines(input.body, right, top + title.height + gap, bodySize, availableWidth, muted, 400)
  }

  if (top + title.height + gap + body.height > maxBottom) {
    throw new Error(`Graphic text exceeds its safe area: ${input.title}`)
  }

  const eyebrowY = isArticle ? 230 : isStory ? 500 : 270

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect width="${w}" height="${h}" fill="${bg}"/>
  <circle cx="${isCover ? 50 : w}" cy="${isCover ? 30 : h * 0.64}" r="${isArticle ? 380 : 340}" fill="${
    isCover ? "#B9AED8" : "#A7C8B4"
  }" opacity="${isCover ? 0.12 : 0.14}"/>
  <path d="M${pad} ${isArticle ? 180 : 300}H${right}" stroke="${isCover ? "#76A5B2" : "#D2E5F0"}" stroke-width="2"/>
  <rect x="${pad}" y="${isArticle ? 65 : 95}" width="70" height="70" rx="20" fill="${isCover ? "#F5F9FC" : "#0A4D68"}"/>
  <text x="${pad + 35}" y="${isArticle ? 111 : 141}" text-anchor="middle" font-family="Noto Sans" font-size="29" font-weight="700" fill="${
    isCover ? "#0A4D68" : "#F5F9FC"
  }">MK</text>
  <text x="${right}" y="${isArticle ? 98 : 130}" text-anchor="end" font-family="Noto Sans" font-size="21" letter-spacing="2" fill="${fg}">MOHAMMED KATANANI</text>
  <text x="${right}" y="${isArticle ? 135 : 168}" text-anchor="end" font-family="Noto Sans" font-size="18" fill="${muted}">FRONTEND &amp; SHOPIFY</text>
  ${lines(input.eyebrow ?? "من الفكرة للتسليم", right, eyebrowY, 24, availableWidth, accent, 600).svg}
  ${title.svg}
  ${body.svg}
  <rect x="${right - 120}" y="${h - 140}" width="120" height="5" rx="2" fill="#B9AED8"/>
  <text x="${right}" y="${h - 85}" text-anchor="end" font-family="Noto Sans" font-size="22" fill="${fg}">thekatanani.com</text>
  <text x="${pad}" y="${h - 85}" font-family="Noto Sans" font-size="24" fill="${muted}">${
    input.number ? `${String(input.number).padStart(2, "0")} / ${String(input.total ?? 5).padStart(2, "0")}` : "NOV 2026"
  }</text>
</svg>`
}
