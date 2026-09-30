'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { getFeaturedJourneys } from '@/lib/data/journeys'

export default function JourneysSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const journeys = getFeaturedJourneys().slice(0, 4)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120)
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
      aria-label="Featured Journeys"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 reveal-up">
              Most Popular Packages
            </h2>
            <div className="h-1 w-20 bg-teal-600 mt-4 rounded-full reveal-up" />
          </div>
          <div className="reveal-up">
            <Link href="/journeys" className="text-teal-600 font-medium hover:text-teal-700 flex items-center gap-2">
              Browse All Excursions <span>&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Journey Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {journeys.map((journey, index) => (
            <article
              key={journey.id}
              className="reveal-up group flex flex-col bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300"
            >
              <Link
                href={`/journeys/${journey.slug}`}
                className="flex flex-col h-full"
                aria-label={`${journey.title} — ${journey.duration}`}
              >
                {/* Image Section */}
                <div className="relative aspect-[3/2] w-full overflow-hidden">
                  <Image
                    src={journey.image}
                    alt={`${journey.destination} — ${journey.tagline}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    quality={80}
                  />
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2 py-0.5 text-[9px] font-bold text-slate-800 tracking-wider rounded-md">
                    {journey.category ? journey.category.toUpperCase() : 'INTERNATIONAL'}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-grow p-4">
                  <div className="flex items-center gap-1.5 mb-2 text-[11px] text-orange-500 font-medium">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{journey.duration}</span>
                  </div>
                  
                  <h3 className="font-bold text-base text-slate-900 mb-1.5 line-clamp-1">
                    {journey.title.split('—')[0].trim()}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mb-4 line-clamp-2 flex-grow leading-relaxed">
                    {journey.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <span className="text-orange-500 font-bold text-xs flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      ENQUIRE <span aria-hidden="true">&rarr;</span>
                    </span>
                    <span className="text-slate-800 font-semibold text-xs">
                      Itinerary
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
