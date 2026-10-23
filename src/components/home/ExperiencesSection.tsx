'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { journeys } from '@/lib/data/journeys'
import { buildServiceEnquiryUrl } from '@/lib/whatsapp'
import { HotAirBalloonDoodle, CompassDoodle } from '@/components/ui/TravelDoodles'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const intlCount = journeys.filter((j) => j.category === 'International').length
const domCount = journeys.filter((j) => j.category === 'Domestic').length
const honeymoonCount = journeys.filter((j) => j.tags.some((t) => ['honeymoon', 'beach', 'maldives', 'bali'].includes(t))).length
const familyCount = journeys.filter((j) => j.tags.some((t) => ['beach', 'nature', 'culture', 'island'].includes(t))).length

const categories = [
  {
    icon: '✈️',
    label: 'International Escapes',
    description: 'Thailand, Bali, Maldives, Kazakhstan, Malaysia, Vietnam, Sri Lanka, Georgia & more.',
    count: `${intlCount} Packages`,
    enquiry: 'International Holiday Package',
    href: '/packages',
    color: 'rgba(196,23,26,0.06)',
    border: 'rgba(196,23,26,0.15)',
  },
  {
    icon: '🇮🇳',
    label: 'Domestic India',
    description: 'Lakshadweep, Andaman, Meghalaya, Manali, Hyderabad — India\'s finest destinations.',
    count: `${domCount} Packages`,
    enquiry: 'Domestic Holiday Package',
    href: '/packages',
    color: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    icon: '💑',
    label: 'Honeymoon & Romantic',
    description: 'Overwater villas in Maldives, tropical sunsets in Bali, island bliss — curated for couples.',
    count: `${honeymoonCount} Packages`,
    enquiry: 'Honeymoon Package',
    href: '/packages',
    color: 'rgba(244,114,182,0.06)',
    border: 'rgba(244,114,182,0.2)',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    label: 'Family Holidays',
    description: 'Adventures and memories that bring the whole family together — safe, fun, affordable.',
    count: `${familyCount}+ Options`,
    enquiry: 'Family Holiday Package',
    href: '/packages',
    color: 'rgba(59,130,246,0.06)',
    border: 'rgba(59,130,246,0.15)',
  },
  {
    icon: '🕌',
    label: 'Umrah & Pilgrimage',
    description: 'Sacred journeys to Makkah & Madinah — near-Haram stays, guided Ziyarat, direct flights from Calicut.',
    count: 'Year-Round Departures',
    enquiry: 'Umrah Packages',
    href: '/services#umra-packages',
    color: 'rgba(217,185,107,0.1)',
    border: 'rgba(217,185,107,0.3)',
  },
  {
    icon: '🚢',
    label: 'Luxury Cruises',
    description: 'Cordelia Cruises, Royal Caribbean, Costa & MSC — sail the Indian Ocean, Mediterranean & more.',
    count: 'Multiple Sailings',
    enquiry: 'Cruise Booking',
    href: '/services#cruise-booking',
    color: 'rgba(99,102,241,0.06)',
    border: 'rgba(99,102,241,0.15)',
  },
]

export default function ExperiencesSection() {
  const sectionRef = useRef<HTMLElement>(null)

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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--background-soft)' }}
      aria-label="Holiday Categories"
    >
      <div className="container-wide relative">
        {/* Floating Hot Air Balloon Doodle */}
        <div className="absolute top-0 right-4 sm:right-16 pointer-events-none opacity-80 hidden md:block">
          <HotAirBalloonDoodle className="w-16 h-20 text-accent/80" />
        </div>

        {/* Header */}
        <div className="mb-14">
          <div className="reveal-up flex items-center gap-3 mb-4">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>04 — Holiday Themes</span>
            <span className="accent-line" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-headline reveal-up">
              What kind of journey
              <br />
              <span style={{ color: 'var(--accent)' }}>inspires you?</span>
            </h2>
            <div className="hidden sm:block pointer-events-none opacity-50">
              <CompassDoodle className="w-14 h-14 text-accent/70" />
            </div>
          </div>
          <p className="reveal-up text-body text-sm max-w-md mt-4">
            Whether you&apos;re seeking tropical bliss, sacred spiritual journeys, mountain adventures, or ocean voyages — we have the perfect itinerary.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="reveal-up group rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
              style={{ background: cat.color, borderColor: cat.border }}
            >
              {/* Icon & Count */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl" role="img" aria-label={cat.label}>{cat.icon}</span>
                <span
                  className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: 'white', color: 'var(--muted)' }}
                >
                  {cat.count}
                </span>
              </div>

              {/* Content */}
              <h3
                className="font-bold text-lg mb-2 tracking-tight"
                style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
              >
                {cat.label}
              </h3>
              <p className="text-xs leading-relaxed mb-5 flex-grow" style={{ color: 'var(--muted)' }}>
                {cat.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <a
                  href={buildServiceEnquiryUrl(cat.enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-semibold transition-all duration-200"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  Enquire
                </a>
                <Link
                  href={cat.href}
                  className="px-4 py-2 rounded-full text-[10px] font-semibold transition-all duration-200 border"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)', background: 'white' }}
                >
                  Browse Packages
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
