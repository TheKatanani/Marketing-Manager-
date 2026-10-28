"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Locale = "ar" | "en"

export interface TranslationDictionary {
  appName: string
  appSub: string
  humanInTheLoop: string
  strictFacts: string
  addProject: string
  generateIdeas: string
  signOut: string
  directorRole: string
  engineStatus: string
  engineStatusDesc: string
  decisionMode: string
  directorSignoff: string
  
  // Navigation
  navOverview: string
  navBlog: string
  navStrategy: string
  navProjects: string
  navIdeas: string
  navContent: string
  navReview: string
  navCalendar: string
  navCampaigns: string
  navAnalytics: string
  navAccounts: string
  navSettings: string

  // Dashboard Page
  welcomeTitle: string
  welcomeSub: string
  kpiCampaigns: string
  kpiProjects: string
  kpiApprovals: string
  kpiScheduled: string
  kpiLeads: string
  quickActions: string
  quickAction1Title: string
  quickAction1Desc: string
  quickAction2Title: string
  quickAction2Desc: string
  quickAction3Title: string
  quickAction3Desc: string
  recentActivity: string
  recentActivitySub: string
  platformReach: string
  platformReachSub: string

  // Common UI
  language: string
  currentLang: string
  otherLang: string
  viewAll: string
  createIdea: string
  approve: string
  reject: string
  edit: string
  save: string
  cancel: string
  back: string
  searchPlaceholder: string
  filterAll: string
  loading: string
  success: string

  // Strategy & Brand
  brandCenterTitle: string
  brandCenterSub: string
  coreServices: string
  targetAudiences: string
  toneOfVoice: string
  positioningPillars: string
  
  // Projects
  projectsTitle: string
  projectsSub: string
  newProjectTitle: string
  challengeLabel: string
  solutionLabel: string
  metricsLabel: string
  techStackLabel: string
  
  // Ideas & Studio
  ideasTitle: string
  ideasSub: string
  studioTitle: string
  studioSub: string
  reviewTitle: string
  reviewSub: string
  calendarTitle: string
  calendarSub: string
  campaignsTitle: string
  campaignsSub: string
  analyticsTitle: string
  analyticsSub: string
  accountsTitle: string
  accountsSub: string
  settingsTitle: string
  settingsSub: string
  blogTitle: string
  blogSub: string
}

export const translations: Record<Locale, TranslationDictionary> = {
  ar: {
    appName: "محمد القطناني",
    appSub: "thekatanani.com",
    humanInTheLoop: "وضع التدقيق البشري",
    strictFacts: "حقائق thekatanani.com الموثقة 100%",
    addProject: "+ إضافة دراسة حالة",
    generateIdeas: "توليد أفكار المحتوى",
    signOut: "تسجيل الخروج",
    directorRole: "محمد القطناني (المدير)",
    engineStatus: "محرك الذكاء الاصطناعي",
    engineStatusDesc: "مسارات الذكاء الاصطناعي تعتمد حصرياً على حقائق ومشاريع thekatanani.com بدون أي فبركة.",
    decisionMode: "آلية النشر",
    directorSignoff: "اعتماد المدير (محمد القطناني)",
    
    // Navigation
    navOverview: "لوحة القيادة والمولد الذكي",
    navBlog: "مدونة معرض الأعمال",
    navStrategy: "هوية البراند والاستراتيجية",
    navProjects: "قاعدة معرفة thekatanani.com",
    navIdeas: "مختبر الأفكار الذكية",
    navContent: "استوديو صناعة المحتوى",
    navReview: "قائمة المراجعة والاعتماد",
    navCalendar: "التقويم التحريري",
    navCampaigns: "الحملات التسويقية",
    navAnalytics: "الأداء وعروض العمل",
    navAccounts: "المنصات المتصلة",
    navSettings: "الإعدادات",

    // Dashboard Page
    welcomeTitle: "غرفة قيادة التسويق لمحمد القطناني",
    welcomeSub: "بناء الحضور الاحترافي كمطور يحل مشاكل الأعمال: Next.js و React و Shopify و WordPress، وفق فلسفة: لا أبيعك تقنية — أبيعك نتيجة.",
    kpiCampaigns: "الحملات النشطة",
    kpiProjects: "دراسات الحالة الموثقة",
    kpiApprovals: "بانتظار موافقتك",
    kpiScheduled: "منشورات مجدولة",
    kpiLeads: "عروض العمل والعملاء الموثقة",
    quickActions: "إجراءات سريعة ومباشرة",
    quickAction1Title: "إضافة إنجاز أو دراسة حالة جديدة",
    quickAction1Desc: "إدخال المشاكل التقنية والحلول والأرقام الحقيقية لتغذية محتواك بمصداقية مطلقة",
    quickAction2Title: "توليد زوايا وأفكار تسويقية",
    quickAction2Desc: "تشغيل باحث الذكاء الاصطناعي لاقتراح زوايا تناسب مدراء التوظيف وأصحاب المشاريع",
    quickAction3Title: "مراجعة واعتماد مسودات المحتوى",
    quickAction3Desc: "مراجعة نصوص المنشورات وتخصيصها لمنصات لينكد إن، إنستغرام، وإكس قبل جدولتها",
    recentActivity: "أحدث مسودات ومشاريع المحتوى",
    recentActivitySub: "المحتوى المجهز للنشر عبر منصاتك المختلفة",
    platformReach: "التوزيع حسب المنصات",
    platformReachSub: "توزيع المحتوى الذكي على القنوات المستهدفة",

    // Common UI
    language: "اللغة",
    currentLang: "العربية",
    otherLang: "English",
    viewAll: "عرض الكل",
    createIdea: "فكرة جديدة",
    approve: "موافقة واعتماد",
    reject: "رفض",
    edit: "تعديل",
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    back: "رجوع",
    searchPlaceholder: "بحث في مشاريع thekatanani.com، الأفكار، المنشورات...",
    filterAll: "الكل",
    loading: "جارٍ التحميل...",
    success: "تم بنجاح",

    // Strategy & Brand
    brandCenterTitle: "مركز الهوية والاستراتيجية — thekatanani.com",
    brandCenterSub: "تطوير مخصص بـ Next.js و React و Vue، وتنفيذ عبر WordPress و Shopify و Wix.",
    coreServices: "الخدمات التقنية الرئيسية",
    targetAudiences: "الجمهور والعملاء المستهدفون",
    toneOfVoice: "نبرة الصوت وأسلوب الطرح",
    positioningPillars: "ركائز التموضع المهني",
    
    // Projects
    projectsTitle: "قاعدة معرفة المشاريع والخبرات — thekatanani.com",
    projectsSub: "سجل حقائق وإنجازات مشاريعك الواقعية؛ المصدر الوحيد الذي يعتمد عليه الذكاء الاصطناعي.",
    newProjectTitle: "إضافة دراسة حالة جديدة",
    challengeLabel: "التحدي أو المشكلة الواقعية",
    solutionLabel: "الحل التقني المنفذ",
    metricsLabel: "الأرقام والنتائج المحققة",
    techStackLabel: "التقنيات المستخدمة",
    
    // Ideas & Studio
    ideasTitle: "مختبر الأفكار التسويقية",
    ideasSub: "تحويل الخبرات والدروس المستفادة إلى أفكار محتوى قوية بمعدل تفاعل عالي.",
    studioTitle: "استوديو صناعة وصياغة المحتوى",
    studioSub: "صياغة منشورات احترافية مخصصة لكل منصة (لينكد إن، إنستغرام، إكس) بأسلوب مقنع.",
    reviewTitle: "قائمة الاعتماد البشري (Approval Queue)",
    reviewSub: "أنت المدير التنفيذي: راجع كل منشور، عدل عليه، أو اعتمده بضغطة زر.",
    calendarTitle: "التقويم التحريري وجدولة النشر",
    calendarSub: "توزيع متوازن للمحتوى يضمن حضورك الدائم أمام مسؤولي التوظيف والعملاء.",
    campaignsTitle: "الحملات التسويقية الاستراتيجية",
    campaignsSub: "تنظيم الجهود لتحقيق أهداف محددة (مثل الحصول على وظيفة ريموت، أو جذب 3 عملاء فريلانس).",
    analyticsTitle: "قياس العائد وفرص العمل (Leads)",
    analyticsSub: "ربط كل منشور بالنتائج الحقيقية: استفسارات التوظيف، مقابلات العمل، والمشاريع الجديدة.",
    accountsTitle: "الحسابات والمنصات المتصلة",
    accountsSub: "ربط حساباتك في LinkedIn و Instagram و X لنشر المحتوى وإدارته بسهولة.",
    settingsTitle: "إعدادات الحساب والنظام",
    settingsSub: "إدارة تفضيلات الذكاء الاصطناعي، مفاتيح الـ API، والملف الشخصي.",
    blogTitle: "مقالات ومدونة معرض الأعمال",
    blogSub: "كتابة وإدارة مقالات المدونة حسب التصنيف مع التوليد الذكي والنسخ السريع كـ Markdown.",
  },
  en: {
    appName: "Mohammed Katanani",
    appSub: "thekatanani.com",
    humanInTheLoop: "Human-in-the-Loop Mode",
    strictFacts: "100% Verified thekatanani.com Facts",
    addProject: "+ Add Case Study",
    generateIdeas: "Generate Content Ideas",
    signOut: "Sign out",
    directorRole: "Mohammed Katanani (Director)",
    engineStatus: "AI Engine Status",
    engineStatusDesc: "AI workflows run strictly on verified case studies and real data from thekatanani.com.",
    decisionMode: "Publishing Mechanism",
    directorSignoff: "Director Approval (Mohammed Katanani)",
    
    // Navigation
    navOverview: "Command & Fast Creator",
    navBlog: "Portfolio Blog",
    navStrategy: "Brand & Strategy",
    navProjects: "Project Knowledge Base",
    navIdeas: "AI Idea Lab",
    navContent: "Content Studio",
    navReview: "Approval Queue",
    navCalendar: "Editorial Calendar",
    navCampaigns: "Marketing Campaigns",
    navAnalytics: "Performance & Leads",
    navAccounts: "Connected Accounts",
    navSettings: "Settings",

    // Dashboard Page
    welcomeTitle: "Executive Marketing Command Center",
    welcomeSub: "Position yourself as an engineer who solves high-impact business problems to attract remote roles and high-value freelance clients.",
    kpiCampaigns: "Active Campaigns",
    kpiProjects: "Verified Projects",
    kpiApprovals: "Pending Approvals",
    kpiScheduled: "Scheduled Posts",
    kpiLeads: "Recruiter Inquiries",
    quickActions: "Quick Actions",
    quickAction1Title: "Add Engineering Project",
    quickAction1Desc: "Feed real technical achievements and metrics into the verified knowledge base",
    quickAction2Title: "Generate Angle Matrix",
    quickAction2Desc: "Run the AI Researcher to brainstorm platform-specific hooks and positioning angles",
    quickAction3Title: "Review AI Drafts",
    quickAction3Desc: "Human-in-the-loop review before publishing to LinkedIn, Instagram, or X",
    recentActivity: "Recent Content Drafts & Assets",
    recentActivitySub: "Multi-platform drafts staged for publishing and review",
    platformReach: "Platform Distribution",
    platformReachSub: "Strategic content allocation across your core growth channels",

    // Common UI
    language: "Language",
    currentLang: "English",
    otherLang: "العربية",
    viewAll: "View All",
    createIdea: "Create New Idea",
    approve: "Approve",
    reject: "Reject",
    edit: "Edit",
    save: "Save Changes",
    cancel: "Cancel",
    back: "Back",
    searchPlaceholder: "Search projects, ideas, posts...",
    filterAll: "All",
    loading: "Loading...",
    success: "Success",

    // Strategy & Brand
    brandCenterTitle: "Brand & Strategy Center",
    brandCenterSub: "Define your technical services, target audiences, tone of voice, and competitive edge.",
    coreServices: "Core Technical Services",
    targetAudiences: "Target Audiences & Personas",
    toneOfVoice: "Tone of Voice & Messaging",
    positioningPillars: "Positioning Pillars",
    
    // Projects
    projectsTitle: "Project Knowledge Base",
    projectsSub: "Your factual repository of real engineering case studies. The only ground truth for AI.",
    newProjectTitle: "Add New Case Study",
    challengeLabel: "Real-World Business Challenge",
    solutionLabel: "Technical Architecture & Implementation",
    metricsLabel: "Verified Results & Metrics",
    techStackLabel: "Technologies & Stack",
    
    // Ideas & Studio
    ideasTitle: "AI Idea Lab",
    ideasSub: "Transform technical challenges and lessons into high-engagement content angles.",
    studioTitle: "Content Studio",
    studioSub: "Tailor posts for LinkedIn, Instagram, and X without copy-pasting generic blurbs.",
    reviewTitle: "Approval Queue",
    reviewSub: "You are the Marketing Director. Edit, regenerate, approve, or reject every post.",
    calendarTitle: "Editorial Calendar",
    calendarSub: "Maintain consistent thought leadership cadence across your active channels.",
    campaignsTitle: "Marketing Campaigns",
    campaignsSub: "Align content initiatives with core milestones (Remote Job Search, High-Ticket Freelance).",
    analyticsTitle: "Performance & Business Attribution",
    analyticsSub: "Track post engagement directly to recruiter conversations, inbound leads, and contracts.",
    accountsTitle: "Connected Accounts",
    accountsSub: "Connect and monitor your LinkedIn, Instagram, and X publishing channels.",
    settingsTitle: "Account & Engine Settings",
    settingsSub: "Manage AI providers, API connections, and account parameters.",
    blogTitle: "Portfolio Blog & Articles",
    blogSub: "Draft and manage blog posts categorized by topic with instant AI drafting and Markdown export.",
  }
}

interface I18nContextType {
  locale: Locale
  setLocale: (loc: Locale) => void
  toggleLocale: () => void
  t: TranslationDictionary
  isRtl: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Default to Arabic as requested by user, but allow switching to English
  const [locale, setLocaleState] = useState<Locale>("ar")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const saved = localStorage.getItem("brandpilot_lang") as Locale | null
    if (saved && (saved === "ar" || saved === "en")) {
      setLocaleState(saved)
    }
  }, [])

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale
      document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"
      localStorage.setItem("brandpilot_lang", locale)
    }
  }, [locale])

  const setLocale = (loc: Locale) => {
    setLocaleState(loc)
  }

  const toggleLocale = () => {
    setLocaleState((prev) => (prev === "ar" ? "en" : "ar"))
  }

  const value: I18nContextType = {
    locale,
    setLocale,
    toggleLocale,
    t: translations[locale],
    isRtl: locale === "ar",
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useLanguage() {
  const context = useContext(I18nContext)
  if (!context) {
    // Fallback if rendered outside provider
    return {
      locale: "ar" as Locale,
      setLocale: () => {},
      toggleLocale: () => {},
      t: translations["ar"],
      isRtl: true,
    }
  }
  return context
}
