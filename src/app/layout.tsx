import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "BrandPilot AI — Personal AI Marketing Department",
  description:
    "Turn real-world engineering case studies and technical problem-solving into authentic, high-impact content across LinkedIn, Instagram, and X.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-[#F5F9FC] text-[#2B3451] flex flex-col font-sans`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
