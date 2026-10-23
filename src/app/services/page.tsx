import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  Phone,
  MapPin,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Plane,
  Building2,
  MoonStar,
  Globe,
  Palmtree,
  Ship,
  HelpCircle,
} from 'lucide-react'
import ServicesList from '@/components/services/ServicesList'
import { companyDetails, servicesData } from '@/lib/data/services'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Our Services — One World Travel & Tours | Connecting Globally',
  description:
    'Discover comprehensive travel services by One World Travel & Tours, Puthiyara, Calicut. IATA & TAFI accredited: Flight Tickets, Hotel Booking, Umra Packages, Travel Insurance, Global Visa, Holiday Packages, and Cruise Booking.',
  alternates: { canonical: 'https://oneworld.travel/services' },
  openGraph: {
    title: 'Our Services — One World Travel & Tours | Connecting Globally',
    description:
      'IATA & TAFI accredited travel solutions: Flight Tickets, Hotel Booking, Umra Packages, Travel Insurance, Global Visa, Holiday Packages, and Cruise Booking.',
    url: 'https://oneworld.travel/services',
  },
}

const FAQS = [
  {
    question: 'How do I enquire about a specific service?',
    answer:
      'You can click the "Enquire Now" button on any service card to open our interactive enquiry form, or click the WhatsApp button to chat with our Puthiyara, Calicut desk with pre-filled details. You can also call us directly at +91 9746 299 992 or +91 952 6617 757.',
  },
  {
    question: 'Are flight tickets booked through an accredited agency?',
    answer:
      'Yes, One World Travel & Tours is an official IATA Accredited Agent and a member of TAFI (The Travel Agents Federation of India). We provide instant PNR issuance, direct flight connections from Calicut (CCJ) and South India, competitive airfares, and 24/7 rebooking assistance.',
  },
  {
    question: 'What is included in the Umra Packages?',
    answer:
      'Our Umra pilgrimage programs are end-to-end: direct flights from Calicut & GCC hubs, premium hotels within walking distance of Masjid al-Haram in Makkah and Masjid an-Nabawi in Madinah, full Umra e-visa issuance, ground transportation, and guided Ziyarat tours with experienced scholars.',
  },
  {
    question: 'Which countries do you process Global Visas for?',
    answer:
      'We process tourist, business, family visit, and transit visas for over 50 countries, including Schengen Member States (France, Germany, Italy, Switzerland, etc.), United Kingdom, United States, Canada, Australia, Singapore, Malaysia, Thailand, Vietnam, and express UAE/Saudi Arabia e-visas.',
  },
  {
    question: 'Can holiday packages and cruises be customized?',
    answer:
      'Absolutely! Every holiday itinerary and cruise package is tailored around your preferred dates, budget, hotel star preferences, and travel style — whether you are planning a romantic honeymoon, a family getaway, or a solo adventure.',
  },
  {
    question: 'Where is the One World Travel & Tours office located?',
    answer:
      'Our primary travel desk is situated in Puthiyara, Calicut (Kozhikode), Kerala. We welcome walk-in visits for consultations, or you can plan your complete journey remotely via phone and WhatsApp.',
  },
]

export default function ServicesPage() {
  const generalWhatsApp = buildGeneralEnquiryUrl()

  return (
    <div className="pt-20 sm:pt-24">
      {/* Compact Top Header — Services listed first! */}
      <div className="container-wide py-3 sm:py-4 border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            Our Services
          </h1>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold hidden sm:inline-block">
            IATA &amp; TAFI Accredited · Puthiyara, Calicut
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={generalWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent text-xs px-3.5 py-1.5 flex items-center gap-1.5"
          >
            <Phone size={12} />
            <span>Instant Help</span>
          </a>
        </div>
      </div>

      {/* Main Services Directory with Cards — Lists first right away! */}
      <section className="py-6 sm:py-8" aria-label="Services Catalog">
        <div className="container-wide">
          <ServicesList />
        </div>
      </section>

      {/* ─── Why Choose One World Travel & Tours ─────────────────── */}
      <section
        className="section-padding !py-20 border-t border-black/[0.06]"
        style={{ background: 'var(--background-soft)' }}
      >
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>
              The One World Advantage
            </span>
            <h2 className="text-title mt-1">
              Why Travelers Trust One World Travel &amp; Tours
            </h2>
            <p className="text-body text-sm mt-2">
              We combine accredited global industry access with attentive personal care from our Calicut travel headquarters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-[var(--accent)] flex items-center justify-center mb-5">
                  <Award size={24} />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  IATA &amp; TAFI Accredited
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Certified ticketing authority with global airline alliances, guaranteed genuine fares, and adherence to international passenger standards.
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-[#C4171A] mt-5 uppercase">
                Industry Recognized
              </span>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                  <MoonStar size={24} />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  Dedicated Umra Desk
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Specialized spiritual packages with direct departures from Calicut, vetted hotels in walking distance of Haram, and experienced Ziyarat guides.
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-amber-600 mt-5 uppercase">
                Revered Spiritual Care
              </span>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  High Visa Success
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Meticulous document vetting, itinerary proofs, and mock interview briefings for Schengen, UK, USA, Gulf, and Asia visas.
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-blue-600 mt-5 uppercase">
                50+ Countries
              </span>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-black/[0.08] shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                  <Clock size={24} />
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">
                  24/7 Ground Assistance
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  You are never alone. Our team in Puthiyara, Calicut stays connected on WhatsApp for rebooking, flight changes, or emergencies.
                </p>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-emerald-600 mt-5 uppercase">
                Always Reachable
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Calicut Headquarters & Visit Information ─────────────── */}
      <section className="section-padding !py-20 border-t border-black/[0.06] bg-white">
        <div className="container-wide">
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#C4171A]/20 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white/90 mb-4">
                  <MapPin size={12} className="text-[var(--accent)]" />
                  <span>Headquarters</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
                  Visit Our Travel Office in Puthiyara, Calicut
                </h2>
                <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                  Sit down with our experienced travel advisors in Calicut to discuss your holiday ideas, book group flight tickets, plan your Umra pilgrimage, or process international visas over a warm cup of coffee.
                </p>

                <div className="space-y-3 text-sm text-white/90">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[var(--accent)]">
                      <Phone size={15} />
                    </span>
                    <div>
                      <p className="text-[11px] text-white/50 uppercase font-semibold">Call / WhatsApp</p>
                      <p className="font-semibold">+91 9746 299 992 · +91 952 6617 757</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[var(--accent)]">
                      <MapPin size={15} />
                    </span>
                    <div>
                      <p className="text-[11px] text-white/50 uppercase font-semibold">Location</p>
                      <p className="font-semibold">Puthiyara, Calicut (Kozhikode), Kerala, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15">
                <h3 className="text-lg font-bold text-white mb-2">
                  Need an Immediate Quotation?
                </h3>
                <p className="text-xs text-white/75 mb-6 leading-relaxed">
                  Tell us which service you need. Our team will verify live flight seat availability, hotel rates, or visa timelines and send you a detailed breakdown.
                </p>

                <div className="space-y-3">
                  <a
                    href={generalWhatsApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent w-full justify-center text-xs py-3.5 shadow-lg"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                  <Link
                    href="/contact"
                    className="btn bg-white/10 hover:bg-white/20 text-white w-full justify-center text-xs py-3.5 border border-white/20"
                  >
                    Submit Detailed Query Form
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Frequently Asked Questions ───────────────────────────── */}
      <section className="section-padding !py-20 border-t border-black/[0.06]" style={{ background: 'var(--background-soft)' }}>
        <div className="container-narrow">
          <div className="text-center mb-12">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>
              Got Questions?
            </span>
            <h2 className="text-title mt-1">Frequently Asked Questions</h2>
            <p className="text-body text-sm mt-2">
              Everything you need to know about our services and booking process.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl p-5 border border-black/[0.08] [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-sm transition-all"
              >
                <summary className="flex items-center justify-between text-sm sm:text-base font-semibold text-gray-900 select-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
