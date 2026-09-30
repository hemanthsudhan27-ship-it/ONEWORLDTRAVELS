'use client'

import { useState, FormEvent } from 'react'

export default function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-sm font-medium" style={{ color: 'var(--accent)' }}>
        ✓ You&apos;re subscribed. Thank you.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm" aria-label="Newsletter signup">
      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
      <input
        id="newsletter-email"
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        className="flex-1 px-4 py-2.5 text-sm border rounded-full bg-white focus:outline-none focus:ring-2 transition-shadow"
        style={{
          borderColor: 'var(--border)',
          color: 'var(--foreground)',
          fontSize: '13px',
        }}
      />
      <button type="submit" className="btn btn-primary px-4 py-2.5 text-[12px]">
        Subscribe
      </button>
    </form>
  )
}
