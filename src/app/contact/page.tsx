import type { Metadata } from 'next'
import ContactWithGlobe from '@/components/ui/contact-with-globe'

export const metadata: Metadata = {
  title: 'Contact — Start Planning Your Journey',
  description:
    'Get in touch with the One World team to start planning your next curated journey. We respond within 24 hours and love to listen before we plan.',
  alternates: { canonical: 'https://oneworld.travel/contact' },
  openGraph: {
    title: 'Contact One World Travel',
    description: 'Start planning your next journey. We respond within 24 hours.',
    url: 'https://oneworld.travel/contact',
  },
}

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactWithGlobe 
        title="Let's plan something extraordinary."
        subtitle="Get in Touch"
        description="Tell us where you want to go. We'll listen carefully, ask the right questions, and build something worth your time."
      />
    </div>
  )
}
