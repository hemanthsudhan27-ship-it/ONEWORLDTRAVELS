'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { getFeaturedJourneys } from '@/lib/data/journeys'
import { buildJourneyEnquiryUrl } from '@/lib/whatsapp'
import EnquiryModal from '@/components/ui/EnquiryModal'
import { HotAirBalloonDoodle, PalmTreeDoodle } from '@/components/ui/TravelDoodles'

type Category = 'All' | 'International' | 'Domestic'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function JourneysSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80)
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const allFeatured = getFeaturedJourneys()
  const filteredJourneys = activeCategory === 'All'
    ? allFeatured.slice(0, 8)
    : allFeatured.filter((j) => j.category === activeCategory).slice(0, 8)

  const categories: Category[] = ['All', 'International', 'Domestic']

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--background-soft)' }}
      aria-label="Featured Tour Packages"
    >
      <div className="container-wide relative">
        {/* Floating Hot Air Balloon background doodle */}
        <div className="absolute -top-3 right-8 sm:right-28 pointer-events-none opacity-40 hidden md:block">
          <HotAirBalloonDoodle className="w-14 h-18 text-accent/70" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-4">
              <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>03 — Tour Packages</span>
              <span className="accent-line" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-3">
              <h2 className="text-headline reveal-up">
                Popular
                <br />
                <span style={{ color: 'var(--accent)' }}>packages.</span>
              </h2>
              <div className="hidden sm:block pointer-events-none opacity-60">
                <PalmTreeDoodle className="w-12 h-14 text-accent/80" />
              </div>
            </div>
          </div>
          <div className="reveal-up">
            <Link href="/packages" className="btn btn-outline text-sm flex items-center gap-2">
              View All Packages
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="reveal-up flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 border"
              style={{
                background: activeCategory === cat ? 'var(--accent)' : 'transparent',
                color: activeCategory === cat ? 'white' : 'var(--muted)',
                borderColor: activeCategory === cat ? 'var(--accent)' : 'var(--border)',
              }}
              aria-pressed={activeCategory === cat}
            >
              {cat === 'All' ? 'All Packages' : cat === 'International' ? '✈ International' : '🇮🇳 Domestic India'}
            </button>
          ))}
        </div>

        {/* Journey Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredJourneys.map((journey) => (
            <article
              key={journey.id}
              className="reveal-up group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:border-black/[0.12] hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={journey.image}
                  alt={`${journey.destination} — ${journey.tagline}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  quality={80}
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase"
                  style={{
                    background: journey.category === 'Domestic' ? 'rgba(16,185,129,0.9)' : 'rgba(196,23,26,0.9)',
                    color: 'white',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {journey.category === 'Domestic' ? '🇮🇳 Domestic' : '✈ International'}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-semibold flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {journey.duration.toLowerCase().includes('request') ? 'Flexible' : journey.duration.split('/')[0].trim()}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow p-4">
                <div className="flex items-center gap-1.5 mb-1.5 text-[11px] font-semibold" style={{ color: 'var(--accent)' }}>
                  <MapPin className="w-3 h-3" />
                  <span>{journey.destination}</span>
                </div>

                <h3 className="font-bold text-sm tracking-tight mb-2 line-clamp-1" style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                  {journey.title.replace(/^(Explore|Let's Go to)\s+/i, '').split('—')[0].trim()}
                </h3>

                <p className="text-xs mb-3 line-clamp-2 flex-grow leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {journey.description}
                </p>

                {journey.includes && journey.includes.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {journey.includes.slice(0, 3).map((inc) => (
                      <span
                        key={inc}
                        className="inline-flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--background-soft)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                      >
                        <CheckCircle className="w-2.5 h-2.5 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                        {inc}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider block" style={{ color: 'var(--muted)' }}>Starting From</span>
                    <span className="font-bold text-sm tracking-tight" style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}>
                      {journey.price
                        ? `₹${journey.price.toLocaleString('en-IN')}`
                        : journey.priceText || 'On Request'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <Link
                      href={`/packages/${journey.slug}`}
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200 border border-neutral-300 hover:border-neutral-500 hover:bg-neutral-100 active:scale-95 text-neutral-800"
                    >
                      Details
                    </Link>
                    <a
                      href={buildJourneyEnquiryUrl(journey.title, journey.destination)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200 flex items-center gap-1 bg-[#C4171A] hover:bg-[#991217] text-white shadow-xs active:scale-95"
                    >
                      <WhatsAppIcon className="w-3 h-3" />
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="reveal-up flex justify-center mt-12">
          <EnquiryModal
            trigger={
              <button className="btn btn-accent text-sm">
                <WhatsAppIcon className="w-4 h-4" />
                Plan a Custom Package
              </button>
            }
          />
        </div>
      </div>
    </section>
  )
}
