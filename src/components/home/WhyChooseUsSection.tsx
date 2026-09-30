'use client'

import { useRef, useEffect } from 'react'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'

const stats = [
  { value: '5+', label: 'Years of Curation' },
  { value: '1K+', label: 'Happy Travellers' },
  { value: '20+', label: 'Destinations' },
  { value: '24/7', label: 'On-Trip Support' },
]

const reasons = [
  {
    number: '01',
    title: 'Deeply curated',
    description: 'We only operate in places we know deeply. Not just visited — understood.',
  },
  {
    number: '02',
    title: 'Small groups',
    description: 'Every journey is designed for intimacy. Maximum 8 people. No herded tours.',
  },
  {
    number: '03',
    title: 'Expert guides',
    description: 'Local guides who have lived these landscapes for decades, not someone reading from a script.',
  },
  {
    number: '04',
    title: 'Honest pricing',
    description: 'All-inclusive pricing with no hidden costs. What you see is what you pay.',
  },
  {
    number: '05',
    title: 'WhatsApp access',
    description: 'Our team is reachable via WhatsApp throughout your journey. No call centres.',
  },
  {
    number: '06',
    title: 'Tailored journeys',
    description: 'Every itinerary is adjustable. Tell us what matters to you and we will build around it.',
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
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-5">
              <span className="accent-dot" aria-hidden="true" />
              <span className="text-label text-xs opacity-50">Why One World</span>
            </div>
            <h2 className="text-headline reveal-up" style={{ color: 'white' }}>
              Travel that
              <br />
              means something.
            </h2>
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
