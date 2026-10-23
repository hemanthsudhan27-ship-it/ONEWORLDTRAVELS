import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Award,
  ShieldCheck,
  Plane,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
  CheckCircle2,
  Globe2,
  Users,
} from 'lucide-react'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'About Us — Oneworld Travel and Tours | Puthiyara, Calicut',
  description:
    'Founded in 2019 by travel veteran Shahul Hameed (22+ years industry expertise). IATA Accredited Agent & TAFI Member in Puthiyara, Calicut with branch in Dubai. Direct ticketing and curated tour packages.',
  alternates: { canonical: 'https://oneworld.travel/about' },
  openGraph: {
    title: 'About Oneworld Travel and Tours — Puthiyara, Calicut & Dubai',
    description:
      'Founded in 2019 by Shahul Hameed (22+ years experience). IATA Accredited Agency in Puthiyara, Calicut.',
    url: 'https://oneworld.travel/about',
  },
}

const milestones = [
  {
    year: '2019',
    title: 'Founding in Puthiyara, Calicut',
    event:
      'Oneworld Travel and Tours officially commenced operations in Puthiyara, Calicut, founded by industry veteran Shahul Hameed to deliver transparent, human-first travel planning.',
  },
  {
    year: '2020',
    title: 'IATA & TAFI Accreditation',
    event:
      'Achieved prestigious IATA Accredited Agent status and TAFI membership, establishing direct airline ticketing authority and worldwide contract fares.',
  },
  {
    year: '2022',
    title: 'Signature Tour Packages & Umrah',
    event:
      'Expanded bespoke international holiday packages across Thailand, Bali, Maldives, and Europe, alongside sacred Umrah pilgrimage services with direct flights.',
  },
  {
    year: '2024',
    title: 'Dubai Branch Office Established',
    event:
      'Expanded international operations with a branch office in Dubai, UAE, facilitating seamless cross-border coordination for GCC travelers and global routing.',
  },
  {
    year: 'Present',
    title: 'Trusted Across Malabar & Beyond',
    event:
      'Thousands of families, honeymoon couples, and corporate travelers served with personalized attention, zero hidden fees, and 24/7 on-trip assistance.',
  },
]

const pillars = [
  {
    title: 'In-House IATA Direct Ticketing',
    desc: 'Direct GDS access for instant airline PNR generation, preferred fares out of Calicut (CCJ), Cochin (COK), Kannur (CNN), and 24/7 live rebooking assistance.',
  },
  {
    title: '22 Years Leadership by Shahul Hameed',
    desc: 'Led by founder Shahul Hameed with over two decades of travel expertise, every itinerary is planned with real logistical accuracy and firsthand destination knowledge.',
  },
  {
    title: 'Malabar Roots, Global Presence',
    desc: 'Headquartered in Puthiyara, Calicut with an international branch desk in Dubai, giving our passengers genuine local warmth backed by international reach.',
  },
  {
    title: 'Zero Hidden Fees & Direct Human Care',
    desc: 'Unlike faceless online booking portals, you speak with a dedicated specialist who takes personal responsibility for your journey from start to finish.',
  },
]

export default function AboutPage() {
  const generalWhatsApp = buildGeneralEnquiryUrl()

  return (
    <div className="pt-20 sm:pt-24">
      {/* Compact Top Header Bar */}
      <div className="container-wide py-3 sm:py-4 border-b border-black/[0.06] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            About Oneworld Travel and Tours
          </h1>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold hidden sm:inline-block">
            Est. 2019 · Puthiyara, Calicut · Dubai Branch
          </span>
        </div>
        <Link href="/packages" className="btn btn-outline text-xs px-3.5 py-1.5">
          Explore Packages →
        </Link>
      </div>

      {/* Main Story & Founder Section */}
      <section className="py-8 sm:py-14" aria-label="Our Story">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Story text */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-label text-xs uppercase tracking-widest text-accent font-semibold">
                  Founder &amp; Heritage
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-neutral-900 leading-tight mb-6">
                Built on 22 Years of Travel Expertise.
              </h2>

              <div className="space-y-4 text-neutral-700 leading-relaxed text-sm sm:text-base font-sans">
                <p>
                  <strong>ONEWORLD TRAVEL AND TOURS</strong> was founded in <strong>2019</strong> in <strong>Puthiyara, Calicut</strong> by <strong>Shahul Hameed</strong>, bringing more than <strong>22 years of hands-on expertise</strong> in the aviation and tourism industry.
                </p>
                <p>
                  Having spent over two decades in the travel sector, Shahul Hameed established Oneworld Travel and Tours to solve a growing frustration: the impersonal nature of online ticket aggregators, hidden charges, and the lack of reliable human support when travel plans change unexpectedly.
                </p>
                <p>
                  In <strong>2020</strong>, the company achieved official <strong>IATA Accredited Agent</strong> status and induction into the <strong>TAFI (Travel Agents Federation of India)</strong>. With our own direct in-house ticketing authority, we deal directly with global airlines, securing verified contract fares, instant PNR issuance, and 24/7 dedicated rebooking assistance for flights departing Calicut, Cochin, Kannur, and international hubs.
                </p>
                <p>
                  Today, rooted firmly in Malabar with our head office on Mini Bypass Road, Puthiyara, Calicut and an international branch in <strong>Dubai, UAE</strong>, we combine deep local understanding with global execution — specializing in direct flight ticketing, tailored holiday packages, and sacred Umrah pilgrimages.
                </p>
              </div>

              {/* Founder Quote Card */}
              <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 shadow-xs relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-accent" />
                <p className="text-sm sm:text-base italic text-neutral-800 font-serif leading-relaxed mb-3">
                  &ldquo;Travel is never just about booking a ticket or reserving a room. It is about trust, peace of mind, and having someone genuinely looking out for your family at every step of the journey.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-neutral-900">Shahul Hameed</p>
                    <p className="text-[11px] text-neutral-500">Founder &amp; Managing Director · 22 Years Travel Industry Veteran</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar: Image & Key Facts */}
            <div className="lg:col-span-5 space-y-6">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-black/5 bg-neutral-900">
                <Image
                  src="/images/about-travel.jpg"
                  alt="Oneworld Travel and Tours — Global journeys and flight connections"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-[11px] uppercase tracking-wider text-white/70 font-semibold">Calicut Head Office &amp; Dubai Branch</p>
                  <p className="text-base font-serif font-bold text-white">Connecting Calicut to the World</p>
                </div>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                  <p className="text-2xl font-bold font-serif text-accent">22+ Yrs</p>
                  <p className="text-xs text-neutral-600 mt-0.5 font-medium">Founder Experience</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                  <p className="text-2xl font-bold font-serif text-neutral-900">2019</p>
                  <p className="text-xs text-neutral-600 mt-0.5 font-medium">Year Established</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <ShieldCheck size={18} />
                    <span className="font-bold text-sm">IATA</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5 font-medium">Accredited Agent (2020)</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
                  <div className="flex items-center gap-1.5 text-accent">
                    <Award size={18} />
                    <span className="font-bold text-sm">TAFI</span>
                  </div>
                  <p className="text-xs text-neutral-600 mt-0.5 font-medium">Active Member</p>
                </div>
              </div>

              {/* Office Location Box */}
              <div className="p-5 rounded-2xl bg-neutral-900 text-white shadow-md">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Head Office</p>
                    <p className="text-xs sm:text-sm font-medium mt-1 leading-snug">
                      27/19, First Floor, Zam Zam Building,<br />
                      Mini Bypass Road, Puthiyara,<br />
                      Calicut (Kozhikode), Kerala
                    </p>
                    <p className="text-[11px] text-accent mt-2 font-medium">
                      International Branch: Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Strengths & Values */}
      <section className="py-12 sm:py-16 bg-neutral-50 border-y border-neutral-200/80" aria-label="Why Choose Us">
        <div className="container-wide">
          <div className="max-w-2xl mb-10">
            <span className="text-label text-xs uppercase tracking-widest text-accent font-semibold">
              Our Core Strengths
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              Why Travelers Trust Oneworld Travel and Tours
            </h2>
            <p className="text-neutral-600 text-sm mt-2">
              We specialize in direct ticketing and personalized holiday packages backed by authentic human care and regulatory accreditation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={p.title} className="p-6 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex gap-4">
                <span className="text-accent font-serif font-bold text-xl flex-shrink-0">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-base text-neutral-900 mb-1.5">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verified Timeline */}
      <section className="py-12 sm:py-16" aria-label="Milestones Timeline">
        <div className="container-wide">
          <div className="max-w-xl mb-10">
            <span className="text-label text-xs uppercase tracking-widest text-accent font-semibold">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 mt-1">
              Key Milestones
            </h2>
          </div>

          <div className="space-y-0 max-w-3xl">
            {milestones.map((m) => (
              <div
                key={m.year}
                className="flex flex-col sm:flex-row gap-2 sm:gap-8 py-5 border-t border-neutral-200/80"
              >
                <div className="w-24 shrink-0">
                  <span className="font-mono text-base font-bold text-accent">
                    {m.year}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral-900 mb-1">{m.title}</p>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-neutral-200/80" />
          </div>
        </div>
      </section>

      {/* Contact & Desk Details CTA */}
      <section className="py-12 sm:py-16 bg-neutral-900 text-white" aria-label="Visit or Contact Us">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="text-xs uppercase tracking-widest text-accent font-semibold">Visit Our Desk</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold mt-1 text-white">
                Plan Your Next Trip with Shahul Hameed &amp; Team
              </h2>
              <p className="text-neutral-300 text-sm mt-3 max-w-xl leading-relaxed">
                Whether you need urgent flight ticketing from Calicut, a sacred Umrah package, a family getaway, or visa assistance — our team in Puthiyara and Dubai is ready to assist.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-accent" />
                  <span className="font-semibold text-white">+91 9746 299 992</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-accent" />
                  <span>Calicut@oneworldtravel.co.in</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent" />
                  <span>Mon – Sat: 9:30 AM – 6:30 PM</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent text-xs px-6 py-3 flex items-center justify-center gap-2 shadow-lg"
              >
                <span>WhatsApp Desk (+91 9746 299 992)</span>
              </a>
              <Link href="/packages" className="btn btn-outline border-white/20 text-white hover:bg-white/10 text-xs px-5 py-3 text-center">
                Browse Packages
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
