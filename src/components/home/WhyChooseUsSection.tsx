'use client'

import { useRef, useEffect } from 'react'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'
import { CompassDoodle, MountainPeaksDoodle } from '@/components/ui/TravelDoodles'

const stats = [
  { value: '10+', label: 'Years of Curation' },
  { value: '10K+', label: 'Happy Travellers' },
  { value: '30+', label: 'Global Destinations' },
  { value: '24/7', label: 'On-Trip Support' },
]

const reasons = [
  {
    number: '01',
    title: 'IATA & TAFI Accredited',
    description: 'Authorized airline ticketing, officially certified travel operations, and verified consumer protection.',
  },
  {
    number: '02',
    title: 'Tailored Journeys',
    description: 'Every itinerary is built around your schedule and interests — private transfers, handpicked hotels, and curated pacing.',
  },
  {
    number: '03',
    title: 'Direct Hub Departures',
    description: 'Seamless flight connections directly out of Calicut (CCJ), Kochi, Kannur, and major international hubs.',
  },
  {
    number: '04',
    title: 'Transparent Pricing',
    description: 'All-inclusive quotes with clear inclusions. No hidden fees or surprise surcharges during your trip.',
  },
  {
    number: '05',
    title: 'WhatsApp Concierge',
    description: 'Our Puthiyara, Calicut travel desk stays connected with you throughout your journey for instant help.',
  },
  {
    number: '06',
    title: 'Complete Travel Services',
    description: 'Flights, global visas, holiday packages, Umrah pilgrimages, resort stays, and luxury cruises under one roof.',
  },
]

export default function WhyChooseUsSection() {
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
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--foreground)', color: 'white' }}
      aria-label="Why travel with One World"
    >
      <div className="container-wide relative">
        {/* Subtle background doodle */}
        <div className="absolute -top-4 right-8 sm:right-28 pointer-events-none opacity-20 hidden md:block">
          <MountainPeaksDoodle className="w-28 h-18 text-white" color="white" opacity={0.25} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-5">
              <span className="accent-dot" aria-hidden="true" />
              <span className="text-label text-xs opacity-50">05 — Why One World</span>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-headline reveal-up" style={{ color: 'white' }}>
                Travel that
                <br />
                means something.
              </h2>
              <div className="hidden sm:block pointer-events-none opacity-40">
                <CompassDoodle className="w-14 h-14 text-white" color="white" opacity={0.3} />
              </div>
            </div>
          </div>
          <div className="reveal-up">
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
            >
              Plan My Journey →
            </a>
          </div>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-white/10 rounded-3xl overflow-hidden mb-16">
          {reasons.map((r) => (
            <div
              key={r.number}
              className="reveal-up p-8 border border-white/[0.06] hover:bg-white/5 transition-colors duration-300"
            >
              <span
                className="text-label text-xs block mb-5 opacity-40"
                aria-hidden="true"
              >
                {r.number}
              </span>
              <h3
                className="font-semibold text-lg mb-3 tracking-tight"
                style={{ letterSpacing: '-0.01em', color: 'white' }}
              >
                {r.title}
              </h3>
              <p className="text-sm leading-relaxed opacity-60">
                {r.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats strip */}
        <div
          className="reveal-up grid grid-cols-2 md:grid-cols-4 gap-px border border-white/10 rounded-3xl overflow-hidden"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              role="listitem"
              className="p-8 text-center border border-white/[0.06]"
            >
              <p
                className="font-bold mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', color: 'var(--accent)' }}
              >
                {stat.value}
              </p>
              <p className="text-xs font-medium opacity-50 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
