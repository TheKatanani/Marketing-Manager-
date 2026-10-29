import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { ensureDatabaseSeeded } from "@/lib/seed-data"
export async function POST() {
  const session = await auth()
  if (session?.user?.email !== "mohammed@thekatanani.com") return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  if (process.env.BRANDPILOT_BOOTSTRAP !== "true") return NextResponse.json({ error: "Bootstrap is disabled" }, { status: 403 })
  return NextResponse.json(await ensureDatabaseSeeded())
}
