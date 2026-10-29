import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "the-katanani-brandpilot-secret-prod-2026-key",
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        let user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user) {
          if (
            (credentials.email === "mohammed@thekatanani.com" || credentials.email === "demo@brandpilot.ai") &&
            credentials.password === "password123"
          ) {
            try {
              const { ensureDatabaseSeeded } = await import("@/lib/seed-data")
              await ensureDatabaseSeeded()
              user = await prisma.user.findUnique({
                where: { email: credentials.email as string },
              })
            } catch (err) {
              console.error("Auto-seed on first login failed:", err)
            }
          }
        }

        if (!user || !user.password) return null

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
