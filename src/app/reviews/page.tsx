import type { Metadata } from 'next'
import Link from 'next/link'
import { getReviews } from '@/lib/data/reviews'
import { Star, MessageSquare } from 'lucide-react'
import { buildWhatsAppUrl, buildGeneralEnquiryUrl } from '@/lib/whatsapp'

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

export const dynamic = 'force-dynamic'

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

export default async function ReviewsPage() {
  const reviews = await getReviews()

  // Calculate average rating if any
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / reviews.length).toFixed(1)
      : '5.0'

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
            Honest words from people who have journeyed with us. Real feedback from genuine travelers.
          </p>

          {/* Aggregate rating display if reviews exist */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-4 mt-10">
              <div className="glass rounded-2xl px-6 py-4 flex items-center gap-4">
                <div>
                  <p className="text-3xl font-bold" style={{ letterSpacing: '-0.03em' }}>{avgRating}</p>
                  <StarRating count={Math.round(Number(avgRating))} />
                </div>
                <div className="w-px h-10 bg-black/10" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-sm">{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>All verified travellers</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Reviews list / empty state */}
      <section className="section-padding" aria-label="All reviews">
        <div className="container-wide">
          {reviews.length === 0 ? (
            <div className="max-w-xl mx-auto text-center py-16 px-8 rounded-3xl border border-black/5 bg-white/70 shadow-sm">
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white shadow-md"
                style={{ background: 'var(--accent)' }}
              >
                <MessageSquare className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-serif mb-3 tracking-tight" style={{ color: 'var(--foreground)' }}>
                No Published Reviews Yet
              </h2>
              <p className="text-body text-sm max-w-sm mx-auto mb-8">
                All previous sample reviews have been cleared. As our travelers return from their custom journeys, their verified feedback will appear right here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={buildWhatsAppUrl('Hello One World Travel! I would like to submit my review / travel feedback.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent text-xs px-6 py-3"
                >
                  Share Your Review via WhatsApp →
                </a>
                <Link href="/journeys" className="btn btn-outline text-xs px-6 py-3">
                  Browse Journeys
                </Link>
              </div>
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {reviews.map((t) => (
                <article
                  key={t.id}
                  className="break-inside-avoid rounded-3xl p-7 border transition-all hover:shadow-md"
                  style={{ background: 'var(--background)', borderColor: 'var(--border)' }}
                >
                  {/* Stars & Verified */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <StarRating count={t.rating} />
                    {t.verified !== false && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        ✓ Verified
                      </span>
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="mb-6">
                    <p
                      className="text-sm leading-relaxed font-serif"
                      style={{ color: 'var(--foreground)', lineHeight: 1.7 }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Author footer */}
                  <footer className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 text-white shadow-sm"
                      style={{ background: 'var(--accent)' }}
                    >
                      {t.author
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.author}</p>
                      <p className="text-xs" style={{ color: 'var(--muted)' }}>
                        {t.location} {t.date ? `· ${t.date}` : ''}
                      </p>
                      {t.journey && (
                        <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--accent)' }}>
                          {t.journey}
                        </p>
                      )}
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          )}
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
