'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  ChevronDown,
  Palmtree,
  MoonStar,
  Plane,
  ShieldCheck,
  Calendar,
  Users,
} from 'lucide-react'
import { buildGeneralEnquiryUrl, buildWhatsAppUrl } from '@/lib/whatsapp'

/* ─── WhatsApp Icon ───────────────────────────────────────────── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

/* ─── Main Hero Section ───────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState<'holidays' | 'umrah' | 'flights' | 'visas'>('holidays')
  const [destination, setDestination] = useState('')
  const [travelMonth, setTravelMonth] = useState('Flexible / Next 30 Days')
  const [travellers, setTravellers] = useState('2 Travellers (Couple / Friends)')
  const [isLoaded, setIsLoaded] = useState(false)

  /* Parallax */
  const handleScroll = useCallback(() => {
    if (!bgRef.current) return
    const scrollY = window.scrollY
    const sectionH = sectionRef.current?.offsetHeight ?? window.innerHeight
    if (scrollY > sectionH) return
    bgRef.current.style.transform = `translateY(${scrollY * 0.25}px)`
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  /* Entrance animation */
  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80)
    return () => clearTimeout(t)
  }, [])

  /* WhatsApp enquiry */
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
    const message =
      `Hello One World Travel & Tours, I would like to enquire about:\n` +
      `*Service / Destination*: ${serviceLabel} - ${specificDetail}\n` +
      `*Preferred Month / Time*: ${travelMonth}\n` +
      `*Travellers / Passengers*: ${travellers}\n\n` +
      `Could you please share the itinerary details, current pricing, and availability?`
    window.open(buildWhatsAppUrl(message), '_blank')
  }

  const tabs = [
    { id: 'holidays', label: 'Holidays', icon: <Palmtree className="w-3.5 h-3.5" /> },
    { id: 'umrah',    label: 'Umrah',    icon: <MoonStar  className="w-3.5 h-3.5" /> },
    { id: 'flights',  label: 'Flights',  icon: <Plane     className="w-3.5 h-3.5" /> },
    { id: 'visas',    label: 'Visas',    icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ]

  const sc = 'w-full h-11 px-3.5 rounded-xl border border-neutral-200/90 bg-white/95 text-neutral-800 text-xs sm:text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all shadow-sm'

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: isLoaded ? 1 : 0,
    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  })

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100dvh', minHeight: '620px', maxHeight: '100dvh' }}
      aria-label="Hero — One World Travel"
    >
      {/* ── Parallax Background — responsive image switching ── */}
      <div
        ref={bgRef}
        className="absolute inset-0 will-change-transform"
        style={{ top: '-5%', height: '110%' }}
      >
        {/* Desktop image (≥768px): Hallstatt lakeside alpine landscape 16:9 */}
        <Image
          src="/images/hero-hallstatt.jpg"
          alt="Breathtaking alpine lake destination — One World Travel"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center hidden md:block"
          draggable={false}
        />
        {/* Mobile image (<768px): Perfectly composed 9:16 portrait alpine lake */}
        <Image
          src="/images/hero-hallstatt-mobile.jpg"
          alt="Breathtaking alpine lake destination — One World Travel"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center block md:hidden"
          draggable={false}
        />
      </div>

      {/* ── Soft luminous vignette ensuring 100% text readability while keeping the alpine lake vivid ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.60) 38%, rgba(255,255,255,0.15) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 z-[1] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,0.40) 0%, transparent 100%)',
        }}
      />

      {/* ── Main content: Fills exact 100dvh screen ── */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-20 sm:pt-24 md:pt-28 pb-3 sm:pb-4 md:pb-6">

        {/* Upper: Headline block */}
        <div className="container-wide w-full my-auto">
          <div className="max-w-2xl xl:max-w-3xl">

            {/* Eyebrow badge matching reference style */}
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 md:mb-5 border border-red-200/90 text-neutral-800 text-[10px] sm:text-[11px] font-semibold tracking-wide shadow-sm"
              style={{ background: 'rgba(255, 255, 255, 0.92)', backdropFilter: 'blur(12px)', ...fadeIn(0.10) }}
            >
              <span className="text-accent font-serif italic text-xs font-bold">It&apos;s time to ✈</span>
              <span className="w-1 h-1 rounded-full bg-neutral-300" />
              <span className="text-neutral-600 text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold">One World Travels · Calicut</span>
            </div>

            {/* H1 Headline */}
            <h1
              className="font-serif tracking-tight mb-3 sm:mb-4 text-neutral-900"
              style={{ fontSize: 'clamp(2.15rem, 5.8vw, 5.5rem)', lineHeight: '0.96', ...fadeIn(0.20) }}
            >
              Travel Beyond
              <br />
              <em className="not-italic text-neutral-800">The </em>
              <span style={{ color: 'var(--accent)' }}>Ordinary.</span>
            </h1>

            {/* Subtext */}
            <p
              className="text-neutral-700 text-xs sm:text-base md:text-lg leading-relaxed max-w-xl mb-4 sm:mb-6 font-sans line-clamp-2 sm:line-clamp-none"
              style={fadeIn(0.35)}
            >
              Discover breathtaking destinations, unforgettable experiences, and memories that last a lifetime — crafted with bespoke care by Calicut&apos;s premier travel curators.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center mb-4 sm:mb-6" style={fadeIn(0.48)}>
              <Link
                href="/packages"
                id="hero-cta-explore"
                className="inline-flex items-center gap-2 sm:gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-white text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md group"
                style={{ background: '#18181b', boxShadow: '0 8px 24px rgba(24,24,27,0.25)' }}
              >
                <span>Explore Packages</span>
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-3 h-3 text-white" />
                </span>
              </Link>
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-cta-plan"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-neutral-800 text-xs sm:text-sm font-semibold tracking-wide border border-neutral-300/80 bg-white/85 hover:bg-white backdrop-blur-md transition-all duration-200 hover:shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                <span>Plan on WhatsApp</span>
              </a>
            </div>

            {/* Trust stats */}
            <div
              className="flex items-center gap-4 sm:gap-8"
              style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.9s ease 0.65s' }}
            >
              <div className="flex flex-col">
                <span className="text-neutral-900 font-bold text-base sm:text-lg md:text-xl leading-none">10K+</span>
                <span className="text-neutral-500 text-[9px] sm:text-[10px] mt-1 font-medium tracking-wide">Happy Travelers</span>
              </div>
              <div className="h-5 sm:h-6 w-px bg-neutral-300/80" />
              <div className="flex flex-col">
                <span className="text-neutral-900 font-bold text-base sm:text-lg md:text-xl leading-none">4.9★</span>
                <span className="text-neutral-500 text-[9px] sm:text-[10px] mt-1 font-medium tracking-wide">Google Reviews</span>
              </div>
              <div className="h-5 sm:h-6 w-px bg-neutral-300/80" />
              <div className="flex flex-col">
                <span className="text-neutral-900 font-bold text-base sm:text-lg md:text-xl leading-none">100%</span>
                <span className="text-neutral-500 text-[9px] sm:text-[10px] mt-1 font-medium tracking-wide">Tailored Trips</span>
              </div>
            </div>

          </div>
        </div>

        {/* Lower: Clean white floating glass search bar */}
        <div
          className="relative z-20"
          style={{ opacity: isLoaded ? 1 : 0, transform: isLoaded ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.9s ease 0.75s, transform 0.9s ease 0.75s' }}
        >
          <div className="container-wide">
            <div
              className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/80"
              style={{
                background: 'rgba(255, 255, 255, 0.90)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '0 20px 50px -10px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.9) inset',
              }}
            >
              {/* Tab row */}
              <div className="flex items-center gap-1.5 px-3 sm:px-4 pt-2.5 sm:pt-3.5 pb-2 overflow-x-auto border-b border-neutral-100" style={{ scrollbarWidth: 'none' }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as typeof activeTab); setDestination('') }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap shrink-0"
                    style={{
                      background: activeTab === tab.id ? '#18181b' : 'transparent',
                      color: activeTab === tab.id ? '#ffffff' : '#52525b',
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
                <div className="ml-auto flex items-center gap-1.5 pr-2 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] text-neutral-500 font-medium hidden sm:inline">Live desk · Calicut</span>
                </div>
              </div>

              {/* Fields Grid - 2 columns on mobile, 4 columns on desktop */}
              <div className="p-3 sm:p-3.5 md:p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">

                {/* Field 1: Destination (full width on mobile) */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-accent" />
                    {activeTab === 'holidays' ? 'Where to?' : activeTab === 'umrah' ? 'Package Type' : activeTab === 'flights' ? 'Flying To' : 'Country of Visa'}
                  </label>
                  <select value={destination} onChange={(e) => setDestination(e.target.value)} className={sc}>
                    {activeTab === 'holidays' && (<>
                      <option value="">Search Destinations</option>
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
                    </>)}
                    {activeTab === 'umrah' && (<>
                      <option value="Executive Umrah Package (Direct Flight from Calicut)">Executive Umrah (Direct Flight)</option>
                      <option value="Premium 5-Star Umrah (Near Haram Clock Tower)">Premium 5-Star (Near Haram)</option>
                      <option value="Deluxe Family Umrah (Makkah & Madinah)">Deluxe Family Umrah</option>
                      <option value="Custom Group Umrah with Guided Ziyarat">Custom Group Umrah</option>
                      <option value="Ramadan Special Umrah">Ramadan Special Umrah</option>
                    </>)}
                    {activeTab === 'flights' && (<>
                      <option value="Calicut (CCJ) to Gulf / Middle East">Calicut (CCJ) to Gulf / Middle East</option>
                      <option value="Direct Flight to Southeast Asia">Direct Flight to Southeast Asia</option>
                      <option value="International Long-Haul (UK, Europe, USA)">International Long-Haul</option>
                      <option value="Domestic India (Delhi, Mumbai, Bengaluru)">Domestic India Flight</option>
                      <option value="Multi-City Custom Routing">Multi-City / Round Trip</option>
                    </>)}
                    {activeTab === 'visas' && (<>
                      <option value="UAE / Dubai Tourist Visa">UAE / Dubai Tourist Visa</option>
                      <option value="Saudi Arabia Tourist / Umrah Visa">Saudi Arabia Visa</option>
                      <option value="Schengen Europe Visa Consultation">Schengen Europe Visa</option>
                      <option value="UK Standard Visitor Visa">UK Standard Visitor Visa</option>
                      <option value="Thailand / Malaysia / Singapore eVisa">Southeast Asia eVisa</option>
                      <option value="USA / Canada Visa Appointment & Filing">USA / Canada Visa</option>
                    </>)}
                  </select>
                </div>

                {/* Field 2: Travel Month (1 col on mobile) */}
                <div className="col-span-1 flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-accent" />
                    Month
                  </label>
                  <select value={travelMonth} onChange={(e) => setTravelMonth(e.target.value)} className={sc}>
                    <option value="Flexible / Next 30 Days">Flexible / 30 Days</option>
                    <option value="This Month">This Month</option>
                    <option value="Next Month">Next Month</option>
                    <option value="Upcoming Holiday Season">Upcoming Season</option>
                    <option value="Summer Holidays">Summer Holidays</option>
                    <option value="Winter / New Year">Winter / New Year</option>
                  </select>
                </div>

                {/* Field 3: Travellers (1 col on mobile) */}
                <div className="col-span-1 flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-neutral-500 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-accent" />
                    Travelers
                  </label>
                  <select value={travellers} onChange={(e) => setTravellers(e.target.value)} className={sc}>
                    <option value="1 Solo Traveller">1 Solo Traveler</option>
                    <option value="2 Travellers (Couple / Friends)">2 Travelers</option>
                    <option value="Family (2 Adults + 1 Child)">Family (2A + 1C)</option>
                    <option value="Family (2 Adults + 2+ Children)">Family (2A + 2C+)</option>
                    <option value="Small Group (4-8 Travellers)">Group (4-8)</option>
                    <option value="Large Group / Corporate (9+ Travellers)">Group (9+)</option>
                  </select>
                </div>

                {/* Field 4: CTA Action (full width on mobile) */}
                <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
                  <label className="text-[10px] font-bold uppercase tracking-[0.12em] text-transparent select-none hidden sm:block" aria-hidden="true">&nbsp;</label>
                  <div className="flex gap-2 h-11">
                    <Link
                      href={activeTab === 'holidays' ? '/packages' : '/services'}
                      className="flex-1 h-full flex items-center justify-center rounded-xl border border-neutral-200 text-neutral-700 text-xs font-semibold tracking-wide hover:bg-neutral-100/80 transition-colors"
                    >
                      Browse
                    </Link>
                    <button
                      onClick={handleQuickEnquiry}
                      id="hero-cta-enquire"
                      className="flex-[2] h-full flex items-center justify-center gap-2 rounded-xl text-white text-xs font-bold tracking-wide transition-all hover:brightness-110 active:scale-95 shadow-md"
                      style={{ background: 'var(--accent)', boxShadow: '0 4px 16px rgba(196,23,26,0.35)' }}
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>Search & Enquire</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Scroll Down Cue on the right side matching reference landing page ── */}
      <div className="hidden lg:flex absolute bottom-7 right-8 z-20 items-center gap-2 text-neutral-600 font-medium text-xs tracking-wider uppercase pointer-events-none select-none">
        <span>Scroll Down</span>
        <div className="w-7 h-7 rounded-full border border-neutral-300/80 bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm">
          <ChevronDown className="w-3.5 h-3.5 text-neutral-700 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
