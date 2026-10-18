'use client'

import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import { MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react'
import {
  PRIMARY_PHONE,
  SECONDARY_PHONE,
  OFFICE_LOCATION,
  buildGeneralEnquiryUrl,
  buildServiceEnquiryUrl,
} from '@/lib/whatsapp'
import {
  HotAirBalloonDoodle,
  SuitcaseDoodle,
  PassportStampDoodle,
} from '@/components/ui/TravelDoodles'

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export default function FinalCTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceOrDestination: 'Thailand Holiday Package',
    travelDates: '',
    notes: '',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert('Please enter your Name and Phone Number')
      return
    }

    const url = buildServiceEnquiryUrl(formData.serviceOrDestination, {
      name: formData.name,
      travelDates: formData.travelDates || 'Flexible / Next 30 Days',
      notes: `Contact: ${formData.phone}${formData.notes ? ` · Note: ${formData.notes}` : ''}`,
    })

    setFormSubmitted(true)
    window.open(url, '_blank')
  }

  return (
    <section
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      style={{ background: 'var(--background)' }}
      aria-label="Contact and Plan Your Trip"
    >
      {/* Subtle brand glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(196,23,26,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="container-wide relative">
        {/* Floating Hot Air Balloon Doodle */}
        <div className="absolute top-2 right-4 sm:right-20 pointer-events-none opacity-75 hidden md:block animate-pulse" style={{ animationDuration: '5s' }}>
          <HotAirBalloonDoodle className="w-16 h-20 text-accent/80" />
        </div>

        {/* Label */}
        <div className="reveal-up flex items-center gap-3 mb-10">
          <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>09 — Plan Your Trip</span>
          <span className="accent-line" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Credentials & Contact Info */}
          <div className="lg:col-span-6 reveal-up">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-headline">
                Ready to explore
                <br />
                <span style={{ color: 'var(--accent)' }}>the world with us?</span>
              </h2>
              <div className="hidden sm:block pointer-events-none opacity-70">
                <PassportStampDoodle className="w-16 h-16 text-accent/80" />
              </div>
            </div>

            <p className="text-body text-sm leading-relaxed mb-8 max-w-lg">
              Visit our office in Puthiyara, Calicut or connect with our travel desk directly. From airline ticketing and visas to customized holiday getaways and Umrah pilgrimages, we craft every itinerary with care.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-black/[0.06] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}>
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-muted">Head Office</span>
                  <p className="text-sm font-semibold text-foreground">{OFFICE_LOCATION}</p>
                  <p className="text-xs text-muted">Monday – Saturday: 9:00 AM – 7:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-black/[0.06] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}>
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block text-muted">Direct Phone Support</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-0.5">
                    <a href={`tel:${PRIMARY_PHONE.replace(/\s+/g, '')}`} className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
                      {PRIMARY_PHONE}
                    </a>
                    <span className="text-muted text-xs">·</span>
                    <a href={`tel:${SECONDARY_PHONE.replace(/\s+/g, '')}`} className="text-sm font-semibold text-foreground hover:text-accent transition-colors">
                      {SECONDARY_PHONE}
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-4 rounded-xl border border-black/[0.06] bg-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-foreground block">IATA Accredited Agent & TAFI Member</span>
                  <span className="text-muted">Official ticketing authority & consumer-protected operations</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-accent text-xs flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                Quick WhatsApp Chat
              </a>
              <Link href="/services" className="btn btn-outline text-xs">
                Explore All Services
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Quick Enquiry Form */}
          <div className="lg:col-span-6 reveal-up">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-black/[0.08]">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-black/[0.06]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Quick Enquiry</span>
                  <h3 className="text-xl font-bold text-foreground">Get a Custom Itinerary & Quote</h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>

              {formSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base mb-1">Enquiry Prepared!</h4>
                  <p className="text-xs text-muted mb-4">
                    Your pre-filled message has been prepared for WhatsApp. If it didn&apos;t open automatically, click below:
                  </p>
                  <a
                    href={buildServiceEnquiryUrl(formData.serviceOrDestination, {
                      name: formData.name,
                      travelDates: formData.travelDates,
                      notes: `Phone: ${formData.phone}`,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-accent text-xs inline-flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    Open WhatsApp Chat
                  </a>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="block text-xs text-muted hover:underline mx-auto mt-4"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Package or Service
                      </label>
                      <select
                        value={formData.serviceOrDestination}
                        onChange={(e) => setFormData({ ...formData, serviceOrDestination: e.target.value })}
                        className="w-full h-11 px-3 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                      >
                        <option value="Thailand Holiday Package">Thailand Holiday Package</option>
                        <option value="Bali Island Paradise">Bali Island Paradise</option>
                        <option value="Maldives Luxury Resort">Maldives Luxury Resort</option>
                        <option value="Executive Umrah Package">Executive Umrah Package</option>
                        <option value="Kazakhstan Mountain Adventure">Kazakhstan Mountain Adventure</option>
                        <option value="Lakshadweep Coral Voyage">Lakshadweep Coral Voyage</option>
                        <option value="Flight Ticket Booking (IATA Desk)">Flight Ticket Booking</option>
                        <option value="Global Visa Consultation">Global Visa Consultation</option>
                        <option value="Custom Honeymoon Package">Custom Honeymoon Package</option>
                        <option value="Luxury Cruise Booking">Luxury Cruise Booking</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-foreground mb-1.5">
                        Preferred Travel Date
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Next month / Dec 2026"
                        value={formData.travelDates}
                        onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                        className="w-full h-11 px-3.5 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Notes / Requirements (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Number of travellers, preferred hotels, special requests..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-3 rounded-xl border border-black/15 bg-background text-xs sm:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn btn-accent py-3 text-xs sm:text-sm shadow-md shadow-accent/20 flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Send Enquiry via WhatsApp</span>
                  </button>

                  <p className="text-[10px] text-muted text-center pt-1">
                    No spam. Direct prefilled WhatsApp message to our Calicut office travel desk.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
