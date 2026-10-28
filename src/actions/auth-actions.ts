"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const authSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().optional(),
})

export async function registerUser(formData: { email: string; password: string; name?: string }) {
  try {
    const validated = authSchema.parse(formData)

    const existing = await prisma.user.findUnique({
      where: { email: validated.email },
    })

    if (existing) {
      return { success: false, error: "An account with this email already exists" }
    }

    const hashedPassword = await bcrypt.hash(validated.password, 10)

    const user = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name || validated.email.split("@")[0],
        password: hashedPassword,
      },
    })

    return { success: true, user: { id: user.id, email: user.email, name: user.name } }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Registration failed"
    return { success: false, error: message }
  }
}

export async function getCurrentUser() {
  try {
    let user = await prisma.user.findFirst({
      where: { email: "mohammed@thekatanani.com" },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
      },
    })

    if (!user) {
      user = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          name: true,
          image: true,
        },
      })
    }

    return user
  } catch (error) {
    console.error("Error retrieving user:", error)
    return null
  }
}
