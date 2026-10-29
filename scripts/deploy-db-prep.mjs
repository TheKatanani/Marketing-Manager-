import { execFileSync } from "node:child_process"
const isPostgres = (value) => /^(postgres(ql)?|prisma\+postgres):\/\//.test(value || "")
const databaseUrl = isPostgres(process.env.DATABASE_URL) ? process.env.DATABASE_URL : Object.values(process.env).find(isPostgres)
if (databaseUrl) {
  process.env.DATABASE_URL = databaseUrl
  // Additive schema changes only; refuse changes that lose data.
  execFileSync(process.execPath, ["node_modules/prisma/build/index.js", "db", "push", "--skip-generate"], { stdio: "inherit", env: process.env })
}
// Deployment must never reseed passwords, owner edits, or brand strategy.
