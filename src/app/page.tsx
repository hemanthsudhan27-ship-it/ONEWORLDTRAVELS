import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import OurStorySection from '@/components/home/OurStorySection'
import DestinationsSection from '@/components/home/DestinationsSection'
import JourneysSection from '@/components/home/JourneysSection'
import ExperiencesSection from '@/components/home/ExperiencesSection'
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection'
import TestimonialSection from '@/components/home/TestimonialSection'
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export const metadata: Metadata = {
  title: 'One World Travel — Curated Journeys for Curious Minds',
  description:
    'One World crafts curated journeys to the Himalayas, Rajasthan, Kerala, Morocco, Japan and beyond. Premium, intentional travel for people who want to experience more.',
  alternates: { canonical: 'https://oneworld.travel' },
  openGraph: {
    title: 'One World Travel — Curated Journeys for Curious Minds',
    description: 'Curated journeys for people who want to experience more.',
    url: 'https://oneworld.travel',
    images: [{ url: '/images/hero-himalaya.jpg', width: 1200, height: 630, alt: 'Himalayan journey — One World Travel' }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full-screen immersive opening */}
      <HeroSection />

      {/* 2. Our Story — brand positioning */}
      <OurStorySection />

      {/* 3. Destinations — curated destination grid */}
      <DestinationsSection />

      {/* 4. Journeys — featured journey cards */}
      <JourneysSection />

      {/* 5. Experiences — what makes journeys special */}
      <ExperiencesSection />

      {/* 6. Why Choose Us — trust building (from me-trip-holidays architecture) */}
      <WhyChooseUsSection />

      {/* 7. Testimonials — social proof */}
      <TestimonialSection />

      {/* 8. Gallery Preview — visual anthology (from me-trip-holidays architecture) */}
      <GalleryPreviewSection />

      {/* 9. Final CTA — WhatsApp enquiry */}
      <FinalCTASection />
    </>
  )
}
