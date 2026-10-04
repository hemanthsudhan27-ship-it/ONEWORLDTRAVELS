import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getJourneyBySlug, journeys } from '@/lib/data/journeys'
import { Clock, Users, Mountain, MapPin, Check, FileImage, ShieldCheck } from 'lucide-react'
import { buildJourneyEnquiryUrl, buildGeneralEnquiryUrl } from '@/lib/whatsapp'
import { BookingForm } from '@/components/journeys/BookingForm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return journeys.map((j) => ({ slug: j.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const journey = getJourneyBySlug(slug)
  if (!journey) return { title: 'Journey Not Found' }
  return {
    title: `${journey.title} — ${journey.duration} ${journey.experienceType} Journey`,
    description: journey.description,
    alternates: { canonical: `https://oneworld.travel/journeys/${journey.slug}` },
    openGraph: {
      title: journey.title,
      description: journey.description,
      url: `https://oneworld.travel/journeys/${journey.slug}`,
      images: [{ url: journey.heroImage, width: 1200, height: 630, alt: journey.title }],
    },
  }
}

export default async function JourneyDetailPage({ params }: Props) {
  const { slug } = await params
  const journey = getJourneyBySlug(slug)
  if (!journey) notFound()

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[480px] flex flex-col justify-end" aria-label={journey.title}>
        <div className="absolute inset-0">
          <Image
            src={journey.heroImage}
            alt={`${journey.destination} — ${journey.tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={95}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
        </div>

        <div className="relative z-10 container-wide pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/60">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/journeys" className="hover:text-white transition-colors">Journeys</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/90 font-medium" aria-current="page">{journey.title}</li>
            </ol>
          </nav>

          <div className="flex items-start justify-between gap-8 flex-wrap">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-label text-[11px] px-2.5 py-0.5 rounded-full bg-accent text-white font-semibold">
                  {journey.experienceType}
                </span>
                <span className="text-white/40">·</span>
                <span className="text-label text-[11px] text-white/70">{journey.category} Package</span>
              </div>
              <h1 className="text-display text-white mb-3 tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
                {journey.title}
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-sans">{journey.tagline}</p>
            </div>

            {/* Quick meta box */}
            <div className="glass rounded-2xl p-5 min-w-[240px] text-foreground bg-white/90 backdrop-blur-md shadow-xl border border-white/20">
              <div className="space-y-2.5 mb-4">
                <div className="flex items-center gap-2.5 text-xs text-muted">
                  <Clock size={14} className="text-accent" />
                  <span className="font-semibold text-foreground">{journey.duration}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted">
                  <MapPin size={14} className="text-accent" />
                  <span className="font-medium text-foreground">{journey.destination}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted">
                  <ShieldCheck size={14} className="text-accent" />
                  <span className="font-medium text-foreground">Verified Official Package</span>
                </div>
              </div>
              <div className="pt-3 border-t border-black/10">
                <p className="text-[10px] text-muted uppercase tracking-wider">Pricing</p>
                <p className="text-2xl font-bold text-foreground tracking-tight">
                  {journey.price ? `₹${journey.price.toLocaleString('en-IN')}` : journey.priceText || 'On Request'}
                </p>
                <p className="text-[11px] text-muted">per person · all inclusive</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-wide py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left — Main content */}
        <div className="lg:col-span-2 space-y-14">

          {/* Overview */}
          <section aria-label="Journey Overview">
            <h2 className="text-title mb-4 font-serif">Package Overview</h2>
            <p className="text-body text-base leading-relaxed">{journey.description}</p>
          </section>

          {/* Tiered Pricing (If Available, e.g. Andaman) */}
          {journey.pricingTiers && journey.pricingTiers.length > 0 && (
            <section aria-label="Group Pricing Tiers">
              <h2 className="text-title mb-4 font-serif">Group Pricing Tiers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {journey.pricingTiers.map((tier) => (
                  <div key={tier.pax} className="p-4 rounded-2xl bg-background-soft border border-black/[0.08] text-center">
                    <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">{tier.pax}</p>
                    <p className="text-xl font-bold text-foreground">₹{tier.pricePerPerson.toLocaleString('en-IN')}</p>
                    <p className="text-[11px] text-muted">per person</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Highlights */}
          <section aria-label="Journey Highlights">
            <h2 className="text-title mb-6 font-serif">Key Package Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {journey.highlights.map((h) => (
                <div key={h} className="flex items-start gap-3 p-3.5 rounded-2xl bg-background-soft border border-black/[0.06]">
                  <Check size={18} className="mt-0.5 flex-shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Day-by-Day Itinerary (If Specified) */}
          {journey.itinerary && journey.itinerary.length > 0 && (
            <section aria-label="Day-by-Day Itinerary">
              <h2 className="text-title mb-6 font-serif">Itinerary Breakdown</h2>
              <div className="space-y-4">
                {journey.itinerary.map((day) => (
                  <div
                    key={day.day}
                    className="p-5 rounded-2xl bg-background-soft border border-black/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase mb-2">
                        Day {day.day}
                      </div>
                      <h3 className="font-bold text-foreground text-base mb-1">{day.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{day.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Inclusions */}
          <section aria-label="What's Included">
            <h2 className="text-title mb-6 font-serif">Package Inclusions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {journey.includes.map((inc) => (
                <div key={inc} className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/50">
                  <Check size={16} className="text-emerald-600 flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm font-medium text-emerald-950">{inc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Official Package Posters Gallery */}
          {journey.posterImages && journey.posterImages.length > 0 && (
            <section aria-label="Official Package Poster">
              <div className="flex items-center gap-2 mb-6">
                <FileImage className="w-5 h-5 text-accent" />
                <h2 className="text-title font-serif">Official Package Poster</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {journey.posterImages.map((posterSrc, idx) => (
                  <div key={posterSrc} className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-black/10 group bg-black">
                    <Image
                      src={posterSrc}
                      alt={`Official package poster ${idx + 1} for ${journey.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                      quality={95}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}


        </div>

        {/* Right — Sticky booking panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingForm defaultJourneySlug={journey.slug} />
          </div>
        </div>
      </div>
    </div>
  )
}
