'use client'

import { useEffect, useRef, useState } from 'react'
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
  Palmtree,
  MoonStar,
  Plane,
  ShieldCheck,
  Calendar,
  Users,
} from 'lucide-react'
import { buildGeneralEnquiryUrl, buildJourneyEnquiryUrl, buildWhatsAppUrl } from '@/lib/whatsapp'
import { journeys } from '@/lib/data/journeys'
import {
  HotAirBalloonDoodle,
  MountainPeaksDoodle,
  AirplaneLoopDoodle,
  CompassDoodle,
  SuitcaseDoodle,
} from '@/components/ui/TravelDoodles'

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

  const [activeTab, setActiveTab] = useState<'holidays' | 'umrah' | 'flights' | 'visas'>('holidays')
  const [destination, setDestination] = useState('')
  const [travelMonth, setTravelMonth] = useState('Flexible / Next 30 Days')
  const [travellers, setTravellers] = useState('2 Travellers (Couple / Friends)')

  const handleQuickEnquiry = () => {
    let serviceLabel = 'Holiday Packages'
    let specificDetail = destination || 'Top Recommended Destination'

    if (activeTab === 'umrah') {
      serviceLabel = 'Umrah Pilgrimage Package'
      specificDetail = destination || 'Makkah & Madinah (Near Haram Stays)'
    } else if (activeTab === 'flights') {
      serviceLabel = 'Flight Ticket Booking'
      specificDetail = destination || 'Domestic / International Sector'
    } else if (activeTab === 'visas') {
      serviceLabel = 'Global Visa Assistance'
      specificDetail = destination || 'Tourist / Business Visa Consultation'
    }

    const message = `Hello One World Travel & Tours, I would like to enquire about:
*Service / Destination*: ${serviceLabel} - ${specificDetail}
*Preferred Month / Time*: ${travelMonth}
*Travellers / Passengers*: ${travellers}

Could you please share the itinerary details, current pricing, and availability?`

    window.open(buildWhatsAppUrl(message), '_blank')
  }

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
        {/* Playful Floating Hot Air Balloon Doodle */}
        <div className="absolute top-2 right-4 sm:right-12 lg:right-24 pointer-events-none z-10 hidden sm:block animate-pulse" style={{ animationDuration: '4s' }}>
          <HotAirBalloonDoodle className="w-16 h-20 text-accent/80 drop-shadow-sm hover:scale-110 transition-transform" />
        </div>

        {/* Main Upper Hero Layout: Left Content (40-45%) + Right Organic Image (45-50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">
          
          {/* LEFT COLUMN: Editorial Typography & Primary CTA */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start z-20">
            {/* Brand Pill & Flight Path Doodle */}
            <div className="relative">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wider uppercase mb-6 border border-accent/15">
                <Compass className="w-3.5 h-3.5" />
                <span>Est. 2016 · Curated Travel Journeys</span>
              </div>
              <div className="absolute -top-7 -right-28 hidden md:block pointer-events-none opacity-80">
                <AirplaneLoopDoodle className="w-24 h-14 text-accent/80" />
              </div>
            </div>

            {/* Main Headline with Mountain Peak Doodle Accent */}
            <div className="flex items-end gap-3 mb-6">
              <h1
                ref={headlineRef}
                className="text-display text-foreground font-serif tracking-tight leading-[0.95] text-[clamp(2.75rem,5.5vw,5.5rem)]"
              >
                Travel Beyond
                <br />
                <span className="italic font-serif opacity-90">The</span>{' '}
                <span className="text-accent font-serif">Ordinary.</span>
              </h1>
              <div className="hidden sm:block pb-2 pointer-events-none opacity-75 flex-shrink-0">
                <MountainPeaksDoodle className="w-20 h-14 text-accent/80" />
              </div>
            </div>

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
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-accent text-white font-bold text-[10px] flex items-center justify-center">
                    OW
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-600 text-white font-bold text-[10px] flex items-center justify-center">
                    ✓
                  </div>
                  <div className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-foreground text-white font-bold text-[9px] flex items-center justify-center">
                    +10K
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

        {/* QUICK TRAVEL FINDER / ENQUIRY INTERFACE */}
        <div className="mb-14 -mt-4 relative z-20">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/[0.08] max-w-5xl mx-auto">
            {/* Header label & tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-5 border-b border-black/[0.06] mb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Quick Travel Finder</span>
                <h3 className="text-lg font-bold text-foreground">Find Your Journey or Service</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'holidays', label: 'Holiday Packages', icon: <Palmtree className="w-3.5 h-3.5" /> },
                  { id: 'umrah', label: 'Umrah Pilgrimage', icon: <MoonStar className="w-3.5 h-3.5" /> },
                  { id: 'flights', label: 'Flight Tickets', icon: <Plane className="w-3.5 h-3.5" /> },
                  { id: 'visas', label: 'Visa Assistance', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any)
                      setDestination('')
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
                    style={{
                      background: activeTab === tab.id ? 'var(--accent)' : 'var(--background-soft)',
                      color: activeTab === tab.id ? 'white' : 'var(--foreground)',
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Field 1: Destination / Service */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {activeTab === 'holidays' ? 'Destination' : activeTab === 'umrah' ? 'Package Type' : activeTab === 'flights' ? 'Flying To / Sector' : 'Country of Visa'}
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-medium cursor-pointer"
                >
                  {activeTab === 'holidays' && (
                    <>
                      <option value="">Select Destination</option>
                      <option value="Thailand (Phuket & Krabi)">Thailand (Phuket & Krabi)</option>
                      <option value="Bali Island Paradise">Bali Island Paradise</option>
                      <option value="Maldives Luxury Resort">Maldives Luxury Resort</option>
                      <option value="Kazakhstan Mountain Explorer">Kazakhstan Mountain Explorer</option>
                      <option value="Lakshadweep Island Coral Voyage">Lakshadweep Islands</option>
                      <option value="Kashmir Valley & Gulmarg">Kashmir & Gulmarg</option>
                      <option value="Himachal & Manali Adventure">Himachal Pradesh</option>
                      <option value="Meghalaya & Northeast">Meghalaya & Northeast</option>
                      <option value="Dubai & UAE Explorer">Dubai & UAE</option>
                      <option value="Malaysia & Singapore">Malaysia & Singapore</option>
                      <option value="Vietnam Heritage Circuit">Vietnam Heritage</option>
                      <option value="Sri Lanka Tropical Escape">Sri Lanka Escape</option>
                    </>
                  )}
                  {activeTab === 'umrah' && (
                    <>
                      <option value="Executive Umrah Package (Direct Flight from Calicut)">Executive Umrah (Direct Flight from Calicut)</option>
                      <option value="Premium 5-Star Umrah (Near Haram Clock Tower)">Premium 5-Star (Near Haram Clock Tower)</option>
                      <option value="Deluxe Family Umrah (Makkah & Madinah)">Deluxe Family Umrah (Makkah & Madinah)</option>
                      <option value="Custom Group Umrah with Guided Ziyarat">Custom Group Umrah with Guided Ziyarat</option>
                      <option value="Ramadan Special Umrah">Ramadan Special Umrah</option>
                    </>
                  )}
                  {activeTab === 'flights' && (
                    <>
                      <option value="Calicut (CCJ) to Gulf / Middle East">Calicut (CCJ) to Gulf / Middle East</option>
                      <option value="Direct Flight to Southeast Asia">Direct Flight to Southeast Asia</option>
                      <option value="International Long-Haul (UK, Europe, USA)">International Long-Haul (UK, Europe, USA)</option>
                      <option value="Domestic India (Delhi, Mumbai, Bengaluru)">Domestic India Flight</option>
                      <option value="Multi-City Custom Routing">Multi-City / Round Trip</option>
                    </>
                  )}
                  {activeTab === 'visas' && (
                    <>
                      <option value="UAE / Dubai Tourist Visa">UAE / Dubai Tourist Visa</option>
                      <option value="Saudi Arabia Tourist / Umrah Visa">Saudi Arabia Tourist / Umrah Visa</option>
                      <option value="Schengen Europe Visa Consultation">Schengen Europe Visa</option>
                      <option value="UK Standard Visitor Visa">UK Standard Visitor Visa</option>
                      <option value="Thailand / Malaysia / Singapore eVisa">Southeast Asia eVisa</option>
                      <option value="USA / Canada Visa Appointment & Filing">USA / Canada Visa Consultation</option>
                    </>
                  )}
                </select>
              </div>

              {/* Field 2: Preferred Month */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-accent" />
                  Travel Month
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-medium cursor-pointer"
                >
                  <option value="Flexible / Next 30 Days">Flexible / Next 30 Days</option>
                  <option value="This Month">This Month</option>
                  <option value="Next Month">Next Month</option>
                  <option value="Upcoming Holiday Season">Upcoming Holiday Season</option>
                  <option value="Summer Holidays">Summer Holidays</option>
                  <option value="Winter / New Year">Winter / New Year</option>
                </select>
              </div>

              {/* Field 3: Travellers */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-accent" />
                  Travellers
                </label>
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent font-medium cursor-pointer"
                >
                  <option value="1 Solo Traveller">1 Solo Traveller</option>
                  <option value="2 Travellers (Couple / Friends)">2 Travellers (Couple / Friends)</option>
                  <option value="Family (2 Adults + 1 Child)">Family (2 Adults + 1 Child)</option>
                  <option value="Family (2 Adults + 2+ Children)">Family (2 Adults + 2+ Children)</option>
                  <option value="Small Group (4-8 Travellers)">Small Group (4-8 Travellers)</option>
                  <option value="Large Group / Corporate (9+ Travellers)">Large Group (9+ Travellers)</option>
                </select>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/[0.06]">
              <div className="text-xs text-muted flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Instant response from our Puthiyara, Calicut travel desk · IATA Accredited</span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Link
                  href={activeTab === 'holidays' ? '/journeys' : '/services'}
                  className="btn btn-outline text-xs py-2.5 px-5 flex-1 sm:flex-initial text-center"
                >
                  Browse Catalog
                </Link>
                <button
                  onClick={handleQuickEnquiry}
                  className="btn btn-accent text-xs py-2.5 px-6 shadow-md shadow-accent/20 flex items-center justify-center gap-2 flex-1 sm:flex-initial"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Enquire via WhatsApp</span>
                </button>
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
