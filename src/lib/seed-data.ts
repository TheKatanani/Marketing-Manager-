import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function ensureDatabaseSeeded() {
  try {
    const projectCount = await prisma.project.count()
    if (projectCount > 0) {
      return { alreadySeeded: true, projectCount }
    }
    return await seedDatabase()
  } catch (error) {
    console.error("Error in ensureDatabaseSeeded:", error)
    throw error
  }
}

export async function seedDatabase() {
  console.log("🌱 Starting real database seeding from thekatanani.com...")

  const hashedPassword = await bcrypt.hash("password123", 10)

  // 1. Create or update Mohammed Katanani User
  const user = await prisma.user.upsert({
    where: { email: "mohammed@thekatanani.com" },
    update: {
      name: "محمد القطناني (Mohammed Katanani)",
      password: hashedPassword,
    },
    create: {
      email: "mohammed@thekatanani.com",
      name: "محمد القطناني (Mohammed Katanani)",
      password: hashedPassword,
    },
  })

  await prisma.user.upsert({
    where: { email: "demo@brandpilot.ai" },
    update: {
      name: "محمد القطناني (Mohammed Katanani)",
      password: hashedPassword,
    },
    create: {
      email: "demo@brandpilot.ai",
      name: "محمد القطناني (Mohammed Katanani)",
      password: hashedPassword,
    },
  })

  // 2. Brand Profile
  const brandData = {
    professionalTitle: "مطور ويب | Next.js · React · Shopify · WordPress",
    bioSummary:
      "أنا محمد القطناني — مطور ويب متخصص في التطوير المخصص بـ Next.js وReact وVue، وأنفذ أيضًا عبر WordPress وShopify وWix. لا أبيعك تقنية — أختار معك ما يخدم هدفك وميزانيتك. أبني لك الموقع الصحيح بالأداة الصحيحة. من فلسطين، لعملاء في السعودية والخليج والعالم، بتقييمات 5.0 موثقة على خمسات وUpwork ومعدل نجاح 100%.",
    primaryGoal: "CAREER_AND_FREELANCE",
    coreSkills: JSON.stringify([
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Vue.js",
      "Tailwind CSS v4",
      "Shopify & Liquid",
      "Remix & Shopify Apps",
      "WordPress & Custom Plugins",
      "Wix Studio & Velo",
      "Node.js & Express",
      "PostgreSQL & Prisma",
      "Firebase Firestore & Cloudinary",
      "GSAP & ScrollTrigger Animations",
      "RTL أصيل و Core Web Vitals (INP/LCP)",
      "SEO تقني وهيكلة Schema.org",
    ]),
    targetRoles: JSON.stringify([
      "Senior Next.js / React Architect",
      "Full-Stack Web Engineer (Remote)",
      "Lead E-Commerce Developer",
      "Staff Frontend Engineer",
    ]),
    freelanceServices: JSON.stringify([
      "تطوير مخصص بـ Next.js / React / Vue — تصميم فريد 100%، أداء بأعلى المعايير، وبنية تنمو مع عملك",
      "صفحات هبوط تبيع — تسلسل إقناعي مدروس وتحميل شبه فوري لحملات الإعلانات",
      "متاجر Shopify احترافية — تخصيص ثيمات، تطبيقات Remix للضمان والمخزون، وبوابات دفع الخليج",
      "مواقع WordPress مخصصة — لوحة تحكم تديرها بنفسك مع سرعة حقيقية وتهيئة SEO كاملة",
      "مواقع ومنصات Wix Studio — حلول متكاملة متقدمة وتفاعلية بميزانيات اقتصادية مدروسة",
      "تحسين سرعة المواقع القائمة — فحص Lighthouse و Core Web Vitals وإصلاح مشاكل الـ RTL والتجاوب",
    ]),
    toneOfVoice:
      "صادق، عملي، ومباشر. 'لا أبيعك تقنية — أبيعك نتيجة'. التركيز على ما يحول الزائر إلى عميل حقيقي. لغة مهنية تفهم تفاصيل السوق العربي وثقافة الأعمال في السعودية والخليج، بدون مصطلحات تسويقية فارغة وبدون وعود وهمية.",
    targetAudienceSummary:
      "أصحاب الشركات والمتاجر ورواد الأعمال في السعودية والخليج والوطن العربي الباحثين عن مواقع سريعة ومتاجر تزيد مبيعاتهم؛ ومدراء التوظيف والشركات التقنية الباحثة عن مهندس Full-Stack يبني أنظمة متينة وموثوقة بأحدث المعايير.",
    contentPillars: JSON.stringify([
      "الأداة الصحيحة للهدف الصحيح: متى تختار Next.js ومتى تختار Shopify أو WordPress؟",
      "كواليس مشاريع واقعية: كيف حللنا مشاكل جيباس العراق، كوتش سبيس، وماهسري؟",
      "أسرار الأداء وسرعة الويب: كيف تحقق 100/100 في مؤشرات Core Web Vitals؟",
      "دليل RTL الحقيقي: كيف تبني موقعاً عربياً أصيلاً لا يبدو كقالب إنجليزي مترجم؟",
    ]),
    languages: JSON.stringify(["العربية", "English"]),
    portfolioUrl: "https://thekatanani.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
    twitterUrl: "https://x.com",
  }

  await prisma.brandProfile.upsert({
    where: { userId: user.id },
    update: brandData,
    create: {
      ...brandData,
      userId: user.id,
    },
  })

  // 3. Clear and seed Real Projects
  await prisma.postMetric.deleteMany()
  await prisma.approval.deleteMany()
  await prisma.postVersion.deleteMany()
  await prisma.post.deleteMany()
  await prisma.contentIdea.deleteMany()
  await prisma.project.deleteMany()
  await prisma.blogPost.deleteMany()

  const realProjects = [
    {
      title: "جيباس العراق — متجر شوبيفاي وتطبيق الضمان المخصص (Geepas Iraq)",
      slug: "geepas-iraq-shopify",
      projectContext: "Shopify Store & Custom Remix Warranty App (2026)",
      problemStatement:
        "العلامة التجارية جيباس في العراق كانت بحاجة لمتجر إلكتروني متكامل سريع، مع معضلة تسجيل ومتابعة الضمان للأجهزة الكهربائية، وإدارة برامج ولاء العملاء، ومزامنة المخزون اللحظية مع نظام Zoho Inventory، وإرسال تنبيهات واتساب تلقائية للمشترين في العراق.",
      solutionArchitecture:
        "تطوير شامل لمتجر شوبيفاي وتخصيص الثيم بالكامل بـ Liquid، مع بناء تطبيق Remix مخصص ومستقل للضمان والولاء يعمل عبر Shopify Admin API و GraphQL و Prisma و PostgreSQL، متصل لحظياً بـ Zoho Inventory وبوابة Infobip لإرسال إشعارات الواتساب المؤتمتة.",
      techStack: JSON.stringify([
        "Shopify",
        "Liquid",
        "Remix",
        "Shopify Admin API",
        "GraphQL",
        "Prisma",
        "PostgreSQL",
        "Zoho Inventory",
        "Infobip WhatsApp",
      ]),
      businessImpact:
        "إطلاق متجر رسمي معتمد بنظام ضمان رقمي فريد قلل زمن معالجة مطالبات الصيانة، وأتمت مزامنة المخزون ومنع بيع منتجات غير متوفرة، مع تواصل فوري مع آلاف العملاء عبر واتساب.",
      keyMetrics: JSON.stringify([
        "تطبيق Remix مخصص للضمان",
        "مزامنة لحظية مع Zoho Inventory",
        "أتمتة إشعارات WhatsApp",
        "GraphQL Admin API",
      ]),
      constraintsFaced:
        "التعامل مع بيئة التجارة الإلكترونية في العراق، وفصل معالجة بيانات الضمان المعقدة عن ثيم المتجر لضمان بقاء سرعة التصفح اللحظية دون بطء.",
      lessonsLearned:
        "بناء تطبيق شوبيفاي مخصص بـ Remix بدلاً من حشو الثيم بأكواد ثقيلة يمنح العميل مرونة مؤسسية مطلقة وتكاملاً آمناً مع أنظمة المحاسبة والمخازن.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "منصة أكاديمية واستشارات الطيران — د. مروان العزاوي",
      slug: "aviation-consulting-academy",
      projectContext: "Next.js 16 Aviation Experience & Training Platform (2026)",
      problemStatement:
        "أكاديمية طيران دولية واستشارات تدريب طياري الهليكوبتر بحاجة لمنصة رقمية سينمائية فائقة الفخامة تعكس الهيبة الأكاديمية والاحترافية، وتدعم اللغتين (عربي/إنجليزي) مع تجربة تفاعلية غامرة دون أي بطء في التحميل.",
      solutionArchitecture:
        "بناء منصة تفاعلية سنمائية متقدمة بأحدث تقنيات Next.js 16 و React 19 مع حركات وانتقالات فيزيائية سلسة عبر GSAP و ScrollTrigger، مع إدارة المحتوى عبر Firebase Firestore، وتنسيق تايبوغرافي دقيق بـ Tailwind CSS v4 مع دعم next-intl و Swiper 11.",
      techStack: JSON.stringify([
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "GSAP & ScrollTrigger",
        "next-intl",
        "Firebase Firestore",
        "Swiper 11",
      ]),
      businessImpact:
        "منصة استعراض وتدريب فاخرة حازت على إشادة واسعة من المؤسسات الأكاديمية والطيارين المتدربين، مع سرعة استجابة فائقة وتفاعل بصري 60fps.",
      keyMetrics: JSON.stringify([
        "Next.js 16 & React 19",
        "حركات GSAP بمعدل 60 إطاراً",
        "ثنائية اللغة RTL/LTR كاملة",
        "Lighthouse 98+ Score",
      ]),
      constraintsFaced:
        "الموازنة الدقيقة بين المشاهد البصرية والحركات السينمائية الثقيلة وبين الحفاظ على أداء فائق ومؤشرات Core Web Vitals ممتازة.",
      lessonsLearned:
        "فصل المكونات التفاعلية عن مكونات الخادم (Server Components) يتيح تحقيق أعلى درجات الفخامة البصرية دون التضحية بزمن التحميل الفوري.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "كوتش سبيس — منصة تعليمية وتدريبية ثنائية اللغة (CoachSpace)",
      slug: "coachspace-learning-platform",
      projectContext: "Bilingual EdTech Web & Mobile Platform (2026)",
      problemStatement:
        "الحاجة لمنصة تعليمية وتدريبية ثنائية اللغة تخدم المدربين والمتدربين في العالم العربي، تتطلب مزامنة لحظية بين تطبيق الويب وتطبيق الهاتف ولوحة تحكم شاملة لإدارة المساقات والاشتراكات.",
      solutionArchitecture:
        "بناء تطبيق ويب بـ Next.js وتطبيق جوال بـ Flutter مع واجهة برمجة خلفية موحدة بـ Django REST Framework وقاعدة بيانات PostgreSQL، مع إدارة الحالة المعقدة عبر Redux Toolkit و RTK Query واختبارات شاملة بـ Jest و Cypress.",
      techStack: JSON.stringify([
        "Next.js",
        "Django REST Framework",
        "Flutter",
        "PostgreSQL",
        "Redux Toolkit",
        "RTK Query",
        "next-intl",
        "Tailwind CSS",
        "React Hook Form",
        "Zod",
        "Jest",
        "Cypress",
      ]),
      businessImpact:
        "منصة متماسكة تعمل بسلاسة عبر الويب والموبايل وفرت 50% من تكلفة التطوير والصيانة، مع تقييم 5.0 من أصحاب المشروع والمتدربين.",
      keyMetrics: JSON.stringify([
        "تطبيق ويب + موبايل موحد",
        "دعم كامل للغتين عربي/إنجليزي",
        "كاشينغ ذكي بـ RTK Query",
        "Jest & Cypress Coverage",
      ]),
      constraintsFaced:
        "توحيد معايير الـ API بين تطبيق Next.js وتطبيق Flutter مع دعم اتجاه الـ RTL الأصيل وتفاوت سرعات الإنترنت لدى الطلاب.",
      lessonsLearned:
        "التصميم المسبق لهيكل البيانات والـ Schema الموحدة يمنع التناقضات بين الويب وتطبيقات الجوال ويضمن تجربة استخدام خالية من الأخطاء.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "محمد أنور — بورتفوليو سينمائي لمصمم موشن جرافيك ومونتير",
      slug: "mohamed-anwar-portfolio",
      projectContext: "Interactive Digital Experience & Video Showcase (2026)",
      problemStatement:
        "مصمم موشن جرافيك ومونتير فيديو محترف كان يحتاج معرض أعمال رقمي غير مألوف يعكس الروح السينمائية لأعماله بحركة انسيابية وأداء فائق دون أن تسبب مقاطع الفيديو بطء الموقع.",
      solutionArchitecture:
        "بناء تجربة رقمية سينمائية بـ Next.js و React و TypeScript مع أنيميشن CSS مخصص وتضمين ذكي للمقاطع مع Lazy Loading متقدم و SEO تقني كامل ودعم اللغتين بـ next-intl.",
      techStack: JSON.stringify([
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "CSS Animations",
        "Video Embeds",
        "next-intl",
        "SEO",
      ]),
      businessImpact:
        "تقييم 5.0 موثق على LinkedIn من العميل محمد أنور الذي ذكر: 'لم يكتفِ ببناء موقع إلكتروني، بل بنى منصة تمثلني وتمثل أعمالي بشكل حقيقي'، مع جذب عقود عمل جديدة.",
      keyMetrics: JSON.stringify([
        "تقييم 5.0 موثق على LinkedIn",
        "تجربة تصفح سينمائية فائقة",
        "Lighthouse 99 Performance",
        "تضمين فيديو ذكي بدون بطء",
      ]),
      constraintsFaced:
        "الأحجام الكبيرة لملفات الموشن جرافيك والمونتاج وضرورة تشغيلها بسرعة فائقة على مختلف الهواتف الذكية.",
      lessonsLearned:
        "التحميل الكسول للفيديو وتوليد الـ Metadata مسبقاً على السيرفر هو مفتاح الحفاظ على سرعة الصاروخ في بورتفوليو الوسائط المتعددة.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "منصة ماهسري للتجديدات والترميم — Upwork 5.0 (Mahasiri)",
      slug: "mahasiri-renovations-wix-studio",
      projectContext: "Wix Studio Full Architectural Platform & Store (2026)",
      problemStatement:
        "شركة مقاولات وتصميم داخلي طلبت إعادة بناء منصتها لعرض المشاريع جغرافياً على الخرائط التفاعلية مع متجر إلكتروني لمواد التشطيب ولوحة تحكم سهلة تديرها إدارة الشركة دون الحاجة لمطور.",
      solutionArchitecture:
        "تنفيذ المنصة بالكامل عبر Wix Studio مستفيدين من Velo by Wix للبرمجة المخصصة، مع بناء خرائط جغرافية تفاعلية ومتجر Wix Stores وتهيئة متقدمة للـ SEO.",
      techStack: JSON.stringify([
        "Wix Studio",
        "Wix Stores",
        "Velo by Wix",
        "Custom CSS",
        "Interactive Maps",
        "E-Commerce Integration",
        "SEO Optimization",
      ]),
      businessImpact:
        "تقييم 5.0 كامل على Upwork من العميل مع تعليق: 'يتواصل بوضوح، ويولي اهتمامًا بالتفاصيل، ويقدّم عملًا عالي الجودة في الوقت المحدد'.",
      keyMetrics: JSON.stringify([
        "تقييم 5.0 كامل على Upwork",
        "خرائط تفاعلية جغرافية",
        "متجر إلكتروني متكامل",
        "تسليم في الموعد المحدد 100%",
      ]),
      constraintsFaced:
        "تطويع منصة Wix Studio لتتجاوز قيود القوالب المعتادة والوصول إلى مظهر وتجربة تضاهي التطوير البرمجي المخصص.",
      lessonsLearned:
        "اختيار المنصة الصحيحة لحاجة العميل وميزانيته يثبت أن الأداة وسيلة والنتيجة هي الأهم دائماً.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "لولو بوتيكات — متجر إلكتروني متكامل في غزة (Lulu Boutiques)",
      slug: "lulu-boutiques-ecommerce",
      projectContext: "Full-Stack React & Node.js E-Commerce with WhatsApp Order Sync (2026)",
      problemStatement:
        "أول متجر skincare في غزة كان يدير المبيعات يدوياً عبر رسائل إنستغرام، مع مشاكل انقطاع الكهرباء وضعف الإنترنت وفقدان طلبات الزبائن.",
      solutionArchitecture:
        "بناء متجر Full-Stack مخصص بـ React 18 و Redux و Node.js و Express و MySQL، مع واجهة Mobile-First خفيفة جداً، وتوليد فوري للطلبات عبر WhatsApp مع كتالوج متزامن تلقائياً.",
      techStack: JSON.stringify([
        "React 18",
        "Redux Toolkit",
        "Styled Components",
        "Node.js",
        "Express.js",
        "MySQL",
        "Sequelize",
        "JWT",
        "WhatsApp Automation",
      ]),
      businessImpact:
        "تنظيم المبيعات وأتمتة الطلبات عبر واتساب، ما رفع سرعة إتمام عمليات الشراء بنسبة 80% مع حفظ سجلات مبيعات آمنة.",
      keyMetrics: JSON.stringify([
        "أول متجر skincare في غزة",
        "أتمتة الطلبات عبر WhatsApp",
        "تصفح فائق السرعة للجوال",
        "تسليم واستقرار تحت أصعب الظروف",
      ]),
      constraintsFaced:
        "العمل تحت ظروف الحصار وانقطاع الكهرباء وضعف الاتصالات، مما استلزم بناء بنية خفيفة جداً تعمل بكفاءة على سرعات الإنترنت المحدودة.",
      lessonsLearned:
        "البرمجة الحقيقية هي التي تحل مشاكل الناس الفعلية تحت أقسى الظروف وتخلق قيمة تجارية مستدامة.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
  ]

  const createdProjects = []
  for (const p of realProjects) {
    const proj = await prisma.project.create({
      data: {
        ...p,
        userId: user.id,
      },
    })
    createdProjects.push(proj)
  }

  // 4. Marketing Campaigns
  const campaign1 = await prisma.campaign.create({
    data: {
      userId: user.id,
      name: "استقطاب عقود مشاريع Next.js ومتاجر Shopify الخليجية",
      objective:
        "استهداف أصحاب الشركات ورواد الأعمال في السعودية والخليج الباحثين عن تطوير مخصص عالي الأداء أو متاجر شوبيفاي احترافية بأدوات ضمان وأتمتة مخصصة.",
      status: "ACTIVE",
      startDate: new Date("2026-10-01"),
      endDate: new Date("2026-12-31"),
    },
  })

  // 5. Content Ideas
  const idea1 = await prisma.contentIdea.create({
    data: {
      userId: user.id,
      projectId: createdProjects[0].id,
      campaignId: campaign1.id,
      title: "عندما لا تكفي قوالب شوبيفاي: كواليس بناء تطبيق ضمان مخصص بـ Remix",
      hook: "أغلب المتاجر تفشل عند التوسع الإقليمي لأنها تحشر كل شيء في قوالب جاهزة. إليك كيف صممنا تطبيق Remix متصلاً بنظام المخزون وبوابات واتساب لحل معضلة الضمان في العراق.",
      targetAudience: "مؤسسو متاجر إلكترونية ومدراء التجارة الرقمية في الخليج والعراق",
      contentPillar: "الأداة الصحيحة للهدف الصحيح: متى تختار Next.js ومتى تختار Shopify أو WordPress؟",
      status: "APPROVED",
      sourceNotes: "دراسة حالة مشروع جيباس العراق الموثقة في thekatanani.com",
    },
  })

  // 6. Posts
  const post1 = await prisma.post.create({
    data: {
      userId: user.id,
      campaignId: campaign1.id,
      ideaId: idea1.id,
      title: "كواليس شوبيفاي العراق: بناء تطبيق Remix مخصص للضمان والولاء والمخزون",
      status: "APPROVED",
      scheduledFor: new Date("2026-10-27T10:00:00Z"),
    },
  })

  await prisma.postVersion.create({
    data: {
      postId: post1.id,
      platform: "LINKEDIN",
      content: `أغلب المتاجر تفشل عند التوسع الإقليمي لأنها تحشر كل شيء في قوالب شوبيفاي الجاهزة.\n\nعندما عملنا على تطوير متجر "جيباس العراق"، كان التحدي يتجاوز مجرد عرض المنتجات:\n1. نظام ضمان رقمي معقد للأجهزة الكهربائية.\n2. مزامنة لحظية للمخزون مع Zoho Inventory.\n3. إرسال تنبيهات وفواتير تلقائية عبر الواتساب.\n\nالحل الهندسي: تطبيق Remix مخصص بـ PostgreSQL و GraphQL Admin API.\nالنتيجة: سرعة خارقة، وأتمتة كاملة، ومزامنة خالية من الأخطاء.`,
      hashtags: JSON.stringify(["Nextjs", "Shopify", "Remix", "WebDevelopment", "KatananiTech"]),
      status: "APPROVED",
    },
  })

  await prisma.postVersion.create({
    data: {
      postId: post1.id,
      platform: "INSTAGRAM",
      content: `عندما تحتاج علامتك أكثر من مجرد قالب شوبيفاي عادي ⚡\nكيف طورنا تطبيق Remix مخصص لمتجر جيباس العراق لإدارة الضمان والمخزون والواتساب. اسحب الشاشة لقراءة دراسة الحالة كاملة ⬅️`,
      hashtags: JSON.stringify(["شوبيفاي", "متاجر_إلكترونية", "برمجة_مخصصة", "محمد_القطناني"]),
      status: "APPROVED",
      visualPrompt:
        "Modern visual slide deck in Petroleum Blue (#0A4D68) and Sky Blue (#D2E5F0), showing clean Shopify API integration and mobile notifications.",
      carouselSlides: JSON.stringify([
        {
          slideNumber: 1,
          title: "لماذا لا تكفي القوالب الجاهزة للمتاجر الكبيرة؟",
          bodyText: "كواليس تطوير متجر جيباس العراق وتطبيق الضمان المخصص بـ Remix و Shopify API.",
          visualCue: "عنوان رئيسي جريء مع لوجو شوبيفاي",
        },
        {
          slideNumber: 2,
          title: "التحدي: 3 أنظمة منفصلة تحتاج مزامنة لحظية",
          bodyText: "متجر شوبيفاي + نظام مخازن Zoho Inventory + إشعارات واتساب فورية لكل مشتري.",
          visualCue: "مخطط انسيابي يوضح تدفق البيانات",
        },
        {
          slideNumber: 3,
          title: "الحل: تطبيق Remix مستقل عبر GraphQL API",
          bodyText: "بناء باك-إند مخصص بـ PostgreSQL يتيح للعميل استعلام فوري عن حالة ضمان جهازه.",
          visualCue: "لقطة شاشة للوحة تحكم الضمان السريعة",
        },
        {
          slideNumber: 4,
          title: "النتيجة: سرعة خارقة وأتمتة 100%",
          bodyText: "توفير آلاف الساعات اليدوية، وتسجيل الضمان خلال ثوانٍ، وتحديث المخزون آلياً.",
          visualCue: "بطاقة مقاييس خضراء تبرز أرقام النجاح",
        },
      ]),
    },
  })

  // 7. Seed Real Leads
  const realLeads = [
    {
      contactName: "أ. مروان",
      company: "وكالة بابيلون للسيارات الفاخرة",
      role: "المؤسس والمدير العام",
      sourcePlatform: "UPWORK",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$3,500",
      notes: "تم تسليم صفحة هبوط تفاعلية فاخرة بـ Next.js و GSAP وتقييم 5.0 كامل مع إشادة خاصة بدقة المواعيد.",
    },
    {
      contactName: "أ. خالد",
      company: "منصة ShipFlow اللوجستية",
      role: "مؤسس المنصة",
      sourcePlatform: "UPWORK",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$2,800",
      notes: "تحويل تصميم Figma لصفحة هبوط تفاعلية فائقة السرعة بـ Vue.js وثنائية اللغة RTL/LTR وتقييم 5.0.",
    },
  ]

  for (const l of realLeads) {
    await prisma.lead.create({
      data: {
        ...l,
        userId: user.id,
      },
    })
  }

  // 8. Seed Blog Posts for Portfolio
  const realBlogPosts = [
    {
      title: "معمارية Next.js 16 مع React 19: كيف تبني تطبيقات ويب تفاعلية بسرعة استجابة 100/100",
      slug: "nextjs-16-react-19-architecture",
      category: "TECH",
      excerpt:
        "دليل عملي لكيفية استغلال React Server Components وتوليد الصفحات المسبق، مع ضبط مؤشرات Core Web Vitals الجديدة (INP و LCP).",
      content: `### مقدمة هندسية
في عالم تطوير الويب الحديث، لم يعد الأداء مجرد ميزة إضافية، بل هو العامل الحاسم في تحويل الزائر إلى عميل.

عندما نبني بـ **Next.js 16** و **React 19**، فإننا نستفيد من معمارية هجينة تفصل بين ما يجب تنفيذه على الخادم وما يجب أن يتفاعل معه العميل في المتصفح.

### 1. الاستغلال الأمثل لـ Server Components
المعادلة الذهبية هي: اجعل 90% من صفحاتك Server Components، وانقل فقط الأزرار والنماذج التفاعلية إلى Client Components.
هذا يقلل حجم حزمة الجافاسكريبت المحملة في المتصفح بنسبة تتجاوز 70%.

### 2. معالجة تفاعلية الـ RTL
في الأسواق العربية، بناء واجهة RTL أصيلة يتطلب استخدام CSS Logical Properties مثل \`ms-\` و \`me-\` في Tailwind v4 بدلاً من الهوامش الثابتة.

### الخلاصة
الموقع السريع ليس صدفة، بل هو قرار معماري يبدأ من السطر الأول من الكود.`,
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200",
      imagePrompt: "Clean futuristic software engineering workspace with code on screens, in Petroleum Blue and Sky Blue aesthetic",
      readTimeMinutes: 5,
      tags: JSON.stringify(["Next.js", "React 19", "WebPerformance", "Architecture"]),
      seoTitle: "معمارية Next.js 16 و React 19 للأداء الفائق | محمد القطناني",
      seoDescription: "دليل معماري متقدم لبناء تطبيقات ويب حديثة بـ Next.js 16 وأعلى معايير السرعة والأداء.",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "متى تختار متجر Shopify مخصص ومتى تبني بـ Next.js من الصفر؟",
      slug: "shopify-vs-custom-nextjs-ecommerce",
      category: "ECOMMERCE",
      excerpt:
        "مقارنة عملية من واقع مشاريع فعلية بين منصات التجارة الإلكترونية، وكيف تساعد العميل على اتخاذ القرار الاستثماري الصحيح.",
      content: `### المعادلة الاستثمارية
السؤال الأكثر تكراراً من أصحاب المتاجر في السعودية والخليج: هل نبني المتجر بـ Shopify أم بتطوير مخصص بـ Next.js؟

### متى تختار Shopify؟
- إذا كنت بحاجة للانطلاق السريع خلال أسابيع معدودة.
- إذا كنت تريد بوابات دفع محلية (Mada, Tamara, Tabby) جاهزة بدون تكاليف بناء واجهات بنكية معقدة.
- عندما تكفيك منظومة شوبيفاي مع تخصيص ثيمات دقيق وتطبيقات Remix مخصصة عند الحاجة.

### متى تختار Next.js مخصص؟
- إذا كان لديك نموذج تسعير معقد أو حزم اشتراكات أو منطق أعمال خاص جداً لا تدعمه شوبيفاي.
- إذا كنت تبحث عن تجربة تصفح ثلاثية الأبعاد أو سنمائية خاصة لعلامات تجارية فاخرة.`,
      coverImage: "https://images.unsplash.com/photo-1556742049-0a67e5572263?q=80&w=1200",
      imagePrompt: "Modern minimal e-commerce dashboard and shopping analytics, sleek luxury branding style",
      readTimeMinutes: 6,
      tags: JSON.stringify(["Shopify", "Ecommerce", "Next.js", "BusinessStrategy"]),
      seoTitle: "Shopify أم Next.js مخصص لمتجرك الإلكتروني؟ | محمد القطناني",
      seoDescription: "دليل رواد الأعمال لاختيار التقنية الصحيحة لمتجرهم الإلكتروني بما يخدم أهدافهم وميزانيتهم.",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    {
      title: "أسرار الحصول على تقييم 5.0 ومعدل نجاح 100% على Upwork وخمسات",
      slug: "freelancing-secrets-upwork-5-star-reviews",
      category: "FREELANCE",
      excerpt:
        "دروس واقعية من تسليم عشرات المشاريع بنجاح تام: كيف تحول العميل المؤقت إلى شريك طويل الأمد.",
      content: `### القاعدة الأولى: لا تَبِع تقنية — بِع نتيجة
العميل لا يبحث عن كود React جميل بحد ذاته، بل يبحث عن متجر يبيع، أو منصة سريعة تجلب له المستثمرين، أو صفحة هبوط تضاعف مبيعات حملاته.

### القاعدة الثانية: دقة الساعة السويسرية
التواصل الاستباقي قبل أن يسأل العميل، وتسليم المشروع قبل الموعد بساعات، وتقديم فيديو توضيحي يشرح لوحة التحكم، هو ما يحول التقييم العادي إلى تقييم 5 نجوم مع مديح موثق.`,
      coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200",
      imagePrompt: "Collaborative remote engineering work, clean Scandinavian design aesthetic",
      readTimeMinutes: 4,
      tags: JSON.stringify(["Freelance", "Upwork", "Khamsat", "ClientSuccess"]),
      seoTitle: "أسرار التقييم الكامل 5.0 في العمل الحر للمطورين | محمد القطناني",
      seoDescription: "نصائح وخبرات عملية لبناء سمعة مهنية قوية وعلاقات مستدامة مع العملاء في العمل الحر.",
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  ]

  for (const b of realBlogPosts) {
    await prisma.blogPost.create({
      data: {
        ...b,
        userId: user.id,
      },
    })
  }

  console.log("✅ Seed completed successfully with 100% authentic data!")
  return { success: true, user: user.email }
}
