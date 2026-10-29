import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/** Both owner-provided sign-in aliases manage the same personal workspace. */
export async function getActiveUser() {
  const session = await auth()
  const email = session?.user?.email?.toLowerCase()
  if (!email) return null
  if (email === "demo@brandpilot.ai" || email === "mohammed@thekatanani.com") {
    return prisma.user.findUnique({ where: { email: "mohammed@thekatanani.com" } })
  }
  return prisma.user.findUnique({ where: { email } })
}
