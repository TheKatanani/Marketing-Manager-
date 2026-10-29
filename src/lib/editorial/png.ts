import { Resvg } from "@resvg/resvg-js"
import path from "node:path"
import { renderEditorialSvg, type GraphicInput } from "./render"
export function renderEditorialPng(input:GraphicInput) {
  return new Resvg(renderEditorialSvg(input),{font:{fontFiles:[path.join(process.cwd(),"public/fonts/NotoSansArabic.ttf"),path.join(process.cwd(),"public/fonts/NotoSans.ttf")],loadSystemFonts:false,defaultFontFamily:"Noto Sans Arabic"}}).render().asPng()
}
