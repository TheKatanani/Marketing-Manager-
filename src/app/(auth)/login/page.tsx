"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Rocket, Lock, Mail, ArrowRight, AlertCircle, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import { signIn } from "next-auth/react"
import { loginWithCredentials, loginAsDirector } from "@/actions/auth-actions"

export default function LoginPage() {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [email, setEmail] = useState("mohammed@thekatanani.com")
  const [password, setPassword] = useState("password123")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await signIn("credentials", {
        email: email.trim(),
        password: password.trim(),
        redirect: false,
      })

      if (res?.error) {
        // Fallback to server action
        const formData = new FormData()
        formData.append("email", email.trim())
        formData.append("password", password.trim())
        const saRes = await loginWithCredentials(formData)
        if (saRes?.error) {
          setError(isRtl ? "بيانات الدخول غير صحيحة. يرجى التأكد من البريد وكلمة المرور." : "Invalid credentials")
          setLoading(false)
          return
        }
      }

      window.location.href = "/dashboard"
    } catch (err: unknown) {
      console.error("Login failed:", err)
      setError(isRtl ? "فشل تسجيل الدخول. يرجى التحقق من البيانات." : "Sign in failed. Please check credentials.")
      setLoading(false)
    }
  }

  const handleDemoSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await signIn("credentials", {
        email: "mohammed@thekatanani.com",
        password: "password123",
        redirect: false,
      })

      if (res?.error) {
        const saRes = await loginAsDirector()
        if (saRes?.error) {
          setError(isRtl ? "فشل الدخول التلقائي" : "Auto sign-in failed")
          setLoading(false)
          return
        }
      }

      window.location.href = "/dashboard"
    } catch (err) {
      console.error("Demo login error:", err)
      window.location.href = "/dashboard"
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F9FC] flex flex-col justify-center items-center px-4 py-12 text-[#2B3451]">
      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="h-12 w-12 rounded-2xl bg-[#0A4D68] flex items-center justify-center mx-auto shadow-md shadow-[#0A4D68]/20">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <span className="text-xl font-extrabold tracking-tight text-[#0A4D68]">
              {isRtl ? "براند بايلوت" : "BrandPilot"}
            </span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#D2E5F0] text-[#0A4D68]">
              AI
            </span>
          </div>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl ? "تسجيل الدخول لإدارة فريقك التسويقي الذكي" : "Sign in to manage your AI marketing department"}
          </p>
        </div>

        {/* Fast-Track Card */}
        <div className="p-4 rounded-xl bg-[#EBF4F9] border border-[#D2E5F0] space-y-2 text-center">
          <div className="text-xs font-bold text-[#0A4D68] flex items-center justify-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#0A4D68]" />
            <span>{isRtl ? "الدخول السريع (محمد القطناني)" : "Quick Director Access"}</span>
          </div>
          <p className="text-[11px] text-[#5E6C8E]">
            {isRtl
              ? "مجهز مسبقاً بحساب محمد القطناني و8 دراسات حالة موثقة من thekatanani.com."
              : "Pre-configured with Mohammed Katanani and 8 verified case studies from thekatanani.com."}
          </p>
          <button
            onClick={handleDemoSignIn}
            disabled={loading}
            className="w-full py-2 px-3 rounded-lg text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 cursor-pointer"
          >
            {isRtl ? "دخول فوري بنقرة واحدة" : "Instant Director Sign In (1-Click)"}
          </button>
        </div>

        {/* Sign In Form */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 shadow-md space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-[#5E6C8E] absolute left-3 top-2.5" />
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <Lock className="h-4 w-4 text-[#5E6C8E] absolute left-3 top-2.5" />
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-[#0A4D68] hover:bg-[#07384C] text-white transition-all shadow-sm shadow-[#0A4D68]/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? (isRtl ? "جارٍ تسجيل الدخول..." : "Signing in...") : (isRtl ? "تسجيل الدخول" : "Sign In to BrandPilot")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
