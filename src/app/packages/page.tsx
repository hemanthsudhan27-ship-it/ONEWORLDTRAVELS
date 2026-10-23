import type { Metadata } from 'next'
import JourneysPageClient from '@/app/journeys/JourneysPageClient'

export const metadata: Metadata = {
  title: 'Packages — One World Travel & Tours',
  description:
    'Explore our curated collection of verified travel packages — Himalayan treks, Rajasthan culture, Kerala backwaters, Umrah, Thailand, Bali, and more. Filter by destination, category, and duration.',
  alternates: { canonical: 'https://oneworld.travel/packages' },
  openGraph: {
    title: 'Tour Packages — One World Travel',
    description: 'Browse our collection of verified holiday and pilgrimage packages.',
    url: 'https://oneworld.travel/packages',
  },
}

export default function PackagesPage() {
  return <JourneysPageClient />
}
