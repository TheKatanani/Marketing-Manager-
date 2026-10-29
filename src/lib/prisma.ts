import { PrismaClient } from "@prisma/client"

// Dynamic resolver: Find the real PostgreSQL URL regardless of prefix
function resolveDatabaseUrl(): string | undefined {
  // Prioritize direct postgresql:// or postgres:// connection strings
  if (
    process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith("postgres://") ||
      process.env.DATABASE_URL.startsWith("postgresql://"))
  ) {
    return process.env.DATABASE_URL
  }

  for (const [key, val] of Object.entries(process.env)) {
    if (
      val &&
      (val.startsWith("postgres://") || val.startsWith("postgresql://"))
    ) {
      return val
    }
  }

  if (
    process.env.DATABASE_URL &&
    process.env.DATABASE_URL.startsWith("prisma+postgres://")
  ) {
    return process.env.DATABASE_URL
  }

  for (const [key, val] of Object.entries(process.env)) {
    if (val && val.startsWith("prisma+postgres://")) {
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
