'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  // When on any admin page, do not render public Navbar, Footer, or WhatsApp widget
  if (isAdmin) {
    return <main className="min-h-screen bg-white">{children}</main>
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
