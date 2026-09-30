import type { Metadata } from 'next'
import JourneysPageClient from './JourneysPageClient'

export const metadata: Metadata = {
  title: 'Journeys — Every Journey Tells a Story',
  description:
    'Explore our curated collection of premium travel journeys — Himalayan treks, Rajasthan culture, Kerala backwaters, Moroccan desert, and more. Filter by destination, duration, and travel style.',
  alternates: { canonical: 'https://oneworld.travel/journeys' },
  openGraph: {
    title: 'One World Journeys — Curated Travel Experiences',
    description: 'Browse our collection of premium curated travel journeys.',
    url: 'https://oneworld.travel/journeys',
  },
}

export default function JourneysPage() {
  return <JourneysPageClient />
}
