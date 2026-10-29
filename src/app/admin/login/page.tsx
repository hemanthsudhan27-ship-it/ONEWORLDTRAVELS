import { Lock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { login } from './actions'

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const error = params?.error

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-center items-center p-6 text-zinc-900">
      <div className="w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 sm:p-10 shadow-xl shadow-zinc-200/50 relative overflow-hidden">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-center text-[#C4171A] mb-6 shadow-sm">
          <Lock className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold font-serif text-zinc-900 mb-1">
          One World Admin
        </h1>
        <p className="text-xs text-zinc-500 mb-8">
          Sign in to manage traveler reviews and website gallery photos.
        </p>

        <form action={login} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="admin@example.com"
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A] focus:ring-2 focus:ring-[#C4171A]/20 transition-all"
              autoFocus
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-zinc-700 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full bg-zinc-50 border border-zinc-300 rounded-xl px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#C4171A] focus:ring-2 focus:ring-[#C4171A]/20 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
              {decodeURIComponent(error)}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl font-medium text-sm text-white bg-[#C4171A] hover:bg-[#A31316] transition-colors shadow-lg shadow-[#C4171A]/25 flex items-center justify-center gap-2"
          >
            Sign In to Admin Panel
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-medium text-zinc-500 hover:text-[#C4171A] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Go Back to Site
          </Link>
          <span className="text-[11px] text-zinc-400 font-mono">One World Travel</span>
        </div>
      </div>
    </div>
  )
}

