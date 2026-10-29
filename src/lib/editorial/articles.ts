import type { EditorialArticle } from "./types"
const root = "/editorial/2026-11"
export const novemberArticles: EditorialArticle[] = [
  {
    key: "brief", slug: "website-brief-before-choosing-tools", category: "FREELANCE", tags: ["Project Brief", "Freelancing", "Web Development"],
    scheduledFor: "2026-11-01T06:00:00.000Z", cover: `${root}/articles/brief.png`, sources: [],
    title: { ar: "قبل اختيار التقنية: كيف تكتب وصف مشروع موقع قابلًا للتنفيذ؟", en: "Before Choosing a Stack: Write a Website Brief You Can Actually Build" },
    excerpt: { ar: "قائمة عملية تحدد هدف الموقع، مستخدمه، محتواه، تكاملاته، وحدود التسليم قبل تحويل الفكرة إلى سعر وخطة تنفيذ.", en: "Define the goal, user journey, content, integrations, and acceptance checks before turning a website idea into an estimate." },
    content: {
      ar: `طلب «بدي موقع احترافي» بداية للمحادثة، لكنه لا يكفي لتقدير العمل. كلمة احترافي قد تعني تصميمًا خاصًا، أو متجرًا، أو لوحة إدارة، أو تجربة عربية وإنجليزية. أول خطوة مفيدة هي كتابة وصف قصير يجعل هذه التوقعات ظاهرة للطرفين.

## ابدأ بالمهمة التي يجب أن ينجزها الزائر

اكتب جملة تبدأ بـ«نريد أن يستطيع الزائر…». مثلًا: نريد أن يجد العميل الخدمة المناسبة ويرسل طلبًا يحتوي على موقع المشروع ونوعه. هذه الجملة أوضح من «نريد موقعًا حديثًا»، لأنها تساعدنا نختار الصفحات والنموذج والمحتوى الذي يخدمها.

إذا كانت هناك عدة مهام، رتّبها. شراء منتج، وحجز موعد، وقراءة مقالات، والتقديم لوظيفة ليست رحلة واحدة. لا يلزم أن يحصل كل شيء على نفس المساحة في الإصدار الأول.

## حدد المستخدم والمحتوى

من سيستخدم الموقع؟ عميل يبحث من هاتفه؟ فريق داخلي يحدث البيانات؟ زائر يقرأ بالعربية ويبحث بأسماء منتجات إنجليزية؟ اذكر اللغات والأجهزة والحالات المهمة بدل الاكتفاء بتسمية جمهور واسعة.

ثم اكتب قائمة المحتوى الموجود وما ينقصه: الهوية، النصوص، صور المشاريع، المنتجات، والأسئلة المتكررة. وضّح من يجهزه ومن يوافق عليه. تأخر المحتوى قد يغير ترتيب التنفيذ، لذلك من الأفضل معرفته قبل تثبيت موعد التسليم.

## افصل الموقع عن الأنظمة التي يتصل بها

عبارة «نربط الموقع بنظامنا» تحتاج تفصيلًا. ما النظام؟ ما البيانات التي ستنتقل؟ في أي اتجاه؟ هل التحديث فوري أم دوري؟ من يملك صلاحية الوصول إلى الواجهة البرمجية؟

مثال مبسط: «عند إرسال طلب جديد، نرسل الاسم ونوع الخدمة إلى نظام إدارة العملاء ونُظهر تأكيدًا للزائر». أصبح بإمكاننا هنا مناقشة البيانات المطلوبة، والتعامل مع فشل الإرسال، ومنع تسجيل الطلب مرتين. المثال توضيحي وليس نتيجة مشروع أو وعدًا بزمن تنفيذ.

## اكتب ما يدخل في الإصدار الأول وما يؤجل

قسّم المتطلبات إلى: ضروري للإطلاق، مفيد لاحقًا، وخارج النطاق الحالي. لوحة إدارة متعددة الأدوار تختلف عن نموذج اتصال بسيط. كما أن إضافة لغة ثانية تشمل المحتوى والمراجعة والتجربة، ولا تختصر في زر تبديل.

اتفق كذلك على طريقة طلب الإضافات. عندما يظهر طلب جديد، نحدد أثره على الجهد والوقت والتكلفة قبل إدخاله في الخطة. هذه طريقة لإدارة التغيير، وليست بديلًا عن الاتفاق المناسب للمشروع.

## حوّل التوقعات إلى اختبارات قبول

بدل «النموذج يعمل»، اكتب: يمكن إرسال البيانات الصحيحة، تظهر أخطاء مفهومة للحقول الناقصة، يمنع الإرسال المتكرر أثناء المعالجة، ويظهر تأكيد واضح عند النجاح. إذا كان التسليم يشمل إدارة المحتوى، اختبر أن الشخص المسؤول يستطيع تعديل النص ونشره.

يمكن أن تبقى قائمة القبول قصيرة. المهم أن تصف سلوكًا يمكن التحقق منه، لا شعورًا عامًا بالجودة.

## نموذج مختصر يمكنك تعبئته

- هدف الموقع والمهمة الأساسية للزائر.
- الجمهور واللغات والأجهزة المهمة.
- الصفحات والمحتوى، ومن يجهزه ويوافق عليه.
- وظائف الإصدار الأول وما يؤجل.
- الأنظمة المتصلة والبيانات المتبادلة.
- مسؤول إدارة الموقع بعد التسليم.
- اختبارات القبول والموعد المستهدف والقيود المعروفة.

بعد هذه الإجابات تصبح مناقشة التقنية والتقدير أدق. قد يخدم المشروع تطوير مخصص، وقد تخدمه منصة جاهزة. القرار يتبع المطلوب وإدارة الموقع مستقبلًا.

للبدء بمشروع مع محمد القطناني، أرسل الهدف والوظيفة الأساسية والمحتوى المتاح عبر [صفحة التواصل](/ar/contact). يمكنك أيضًا استكشاف [دراسات المشاريع](/ar/projects) لترى أمثلة على نطاقات مختلفة.`,
      en: `“I need a professional website” starts a conversation, but it does not describe a scope. It might mean a service website, a store, a dashboard, or an Arabic and English experience. A short project brief makes those expectations visible before anyone chooses tools or estimates delivery.

## Start with one visitor task

Complete this sentence: “A visitor should be able to…” For example: find the appropriate service and send a request containing the project location and type. That is more actionable than “a modern website” because it helps identify the pages, content, and form fields the visitor needs.

When there are several tasks, prioritize them. Buying a product, booking an appointment, reading articles, and applying for a job are different journeys. They do not all need equal prominence in the first release.

## Name the users and the content

Describe the situations that matter: a customer using a phone, an administrator updating records, or an Arabic-speaking visitor searching for English product names. List the required languages and important device scenarios.

Next, inventory the content. Which brand assets, copy, project photographs, product details, and FAQs already exist? Who prepares missing material and who approves it? This helps plan the work around actual dependencies rather than treating content as an invisible final step.

## Describe integrations as data flows

“Connect it to our system” needs more detail. Which system? Which data? In which direction? Is the update triggered by an event or a schedule? Who can provide the relevant access?

A useful illustrative requirement is: “When a visitor submits a service request, send the name and service type to our customer-management system and show a confirmation.” We can then discuss validation, failed requests, and duplicate submissions. This is an example requirement, not a claim about a completed project or its delivery time.

## Separate the first release from later work

Group requirements into launch essentials, later improvements, and exclusions. A multi-role dashboard is a different scope from a contact form. A second language involves content and experience review as well as a language switch.

Describe how additions will be handled. Before a new request becomes part of delivery, discuss its effect on effort, timing, and cost. This is a practical project-management habit, not a substitute for the agreement appropriate to the engagement.

## Make acceptance observable

Replace “the form works” with checks: valid data can be submitted, incomplete fields receive useful feedback, repeated clicks do not create repeated requests while processing, and success is clear. If content administration is included, verify that its owner can edit and publish a change.

The acceptance list can stay short. Its value comes from describing behavior that both parties can inspect.

## A brief you can fill in

- Business goal and the main visitor task.
- Audience, languages, and important device scenarios.
- Pages, available content, and content owners.
- First-release requirements and later work.
- Connected systems and exchanged data.
- Who will maintain the website after handoff.
- Acceptance checks, target date, and known constraints.

These answers create a better starting point for estimating and choosing an implementation. Custom development may fit; an existing platform may fit. The choice follows the requirements and the work needed to maintain the site.

To discuss a project with Mohammed Katanani, send its goal, main visitor task, and available material through the [contact page](/en/contact). Explore [project case studies](/en/projects) for examples of different scopes.`
    }
  },
  {
    key: "rtl", slug: "arabic-interface-review-checklist", category: "TECH", tags: ["RTL", "Accessibility", "Frontend"],
    scheduledFor: "2026-11-08T06:00:00.000Z", cover: `${root}/articles/rtl.png`,
    sources: [
      { title: "MDN: HTML dir", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir" },
      { title: "MDN: CSS logical properties", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values" }
    ],
    title: { ar: "مراجعة الواجهة العربية: قائمة تتجاوز قلب الاتجاه", en: "Reviewing an Arabic Interface: A Checklist Beyond Mirroring" },
    excerpt: { ar: "راجع اتجاه النص، الحقول المختلطة، التنقل، المحتوى الطويل، ولوحة المفاتيح ضمن مسار مستخدم فعلي.", en: "Review direction, mixed-script fields, navigation, long content, and keyboard use through a complete user journey." },
    content: {
      ar: `وجود ترجمة عربية لا يعني أن تجربة الموقع العربية اكتملت. تظهر التفاصيل عند إدخال رقم هاتف، وقراءة اسم منتج إنجليزي داخل جملة عربية، والتنقل بين الخطوات على شاشة صغيرة. لذلك راجع رحلة كاملة، لا صورة الواجهة فقط.

## حدد اللغة والاتجاه بوضوح

يعلن lang لغة المحتوى، بينما يحدد dir اتجاهه الأساسي؛ أحدهما لا يغني عن الآخر. لصفحة عربية يمكنك استخدام lang="ar" وdir="rtl" على العنصر الجذري. ويمكن عزل حقل أو جزء مختلف الاتجاه عندما يحتاج ذلك. راجع وثائق [dir في MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir) للحالات التي يناسبها الاتجاه التلقائي.

عمليًا، اختبر بريدًا إلكترونيًا، ورابطًا، ورقم هاتف، واسمًا عربيًا وإنجليزيًا. لا تفترض أن كل حقل يحتاج القاعدة نفسها، ولا تستخدم اتجاهًا واحدًا لمجرد أن الصفحة عربية.

## ابنِ المسافات بحسب بداية السطر ونهايته

الخصائص المنطقية في CSS، مثل margin-inline-start وpadding-inline-end، تصف الموضع بالنسبة لاتجاه الكتابة بدل ربطه دائمًا باليمين أو اليسار. هذا يساعد عند مشاركة المكوّن بين اللغتين. تفاصيل الربط بين المحاور موضحة في [دليل MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values).

بعد تعديل المكوّن اختبره في الاتجاهين. أحيانًا تكون المشكلة في ترتيب العناصر أو المحاذاة أو عرض النص، ولا تُحل بمجرد استبدال اسم خاصية.

## راجع معنى الأيقونة قبل عكسها

اسأل ماذا تعني الأيقونة في هذا الموضع. سهم الانتقال للخطوة التالية مرتبط باتجاه الرحلة، بينما شعار المنصة أو صورة المنتج ليس عنصرًا نقلبه تلقائيًا. جهّز أمثلة من مكوناتك وراجعها وفق وظيفتها بدل تطبيق قلب شامل على جميع الصور.

## جرّب المحتوى الصعب

استبدل العناوين القصيرة بعناوين طويلة، وأضف وصفًا يمتد لعدة أسطر. جرّب سعرًا مع رمز عملة، وقائمة بها أسماء عربية وإنجليزية، ورسالة خطأ أطول من النص المعتاد. راقب البطاقات والأزرار والقوائم على الهاتف.

هدف الاختبار ليس إجبار كل عنوان على سطر واحد. الهدف بقاء التسلسل البصري واضحًا، وعدم اختفاء معلومة أو زر بسبب طول النص.

## افحص نموذجًا من بدايته إلى نهايته

استخدم لوحة المفاتيح للتنقل، ثم أدخل بيانات ناقصة أو خاطئة. هل تعرف الحقل الذي يحتاج تعديلًا؟ هل تستطيع الوصول لزر الإرسال؟ هل تبقى قيمة الحقل موجودة بعد الخطأ؟ هل يظهر نجاح الإرسال بشكل مفهوم؟

جرّب هذا المسار في اللغتين وعلى شاشة ضيقة. نجاح المظهر العام لا يثبت نجاح التفاعل في الحالات غير المثالية.

## قائمة قبول عملية

- اللغة والاتجاه محددان لكل صفحة.
- الحقول ذات النص المختلط مقروءة.
- ترتيب التنقل يناسب الرحلة.
- العناوين الطويلة لا تخفي إجراءات مهمة.
- النموذج يعرض الخطأ والنجاح ويحافظ على البيانات المطلوبة.
- يمكن إكمال المهمة بلوحة المفاتيح.
- الهاتف يعرض المحتوى دون تمرير أفقي غير مقصود.

يمكنك تسجيل الملاحظات بصيغة «الخطوة، السلوك المتوقع، السلوك الحالي، صورة». هذا يجعل إصلاح المشكلة ومراجعتها أوضح من تعليق مثل «الـRTL مش مضبوط».

لرؤية تطبيقات مختلفة، استكشف [المشاريع](/ar/projects). وإذا كان موقعك يحتاج مراجعة عربية، أرسل رابطًا ومسارًا محددًا تواجه فيه المشكلة عبر [التواصل](/ar/contact).`,
      en: `An Arabic translation is only one part of an Arabic experience. The details appear when someone enters a phone number, reads an English product name inside Arabic text, or moves through a form on a narrow screen. Review a complete journey rather than a single screenshot.

## Declare language and direction

The lang attribute declares the content language; dir establishes its base text direction. Neither replaces the other. An Arabic document can set lang="ar" and dir="rtl" on its root, while a particular field or fragment may need a different direction. [MDN documents dir](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir), including where automatic direction can help.

Test email addresses, URLs, phone numbers, and names in both scripts. Do not assume that every field needs an identical setting because the page is Arabic.

## Express spacing relative to text flow

CSS logical properties such as margin-inline-start and padding-inline-end describe positions relative to writing direction instead of always binding them to physical left and right. This can make shared components easier to maintain. See the [MDN logical-properties guide](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Logical_properties_and_values).

Check the component in both directions after changing it. An ordering, alignment, or text-width problem may require more than renaming a spacing property.

## Review the meaning of directional icons

Ask what each icon communicates. A next-step arrow belongs to a particular navigation flow; a platform logo or product photograph should not be mirrored automatically. Review actual component examples according to their purpose rather than applying one global transformation to every image.

## Use difficult content

Replace short headings with long ones. Add descriptions that wrap across several lines. Test prices with currency symbols, mixed-script lists, and error messages longer than the usual copy. Inspect cards, buttons, and menus on mobile.

The goal is not to force every title onto one line. It is to preserve the hierarchy and keep important information and actions available.

## Complete a form from start to finish

Navigate with the keyboard and submit missing or invalid data. Can you identify the field that needs attention? Reach the submit button? Recover without re-entering everything? Understand whether the request succeeded?

Repeat the journey in both languages on a narrow screen. A clean default state does not establish that the interaction works in less convenient situations.

## A practical acceptance list

- Language and base direction are explicit.
- Mixed-script fields remain readable.
- Navigation order follows the intended journey.
- Long titles do not hide important actions.
- Errors and success states are understandable.
- The task can be completed with a keyboard.
- Mobile content has no unintended horizontal scrolling.

Record an issue as steps, expected behavior, actual behavior, and a screenshot. That gives a developer a reproducible problem and a clear way to check the fix.

Explore the [project case studies](/en/projects) for different implementations. To discuss an Arabic-interface review, send the site and a specific problematic journey through the [contact page](/en/contact).`
    }
  },
  {
    key: "ai", slug: "ai-code-change-review-workflow", category: "TECH", tags: ["AI", "Code Review", "Developer Workflow"],
    scheduledFor: "2026-11-15T06:00:00.000Z", cover: `${root}/articles/ai.png`,
    sources: [{ title: "Anthropic: untrusted content and prompt injection", url: "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks" }],
    title: { ar: "من اقتراح AI إلى تعديل يمكن مراجعته: مسار عمل عملي", en: "From an AI Suggestion to a Reviewable Code Change" },
    excerpt: { ar: "حدد المطلوب والسياق وحدود التغيير، ثم راجع الفرق واختبر السلوك قبل اعتماد الكود أو المحتوى الناتج.", en: "Define the task, context, and change boundaries, then inspect the diff and verify behavior before accepting generated work." },
    content: {
      ar: `اقتراح يبدو مقنعًا داخل المحادثة قد يفشل عند دمجه في مشروع حقيقي. أحيانًا يعالج حالة واحدة ويكسر أخرى، أو يستخدم اسم دالة غير موجود في إصدارك. الاستفادة العملية من AI تحتاج مسارًا يربط الطلب بالتغيير ثم بالتحقق.

## اكتب المهمة كسلوك مطلوب

بدل «صلح النموذج»، صف المشكلة: عند الضغط المتكرر على الإرسال تظهر طلبات متكررة. المطلوب منع الإرسال أثناء المعالجة، وإظهار نتيجة واضحة، وإتاحة المحاولة بعد الفشل. أضف خطوات إعادة المشكلة والسلوك المتوقع.

يمكن للمهمة أن تكون صغيرة. كلما عرفت ماذا ستراجع، أصبح من الأسهل تحديد ما إذا كان التعديل أنجزها فعلًا.

## أعطِ سياقًا محدودًا وذا صلة

اذكر الإطار وإصداره، والملفات المعنية، وطريقة استدعاء الوظيفة، والقيود المهمة. لا تحتاج إلى نسخ المشروع كله. اشرح ما تريد الحفاظ عليه: شكل البيانات، الترجمة، أو طريقة تسجيل الدخول القائمة.

لا تُدخل كلمات مرور أو مفاتيح أو بيانات عملاء حقيقية ضمن الأمثلة. استخدم قيمًا تجريبية توضح البنية. هذه خطوة عملية لتقليل البيانات التي تشاركها دون أن تحرم المهمة من السياق اللازم.

## اطلب تغييرًا يمكن فحصه

من المفيد طلب تعديل مركز، وشرح الافتراضات، وتحديد الملفات المتأثرة. إذا توسع الاقتراح إلى إعادة بناء أجزاء لا تخدم المشكلة، أعده إلى النطاق المتفق عليه. الحل الأصغر ليس الأفضل دائمًا، لكنه أسهل للمراجعة عندما يكفي لإنجاز المطلوب.

اقرأ فرق الكود نفسه. هل أضيفت تبعية جديدة؟ تغيرت صلاحية؟ اختفى تحقق من المدخلات؟ تغيرت واجهة يستخدمها جزء آخر؟ لا يكفي ملخص المساعد للحكم على ما حدث.

## عامل المصادر الخارجية كمعلومات

قد تحتوي صفحة أو وثيقة أو نتيجة أداة على نص يحاول توجيه المساعد إلى عمل لم تطلبه. فرّق بين تعليماتك ومحتوى المصدر الذي تقرؤه. تشرح [وثائق Anthropic](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) هذا النوع من حقن التعليمات وتقترح فصل المحتوى غير الموثوق وتقليل صلاحيات الأدوات. هذه وسائل للحد من الخطر، وليست ضمانًا لاختفائه.

في سير العمل اليومي، يعني ذلك مراجعة أي اقتراح يوسع الوصول أو يرسل بيانات أو ينفذ إجراءً خارج المهمة الأصلية، حتى لو وردت التعليمات داخل وثيقة تبدو مرتبطة بالمشروع.

## اختبر السلوك المناسب للتغيير

في مثال النموذج، جرّب نجاح الطلب وفشله، والنقر المتكرر، وإمكانية إعادة المحاولة. إن كان التعديل يؤثر على API، اختبر أيضًا ردًا غير متوقع. استخدم فحوص النوع أو البناء عندما تكون مناسبة، لكن لا تعتبر نجاحها دليلًا على صحة تجربة المستخدم كاملة.

ليس كل تعديل بحاجة مجموعة اختبارات جديدة. اختر تحققًا يجيب عن الخطر الفعلي، ودوّن أي جزء لم تستطع التحقق منه.

## راجع النصوص كما تراجع الكود

إذا استخدمت AI في كتابة مقال أو منشور، راجع الأسماء والتواريخ والروابط والادعاءات الرقمية. فرّق بين رأي، ومثال توضيحي، ونتيجة حققتها بالفعل. اجعل الموقع أو المصدر الأصلي مرجعًا للادعاء بدل تكرار جملة مقنعة دون تحقق.

قائمة الإغلاق: المطلوب واضح، التغيير مقروء، الافتراضات ظاهرة، الفحص مناسب، والحدود المتبقية مذكورة. بهذه الطريقة يصبح الاقتراح خطوة داخل عملية تطوير ومراجعة، لا بديلًا عنها.

هذا مقال عن طريقة العمل؛ لا يتضمن وعدًا بنسبة توفير وقت أو دقة. إذا كنت تبني واجهة أو تدفقًا يحتاج تطويرًا، شارك المتطلبات عبر [التواصل](/ar/contact).`,
      en: `A convincing answer in a chat can still fail inside a real project. It may handle one case while breaking another, or use an API that does not exist in your version. A useful AI workflow connects the request to a reviewable change and then to appropriate verification.

## Describe the required behavior

Instead of “fix the form,” explain the issue: repeated clicks create repeated requests. The desired behavior is to prevent resubmission during processing, show a clear result, and allow another attempt after failure. Include reproduction steps and the expected outcome.

Small tasks are useful here. Knowing exactly what you will inspect makes it easier to judge whether the change solved the problem.

## Supply relevant, bounded context

Include the framework and version, relevant files, how the function is called, and important constraints. Explain what should remain compatible: the data shape, translations, or existing authentication flow. Copying an entire repository is not a substitute for identifying the context that matters.

Use sample values instead of passwords, keys, or customer records. The example should communicate structure without sharing unnecessary data.

## Ask for a change you can inspect

Request a focused modification, explicit assumptions, and a list of affected files. If a proposal expands into unrelated reconstruction, bring it back to the task. A smaller change is not automatically better, but it is easier to review when it adequately solves the problem.

Read the diff itself. Does it add a dependency, change access, remove validation, or modify an interface used elsewhere? The assistant’s summary is helpful context, not the complete evidence.

## Treat retrieved material as information

A webpage, document, or tool result may contain instructions that try to redirect an assistant. Separate your instructions from the content being read. [Anthropic’s guidance](https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/mitigate-jailbreaks) describes indirect prompt injection and recommends separating untrusted content and limiting tool access. These are risk-reduction measures, not guarantees.

In practical terms, inspect proposals that expand access, transmit data, or perform actions outside the original task, even if they appear in a document related to the work.

## Verify the behavior that changed

For the form example, try successful and failed requests, repeated clicks, and recovery. For an API change, also check an unexpected response. Use type checks or a production build where relevant, while recognizing that neither proves the whole user experience works.

Not every change needs a new test suite. Choose verification that addresses the actual concern and record anything you could not check.

## Review generated writing too

When AI helps write a post or an article, verify names, dates, URLs, and numerical claims. Distinguish opinions, illustrative examples, and outcomes you have actually achieved. Use the original project or source as evidence instead of repeating an impressive-sounding sentence.

A useful closing checklist is: clear task, readable diff, explicit assumptions, appropriate checks, and visible limitations. This turns a suggestion into one step in an engineering process.

This workflow does not promise a particular improvement in speed or accuracy. To discuss a frontend or workflow project, send the requirements through the [contact page](/en/contact).`
    }
  },
  {
    key: "handoff", slug: "website-handoff-and-maintenance-checklist", category: "FREELANCE", tags: ["Handoff", "Maintenance", "Quality"],
    scheduledFor: "2026-11-22T06:00:00.000Z", cover: `${root}/articles/handoff.png`,
    sources: [{ title: "Next.js production checklist", url: "https://nextjs.org/docs/app/guides/production-checklist" }],
    title: { ar: "تسليم الموقع: ما الذي يجب تجربته وتوثيقه قبل إغلاق المشروع؟", en: "Website Handoff: What to Verify and Document Before Closing a Project" },
    excerpt: { ar: "قائمة تساعد العميل والمطور على مراجعة الرحلات الأساسية، إدارة المحتوى، التشغيل، وحدود الدعم المتفق عليها.", en: "A practical handoff list covering user journeys, content management, operations, and the support scope agreed for the project." },
    content: {
      ar: `رابط يعمل على جهاز المطور لا يكفي وحده لتسليم موقع. التسليم يشمل التأكد من المهمة التي بُني الموقع لأجلها، ومعرفة من سيديره، وتوثيق ما يحتاجه التشغيل. يمكن تنفيذ ذلك بقائمة واضحة ومتناسبة مع حجم المشروع.

## ابدأ باختبارات القبول المتفق عليها

ارجع لوصف المشروع واختبر الرحلات الأساسية: العثور على خدمة، إرسال طلب، شراء منتج، أو تحديث محتوى. استخدم بيئة الإنتاج عندما يكون ذلك مناسبًا، مع بيانات تجريبية وإجراءات لا تسبب طلبات حقيقية غير مقصودة.

جرّب النجاح والخطأ والمحتوى الناقص، لا المسار المثالي فقط. إذا كان النموذج يعتمد على خدمة أخرى، افحص ما يراه المستخدم عند تعذر الوصول إليها. دوّن أي نقطة لم تكتمل ومن سيتابعها.

## راجع المحتوى واللغات على الأجهزة المهمة

تأكد من الروابط، وبيانات التواصل، والعناوين، والصور، والأسعار إن وجدت. افتح النصوص الطويلة والقوائم والنوافذ على الهاتف. وفي موقع ثنائي اللغة، أكمل الرحلة في كل لغة بدل الاكتفاء بمراجعة الصفحة الرئيسية.

من المفيد أن يراجع العميل معلوماته بنفسه. المطور يستطيع فحص السلوك والتنسيق، لكن مالك العمل هو المرجع لصحة تفاصيل خدماته ومنتجاته.

## سلّم طريقة إدارة المحتوى

اختبر أن الشخص المسؤول يستطيع تنفيذ تعديل فعلي: تغيير عنوان، رفع صورة، أو تحديث مشروع، ثم رؤية التغيير على الموقع. اشرح ما يمكنه تعديله، وما يحتاج تدخلًا تقنيًا، وكيف يتعامل مع خطأ حفظ أو رفع.

يمكن أن يكون التوثيق صفحة قصيرة أو تسجيلًا يشرح المهام المتكررة. لا توجد حاجة لوثيقة طويلة لا يستخدمها أحد، لكن ترك الإدارة بلا شرح ينقل الالتباس إلى ما بعد التسليم.

## وثّق التشغيل والملكية

اكتب أين يستضاف الموقع، ومن يدير النطاق، وما الخدمات الخارجية المستخدمة. وضّح ما يحتاج تجديدًا أو اشتراكًا ومن يتحمله وفق الاتفاق. شارك الوصول بالطريقة المناسبة داخل الخدمة بدل وضع المفاتيح في ملف عام.

سجّل كذلك مصدر النسخة الحالية وطريقة الرجوع عن تحديث فاشل، عندما تكون هذه المهمة ضمن النطاق. تختلف التفاصيل بين منصة جاهزة وتطبيق مخصص؛ لذلك لا ننسخ قائمة واحدة دون تكييف.

## افحص الجاهزية التقنية دون وعود مطلقة

راجع الأخطاء، والبيانات الوصفية، والصور، وما يلزم للأداء وإمكانية الوصول بحسب المشروع. يقدم [دليل Next.js للإنتاج](https://nextjs.org/docs/app/guides/production-checklist) مرجعًا لمشاريعه، ويشمل البناء والاختبار والبيانات الوصفية. اختر منه ما يناسب تنفيذك وإصداره.

نتيجة أداة واحدة لا تختصر تجربة الموقع. إذا سجلت قياسًا، اذكر الصفحة والظروف ووقت القياس بدل تحويله إلى وعد دائم لكل زائر.

## اكتب حدود الدعم والإضافات

فرّق بين إصلاح مشكلة ضمن التسليم، وتحديث محتوى، وطلب ميزة جديدة، وتكلفة خدمة خارجية. مدة الدعم وطريقته ونطاقه تُحدد حسب اتفاق المشروع. لا توجد مدة مجانية موحدة تُفترض لكل عمل.

اجعل طريقة تقديم الطلب واضحة: الرابط، خطوات المشكلة، السلوك المتوقع، وصورة أو تسجيل إن أمكن. هذا يساعد في فهم الطلب وتقديره دون محادثات طويلة لا تصل لوصف قابل للتنفيذ.

## رسالة تسليم مختصرة

يمكن أن تحتوي على: رابط الموقع، ما تم تسليمه، الاختبارات المكتملة، النقاط المفتوحة، طريقة إدارة المحتوى، مسؤوليات التشغيل، وحدود المتابعة المتفق عليها. الهدف أن يعرف الطرفان حالة المشروع والخطوة التالية.

إذا كنت تحضر لموقع جديد، ابدأ من [وصف المتطلبات](/ar/blog/website-brief-before-choosing-tools). ولمناقشة تطوير أو تحسين موقعك، استخدم [صفحة التواصل](/ar/contact).`,
      en: `A URL that works on the developer’s machine is not a complete handoff. Delivery includes checking the task the site was built for, identifying who will manage it, and documenting what its operation requires. A short checklist can make this concrete without adding unnecessary ceremony.

## Return to the acceptance checks

Test the agreed journeys: finding a service, sending a request, buying a product, or updating content. Use the production environment where appropriate, with sample data and steps that do not accidentally create real transactions.

Check errors and missing information as well as the ideal route. If a form depends on another service, inspect what a user sees when that service is unavailable. Record incomplete items and who owns the next step.

## Review content and languages on relevant devices

Verify links, contact details, headings, images, and prices where applicable. Open long text, menus, and dialogs on a phone. For a bilingual site, complete the journey in each language rather than reviewing only the homepage.

The client should check their business information. A developer can inspect behavior and layout, while the business owner remains the source of truth for services and product details.

## Hand over the content workflow

Verify that the person responsible can make a real change: update a heading, upload an image, or add project information, then see the result. Explain which changes they can manage, which require development, and what to do if saving or uploading fails.

Documentation might be a short page or a recording of recurring tasks. Its value comes from making those tasks usable, not from its length.

## Document operation and ownership

Record where the site is hosted, who manages the domain, and which external services it uses. Make renewal and subscription responsibilities clear according to the agreement. Share access through the appropriate service workflow instead of putting secrets in a public document.

Where operational handoff is included, record the current release source and how a failed update can be reversed. Adapt the list to the implementation: a hosted platform and a custom application have different operational details.

## Check readiness without absolute promises

Review errors, metadata, images, performance, and accessibility as appropriate. The [Next.js production checklist](https://nextjs.org/docs/app/guides/production-checklist) is a useful reference for its applications, including builds, verification, and metadata. Select the checks relevant to the project and version.

One tool’s score does not summarize the whole experience. If you report a measurement, record the page, conditions, and date rather than treating it as a permanent promise to every visitor.

## Make support boundaries explicit

Distinguish delivery defects, content changes, new features, and external service costs. Support duration, method, and scope depend on the project agreement; there is no universal free-support period to assume.

Ask for reports containing the URL, reproduction steps, expected behavior, and a screenshot or recording where useful. A reproducible request is easier to understand and estimate than a vague description.

## A short handoff message

Include the live URL, delivered scope, completed checks, open items, content-management instructions, operational owners, and agreed follow-up boundaries. Both parties should understand the current state and the next step.

For a new project, start with a [clear requirements brief](/en/blog/website-brief-before-choosing-tools). To discuss a build or improvement, use the [contact page](/en/contact).`
    }
  }
]
