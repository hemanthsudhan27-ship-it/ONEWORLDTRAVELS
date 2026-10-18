'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminReviewsRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
      Loading Reviews Manager...
    </div>
  )
}
