export interface ArtDirection {
  label: string
  tags: string[]
  filename: string
  code: string[]
  flow: string[]
  compare: [string, string, string, string]
}
const directions: Record<string, ArtDirection> = {
  "01-brief": {label:"SCOPE / BEFORE THE STACK",tags:["API contract","Discovery"],filename:"acceptance.yaml",code:["journey: service-request","source: request-database","on_crm_failure: keep_pending","retry: same_operation_key","acceptance:","  records_created: 1"],flow:["REQUEST","DURABLE SAVE","CRM / RETRY"],compare:["ASSUMPTION","A simple integration","CONTRACT","Failure + owner + retry"]},
  "02-proposal": {label:"ESTIMATE / EXPOSE THE UNKNOWN",tags:["React","API contract"],filename:"proposal.contract.ts",code:["type Dependency = {","  owner: string;","  testAccess: Date;","  errorShape: ApiError;","  acceptance: Check[];","};"],flow:["CONTRACT","DEPENDENCIES","ACCEPTANCE"],compare:["UNCLEAR","The API is ready","REVIEWABLE","Sample + auth + errors"]},
  "03-coachspace": {label:"COACH SPACE / FRONTEND SCOPE",tags:["Web frontend","Django / DRF"],filename:"course-view.state.ts",code:["type CourseView =","  | { state: 'loading' }","  | { state: 'empty' }","  | { state: 'ready' }","  | { state: 'denied' }","  | { state: 'failed' };"],flow:["WEB UI","SHARED API","RECOVERY"],compare:["EMPTY","No courses available","FAILED","Could not load courses"]},
  "04-rtl": {label:"RTL / MEASURE THE REAL PAGE",tags:["Next.js 16","RTL / CLS"],filename:"service-card.css",code:[".service-card {","  padding-inline: 1.5rem;","  min-inline-size: 0;","  overflow-wrap: anywhere;","}","/* Test cold font load. */"],flow:["FONT LOAD","TEXT WRAP","LAYOUT SHIFT"],compare:["PATCH","A fixed height","REVIEW","Font metrics + real text"]},
  "05-performance": {label:"NEXT.JS / HONEST INTERACTION",tags:["Server Actions","React"],filename:"rename-draft.ts",code:["const user = await requireUser();","const data = schema.parse(input);","await updateOwnedDraft({","  id, ownerId: user.id, data","});","// Pending is not confirmed."],flow:["PROPOSE","AUTHORIZE","CONFIRM / RESET"],compare:["PENDING","A temporary proposal","CONFIRMED","Server accepted the write"]},
  "06-marwan": {label:"BILINGUAL / FOLLOW THE JOURNEY",tags:["Arabic + English","Service UI"],filename:"localized-route.ts",code:["const route = {","  serviceId: 'consulting',","  locale: 'ar',","};","// Preserve service context","switchLocale(route, 'en');"],flow:["DEEP LINK","SWITCH LOCALE","CONTACT"],compare:["FRAGMENT","Translated homepage","JOURNEY","Same service in both locales"]},
  "07-ai-review": {label:"AI / REVIEW THE PERMISSION",tags:["Code review","Server Actions"],filename:"ownership.check.ts",code:["// Review the denied branch.","actor.id = 'B';","draft.ownerId = 'A';","expect(result.ok).toBe(false);","expect(stored).toEqual(before);","// A build cannot prove this."],flow:["ACCEPTANCE","FOCUSED DIFF","FAILURE CHECK"],compare:["SUMMARY","It builds successfully","EVIDENCE","Non-owner update is denied"]},
  "08-bug-report": {label:"DEBUG / NAME THE TRANSITION",tags:["State machine","Reproduction"],filename:"form.recovery.test.ts",code:["given('a valid form');","when('the request fails');","then('preserve field values');","and('show an actionable error');","and('enable retry');","// Repeat with successful retry."],flow:["PENDING","FAILED","RETRY / READY"],compare:["VAGUE","The button is broken","REPRODUCIBLE","Pending stays true on failure"]},
  "09-content-workflow": {label:"CONTENT / FACTS ARE A CONTRACT",tags:["AI workflow","Fact review"],filename:"case-study.source.json",code:["{","  \"role\": \"Frontend Developer\",","  \"scope\": \"web frontend\",","  \"api\": \"shared Django/DRF\",","  \"claims\": \"verified only\"","}"],flow:["SOURCE","FACT REVIEW","FORMAT REVIEW"],compare:["DRIFT","Built the whole platform","SOURCE","Team lead + frontend scope"]},
  "10-handoff": {label:"HANDOFF / VERIFY THE READ PATH",tags:["Next.js","Content ops"],filename:"handoff.checklist",code:["[ ] edit as content owner","[ ] save the new title","[ ] open a separate session","[ ] inspect public content","[ ] check the other locale","[ ] retry after an error"],flow:["MUTATION","INVALIDATE","PUBLIC READ"],compare:["WRITE","The save succeeded","READ","The public page is current"]},
  "11-shopify-decision": {label:"SHOPIFY / CHOOSE THE LAYER",tags:["Liquid","GraphQL","Shopify"],filename:"webhook.worker.ts",code:["await verify(request);","await durableInbox.insert(event);","// Acknowledge after persistence.","await claimAndProcess();","await retryFailed();","await reconcileCurrentState();"],flow:["VERIFY","DURABLE INBOX","SYNC / RECONCILE"],compare:["LIQUID / THEME","Merchant-editable presentation","CUSTOM APP","Admin API + operational logic"]},
  "12-mahseri": {label:"MAHSERI / EDITOR FIRST",tags:["Wix Studio","Velo"],filename:"editor.workflow",code:["project.title = required;","project.images = validated;","review('mobile preview');","confirm('content approval');","publish();","check('public page');"],flow:["CONTENT MODEL","PREVIEW","PUBLISH"],compare:["VISUAL ONLY","Looks ready in a mockup","OPERABLE","The editor can update it"]},
  "13-recap": {label:"RELEASE / FOUR DECISION GATES",tags:["Frontend","Shopify"],filename:"release.gates.yaml",code:["scope: acceptance_contract","rtl: real_journey_checked","ai_pr: permissions_verified","shopify: layer_justified","next: resolve_weakest_gate"],flow:["SCOPE","REVIEW","RELEASE"],compare:["PROMISE","Fast, secure, professional","EVIDENCE","Checks another person can run"]},
  "14-inquiry": {label:"PROJECT DISCOVERY / START HERE",tags:["React / Next.js","Shopify"],filename:"project-brief.md",code:["## Current URL","## User task + bottleneck","## Connected systems","## Designs + content","## Date + constraints","## Acceptance + owner"],flow:["BOTTLENECK","DISCOVERY","SCOPED BUILD"],compare:["STACK LIST","We need a modern website","PROJECT BRIEF","A task + constraint + owner"]}
}
const checks: Record<string,string[]> = {
  "01-brief":["Map the integration boundary","Repeat an uncertain request","Name the operational owner"],
  "02-proposal":["Inspect one real API response","Confirm test access and owner","Write the acceptance check"],
  "03-coachspace":["Separate empty and failed","Preserve context on retry","Explain the frontend scope"],
  "04-rtl":["Record a cold font load","Test long Arabic headings","Complete the keyboard journey"],
  "05-performance":["Expose the pending state","Authorize the server write","Verify rejection and recovery"],
  "06-marwan":["Open a service deep link","Keep context across locales","Complete contact on mobile"],
  "07-ai-review":["Define the ownership boundary","Inspect the actual diff","Run the denied-access check"],
  "08-bug-report":["Write reproduction steps","Name the broken transition","Repeat failure, then retry"],
  "09-content-workflow":["Verify the contribution","Preserve the source facts","Review each platform draft"],
  "10-handoff":["Edit as the content owner","Check a separate public session","Document content refresh"],
  "11-shopify-decision":["Identify the Shopify layer","Persist before acknowledging","Plan retry and reconciliation"],
  "12-mahseri":["Model recurring content","Preview the editor workflow","Verify the published page"],
  "13-recap":["Name the weakest release gate","Collect reproducible evidence","Resolve one unknown today"],
  "14-inquiry":["Share the current bottleneck","List systems and constraints","Agree on an acceptance check"]
}
const standfirsts:Record<string,string>={
  "01-brief":"منع التكرار قرار خادمي يجب أن يظهر في نطاق التكامل.",
  "02-proposal":"Prove the contract before committing the delivery date.",
  "03-coachspace":"A failed request must not look like an empty course list.",
  "04-rtl":"اختبر الخط المتأخر والنص المختلط ومسار التصحيح.",
  "05-performance":"Pending, confirmed and rejected are different promises.",
  "06-marwan":"لغة أخرى، الخدمة نفسها، وسياق يستطيع المستخدم إكماله.",
  "07-ai-review":"The denied request belongs in the acceptance evidence.",
  "08-bug-report":"اكتب انتقال الحالة الذي انكسر، ثم أثبت إصلاحه.",
  "09-content-workflow":"Preserve role, stack and evidence through every rewrite.",
  "10-handoff":"نجاح الكتابة لا يثبت ظهور المحتوى الجديد للزائر.",
  "11-shopify-decision":"Scope the layer, the failure path and the operating owner.",
  "12-mahseri":"اختبر مهمة المحرر من المدخلات إلى الصفحة العامة.",
  "13-recap":"لكل بوابة قبول دليل يستطيع شخص آخر إعادة اختباره.",
  "14-inquiry":"Turn the blocked workflow into a bounded delivery plan.",
}
export function artDirection(key = "01-brief"): ArtDirection & { checks:string[];standfirst:string } { return {...(directions[key] ?? directions["01-brief"]),checks:checks[key]??checks["01-brief"],standfirst:standfirsts[key]??standfirsts["01-brief"]} }
export const articleTopic: Record<string, string> = {brief:"01-brief",rtl:"04-rtl",ai:"07-ai-review",shopify:"11-shopify-decision"}
