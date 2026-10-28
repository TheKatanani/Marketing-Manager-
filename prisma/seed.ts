import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting real database seeding from thekatanani.com...")

  // 1. Create or update Mohammed Katanani User
  const hashedPassword = await bcrypt.hash("password123", 10)
  
  // Clean up any old dummy users if present
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

  // Also support demo@brandpilot.ai pointing to Mohammed Katanani so existing sessions stay valid
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

  console.log(`👤 User ready: ${user.name} (${user.email})`)

  // 2. Create or update Authentic Brand Profile directly from thekatanani.com
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

  console.log(`🎯 Brand profile ready for: ${user.name}`)

  // 3. Clear old projects and re-seed with 100% real verified projects from thekatanani.com
  await prisma.postMetric.deleteMany()
  await prisma.approval.deleteMany()
  await prisma.postVersion.deleteMany()
  await prisma.post.deleteMany()
  await prisma.contentIdea.deleteMany()
  await prisma.project.deleteMany()

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
    {
      title: "Shaip Flow (ShipFlow) — صفحة هبوط تسويقية تفاعلية فائقة السرعة",
      slug: "shaip-flow-landing-page",
      projectContext: "Vue.js & TypeScript High-Conversion Landing Page (2026)",
      problemStatement:
        "منصة شحن وتخليص لوجستي طلبت تحويل تصميم Figma إبداعي إلى صفحة هبوط تفاعلية فائقة السرعة تدعم العربية والإنجليزية بنظام حجز وتتبع سريع لحملاتهم الإعلانية.",
      solutionArchitecture:
        "تحويل بكسل-بيرفكت 100% لتصميم Figma بـ Vue.js و TypeScript و Tailwind CSS و Vite مع دعم اللغتين بـ Vue i18n وأنيميشن سلس وتجاوب مثالي.",
      techStack: JSON.stringify([
        "Vue.js",
        "TypeScript",
        "Tailwind CSS",
        "Figma Pixel-Perfect",
        "Vite",
        "Vue i18n",
      ]),
      businessImpact:
        "تقييم 5.0 كامل على Upwork من مؤسس المنصة (أ. خالد) مع إشادة خاصة بالمرونة في التعديلات والسرعة في التنفيذ.",
      keyMetrics: JSON.stringify([
        "تقييم 5.0 على Upwork",
        "تطابق تام مع تصميم Figma",
        "زمن تحميل فوري لحملات الإعلانات",
        "ثنائية اللغة RTL/LTR",
      ]),
      constraintsFaced:
        "الحفاظ على دقة الأنيميشن وتفاصيل الواجهة المعقدة دون التأثير على معدل التحويل وسرعة التحميل.",
      lessonsLearned:
        "تحويل تصاميم Figma بدقة بكسل-بيرفكت هو ما يفرق المطور المبتدئ عن المحترف الذي يثق به العملاء.",
      projectUrl: "https://thekatanani.com/projects",
      isFeatured: true,
    },
    {
      title: "بابيلون للسيارات — منصة هبوط تفاعلية فاخرة (Babylon Luxury Cars)",
      slug: "babylon-luxury-cars",
      projectContext: "Next.js & GSAP Luxury Auto Marketing Experience (2026)",
      problemStatement:
        "وكالة تسويق سيارات فاخرة في الخليج بحاجة لواجهة استعراض فاخرة تليق بالعلامات العالمية مع حركة تفاعلية وتجربة مستخدم متميزة.",
      solutionArchitecture:
        "تطوير صفحة هبوط متقدمة بـ Next.js و GSAP ScrollTrigger مع تحويل مباشر لتصميم Figma، ودعم كامل للغتين العربية والإنجليزية.",
      techStack: JSON.stringify([
        "Next.js",
        "React",
        "GSAP",
        "Tailwind CSS",
        "next-intl",
        "Figma to Code",
      ]),
      businessImpact:
        "تقييم 5.0 على Upwork مع تعليق شهير من العميل أ. مروان: 'دقيق في مواعيده لدرجة شعرت وكأنه يعمل بدقة الساعة السويسرية'.",
      keyMetrics: JSON.stringify([
        "تقييم 5.0 على Upwork",
        "إشادة بدقة الساعة السويسرية",
        "سلاسة حركة 60 إطاراً",
        "معايير فاخرة لعلامات السيارات",
      ]),
      constraintsFaced:
        "التعامل مع صور سيارات فائقة الدقة والحاجة لعرض تفاصيلها بسلاسة تامة على جميع الهواتف الذكية.",
      lessonsLearned:
        "الفهم العميق لجمهور السيارات الفاخرة وتوفير تفاعل بصري متقن يصنع الفارق التنافسي للعميل في حملاته الإعلانية.",
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
    console.log(`📁 Project created: ${proj.title}`)
  }

  // 4. Create authentic Marketing Campaigns
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

  const campaign2 = await prisma.campaign.create({
    data: {
      userId: user.id,
      name: "اقتناص عروض التوظيف عن بعد (Remote Senior Engineer)",
      objective:
        "جذب مدراء التوظيف والمدراء التقنيين عبر إبراز دراسات حالة حل المشاكل المعقدة مثل أكاديمية الطيران وجيباس العراق وكوتش سبيس.",
      status: "ACTIVE",
      startDate: new Date("2026-10-15"),
      endDate: new Date("2026-11-30"),
    },
  })

  // 5. Create Fact-Anchored Content Ideas directly linked to real projects
  const ideasData = [
    {
      projectId: createdProjects[0].id, // Geepas Iraq
      campaignId: campaign1.id,
      title: "عندما لا تكفي قوالب شوبيفاي: كواليس بناء تطبيق ضمان مخصص بـ Remix",
      hook: "أغلب المتاجر تفشل عند التوسع الإقليمي لأنها تحشر كل شيء في قوالب جاهزة. إليك كيف صممنا تطبيق Remix متصلاً بنظام المخزون وبوابات واتساب لحل معضلة الضمان في العراق.",
      targetAudience: "مؤسسو متاجر إلكترونية ومدراء التجارة الرقمية في الخليج والعراق",
      contentPillar: "الأداة الصحيحة للهدف الصحيح: متى تختار Next.js ومتى تختار Shopify أو WordPress؟",
      status: "APPROVED",
      sourceNotes: "دراسة حالة مشروع جيباس العراق الموثقة في thekatanani.com",
    },
    {
      projectId: createdProjects[1].id, // Aviation Academy
      campaignId: campaign2.id,
      title: "كيف تحقق 60 إطاراً في الثانية وسرعة 98+ بـ Next.js 16 مع حركات سنمائية ثقيلة؟",
      hook: "الجمع بين الفخامة والسرعة ليس مستحيلاً: كيف استغللنا React Server Components مع GSAP لبناء منصة تدريب طياري الهليكوبتر دون التضحية بمؤشر INP.",
      targetAudience: "المدراء التقنيون ومهندسو الواجهات ومدراء التوظيف في الشركات العالمية",
      contentPillar: "أسرار الأداء وسرعة الويب: كيف تحقق 100/100 في مؤشرات Core Web Vitals؟",
      status: "APPROVED",
      sourceNotes: "مشروع أكاديمية واستشارات الطيران د. مروان العزاوي بـ Next.js 16",
    },
    {
      projectId: createdProjects[2].id, // CoachSpace
      campaignId: campaign2.id,
      title: "منصة تعليمية تخدم آلاف الطلاب عبر الويب والموبايل بـ API موحدة",
      hook: "لماذا تضاعف تكاليف التطوير؟ كيف وحدنا معمارية البيانات بين Next.js و Flutter عبر Django REST Framework وكاشينغ RTK Query.",
      targetAudience: "رواد أعمال منصات التعليم ومؤسسو الشركات التقنية الناشئة",
      contentPillar: "كواليس مشاريع واقعية: كيف حللنا مشاكل جيباس العراق، كوتش سبيس، وماهسري؟",
      status: "APPROVED",
      sourceNotes: "دراسة حالة منصة كوتش سبيس التعليمية",
    },
    {
      projectId: createdProjects[4].id, // Mahasiri
      campaignId: campaign1.id,
      title: "لا أبيعك تقنية — أبيعك نتيجة: متى يكون Wix Studio أذكى من البرمجة المخصصة؟",
      hook: "المطور المحترف لا يفرض تقنية لأنه لا يجيد غيرها. عندما طلبت شركة ماهسري لوحة إدارة ذاتية مع خرائط تفاعلية، وفرنا عليهم آلاف الدولارات وحصلنا على تقييم 5.0 على Upwork.",
      targetAudience: "أصحاب الشركات والمقاولات ورواد الأعمال الباحثين عن حلول اقتصادية ذكية",
      contentPillar: "الأداة الصحيحة للهدف الصحيح: متى تختار Next.js ومتى تختار Shopify أو WordPress؟",
      status: "APPROVED",
      sourceNotes: "مشروع منصة ماهسري للتجديدات — تقييم 5.0 موثق على Upwork",
    },
  ]

  const createdIdeas = []
  for (const idata of ideasData) {
    const idea = await prisma.contentIdea.create({
      data: {
        ...idata,
        userId: user.id,
      },
    })
    createdIdeas.push(idea)
    console.log(`💡 Idea created: ${idea.title}`)
  }

  // 6. Create multi-platform Posts for Ideas
  const post1 = await prisma.post.create({
    data: {
      userId: user.id,
      campaignId: campaign1.id,
      ideaId: createdIdeas[0].id,
      title: "كواليس شوبيفاي العراق: بناء تطبيق Remix مخصص للضمان والولاء والمخزون",
      status: "APPROVED",
      scheduledFor: new Date("2026-10-27T10:00:00Z"),
    },
  })

  // LinkedIn Version
  await prisma.postVersion.create({
    data: {
      postId: post1.id,
      platform: "LINKEDIN",
      content: `أغلب المتاجر تفشل عند التوسع الإقليمي لأنها تحشر كل شيء في قوالب شوبيفاي الجاهزة.

عندما عملنا على تطوير متجر "جيباس العراق"، كان التحدي يتجاوز مجرد عرض المنتجات:
1. نظام ضمان رقمي معقد للأجهزة الكهربائية يضمن حقوق المشترين ومراكز الصيانة.
2. مزامنة لحظية للمخزون مع نظام Zoho Inventory لمنع بيع أي قطعة غير متوفرة.
3. إرسال تنبيهات وفواتير تلقائية عبر الواتساب للمشترين في العراق مباشرة عبر Infobip.

الحل الهندسي:
بدلاً من إثقال الثيم بأكواد سائلة (Liquid) معقدة تبطئ المتجر، بنينا تطبيق شوبيفاي مخصص ومستقل باستخدام Remix و GraphQL Admin API و Prisma و PostgreSQL.

النتيجة:
• متجر فائق السرعة بتجربة تصفح فورية.
• أتمتة كاملة لشهادات الضمان عبر الواتساب.
• مزامنة دقيقة للمخزون دون أي أخطاء يدوية.

الدرس المستفاد:
الموقع الصحيح يُبنى بالأداة الصحيحة — والنتيجة الملموسة في أرقام العميل هي المعيار الوحيد لنجاح أي مطور.`,
      hashtags: JSON.stringify(["Nextjs", "Shopify", "Remix", "WebDevelopment", "KatananiTech"]),
      status: "APPROVED",
    },
  })

  // Instagram Version (Carousel)
  await prisma.postVersion.create({
    data: {
      postId: post1.id,
      platform: "INSTAGRAM",
      content: `عندما تحتاج علامتك أكثر من مجرد قالب شوبيفاي عادي ⚡
كيف طورنا تطبيق Remix مخصص لمتجر جيباس العراق لإدارة الضمان والمخزون والواتساب.
اسحب الشاشة لقراءة دراسة الحالة كاملة ⬅️`,
      hashtags: JSON.stringify(["شوبيفاي", "متاجر_إلكترونية", "برمجة_مخصصة", "محمد_القطناني"]),
      status: "APPROVED",
      visualPrompt:
        "Executive modern visual slide deck in Petroleum Blue (#0A4D68) and Sky Blue (#D2E5F0), showcasing clean Shopify API integration, architecture diagram, and mobile WhatsApp notifications.",
      carouselSlides: JSON.stringify([
        {
          slideNumber: 1,
          title: "لماذا لا تكفي القوالب الجاهزة للمتاجر الكبيرة؟",
          bodyText: "كواليس تطوير متجر جيباس العراق وتطبيق الضمان المخصص بـ Remix و Shopify API.",
          visualCue: "عنوان رئيسي جريء مع لوجو شوبيفاي وأيقونة تطبيق مخصص",
        },
        {
          slideNumber: 2,
          title: "التحدي: 3 أنظمة منفصلة تحتاج مزامنة لحظية",
          bodyText: "متجر شوبيفاي + نظام مخازن Zoho Inventory + إشعارات واتساب فورية لكل مشتري.",
          visualCue: "مخطط انسيابي يوضح تدفق البيانات بين المتجر والأنظمة الخارجية",
        },
        {
          slideNumber: 3,
          title: "الحل: تطبيق Remix مستقل عبر GraphQL API",
          bodyText: "بناء باك-إند مخصص بـ PostgreSQL و Prisma يتيح للعميل استعلام فوري عن حالة ضمان جهازه.",
          visualCue: "لقطة شاشة للوحة تحكم الضمان السريعة والمصممة خصيصاً للمتجر",
        },
        {
          slideNumber: 4,
          title: "النتيجة: سرعة خارقة وأتمتة 100%",
          bodyText: "توفير آلاف الساعات اليدوية، وتسجيل الضمان خلال ثوانٍ، وتحديث المخزون آلياً.",
          visualCue: "بطاقة مقاييس خضراء تبرز أرقام النجاح ومؤشرات الأداء",
        },
        {
          slideNumber: 5,
          title: "الخلاصة: لا أبيعك تقنية — أبيعك نتيجة",
          bodyText: "أبني لك الموقع الصحيح بالأداة الصحيحة. استشارة أولى مجانية لمشروعك عبر thekatanani.com.",
          visualCue: "صورة بروفايل محمد القطناني ورابط الموقع thekatanani.com",
        },
      ]),
    },
  })

  // X (Twitter) Version (Thread)
  await prisma.postVersion.create({
    data: {
      postId: post1.id,
      platform: "X",
      content: `1/4 أغلب المتاجر الإلكترونية تقع في فخ تثبيت عشرات التطبيقات الجاهزة، فتتحول تجربة التصفح إلى كابوس بطيء يهرب بسببه الزبائن.
إليك كيف حللنا معضلة الضمان والمخزون في متجر جيباس العراق بذكاء 👇
---
2/4 بدلاً من حشو كود الثيم بـ Liquid scripts تبطئ المتجر، طورنا تطبيق شوبيفاي مخصص بـ Remix و Shopify GraphQL API و PostgreSQL.
التطبيق يعالج تسجيل ضمان الأجهزة ومزامنة المخازن في السيرفر خارج كود المتجر الرئيسي.
---
3/4 النتيجة: المتجر يحافظ على سرعة قصوى، مع ربط مباشر مع Zoho Inventory ونظام إشعارات واتساب تلقائي للمشترين فور تأكيد الطلب.
---
4/4 كود نظيف + معمارية صحيحة = تجربة مستخدم سريعة تضاعف المبيعات.
توثيق دراسة الحالة كاملة متاح في البورتفوليو: thekatanani.com`,
      hashtags: JSON.stringify(["Nextjs", "Shopify", "Remix", "SoftwareEngineering"]),
      status: "APPROVED",
    },
  })

  // 7. Seed Real Leads / Business Opportunities directly attributed to thekatanani.com
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
    {
      contactName: "إدارة التطوير",
      company: "شركة ماهسري للتجديدات والترميم",
      role: "فريق الإدارة والعمليات",
      sourcePlatform: "UPWORK",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$4,200",
      notes: "إعادة بناء منصة الشركة ومتجر مواد التشطيب بـ Wix Studio و Velo مع تقييم 5.0 كامل والتزام تام بالمواعيد.",
    },
    {
      contactName: "محمد أنور",
      company: "أعمال الموشن جرافيك والمونتاج",
      role: "مخرج موشن جرافيك ومونتير فيديو",
      sourcePlatform: "LINKEDIN",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$1,800",
      notes: "بورتفوليو سينمائي تفاعلي عالي الأداء بـ Next.js، وتقييم 5.0 موثق على LinkedIn.",
    },
    {
      contactName: "رياض أ.",
      company: "مكتب استشارات قانونية ومحكم دولي",
      role: "مستشار قانوني ورائد أعمال (السعودية)",
      sourcePlatform: "KHAMSAT",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$1,500",
      notes: "موقع بورتفوليو شخصي بـ Next.js مع RTL كامل وسرعة فائقة، تقييم 5.0 على خمسات.",
    },
    {
      contactName: "د. مروان العزاوي",
      company: "أكاديمية واستشارات الطيران",
      role: "رئيس الأكاديمية واستشاري طيران",
      sourcePlatform: "DIRECT",
      type: "FREELANCE_CLIENT",
      status: "CLOSED",
      estimatedValue: "$5,000",
      notes: "منصة رقمية سنمائية وتفاعلية متقدمة لأكاديمية تدريب طياري الهليكوبتر بـ Next.js 16 و GSAP.",
    },
    {
      contactName: "David Miller",
      company: "Apex Tech Ventures (London / Remote)",
      role: "VP of Engineering",
      sourcePlatform: "LINKEDIN",
      type: "RECRUITER_JOB",
      status: "INTERVIEW",
      estimatedValue: "$95,000 / yr",
      notes: "تواصل عبر رسائل لينكد إن بعد قراءة مقال معمارية Next.js App Router على thekatanani.com لمقابلة مهندس نظم متقدم.",
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

  // 8. Connected accounts setup
  const socialAccounts = [
    {
      platform: "LINKEDIN",
      accountName: "Mohammed Katanani (محمد القطناني)",
      profileUrl: "https://linkedin.com",
      isConnected: true,
    },
    {
      platform: "INSTAGRAM",
      accountName: "@katanani.tech",
      profileUrl: "https://thekatanani.com",
      isConnected: true,
    },
    {
      platform: "X",
      accountName: "@mkatanani_dev",
      profileUrl: "https://thekatanani.com",
      isConnected: true,
    },
  ]

  for (const acc of socialAccounts) {
    await prisma.socialAccount.create({
      data: {
        ...acc,
        userId: user.id,
      },
    })
  }

  console.log("✅ Database successfully seeded with 100% authentic data from thekatanani.com!")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
