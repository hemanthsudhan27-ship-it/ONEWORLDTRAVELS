'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { destinations } from '@/lib/data/destinations'

export default function DestinationsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
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
      aria-label="Curated Destinations"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-5">
              <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>03 — Destinations</span>
              <span className="accent-line" aria-hidden="true" />
            </div>
            <h2 className="text-headline reveal-up">
              The world,
              <br />
              curated.
            </h2>
          </div>
          <div className="reveal-up">
            <Link href="/destinations" className="btn btn-outline text-sm">
              All Destinations →
            </Link>
          </div>
        </div>

        {/* Destination List — Editorial style */}
        <div className="space-y-0">
          {destinations.slice(0, 5).map((dest, index) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.slug}`}
              className="reveal-up group flex flex-col md:flex-row items-start md:items-center gap-6 py-8 border-t transition-all duration-300 hover:pl-4"
              style={{
                borderColor: 'var(--border)',
                transitionProperty: 'padding-left, color',
              }}
              onMouseEnter={() => setHoveredId(dest.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Number */}
              <span
                className="text-label text-xs w-8 flex-shrink-0 transition-colors duration-200"
                style={{ color: hoveredId === dest.id ? 'var(--accent)' : 'var(--muted)' }}
                aria-hidden="true"
              >
                {dest.number}
              </span>

              {/* Image thumbnail — appears on hover on desktop */}
              <div
                className="hidden md:block w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 transition-all duration-500"
                style={{
                  opacity: hoveredId === dest.id ? 1 : 0,
                  transform: hoveredId === dest.id ? 'scale(1)' : 'scale(0.8)',
                }}
                aria-hidden="true"
              >
                <Image
                  src={dest.image}
                  alt=""
                  width={64}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Mobile image — always visible */}
              <div className="md:hidden w-full h-48 rounded-2xl overflow-hidden flex-shrink-0">
                <Image
                  src={dest.image}
                  alt={`${dest.name} — ${dest.tagline}`}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <div className="flex-1 min-w-0">
                <h3
                  className="font-bold text-2xl md:text-3xl lg:text-4xl tracking-tight transition-colors duration-200"
                  style={{
                    letterSpacing: '-0.02em',
                    color: hoveredId === dest.id ? 'var(--foreground)' : 'var(--foreground)',
                  }}
                >
                  {dest.name}
                </h3>
                <p
                  className="text-sm mt-1 transition-all duration-300 md:max-h-0 md:overflow-hidden"
                  style={{
                    color: 'var(--muted)',
                    maxHeight: hoveredId === dest.id ? '3rem' : '0',
                    opacity: hoveredId === dest.id ? 1 : 0,
                    display: 'block',
                  }}
                >
                  {dest.description}
                </p>
              </div>

              {/* Region */}
              <span
                className="hidden md:block text-sm flex-shrink-0 transition-colors duration-200"
                style={{ color: 'var(--muted)' }}
              >
                {dest.region}
              </span>

              {/* Arrow */}
              <span
                className="hidden md:flex items-center gap-1 text-sm flex-shrink-0 transition-all duration-300"
                style={{
                  color: hoveredId === dest.id ? 'var(--accent)' : 'var(--muted)',
                  transform: hoveredId === dest.id ? 'translateX(0)' : 'translateX(-8px)',
                  opacity: hoveredId === dest.id ? 1 : 0.4,
                }}
                aria-hidden="true"
              >
                Explore →
              </span>
            </Link>
          ))}
          {/* Final border */}
          <div className="border-t" style={{ borderColor: 'var(--border)' }} />
        </div>
      </div>
    </section>
  )
}
