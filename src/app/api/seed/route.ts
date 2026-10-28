import { NextResponse } from "next/server"
import { seedDatabase } from "@/lib/seed-data"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const result = await seedDatabase()
    return NextResponse.json({ success: true, message: "Database seeded successfully!", result })
  } catch (error: any) {
    console.error("Seed API error:", error)
    return NextResponse.json({ success: false, error: error?.message || "Seed failed" }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
