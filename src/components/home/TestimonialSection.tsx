'use client'

import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Star, MessageSquare, ArrowRight } from 'lucide-react'
import { buildGeneralEnquiryUrl, buildWhatsAppUrl } from '@/lib/whatsapp'
import type { Review } from '@/lib/data/reviews'

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch live reviews from API
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews)
        }
      })
      .catch((err) => console.error('Error fetching reviews:', err))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const active = reviews[activeIndex]

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--background-soft)' }}
      aria-label="Traveler Stories"
    >
      <div className="container-wide">
        {/* Label */}
        <div className="reveal-up flex items-center justify-between mb-16">
          <div className="flex items-center gap-3">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>07 — Traveler Reviews</span>
            <span className="accent-line" aria-hidden="true" />
          </div>
          {reviews.length > 0 && (
            <Link
              href="/reviews"
              className="text-xs font-medium flex items-center gap-1 hover:underline transition-all"
              style={{ color: 'var(--accent)' }}
            >
              View All Reviews ({reviews.length}) →
            </Link>
          )}
        </div>

        {reviews.length === 0 ? (
          // Elegant Empty State when no reviews are published
          <div className="reveal-up max-w-2xl mx-auto text-center py-12 px-6 rounded-3xl border border-black/5 bg-white/60 backdrop-blur shadow-sm">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-white shadow-md"
              style={{ background: 'var(--accent)' }}
            >
              <MessageSquare className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold font-serif mb-3 tracking-tight" style={{ color: 'var(--foreground)' }}>
              Honest Words from Honest Journeys
            </h3>

            <p className="text-body text-sm max-w-md mx-auto mb-8">
              We take pride in every journey we craft. Verified traveler reviews and memories will be published here.
              Have you travelled with One World? We would love to hear your story.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={buildWhatsAppUrl('Hello One World Travel! I would like to share my travel review / experience with your team.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent text-xs px-5 py-2.5"
              >
                Share Your Experience →
              </a>
              <Link href="/journeys" className="btn btn-outline text-xs px-5 py-2.5">
                Explore Our Journeys
              </Link>
            </div>
          </div>
        ) : (
          // Active Reviews Carousel
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Quote column */}
            <div className="lg:col-span-8 reveal-up">
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < (active?.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}
                  />
                ))}
                <span className="text-xs font-semibold ml-2" style={{ color: 'var(--muted)' }}>
                  {active?.rating}.0 / 5.0
                </span>
              </div>

              {/* Quote text */}
              <blockquote
                key={activeIndex}
                className="mb-8"
                style={{ animation: 'fadeSlideIn 0.5s ease both' }}
              >
                <p
                  className="font-medium leading-relaxed font-serif"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.6rem)',
                    color: 'var(--foreground)',
                    lineHeight: 1.6,
                    letterSpacing: '-0.01em',
                  }}
                >
                  &ldquo;{active?.quote}&rdquo;
                </p>
              </blockquote>

              {/* Traveler info */}
              <div className="flex items-center gap-3.5 mb-10">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 text-white shadow-sm"
                  style={{ background: 'var(--accent)' }}
                >
                  {active?.author
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2) || 'OW'}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-base" style={{ color: 'var(--foreground)' }}>
                      {active?.author}
                    </p>
                    {active?.verified !== false && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                        ✓ Verified Traveler
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                    {active?.location} {active?.journey ? `· ${active?.journey}` : ''}
                    {active?.date ? ` (${active.date})` : ''}
                  </p>
                </div>
              </div>

              {/* Selector dots if multiple reviews */}
              {reviews.length > 1 && (
                <div className="flex items-center gap-3" role="tablist" aria-label="Traveler Reviews">
                  {reviews.map((r, i) => (
                    <button
                      key={r.id || i}
                      role="tab"
                      aria-selected={i === activeIndex}
                      aria-label={`Review ${i + 1} from ${r.author}`}
                      onClick={() => setActiveIndex(i)}
                      className="transition-all duration-300 rounded-full"
                      style={{
                        width: i === activeIndex ? '2.5rem' : '0.6rem',
                        height: '0.5rem',
                        background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Side: Trust & Stats Badge */}
            <div className="lg:col-span-4 reveal-up">
              <div className="glass rounded-3xl p-7 border border-black/5 shadow-sm space-y-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: 'var(--accent)' }}>
                    Real Traveler Feedback
                  </span>
                  <h4 className="text-xl font-bold font-serif mt-1" style={{ color: 'var(--foreground)' }}>
                    Puthiyara, Calicut
                  </h4>
                  <p className="text-xs text-muted mt-1">
                    Every review is received from genuine travelers who booked flights, holidays, or Umrah with One World.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                  <div>
                    <p className="text-2xl font-bold font-serif" style={{ color: 'var(--accent)' }}>
                      10K+
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--muted)' }}>Happy Travellers</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold font-serif" style={{ color: 'var(--foreground)' }}>
                      4.9★
                    </p>
                    <p className="text-[11px]" style={{ color: 'var(--muted)' }}>Average Rating</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={buildGeneralEnquiryUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent w-full text-xs justify-center flex items-center gap-1.5"
                  >
                    Start Your Trip With Us <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
