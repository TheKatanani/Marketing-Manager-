import assert from "node:assert/strict"
import {prisma} from "../src/lib/prisma"
import {importNovemberPack,NOVEMBER_REVISION} from "../src/lib/editorial/service"
import {novemberPack} from "../src/lib/editorial/november-2026"

// In-memory Prisma boundary: this regression check never connects to a database.
const state={campaign:new Map<string,Record<string,unknown>>(),blogPost:new Map<string,Record<string,unknown>>(),post:new Map<string,Record<string,unknown>>(),postVersion:new Map<string,Record<string,unknown>>()}
let sequence=0
function table(name:keyof typeof state) {
  return {
    async upsert({where,create,update}:{where:unknown;create:Record<string,unknown>;update:Record<string,unknown>}) {
      const key=JSON.stringify(where), existing=state[name].get(key)
      const saved=existing?{...existing,...update}:{id:`memory-${++sequence}`,...create}
      state[name].set(key,saved)
      return saved
    },
    async updateMany({where,data}:{where:{userId:string;campaignId:string;slug:{in:string[]}};data:Record<string,unknown>}) {
      for(const [key,row] of state[name])if(row.userId===where.userId&&row.campaignId===where.campaignId&&where.slug.in.includes(String(row.slug)))state[name].set(key,{...row,...data})
      return {count:2}
    }
  }
}
const tx={campaign:table("campaign"),blogPost:table("blogPost"),post:table("post"),postVersion:table("postVersion")}
Object.assign(prisma,{$executeRawUnsafe:async()=>0,$transaction:async(callback:(client:typeof tx)=>unknown)=>callback(tx)})
async function main() {
  const first=await importNovemberPack("editorial-test-owner")
  assert.deepEqual([first.topics,first.versions,first.articles],[22,50,4])
  assert.deepEqual([state.campaign.size,state.post.size,state.postVersion.size,state.blogPost.size],[1,22,50,8])
  const versionKey=state.postVersion.keys().next().value!
  const before=state.postVersion.get(versionKey)!
  const adjusted=new Date("2026-11-02T10:30:00Z"), publishedAt=new Date("2026-11-02T10:31:00Z")
  state.postVersion.set(versionKey,{...before,content:"old revision",status:"PUBLISHED",scheduledFor:adjusted,publishedAt,publishedUrl:"https://example.test/published"})
  for(const lang of ["ar","en"])state.blogPost.set(`legacy-${lang}`,{userId:"editorial-test-owner",campaignId:first.campaignId,slug:`website-handoff-and-maintenance-checklist-${lang}`,content:"Preserve the older article",status:"PLANNED"})
  await importNovemberPack("editorial-test-owner")
  assert.deepEqual([state.campaign.size,state.post.size,state.postVersion.size,state.blogPost.size],[1,22,50,10])
  const updated=state.postVersion.get(versionKey)!
  assert.equal(updated.content,novemberPack.topics[0].versions[0].content)
  assert.equal(updated.status,"PUBLISHED")
  assert.equal(updated.scheduledFor,adjusted)
  assert.equal(updated.publishedAt,publishedAt)
  assert.equal(updated.publishedUrl,"https://example.test/published")
  assert.equal(state.blogPost.get("legacy-ar")!.campaignId,null)
  assert.equal(state.blogPost.get("legacy-ar")!.content,"Preserve the older article")
  assert.equal(JSON.parse(String([...state.campaign.values()][0].strategy)).revision,NOVEMBER_REVISION)
  console.log("PASS: repeat import updates copy; counts, publication evidence, schedules and legacy article are preserved.")
}
main().catch(error=>{console.error(error);process.exitCode=1})
