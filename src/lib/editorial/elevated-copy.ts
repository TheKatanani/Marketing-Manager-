/** Original engineering guidance. Diagrams and snippets are illustrative. */
export const elevatedCopy = [
  {
    title: "السعر الثابت يبدأ من حدود واضحة",
    linkedin: `«أضف ربطًا بسيطًا مع نظامنا». قد تخفي هذه الجملة الجزء الأصعب في مشروع الموقع.

هل الربط قراءة أم كتابة؟ من يملك البيانات؟ ماذا إذا نجح الحفظ وفشل الرد؟ وهل إعادة المحاولة تنشئ طلبًا ثانيًا؟

قبل تسعير واجهة Next.js أو متجر Shopify، اكتب رحلة واحدة حتى نهايتها:
• الزائر يرسل طلب خدمة.
• الخادم يتحقق من المدخلات ويسجله.
• التكامل ينقله إلى CRM.
• عند تعطل CRM، يبقى الطلب محفوظًا وتظهر حالة صادقة للمستخدم.

هنا يصبح القرار هندسيًا: ربما نحتاج سجل عمليات وطابور إعادة محاولة، وربما يكفي نموذج مستقل. لا يحسم اسم الإطار هذا الاختلاف.

اكتب لكل تكامل: الحدث، البيانات، المصدر المعتمد، الفشل، ومسؤول المتابعة. ثم افصل متطلبات الإطلاق عن الإضافات.

مدير الوكالة يستطيع مراجعة النطاق بهذه الورقة قبل اعتماد العرض. والمؤسس يستطيع رؤية ما سيشتريه فعلًا.

الدليل يتضمن قالبًا واختبارات قبول. أرسل وصف الرحلة إذا كنت تحتاج تقديرًا لواجهة أو تكامل.`,
    instagram: "«ربط بسيط» قد يعني قراءة بيانات، أو كتابة، أو إعادة محاولة لا يجوز أن تكرر الطلب. احفظ تسلسل الشرائح، واستخدم نموذج النطاق الهندسي في مقالات الموقع من رابط الملف الشخصي قبل طلب التقدير.",
    tweets: ["«ربط بسيط» ليس نطاقًا. حدد: الحدث، البيانات، المصدر المعتمد، الفشل، ومسؤول المتابعة. هل تعيد المحاولة بأمان إذا حُفظ الطلب وانقطع الرد؟", "قبل اختيار Next.js أو Shopify، اكتب رحلة واحدة مع معيار قبول وحالة فشل. قالب عملي:"],
    slides: [["«ربط بسيط» قد يغيّر النطاق", "المشكلة في حدود النظام\nقبل أن تكون في اختيار التقنية."], ["الخطأ: تسعير المسار المثالي", "نجاح الطلب وحده لا يكفي.\nماذا إذا انقطع الرد بعد الحفظ؟"], ["ارسم عقد التكامل", "حدث + بيانات + مصدر معتمد\nفشل + مسؤول متابعة"], ["اكتب قبولًا يمكن اختباره", "أرسل الطلب نفسه مرتين.\nالمتوقع: سجل واحد ونتيجة واضحة."], ["ثبّت الحدود قبل السعر", "احفظ القائمة. نموذج النطاق\nفي المقالات من رابط الملف الشخصي."]]
  },
  {
    title: "Your estimate has an API-shaped hole",
    linkedin: `“The API is ready” is an assumption until someone tries the integration.

A polished proposal can still hide an undefined permission model, missing pagination, or an upload endpoint that only works with tiny files.

For an agency scoping a React frontend, request one representative response and one authenticated test journey before fixing the integration estimate.

Put three things beside the price:
1. Contract: request/response shape, authentication, pagination, errors.
2. Dependency: who owns the API and when test access arrives.
3. Acceptance: what the user can complete, including recovery.

Example: “An editor can upload an allowed image, receives a useful error for an invalid file, and can retry after a network failure.”

If the contract is unknown, scope discovery or label the estimate provisional. The client can evaluate that decision.

Founders need to know which uncertainty can move the delivery date. Send the interface and a sample API contract when discussing a frontend build.`,
    instagram: "«الـ API جاهز» يحتاج تجربة قبل تثبيت التقدير. اطلب استجابة نموذجية ومسار صلاحيات، ثم اكتب الاعتماديات واختبار القبول. احفظ الشرائح؛ لمناقشة نطاق React أرسل الرابط وعينة عقد البيانات من صفحة التواصل.",
    tweets: ["“The API is ready” needs evidence: sample response, auth flow, pagination and error contract. Put the dependency owner beside your frontend estimate.", "Unknown integration? Scope discovery or label the estimate provisional. Acceptance should include invalid input and failed requests, not only the happy path."],
    slides: [["هل الواجهة البرمجية جاهزة فعلًا؟", "عبارة واحدة قد تخفي\nاعتمادًا يغيّر موعد التسليم."], ["الخطأ: تقدير بلا تجربة", "استجابة ناجحة لا تكشف\nالصلاحيات أو الصفحات أو الفشل."], ["حدّد العقد والاعتماديات", "شكل البيانات + الوصول + الأخطاء\nومالك كل اعتماد وموعده"], ["اختبار قبول لرفع ملف", "ملف مسموح: نجاح\nملف مرفوض: سبب وخيار إعادة"], ["اجعل التقدير قابلًا للمراجعة", "احفظ القالب. أرسل عقد API\nمن صفحة التواصل في الملف الشخصي."]]
  },
  {
    title: "Coach Space: the interface owns recovery",
    linkedin: `A learning interface is easy to demo when every request succeeds. The interesting review starts when one fails.

On Coach Space, my role was Team Leader and Frontend Developer: I built the web frontend and integrated it with the shared Django/DRF API.

That scope puts a clear boundary in the case study: frontend delivery and team leadership, with a shared backend contract.

For an agency reviewing a similar learning product, I recommend a state map for each critical screen:
• Loading: reserve space and explain what is pending.
• Empty: distinguish “no courses” from an unreadable response.
• Unauthorized: provide the right route back to access.
• Failed: preserve context and offer a safe retry.

For paginated data, decide whether an empty next page means completion or a failed fetch. Do not silently replace an error with an empty list.

These are review recommendations; the project page records my contribution. Use it to discuss the frontend scope your own platform needs.`,
    instagram: "دوري في Coach Space: قائد فريق ومطور واجهات؛ بنيت واجهة الويب وربطتها بواجهة Django/DRF المشتركة. الشرائح قائمة مراجعة مقترحة لمنصة تعليمية: التحميل والفراغ والصلاحيات والخطأ. سياق المشروع في رابط الملف الشخصي.",
    tweets: ["Coach Space: Team Leader and Frontend Developer. I built the web frontend and integrated it with the shared Django/DRF API. Clear contribution boundaries make case studies useful.", "Review pattern for learning UI: loading, empty, unauthorized, failed, ready. A failed course request must not masquerade as an empty list. Project context:"],
    slides: [["الفشل جزء من رحلة التعلم", "Coach Space: قيادة الفريق\nوتطوير واجهة الويب"], ["الخطأ: عرض الفشل كفراغ", "«لا توجد دورات» تختلف\nعن «تعذر تحميل الدورات»."], ["افصل حالات الواجهة", "تحميل • فراغ • صلاحيات • خطأ\nنمط مراجعة لمنصة تعليمية"], ["اربط الحالة بالسلوك", "failed: احتفظ بالسياق وأتح الإعادة\nempty: اشرح الخطوة التالية"], ["راجع حدود مساهمتك أيضًا", "واجهة ويب مع Django/DRF مشترك.\nالمشروع في رابط الملف الشخصي."]]
  },
  {
    title: "الخط العربي قد يحرّك زر الشراء",
    linkedin: `إذا تحرّك زر الشراء بعد ظهور الخط العربي، فالمشكلة ليست تفصيلًا بصريًا.

استبدال الخط الاحتياطي بخط ذي مقاييس مختلفة قد يغيّر ارتفاع العنوان والتفافه، فتتحرك العناصر تحته ويزيد CLS.

ابدأ بتسجيل أداء على تحميل بارد وشبكة مقيدة. افحص العناصر التي تحركت وتوقيت تحميل الخط قبل تعديل المسافات عشوائيًا.

في Next.js، استخدم next/font لتنظيم تحميل الخط واستضافته. راجع الأوزان والحروف العربية، وقارن البديل على النص الفعلي؛ الأداة لا تعفيك من قياس الصفحة.

ثم افحص ما لا يحله قلب الاتجاه:
• lang="ar" يصف اللغة، وdir="rtl" يحدد الاتجاه.
• اعزل رقم الطلب أو البريد داخل bdi أو حقل باتجاه مناسب.
• استخدم margin-inline بدل ربط المسافات باليمين واليسار.
• اختبر عنوانًا طويلًا مع التركيز بلوحة المفاتيح.

كرر رحلة الشراء أو الطلب بعد تحميل بارد وبعد تبديل اللغة. الدليل يتضمن CSS وقائمة قياس. شارك رابط الصفحة إذا كانت واجهتك العربية تحتاج مراجعة.`,
    instagram: "زر يتحرك مع ظهور الخط العربي؟ افحص تحميل الخط ومقاييس البديل والتفاف العناوين قبل تعديل padding. احفظ مراجعة RTL وCLS، واقرأ أمثلة الكود في دليل الواجهة العربية من رابط الملف الشخصي.",
    tweets: ["ظهور الخط العربي قد يغيّر التفاف العنوان ويحرك العناصر تحته. افحص CLS على تحميل بارد وشبكة مقيدة، ثم قارن مقاييس الخط والبديل.", "lang للغة، dir للاتجاه، وbdi لعزل رقم أو اسم مختلط. أضف CSS منطقيًا واختبار لوحة المفاتيح. الدليل:"],
    slides: [["الخط العربي قد يحرّك زر الشراء", "تحول الخط قد يغيّر الالتفاف\nويزيح العناصر أثناء التحميل."], ["الخطأ: إخفاؤه بمسافة ثابتة", "padding يعالج العرض الحالي.\nالنص الأطول يعيد المشكلة."], ["راجع الخط والاتجاه معًا", "تحميل منضبط + بديل مناسب\nوعزل النصوص المختلطة"], ["مسافات تعمل في الاتجاهين", ".card { padding-inline: 24px; }\nاختبره مع عنوان عربي طويل."], ["قِس قبل اعتماد الإصلاح", "احفظ القائمة. الكود والتفاصيل\nفي المقالات من رابط الملف الشخصي."]]
  },
  {
    title: "Optimistic UI needs a failure plan",
    linkedin: `A button that says “Saved” before the server accepts the change makes a promise your backend may reject.

Optimistic UI is useful when the action is reversible and recovery is designed.

For a Next.js Server Action, split the responsibilities:
• Client: show the proposed state and a pending indicator.
• Server: authenticate, authorize the specific record, validate, persist.
• Recovery: restore confirmed state and explain how to retry.

React useOptimistic models temporary state inside an Action or Transition. It does not grant permission or make a database write idempotent.

Test slow success, validation rejection, expired access, and a retry after an uncertain response. Disable repeated submission where appropriate; enforce duplicate protection on the server when the operation needs it.

For an irreversible payment or order operation, pending confirmation may be more honest than premature success.

Agency handoff question: can the client distinguish “we received your click” from “the operation committed”?`,
    instagram: "«تم الحفظ» قبل تأكيد الخادم وعد يحتاج خطة فشل. صمّم انتظارًا، وتحقق الصلاحيات في Server Action، واستعد الحالة المؤكدة عند الرفض. احفظ التسلسل؛ لمراجعة Next.js استخدم التواصل من الملف الشخصي.",
    tweets: ["Optimistic UI is a temporary proposal. Server Actions still need auth, record authorization and validation. Design rollback and retry before showing “Saved”.", "Test slow success, rejected input, expired access and an uncertain-response retry. useOptimistic does not make a write idempotent."],
    slides: [["هل حُفظ فعلًا أم تغيّر الزر؟", "واجهة متفائلة تحتاج\nخطة فشل يمكن التعافي منها."], ["الخطأ: نجاح قبل التأكيد", "النقرة وصلت للواجهة.\nهذا لا يثبت قبول الخادم."], ["افصل التوقع عن الحقيقة", "حالة مؤقتة + pending\nثم تثبيت أو استعادة الحالة"], ["فحوص وظيفة الكتابة على الخادم", "auth → authorize → validate → write\nثم اختبر الرفض وإعادة المحاولة."], ["اختر التفاؤل بوعي", "احفظ القائمة. لمراجعة Next.js\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title: "ترجمة صحيحة، ورحلة تواصل مكسورة؟",
    linkedin: `قد تكون كل جملة مترجمة، ومع ذلك يفشل الزائر في الوصول إلى الخدمة.

منصة د. مروان العزاوي للطيران والاستشارات مثال من مشاريعي على واجهة عربية وإنجليزية. وهي مدخل لمراجعة الرحلة كاملة في كل لغة.

في مراجعة مشروع مماثل:
• افتح خدمة مباشرة برابط عميق.
• بدّل اللغة: هل تبقى في الخدمة نفسها؟
• استخدم عنوانًا أطول وراقب زر التواصل على الهاتف.
• أرسل نموذجًا ناقصًا، ثم صحح الحقل بلوحة المفاتيح.

خذ قرارًا صريحًا للمسارات: مفتاح خدمة ثابت يرتبط بعنوان كل لغة أوضح من تخمين الصفحة المقابلة من النص الظاهر.

هذه توصيات مراجعة، ودراسة المشروع توضح سياقه الفعلي. ابدأ بالخدمة الأعلى أولوية واختبر الوصول إليها والتواصل بشأنها.

أرسل رابط الموقع والرحلة المطلوبة إذا كنت تحتاج مراجعة frontend مركزة.`,
    instagram: "ابدأ مراجعة اللغتين من مسار خدمة كامل. منصة د. مروان العزاوي مثال من البورتفوليو؛ والشرائح اختبار مقترح للرابط العميق وتبديل اللغة والنموذج. احفظ الاختبار، وسياق المشروع في رابط الملف الشخصي.",
    tweets: ["الترجمة لا تكفي: افتح خدمة برابط مباشر، بدّل اللغة، ثم أكمل التواصل على الهاتف. هل بقيت في الخدمة نفسها وظهرت الأخطاء بوضوح؟", "منصة د. مروان العزاوي للطيران والاستشارات مثال من البورتفوليو على واجهة عربية وإنجليزية. سياق المشروع:"],
    slides: [["ترجمة صحيحة، رحلة مكسورة؟", "مراجعة مقترحة لموقع خدمات\nانطلاقًا من مشروع د. مروان"], ["الخطأ: فحص الرئيسية فقط", "قد يعيد تبديل اللغة الزائر\nإلى البداية ويفقد سياق الخدمة."], ["اربط اللغتين بمفتاح ثابت", "معرّف الخدمة ثابت.\nالعنوان والمسار يتبعان اللغة."], ["نفّذ الرحلة خطوة بخطوة", "رابط خدمة → تبديل لغة → تواصل\nثم حقل ناقص وتصحيح بالكيبورد"], ["ابدأ بخدمة واحدة اليوم", "احفظ الاختبار. سياق المشروع\nفي البورتفوليو من رابط الملف."]]
  },
  {
    title: "Your AI PR needs an acceptance contract",
    linkedin: `“It builds” is weak evidence for an AI-generated change that edits permissions.

An agency can save typing and inherit a larger review problem. Define the acceptance contract before asking for code.

Example: an editor can update an owned draft; another user's draft stays inaccessible; invalid input leaves stored data unchanged.

Supply relevant files, installed versions, sample data, and boundaries. Ask for a focused diff and assumptions the assistant cannot verify.

Review in risk order:
1. Authorization and data ownership.
2. Validation and error paths.
3. Duplicate writes and retries.
4. Dependencies and unrelated edits.

Run the ownership-denial check as well as the successful update. Read the diff yourself. A persuasive summary does not prove an auth branch still exists.

For agency directors, the deliverable is a change another engineer can inspect, reproduce, and maintain. Generated code needs an accountable reviewer.

The article includes a PR template, a mutation example, and a failure matrix.`,
    instagram: "قبل طلب كود AI، اكتب عقد القبول: من يستطيع التعديل وما البيانات الصحيحة وماذا يحدث عند الرفض. راجع الفرق ثم اختبر الوصول المرفوض. احفظ التسلسل؛ قالب PR ومثال Server Action في المقال من رابط الملف الشخصي.",
    tweets: ["An AI PR needs acceptance before code: allowed actor, valid input, denied access, failure recovery. “It builds” does not verify ownership checks.", "Review auth, validation, retries and dependency changes before polish. Ask for evidence another engineer can reproduce. PR template:"],
    slides: [["نجاح البناء لا يثبت صحة التعديل", "خصوصًا حين يمس الصلاحيات\nأو يكتب بيانات العملاء."], ["الخطأ: مراجعة الملخص فقط", "قد يبدو الشرح مقنعًا\nبينما اختفى شرط ملكية السجل."], ["اكتب عقد قبول قبل التعديل", "مستخدم مسموح + مدخل صحيح\nورفض آمن للحالات الأخرى"], ["افحص فرع الرفض أيضًا", "owner=A, actor=B → denied\nstoredData → unchanged"], ["اطلب تغييرًا يمكن مراجعته", "احفظ التسلسل. القالب والمثال\nفي المقال من رابط الملف الشخصي."]]
  },
  {
    title: "المشكلة ليست «الزر لا يعمل»",
    linkedin: `الزر يعمل في العرض، لكنه يبقى معطّلًا بعد فشل الطلب. هذا وصف يفتح طريق الإصلاح.

«الزر لا يعمل» يدفع المطور أو AI إلى التخمين. التقرير القابل للإعادة يحدد انتقال الحالة الذي انكسر.

مثال توضيحي:
1. افتح النموذج واملأ بيانات صالحة.
2. حاكِ ردًا فاشلًا في بيئة الاختبار.
3. أرسل الطلب.
المتوقع: رسالة خطأ، حفظ الحقول، وإمكانية المحاولة مجددًا.
الحالي: يبقى pending=true ولا يستجيب الزر.

أرفق المتصفح وإصدار التطبيق ومعرّف تتبع منقحًا إن توفر. الصورة وحدها لا تخبرنا هل فشل الطلب أم بقيت الواجهة في حالة خاطئة.

فحص الإغلاق: كرر الفشل، حاول مجددًا بنجاح، وتحقق أن العملية لم تتكرر على الخادم.

هذا السياق يجعل مراجعة إصلاح AI قابلة للحكم. احفظ القالب لفريقك أو أرسله مع طلب مراجعة الواجهة.`,
    instagram: "سمِّ انتقال الحالة: إرسال → فشل → إعادة محاولة. أرفق الخطوات والمتوقع والحالي والبيئة، ثم أعد الرحلة للتحقق. احفظ قالب الشرائح؛ لمناقشة خلل بالواجهة استخدم التواصل من الملف الشخصي.",
    tweets: ["تقرير مفيد: بعد رد فاشل يبقى pending=true. المتوقع رسالة خطأ وإتاحة الإعادة مع حفظ الحقول. صف انتقال الحالة بدل «الزر لا يعمل».", "فحص الإغلاق: فشل → إعادة محاولة ناجحة → تحقق من عدم تكرار السجل. أرفق البيئة وسجلًا منقحًا يساعد على إعادة المشكلة."],
    slides: [["المشكلة ليست «الزر لا يعمل»", "بل انتقال حالة ينكسر\nبعد فشل الطلب."], ["الخطأ: صورة بلا خطوات", "الصورة لا تكشف الطلب\nأو سبب بقاء الزر معطّلًا."], ["صف آلة الحالات", "idle → pending → failed\nثم retry → success"], ["تقرير قابل للإعادة", "الحالي: pending=true بعد الخطأ\nالمتوقع: retry مع حفظ الحقول"], ["أغلق المشكلة بالدليل", "احفظ القالب. لمراجعة الواجهة\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title: "Treat AI content like a production diff",
    linkedin: `An AI rewrite can turn “frontend developer” into “built the entire platform.”

That is a data-integrity problem before it is a tone problem.

Keep a source record for technical case studies: role, stack, verified outcomes, canonical URL, and claims needing evidence. Generate platform drafts from that record.

Review in two passes:
• Facts: contribution, platform, dates, links, measurements.
• Delivery: hook, technical example, reading order, one next step.

LinkedIn can argue the trade-off. X can isolate one failure mode. Instagram can show problem → mistake → architecture → example → takeaway.

Shorter copy must preserve the boundary between a recommended pattern and work delivered on a specific project.

Coach Space's source record says Team Leader and Frontend Developer, integrating the web frontend with a shared Django/DRF API. Every adaptation must preserve that scope.

Add fact review beside code review when using AI for client-facing work.`,
    instagram: "اختصار دراسة مشروع قد يغيّر الحقيقة. ثبّت الدور والتقنية والرابط والنتائج الموثقة في سجل واحد، ثم راجع الحقائق والصياغة بمرحلتين. احفظ المسار؛ المشاريع والمقالات في رابط الملف الشخصي.",
    tweets: ["Treat AI content as a production diff: verify role, stack, dates, URLs and every metric before tone. Shorter copy must preserve contribution boundaries.", "Source → platform draft → fact review → format review. Separate recommended engineering patterns from features delivered in a case study."],
    slides: [["جملة تسويقية قد تغيّر الحقيقة", "من «مطور واجهات»\nإلى ادعاء بناء المنصة كاملة."], ["الخطأ: مراجعة الأسلوب وحده", "قد يتحسن الإيقاع\nوتضيع حدود مساهمة الفريق."], ["اجعل الحقائق مصدرًا واحدًا", "الدور + التقنية + الرابط\nوالنتيجة التي يمكن إثباتها"], ["مسار مراجعة قابل للتطبيق", "source → draft → facts → format\nراجع الدور قبل اعتماد النسخة."], ["راجع المحتوى كفرق كود", "احفظ المسار. المشاريع والمقالات\nمن رابط الملف الشخصي."]]
  },
  {
    title: "نجاح الحفظ لا يعني اكتمال التسليم",
    linkedin: `العميل غيّر عنوان الخدمة وظهرت «تم الحفظ»، لكن الصفحة العامة تعرض النص القديم.

الكتابة نجحت، ومسار قراءة المحتوى يحتاج مراجعة.

اختبار التسليم الذي أوصي به:
• يعدّل مسؤول المحتوى عنوانًا من حسابه.
• يفتح الصفحة العامة بجلسة مستقلة.
• يفحص اللغة الأخرى والقراءة المخزنة.
• يكرر المسار بعد خطأ حفظ أو رفع صورة.

في Next.js، حدد أين تُخزن القراءة مؤقتًا وما الذي يعاد التحقق منه بعد التعديل. إعادة تحميل المتصفح ليست سياسة إبطال للكاش.

سلّم مصدر الإصدار، أسماء متغيرات التشغيل، مسؤول النطاق والاستضافة، وطريقة الرجوع عن تحديث فاشل إن كانت ضمن النطاق.

الدعم والإضافات لهما اتفاق. وتجربة «تعديل → ظهور عام → تعافٍ من خطأ» تستحق معيار قبول قبل إغلاق المشروع.

إذا كان فريقك يستعد لتسليم واجهة، أرسل مسار الإدارة الذي تريد التحقق منه.`,
    instagram: "«تم الحفظ» ليست نهاية التسليم. نفّذ تعديلًا، وافتح الصفحة العامة بجلسة أخرى، وافحص اللغة والكاش وخطأ الرفع. احفظ القائمة؛ لمراجعة تسليم frontend أرسل المسار من التواصل في الملف الشخصي.",
    tweets: ["اختبار تسليم: تعديل من حساب المسؤول → حفظ → فتح الصفحة العامة بجلسة مستقلة. نجاح الكتابة لا يثبت تحديث القراءة المخزنة.", "وثّق سياسة تحديث المحتوى بعد الحفظ. ثم جرّب الخطأ وإعادة المحاولة قبل إغلاق المشروع."],
    slides: [["تم الحفظ… أين التغيير؟", "نجاح لوحة الإدارة لا يثبت\nظهور المحتوى في الصفحة العامة."], ["الخطأ: فحص رسالة النجاح فقط", "الكتابة قد تنجح\nبينما تبقى قراءة قديمة في الكاش."], ["اربط الحفظ بعرض المحتوى", "mutation → invalidate → read\nحدد سياسة التحديث حسب التطبيق."], ["اختبار التسليم الفعلي", "عدّل عنوانًا وافتح الصفحة\nبجلسة أخرى وجرّب اللغة الثانية."], ["سلّم رحلة يمكن تشغيلها", "احفظ الاختبار. لمراجعة التسليم\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title: "A custom Shopify app will not fix a theme problem",
    linkedin: `A merchant asks for a better product page. The proposal says “headless.” Which requirement forced that decision?

Split the problem:
• Presentation: a Liquid section or theme block may provide the control the merchant needs.
• Operations: a custom app can connect order data to an external system through the Admin GraphQL API.
• Storefront: headless earns its complexity when the customer journey needs it; product and cart access belong to the Storefront API.

A Remix-based service can host server-side app logic. Remix alone does not make the storefront headless. Admin credentials stay on the server, never in theme JavaScript.

For order integration, explicitly scope verified webhook intake, durable work, deduplication, retry and reconciliation against current Shopify state.

A webhook is a trigger, not a complete accounting ledger. Duplicate and out-of-order events need a policy.

The right proposal names the layer, the failure path and the ongoing owner. Send the store URL and blocked workflow if you need that decision scoped.`,
    instagram: "تعديل صفحة المنتج لا يفرض Headless. افصل عرض Liquid عن عمليات Admin GraphQL وعن واجهة Storefront المستقلة. ثم راجع التكرار وإعادة المحاولة والمطابقة. احفظ المقارنة؛ دليل Shopify في المقالات من رابط الملف الشخصي.",
    tweets: ["Liquid solves theme presentation; custom apps + Admin GraphQL solve operations; Storefront API supports a headless buying experience. Choose the layer first.", "Webhooks need verified intake, durable work, deduplication, retries and reconciliation. A Remix service is not automatically a headless storefront. Guide:"],
    slides: [["واجهة مستقلة أم قسم في القالب؟", "ابدأ بطبقة المشكلة\nقبل زيادة تكلفة التشغيل."], ["الخطأ: خلط العرض بالعمليات", "تغيير صفحة المنتج يختلف\nعن ربط الطلبات بنظام خارجي."], ["اختر الطبقة المناسبة", "قالب للعرض • تطبيق للعمليات\nواجهة مستقلة لتجربة شراء خاصة"], ["مسار حدث يصلح للتشغيل", "verify → queue → dedupe → sync\nثم reconcile مع الحالة الحالية."], ["اطلب قرارًا له سبب ومالك", "احفظ المقارنة. دليل Shopify\nفي المقالات من رابط الملف الشخصي."]]
  },
  {
    title: "ماهسري: قرار التقنية يشمل المحرر",
    linkedin: `إذا احتاج فريق الخدمات مطورًا لكل صورة مشروع جديدة، راجع اختيار التقنية من زاوية التشغيل.

ماهسري للتجديدات من مشاريعي، ومبني باستخدام Wix Studio وVelo. اختيار المنصة جزء من فهم نوع الموقع ومن سيديره.

لموقع خدمات مشابه، ابدأ بمهمة المحرر: إضافة مشروع بعنوان ووصف وصور، ثم مراجعته قبل العرض العام.

في مراجعة هذا النوع من المواقع:
• هل المحتوى المتكرر منظم بنموذج واضح؟
• هل الحقول المطلوبة وحدود الصور مفهومة؟
• هل يستطيع المحرر معاينة الهاتف؟
• أين يحتاج السلوك المخصص إلى Velo، ومن سيصونه؟

الكود المخصص يرتبط بحاجة محددة. والمنصة الجاهزة تحتاج نمذجة محتوى ومراجعة وصول وتجربة نشر.

هذه أسئلة مقترحة للتقييم، وتفاصيل ماهسري في دراسة المشروع. لمناقشة موقع خدمات، أرسل المهام التي سيكررها فريقك بعد التسليم مع الصفحات المطلوبة.`,
    instagram: "ماهسري للتجديدات: Wix Studio وVelo. اسأل عن التشغيل: كيف يضيف فريقك مشروعًا بعد التسليم؟ الشرائح مسار تقييم مقترح للمحتوى والمعاينة. احفظه، ودراسة المشروع في رابط الملف الشخصي.",
    tweets: ["اختيار تقنية موقع الخدمات يشمل مهمة المحرر: إضافة مشروع، مراجعة صور، معاينة هاتف، ثم نشر. اكتب المسار قبل مقارنة الأدوات.", "ماهسري للتجديدات من مشاريعي على Wix Studio وVelo. سياق المشروع:"],
    slides: [["من يضيف المشروع القادم؟", "ماهسري للتجديدات\nWix Studio + Velo"], ["الخطأ: اختيار منصة للصورة فقط", "المظهر لا يجيب عن سؤال\nإدارة مشاريع الشهر القادم."], ["صمّم مهمة المحرر أولًا", "حقول واضحة + محتوى متكرر\nومعاينة قبل العرض العام"], ["مسار تقييم لموقع خدمات", "عنوان → صور → تحقق → معاينة\nثم نشر ومراجعة الصفحة العامة"], ["اختر تقنية يمكن إدارتها", "احفظ المسار. دراسة ماهسري\nفي البورتفوليو من رابط الملف."]]
  },
  {
    title: "أربع بوابات قبل إطلاق مشروعك",
    linkedin: `قبل اعتماد ميزانية الواجهة، مرّر المشروع عبر أربع بوابات.

1. النطاق: هل تصف مسار المستخدم وفشله؟ إذا لم تستطع، فالتقدير يضم افتراضًا غير مسمى.
2. العربية: هل اختبرت الخط والنص المختلط والنموذج على الهاتف؟ لقطة RTL لا تكفي.
3. تغييرات AI: هل يثبت PR الصلاحيات وحالات الرفض؟ البناء لا يحسم السلوك.
4. Shopify: هل المشكلة في العرض أم العمليات أم تجربة الشراء؟ Headless ليس إجابة لكل سؤال.

مثال: خدمة حجز ثنائية اللغة. اكتب قبول النموذج، اختبر العنوان العربي، راجع ملكية السجل، ثم حدد هل تحتاج تكاملًا أصلًا. لكل بوابة مخرج يراجعه شخص آخر.

الأدلة الأربعة في البورتفوليو تجمع القوالب والكود وحدود القرار. ابدأ بالبوابة التي لا تملك لها دليلًا.

إذا كنت مؤسسًا أو تدير وكالة، أرسل رابط المشروع وأكبر نقطة غموض لنناقش نطاق مراجعة أو تنفيذ.`,
    instagram: "أربع بوابات: النطاق، العربية، مراجعة AI، وطبقة Shopify. لكل بوابة دليل يمكن مراجعته. احفظ الخريطة وافتح الأدلة الأربعة من رابط المقالات في الملف الشخصي.",
    tweets: ["أربع بوابات للمشروع: نطاق له فشل، عربية مجرّبة، PR يثبت الصلاحيات، وقرار Shopify يحدد الطبقة. ما البوابة التي تفتقد دليلها؟", "قوالب brief وRTL ومراجعة AI وShopify في مكتبة المقالات. ابدأ بقرار يحتاج وضوحًا:"],
    slides: [["هل مشروعك جاهز للقرار؟", "أربع بوابات تكشف\nما زال مبنيًا على افتراض."], ["الخطأ: جمع وعود عامة", "«سريع وآمن واحترافي»\nلا يحدد ما سنختبره."], ["اجعل لكل بوابة دليلًا", "نطاق • عربية • مراجعة AI\nوقرار طبقة Shopify"], ["مثال لمراجعة عملية", "حجز → فشل → إعادة محاولة\nمع RTL وصلاحيات واضحة"], ["ابدأ بالبوابة الأضعف", "احفظ الخريطة. الأدلة الأربعة\nمن رابط المقالات في الملف الشخصي."]]
  },
  {
    title: "Bring the bottleneck. We can scope the build.",
    linkedin: `Your next frontend hire should understand the operation behind the screen.

For a React/Next.js interface, bilingual service site, or Shopify integration, bring the bottleneck to the first conversation.

Useful starting points:
• “Our Arabic booking flow breaks after a failed request.”
• “The agency has designs, but the API contract is unclear.”
• “Orders must reach another system without duplicates.”

Send the URL, user task, connected systems, and the constraint that matters most: launch date, editing workflow, or integration ownership. Include available designs and content.

That context helps us discuss a focused audit, frontend implementation, or scoped custom integration. The proposal should expose assumptions, acceptance checks and dependencies before an estimate becomes a commitment.

Project pages show the contribution behind previous work. Support and additions are scoped for each project.

Founders and agency directors can share the bottleneck through the contact page.`,
    instagram: "تحتاج Next.js أو React أو واجهة بلغتين أو تكامل Shopify؟ أرسل العائق والرابط والرحلة والأنظمة، ثم التصميم والمحتوى والموعد. احفظ نموذج البداية؛ المشاريع والتواصل من رابط الملف الشخصي.",
    tweets: ["Planning React/Next.js, bilingual UI or Shopify integration? Send the URL, task, systems and the constraint that matters most. Start with the bottleneck.", "A scoped build needs assumptions, acceptance checks and dependency owners. Founders and agencies can share the project brief here:"],
    slides: [["ما العائق أمام الإصدار القادم؟", "React / Next.js\nواجهات عربية وتكاملات Shopify"], ["الخطأ: طلب قائمة تقنيات فقط", "اسم الإطار لا يحدد\nالعملية التي يجب إصلاحها."], ["ابدأ من مسار المستخدم", "المهمة + الأنظمة + القيود\nومالك كل اعتماد"], ["نموذج رسالة البداية", "الرابط → العائق → المطلوب\nثم التصميم والمحتوى والموعد"], ["أرسل وصف المشروع", "احفظ القالب. المشاريع والتواصل\nمن رابط الملف الشخصي."]]
  }
] satisfies { title: string; linkedin: string; instagram: string; tweets: string[]; slides: [string, string][] }[]

export const elevatedMicroPosts = [
  "قبل تسعير التكامل: ماذا إذا حُفظ الطلب وانقطع الرد؟ إذا أنشأت الإعادة سجلًا آخر، فالنطاق يحتاج قرارًا لمنع التكرار. اسم الإطار لا يحسم ذلك.",
  "«API جاهز»؟ اطلب استجابة ومسار مصادقة وخطأ قابلًا للتجربة. اكتب مالك الاعتماد وموعد الوصول بجانب التقدير، قبل أن يتحول الغموض إلى تأخير.",
  "اختبر العنوان العربي قبل تحميل الخط وبعده. تغيّر الالتفاف قد يحرك زر التواصل. سجل تحميلًا باردًا وشبكة مقيدة قبل تعديل المسافات.",
  "الخطأ لا يُغلق بلقطة نجاح. أعد الفشل، تحقق من حفظ الحقول وإتاحة الإعادة، ثم تأكد أن الطلب لم يُسجل مرتين. التقرير الجيد يحدد فحص الإغلاق.",
  "في تعديل AI يمس البيانات، اختبر مستخدمًا لا يملك السجل. نجاح تعديل المالك لا يثبت الصلاحيات. اقرأ شرط الملكية في الفرق ثم جرّب الرفض.",
  "في دراسة مشروع مولدة بالذكاء الاصطناعي، راجع الدور والتقنية قبل الأسلوب. «شارك في تطوير الواجهة» لا تتحول أثناء الاختصار إلى «بنى المنصة كاملة».",
  "عند تسليم لوحة إدارة، عدّل عنوانًا وافتح الصفحة العامة بجلسة مستقلة. نجاح الحفظ لا يثبت تحديث الكاش. وثّق سياسة ظهور المحتوى بعد التعديل.",
  "وصول webhook لا يضمن اكتمال المزامنة. صمّم منع التكرار والإعادة والمطابقة مع المصدر المعتمد. ترتيب وصول الأحداث ليس مصدر حقيقة الطلب."
]
