"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Compass,
  Briefcase,
  Sparkles,
  PenTool,
  Calendar,
  Settings,
  LogOut,
  Rocket,
  Layers,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  BarChart3,
  Share2,
  Flag,
  ShieldCheck,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { t, isRtl } = useLanguage()

  const mainNavigation = [
    {
      name: isRtl ? "الرئيسية والمولد الذكي" : "Command & Fast Creator",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: isRtl ? "مدونة معرض الأعمال" : "Portfolio Blog",
      href: "/dashboard/blog",
      icon: BookOpen,
    },
    {
      name: isRtl ? "استوديو المحتوى والمسودات" : "Content Studio",
      href: "/dashboard/content",
      icon: PenTool,
    },
    {
      name: isRtl ? "بنك الأفكار والإلهام" : "Idea Lab & Angles",
      href: "/dashboard/ideas",
      icon: Sparkles,
    },
    {
      name: isRtl ? "دراسات الحالة (thekatanani)" : "Verified Projects Base",
      href: "/dashboard/projects",
      icon: Briefcase,
    },
    {
      name: isRtl ? "جدول ومواعيد النشر" : "Editorial Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
  ]

  const secondaryNavigation = [
    {
      name: isRtl ? "النتائج وعروض العمل" : "Attribution & Leads",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: isRtl ? "إعدادات المنصات والـ AI" : "Settings & Accounts",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  const ChevronIcon = isRtl ? ChevronLeft : ChevronRight

  return (
    <aside className="w-64 flex flex-col shrink-0 bg-white border-r border-[#D2E5F0] min-h-screen text-[#2B3451] select-none shadow-[2px_0_12px_rgba(10,77,104,0.03)] z-20">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-[#D2E5F0] gap-3 bg-[#FFFFFF]">
        <div className="h-9 w-9 rounded-xl bg-[#0A4D68] flex items-center justify-center shadow-md shadow-[#0A4D68]/20">
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[#0A4D68] tracking-tight text-base">
              {isRtl ? "محمد القطناني" : "M. Katanani"}
            </span>
            <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#D2E5F0] text-[#0A4D68]">
              AI
            </span>
          </div>
          <a
            href="https://thekatanani.com"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#5E6C8E] font-medium hover:text-[#0A4D68] hover:underline"
          >
            thekatanani.com
          </a>
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#5E6C8E]">
            {isRtl ? "القائمة الرئيسية" : "Main Navigation"}
          </div>
          <nav className="space-y-1">
            {mainNavigation.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname?.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#0A4D68] text-white font-bold shadow-sm shadow-[#0A4D68]/20"
                      : "text-[#2B3451] hover:text-[#0A4D68] hover:bg-[#EBF4F9]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-[#0A4D68] group-hover:text-[#0A4D68]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {isActive ? (
                    <ChevronIcon className="h-3.5 w-3.5 text-white/90" />
                  ) : null}
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-[#5E6C8E]">
            {isRtl ? "الأدوات والإعدادات" : "Tools & Settings"}
          </div>
          <nav className="space-y-1">
            {secondaryNavigation.map((item) => {
              const isActive = pathname?.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#0A4D68] text-white font-bold shadow-sm shadow-[#0A4D68]/20"
                      : "text-[#5E6C8E] hover:text-[#0A4D68] hover:bg-[#EBF4F9]"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-white" : "text-[#5E6C8E] group-hover:text-[#0A4D68]"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {isActive ? (
                    <ChevronIcon className="h-3.5 w-3.5 text-white/90" />
                  ) : null}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Workflow Engine Guardrail Card */}
        <div className="p-3.5 rounded-xl bg-[#F5F9FC] border border-[#D2E5F0] space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#0A4D68]" />
            <span className="text-xs font-bold text-[#0A4D68]">
              {t.engineStatus}
            </span>
          </div>
          <p className="text-[11px] text-[#5E6C8E] leading-relaxed">
            {t.engineStatusDesc}
          </p>
        </div>
      </div>

      {/* User / Director Footer */}
      <div className="p-3 border-t border-[#D2E5F0] bg-[#FFFFFF]">
        <div className="flex items-center justify-between p-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-8 w-8 rounded-full bg-[#0A4D68] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
              MK
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#2B3451] truncate">
                Mohammed Katanani
              </span>
              <span className="text-[10px] text-[#0A4D68] font-medium truncate">
                {t.directorRole}
              </span>
            </div>
          </div>
          <Link
            href="/login"
            title={t.signOut}
            className="p-1.5 text-[#5E6C8E] hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
