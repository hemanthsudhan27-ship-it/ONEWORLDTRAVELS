'use client'

import Image from 'next/image'
import { useRef, useEffect, useState } from 'react'
import { testimonials } from '@/lib/data/testimonials'

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const active = testimonials[activeIndex]

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

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ background: 'var(--background-soft)' }}
      aria-label="Traveler Stories"
    >
      <div className="container-wide">
        {/* Label */}
        <div className="reveal-up flex items-center gap-3 mb-16">
          <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>06 — From Our Travellers</span>
          <span className="accent-line" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Quote column */}
          <div className="lg:col-span-3 reveal-up">
            {/* Opening quote mark */}
            <div
              className="text-8xl leading-none mb-4 font-serif select-none"
              style={{ color: 'var(--accent)', fontFamily: 'Georgia, serif', lineHeight: 0.8 }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            {/* Quote text — transitions on change */}
            <blockquote
              key={activeIndex}
              className="mb-8"
              style={{
                animation: 'fadeSlideIn 0.5s ease both',
              }}
            >
              <p
                className="font-medium leading-relaxed"
                style={{
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  color: 'var(--foreground)',
                  lineHeight: 1.7,
                  letterSpacing: '-0.01em',
                }}
              >
                {active.quote}
              </p>
            </blockquote>

            {/* Traveler info */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={active.image}
                  alt={`${active.author} portrait`}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: 'var(--foreground)' }}>{active.author}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{active.location} · {active.journey}</p>
              </div>
            </div>

            {/* Selector dots */}
            <div className="flex items-center gap-3" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`Testimonial ${i + 1} from ${testimonials[i].author}`}
                  onClick={() => setActiveIndex(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? '2rem' : '0.5rem',
                    height: '0.5rem',
                    background: i === activeIndex ? 'var(--accent)' : 'var(--border)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-2 reveal-up">
            <div
              key={activeIndex}
              className="img-organic aspect-[3/4] relative overflow-hidden"
              style={{ animation: 'fadeSlideIn 0.5s ease both' }}
            >
              <Image
                src={active.image}
                alt={`${active.author} — travel story`}
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-center"
                quality={80}
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
