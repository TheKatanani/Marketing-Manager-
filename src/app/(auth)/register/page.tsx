"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/actions/auth-actions"
import { Rocket, Lock, Mail, User, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function RegisterPage() {
  const router = useRouter()
  const { isRtl } = useLanguage()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await registerUser({ name, email, password })
    setLoading(false)

    if (res.success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      setError(res.error || (isRtl ? "فشل إنشاء الحساب" : "Failed to create account"))
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
              {isRtl ? "محمد القطناني" : "BrandPilot"}
            </span>
            <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#D2E5F0] text-[#0A4D68]">
              AI
            </span>
          </div>
          <p className="text-xs text-[#5E6C8E]">
            {isRtl
              ? "إنشاء حسابك لإدارة قسم التسويق الذكي المخصص لخبراتك"
              : "Create your account to manage your AI marketing department"}
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white border border-[#D2E5F0] rounded-2xl p-6 shadow-md space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "الاسم الكامل" : "Full Name"}
              </label>
              <div className="relative">
                <User className="h-4 w-4 text-[#5E6C8E] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isRtl ? "مثال: محمد القطناني" : "e.g. Mohammed Katanani"}
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#F5F9FC] border border-[#D2E5F0] text-xs text-[#2B3451] focus:outline-none focus:border-[#0A4D68]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5E6C8E] mb-1">
                {isRtl ? "البريد الإلكتروني" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="h-4 w-4 text-[#5E6C8E] absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRtl ? "thekatanani@gmail.com" : "thekatanani@gmail.com"}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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
              <span>{loading ? (isRtl ? "جارٍ إنشاء الحساب..." : "Creating Account...") : (isRtl ? "إنشاء الحساب" : "Create Account")}</span>
              <ArrowIcon className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-[#5E6C8E]">
            {isRtl ? "لديك حساب بالفعل؟ " : "Already have an account? "}
            <Link href="/login" className="text-[#0A4D68] hover:underline font-bold">
              {isRtl ? "تسجيل الدخول" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
