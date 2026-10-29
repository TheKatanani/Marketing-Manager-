import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardTopbar } from "@/components/dashboard/topbar"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session?.user) redirect("/login")
  return (
    <div className="flex min-h-screen bg-[#F5F9FC] text-[#2B3451]">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />
        <main className="flex-1 p-5 md:p-8 max-w-7xl w-full mx-auto space-y-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
