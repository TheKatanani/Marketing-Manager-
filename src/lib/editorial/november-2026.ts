import type { EditorialPack, EditorialTopic, EditorialSlide, Locale } from "./types"
import { novemberArticles } from "./articles"
import { elevatedCopy, elevatedMicroPosts } from "./elevated-copy"

const campaign = "nov2026"
const withTracking = (url: string, channel: string, key: string) => `${url}?utm_source=${channel.toLowerCase()}&utm_medium=social&utm_campaign=${campaign}&utm_content=${key}`
const date = (day: number, hour: number) => `2026-11-${String(day).padStart(2,"0")}T${String(hour-2).padStart(2,"0")}:00:00.000Z`
type Core = { key: string; day: number; title: string; theme: string; pillar: string; lang: Locale; linkedin: string; instagram: string; tweets: string[]; slides: [string,string][]; sourceType?: EditorialTopic["sourceType"]; url?: string; sourceLabel?: string; articleKey?: string; notes?: string }
const metadata = [
  {
    "key": "01-brief",
    "day": 1,
    "theme": "قرارات قبل الكود",
    "pillar": "FREELANCE",
    "lang": "ar",
    "sourceType": "ARTICLE",
    "articleKey": "brief",
    "url": "https://thekatanani.com/ar/blog/website-brief-before-choosing-tools",
    "sourceLabel": "دليل النطاق الهندسي"
  },
  {
    "key": "02-proposal",
    "day": 3,
    "theme": "قرارات قبل الكود",
    "pillar": "FREELANCE",
    "lang": "en"
  },
  {
    "key": "03-coachspace",
    "day": 5,
    "theme": "قرارات قبل الكود",
    "pillar": "PROJECT",
    "lang": "en",
    "sourceType": "PROJECT",
    "url": "https://thekatanani.com/en/projects/coach-space",
    "sourceLabel": "Coach Space",
    "notes": "Verified: Team Leader and Frontend Developer; built the web frontend integrated with shared Django/DRF API. Review recommendations are illustrative, not extra project claims."
  },
  {
    "key": "04-rtl",
    "day": 8,
    "theme": "واجهة تتحمل الواقع",
    "pillar": "TECH",
    "lang": "ar",
    "sourceType": "ARTICLE",
    "articleKey": "rtl",
    "url": "https://thekatanani.com/ar/blog/arabic-interface-review-checklist",
    "sourceLabel": "دليل RTL وCLS"
  },
  {
    "key": "05-performance",
    "day": 10,
    "theme": "واجهة تتحمل الواقع",
    "pillar": "TECH",
    "lang": "en"
  },
  {
    "key": "06-marwan",
    "day": 12,
    "theme": "واجهة تتحمل الواقع",
    "pillar": "PROJECT",
    "lang": "ar",
    "sourceType": "PROJECT",
    "url": "https://thekatanani.com/ar/projects/dr-marwan-alazzawi-aviation-academy",
    "sourceLabel": "منصة د. مروان العزاوي",
    "notes": "Bilingual project context; review workflow is a recommendation, not an assertion of delivered features or measured results."
  },
  {
    "key": "07-ai-review",
    "day": 15,
    "theme": "AI تحت المراجعة",
    "pillar": "AI",
    "lang": "en",
    "sourceType": "ARTICLE",
    "articleKey": "ai",
    "url": "https://thekatanani.com/en/blog/ai-code-change-review-workflow",
    "sourceLabel": "Reviewable AI workflow"
  },
  {
    "key": "08-bug-report",
    "day": 17,
    "theme": "AI تحت المراجعة",
    "pillar": "TECH",
    "lang": "ar"
  },
  {
    "key": "09-content-workflow",
    "day": 19,
    "theme": "AI تحت المراجعة",
    "pillar": "AI",
    "lang": "en"
  },
  {
    "key": "10-handoff",
    "day": 22,
    "theme": "تشغيل بلا مفاجآت",
    "pillar": "FREELANCE",
    "lang": "ar",
    "sourceType": "STANDALONE",
    "url": "https://thekatanani.com/ar/contact",
    "sourceLabel": "مراجعة تسليم الموقع"
  },
  {
    "key": "11-shopify-decision",
    "day": 24,
    "theme": "تشغيل بلا مفاجآت",
    "pillar": "ECOMMERCE",
    "lang": "en",
    "sourceType": "ARTICLE",
    "articleKey": "shopify",
    "url": "https://thekatanani.com/en/blog/shopify-apps-vs-custom-code",
    "sourceLabel": "Shopify architecture guide"
  },
  {
    "key": "12-mahseri",
    "day": 26,
    "theme": "تشغيل بلا مفاجآت",
    "pillar": "PROJECT",
    "lang": "ar",
    "sourceType": "PROJECT",
    "url": "https://thekatanani.com/ar/projects/mahseri-remodeling",
    "sourceLabel": "ماهسري — Wix Studio & Velo",
    "notes": "Built with Wix Studio & Velo. Management workflow is proposed review guidance, not an unverified feature claim."
  },
  {
    "key": "13-recap",
    "day": 29,
    "theme": "قرار المشروع التالي",
    "pillar": "TECH",
    "lang": "ar",
    "sourceType": "STANDALONE",
    "url": "https://thekatanani.com/ar/blog",
    "sourceLabel": "مكتبة الأدلة الهندسية"
  },
  {
    "key": "14-inquiry",
    "day": 30,
    "theme": "قرار المشروع التالي",
    "pillar": "FREELANCE",
    "lang": "en",
    "sourceType": "STANDALONE",
    "url": "https://thekatanani.com/en/contact",
    "sourceLabel": "Project discovery"
  }
] as const
const cores: Core[] = metadata.map((m, i) => ({ ...m, ...elevatedCopy[i] }))

const topics: EditorialTopic[] = cores.map(c => {
  const slides: EditorialSlide[] = c.slides.map(([title,bodyText],i)=>({slideNumber:i+1,title,bodyText,visualCue:"Premium code editor or architecture diagram; problem / mistake / solution / example / takeaway; RTL; illustrative, not a project screenshot."}))
  const linkedUrl = c.url ? withTracking(c.url,"linkedin",c.key) : ""
  const xUrl = c.url ? withTracking(c.url,"x",c.key) : ""
  const tweets = [...c.tweets]
  if(xUrl) tweets[tweets.length-1]+=`\n${xUrl}`
  return {
    key:c.key,title:c.title,theme:c.theme,pillar:c.pillar,date:`2026-11-${String(c.day).padStart(2,"0")}`,
    sourceType:c.sourceType??"STANDALONE",sourceUrl:c.url,sourceLabel:c.sourceLabel,articleKey:c.articleKey,
    notes:c.notes??"Original editorial advice. No invented statistics, testimonials, client outcomes, or guaranteed support duration.",
    versions:[
      {platform:"LINKEDIN",language:c.lang,content:c.linkedin+(linkedUrl?`\n\n${c.lang==="ar"?"التفاصيل:":"Reference:"} ${linkedUrl}`:""),hashtags:c.pillar==="ECOMMERCE"?["Shopify","WebDevelopment"]:c.pillar==="AI"?["AI","CodeReview"]:c.pillar==="FREELANCE"?["Freelancing","WebDevelopment"]:["Frontend","WebDevelopment"],scheduledFor:date(c.day,11),assets:[`/editorial/2026-11/${c.key}/linkedin.png`]},
      {platform:"X",language:c.lang,content:tweets.join("\n---\n"),hashtags:[],scheduledFor:date(c.day,17),assets:[]},
      {platform:"INSTAGRAM",language:"ar",content:c.instagram,hashtags:c.pillar==="ECOMMERCE"?["Shopify","تطوير_الويب","محمد_القطناني"]:["برمجة","تطوير_الويب","محمد_القطناني"],scheduledFor:date(c.day,19),slides,assets:slides.map((_,i)=>`/editorial/2026-11/${c.key}/slide-${i+1}.png`)}
    ]
  }
})

const microPosts = [[2,"حدود التكامل"],[6,"اعتماديات التقدير"],[9,"الخط العربي وCLS"],[13,"إغلاق المشكلة بالدليل"],[16,"اختبار الوصول المرفوض"],[20,"دقة دراسة المشروع"],[23,"التسليم والكاش"],[27,"مطابقة webhook"]].map(([day, title], i) => [Number(day), String(title), elevatedMicroPosts[i]] as const)

for(const [day,title,content] of microPosts) topics.push({key:`x-${day}`,title,theme:day<8?"قرارات قبل الكود":day<15?"واجهة تتحمل الواقع":day<22?"AI تحت المراجعة":"تشغيل بلا مفاجآت",pillar:"MICRO",date:`2026-11-${String(day).padStart(2,"0")}`,sourceType:"STANDALONE",notes:"Standalone X tip. No website dependency.",versions:[{platform:"X",language:"ar",content,hashtags:[],scheduledFor:date(day,13),assets:[]}]})
topics.sort((a,b)=>a.date.localeCompare(b.date))

export const novemberPack: EditorialPack = {
  key:"november-2026-client-content-v1",name:"نوفمبر 2026 — قرارات هندسية قبل الوعود",objective:"جذب مؤسسين ومديري وكالات لمشاريع React وNext.js وتكاملات Shopify عبر قرارات وأمثلة قابلة للمراجعة.",timezone:"Asia/Hebron",startsAt:"2026-11-01T00:00:00+02:00",endsAt:"2026-11-30T23:59:59+02:00",
  strategy:{
    voice:["فصحى مهنية سلسة وإنجليزية طبيعية؛ صوت مطور أول يخاطب المؤسس ومدير الوكالة.","مأزق محدد → خطأ شائع → قرار معماري → مثال قابل للفحص → دعوة مرتبطة بالمشروع.","المنشور يقدم قيمة مكتملة، والموقع يضيف الشرح أو تفاصيل المشروع. أسئلة حقيقية بدل طلب تفاعل مصطنع."],
    visuals:["هوية THE KATANANI المعتمدة: الشعار الأصلي دون إعادة رسم، بترولي #0A4D68، سماوي #D2E5F0، كحلي #2B3451 وأبيض؛ ليلكي #B9AED8 وسيج #A7C8B4 بلمسات محدودة.","كاروسيل 1080×1350 بتصميم تحريري هادئ، ومساحات بيضاء وعناوين خفيفة وإطارات سداسية مشتقة من الهوية؛ دون تدرجات أو إضاءة أو شارة MK بديلة.","غلاف LinkedIn مستقل وغطاء مقال 1600×900. لا تظهر تعليمات التصميم الداخلية داخل الصور.","يُعرض الشعار الأصلي بالأبيض فوق البترولي مباشرةً دون شريط أبيض، وبنسخته الأصلية على الخلفيات الفاتحة؛ الشكل والنسبة محفوظان. عناوين سيريف/نسخي وكود LTR. البنر والشهادات لا يتغيران."],
    cadence:["14 موضوعًا أساسيًا: 14 LinkedIn + 14 Instagram + 14 X، مع 8 نصائح X مستقلة = 50 نسخة اجتماعية.","4 مقالات أصلية، كل منها بالعربية والإنجليزية. تنشر قبل المنشورات التي تشير إليها.","المواعيد بتوقيت فلسطين Asia/Hebron: المقال 08:00، LinkedIn 11:00، X 17:00، Instagram 19:00؛ نصائح X الساعة 13:00.","هذه مواعيد بداية قابلة للتجربة، وليست ادعاءً بأفضل أوقات النشر. 29 و30 نوفمبر للمراجعة ودعوة مشروع واضحة."],
    rules:["لا أرقام نتائج أو إحصائيات أو شهادات عميل أو قصص عمل غير موثقة. الأمثلة موضحة كأمثلة.","Coach Space: Team Leader وFrontend Developer فقط. ماهسري: Wix Studio وVelo. لا نغير تواريخ الشهادات أو البنر.","لا يوجد موضوع Geepas في هذه الحملة. ثلاثة مشاريع متنوعة ومواضيع مستقلة ومقالات مرجعية.","Instagram: رابط البايو أو Story link؛ رابط الكابشن ليس مسارًا قابلًا للنقر. قبل الإحالة لمقال، تحقق من ظهوره العام.","الجدول تحريري داخل BrandPilot. النشر الاجتماعي يحتاج تنفيذًا يدويًا أو ربطًا فعليًا؛ لا تُعرض المواعيد كمنشورات نُشرت تلقائيًا.","مدة الدعم ونطاقه والإضافات حسب اتفاق المشروع، ويمكن تعديل الصياغة من لوحة المحتوى."],
    measurement:["سجل رابط المنشور الفعلي ووقت النشر، ثم راجع أسبوعيًا زيارات المرجع ذات UTM والاستفسارات المؤهلة.","صنّف الاستفسارات Frontend / Shopify، ودوّن كيف وصل العميل بدل افتراض أن التفاعل يعني طلبًا تجاريًا.","قارن حفظ المنشور والنقاشات المفيدة وزيارات الموقع حسب الموضوع والمنصة، مع تسجيل الظروف المتاحة.","في نهاية كل أسبوع عدّل الموضوع أو الصياغة أو الموعد بناءً على بيانات فعلية؛ لا تنشر نتائج نجاح متوقعة كأنها حدثت."]
  },articles:novemberArticles,topics
}
