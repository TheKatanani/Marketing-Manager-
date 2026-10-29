import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

/** Both owner-provided sign-in aliases manage the same personal workspace. */
export async function getActiveUser() {
  const session = await auth()
  const email = session?.user?.email?.toLowerCase()
  if (!email) {
    const owner = await prisma.user.findFirst({ where: { email: "mohammed@thekatanani.com" } })
    if (owner) return owner
    return prisma.user.findFirst()
  }
  if (email === "demo@brandpilot.ai" || email === "mohammed@thekatanani.com") {
    const found = await prisma.user.findUnique({ where: { email: "mohammed@thekatanani.com" } })
    if (found) return found
    return prisma.user.findFirst({ where: { email: "demo@brandpilot.ai" } })
  }
  return prisma.user.findUnique({ where: { email } })
}
