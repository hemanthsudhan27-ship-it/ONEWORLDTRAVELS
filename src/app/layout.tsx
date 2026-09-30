import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://oneworld.travel'),
  title: {
    template: '%s · One World Travel',
    default: 'One World Travel — Curated Journeys for Curious Minds',
  },
  description:
    'One World crafts curated journeys to the Himalayas, Rajasthan, Kerala, Morocco, Japan and beyond. Premium, intentional travel experiences for people who want to experience more.',
  keywords: ['luxury travel', 'curated journeys', 'India travel', 'Himalayan trek', 'Kerala backwaters', 'Rajasthan tours', 'premium travel agency'],
  authors: [{ name: 'One World Travel' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://oneworld.travel',
    siteName: 'One World Travel',
    title: 'One World Travel — Curated Journeys for Curious Minds',
    description: 'Curated journeys for people who want to experience more.',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630, alt: 'One World Travel' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One World Travel',
    description: 'Curated journeys for people who want to experience more.',
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
