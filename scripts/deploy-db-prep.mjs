import { execSync } from "node:child_process"

// 1. Detect DB URL from various potential Vercel / Prisma Postgres env variables
const dbUrl =
  process.env.DATABASE_URL ||
  process.env.STORAGE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL ||
  process.env.PRISMA_DATABASE_URL

if (dbUrl && !dbUrl.startsWith("file:")) {
  process.env.DATABASE_URL = dbUrl
  console.log("🚀 [Deploy DB Prep] PostgreSQL connection string detected.")
  console.log("⚙️  [Deploy DB Prep] Syncing Prisma schema to database...")

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
  console.log("ℹ️  [Deploy DB Prep] Skipping remote PostgreSQL sync (local or no remote DB URL).")
}
