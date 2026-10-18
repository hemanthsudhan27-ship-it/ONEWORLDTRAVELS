'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { destinations } from '@/lib/data/destinations'
import { buildDestinationEnquiryUrl } from '@/lib/whatsapp'
import { MountainPeaksDoodle, AirplaneLoopDoodle } from '@/components/ui/TravelDoodles'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function DestinationsSection() {
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

  const featuredDests = destinations.filter((d) => d.featured).slice(0, 8)

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      aria-label="Curated Destinations"
    >
      <div className="container-wide relative">
        {/* Subtle airplane trail background */}
        <div className="absolute -top-4 right-8 sm:right-32 pointer-events-none opacity-40 hidden md:block">
          <AirplaneLoopDoodle className="w-24 h-16 text-accent" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-4">
              <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>04 — Curated Destinations</span>
              <span className="accent-line" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-headline reveal-up">
                Where do you
                <br />
                <span style={{ color: 'var(--accent)' }}>want to go?</span>
              </h2>
              <div className="hidden sm:block pointer-events-none opacity-75">
                <MountainPeaksDoodle className="w-20 h-14 text-accent/80" />
              </div>
            </div>
            <p className="reveal-up text-body text-sm max-w-md mt-4">
              We craft journeys to some of the world's most inspiring destinations — each one carefully planned by our experts.
            </p>
          </div>
          <div className="reveal-up">
            <Link href="/destinations" className="btn btn-outline text-sm flex items-center gap-2">
              All Destinations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {featuredDests.map((dest, index) => (
            <article
              key={dest.id}
              className={`reveal-up group relative overflow-hidden rounded-2xl cursor-pointer ${
                index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
              }`}
              style={{ aspectRatio: index === 0 ? '1/1' : '4/3' }}
            >
              {/* Full-bleed Image */}
              <Image
                src={dest.image}
                alt={`${dest.name} — ${dest.tagline}`}
                fill
                sizes={index === 0 ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={85}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Region Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[9px] font-semibold tracking-wider uppercase flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5" />
                {dest.region}
              </div>

              {/* Best Time Badge */}
              {dest.bestTime && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[9px] font-medium flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  {dest.bestTime}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3
                  className="font-bold text-white mb-1 tracking-tight"
                  style={{
                    fontSize: index === 0 ? 'clamp(1.5rem, 3vw, 2.25rem)' : '1.125rem',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {dest.name}
                </h3>
                <p className="text-white/75 text-xs mb-3 leading-relaxed line-clamp-2">
                  {dest.tagline}
                </p>

                {/* Highlights — visible on hover for large card, always for small */}
                {dest.highlights && dest.highlights.length > 0 && (
                  <div
                    className={`flex flex-wrap gap-1 mb-3 transition-all duration-300 ${
                      index === 0 ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-20'
                    }`}
                    aria-hidden={index !== 0}
                  >
                    {dest.highlights.slice(0, index === 0 ? 3 : 2).map((h) => (
                      <span
                        key={h}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm text-white border border-white/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/destinations/${dest.slug}`}
                    className="px-3 py-1.5 rounded-full bg-white text-[10px] font-semibold transition-all duration-200 hover:bg-white/90 flex items-center gap-1"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <a
                    href={buildDestinationEnquiryUrl(dest.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full text-[10px] font-semibold transition-all duration-200 flex items-center gap-1 border border-white/30 text-white hover:bg-white/15"
                  >
                    <WhatsAppIcon className="w-3 h-3" />
                    Enquire
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

