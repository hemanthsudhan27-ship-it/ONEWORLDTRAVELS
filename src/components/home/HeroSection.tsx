'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Compass,
  Star,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react'
import { buildGeneralEnquiryUrl, buildJourneyEnquiryUrl } from '@/lib/whatsapp'
import { journeys } from '@/lib/data/journeys'

function PaperPlaneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)
  const discoveryRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animatedElements = [
      { el: headlineRef.current, delay: 150 },
      { el: subRef.current, delay: 300 },
      { el: ctaRef.current, delay: 450 },
      { el: imageRef.current, delay: 600 },
      { el: floatingRef.current, delay: 750 },
      { el: discoveryRef.current, delay: 900 },
    ]

    animatedElements.forEach(({ el, delay }) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      setTimeout(() => {
        if (!el) return
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, delay)
    })
  }, [])

  const scrollDiscovery = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = direction === 'left' ? -340 : 340
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  // Filter journeys for discovery strip
  const discoveryJourneys = journeys.slice(0, 4)

  return (
    <section
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-24 overflow-hidden bg-background"
      aria-label="Hero — One World Travel"
    >
      {/* SVG Clip Path Definition for Organic Image Shape */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="hero-organic-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.16,0 L 0.84,0 C 0.93,0 1,0.07 1,0.16 L 1,0.84 C 1,0.93 0.93,1 0.84,1 L 0.34,1 C 0.22,1 0.18,0.90 0.18,0.78 C 0.18,0.64 0.08,0.56 0,0.48 C 0.04,0.36 0.10,0.26 0.10,0.16 C 0.10,0.07 0.07,0 0.16,0 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Subtle Background Glow & Accent Texture */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-accent/5 via-accent/10 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="container-wide relative z-10">
        {/* Main Upper Hero Layout: Left Content (40-45%) + Right Organic Image (45-50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
          
          {/* LEFT COLUMN: Editorial Typography & Primary CTA */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-20">
            {/* Brand Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase mb-6 border border-accent/15">
              <Compass className="w-3.5 h-3.5" />
              <span>Est. 2016 · Curated Travel Journeys</span>
            </div>

            {/* Main Headline */}
            <h1
              ref={headlineRef}
              className="text-display text-foreground mb-6 font-serif tracking-tight leading-[0.95] text-[clamp(2.75rem,5.5vw,5.5rem)]"
            >
              Travel Beyond
              <br />
              <span className="italic font-serif opacity-90">The</span>{' '}
              <span className="text-accent font-serif">Ordinary.</span>
            </h1>

            {/* Supporting Text */}
            <p
              ref={subRef}
              className="text-muted text-base md:text-lg max-w-lg mb-8 leading-relaxed font-sans"
            >
              Bespoke, intentional travel experiences crafted for curious minds. Discover breathtaking destinations with local experts and seamless luxury.
            </p>

            {/* Primary CTA Buttons */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 items-center w-full sm:w-auto">
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent shadow-lg shadow-accent/20 group text-[13px] py-3.5 px-7 flex-1 sm:flex-initial justify-center"
                id="hero-cta-explore"
              >
                <PaperPlaneIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                <span>Plan Your Trip</span>
              </a>

              <Link
                href="/journeys"
                className="btn btn-outline text-[13px] py-3.5 px-6 border-black/15 hover:border-foreground flex-1 sm:flex-initial justify-center group"
                id="hero-cta-journeys"
              >
                <span>Explore Journeys</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div className="mt-10 pt-6 border-t border-black/[0.08] flex items-center gap-6 text-xs text-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-medium text-foreground">100% Custom Itineraries</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-black/20" />
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
                <span className="font-semibold text-foreground">4.9/5</span>
                <span>(500+ Reviews)</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Organic Sculpted Image Composition + Floating UI */}
          <div className="lg:col-span-6 xl:col-span-7 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            {/* Background Glow Ring */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 via-accent/5 to-transparent rounded-[40px] blur-2xl -z-10 opacity-70" />

            {/* Main Organic Image Container */}
            <div
              ref={imageRef}
              className="relative w-full max-w-[560px] aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] transition-all duration-700"
            >
              {/* Outer Organic Shape Shadow Container */}
              <div
                className="absolute inset-0 bg-neutral-900/5 translate-x-3 translate-y-3 pointer-events-none"
                style={{ clipPath: 'url(#hero-organic-clip)' }}
              />

              {/* Sculpted Organic Cut-In Clip Container */}
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl group"
                style={{ clipPath: 'url(#hero-organic-clip)' }}
              >
                <Image
                  src="/images/hero-himalaya.jpg"
                  alt="Scenic Himalayan mountain peaks bathed in golden light — One World Travel"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                  quality={95}
                />

                {/* Subtle Image Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Dotted Travel Route SVG Overlay */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-80"
                  viewBox="0 0 500 600"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 60 420 Q 180 300 320 180 T 420 120"
                    stroke="#C4171A"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                    strokeLinecap="round"
                  />
                  {/* Location Pin Point A */}
                  <circle cx="60" cy="420" r="5" fill="#C4171A" />
                  <circle cx="60" cy="420" r="10" stroke="#C4171A" strokeWidth="1.5" strokeOpacity="0.4" />

                  {/* Destination Pin Point B */}
                  <circle cx="420" cy="120" r="6" fill="#FFFFFF" stroke="#C4171A" strokeWidth="3" />
                </svg>
              </div>

              {/* FLOATING UI CARD 1: Top-Right Featured Destination Badge */}
              <div
                ref={floatingRef}
                className="absolute top-6 -right-2 sm:right-4 z-20 backdrop-blur-md bg-white/90 p-3.5 sm:p-4 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Featured</span>
                    <span className="text-black/30">·</span>
                    <span className="text-[11px] text-muted font-medium">07 Days</span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground tracking-tight">Spiti & Himalayan Pass</h4>
                </div>
              </div>

              {/* FLOATING UI CARD 2: Lower-Left Cut-In Notch Rating Pill */}
              <div className="absolute bottom-24 -left-3 sm:left-2 z-20 backdrop-blur-md bg-white/95 px-4 py-3 rounded-2xl shadow-xl border border-black/5 flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-50 text-amber-500 shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-xs font-bold text-foreground">
                    <span>4.9 / 5.0 Rating</span>
                  </div>
                  <p className="text-[11px] text-muted">2,000+ Journeys Curated</p>
                </div>
              </div>

              {/* FLOATING UI CARD 3: Bottom-Right Traveler Social Proof */}
              <div className="absolute bottom-4 right-4 sm:right-8 z-20 backdrop-blur-md bg-white/95 px-4 py-2.5 rounded-full shadow-lg border border-black/5 flex items-center gap-3">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white overflow-hidden relative">
                    <Image src="/images/testimonial-traveler.jpg" alt="Happy traveler" fill className="object-cover" />
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-accent text-white font-semibold text-[10px] flex items-center justify-center">
                    AK
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-foreground text-white font-semibold text-[10px] flex items-center justify-center">
                    +1K
                  </div>
                </div>
                <div className="text-[11px]">
                  <span className="font-bold text-foreground block leading-tight">10K+ Travelers</span>
                  <span className="text-muted text-[10px]">Worldwide</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM DISCOVERY STRIP: Horizontal Package & Destination Cards */}
        <div ref={discoveryRef} className="pt-10 border-t border-black/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-label text-xs text-muted">Discover Package Collections</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif text-foreground tracking-tight">
                Handcrafted Escape Packages
              </h3>
            </div>

            {/* Desktop Navigation Arrow Buttons */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() => scrollDiscovery('left')}
                className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollDiscovery('right')}
                className="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-foreground hover:bg-foreground hover:text-white transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cards Horizontal Carousel Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {discoveryJourneys.map((journey) => (
              <article
                key={journey.id}
                className="w-[280px] sm:w-[300px] md:w-[320px] flex-shrink-0 snap-start group bg-white rounded-2xl p-3 border border-black/[0.06] hover:border-black/15 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl mb-4">
                  <Image
                    src={journey.image}
                    alt={journey.title}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    quality={95}
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[9px] font-semibold tracking-wide uppercase">
                    {journey.duration}
                  </div>
                  <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-accent text-white text-[9px] font-semibold">
                    {journey.experienceType}
                  </div>
                </div>

                {/* Content */}
                <div className="p-1 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] text-accent font-semibold mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{journey.destination}</span>
                    </div>
                    <h4 className="font-bold text-foreground text-base tracking-tight mb-1.5 group-hover:text-accent transition-colors line-clamp-1">
                      {journey.title.split('—')[0].trim()}
                    </h4>
                    <p className="text-muted text-xs line-clamp-2 leading-relaxed mb-4">
                      {journey.description}
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-muted block uppercase tracking-wider">Starting From</span>
                      <span className="font-bold text-foreground text-sm tracking-tight">
                        {journey.price ? `₹${journey.price.toLocaleString('en-IN')}` : journey.priceText || 'On Request'}
                      </span>
                    </div>
                    <a
                      href={buildJourneyEnquiryUrl(journey.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-foreground text-white text-xs font-semibold hover:bg-accent transition-colors flex items-center gap-1"
                    >
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
