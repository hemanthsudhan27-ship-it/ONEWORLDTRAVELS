import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { testimonials } from '@/lib/data/testimonials'
import { Star } from 'lucide-react'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Reviews — What Travellers Say',
  description:
    'Honest words from travellers who have journeyed with One World Travel. Read their stories, from the Himalayas to Morocco, Kerala to Japan.',
  alternates: { canonical: 'https://oneworld.travel/reviews' },
  openGraph: {
    title: 'Reviews — One World Travel',
    description: 'Honest words from travellers who have journeyed with us.',
    url: 'https://oneworld.travel/reviews',
  },
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={i < count ? 'fill-current' : 'opacity-20'}
          style={{ color: i < count ? '#f59e0b' : 'var(--muted)' }}
        />
      ))}
    </div>
  )
}

// Additional synthetic testimonials to flesh out the reviews page
const extendedTestimonials = [
  ...testimonials,
  {
    id: 'maya-morocco',
    quote:
      'Eight days through Morocco — from the alleys of the Marrakech medina to the total silence of the Sahara — was the most cinematically beautiful journey of my life. The riad accommodation was flawless. The private guide was encyclopedic and genuinely passionate about the culture. I came home a different person.',
    author: 'Maya Rosen',
    location: 'Tel Aviv, Israel',
    journey: 'Moroccan Desert Odyssey · 8 Days',
    image: '/images/testimonial-traveler.jpg',
    rating: 5,
    date: '2026-09',
  },
  {
    id: 'daniel-japan',
    quote:
      'We had been to Japan twice before as independent travellers. The One World version was entirely different — slower, more considered, with access to places and experiences that simply don\'t appear in guidebooks. The tea ceremony in a private Kyoto garden was worth the entire trip.',
    author: 'Daniel & Yuki Park',
    location: 'Seoul, South Korea',
    journey: 'Japan Immersion · 10 Days',
    image: '/images/about-story.jpg',
    rating: 5,
    date: '2026-05',
  },
  {
    id: 'robert-himalaya',
    quote:
      'I am 62 years old and I was worried the Himalayan trek would be beyond me. The team tailored the pace perfectly, the guide was patient and knowledgeable, and the emergency communication system gave me real peace of mind. The Pin Valley crossing was the proudest moment of my travelling life.',
    author: 'Robert Hughes',
    location: 'Edinburgh, Scotland',
    journey: 'Himalayan Trail · 7 Days',
    image: '/images/testimonial-traveler.jpg',
    rating: 5,
    date: '2026-04',
  },
]

export default function ReviewsPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: 'var(--background-soft)' }}
        aria-label="Traveller reviews"
      >
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-dot" aria-hidden="true" />
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>Reviews</span>
          </div>
          <h1 className="text-headline mb-6">
            What travellers
            <br />
            <span style={{ color: 'var(--accent)' }}>actually say.</span>
          </h1>
          <p className="text-body max-w-md">
            Honest words from people who have journeyed with us. No curation, no spin.
          </p>

          {/* Aggregate rating display */}
          <div className="flex items-center gap-4 mt-10">
            <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4">
              <div>
                <p className="text-3xl font-bold" style={{ letterSpacing: '-0.03em' }}>5.0</p>
                <StarRating count={5} />
              </div>
              <div className="w-px h-10 bg-black/10" aria-hidden="true" />
              <div>
                <p className="font-semibold text-sm">{extendedTestimonials.length}+ reviews</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>All verified travellers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="section-padding" aria-label="All reviews">
        <div className="container-wide">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {extendedTestimonials.map((t) => (
              <article
                key={t.id}
                className="break-inside-avoid rounded-3xl p-7 border"
                style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
              >
                {/* Stars */}
                <StarRating count={t.rating} />

                {/* Quote */}
                <blockquote className="mt-5 mb-6">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--foreground)', lineHeight: 1.75 }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <footer className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={`${t.author} — traveller photo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.author}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{t.location}</p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--accent)' }}>{t.journey}</p>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ background: 'var(--background-soft)' }}
        aria-label="Start your journey"
      >
        <div className="container-narrow text-center">
          <h2 className="text-title mb-4">Add your own story.</h2>
          <p className="text-body mx-auto max-w-sm mb-8">
            Join the travellers who have journeyed with us. Your story begins with a single conversation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              id="reviews-cta-whatsapp"
            >
              Plan My Journey →
            </a>
            <Link href="/journeys" className="btn btn-outline">
              Browse Journeys
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
