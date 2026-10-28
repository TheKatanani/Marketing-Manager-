import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed-data"

export const dynamic = "force-dynamic"

export async function GET() {
  const dbKeys = Object.keys(process.env).filter((k) =>
    k.includes("DATA") || k.includes("POSTGRES") || k.includes("STORAGE") || k.includes("PRISMA") || k.includes("URL")
  )
  const envDebug = dbKeys.map((k) => ({
    key: k,
    prefix: process.env[k]?.slice(0, 15),
  }))

  try {
    const result = await seedDatabase()
    return NextResponse.json({ success: true, message: "Database seeded successfully!", envDebug, result })
  } catch (error: any) {
    console.error("Seed API error:", error)
    return NextResponse.json({
      success: false,
      error: error?.message || "Seed failed",
      envDebug,
    }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
