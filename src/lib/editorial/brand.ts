import fs from "node:fs"
import path from "node:path"
export const brand = {
  name:"THE KATANANI",
  revision:"katanani-approved-identity-v3",
  palette:{petroleum:"#0A4D68",sky:"#D2E5F0",navy:"#2B3451",white:"#FFFFFF",lilac:"#B9AED8",sage:"#A7C8B4"},
  logo:"/brand/katanani/primary-transparent.png",
  logoDimensions:{width:2172,height:724},
}
let logoData:string|undefined
export function approvedLogoData() {
  return logoData??=("data:image/png;base64,"+fs.readFileSync(path.join(process.cwd(),"public",brand.logo)).toString("base64"))
}
