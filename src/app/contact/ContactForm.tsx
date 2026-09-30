'use client'

import { useState, useRef, FormEvent } from 'react'
import { Mail, Send, Check } from 'lucide-react'

const destinations = [
  'Himalayas / North India',
  'Rajasthan',
  'Kerala / South India',
  'Morocco',
  'Japan',
  'Multiple destinations',
  "I'm not sure yet",
]

interface FormState {
  name: string
  email: string
  phone: string
  destination: string
  travelDates: string
  travelers: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  destination?: string
  message?: string
}

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!data.name || data.name.length < 2) errors.name = 'Please enter your full name'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email address'
  if (!data.destination) errors.destination = 'Please select a preferred destination'
  if (!data.message || data.message.length < 10) errors.message = 'Please tell us a bit more (at least 10 characters)'
  return errors
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const formRef = useRef<HTMLFormElement>(null)

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const data: FormState = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      destination: (form.elements.namedItem('destination') as HTMLSelectElement).value,
      travelDates: (form.elements.namedItem('travelDates') as HTMLInputElement).value,
      travelers: (form.elements.namedItem('travelers') as HTMLSelectElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    }

    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
          style={{ background: 'rgba(196,23,26,0.08)' }}
        >
          <Check size={24} style={{ color: 'var(--accent)' }} aria-hidden="true" />
        </div>
        <h2 className="text-title mb-3">We&apos;ll be in touch.</h2>
        <p className="text-body max-w-sm mx-auto">
          Thank you for reaching out. Someone from our team will contact you within 24 hours.
        </p>
      </div>
    )
  }

  const inputStyle = (hasError: boolean) => ({
    borderColor: hasError ? 'var(--accent)' : 'var(--border)',
    fontSize: '14px',
  })

  return (
    <form
      ref={formRef}
      onSubmit={handleFormSubmit}
      noValidate
      aria-label="Travel enquiry form"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block text-xs font-medium mb-2">
            Full Name <span className="text-[var(--accent)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Priya Mehta"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow"
            style={inputStyle(!!errors.name)}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block text-xs font-medium mb-2">
            Email Address <span className="text-[var(--accent)]" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="priya@example.com"
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow"
            style={inputStyle(!!errors.email)}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block text-xs font-medium mb-2">
            Phone Number
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow"
            style={inputStyle(false)}
          />
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="contact-destination" className="block text-xs font-medium mb-2">
            Preferred Destination <span className="text-[var(--accent)]" aria-hidden="true">*</span>
          </label>
          <select
            id="contact-destination"
            name="destination"
            aria-required="true"
            aria-describedby={errors.destination ? 'destination-error' : undefined}
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow bg-white appearance-none"
            style={inputStyle(!!errors.destination)}
            defaultValue=""
          >
            <option value="" disabled>Select destination</option>
            {destinations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.destination && (
            <p id="destination-error" role="alert" className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
              {errors.destination}
            </p>
          )}
        </div>

        {/* Travel Dates */}
        <div>
          <label htmlFor="contact-dates" className="block text-xs font-medium mb-2">
            Travel Dates (approximate)
          </label>
          <input
            id="contact-dates"
            name="travelDates"
            type="text"
            placeholder="e.g. February 2027"
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow"
            style={inputStyle(false)}
          />
        </div>

        {/* Travelers */}
        <div>
          <label htmlFor="contact-travelers" className="block text-xs font-medium mb-2">
            Number of Travellers
          </label>
          <select
            id="contact-travelers"
            name="travelers"
            className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow bg-white appearance-none"
            style={inputStyle(false)}
            defaultValue=""
          >
            <option value="" disabled>Select</option>
            {['Just me', '2 people', '3–4 people', '5–8 people', '9+ people'].map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="mb-7">
        <label htmlFor="contact-message" className="block text-xs font-medium mb-2">
          Tell us about your ideal journey <span className="text-[var(--accent)]" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          placeholder="What kind of experience are you looking for? Any specific interests, preferences, or places you've always wanted to visit?"
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-shadow resize-none"
          style={inputStyle(!!errors.message)}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-accent w-full sm:w-auto justify-center"
        aria-busy={loading}
      >
        {loading ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send size={15} aria-hidden="true" />
            Send Enquiry
          </>
        )}
      </button>

      <p className="text-xs mt-4" style={{ color: 'var(--muted)' }}>
        No commitment required. We&apos;ll respond within 24 hours.
      </p>
    </form>
  )
}
