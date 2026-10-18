'use client'

import { useRef, useEffect } from 'react'
import { Plane, Building2, MoonStar, ShieldCheck, Globe, Palmtree, Ship, ArrowRight } from 'lucide-react'
import { servicesData } from '@/lib/data/services'
import { buildServiceEnquiryUrl } from '@/lib/whatsapp'
import Link from 'next/link'
import {
  SuitcaseDoodle,
  PassportStampDoodle,
  PalmTreeDoodle,
} from '@/components/ui/TravelDoodles'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-6 h-6" />,
  Hotel: <Building2 className="w-6 h-6" />,
  MoonStar: <MoonStar className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Palmtree: <Palmtree className="w-6 h-6" />,
  Ship: <Ship className="w-6 h-6" />,
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 70)
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
      style={{ background: 'var(--background)' }}
      aria-label="Our Travel Services"
    >
      <div className="container-wide relative">
        {/* Palm tree background doodle */}
        <div className="absolute -top-6 right-2 sm:right-28 pointer-events-none opacity-20 hidden md:block">
          <PalmTreeDoodle className="w-24 h-28 text-accent" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-4">
              <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>02 — Our Services</span>
              <span className="accent-line" aria-hidden="true" />
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-headline reveal-up">
                Complete travel
                <br />
                <span style={{ color: 'var(--accent)' }}>solutions.</span>
              </h2>
              <div className="hidden sm:block pointer-events-none opacity-70">
                <SuitcaseDoodle className="w-16 h-14 text-accent/80" />
              </div>
            </div>
            <p className="reveal-up text-body text-sm max-w-md mt-4">
              From flights and visas to curated holiday packages, Umrah pilgrimages, and luxury cruises — we handle every detail.
            </p>
          </div>
          <div className="reveal-up">
            <Link href="/services" className="btn btn-outline text-sm flex items-center gap-2">
              All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="reveal-up group relative bg-white rounded-2xl p-6 border border-black/[0.06] hover:border-black/[0.15] hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Icon + Badge */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ background: 'var(--accent)', color: 'white' }}
                >
                  {iconMap[service.icon] ?? <Globe className="w-6 h-6" />}
                </div>
                <span
                  className="text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider"
                  style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}
                >
                  {service.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3
                className="font-bold text-base mb-2 tracking-tight"
                style={{ color: 'var(--foreground)', letterSpacing: '-0.01em' }}
              >
                {service.title}
              </h3>
              <p className="text-xs leading-relaxed mb-4 flex-grow" style={{ color: 'var(--muted)' }}>
                {service.shortDescription}
              </p>

              {/* Highlights */}
              {service.highlights && service.highlights.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {service.highlights.slice(0, 3).map((h) => (
                    <span
                      key={h}
                      className="text-[9px] font-medium px-2 py-0.5 rounded-full"
                      style={{ background: 'var(--background-soft)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto">
                <a
                  href={buildServiceEnquiryUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-[10px] font-semibold transition-all duration-200"
                  style={{ background: 'var(--accent)', color: 'white' }}
                  aria-label={`Enquire about ${service.title}`}
                >
                  <WhatsAppIcon className="w-3 h-3" />
                  Enquire
                </a>
                <Link
                  href={`/services#${service.id}`}
                  className="px-3 py-2 rounded-full text-[10px] font-semibold transition-all duration-200 border flex items-center gap-1"
                  style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}
                >
                  Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* IATA Badge Strip */}
        <div className="reveal-up mt-12 flex flex-wrap items-center justify-center gap-6 py-6 border-t border-black/[0.06]">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <span className="accent-dot" aria-hidden="true" />
            <span className="font-semibold" style={{ color: 'var(--foreground)' }}>IATA Accredited Agency</span>
          </div>
          <div className="w-1 h-4 rounded-full bg-black/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <span className="accent-dot" aria-hidden="true" />
            <span>Direct Flights from Calicut (CCJ), Kochi & Kannur</span>
          </div>
          <div className="w-1 h-4 rounded-full bg-black/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <span className="accent-dot" aria-hidden="true" />
            <span>50+ Countries · Visa Assistance</span>
          </div>
          <div className="w-1 h-4 rounded-full bg-black/10 hidden sm:block" />
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--muted)' }}>
            <span className="accent-dot" aria-hidden="true" />
            <span>Puthiyara, Calicut — Kerala Office</span>
          </div>
        </div>
      </div>
    </section>
  )
}
