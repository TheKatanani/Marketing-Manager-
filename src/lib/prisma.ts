import { PrismaClient } from "@prisma/client"

// Dynamic resolver: Find the real PostgreSQL URL regardless of prefix
function resolveDatabaseUrl(): string | undefined {
  // If DATABASE_URL is already a valid postgres string, use it
  if (
    process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith("postgres://") ||
      process.env.DATABASE_URL.startsWith("postgresql://") ||
      process.env.DATABASE_URL.startsWith("prisma+postgres://"))
  ) {
    return process.env.DATABASE_URL
  }

  // Otherwise search across all environment variables for any PostgreSQL connection string
  for (const [key, val] of Object.entries(process.env)) {
    if (
      val &&
      (val.startsWith("postgres://") ||
        val.startsWith("postgresql://") ||
        val.startsWith("prisma+postgres://"))
    ) {
      return val
    }
  }

  return process.env.DATABASE_URL
}

const activeDbUrl = resolveDatabaseUrl()
if (activeDbUrl) {
  process.env.DATABASE_URL = activeDbUrl
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasourceUrl: activeDbUrl,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
