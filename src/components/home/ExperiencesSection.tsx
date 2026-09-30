'use client'

import { useRef, useEffect } from 'react'

const experiences = [
  { word: 'Discover', sub: 'New landscapes', index: '01' },
  { word: 'Wander', sub: 'Without agenda', index: '02' },
  { word: 'Taste', sub: 'Local stories', index: '03' },
  { word: 'Meet', sub: 'Real people', index: '04' },
  { word: 'Escape', sub: 'Come back changed', index: '05' },
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
      style={{ background: 'var(--foreground)' }}
      aria-label="The Experiences We Curate"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="reveal-up flex items-center gap-3 mb-16">
          <span className="text-label text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>05 — Experiences</span>
          <span className="accent-line" aria-hidden="true" />
        </div>

        {/* Oversized experience words */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={exp.word}
              className="reveal-up group flex items-center justify-between py-6 border-t cursor-default"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-baseline gap-6 md:gap-10">
                <span
                  className="text-label text-xs"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                  aria-hidden="true"
                >
                  {exp.index}
                </span>
                <h3
                  className="font-bold tracking-tight transition-colors duration-300"
                  style={{
                    fontSize: 'clamp(2.5rem, 7vw, 7rem)',
                    lineHeight: 1,
                    letterSpacing: '-0.03em',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                >
                  {exp.word}
                </h3>
              </div>
              <p
                className="hidden md:block text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {exp.sub}
              </p>
              <span
                className="hidden md:flex items-center transition-all duration-300 opacity-0 group-hover:opacity-100"
                style={{ color: 'var(--accent)' }}
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M15 8L19 12L15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Bottom tagline */}
        <div className="reveal-up mt-16 max-w-lg">
          <p className="text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Every journey we build is designed around one question: what experience do you want to carry home?
          </p>
        </div>
      </div>
    </section>
  )
}
