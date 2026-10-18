import type { Metadata } from 'next'
import HeroSection from '@/components/home/HeroSection'
import ServicesSection from '@/components/home/ServicesSection'
import JourneysSection from '@/components/home/JourneysSection'
import ExperiencesSection from '@/components/home/ExperiencesSection'
import WhyChooseUsSection from '@/components/home/WhyChooseUsSection'
import OurStorySection from '@/components/home/OurStorySection'
import TestimonialSection from '@/components/home/TestimonialSection'
import GalleryPreviewSection from '@/components/home/GalleryPreviewSection'
import FinalCTASection from '@/components/home/FinalCTASection'

export const metadata: Metadata = {
  title: 'One World Travel & Tours — Curated Holiday Packages, Umrah & Global Travel Services',
  description:
    'One World Travel & Tours, Puthiyara, Calicut. IATA-accredited agency offering flight ticketing, worldwide hotel booking, Umrah pilgrimage packages, customized holidays, visa assistance, and luxury cruises.',
  alternates: { canonical: 'https://oneworld.travel' },
  openGraph: {
    title: 'One World Travel & Tours — Holiday Packages, Umrah & Travel Solutions',
    description: 'IATA-accredited travel agency based in Calicut, Kerala. Flight booking, Umrah, custom holiday packages, visas, and luxury cruises.',
    url: 'https://oneworld.travel',
    images: [{ url: '/images/hero-himalaya.jpg', width: 1200, height: 630, alt: 'One World Travel & Tours' }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — immersive opening with Quick Travel Finder & Package strip */}
      <HeroSection />

      {/* 2. Core Travel Services — Flights, Hotels, Umrah, Visas, Holidays, Cruises */}
      <ServicesSection />

      {/* 3. Featured Tour Packages — with category filter, real prices & WhatsApp enquiry */}
      <JourneysSection />

      {/* 4. Holiday Themes / Categories — International, Domestic, Honeymoon, Family, Pilgrimage, Cruises */}
      <ExperiencesSection />

      {/* 5. Why Choose Us — 10+ years, 24/7 on-trip support, honest pricing */}
      <WhyChooseUsSection />

      {/* 6. Our Story — Puthiyara, Calicut heritage & personalized travel philosophy */}
      <OurStorySection />

      {/* 7. Testimonials — genuine traveler reviews & social proof */}
      <TestimonialSection />

      {/* 8. Gallery Preview — trip moments from our travelers */}
      <GalleryPreviewSection />

      {/* 9. Final CTA — interactive enquiry & WhatsApp consultation */}
      <FinalCTASection />
    </>
  )
}

