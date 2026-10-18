'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'

export default function OurStorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => {
                el.classList.add('visible')
              }, i * 120)
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
      aria-label="Our Story"
    >
      <div className="container-wide">
        {/* Section number + label */}
        <div className="reveal-up flex items-center gap-3 mb-16">
          <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>06 — Our Story</span>
          <span className="accent-line" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Large editorial statement */}
          <div>
            <h2 className="text-headline reveal-up mb-8">
              We don&apos;t just plan trips.
              <br />
              <br />
              We create stories
              <br />
              <span style={{ color: 'var(--accent)' }}>you take home.</span>
            </h2>

            <div className="reveal-up space-y-4 mb-10">
              <p className="text-body">
                One World Travel & Tours was founded on a simple conviction: travel should never feel mechanical or impersonal. It should feel deeply personal, seamless, and memorable.
              </p>
              <p className="text-body">
                Headquartered in Puthiyara, Calicut since 2016, we have grown into an IATA-accredited agency and TAFI member, earning the trust of thousands of families, honeymooners, corporate travellers, and pilgrims.
              </p>
              <p className="text-body">
                From international flight ticketing and seamless visa processing to sacred Umrah journeys and bespoke holiday getaways, we craft each itinerary with care, local knowledge, and end-to-end dedication.
              </p>
            </div>

            <div className="reveal-up">
              <Link
                href="/about"
                className="btn btn-ghost group text-sm"
                id="story-know-more"
              >
                Know More
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right — Image + glass card */}
          <div className="reveal-up relative">
            <div className="img-organic relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/about-travel.jpg"
                alt="Passenger jetliner soaring gracefully above turquoise coral reefs and tropical islands at golden hour — One World Travel"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                quality={85}
              />
            </div>

            {/* Glass card overlay */}
            <div
              className="glass absolute bottom-6 left-6 right-6 md:-left-8 md:bottom-8 md:right-auto md:w-64 rounded-2xl p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="accent-dot" aria-hidden="true" />
                <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>Since 2016</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold tracking-tight mb-0.5">2,400+</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Journeys crafted</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight mb-0.5">48</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Destinations</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight mb-0.5">97%</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Would return</p>
                </div>
                <div>
                  <p className="text-2xl font-bold tracking-tight mb-0.5">10yr</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
