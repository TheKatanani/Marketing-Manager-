import type { EditorialPack, EditorialTopic, EditorialSlide, Locale } from "./types"
import { novemberArticles } from "./articles"

const base = "https://thekatanani.com"
const article = (slug: string, lang: Locale = "ar") => `${base}/${lang}/blog/${slug}`
const project = (slug: string, lang: Locale = "ar") => `${base}/${lang}/projects/${slug}`
const campaign = "nov2026"
const withTracking = (url: string, channel: string, key: string) => `${url}?utm_source=${channel.toLowerCase()}&utm_medium=social&utm_campaign=${campaign}&utm_content=${key}`
const date = (day: number, hour: number) => `2026-11-${String(day).padStart(2,"0")}T${String(hour-2).padStart(2,"0")}:00:00.000Z`
type Core = { key: string; day: number; title: string; theme: string; pillar: string; lang: Locale; linkedin: string; instagram: string; tweets: string[]; slides: [string,string][]; sourceType?: EditorialTopic["sourceType"]; url?: string; sourceLabel?: string; articleKey?: string; notes?: string }
const cores: Core[] = [
  {
    key: "01-brief", day: 1, title: "قبل ما نختار التقنية", theme: "المتطلبات قبل الأدوات", pillar: "FREELANCE", lang: "ar",
    sourceType: "ARTICLE", articleKey: "brief", url: article("website-brief-before-choosing-tools"), sourceLabel: "دليل وصف المشروع",
    linkedin: `قبل ما نحكي Next.js أو Shopify، بدي أفهم شو لازم ينجز الموقع.

لما تكون البداية «بدي موقع احترافي»، ببلّش بهالأسئلة:

• مين الزائر، وشو أهم خطوة بدنا إياه يعملها؟
• أي محتوى جاهز، ومين رح يجهز الباقي؟
• هل في نظام لازم نتصل فيه؟ وشو البيانات اللي رح تنتقل؟
• شو ضروري للإطلاق، وشو ممكن يتأجل؟
• مين رح يدير الموقع بعد التسليم؟

إجاباتها بتساعد نحول الفكرة لصفحات ووظائف وحدود واضحة. بعدها بصير اختيار التقنية والتقدير مبني على معلومات.

جهزت نموذج مختصر لوصف المشروع في المقال. فيك تستخدمه حتى لو لسه بتقارن خيارات التنفيذ.

إذا عندك مشروع قادم: شو أكثر نقطة لسه مش واضحة بوصفه؟`,
    instagram: `قبل ما تبدأ موقعك، جاوب على هالخمسة: الهدف، الزائر، المحتوى، الوظائف، وإدارة الموقع بعد التسليم.

مثال: «بدي موقع لخدماتي» ممكن تتحول لـ«بدي العميل يفهم الخدمات ويبعت طلب فيه نوع المشروع وموقعه».

هيك صار عنا مسار نقدر نصممه ونختبره. احفظ الشرائح لتجهيز وصف مشروعك، وبتلاقي النموذج الكامل من رابط المقالات في البايو.`,
    tweets: ["قبل اختيار تقنية الموقع، حدد: مهمة الزائر، المحتوى، وظائف الإطلاق، التكاملات، ومين رح يديره. هاي الإجابات أساس مفيد للتقدير.", "مثال: «العميل يختار الخدمة ويرسل نوع المشروع وموقعه» أوضح من «موقع احترافي». كتبت نموذج brief مختصر يمكن تعبئته:"],
    slides: [["قبل ما نختار التقنية", "5 أسئلة ترتّب مشروع موقعك"], ["01 / الهدف والزائر", "مين رح يستخدم الموقع؟\nوشو أهم خطوة بدنا ينجزها؟"], ["02 / المحتوى والوظائف", "شو جاهز من النصوص والصور؟\nشو لازم يدخل بالإصدار الأول؟"], ["03 / الربط والإدارة", "شو الأنظمة المرتبطة؟\nومين رح يعدّل الموقع بعد التسليم؟"], ["جهّز وصفًا يمكن مناقشته", "الهدف + المحتوى + الوظائف + القيود\nالنموذج الكامل في مقالات البورتفوليو"]]
  },
  {
    key: "02-proposal", day: 3, title: "A proposal with a clear next step", theme: "المتطلبات قبل الأدوات", pillar: "FREELANCE", lang: "en",
    linkedin: `A useful project proposal makes the next decision easier.

Before listing frameworks, I want the document to answer five questions:

1. What problem are we solving, and for whom?
2. What is included in the first release?
3. What information or access is still missing?
4. How will we check that the work is ready?
5. What should the client do next?

For example, “send the content inventory and confirm the main user journey” gives both sides a concrete next step before a final estimate.

If something is an assumption, label it. If it depends on an external service or unfinished content, make that dependency visible.

You can keep the proposal short while still being precise. The goal is to help someone understand the scope and decide how to proceed.

What question do you always want a proposal to answer?`,
    instagram: `عرض المشروع المفيد بيساعد العميل يفهم المطلوب والخطوة الجايّة.

رتّبه: فهم المشكلة → نطاق الإصدار الأول → المعلومات الناقصة → طريقة القبول → الخطوة التالية.

اكتب الافتراضات بوضوح. وإذا ناقصك محتوى أو وصول لنظام، اذكر هالشي قبل تثبيت التقدير. فيك تستخدم ترتيب الشرائح كقائمة مراجعة لعرضك القادم.`,
    tweets: ["A project proposal should clarify the problem, first-release scope, open questions, acceptance checks, and the next step. Label assumptions before turning them into estimates.", "A useful next step is specific: “Confirm the main user journey and share the content inventory.” It gives the conversation something concrete to resolve."],
    slides: [["عرض مشروع واضح", "من فهم المشكلة للخطوة التالية"], ["ابدأ بفهم المطلوب", "مين المستخدم؟\nوشو المهمة اللي لازم ينجزها؟"], ["اكتب النطاق والافتراضات", "ما الذي يشمله الإصدار الأول؟\nوما المعلومات التي ما زالت ناقصة؟"], ["اتفقوا على القبول", "كيف نعرف إن الوظيفة جاهزة؟\nاكتبوا سلوكًا يمكن تجربته."], ["اختم بخطوة محددة", "مثال: تأكيد المسار الأساسي\nوتجهيز قائمة المحتوى المتاح."]]
  },
  {
    key: "03-coachspace", day: 5, title: "Coach Space: role and scope", theme: "المتطلبات قبل الأدوات", pillar: "PROJECT", lang: "en",
    sourceType: "PROJECT", url: project("coach-space", "en"), sourceLabel: "Coach Space", notes: "User-confirmed role: Team Leader and Frontend Developer. Do not attribute backend development, individual ownership of the entire platform, or unverified metrics.",
    linkedin: `My role on Coach Space was Team Leader and Frontend Developer.

That distinction matters when sharing collaborative work. A case study should help someone understand the product and the contribution behind it.

Coach Space is a bilingual learning platform. When reviewing a frontend scope for this kind of product, I would ask:

• Which journey are we reviewing: browsing, learning, or administration?
• What happens while data is loading, missing, or unavailable?
• Can someone complete that journey in Arabic and English?
• What needs to be agreed between the interface and the data it receives?

Those questions also make conversations between design and development more concrete.

The portfolio page provides the project context. My contribution should be read as team leadership and frontend work.

For team projects, what helps you communicate individual contributions clearly?`,
    instagram: `Coach Space مشروع منصة تعليمية ثنائية اللغة. دوري فيه كان Team Leader وFrontend Developer.

لما تشارك مشروع فريق، وضّح فكرة المنتج ودورك فيه. ولما تراجع واجهة تعليمية، امشِ بمسار المستخدم كامل: من الوصول للمعلومة إلى حالات التحميل والخطأ.

تفاصيل المشروع موجودة في البورتفوليو؛ رابط المشاريع في البايو.`,
    tweets: ["My role on Coach Space was Team Leader and Frontend Developer. It is a bilingual learning platform. A useful case study explains both the product and the individual contribution.", "For learning-platform UI reviews, follow one complete journey in both languages and inspect loading, empty, and error states. Project context:"],
    slides: [["Coach Space", "منصة تعليمية ثنائية اللغة"], ["دوري في المشروع", "Team Leader\nFrontend Developer"], ["راجع مسارًا كاملًا", "حدد مهمة المستخدم\nوامشِ فيها من البداية للنهاية."], ["اسأل عن الحالات المختلفة", "التحميل • البيانات الناقصة • الخطأ\nوالتجربة بالعربية والإنجليزية"], ["وضّح مساهمتك", "اعرض المنتج ودورك ضمن الفريق.\nتفاصيل Coach Space في البورتفوليو."]]
  },
  {
    key: "04-rtl", day: 8, title: "مراجعة واجهة عربية", theme: "واجهات تفهم المستخدم", pillar: "TECH", lang: "ar",
    sourceType: "ARTICLE", articleKey: "rtl", url: article("arabic-interface-review-checklist"), sourceLabel: "قائمة مراجعة الواجهة العربية",
    linkedin: `افتح النسخة العربية من موقعك، وجرّب تبعث طلبًا من الموبايل.

خلال دقيقة أو دقيقتين، راقب:

• هل الإيميل ورقم الهاتف مقروءين داخل الحقول؟
• هل عنوان طويل بيخفي زرًا مهمًا؟
• هل ترتيب الخطوات والأسهم مفهوم؟
• هل بتعرف وين الخطأ وكيف تصلحه؟
• هل بتقدر توصل للإرسال بلوحة المفاتيح؟

هاي المراجعة بتكشف تفاصيل ما بتبين بصورة للشاشة الرئيسية. بعدها منرجع للكود ونحدد إذا السبب اتجاه النص، ترتيب العناصر، المسافات، أو طريقة عرض الحالة.

كتبت قائمة أوسع مع شرح lang وdir والخصائص المنطقية في CSS، ومراجع للتفاصيل التقنية.

جرّب مسارًا واحدًا اليوم، وسجّل الملاحظة بصيغة: الخطوات + المتوقع + اللي صار. بتسهل كتير على اللي رح يصلحها.`,
    instagram: `افحص واجهتك العربية من رحلة حقيقية: افتحها بالموبايل، اكتب اسمًا طويلًا وإيميلًا، جرّب حقلًا ناقصًا، وبعدين أكمل الطلب.

راقب القراءة، ترتيب الخطوات، رسائل الخطأ، ومكان الأزرار. احفظ قائمة الشرائح، والتفاصيل مع المراجع في مقال الواجهة العربية من رابط البايو.`,
    tweets: ["مراجعة الواجهة العربية: جرّب إيميلًا ورقم هاتف، عنوانًا طويلًا، حقلًا ناقصًا، والتنقل بلوحة المفاتيح. امشِ بمسار حقيقي على الموبايل.", "lang وdir لهما وظيفتان مختلفتان. ومراجعة RTL تشمل النص والتفاعل وترتيب الرحلة. قائمة عملية مع المراجع:"],
    slides: [["افحص الواجهة العربية", "امشِ بمهمة حقيقية من الموبايل"], ["النصوص المختلطة", "جرّب اسمًا عربيًا + بريدًا إلكترونيًا\nورقم هاتف واسم منتج إنجليزي."], ["العناوين والمسافات", "استخدم عنوانًا طويلًا.\nهل تبقى المعلومة والأزرار واضحة؟"], ["الخطأ ولوحة المفاتيح", "جرّب بيانات ناقصة.\nهل تعرف أين الخطأ وكيف تصلحه؟"], ["سجّل المشكلة بوضوح", "الخطوات + المتوقع + السلوك الحالي\nالقائمة الكاملة في مقالات الموقع."]]
  },
  {
    key: "05-performance", day: 10, title: "Measure one page, one question", theme: "واجهات تفهم المستخدم", pillar: "TECH", lang: "en",
    linkedin: `Before changing a page for performance, write down what you are trying to improve.

“The site feels slow” can point to different problems: the first screen, a delayed interaction, a large image, or a request that takes too long.

A practical review starts with one route and one user task:

• Reproduce the issue under recorded conditions.
• Inspect the relevant request, asset, or interaction.
• Change one thing that addresses the evidence.
• Repeat the same check and inspect the rest of the journey.

Keep the page, device conditions, and measurement date beside any result you share. A number without that context is difficult to compare.

Also try the page as a person: open the menu, submit the form, and recover from an error. A technical report and a usable journey answer different questions.

Which interaction would you measure first on your current project?`,
    instagram: `«الموقع بطيء» محتاجة سؤال أوضح: أول شاشة؟ صورة؟ فتح قائمة؟ انتظار نتيجة؟

اختار صفحة ومهمة، سجّل ظروف الفحص، عدّل السبب اللي لقيته، وكرر نفس التجربة. وإذا نشرت نتيجة، اذكر معها الصفحة والظروف والتاريخ.

هاي قائمة تنظيم للفحص، مش وعد برقم أداء ثابت.`,
    tweets: ["Before a performance change: pick one route and user task, record the conditions, inspect the evidence, then repeat the same check. Keep the context beside the result.", "A performance report and a complete user journey answer different questions. Check the menu, form, loading state, and recovery path alongside your measurements."],
    slides: [["شو اللي بطيء تحديدًا؟", "ابدأ بصفحة ومهمة واضحة"], ["حدد موضع التأخير", "أول شاشة؟ صورة؟\nتفاعل؟ طلب بيانات؟"], ["سجّل ظروف الفحص", "الصفحة + الجهاز + الشبكة\nوتاريخ القياس"], ["عدّل وافحص من جديد", "اربط التغيير بسبب واضح.\nكرر نفس الفحص وجرّب الرحلة."], ["شارك نتيجة بسياقها", "الرقم يحتاج ظروفًا للمقارنة.\nاحتفظ بها مع ملاحظات المشروع."]]
  },
  {
    key: "06-marwan", day: 12, title: "مشروع د. مروان: مراجعة اللغتين", theme: "واجهات تفهم المستخدم", pillar: "PROJECT", lang: "ar",
    sourceType: "PROJECT", url: project("dr-marwan-alazzawi-aviation-academy"), sourceLabel: "منصة د. مروان العزاوي", notes: "Discuss the existing bilingual project and review questions. No invented conversion, load-time, or frame-rate results.",
    linkedin: `من المشاريع الموجودة في البورتفوليو: منصة أكاديمية واستشارات الطيران للدكتور مروان العزاوي، بواجهة عربية وإنجليزية.

وجود لغتين بيعطينا قائمة مراجعة عملية:

كيف بيظهر عنوان عربي أطول من نظيره الإنجليزي؟
هل ترتيب المعلومات بيساعد الزائر يفهم الخدمات؟
هل الدعوة للتواصل واضحة في اللغتين؟
وشو بصير لما نفتح نفس الصفحة على الموبايل؟

مفيد نستخدم مشروعًا حقيقيًا كنقطة بداية لهالأسئلة، ونراجع كل لغة كمحتوى وتجربة كاملة.

أضفت رابط دراسة المشروع للي بحب يشوف السياق. هاد المنشور عن طريقة مراجعة الواجهات ثنائية اللغة؛ ما عم أنسب للمشروع نتائج رقمية ما قسناها.

في مشاريعكم، أي تفصيل بينكشف عادة وقت مراجعة اللغة الثانية؟`,
    instagram: `مثال من البورتفوليو: منصة د. مروان العزاوي للطيران والاستشارات، بالعربية والإنجليزية.

استخدمه كنقطة بداية لمراجعة مشروعك: جرّب عنوانًا طويلًا، راقب ترتيب المعلومات، وافحص التواصل من الموبايل في اللغتين.

تقدر تشوف تفاصيل المشروع من رابط المشاريع في البايو.`,
    tweets: ["منصة د. مروان العزاوي للطيران والاستشارات مثال من البورتفوليو على موقع عربي وإنجليزي. راجع اللغتين بمحتوى طويل وعلى الموبايل.", "للمراجعة: هل الخدمات مفهومة؟ هل التواصل واضح؟ وهل اختلاف طول النص حافظ على ترتيب المعلومات؟ سياق المشروع:"],
    slides: [["تجربة بلغتين", "منصة د. مروان العزاوي للطيران"], ["العربية والإنجليزية", "راجع كل لغة بمحتواها\nوعناوينها الفعلية."], ["هل الخدمات مفهومة؟", "افحص ترتيب المعلومات\nووضوح الخطوة التالية للزائر."], ["نفس الرحلة على الهاتف", "عنوان طويل + قائمة + تواصل\nجرّبها باللغتين."], ["شاهد سياق المشروع", "منصة الطيران والاستشارات\nضمن مشاريع البورتفوليو."]]
  },
  {
    key: "07-ai-review", day: 15, title: "From AI suggestion to checked change", theme: "AI ضمن سير عمل واضح", pillar: "AI", lang: "en",
    sourceType: "ARTICLE", articleKey: "ai", url: article("ai-code-change-review-workflow", "en"), sourceLabel: "AI code-review workflow",
    linkedin: `Before accepting an AI-generated change, I want a clear path from the request to the check.

Try this sequence:

1. Describe the failing behavior and the expected outcome.
2. Share the relevant files, versions, and constraints using sample data.
3. Ask for a focused change with its assumptions made explicit.
4. Inspect the diff: dependencies, access, validation, and compatibility.
5. Verify the cases that matter for this particular change.

For a form, that could mean success, failure, repeated clicks, and another attempt after an error. A passing build is useful, and the behavior still needs a check.

The same review habit applies to generated writing: verify names, links, and claims before treating them as publishable facts.

I wrote the workflow out with a practical example and a note on untrusted external content. What belongs on your acceptance checklist?`,
    instagram: `قبل اعتماد تعديل اقترحه AI، مرّ عليه بهالمسار: وصف واضح → سياق مناسب → فرق كود مقروء → فحص للسلوك.

مثال نموذج: جرّب النجاح والفشل والنقر المتكرر وإعادة المحاولة. وراجع أي تبعية أو صلاحية تغيرت.

احفظ الشرائح كقائمة سريعة. الشرح الكامل بالعربية والإنجليزية في مقالات البورتفوليو.`,
    tweets: ["For an AI-generated code change: describe expected behavior, provide bounded context, inspect the diff, and verify relevant cases. Make assumptions visible before accepting the result.", "Generated writing needs review too: names, dates, URLs, and numerical claims. A practical workflow, including untrusted external content:"],
    slides: [["من اقتراح AI إلى تعديل جاهز", "طلب واضح • مراجعة • تحقق"], ["01 / صف السلوك", "ما المشكلة؟ كيف تتكرر؟\nوما النتيجة المتوقعة؟"], ["02 / راجع فرق الكود", "تبعية جديدة؟ صلاحيات؟\nتحقق محذوف؟ واجهة تغيّرت؟"], ["03 / جرّب الحالات المهمة", "نجاح • فشل • تكرار • تعافٍ\nبحسب التغيير الذي نفذته."], ["اعتمد نتيجة يمكن فحصها", "راجع الادعاءات في النصوص أيضًا.\nمسار العمل الكامل في المقال."]]
  },
  {
    key: "08-bug-report", day: 17, title: "تقرير مشكلة يساعد على إصلاحها", theme: "AI ضمن سير عمل واضح", pillar: "TECH", lang: "ar",
    linkedin: `إذا بدك تبعت مشكلة لمطور أو تناقشها مع مساعد برمجي، جهّز وصفًا يمكن إعادة تجربته.

جرب هالقالب:

الصفحة أو المكوّن:
خطوات إعادة المشكلة:
النتيجة المتوقعة:
اللي صار فعلًا:
المتصفح أو إصدار البيئة:
رسالة الخطأ أو مثال بيانات تجريبي:

مثال: «بعد فشل إرسال النموذج، الزر بضل معطّل. المتوقع أقدر أحاول مرة ثانية. الخطوات: افتح الصفحة، املأ الحقول، حاكي فشل الطلب، ثم جرّب الإرسال».

إذا أرفقت صورة أو تسجيلًا، خلي معه الوصف. وإذا شاركت سجلًا أو بيانات، احذف المعلومات الحساسة واستبدلها بأمثلة.

القالب نفسه بيفيد مع الزميل ومع AI؛ لأنه بيحول المحادثة لمشكلة محددة وطريقة واضحة لفحص الحل.

شو أكثر معلومة بتكون ناقصة بتقارير المشاكل اللي بتوصلك؟`,
    instagram: `«مش شغال» بداية. عشان نقدر نفحص، نحتاج خطوات ومتوقع ونتيجة فعلية.

انسخ قالب الشرائح، وأضف إصدار البيئة ورسالة الخطأ لو موجودة. استخدم بيانات تجريبية عند مشاركة المثال مع أي أداة أو شخص.

احفظه للمرة الجاي اللي بدك تبلغ فيها عن مشكلة.`,
    tweets: ["قالب تقرير مشكلة: الصفحة، خطوات الإعادة، المتوقع، النتيجة الفعلية، البيئة، ورسالة الخطأ. الصورة مفيدة، والوصف القابل للتجربة بيساعد نفحص الحل.", "مثال: بعد فشل طلب النموذج، زر الإرسال يظل معطلًا. المتوقع السماح بالمحاولة مجددًا. اذكر الخطوات واستخدم بيانات تجريبية عند مشاركة المثال."],
    slides: [["اكتب مشكلة قابلة للتجربة", "قالب للمطور أو المساعد البرمجي"], ["أين؟ وكيف نعيدها؟", "الصفحة أو المكوّن\nخطوات مرتبة لإظهار المشكلة"], ["المتوقع واللي صار", "ما السلوك الصحيح؟\nوما النتيجة الفعلية؟"], ["أضف السياق المناسب", "الإصدار + المتصفح + رسالة الخطأ\nواستخدم بيانات تجريبية."], ["كيف سنفحص الإصلاح؟", "كرر نفس الخطوات\nوقارن النتيجة بالسلوك المتوقع."]]
  },
  {
    key: "09-content-workflow", day: 19, title: "One idea, different formats", theme: "AI ضمن سير عمل واضح", pillar: "AI", lang: "en",
    notes: "An editorial workflow example, not a claim of automated publishing, engagement results, or a completed client case study.",
    linkedin: `One content idea can have several useful versions if each version respects how someone will read it.

For a practical programming checklist, I would structure it like this:

• A website article: the complete explanation, examples, and references.
• A LinkedIn post: the useful point and a question worth discussing.
• An X post or short thread: one compact takeaway, with a source link when needed.
• An Instagram carousel: a visual sequence someone can understand and save.

The website can hold the stable reference without making every social post an unfinished teaser. Give people something useful where they already are.

If AI helps adapt the draft, keep the same facts and review each version for claims, tone, links, and platform constraints.

That is the editorial structure I am preparing for this month: connected themes, distinct formats, and a clear source for deeper detail.`,
    instagram: `فكرة واحدة، بأكثر من شكل مفيد:

مقال بالموقع للشرح والمراجع. منشور لينكدإن للنقطة والنقاش. إكس لخلاصة قصيرة. كاروسيل إنستغرام لخطوات قابلة للحفظ.

خلي كل نسخة مفهومة لحالها، ولما يحتاج الموضوع تفاصيل أكثر ضيف مرجع واضح بالموقع. وإذا استخدمت AI للتحويل، راجع المعلومة والصياغة والروابط بكل نسخة.`,
    tweets: ["A website article can hold the full reference while social posts deliver useful, complete takeaways. Adapt the format: discussion on LinkedIn, a compact point on X, a visual sequence on Instagram.", "When AI adapts one idea across channels, review each version for facts, tone, links, and length. Reusing the source should preserve meaning while changing the presentation."],
    slides: [["فكرة واحدة، صيغ متعددة", "معلومة ثابتة • عرض يناسب المنصة"], ["المقال هو المرجع", "شرح كامل + أمثلة + مصادر\nورابط ثابت نرجع له."], ["لينكدإن وإكس", "نقطة للنقاش على لينكدإن\nوخلاصة مركزة على إكس."], ["إنستغرام", "خطوات مرئية مفهومة\nيمكن قراءتها وحفظها."], ["راجع كل نسخة", "المعلومة + الصياغة + الرابط\nوقيمة مفيدة داخل المنصة نفسها."]]
  },
  {
    key: "10-handoff", day: 22, title: "قائمة تسليم موقع", theme: "تسليم قابل للإدارة", pillar: "FREELANCE", lang: "ar",
    sourceType: "ARTICLE", articleKey: "handoff", url: article("website-handoff-and-maintenance-checklist"), sourceLabel: "دليل التسليم والدعم",
    linkedin: `قبل إغلاق مشروع موقع، بحب تكون حالة التسليم واضحة للطرفين.

قائمة المراجعة ممكن تبدأ من:

• الرحلات الأساسية جُرّبت، مع حالات الخطأ المهمة.
• المحتوى والروابط ومعلومات التواصل تمت مراجعتها.
• الشخص المسؤول قادر يعمل تعديلًا ويشوفه بالموقع.
• الاستضافة والنطاق والخدمات الخارجية ومسؤولياتها موثقة.
• النقاط المفتوحة معروفة، ولكل نقطة خطوة تالية.
• مدة الدعم ونطاقه وطريقة طلب الإضافات مكتوبة حسب اتفاق المشروع.

بهتم تحديدًا بتجربة تعديل حقيقية من لوحة الإدارة. إذا العميل رح يدير المحتوى، لازم يشوف كيف يحفظ ويراجع النتيجة ويتعامل مع أي خطأ.

جهزت مقالًا فيه قائمة قابلة للتكييف حسب حجم المشروع، مع تفريق واضح بين متابعة التسليم وطلب ميزة جديدة.

شو المعلومة اللي كنت تتمنى تستلمها مع آخر موقع اشتغلت عليه؟`,
    instagram: `حضّر للتسليم من بداية المشروع: شو رح نختبر؟ مين رح يدير الموقع؟ وكيف رح نوثق الوصول والخدمات والمتابعة؟

مدة الدعم ونطاقه والإضافات بتتحدد حسب اتفاق المشروع. اكتبها بوضوح حتى يعرف كل طرف الخطوة التالية.

احفظ قائمة الشرائح، والدليل الكامل في مقالات البورتفوليو.`,
    tweets: ["قائمة تسليم موقع: مسارات مجرّبة، محتوى وروابط مراجَعة، تجربة إدارة فعلية، مسؤوليات تشغيل واضحة، ونقاط مفتوحة موثقة.", "مدة الدعم ونطاقه وطريقة التعامل مع الإضافات تتحدد حسب اتفاق المشروع. جهزت قائمة تسليم قابلة للتكييف:"],
    slides: [["جاهزين للتسليم؟", "قائمة تساعد العميل والمطور"], ["01 / جرّب الرحلات", "المسار الأساسي + الحالات المهمة\nوراجع المحتوى واللغات."], ["02 / جرّب إدارة المحتوى", "عدل عنوانًا أو صورة واحفظ.\nهل ظهر التغيير كما هو متوقع؟"], ["03 / وثّق التشغيل والمتابعة", "النطاق + الاستضافة + المسؤوليات\nوالدعم حسب اتفاق المشروع"], ["سلّم حالة واضحة", "ما اكتمل • ما تبقى • من يتابعه\nقائمة التسليم كاملة في المقال."]]
  },
  {
    key: "11-shopify-decision", day: 24, title: "When does a store need a custom app?", theme: "تسليم قابل للإدارة", pillar: "ECOMMERCE", lang: "en",
    notes: "Decision framework only. Primary reference: https://shopify.dev/docs/apps/build/authentication-authorization . No claim that a custom app is always necessary or automatically approved.",
    linkedin: `Before building a custom Shopify app, map the workflow you need.

Start with the trigger, the data, the people using it, and the system that needs the result. Then compare:

• A capability already available in the store.
• An existing app that fits the workflow.
• A custom app or integration when the requirements justify it.

For each option, ask who will maintain it, what access it needs, how failures are handled, and what changes when the business process changes.

A custom integration also needs an authorization plan. Shopify documents authentication and access scopes for its APIs; the required access should follow the actual workflow.

The useful first question is: “What operation is difficult today, and what should happen instead?”

If you are exploring a store integration, share the current process and connected systems. That is enough to start a focused discovery conversation.`,
    instagram: `قبل ما تبني Shopify App مخصص، ارسم العملية الحالية:

شو الحدث؟ أي بيانات بتنتقل؟ مين بيستخدمها؟ وشو النظام اللي لازم يستقبلها؟

بعدين قارن الميزة الموجودة، تطبيقًا مناسبًا، أو تطويرًا مخصصًا. خذ الإدارة والصلاحيات والتعامل مع الفشل بالحسبان. عندك عملية بالمتجر بدك تبسطها؟ ابعت وصفها لنبدأ من المتطلبات.`,
    tweets: ["Before a custom Shopify app, map the trigger, data, users, and destination system. Compare built-in capabilities, existing apps, and custom development against that workflow.", "Include maintenance, required access, and failure handling in the decision. If you need help scoping a Shopify integration, start with the current process and systems:"],
    url: `${base}/en/contact`, sourceType: "STANDALONE", sourceLabel: "Discuss a Shopify integration",
    slides: [["هل تحتاج Shopify App مخصص؟", "ابدأ من العملية المطلوبة"], ["ارسم تدفق البيانات", "الحدث → البيانات → المستفيد\nوالنظام الذي يستقبل النتيجة"], ["قارن الخيارات", "ميزة موجودة • تطبيق مناسب\nأو تطوير مخصص حسب المتطلبات"], ["فكّر بالتشغيل", "الإدارة + الصلاحيات + التحديثات\nوكيف نتعامل مع فشل العملية"], ["ابدأ بوصف العملية", "شو بصير اليوم؟ وشو المطلوب؟\nللتواصل: thekatanani.com"]]
  },
  {
    key: "12-mahseri", day: 26, title: "ماهسري: اسأل عن صاحب التحديث", theme: "تسليم قابل للإدارة", pillar: "PROJECT", lang: "ar",
    sourceType: "PROJECT", url: project("mahseri-remodeling"), sourceLabel: "ماهسري للتجديدات", notes: "Existing project is built with Wix Studio. Do not imply a Next.js implementation or claim measured lead/conversion increases.",
    linkedin: `من أمثلة شغلي في البورتفوليو: موقع ماهسري للتجديدات، المبني باستخدام Wix Studio.

المثال مناسب لسؤال مهم بأي مشروع خدمات: مين رح يحدث الموقع بعد التسليم؟

إذا فريق العمل رح يضيف مشاريع وصورًا أو يعدّل تفاصيل الخدمات، لازم نناقش طريقة الإدارة ضمن اختيار الحل. الأسئلة العملية بتكون:

شو بيتكرر تعديله؟
مين مسؤول عن الصور والنصوص؟
هل الشخص محتاج صلاحية لكل شيء؟
وكيف رح يراجع النتيجة قبل نشرها؟

هاي الأسئلة بتساعدنا نقارن منصة جاهزة وتطويرًا مخصصًا حسب المتطلبات والميزانية والإدارة المستقبلية.

رابط دراسة ماهسري موجود للي بحب يشوف نوع المشروع وسياقه. ما في هالمنشور وعد بنتائج تسويقية أو أرقام أداء.

إذا بتخطط لموقع خدمات، اذكر من البداية مين رح يدير المحتوى.`,
    instagram: `ماهسري للتجديدات من مشاريع البورتفوليو، ومبني على Wix Studio.

السؤال اللي بنربطه فيه اليوم: مين رح يحدث الموقع بعد التسليم؟ اكتب المهام المتكررة، مسؤول المحتوى، والصلاحيات المطلوبة قبل اختيار طريقة التنفيذ.

تفاصيل المشروع من رابط المشاريع في البايو.`,
    tweets: ["مين رح يحدّث موقع الخدمات بعد التسليم؟ حدد المهام المتكررة، مسؤول المحتوى، والصلاحيات المطلوبة ضمن مناقشة الحل.", "ماهسري للتجديدات مثال من البورتفوليو مبني باستخدام Wix Studio. شوف نوع المشروع وسياقه:"],
    slides: [["مين رح يدير الموقع؟", "سؤال من مرحلة اختيار الحل"], ["مثال: ماهسري للتجديدات", "موقع خدمات من البورتفوليو\nمبني باستخدام Wix Studio"], ["حدد التحديثات المتكررة", "صور مشاريع؟ تفاصيل خدمة؟\nنصوص أو معلومات تواصل؟"], ["حدد الشخص والصلاحيات", "مين يجهز المحتوى؟ مين يراجعه؟\nوكيف يشوف النتيجة؟"], ["اختَر حلًا يمكن إدارته", "ناقش الإدارة مع المتطلبات.\nدراسة ماهسري في البورتفوليو."]]
  },
  {
    key: "13-recap", day: 29, title: "أربع قوائم ترجع لها", theme: "مراجعة الشهر والخطوة التالية", pillar: "TECH", lang: "ar",
    sourceType: "STANDALONE", url: `${base}/ar/blog`, sourceLabel: "مكتبة مقالات البورتفوليو",
    linkedin: `أربع قوائم عملية جمعناها خلال نوفمبر:

1. وصف المشروع: الهدف، الزائر، المحتوى، الوظائف، وحدود الإطلاق.
2. مراجعة الواجهة العربية: نصوص مختلطة، عناوين طويلة، نموذج، وهاتف.
3. مراجعة اقتراح AI: سياق واضح، فرق مقروء، وافتراضات وفحص مناسب.
4. التسليم: تجربة الإدارة، مسؤوليات التشغيل، ونطاق المتابعة المتفق عليه.

كل قائمة إلها مقال مرجعي في البورتفوليو، والمنشورات كانت تطبيقات صغيرة على نفس التسلسل: نفهم → نبني → نراجع → نسلّم.

هاد ملخص للمواضيع، وليس تقرير نتائج أو أرقام تفاعل. الهدف تكون الموارد سهلة الرجوع إلها وقت الحاجة.

إذا عندك مشروع قائم، اختار قائمة واحدة وطبّقها على مسار حقيقي هالأسبوع. أي قائمة بدك تشوف إلها مثال أعمق في المحتوى القادم؟`,
    instagram: `احفظ هالخريطة للرجوع إلها: وصف المشروع، مراجعة العربية، مراجعة AI، والتسليم.

أربع قوائم بترتب العمل من أول الفكرة لآخر خطوة. المقالات المرجعية موجودة في الموقع من رابط البايو.

أي موضوع بتحتاج نشرح له مثال عملي أكثر؟`,
    tweets: ["خريطة نوفمبر: نفهم المتطلبات → نراجع الواجهة → نفحص اقتراحات AI → نجهز التسليم. أربع قوائم عملية يمكن ترجع لها حسب مرحلة مشروعك.", "المقالات المرجعية مجمعة في البورتفوليو. اختار قائمة وطبّقها على مسار واحد بمشروعك:"],
    slides: [["4 قوائم للرجوع إلها", "من فكرة المشروع للتسليم"], ["01 / نفهم", "هدف + زائر + محتوى\nوظائف + حدود الإصدار الأول"], ["02 / نبني ونراجع", "واجهة عربية قابلة للاستخدام\nوفرق كود واضح عند استخدام AI"], ["03 / نسلّم", "مسارات مجرّبة + إدارة محتوى\nومسؤوليات متابعة متفق عليها"], ["اختار قائمة وجرّبها", "المقالات الكاملة في البورتفوليو.\nأي مثال تحتاجه بالمحتوى القادم؟"]]
  },
  {
    key: "14-inquiry", day: 30, title: "Planning a frontend or Shopify project?", theme: "مراجعة الشهر والخطوة التالية", pillar: "FREELANCE", lang: "en",
    url: `${base}/en/contact`, sourceType: "STANDALONE", sourceLabel: "Project enquiry",
    linkedin: `Planning a frontend build or a Shopify integration?

I work on React and Next.js interfaces, bilingual websites, and custom Shopify apps and API integrations.

To start a useful conversation, send:

• What your business or team needs to do.
• The current site or workflow, if one exists.
• The main pages, features, or connected systems.
• What content and designs are already available.
• Your target date and any known constraints.

A short, honest description is enough to begin. We can identify open questions before agreeing on a scope, approach, and estimate.

Portfolio project pages provide context for previous work; the contact page is the place to discuss your requirements. Support duration, additional features, and ongoing work are agreed for each project.

If a frontend or store workflow is on your roadmap, share the brief through the link below.`,
    instagram: `بتحضّر لموقع، واجهة React / Next.js، أو ربط مخصص لمتجر Shopify؟

ابعت الهدف، الرابط الحالي لو موجود، أهم الوظائف أو الأنظمة، والمحتوى أو التصميم المتاح. من هالمعلومات بنحدد الأسئلة الناقصة ونناقش النطاق وطريقة التنفيذ.

المشاريع ووسيلة التواصل موجودة في رابط البايو. الدعم والإضافات بيتم الاتفاق عليهم حسب المشروع.`,
    tweets: ["Planning a React/Next.js frontend or Shopify integration? Start with the goal, current workflow, key features or systems, available content, and target date.", "I work on bilingual interfaces and custom Shopify apps/API integrations. Share a brief so we can discuss scope and approach. Support and additions depend on the project agreement:"],
    slides: [["عندك مشروع قادم؟", "Frontend • Next.js • Shopify"], ["01 / الهدف والوضع الحالي", "شو المطلوب من المشروع؟\nوفي موقع أو عملية قائمة؟"], ["02 / الوظائف والأنظمة", "الصفحات أو المهام الأساسية\nوأي تكاملات مطلوبة"], ["03 / المتاح والقيود", "المحتوى + التصميم + الموعد\nوأي قيود معروفة"], ["خلينا نناقش المتطلبات", "المشاريع والتواصل:\nthekatanani.com"]]
  }
]

const topics: EditorialTopic[] = cores.map(c => {
  const slides: EditorialSlide[] = c.slides.map(([title,bodyText],i)=>({slideNumber:i+1,title,bodyText,visualCue:"Branded typographic card; petrol, lilac, sage; Arabic RTL; no stock photography or invented project screenshots."}))
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

const microPosts = [
  [2,"وصف المشروع","ابدأ brief الموقع بجملة: «الزائر لازم يقدر…». بعدها اكتب المحتوى والوظائف اللي بتساعده ينجزها. هاي خطوة صغيرة بتوضح النقاش قبل اختيار الأدوات."],
  [6,"تقدير العمل","إذا التقدير مبني على افتراض، اكتبه بجانبه. مثلًا: النصوص جاهزة، لغة واحدة، وربط بنظام واحد. تغيير هالمعلومات قد يغيّر النطاق والتقدير."],
  [9,"مراجعة العربية","اختبار سريع للواجهة العربية: عنوان طويل، بريد إلكتروني، رقم هاتف، ورسالة خطأ. جرّبهم على شاشة ضيقة وسجّل أي معلومة أو إجراء صار صعب الوصول إله."],
  [13,"تقرير مشكلة","بتوثّق bug؟ اكتب خطوات الإعادة والمتوقع والنتيجة الفعلية. أضف البيئة ورسالة الخطأ ببيانات تجريبية. هالوصف بيساعد الزميل أو المساعد البرمجي يفحص نفس المشكلة."],
  [16,"مراجعة AI","قبل قبول اقتراح AI، اقرأ فرق الكود: هل تغيرت صلاحية؟ انحذف تحقق؟ انضافت تبعية؟ بعدين جرّب السلوك المطلوب، ودوّن أي جزء ما قدرت تتحقق منه."],
  [20,"مصدر للمحتوى","لما تحول مقال لمنشور، خلي المنشور يقدم نقطة مفيدة لحاله. ضيف رابط المرجع للتوسع، وراجع الأسماء والادعاءات والروابط بكل نسخة."],
  [23,"تسليم الموقع","ضمن تسليم موقع بلوحة إدارة، جرّب تعديل عنوان أو صورة ثم احفظ وافتح الصفحة العامة. نجاح الحفظ وظهور التغيير جزءان لازم نتحقق منهم."],
  [27,"نطاق المتابعة","اكتبوا نطاق المتابعة حسب اتفاق المشروع: إصلاح مشكلة بالتسليم؟ تحديث محتوى؟ ميزة جديدة؟ وحددوا طريقة إرسال الطلب. وضوح هالتفاصيل بيساعد الطرفين يعرفوا الخطوة التالية."]
] as const
for(const [day,title,content] of microPosts) topics.push({key:`x-${day}`,title,theme:day<8?"المتطلبات قبل الأدوات":day<15?"واجهات تفهم المستخدم":day<22?"AI ضمن سير عمل واضح":"تسليم قابل للإدارة",pillar:"MICRO",date:`2026-11-${String(day).padStart(2,"0")}`,sourceType:"STANDALONE",notes:"Standalone X tip. No website dependency.",versions:[{platform:"X",language:"ar",content,hashtags:[],scheduledFor:date(day,13),assets:[]}]})
topics.sort((a,b)=>a.date.localeCompare(b.date))

export const novemberPack: EditorialPack = {
  key:"november-2026-client-content-v1",name:"نوفمبر 2026 — من الفكرة للتسليم",objective:"جذب عملاء Frontend وShopify بمحتوى مفيد ومترابط ومرجع موثوق في البورتفوليو.",timezone:"Asia/Hebron",startsAt:"2026-11-01T00:00:00+02:00",endsAt:"2026-11-30T23:59:59+02:00",
  strategy:{
    voice:["صوت مطور عملي يشرح خطوة قابلة للتطبيق. عربي واضح قريب من أسلوب محمد، وإنجليزي بسيط عند الحاجة.","افتتاح محدد → مثال أو خطوات مفيدة → دعوة واحدة تناسب الموضوع. تختلف النسخ حسب المنصة.","المنشور يقدم قيمة مكتملة، والموقع يضيف الشرح أو تفاصيل المشروع. أسئلة حقيقية بدل طلب تفاعل مصطنع."],
    visuals:["Petrol #0A4D68، خلفية فاتحة #F5F9FC، Lilac #B9AED8، Sage #A7C8B4، ونص داكن #052634.","كاروسيل 1080×1350: غلاف، ثلاث بطاقات مفيدة، وخاتمة. عنوان كبير ومساحة مريحة وتوقيع ثابت.","غلاف LinkedIn مستقل وغطاء مقال 1600×900. لا تظهر تعليمات التصميم الداخلية داخل الصور.","النص العربي RTL مع عزل أسماء التقنيات والروابط، وخط Noto Sans Arabic / Noto Sans. البنر الحالي لحساب LinkedIn لا يتغير."],
    cadence:["14 موضوعًا أساسيًا: 14 LinkedIn + 14 Instagram + 14 X، مع 8 نصائح X مستقلة = 50 نسخة اجتماعية.","4 مقالات أصلية، كل منها بالعربية والإنجليزية. تنشر قبل المنشورات التي تشير إليها.","المواعيد بتوقيت فلسطين Asia/Hebron: المقال 08:00، LinkedIn 11:00، X 17:00، Instagram 19:00؛ نصائح X الساعة 13:00.","هذه مواعيد بداية قابلة للتجربة، وليست ادعاءً بأفضل أوقات النشر. 29 و30 نوفمبر للمراجعة ودعوة مشروع واضحة."],
    rules:["لا أرقام نتائج أو إحصائيات أو شهادات عميل أو قصص عمل غير موثقة. الأمثلة موضحة كأمثلة.","Coach Space: Team Leader وFrontend Developer فقط. ماهسري: Wix Studio. لا نغير تواريخ الشهادات أو البنر.","لا يوجد موضوع Geepas في هذه الحملة. ثلاثة مشاريع متنوعة ومواضيع مستقلة ومقالات مرجعية.","Instagram: رابط البايو أو Story link؛ رابط الكابشن ليس مسارًا قابلًا للنقر. قبل الإحالة لمقال، تحقق من ظهوره العام.","الجدول تحريري داخل BrandPilot. النشر الاجتماعي يحتاج تنفيذًا يدويًا أو ربطًا فعليًا؛ لا تُعرض المواعيد كمنشورات نُشرت تلقائيًا.","مدة الدعم ونطاقه والإضافات حسب اتفاق المشروع، ويمكن تعديل الصياغة من لوحة المحتوى."],
    measurement:["سجل رابط المنشور الفعلي ووقت النشر، ثم راجع أسبوعيًا زيارات المرجع ذات UTM والاستفسارات المؤهلة.","صنّف الاستفسارات Frontend / Shopify، ودوّن كيف وصل العميل بدل افتراض أن التفاعل يعني طلبًا تجاريًا.","قارن حفظ المنشور والنقاشات المفيدة وزيارات الموقع حسب الموضوع والمنصة، مع تسجيل الظروف المتاحة.","في نهاية كل أسبوع عدّل الموضوع أو الصياغة أو الموعد بناءً على بيانات فعلية؛ لا تنشر نتائج نجاح متوقعة كأنها حدثت."]
  },articles:novemberArticles,topics
}
