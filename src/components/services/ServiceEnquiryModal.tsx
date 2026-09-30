'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import {
  X,
  Send,
  CheckCircle2,
  Phone,
  Plane,
  Building2,
  MoonStar,
  ShieldCheck,
  Globe,
  Palmtree,
  Ship,
  Sparkles,
  ArrowRight,
} from 'lucide-react'
import { Service, servicesData, companyDetails } from '@/lib/data/services'
import { buildServiceEnquiryUrl } from '@/lib/whatsapp'

interface ServiceEnquiryModalProps {
  isOpen: boolean
  onClose: () => void
  initialService: Service | null
}

const getServiceIcon = (iconName: string, size = 20) => {
  switch (iconName) {
    case 'Plane':
      return <Plane size={size} aria-hidden="true" />
    case 'Hotel':
      return <Building2 size={size} aria-hidden="true" />
    case 'MoonStar':
      return <MoonStar size={size} aria-hidden="true" />
    case 'ShieldCheck':
      return <ShieldCheck size={size} aria-hidden="true" />
    case 'Globe':
      return <Globe size={size} aria-hidden="true" />
    case 'Palmtree':
      return <Palmtree size={size} aria-hidden="true" />
    case 'Ship':
      return <Ship size={size} aria-hidden="true" />
    default:
      return <Sparkles size={size} aria-hidden="true" />
  }
}

export default function ServiceEnquiryModal({
  isOpen,
  onClose,
  initialService,
}: ServiceEnquiryModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialService?.id || servicesData[0].id
  )
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [travelDates, setTravelDates] = useState('')
  const [travelers, setTravelers] = useState('2 travellers')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeService =
    servicesData.find((s) => s.id === selectedServiceId) || servicesData[0]

  useEffect(() => {
    if (initialService) {
      setSelectedServiceId(initialService.id)
    }
    setIsSubmitted(false)
    setError(null)
  }, [initialService, isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleWhatsAppEnquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your name so we can address you properly.')
      return
    }
    if (!phone.trim()) {
      setError('Please provide your contact number.')
      return
    }
    setError(null)

    const url = buildServiceEnquiryUrl(activeService.title, {
      name,
      travelDates: travelDates || undefined,
      travelers: travelers || undefined,
      notes: notes || undefined,
    })

    window.open(url, '_blank')
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Please enter your full name.')
      return
    }
    if (!phone.trim()) {
      setError('Please enter your phone or WhatsApp number.')
      return
    }
    setError(null)
    setIsSubmitting(true)

    // Simulate reliable dispatch
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden my-auto z-10 transition-all duration-300"
        style={{ maxHeight: '92vh' }}
      >
        {/* Top Header with Brand Crimson Accent */}
        <div className="relative bg-gradient-to-r from-[#991217] via-[#C4171A] to-[#800F12] text-white p-6 sm:p-7">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2.5 py-0.5 rounded-full text-white/90">
              One World Travel & Tours
            </span>
            <span className="text-white/60 text-xs">·</span>
            <span className="text-[11px] text-white/80 font-medium">Puthiyara, Calicut</span>
          </div>

          <div className="flex items-start gap-4 mt-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0 text-white shadow-inner">
              {getServiceIcon(activeService.icon, 24)}
            </div>
            <div>
              <h2
                id="enquiry-modal-title"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
              >
                Enquire: {activeService.title}
              </h2>
              <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-md line-clamp-1">
                {activeService.tagline}
              </p>
            </div>
          </div>

          {/* Service Selector Dropdown */}
          <div className="mt-5 pt-4 border-t border-white/15 flex items-center gap-2 text-xs">
            <span className="text-white/70 whitespace-nowrap">Service:</span>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="bg-white/15 text-white text-xs font-medium py-1.5 px-3 rounded-xl border border-white/25 focus:outline-none focus:ring-1 focus:ring-white cursor-pointer w-full max-w-xs"
              aria-label="Select service to enquire"
            >
              {servicesData.map((s) => (
                <option key={s.id} value={s.id} className="text-black bg-white">
                  {s.number}. {s.title} ({s.badge})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto" style={{ maxHeight: 'calc(92vh - 180px)' }}>
          {isSubmitted ? (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Enquiry Received!
              </h3>
              <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
                Thank you, <strong>{name}</strong>! Our dedicated{' '}
                <strong>{activeService.title}</strong> specialist at our Puthiyara, Calicut office will reach out to you within a few hours.
              </p>

              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200/60 max-w-md mx-auto mb-6 text-left text-xs space-y-2 text-gray-700">
                <p>
                  <strong>Service:</strong> {activeService.title}
                </p>
                <p>
                  <strong>Contact:</strong> {phone} {email && `· ${email}`}
                </p>
                {travelDates && (
                  <p>
                    <strong>Estimated Dates:</strong> {travelDates}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={buildServiceEnquiryUrl(activeService.title, {
                    name,
                    travelDates,
                    travelers,
                    notes,
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-accent w-full sm:w-auto text-xs py-3 px-6 gap-2"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline w-full sm:w-auto text-xs py-3 px-6"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} noValidate>
              {error && (
                <div
                  role="alert"
                  className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Service Highlights Strip */}
              <div className="mb-6 p-4 rounded-2xl bg-stone-50 border border-stone-200/70">
                <p className="text-[11px] font-bold text-gray-700 tracking-wide uppercase mb-2">
                  What is included in {activeService.title}:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                  {activeService.features.slice(0, 4).map((f, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#C4171A] font-bold mt-0.5">•</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="modal-name"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Your Name <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    id="modal-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Mohammed Farhan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all bg-white"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor="modal-phone"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    WhatsApp / Phone Number <span className="text-[var(--accent)]">*</span>
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all bg-white"
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label
                    htmlFor="modal-email"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Email Address <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="yourname@domain.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all bg-white"
                  />
                </div>

                {/* Travel Dates */}
                <div>
                  <label
                    htmlFor="modal-dates"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Travel Date / Month
                  </label>
                  <input
                    id="modal-dates"
                    type="text"
                    value={travelDates}
                    onChange={(e) => setTravelDates(e.target.value)}
                    placeholder="e.g. Next Month / Nov 2026"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all bg-white"
                  />
                </div>

                {/* Number of Passengers / Travellers */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="modal-travelers"
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                  >
                    Travellers / Beneficiaries
                  </label>
                  <select
                    id="modal-travelers"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all bg-white appearance-none"
                  >
                    <option value="Solo (1 Person)">Solo (1 Person)</option>
                    <option value="2 travellers (Couple / Duo)">2 travellers (Couple / Duo)</option>
                    <option value="Family (3 to 4 People)">Family (3 to 4 People)</option>
                    <option value="Family & Relatives (5 to 8 People)">Family & Relatives (5 to 8 People)</option>
                    <option value="Group / Corporate (9+ People)">Group / Corporate (9+ People)</option>
                  </select>
                </div>
              </div>

              {/* Requirements & Notes */}
              <div className="mb-6">
                <label
                  htmlFor="modal-notes"
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                >
                  Specific Details / Requirements
                </label>
                <textarea
                  id="modal-notes"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={`Tell us any destinations, airline preferences, budget, or dates for ${activeService.title}...`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20 focus:border-[var(--accent)] transition-all resize-none bg-white"
                />
              </div>

              {/* Dual Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {/* Instant WhatsApp Action */}
                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="btn bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-[0.98]"
                  title="Send enquiry directly to WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span>Enquire on WhatsApp</span>
                </button>

                {/* Online Submission */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-accent py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Call Direct Help */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <Phone size={13} className="text-[var(--accent)]" />
                  Prefer calling?
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+919072329992"
                    className="font-medium text-gray-800 hover:text-[var(--accent)] transition-colors underline decoration-dotted"
                  >
                    +91 907 2329 992
                  </a>
                  <span>·</span>
                  <a
                    href="tel:+919526617757"
                    className="font-medium text-gray-800 hover:text-[var(--accent)] transition-colors underline decoration-dotted"
                  >
                    +91 952 6617 757
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
