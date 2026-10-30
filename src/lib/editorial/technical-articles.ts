import type { EditorialArticle } from "./types"
const md = (...sections: string[]) => sections.join("\n\n")
const code = (lang: string, ...lines: string[]) => "```" + lang + "\n" + lines.join("\n") + "\n```"
const briefExample = code("yaml",
  "journey: submit-service-request", "owner: operations", "source_of_truth: request-database",
  "acceptance:", "  - valid input creates one request", "  - retry with same operation key returns existing request",
  "  - CRM outage preserves request and exposes pending status", "launch_excludes:", "  - multi-stage CRM reporting")
const rtlExample = code("tsx", "<html lang=\"ar\" dir=\"rtl\">", "  <body>", "    <p>رقم الطلب: <bdi dir=\"ltr\">INV-1042</bdi></p>", "    <label htmlFor=\"email\">البريد الإلكتروني</label>", "    <input id=\"email\" type=\"email\" dir=\"ltr\" />", "  </body>", "</html>")
const cssExample = code("css", ".service-card {", "  padding-inline: 1.5rem;", "  border-inline-start: 2px solid #38bdf8;", "  min-inline-size: 0;", "  overflow-wrap: anywhere;", "}", ".service-card h2 { line-height: 1.6; }")
const fontExample = code("tsx", "import localFont from 'next/font/local'", "const arabic = localFont({", "  src: './fonts/arabic.woff2',", "  display: 'swap',", "  fallback: ['Arial'],", "  adjustFontFallback: 'Arial',", "})", "// Apply arabic.className to the layout; verify real Arabic text.")
const actionExample = code("ts",
  "'use server'", "// Illustrative: app-specific auth, schema and db helpers are omitted.",
  "export async function renameDraft(id: string, input: unknown) {",
  "  const user = await requireUser()", "  const { title } = titleSchema.parse(input)",
  "  const result = await db.draft.updateMany({", "    where: { id, ownerId: user.id, status: 'DRAFT' },",
  "    data: { title },", "  })", "  if (result.count !== 1) return { ok: false as const }",
  "  return { ok: true as const, title }", "}")
const optimisticExample = code("tsx", "// Inside a client component; confirmedTitle comes from server state.", "const [title, propose] = useOptimistic(confirmedTitle)", "const [pending, startTransition] = useTransition()", "function submit(next: string) {", "  startTransition(async () => {", "    propose(next)", "    try {", "      const result = await renameDraft(id, { title: next })", "      if (!result.ok) { setError('Update rejected'); return }", "      setError(null)", "      router.refresh() // Reconcile with server-confirmed props.", "    } catch {", "      setError('Could not save. Retry after checking the current value.')", "    }", "  })", "}", "// Render title, a pending state, and the error; disable repeated submit.")
const webhookExample = code("ts", "// Pseudocode: helpers represent application-owned infrastructure.", "const event = await verifyShopifyWebhook(request)", "await inbox.insertIfAbsent({", "  shop: event.shop,", "  deliveryId: event.deliveryId,", "  topic: event.topic,", "  resourceId: event.resourceId,", "}) // Durable inbox + unique key scoped to shop and delivery.", "return new Response(null, { status: 200 })", "// Worker atomically claims inbox rows, fetches current Admin state,", "// applies idempotent writes, then marks done; failures remain retryable.", "// Scheduled reconciliation repairs missing or stale records.")

export const technicalArticles: EditorialArticle[] = [
  {
    key: "brief", slug: "website-brief-before-choosing-tools", category: "FREELANCE", tags: ["Architecture", "Project Brief", "API Contracts"], scheduledFor: "2026-11-01T06:00:00.000Z", cover: "/editorial/2026-11/articles/brief.png", sources: [],
    title: { ar: "«ربط بسيط» ليس نطاقًا: اكتب وصفًا يحمي قرار التنفيذ", en: "Your Estimate Has an Integration Gap: Write the Brief Before the Stack" },
    excerpt: { ar: "حوّل طلب الموقع إلى رحلة واختبارات قبول: ملكية البيانات، حدود التكامل، الإعادة الآمنة، واعتماديات التقدير.", en: "Scope the user journey, data ownership, failure recovery and acceptance checks before committing to a stack or fixed estimate." },
    content: {
      ar: md(
        "«نحتاج موقعًا احترافيًا مع ربط بسيط بنظامنا». تبدو بداية مناسبة لعرض سعر، لكنها تخفي سؤالًا قد يغيّر المعمارية: هل المطلوب عرض بيانات أم إنشاء عملية يجب ألا تتكرر؟ واجهة جميلة لا تحسم من يملك السجل، أو ماذا يحدث إذا انقطع الرد بعد نجاح الحفظ. ابدأ بتوضيح هذه الحدود قبل مناقشة Next.js أو Shopify.",
        "## اكتب رحلة لها بداية ونهاية وحالة فشل",
        "مثال توضيحي: زائر يختار خدمة ويرسل طلبًا، ثم يتابع فريق العمليات الطلب داخل CRM. حدد أين يُحفظ أولًا، ومتى يرى الزائر تأكيدًا، وما الذي يحدث عند تعطل CRM. إذا كان فقدان الطلب غير مقبول، فقد تحتاج حفظًا محليًا موثوقًا وإعادة محاولة خلفية. إذا كان النموذج يرسل رسالة فقط، فقد يكفي حل أبسط. القرار يتبع العملية وحدودها.",
        "## حدّد المصدر المعتمد لكل معلومة",
        "ارسم جدولًا مختصرًا للبيانات: الاسم والبريد وموقع المشروع وحالة الطلب. من ينشئ كل حقل؟ من يستطيع تغييره؟ ما النظام الذي يحسم التعارض؟ التكامل ثنائي الاتجاه يحتاج سياسة عند تعديل الحالة في الطرفين. لا تكتب «مزامنة» وتترك اتجاهها وتواترها ومعالجة التعارض ضمنيًا.",
        "## اختبر العقد قبل تثبيت التقدير",
        "اطلب استجابة API نموذجية، وبيئة اختبار، ومسار وصول، وأخطاء متوقعة، وحدود رفع الملفات وتقسيم الصفحات. عيّن مالكًا لكل اعتماد وموعد إتاحته. إذا لم يتوفر العقد، يمكن تسعير مرحلة استكشاف أو وصف التقدير بالمبدئي مع افتراضاته. تغيير الافتراض يستدعي مراجعة النطاق؛ هذه ممارسة تخطيط وليست صياغة قانونية.",
        "## حوّل المتطلبات إلى قبول يمكن تجربته",
        "«النموذج يعمل» لا يحدد النجاح. اكتب: مدخل صحيح ينشئ سجلًا واحدًا، مدخل مرفوض يبقى دون حفظ، تكرار العملية نفسها لا يكرر السجل، وفشل التكامل يظهر حالة متابعة صادقة. المثال التالي يصف سلوكًا مطلوبًا، وليس ضمانًا بأن وجود مفتاح وحده يحقق منع التكرار؛ يلزم قيد فريد ومعالجة ذرية على الخادم.", briefExample,
        "## اختَر التقنية بعد تحديد الطبقة",
        "إذا كانت المهمة تحرير محتوى خدمات، راجع تجربة المحرر قبل بناء لوحة خاصة. إذا كانت تغيير عرض منتج Shopify، ابدأ بتقييم Liquid. وإذا كانت عملية صلاحيات وتدفق بيانات خاصًا، ناقش تطبيقًا مخصصًا. واجهة React قد تكون مناسبة لتفاعل معقد، لكن الحاجة إلى React لا تعني أن كل الخدمة يجب أن تعاد بناؤها.",
        "## ثبّت مسؤولية ما بعد الإطلاق",
        "من يراجع فشل التكامل؟ من يجدد الخدمات؟ كيف يضيف العميل محتوى؟ وما الإضافات المؤجلة؟ سلّم قائمة صغيرة تتضمن الرحلة، البيانات، العقد، الفشل، مالك كل اعتماد، واختبار القبول. جرّب النموذج مع أحد أفراد فريق العميل: هل يفهم متى انتهت العملية ومتى تحتاج متابعة؟",
        "للمؤسس ومدير الوكالة: أرسل الرابط الحالي والمهمة والأنظمة المرتبطة وأكبر نقطة غموض عبر [صفحة التواصل](/ar/contact). هذه بداية عملية لمراجعة أو تقدير له حدود واضحة."
      ),
      en: md(
        "“A professional website with a simple integration” can hide the largest uncertainty in a proposal. Reading a record and creating an operation that must never duplicate are different scopes. Before choosing Next.js or Shopify, decide who owns the data and what happens when a response disappears after a successful write.",
        "## Describe a journey, including failure",
        "Illustrative journey: a visitor selects a service, submits a request, and operations follows it in a CRM. Identify the first durable save, the point at which confirmation becomes truthful, and the behavior during a CRM outage. Losing requests may be unacceptable, requiring durable intake and background retry. A low-complexity enquiry flow may need much less. The business operation determines that decision.",
        "## Assign a source of truth",
        "List the fields: name, contact information, project location and request status. Who creates each field? Who may change it? Which system wins a conflict? Bidirectional synchronization needs a rule for competing updates. The word “sync” does not specify direction, frequency, conflict handling or operational ownership.",
        "## Inspect the contract before fixing the price",
        "Request a representative response, test access, authentication flow, error shape, file limits and pagination behavior. Name an owner and availability date for each dependency. An undefined API can justify a discovery stage or a provisional estimate with explicit assumptions. When an assumption changes, review the scope and delivery implications with the client.",
        "## Make acceptance observable",
        "Replace “the form works” with checks: valid input creates one request; invalid input creates none; a retry of the same operation does not duplicate it; and an unavailable integration leaves a visible pending state. This example is an acceptance contract, not an implementation. Duplicate protection needs a server-enforced unique operation key and atomic processing, not merely a client-generated string.", briefExample,
        "## Choose the implementation layer",
        "For a service site, test the editing workflow before proposing a custom CMS. For Shopify presentation, evaluate a Liquid section before headless. For specialized permissions or operational data flow, assess a custom application. A React interaction does not require rebuilding every surrounding service. Keep launch requirements separate from later reporting, roles or additional integrations.",
        "## Price operation as well as delivery",
        "Who investigates a failed job? Who owns the domain and recurring services? Can the client update content? What is explicitly deferred? These answers affect handoff and maintenance. Support duration and additions belong in the project agreement rather than an assumed universal package.",
        "A useful one-page brief contains the journey, fields, source of truth, dependency owners, failure policy, exclusions and acceptance checks. Ask a client-side operator to read it and explain what happens during an outage. A gap in that explanation deserves discovery before commitment.",
        "Send the current URL, user task, connected systems and largest uncertainty through the [contact page](/en/contact) to discuss a focused review or implementation scope."
      )
    }
  },
  {
    key: "rtl", slug: "arabic-interface-review-checklist", category: "TECH", tags: ["RTL", "CLS", "Next.js", "Accessibility"], scheduledFor: "2026-11-08T06:00:00.000Z", cover: "/editorial/2026-11/articles/rtl.png",
    sources: [{title:"Next.js font API",url:"https://nextjs.org/docs/app/api-reference/components/font"},{title:"MDN direction",url:"https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir"},{title:"Web.dev CLS",url:"https://web.dev/articles/cls"}],
    title: { ar: "الخط العربي يحرّك الواجهة؟ راجع الاتجاه وسبب الخلل", en: "Arabic Fonts Shift Your Layout? An RTL Review Beyond Mirroring" },
    excerpt: { ar: "اربط CLS بتحميل الخط، واعزل النص المختلط، واختبر الاتجاه والتركيز والتعافي من الخطأ ضمن رحلة فعلية.", en: "Connect font loading to layout movement, isolate mixed text, and verify keyboard access and recovery through a real Arabic journey." },
    content: {
      ar: md(
        "قد يظهر العنوان بخط احتياطي ثم يعاد التفافه بعد تحميل الخط العربي، فيتحرك زر التواصل تحته. وقد يبقى رقم الطلب غامضًا داخل جملة RTL رغم أن التصميم يبدو متناسقًا. المراجعة المفيدة تربط هذه الأعراض بسبب قابل للتجربة بدل الاكتفاء بقلب محاذاة الصفحة.",
        "## ابدأ بقياس الحركة قبل تعديل المسافات",
        "سجّل تحميلًا باردًا بشبكة مقيدة، ثم راقب عناصر layout shift وتوقيت وصول الخط. سجّل الصفحة والجهاز والتاريخ وإعدادات الاختبار. قارن نفس الظروف بعد التعديل، وافصل قياس المختبر عن بيانات الزوار الفعلية. لا تنسب كل CLS للخط؛ الصور بلا مساحة محجوزة والمحتوى المدرج لاحقًا أسباب أخرى تحتاج دليلًا.",
        "## نظّم تحميل الخط وقارن البديل",
        "يمكن لـ next/font استضافة الملفات وضبط fallback. هذا إعداد ابتدائي لخط محلي، ويحتاج الملف الفعلي في المسار الموضح. اختبر الأوزان والأحرف المطلوبة والعناوين الطويلة. اختيار Arial نقطة بداية للمقارنة، وليس تطابقًا مضمونًا مع مقاييس خطك العربي.", fontExample,
        "قد تقلل الأوزان غير الضرورية من حجم التحميل، لكن حذف حروف مطلوبة يخلق fallback داخل الكلمة نفسها. راجع ملفات الخط والترخيص والنص العربي الحقيقي. لا تعالج الحركة بتثبيت ارتفاع يقص عنوانًا أطول؛ احجز مساحة منطقية ثم اختبر المحتوى المتغير.",
        "## اللغة والاتجاه وعزل النص ثلاث قرارات",
        "lang يخدم وصف اللغة للتقنيات المساعدة، وdir يحدد الاتجاه الأساسي. اعزل المعرّفات والأكواد؛ وقد يكون البريد داخل حقل LTR أوضح مع تسمية عربية. لا تفرض LTR على كل حقل، فالاسم والعنوان قد يحتاجان سلوكًا آخر. المثال التالي جزء من شجرة الصفحة، ويجب تجنب تكرار html داخل مكوّن فرعي.", rtlExample,
        "## اجعل CSS يصف البداية والنهاية",
        "padding-inline وborder-inline-start يتبعان اتجاه المحتوى. هذا يقلل فروع CSS المتكررة، لكنه لا يقرر ترتيب الخطوات أو معنى السهم. اعكس الرموز الاتجاهية حين يتغير معناها فقط، وحافظ على ترتيب DOM الذي يخدم القراءة والتركيز.", cssExample,
        "## افحص رحلة لا لقطة",
        "افتح خدمة برابط مباشر، بدّل اللغة، أدخل عنوانًا طويلًا وبريدًا ورقمًا، ثم جرّب خطأ النموذج وإصلاحه بلوحة المفاتيح. تحقق من وضوح focus وارتباط الخطأ بالحقل وإمكان إعادة المحاولة. جرّب شاشة ضيقة وتكبير النص دون أن يختفي الإجراء الرئيسي.",
        "## حوّل الملاحظة إلى قرار",
        "وثّق الخطوات والمتوقع والحالي والدليل. مثال: بعد وصول الخط يلتف العنوان إلى سطر إضافي ويتحرك الزر؛ المقترح مقارنة مقاييس fallback ومراجعة طول النص وحجز مساحة الصورة. ثم كرر القياس والرحلة. نجاح رقم واحد لا يثبت اكتمال RTL.",
        "للمراجع: [توثيق الخط في Next.js](https://nextjs.org/docs/app/api-reference/components/font)، [اتجاه HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir)، و[شرح CLS](https://web.dev/articles/cls). لمراجعة واجهة عربية، أرسل الرابط والمسار المتأثر عبر [التواصل](/ar/contact)."
      ),
      en: md(
        "An Arabic heading can wrap again when the intended font replaces its fallback, pushing the contact button below it. An order identifier can become ambiguous inside an otherwise polished RTL sentence. A useful review connects the symptom to a reproducible cause instead of stopping at mirrored alignment.",
        "## Establish the cause of movement",
        "Record a cold load under constrained network conditions. Inspect layout-shift elements alongside font requests, then retain the URL, device conditions and date. Repeat the same setup after a change. Lab evidence and real-user data answer different questions. Images without reserved dimensions and late-inserted content can also cause shifts; do not assign the entire problem to fonts without evidence.",
        "## Compare the actual font and fallback",
        "Use next/font to organize self-hosted font loading and fallback adjustment. The local-font example requires the actual file at the shown path. Arial is a starting comparison, not a guarantee that an Arabic font's metrics match. Check real headings, supported characters and the weights used on the page.", fontExample,
        "Removing unused weights can reduce transfer size. Removing needed glyphs can produce fallback within a word. Verify font files, licensing and Arabic coverage. A fixed height that clips longer content hides one symptom while creating another; reserve space deliberately and retest variable content.",
        "## Separate language, direction and isolation",
        "lang describes language, while dir establishes base direction. Isolate identifiers and evaluate mixed inputs individually. An LTR email field may be appropriate beside an Arabic label; a person's name or street address needs its own decision. This example belongs at the document level, not as a second html element inside a child component.", rtlExample,
        "## Describe logical edges",
        "Use logical properties for spacing and borders. They reduce duplicated direction rules but do not decide the semantic order of steps or icons. Mirror directional symbols only when their meaning requires it. Preserve a DOM order that remains understandable for reading and keyboard navigation.", cssExample,
        "## Follow the full journey",
        "Enter a service through a deep link, switch languages, then complete the form with a long name, email address and number. Trigger a missing-field error and correct it with the keyboard. Inspect focus visibility, error association and retry behavior. Repeat on a narrow viewport and with enlarged text; the primary action must remain reachable.",
        "## Close with evidence",
        "Record reproduction steps, expected behavior, actual behavior and the evidence that points to a cause. If font arrival creates another heading line, compare fallback metrics, title length and nearby reserved dimensions. Repeat both the measurement and user task. A single score cannot prove a complete Arabic experience.",
        "References: [Next.js fonts](https://nextjs.org/docs/app/api-reference/components/font), [HTML direction](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/dir), and [CLS](https://web.dev/articles/cls). Send the route and affected task through [contact](/en/contact) for a focused frontend review."
      )
    }
  },
  {
    key: "ai", slug: "ai-code-change-review-workflow", category: "TECH", tags: ["AI", "Code Review", "Server Actions"], scheduledFor: "2026-11-15T06:00:00.000Z", cover: "/editorial/2026-11/articles/ai.png",
    sources: [{title:"Next.js mutations",url:"https://nextjs.org/docs/app/getting-started/mutating-data"},{title:"React useOptimistic",url:"https://react.dev/reference/react/useOptimistic"}],
    title: { ar: "نجح التعديل في البناء: من يثبت صحة الصلاحيات؟", en: "The AI PR Builds. Who Verified the Permission Boundary?" },
    excerpt: { ar: "عقد قبول وقالب PR ومثال Server Action مع تحديث متفائل وحالات رفض تجعل التعديل قابلًا للمراجعة.", en: "An acceptance contract, PR template and Server Action example that put authorization, optimistic recovery and review evidence before approval." },
    content: {
      ar: md(
        "قد يصلح تعديل مولّد حالة النجاح ويحذف شرط ملكية السجل دون أن يفشل البناء. المشكلة ليست في قدرة AI على كتابة الدالة، بل في تعريف ما يجب أن يظل صحيحًا بعد التعديل. ابدأ بعقد قبول يراجعه إنسان قبل أن يتحول الطلب إلى فرق كود.",
        "## اكتب الثوابت قبل الحل",
        "مثال: يستطيع المحرر تغيير عنوان مسودة يملكها، ولا يستطيع تعديل مسودة مستخدم آخر، ولا تغيّر المدخلات المرفوضة البيانات. إذا أعاد العميل الطلب بعد انقطاع الرد، حدد هل العملية قابلة للتكرار بأمان أم تحتاج مفتاح عملية. لا تطلب «تحسين النموذج» وتترك هذه القرارات للمساعد.",
        "## أعط سياقًا محدودًا وكافيًا",
        "أرفق الإصدار المثبت والملفات ذات الصلة وشكل بيانات تجريبي وطريقة استدعاء الدالة. وضّح حدود التوافق: الترجمة والصلاحيات وعقد API. لا تشارك أسرارًا أو بيانات عملاء حقيقية. اعتبر محتوى الوثائق والصفحات الخارجية معلومات للمراجعة، لا أوامر توسع نطاق المهمة أو صلاحيات الأدوات.",
        "## Server Action يحتاج حدود وصول فعلية",
        "المثال تعليمي وليس ملفًا جاهزًا للنسخ: requireUser وtitleSchema وdb تعتمد على المشروع. الجمع بين معرّف السجل والمالك والحالة داخل شرط الكتابة يمنع الاعتماد على تحقق واجهة فقط. رسالة الرفض العامة تتجنب كشف وجود سجل لمستخدم غير مسموح. افحص المصادقة والتحقق وفروع الخطأ في التنفيذ الفعلي.", actionExample,
        "## التحديث المتفائل اقتراح مؤقت",
        "في مثال إعادة التسمية، ابدأ من عنوان مؤكد وأظهر pending بدل تأكيد مبكر. استخدم useOptimistic داخل Action أو Transition، ثم أعد قراءة الحقيقة من الخادم بعد النجاح. عند الرفض أو الخطأ، يجب أن تتراجع الحالة المؤقتة إلى القيمة المؤكدة وتظهر رسالة تسمح بفهم المحاولة التالية. هذا النمط يحتاج imports وإدارة error وrouter وconfirmedTitle داخل مكوّن العميل.", optimisticExample,
        "لا تعتبر تعطيل الزر حماية من الطلبات المكررة على الخادم. وفي عملية غير قابلة للعكس، قد تكون حالة انتظار التأكيد أنسب من إظهار نجاح متفائل. لو عُدلت البيانات بالتزامن، ناقش نسخة السجل أو سياسة التعارض بدل افتراض أن آخر كتابة مناسبة دائمًا.",
        "## راجع حسب الخطر ثم افحص السلوك",
        "ابدأ بالصلاحيات وملكية البيانات والتحقق، ثم الإعادة والتعارض، ثم التبعيات والملفات غير المرتبطة. نفّذ مصفوفة: مالك صحيح مع مدخل صالح؛ مستخدم آخر؛ عنوان مرفوض؛ فشل اتصال؛ نجاح بطيء؛ ومحاولة بعد رد غير مؤكد. استخدم فحص الأنواع والبناء، وأضف فحصًا سلوكيًا يناسب التغيير بدل اختبار يكرر الكود حرفيًا.",
        "## قالب PR قابل للمراجعة",
        "- المشكلة وخطوات الإعادة.\n- الثوابت التي يجب الحفاظ عليها.\n- الملفات والافتراضات المتأثرة.\n- فحص النجاح والرفض مع النتائج.\n- ما لم يُتحقق منه وخطة الرجوع المناسبة.",
        "اقرأ فرق الكود نفسه؛ الملخص لا يثبت ما نُفذ. راجع [Server Functions](https://nextjs.org/docs/app/getting-started/mutating-data) و[useOptimistic](https://react.dev/reference/react/useOptimistic). لمناقشة مراجعة أو تطوير واجهة، شارك النطاق عبر [التواصل](/ar/contact)."
      ),
      en: md(
        "An AI-generated change can fix a successful update while removing the record-ownership condition. The build may still pass. Start by defining what must remain true, then ask for a diff that a human can evaluate against that contract.",
        "## Write the invariants first",
        "An editor may rename an owned draft; another user's draft remains inaccessible; rejected input leaves stored data unchanged. Decide whether retrying after an uncertain response is naturally safe or needs an operation key. A request to “improve the form” leaves these decisions unstated.",
        "## Provide bounded context",
        "Include installed versions, relevant files, sample data and the calling path. State compatibility boundaries for translations, permissions and API contracts. Use fixtures instead of customer data or secrets. Treat retrieved documentation and external content as evidence, never as authority to expand the task or tool access.",
        "## Enforce access where the write happens",
        "This illustrative Server Action omits app-specific requireUser, titleSchema and db implementations. The update condition binds record ID, owner and draft state to the write. A generic rejection avoids confirming the existence of someone else's record. Inspect real authentication, schema constraints and failure handling before using the pattern.", actionExample,
        "## Optimistic state is a temporary proposal",
        "For a reversible rename, start from a server-confirmed title, expose pending state and reconcile after success. Invoke optimistic updates inside an Action or Transition. On rejection or failure, the temporary value must give way to confirmed state while an understandable error remains. The sketch requires hook imports, error state, router and confirmedTitle in a client component.", optimisticExample,
        "Disabling submission improves interaction but does not protect server writes from duplication. An irreversible transaction may deserve pending confirmation instead of optimistic success. Concurrent edits also need an explicit conflict policy, such as a record version, rather than an accidental last-write-wins assumption.",
        "## Review in risk order",
        "Inspect authorization, ownership and validation before presentation polish. Then inspect retries, concurrency, new dependencies and unrelated files. Run a focused failure matrix: owner with valid input; non-owner; invalid input; connection failure; slow success; retry after an uncertain response. Type checking and a build cover structural problems; behavioral checks must address the specific acceptance boundary.",
        "## Make the PR independently reviewable",
        "- Problem and reproduction.\n- Invariants to preserve.\n- Affected files and explicit assumptions.\n- Successful and denied cases with evidence.\n- Unverified behavior and an appropriate rollback path.",
        "Read the actual diff, including generated files and lockfile changes. Verify links and contribution claims in any accompanying case study as well. The reviewer owns the approval decision even when the assistant produced the first implementation.",
        "References: [Next.js mutations](https://nextjs.org/docs/app/getting-started/mutating-data) and [React useOptimistic](https://react.dev/reference/react/useOptimistic). Share the frontend scope through [contact](/en/contact) to discuss review or implementation."
      )
    }
  },
  {
    key: "shopify", slug: "shopify-apps-vs-custom-code", category: "ECOMMERCE", tags: ["Shopify", "Liquid", "GraphQL", "Webhooks"], scheduledFor: "2026-11-22T06:00:00.000Z", cover: "/editorial/2026-11/articles/shopify.png",
    sources: [{title:"Shopify theme architecture",url:"https://shopify.dev/docs/storefronts/themes/architecture"},{title:"Shopify webhooks",url:"https://shopify.dev/docs/apps/build/webhooks"},{title:"Admin GraphQL API",url:"https://shopify.dev/docs/api/admin-graphql"},{title:"Storefront API",url:"https://shopify.dev/docs/api/storefront"}],
    title: { ar: "قبل تخصيص متجر شوبيفاي: حدّد طبقة المشكلة", en: "Liquid, Custom App or Headless? Choose the Shopify Layer First" },
    excerpt: { ar: "افصل عرض المتجر عن العمليات وتجربة الشراء، ثم صمّم GraphQL وwebhooks بمسار منع تكرار وإعادة محاولة ومطابقة.", en: "Separate theme presentation, operational integration and storefront experience, then scope reliable GraphQL and webhook processing." },
    content: {
      ar: md(
        "تحسين صفحة المنتج لا يفرض إعادة بناء المتجر Headless. وربط الطلبات بنظام خارجي لا يُحل بوضع مفتاح Admin داخل JavaScript القالب. قبل مقارنة تطبيق جاهز بكود مخصص، حدد الطبقة التي تتغير والجهة التي ستشغّلها بعد التسليم.",
        "## العرض: ابدأ بتقييم Liquid sections",
        "إذا كانت الحاجة ترتيب معلومات المنتج أو إتاحة كتلة يحررها التاجر، فافحص إمكانات القالب وsections وblocks أولًا. راجع إعدادات المحرر وتوافق القالب والأصول التي يضيفها التطبيق. التطبيق الجاهز مناسب حين يغطي التدفق المطلوب ويمكن تقييم صلاحياته وتكلفته ودعمه وخطة إزالته. لا تعيد بناء ميزة مستقرة دون سبب تشغيلي واضح.",
        "## العمليات: تطبيق بخادم وAdmin GraphQL",
        "عندما يحتاج الفريق عملية خاصة تربط الطلبات أو المخزون بنظام آخر، ناقش تطبيقًا وصلاحيات محددة. يمكن لخدمة مبنية على Remix استضافة مسارات الخادم، لكن اختيار Remix لا يجعل واجهة العميل Headless تلقائيًا. ثبت إصدار API، وتعامل مع pagination وحدود التكلفة وuserErrors في mutations؛ نجاح HTTP وحده لا يثبت نجاح العملية التجارية. أبقِ بيانات اعتماد Admin في الخادم.",
        "## تجربة الشراء المستقلة: Storefront وليس Admin للمتصفح",
        "Headless قرار لتجربة واجهة العميل واستضافتها وبياناتها، ويستخدم Storefront API لعمليات مثل المنتجات والسلة. قد تحتاج خادمًا منفصلًا لعمليات Admin. احسب تحرير المحتوى والبحث والتحليلات وتوافق التطبيقات وإدارة المسارات؛ هذه مسؤوليات إضافية تحتاج مبررًا في رحلة العميل، لا مجرد تفضيل إطار.",
        "## صمّم استقبال webhook قبل وظيفة المزامنة",
        "تحقق من المصدر والتوقيع بواسطة مكتبة Shopify المناسبة والطلب الخام كما تتطلب. احفظ الحدث في inbox دائم بمفتاح فريد يجمع المتجر ومعرّف التسليم. لا تؤكد الاستلام قبل نجاح التخزين الدائم. عامل التكرار كحالة طبيعية، ولا تفترض أن الأحداث تصل بالترتيب. المثال التالي pseudocode وليس تطبيقًا مكتملًا.", webhookExample,
        "## لا تجعل منع التكرار سببًا لفقدان العمل",
        "تسجيل deliveryId ثم تعطل العملية قبل إضافة العمل لطابور منفصل قد يفقد التحديث. inbox دائم أو transactional outbox يربط التسجيل والعمل؛ عامل خلفي يحجز السجلات ذريًا ويعيد الفاشل. وحتى مع إزالة تكرار التسليم، يجب أن تتحمل الكتابة إلى النظام الخارجي إعادة التنفيذ بعد انقطاع رد غير مؤكد. استخدم معرّف العملية أو upsert حسب إمكانات الطرف الآخر.",
        "## المطابقة تصلح ما فات الأحداث",
        "اجلب الحالة الحالية من Admin GraphQL قبل تطبيق تحديث حساس لترتيب الأحداث. نفّذ مطابقة دورية للبيانات ضمن نافذة متفق عليها، مع pagination ومؤشر تقدم يُحفظ بعد نجاح المعالجة وحدود وصول واضحة. سجل آخر نجاح وحالة الفشل وخطة replay. لا تعد بتسليم مرة واحدة فقط أو زمن ثابت دون تصميم وقياس يثبتان ذلك.",
        "## ورقة القرار للمؤسس أو الوكالة",
        "- ما الطبقة: عرض أم عمليات أم تجربة شراء مستقلة؟\n- هل يغطي حل موجود العملية؟\n- من يملك الصلاحيات والبيانات والمراقبة؟\n- كيف تُعالج الإعادة والتكرار والتعارض؟\n- من يدير التحديثات والتكاليف وخطة الإزالة؟",
        "راجع [معمارية القالب](https://shopify.dev/docs/storefronts/themes/architecture)، [webhooks](https://shopify.dev/docs/apps/build/webhooks)، [Admin GraphQL](https://shopify.dev/docs/api/admin-graphql) و[Storefront](https://shopify.dev/docs/api/storefront). أرسل رابط المتجر والعملية المتعثرة والأنظمة المتصلة عبر [التواصل](/ar/contact) لنناقش نطاقًا يناسب الحاجة."
      ),
      en: md(
        "A better product page does not automatically require headless. An order integration does not belong in theme JavaScript with an Admin credential. Before comparing an app with custom code, identify the layer that changes and the person who will operate it.",
        "## Presentation: evaluate Liquid sections first",
        "For product information layout or merchant-editable blocks, inspect the theme's sections, blocks and editor settings. Evaluate app assets and theme compatibility. An existing app can be appropriate when its workflow, permissions, recurring cost, support and removal path fit the store. Rebuilding a stable capability needs an operational reason.",
        "## Operations: server-side app and Admin GraphQL",
        "Specialized order or inventory workflows may justify a custom service with narrowly scoped access. Remix can host server-side app routes; choosing Remix does not itself create a headless storefront. Pin an API version and handle pagination, query cost and mutation userErrors. An HTTP success does not guarantee the business mutation succeeded. Keep Admin credentials server-side.",
        "## Independent buying experience: Storefront API",
        "Headless changes the customer-facing application, hosting and data flow. Storefront API supports customer-facing product and cart operations; privileged Admin work needs its own server boundary. Budget for content editing, search, analytics, app compatibility and route management. The customer journey must justify those additional responsibilities.",
        "## Design webhook intake before synchronization",
        "Use Shopify's supported verification for the raw request and validate authenticity. Persist a durable inbox row with a unique shop-and-delivery key before acknowledging receipt. Duplicates are normal; arrival order is not a reliable business-state order. The sketch is pseudocode: every helper represents infrastructure the application must implement.", webhookExample,
        "## Deduplication must not lose work",
        "Recording a delivery ID and crashing before publishing a separate queue message can lose the update. A durable inbox or transactional outbox keeps intake coupled to pending work. A worker atomically claims rows, retries failures and records completion. Delivery deduplication alone does not make the external write safe after a lost response; use an operation key or idempotent upsert where the destination supports it.",
        "## Reconcile against the authoritative state",
        "For order-sensitive changes, fetch current Admin state rather than blindly replaying stale payloads. Schedule bounded reconciliation with pagination, access limits and a durable progress cursor advanced after successful processing. Decide which system owns conflicting fields. Expose last successful synchronization, actionable failure state and replay controls for an operator. Do not promise exactly-once delivery or a fixed latency without evidence.",
        "## Make the decision reviewable",
        "- Which layer changes: presentation, operations or buying experience?\n- Does an existing capability fit?\n- Who owns access, data and monitoring?\n- What happens on retries, duplicates and conflicts?\n- Who maintains API upgrades, costs and the removal path?",
        "Acceptance should include a duplicate delivery, stale event, destination outage and reconciliation repair. The custom option earns its cost by solving a specific requirement with an operating plan, not by adding a preferred framework.",
        "References: [theme architecture](https://shopify.dev/docs/storefronts/themes/architecture), [webhooks](https://shopify.dev/docs/apps/build/webhooks), [Admin GraphQL](https://shopify.dev/docs/api/admin-graphql) and [Storefront](https://shopify.dev/docs/api/storefront). Share the store URL, blocked workflow and connected systems through [contact](/en/contact) to scope the appropriate layer."
      )
    }
  }
]
