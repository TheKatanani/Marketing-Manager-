import { Resvg } from "@resvg/resvg-js"
import { fontOptions } from "./typography"
import { renderEditorialSvg, type GraphicInput } from "./render"
export function renderEditorialPng(input:GraphicInput) {
  const svg=renderEditorialSvg(input)
  const [,w,h]=svg.match(/width="(\d+)" height="(\d+)"/)!
  const textOnly=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">${svg.match(/<text\b[^>]*>[\s\S]*?<\/text>/g)?.join("")??""}</svg>`
  const bounds=new Resvg(textOnly,{font:fontOptions()}).getBBox()
  if(!bounds || bounds.x<40 || bounds.y<40 || bounds.x+bounds.width>Number(w)-40 || bounds.y+bounds.height>Number(h)-20) {
    throw Error(`Text outside graphic bounds: ${input.title} (${JSON.stringify(bounds)})`)
  }
  return new Resvg(svg,{font:fontOptions()}).render().asPng()
}
