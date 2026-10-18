'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminGalleryRedirect() {
  const router = useRouter()
  useEffect(() => {
    router.replace('/admin?tab=gallery')
  }, [router])

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center text-zinc-500 text-sm">
      Loading Moments Gallery Manager...
    </div>
  )
}
