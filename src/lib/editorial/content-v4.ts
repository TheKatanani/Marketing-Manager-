/** Engineering examples are illustrative; project attribution is limited to verified work. */
export const elevatedCopy = [
  {
    title:"حفظ ناجح ورد ضائع: من يمنع الطلب المكرر؟",
    linkedin:`حُفظ طلب العميل. انقطع الاتصال قبل وصول التأكيد. ضغط «إرسال» مرة أخرى.

هل ينشأ طلب ثانٍ؟ هذه إجابة يجب أن تظهر في نطاق المشروع، قبل السعر الثابت.

عبارة «نموذج مربوط مع CRM» لا تحدد من يملك السجل، ومتى نؤكد النجاح، ومن يعيد العملية إذا تعطل الطرف الآخر.

أحوّلها إلى عقد تشغيل صغير:
• قاعدة الطلبات هي المصدر المعتمد للاستلام.
• العملية نفسها تحمل مفتاحًا ثابتًا عند الإعادة، مع قيد فريد ومعالجة ذرية على الخادم.
• حفظ الطلب وإضافة عمل المزامنة لا ينفصلان بلا ضمان؛ استخدم inbox أو outbox مناسبًا.
• تعطل CRM يظهر «بانتظار المزامنة»، لا نجاحًا مضللًا ولا طلبًا ضائعًا.

اختبار القبول: أعد العملية نفسها، ثم حاكِ انقطاع الرد بعد الحفظ. النتيجة المطلوبة سجل واحد، وحالة يمكن لفريق العمليات متابعتها.

تعطيل الزر يمنع نقرة إضافية في الواجهة؛ لا يثبت منع تكرار الكتابة على الخادم.

للمؤسس ومدير الوكالة: ضعوا المصدر المعتمد، وسياسة الإعادة، ومالك الفشل بجانب كل تكامل في العرض. الدليل يضم قالب النطاق واختباراته.`,
    instagram:"حُفظ الطلب، وضاع الرد، فأعاد العميل الإرسال. هل تنشئ سجلًا ثانيًا؟ احفظ الشرائح لتحديد مفتاح العملية والمصدر المعتمد وحالة الفشل قبل تسعير التكامل. قالب النطاق واختبارات القبول في المقال من رابط الملف الشخصي.",
    tweets:["حُفظ الطلب وضاع الرد، فأعاد العميل الإرسال. مفتاح عملية ثابت + قيد فريد + كتابة ذرية على الخادم: هذا قرار نطاق، وليس مجرد زر disabled.","قبل تسعير ربط CRM، حدد: مصدر الطلب، لحظة التأكيد، سياسة الإعادة، ومالك الفشل. قالب النطاق والقبول:"],
    slides:[["نجح الحفظ. ضاع الرد. والآن؟","هل تعيد المحاولة بأمان؟\nأم تنشئ طلبًا ثانيًا؟"],["الخطأ: اعتبار الزر حماية للبيانات","تعطيل الزر يساعد الواجهة.\nمنع التكرار مسؤولية الخادم أيضًا."],["ثبّت هوية العملية وحدودها","مفتاح ثابت + قيد فريد\nوحفظ موثوق قبل تأكيد الاستلام"],["اختبر انقطاع الرد بعد الحفظ","أعد العملية بالمفتاح نفسه.\nالمطلوب: سجل واحد وحالة واضحة."],["أدخل الفشل في نطاق العمل","احفظ الاختبار. القالب والتفاصيل\nفي المقال من رابط الملف الشخصي."]]
  },
  {
    title:"Figma cannot price an unknown API.",
    linkedin:`The design is approved. The API returns a clean demo response. The estimate is still exposed.

Before committing an agency's delivery date, inspect one real contract:
• Can the intended user access this record, not just sign in?
• How are pages, missing fields and validation errors represented?
• What happens when the upload is rejected or a request times out?
• Which team owns a breaking response change?

“The API is ready” becomes useful only when someone can reproduce that journey with test access.

My proposal would name a dependency owner, a representative payload, an acceptance check and an explicit assumption for anything unresolved.

For an upload, acceptance is concrete: allowed input succeeds; a rejected file has a useful explanation; failure preserves context; retry is possible. Add server-side duplicate protection if the operation requires it.

If access is unavailable, scope discovery or mark the integration estimate provisional. A hidden dependency cannot be managed by a polished mockup.

Bring the endpoint contract and the user task to the first frontend discussion. We can turn uncertainty into a decision the client can actually review.`,
    instagram:"التصميم المعتمد لا يكشف صلاحيات API أو شكل الأخطاء أو حدود رفع الملفات. قبل تثبيت الموعد، جرّب مسارًا بحساب مناسب وحدّد مالك كل اعتماد. احفظ قالب الشرائح، وأرسل عقد البيانات مع طلب المشروع عبر التواصل في الملف الشخصي.",
    tweets:["An approved design does not define API permissions, pagination or recovery. Before fixing the delivery date, verify one real journey with test access and a dependency owner.","Upload acceptance: valid file succeeds; invalid file explains why; failure preserves context; retry is available. Unknown API contract? Scope discovery before commitment."],
    slides:[["التصميم جاهز. هل التقدير جاهز؟","قد تخفي الواجهة الجميلة\nاعتمادًا لم يُختبر بعد."],["الخطأ: اعتماد استجابة تجريبية","نجاح العرض لا يثبت الصلاحيات\nأو شكل الخطأ أو حدود الملفات."],["حوّل الاعتماد إلى عقد","طلب + استجابة + أخطاء + وصول\nثم مالك الاعتماد وموعد إتاحته"],["اختبار قبول لرفع ملف","ملف صحيح ينجح؛ المرفوض مفهوم.\nبعد الفشل يمكن التصحيح والإعادة."],["سعّر ما تستطيع التحقق منه","احفظ القالب. أرسل عقد البيانات\nمن صفحة التواصل في الملف الشخصي."]]
  },
  {
    title:"Coach Space: failure is not an empty classroom.",
    linkedin:`“No courses available” is the wrong message when the request never loaded.

On Coach Space, my role was Team Leader and Frontend Developer. I built the web frontend and integrated it with the shared Django/DRF API.

For a team reviewing a similar learning platform, I would make the interface contract explicit:
• Loading means a request is in flight; reserve the content area.
• Empty means a successful response contains no relevant courses.
• Denied means the current access is insufficient; show the appropriate next step.
• Failed means the data could not be retrieved; preserve context and offer recovery.

Now test a less comfortable journey: open a course link directly, let access expire, change locale, then retry a failed request.

Decide which route, filters and user input survive each transition. Cancel or ignore obsolete requests so an older response cannot overwrite the current selection.

These are review criteria for comparable interfaces. The project page records my verified contribution: team leadership and web frontend integration.

For an agency, that state contract is reviewable work. A screenshot of the successful dashboard is only the start.`,
    instagram:"في Coach Space كان دوري قيادة الفريق وتطوير واجهة الويب وربطها بواجهة Django/DRF المشتركة. ولتقييم منصة تعليمية مشابهة: افصل الفراغ عن الفشل، وجرّب انتهاء الوصول والرابط المباشر والإعادة. احفظ القائمة؛ تفاصيل المشروع في رابط الملف الشخصي.",
    tweets:["Coach Space: Team Leader and Frontend Developer. I built the web frontend and integrated it with the shared Django/DRF API. A failed request is not an empty course list.","Review a learning UI through a deep link, expired access and a failed-request retry. Specify which context survives, and prevent obsolete responses from winning. Project context:"],
    slides:[["فشل التحميل لا يعني قاعة فارغة","رسالة «لا توجد دورات»\nتحتاج استجابة ناجحة أولًا."],["الخطأ: إخفاء الفشل داخل الفراغ","قد يظن المستخدم أن المحتوى انتهى\nبينما الطلب لم يكتمل أصلًا."],["اجعل لكل حالة قرارًا","تحميل • فراغ • رفض وصول • فشل\nوسياق محفوظ عند إعادة المحاولة"],["جرّب رحلة أصعب من العرض","رابط مباشر ثم وصول منتهٍ.\nصحّح الوصول وأعد الطلب."],["راجع الحالة وحدود المساهمة","واجهة ويب مع Django/DRF مشترك.\nدوري والمشروع في رابط الملف الشخصي."]]
  },
  {
    title:"الواجهة العربية لا تُقبل بلقطة شاشة",
    linkedin:`العنوان العربي جميل. يصل الخط متأخرًا، يلتف النص، ويتحرك زر الطلب تحت إصبع المستخدم.

لقطة الشاشة لم تفشل. اختبار القبول كان ناقصًا.

قبل اعتماد واجهة عربية، أريد دليلًا من رحلة فعلية:
1. تحميل بارد وشبكة مقيدة، مع تحديد العنصر الذي تحرّك ووقت وصول الخط.
2. عنوان عربي أطول من المعتاد، على شاشة ضيقة ومع تكبير النص.
3. بريد ومعرّف طلب لاتيني داخل السياق العربي.
4. نموذج مرفوض يمكن تصحيحه بلوحة المفاتيح.

في الكود: نظّم الخط عبر next/font، وافحص مقاييس البديل والحروف والأوزان المطلوبة. استخدم padding-inline للاتجاهين، واعزل المعرّف داخل bdi. لا تقلب الأرقام أو ترتيب DOM لتصحيح لقطة واحدة.

ولا تنسب كل CLS للخط: صورة بلا مساحة محجوزة أو عنصر يُدرج لاحقًا قد يسبب الحركة أيضًا. اربط الإصلاح بتسجيل يوضح السبب.

القبول الحقيقي: يعثر المستخدم على الخدمة ويرسل الطلب ويتعافى من الخطأ بالعربية. الدليل يحوّل هذه الرحلة إلى قائمة وكود يمكن مراجعتهما.`,
    instagram:"لقطة RTL مرتبة لا تكشف خطًا متأخرًا أو رقم طلب ملتبسًا أو خطأ نموذج بلا تركيز واضح. اختبر رحلة كاملة تحت تحميل بارد، ثم صحّح السبب الذي تقيسه. احفظ الشرائح، وأمثلة الخط والاتجاه في المقال من رابط الملف الشخصي.",
    tweets:["قبول الواجهة العربية يحتاج تحميلًا باردًا، عنوانًا طويلًا، نصًا مختلطًا، ونموذجًا مرفوضًا يمكن تصحيحه بالكيبورد. لقطة RTL لا تثبت الرحلة.","تحرك زر الطلب؟ سجّل العنصر وتوقيت الخط والصورة قبل تغيير المسافات. next/font وbdi وCSS المنطقي أدوات ضمن المراجعة. الدليل:"],
    slides:[["العربية جميلة… حتى يصل الخط","التفاف جديد قد يحرّك الزر\nأثناء محاولة المستخدم الضغط."],["الخطأ: إصلاح الحركة بارتفاع ثابت","قد تختفي الحركة هنا\nويُقص العنوان الأطول هناك."],["ابحث عن السبب ثم اختبر الرحلة","الخط والبديل + مساحة الصور\nوعزل النص المختلط والتركيز"],["فحص صغير يكشف الفرق","تحميل بارد ثم عنوان طويل.\nافتح النموذج وصحّح حقلًا مرفوضًا."],["اعتمد رحلة تعمل بالعربية","احفظ الفحص. الكود والقائمة\nفي المقال من رابط الملف الشخصي."]]
  },
  {
    title:"Your “Saved” state needs server evidence.",
    linkedin:`A green button can appear before the database accepts the change. Design what happens when the server says no.

For a reversible Next.js update, the responsibilities are different:
• The client proposes a temporary value and shows pending state.
• The Server Action authenticates, validates and authorizes the specific record at the write boundary.
• The result confirms the change or returns the interface to server-confirmed state with a useful recovery path.

An ownership check belongs in the mutation condition, not only in the button's visibility. An optimistic hook does not make the operation authorized or idempotent.

Test slow success, rejected input, a non-owner request and a retry after an uncertain response. If another edit can arrive in between, define a conflict policy rather than restoring an arbitrary old snapshot.

Payments and irreversible operations may deserve explicit pending confirmation. Instant feedback is only useful when it tells the truth about the operation.

For a founder reviewing delivery: ask the engineer to demonstrate the rejected update as well as the successful one. That is a stronger acceptance check than a fast-feeling demo.`,
    instagram:"الحالة المتفائلة اقتراح مؤقت. الخادم ما زال مسؤولًا عن الصلاحيات والتحقق والكتابة، والواجهة تحتاج انتظارًا وتعافيًا من الرفض. احفظ الشرائح واطلب عرض الحالة المرفوضة ضمن التسليم. لمراجعة Next.js، التواصل من الملف الشخصي.",
    tweets:["A “Saved” button needs server evidence. Put record ownership in the mutation condition, expose pending state, and reconcile optimistic UI with confirmed data.","Acceptance for optimistic updates: slow success, invalid input, non-owner request and uncertain-response retry. Define conflicts before restoring an old client snapshot."],
    slides:[["هل حُفظ التعديل أم تغيّر اللون؟","النجاح في الواجهة\nلا يثبت قبول الكتابة على الخادم."],["الخطأ: صلاحية مخفية داخل زر","إخفاء الإجراء عن المستخدم\nلا يمنع استدعاء الطلب مباشرة."],["اربط الحالة بحدود الكتابة","انتظار واضح + تحقق خادمي\nثم تأكيد أو تعافٍ من الرفض"],["اختبر من لا يملك السجل","مرّر معرّف مسودة لمستخدم آخر.\nالمطلوب: رفض دون تغيير البيانات."],["اطلب دليل النجاح والرفض","احفظ القائمة. لمراجعة الواجهة\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title:"زر اللغة يجب أن يحفظ رحلة الخدمة",
    linkedin:`فتح الزائر صفحة خدمة، وقرر التواصل بشأنها. بدّل اللغة، فعاد إلى الصفحة الرئيسية.

هذا فقدان للسياق، حتى لو كانت كل ترجمة صحيحة.

منصة د. مروان العزاوي للطيران والاستشارات من مشاريعي بواجهة عربية وإنجليزية. ولتقييم موقع خدمات مشابه، ابدأ من معرّف الخدمة قبل عنوانها المترجم.

اجعل للخدمة هوية ثابتة تربط مسار كل لغة. ثم اختبر:
• رابطًا عميقًا لخدمة محددة، لا الرئيسية فقط.
• تبديل اللغة مع بقاء الخدمة المقصودة.
• عنوانًا طويلًا ونموذج تواصل على الهاتف.
• رسالة رفض مرتبطة بالحقل، وتصحيحًا بلوحة المفاتيح.

قرر أيضًا مصير المدخلات عند التبديل. إعادة نموذج مكتمل إلى الفراغ قرار منتج، وليست تفصيل CSS يكتشفه العميل بعد التسليم.

هذه معايير مراجعة مقترحة، ودراسة المشروع توضح سياقه الفعلي. أرسل رابط الخدمة والمسار الذي ينقطع إذا كنت تحتاج مراجعة frontend محددة النتائج.`,
    instagram:"الترجمة الصحيحة لا تعوّض رحلة فقدت سياقها. ابدأ من خدمة محددة، بدّل اللغة، ثم أكمل التواصل وصحّح خطأً. منصة د. مروان مثال من البورتفوليو؛ احفظ الفحص وراجع المشروع من رابط الملف الشخصي.",
    tweets:["زر اللغة الذي يعيد زائر الخدمة إلى الرئيسية يفقده السياق. اربط المسارات بمعرّف خدمة ثابت، وقرر ما يحدث لمدخلات النموذج عند التبديل.","راجع رابط خدمة عميقًا، تبديل اللغة، عنوانًا طويلًا وخطأ نموذج على الهاتف. منصة د. مروان العزاوي مثال من البورتفوليو. سياق المشروع:"],
    slides:[["بدّل اللغة… فضاعت الخدمة؟","ترجمة صحيحة\nلكن سياق التواصل اختفى."],["الخطأ: ربط الزر برئيسية اللغة","المستخدم يريد الخدمة نفسها.\nإعادته للبداية قرار له كلفة."],["اربط المسار بهوية الخدمة","معرّف ثابت ومسار لكل لغة\nوسياسة واضحة لمدخلات النموذج"],["اختبار قبول من رابط عميق","افتح الخدمة، بدّل اللغة، تواصل.\nثم صحّح حقلًا باستخدام الكيبورد."],["اجعل اللغتين رحلة واحدة","احفظ الاختبار. سياق المشروع\nفي البورتفوليو من رابط الملف الشخصي."]]
  },
  {
    title:"A green AI PR can hide a permission bug.",
    linkedin:`The AI change builds. The owner can edit the draft. One missing test can still expose someone else's data.

Before asking for the diff, write the boundary:
“A may update A's draft. B may not update it. Rejected input changes nothing.”

Now review where the write happens. Does the mutation bind the record to the authenticated owner? Or does it trust a client-supplied ID after checking only that someone signed in?

My review order is authorization, validation, retry behavior, dependencies, then presentation. Ask for evidence attached to each acceptance condition.

For this example, execute the request as a non-owner and inspect stored data afterward. A hidden button and a successful build cannot demonstrate that boundary.

Keep AI context bounded: installed versions, relevant files, sample data and explicit invariants. If the diff expands into unrelated reconstruction, make the extra decision visible before accepting it.

Agency directors need a change another engineer can reproduce and maintain. The article includes a mutation pattern, a failure matrix and a PR template built around that evidence.`,
    instagram:"أهم حالة في تعديل AI قد تكون الطلب الذي يجب رفضه. اكتب حدود الملكية، واقرأ شرط الكتابة، ثم جرّب مستخدمًا آخر وافحص البيانات. احفظ الشرائح؛ مثال التعديل ومصفوفة الفشل في المقال من رابط الملف الشخصي.",
    tweets:["An AI change can build and still trust a client-supplied record ID. Bind the write to the authenticated owner, then test the non-owner request and inspect stored data.","Acceptance before prompting: allowed actor, rejected actor, valid input, unchanged data on failure. Review the denied branch before approving the diff. Worked example:"],
    slides:[["نجح البناء. هل صمدت الصلاحيات؟","تعديل AI قد يصلح النجاح\nويكسر الطلب الذي يجب رفضه."],["الخطأ: التحقق من تسجيل الدخول فقط","المستخدم مسجّل،\nلكن هل يملك هذا السجل؟"],["ضع الملكية داخل شرط الكتابة","المعرّف + المالك + حالة السجل\nتُراجع عند تنفيذ التعديل."],["افحص الرفض والبيانات معًا","owner=A, actor=B → denied\nثم تأكد أن storedData لم تتغير."],["اعتمد دليلًا يستطيع زميلك إعادته","احفظ التسلسل. المثال وقالب المراجعة\nفي المقال من رابط الملف الشخصي."]]
  },
  {
    title:"زر عالق أم انتقال حالة مكسور؟",
    linkedin:`«الزر لا يعمل» وصف لا يحدد أي طبقة سنصلح.

لنحوّله إلى تقرير قابل للحكم: الطلب فشل، لكن الواجهة بقيت pending، والبيانات اختفت من الحقول.

في بيئة الاختبار، ثبّت التسلسل:
1. افتح النموذج بمدخلات صالحة.
2. حاكِ فشل الاستجابة بعد الإرسال.
3. راقب رسالة الخطأ والحقول وحالة الزر.
4. صحّح السبب وأعد المحاولة.

القبول: يعود الإجراء متاحًا، تبقى المدخلات المفيدة، ويعرف المستخدم ما يستطيع فعله الآن.

ثم افصل سؤالًا آخر: هل حُفظت العملية على الخادم قبل فقدان الرد؟ إلغاء الطلب من المتصفح لا يثبت التراجع عن كتابة حدثت بالفعل.

لهذا يحتاج تقرير المشكلة إلى الخطوات والمتوقع والحالي والبيئة، وقد يحتاج معرّف عملية منقحًا لمراجعة السجل. الصورة وحدها لا تميز فشل الواجهة من نتيجة خادمية غير مؤكدة.

مع المطور أو AI، اطلب إصلاح انتقال محدد وإعادة اختباره. «انتهينا» يجب أن ترتبط بدليل، لا بلون الزر.`,
    instagram:"الزر عالق بعد خطأ؟ صف الانتقال: إرسال، فشل، حفظ حقول، ثم إعادة محاولة. وافصل حالة الواجهة عن سؤال: هل حُفظ الطلب أصلًا؟ احفظ قالب الشرائح؛ لمراجعة خلل قابل للإعادة، التواصل من رابط الملف الشخصي.",
    tweets:["تقرير bug مفيد: فشل الطلب، بقي pending، واختفت الحقول. المتوقع: رسالة قابلة للفهم ومدخلات محفوظة وإعادة متاحة. صف انتقال الحالة الذي انكسر.","إلغاء fetch من المتصفح لا يثبت إلغاء كتابة الخادم. بعد فقدان الرد، راجع معرّف العملية وحالتها قبل السماح بإعادة قد تكرر الطلب."],
    slides:[["الزر عالق. أين انكسر المسار؟","قد تتعطل حالة الواجهة\nبينما نتيجة الخادم غير مؤكدة."],["الخطأ: تخمين السبب من صورة","الصورة لا تثبت هل الطلب فشل\nأم حُفظ وضاع الرد."],["افصل الحالة عن نتيجة العملية","حالة واجهة قابلة للتعافي\nومعرّف عملية يوضح نتيجة الخادم"],["اكتب فحص الإغلاق","فشل → حفظ الحقول → إعادة متاحة\nثم نجاح دون عملية مكررة."],["أغلق الخلل بدليل قابل للإعادة","احفظ القالب. لمراجعة الواجهة\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title:"An AI rewrite can corrupt your case study.",
    linkedin:`“Integrated the frontend with a shared API” becomes “built the platform end to end.” The sentence sounds stronger and the case study becomes less accurate.

Treat a technical campaign as a controlled transformation of source facts:
• Role and contribution boundary.
• Actual stack and project URL.
• Verified outcomes with their evidence.
• Recommendations that must remain separate from delivered features.

Then review facts before style. A platform adaptation may change the opening and reading order; it cannot promote a suggestion into a project result.

Concrete boundaries from my portfolio: Coach Space was team leadership and web frontend work integrated with a shared Django/DRF API. Mahseri was built with Wix Studio and Velo.

LinkedIn can explain the trade-off. X can isolate one failure mode. Instagram can walk through a test. Each version should provide a complete useful point while preserving those facts.

For an agency publishing technical work, assign a fact reviewer as deliberately as a code reviewer. A confident rewrite is still a proposed change to the record.`,
    instagram:"قوة دراسة المشروع تأتي من قرار تقني واضح، لا من تكبير الدور. ثبّت الدور والتقنية والدليل، ثم راجع كل تحويل للمنصة. احفظ مسار الشرائح؛ سياق المشاريع والأدلة في رابط الملف الشخصي.",
    tweets:["An AI rewrite can turn “integrated a frontend” into “built the platform end to end.” Lock role, stack, evidence and contribution boundaries before polishing the hook.","Source facts → useful platform version → fact review → format review. Keep recommended patterns separate from features actually delivered to a client."],
    slides:[["جملة أقوى قد تفسد دراسة المشروع","إذا كبّرت الدور\nأو حوّلت اقتراحًا إلى نتيجة."],["الخطأ: اعتماد النبرة قبل الدليل","العبارة الواثقة\nقد تحمل مساهمة لم تحدث."],["ثبّت سجل الحقائق أولًا","دور + تقنية + رابط + دليل\nوتوصيات منفصلة عن التنفيذ"],["راجع التحويل كمعلومة","«ربط الواجهة» تبقى ربط واجهة.\nلا تتحول إلى «بناء المنصة كاملة»."],["اكتب قرارًا هندسيًا يمكن إثباته","احفظ المسار. المشاريع والأدلة\nمن رابط الملف الشخصي."]]
  },
  {
    title:"رسالة الحفظ لا تُغلق اختبار التسليم",
    linkedin:`حُفظ عنوان الخدمة بنجاح. افتح الصفحة العامة بجلسة أخرى: هل ظهر العنوان الجديد؟

إذا بقي القديم، فالمشكلة في مسار القراءة أو التخزين المؤقت. رسالة نجاح الكتابة لم تختبرهما.

في تسليم واجهة Next.js، وثّق سلسلة واضحة:
• من يستطيع التعديل؟ وما التحقق الذي يجري على الخادم؟
• أين تُخزن القراءة مؤقتًا: بيانات، مسار، أم طبقة خارجية؟
• أي إبطال أو إعادة تحقق يتبع الكتابة؟
• متى يرى المحرر تأكيدًا على النسخة العامة؟

في Next.js 16، updateTag مخصص داخل Server Actions لحالات قراءة التعديل فورًا؛ لا يعوّض تحديد موضع الكاش أو سياسة تحديثه في تطبيقك.

اختبار القبول: تعديل بحساب المسؤول، قراءة عامة مستقلة، اللغة الأخرى، ثم فشل حفظ وتصحيح وإعادة. اختبر أيضًا أن مستخدمًا غير مسموح لا يغيّر المحتوى.

سلّم مسؤول التشغيل وطريقة الرجوع عن تحديث فاشل ضمن النطاق المتفق عليه. وإذا احتاج العميل تحديثًا يوميًا، فاجعل تجربة المحرر نفسها جزءًا من القبول.

أرسل مسار الإدارة والصفحة العامة إذا كنت تريد مراجعة تسليم تكشف الفجوة بين «حُفظ» و«ظهر».`,
    instagram:"الحفظ يختبر الكتابة؛ افتح الصفحة العامة لتختبر القراءة. حدّد طبقة الكاش وسياسة تحديثها، ثم نفّذ تعديلًا بجلسة وقراءة بجلسة مستقلة. احفظ قائمة التسليم؛ أرسل المسار من صفحة التواصل في الملف الشخصي.",
    tweets:["«تم الحفظ» لا يثبت ظهور المحتوى الجديد. اختبر كتابة بحساب المسؤول وقراءة عامة بجلسة أخرى، وحدد طبقة الكاش وسياسة تحديثها.","في Next.js 16، updateTag متاح داخل Server Actions لقراءة التعديل فورًا. ما زلت تحتاج خطة للبيانات المخزنة والمسار العام والتعافي من فشل الحفظ."],
    slides:[["حُفظ العنوان. لماذا بقي القديم؟","نجاح الكتابة\nلا يثبت تحديث القراءة العامة."],["الخطأ: إغلاق القبول برسالة نجاح","قد يبقى محتوى قديم\nفي بيانات أو مسار مخزّن."],["سمِّ طبقة الكاش وسياسة تحديثها","تعديل موثّق → تحديث القراءة\nثم تأكيد الحالة التي يراها الزائر"],["جرّب جلستين مختلفتين","عدّل بحساب المسؤول.\nافتح الصفحة العامة بجلسة مستقلة."],["سلّم رحلة إدارة تعمل فعلًا","احفظ الفحص. لمراجعة التسليم\nالتواصل من رابط الملف الشخصي."]]
  },
  {
    title:"A Shopify rebuild needs a failure model.",
    linkedin:`The merchant needs a product-page change. The proposal jumps to headless. First identify which layer is actually failing.

Presentation: a Liquid section may give the merchant the required control.
Operations: a custom app may connect orders to another system through Admin GraphQL.
Buying experience: an independent storefront uses Storefront API for customer-facing product and cart flows.

These are separate decisions. A Remix service does not make the storefront headless, and Admin credentials never belong in theme JavaScript.

For an order integration, I want an operating plan beside the feature list:
1. Verify the raw webhook request.
2. Persist durable work before acknowledging receipt.
3. Define deduplication and retry boundaries.
4. Apply writes safely after an uncertain response.
5. Reconcile against current authoritative state.

Otherwise, a worker can save “seen this event,” crash before queuing the job, and lose the update it meant to protect.

Ask the proposal to demonstrate a duplicate event, a destination outage and a repaired missed update. The article provides the layer comparison and inbox pattern to scope that discussion.`,
    instagram:"قبل Headless، حدّد الطبقة: عرض في القالب، عملية خادمية، أم تجربة شراء مستقلة؟ وللتكامل، افحص الحفظ الدائم والتكرار والإعادة والمطابقة. احفظ المقارنة؛ دليل Shopify الكامل في المقالات من رابط الملف الشخصي.",
    tweets:["Before a Shopify rebuild, identify the layer: Liquid presentation, Admin GraphQL operations, or Storefront buying experience. Each adds different maintenance obligations.","Webhook deduplication can lose work if “seen” is saved before a separate queue publish fails. Scope durable intake, safe writes and reconciliation. Guide:"],
    slides:[["ما الذي يفشل في المتجر فعلًا؟","صفحة منتج؟ عملية طلب؟\nأم تجربة شراء مستقلة؟"],["الخطأ: معمارية أكبر من المشكلة","قسم قالب لا يبرر وحده\nتكلفة تشغيل واجهة مستقلة."],["افصل طبقات قرار Shopify","عرض في القالب + عمليات خادمية\nوتجربة شراء لها متطلبات مختلفة"],["اختبر فقدان العمل بعد الاستلام","حفظ دائم → معالجة قابلة للإعادة\nثم مطابقة مع الحالة الحالية."],["اطلب خطة تشغيل بجانب الميزة","احفظ المقارنة. دليل القرار\nفي المقالات من رابط الملف الشخصي."]]
  },
  {
    title:"ماهسري: من سينشر المشروع القادم؟",
    linkedin:`موقع الخدمات لا ينتهي عند تسليم الصفحة. يبدأ بعده شخص يريد إضافة مشروع جديد وصوره دون كسر العرض.

ماهسري للتجديدات من مشاريعي المبنية باستخدام Wix Studio وVelo. والسؤال العملي الذي أستخدمه لتقييم موقع مشابه: هل يستطيع المحرر إنجاز مهمته بأمان؟

اكتب نموذج المحتوى قبل تأثيرات الواجهة: عنوان، نوع مشروع، صور، ترتيب، وحالة نشر. ثم حدد ما هو مطلوب، ومن يستطيع التعديل، وكيف تُراجع النتيجة على الهاتف.

إذا احتجت Velo لسلوك مخصص، اربطه بقاعدة عمل واضحة. لا تجعل إخفاء زر في الواجهة بديلًا عن صلاحيات الوصول إلى البيانات.

اختبار القبول المقترح: يضيف مسؤول المحتوى مشروعًا، يجرّب حقلًا ناقصًا وصورة غير مناسبة، يصحح المدخلات، يعاين الهاتف، ثم يراجع الصفحة العامة.

هذه معايير تقييم مقترحة؛ دراسة ماهسري تعرض سياق المشروع نفسه. اختيار المنصة يستحق أن يتبع تجربة المحرر وتكلفة التشغيل، لا صورة العرض فقط.

أرسل المهام التي سيكررها فريقك بعد التسليم عند مناقشة موقع خدمات.`,
    instagram:"ماهسري للتجديدات مبني باستخدام Wix Studio وVelo. لموقع مشابه، اختبر مهمة المحرر من الحقول والصور إلى المعاينة والصفحة العامة. احفظ الفحص؛ تفاصيل ماهسري في رابط المشاريع بالملف الشخصي.",
    tweets:["اختبار موقع الخدمات يشمل المحرر: إضافة مشروع، مدخل مرفوض، تصحيح، معاينة هاتف، ثم ظهور عام. إخفاء زر لا يحل صلاحيات البيانات.","ماهسري للتجديدات من مشاريعي المبنية باستخدام Wix Studio وVelo. المنصة تُراجع مع مهمة المحرر وتكلفة التشغيل. سياق المشروع:"],
    slides:[["من سينشر المشروع القادم؟","في موقع خدمات،\nتجربة المحرر جزء من التسليم."],["الخطأ: اختيار المنصة للصورة","العرض الجميل لا يختبر\nالحقول والصور والوصول والنشر."],["نمذج المهمة قبل السلوك المخصص","عنوان + صور + ترتيب + حالة\nوصلاحيات مرتبطة بالبيانات"],["اختبار قبول لموقع خدمات","أضف مشروعًا ثم ارفض مدخلًا.\nصحّح، عاين الهاتف، وافتح العام."],["اختر تشغيلًا يفهمه الفريق","ماهسري: Wix Studio وVelo.\nدراسة المشروع في رابط الملف الشخصي."]]
  },
  {
    title:"أي دليل ينقص مشروعك قبل الإطلاق؟",
    linkedin:`أربع إجابات تكشف ما إذا كان الإصدار قابلًا للتسليم، أو ما زال قائمًا على افتراضات.

النطاق: ماذا يحدث إذا نجحت الكتابة وضاع الرد؟ اعرض نتيجة إعادة العملية نفسها.

العربية: ماذا يحدث عند تأخر الخط وازدياد طول العنوان؟ اعرض رحلة النموذج على الهاتف، مع الرفض والتصحيح.

مراجعة AI: ماذا يحدث حين يرسل مستخدم معرّف سجل لا يملكه؟ اعرض الرفض وتأكد من بقاء البيانات كما هي.

Shopify: ماذا يحدث حين يتعطل النظام المستقبِل أو يتكرر الحدث؟ اعرض العمل المحفوظ والإعادة والمطابقة.

كل إجابة تحتاج أثرًا يمكن مراجعته: عقد قبول، تسجيل لإعادة المشكلة، فحص سلوكي، أو سجل عملية منقح. الكلمات العامة مثل «احترافي» لا تنتج هذا الدليل وحدها.

الأدلة الأربعة في الموقع تربط كل بوابة بكود وقرار وحدود تشغيل. اختر الإجابة الأضعف في مشروعك، واكتب ما سيُعد دليلًا كافيًا لها قبل الاجتماع القادم.

للمؤسس ومدير الوكالة: هذا مدخل واضح لمراجعة frontend محددة النطاق.`,
    instagram:"اعرض دليلًا لكل قرار: إعادة آمنة، رحلة عربية كاملة، رفض وصول صحيح، وتكامل يتعافى من الفشل. احفظ خريطة البوابات، وافتح الأدلة الأربعة من رابط المقالات في الملف الشخصي.",
    tweets:["قبل الإطلاق: أثبت إعادة آمنة، رحلة عربية كاملة، رفض وصول غير مسموح، وتكاملًا يتعافى من الفشل. ما الدليل الناقص في مشروعك؟", "الأدلة الأربعة تجمع اختبارات النطاق وRTL ومراجعة AI ومعمارية Shopify. اختر بوابة ضعيفة وحدد ما يكفي لقبولها:"],
    slides:[["ما الدليل الناقص قبل الإطلاق؟","وعود الجودة لا تكفي\nللحكم على رحلة فعلية."],["الخطأ: قبول أوصاف عامة","«سريع وآمن واحترافي»\nلا يحدد طلبًا أو حالة رفض."],["حوّل كل وعد إلى بوابة قبول","إعادة آمنة • عربية مجرّبة\nرفض صحيح • تكامل قابل للتعافي"],["مثال لدليل يمكن مراجعته","أعد الطلب بعد فقدان الرد.\nاعرض الحالة والسجل، لا الزر فقط."],["ابدأ بالدليل الأضعف","احفظ الخريطة. الأدلة الأربعة\nمن رابط المقالات في الملف الشخصي."]]
  },
  {
    title:"Send the workflow that blocks your next release.",
    linkedin:`A failed Arabic form, an undefined API contract, or duplicated store operations are concrete starting points for a frontend project.

I work on React/Next.js interfaces, bilingual websites, and Shopify custom apps and API integrations.

Bring the actual bottleneck:
• Current URL and the user trying to complete the task.
• Steps that reveal the failure or missing capability.
• Connected systems and the owner of each dependency.
• Available designs, content and test access.
• The constraint that matters most for the release.

From there we can scope a focused review, implementation, or integration. The proposal should identify the contract, assumptions, failure behavior and acceptance evidence before the estimate becomes a commitment.

For agencies, make the handoff boundary explicit: what your team supplies, what I build, and how another engineer verifies it. For founders, name the operation the release must make possible.

Project pages show the contribution behind previous work. Support and additions are agreed for the scope at hand.

Share the workflow through the contact page so the first discussion can resolve a decision that matters.`,
    instagram:"عندك مسار يحجز الإصدار القادم؟ أرسل الرابط والمهمة وخطوات الخلل والأنظمة المتصلة، ثم التصميم والمحتوى والقيود. أعمل على React وNext.js والواجهات ثنائية اللغة وتكاملات Shopify. نموذج البداية والمشاريع والتواصل من رابط الملف الشخصي.",
    tweets:["Planning React/Next.js, bilingual UI or Shopify integration? Send the current URL, blocked task, reproduction steps, systems and the release constraint that matters most.","A focused scope names the contract, assumptions, dependency owners and acceptance evidence. Founders and agencies can share the workflow here:"],
    slides:[["ما الذي يحجز الإصدار القادم؟","نموذج عربي؟ عقد بيانات؟\nأم عملية متجر تحتاج ربطًا؟"],["الخطأ: طلب إطار بلا مسار واضح","اسم الأداة لا يحدد\nما يجب أن يتمكن المستخدم من فعله."],["حوّل العائق إلى نطاق قابل للتسليم","مهمة + عقد + اعتماديات\nوفشل معروف ودليل قبول"],["رسالة بداية تساعد على القرار","الرابط + خطوات الخلل + المطلوب\nثم الأنظمة والتصميم والقيود"],["أرسل مسار مشروعك","احفظ القالب. المشاريع والتواصل\nمن رابط الملف الشخصي."]]
  }
] satisfies {title:string;linkedin:string;instagram:string;tweets:string[];slides:[string,string][]}[]

export const elevatedMicroPosts = [
  "حُفظ الطلب وضاع الرد؟ أعد العملية بالمفتاح نفسه وتحقق من السجل. القيد الفريد والمعالجة الذرية هما دليل منع التكرار؛ تعطيل الزر وحده لا يكفي.",
  "قبل تثبيت تقدير الواجهة، اطلب طلبًا واستجابة وخطأ ومسار وصول قابلًا للتجربة. سمِّ مالك API وموعد إتاحته؛ الاعتماد الغامض يحتاج قرار اكتشاف.",
  "اختبار العربية يبدأ قبل وصول الخط: راقب التفاف العنوان وحركة الزر، ثم جرّب البريد والمعرّف المختلط وخطأ النموذج. سجّل السبب قبل تعديل المسافات.",
  "بعد خطأ النموذج: هل بقيت الحقول؟ هل الإعادة متاحة؟ وهل حُفظت العملية على الخادم رغم فقدان الرد؟ افصل حالة الواجهة عن حقيقة السجل.",
  "اختبر تعديل AI بمستخدم لا يملك السجل، ثم افحص البيانات. نجاح طلب المالك والبناء لا يثبتان صحة فرع الرفض. شرط الملكية يُراجع عند الكتابة.",
  "المحتوى التقني يحتاج سجل حقائق: الدور والتقنية والدليل. تحويل «ربط الواجهة بواجهة API مشتركة» إلى «بناء المنصة كاملة» ليس تحسينًا تسويقيًا.",
  "اختبار التسليم: عدّل عنوانًا بجلسة المسؤول واقرأ الصفحة العامة بجلسة أخرى. وثّق طبقة الكاش وسياسة تحديثها، ثم جرّب رفض الحفظ وتصحيحه.",
  "لا تحفظ «رأيت الحدث» ثم تفترض أن العمل وصل للطابور. انهيار بين الخطوتين قد يفقد التحديث. اربط الاستلام بعمل دائم، واختبر الإعادة والمطابقة."
]
