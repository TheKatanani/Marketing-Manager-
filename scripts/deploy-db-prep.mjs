import { execSync } from "node:child_process"

// Search across all environment variables for any real PostgreSQL connection string
function resolvePostgresUrl() {
  if (
    process.env.DATABASE_URL &&
    (process.env.DATABASE_URL.startsWith("postgres://") ||
      process.env.DATABASE_URL.startsWith("postgresql://") ||
      process.env.DATABASE_URL.startsWith("prisma+postgres://"))
  ) {
    return process.env.DATABASE_URL
  }

  for (const [key, val] of Object.entries(process.env)) {
    if (
      val &&
      (val.startsWith("postgres://") ||
        val.startsWith("postgresql://") ||
        val.startsWith("prisma+postgres://"))
    ) {
      console.log(`📡 [Deploy DB Prep] Found PostgreSQL URL in variable: ${key}`)
      return val
    }
  }

  return undefined
}

const dbUrl = resolvePostgresUrl()

if (dbUrl) {
  process.env.DATABASE_URL = dbUrl
  console.log("🚀 [Deploy DB Prep] PostgreSQL connection string resolved.")
  console.log("⚙️  [Deploy DB Prep] Syncing Prisma schema to remote PostgreSQL...")

  try {
    execSync("npx prisma db push --skip-generate --accept-data-loss", {
      stdio: "inherit",
      env: process.env,
    })
    console.log("✅ [Deploy DB Prep] Schema synced successfully!")
  } catch (err) {
    console.warn("⚠️  [Deploy DB Prep] db push notice:", err?.message || err)
  }

  // Seed authentic data from thekatanani.com
  try {
    console.log("🌱 [Deploy DB Prep] Seeding data from thekatanani.com...")
    execSync("npx tsx prisma/seed.ts", {
      stdio: "inherit",
      env: process.env,
    })
    console.log("✅ [Deploy DB Prep] Database seeded successfully!")
  } catch (err) {
    console.warn("⚠️  [Deploy DB Prep] seed notice:", err?.message || err)
  }
} else {
  console.log("ℹ️  [Deploy DB Prep] Skipping remote PostgreSQL sync (no remote postgres URL found).")
}
