'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe2, Share2, Mail, MapPin } from 'lucide-react'
import NewsletterForm from './NewsletterForm'

const footerLinks = {
  journeys: [
    { label: 'Himalayan Trail', href: '/journeys/himalayan-trail' },
    { label: 'Rajasthan After Dark', href: '/journeys/rajasthan-after-dark' },
    { label: 'Coastal Kerala', href: '/journeys/coastal-kerala' },
    { label: 'Moroccan Desert Odyssey', href: '/journeys/moroccan-desert-odyssey' },
    { label: 'All Journeys', href: '/journeys' },
  ],
  destinations: [
    { label: 'Himalayas', href: '/destinations/himalayas' },
    { label: 'Rajasthan', href: '/destinations/rajasthan' },
    { label: 'Kerala', href: '/destinations/kerala' },
    { label: 'Morocco', href: '/destinations/morocco' },
    { label: 'Japan', href: '/destinations/japan' },
  ],
  company: [
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Stories', href: '/stories' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{ borderColor: 'var(--border)', background: 'var(--background-soft)' }}
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="container-wide py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 mb-6"
              aria-label="One World Travel home"
            >
              <Image
                src="/logo.svg"
                alt="One World Logo"
                width={140}
                height={52}
                className="w-32 h-auto"
              />
            </Link>
            <p className="text-body text-sm leading-relaxed max-w-xs mb-8" style={{ color: 'var(--muted)' }}>
              Curated journeys for people who want to experience more. We believe travel should feel like a story worth telling.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-label text-xs mb-3" style={{ color: 'var(--muted)' }}>Travel Letters</p>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Occasional notes on travel, destinations, and ideas worth your time.
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Nav Columns */}
          <div>
            <p className="text-label text-xs mb-5" style={{ color: 'var(--muted)' }}>Journeys</p>
            <ul className="space-y-3">
              {footerLinks.journeys.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-xs mb-5" style={{ color: 'var(--muted)' }}>Destinations</p>
            <ul className="space-y-3">
              {footerLinks.destinations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-label text-xs mb-5" style={{ color: 'var(--muted)' }}>Company</p>
            <ul className="space-y-3 mb-8">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--accent)]"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact */}
            <p className="text-label text-xs mb-4" style={{ color: 'var(--muted)' }}>Contact</p>
            <div className="space-y-2">
              <a
                href="https://wa.me/919072329992"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--muted)' }}
                aria-label="Chat with One World on WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                +91 907 2329 992
              </a>
              <a
                href="tel:+919526617757"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--muted)' }}
              >
                <span className="w-3.5 text-center text-xs">📞</span>
                +91 952 6617 757
              </a>
              <a
                href="mailto:hello@oneworld.travel"
                className="flex items-center gap-2 text-sm transition-colors hover:text-[var(--accent)]"
                style={{ color: 'var(--muted)' }}
              >
                <Mail size={13} aria-hidden="true" />
                hello@oneworld.travel
              </a>
              <div className="flex items-start gap-2 text-sm" style={{ color: 'var(--muted)' }}>
                <MapPin size={13} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Puthiyara, Calicut · Kerala</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t container-wide py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} One World Travel Pvt. Ltd. All rights reserved.
        </p>

        {/* Social */}
        <div className="flex items-center gap-4">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="One World on Instagram"
            style={{ color: 'var(--muted)' }}
          >
            <Globe2 size={16} aria-hidden="true" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="One World on X / Twitter"
            style={{ color: 'var(--muted)' }}
          >
            <Share2 size={16} aria-hidden="true" />
          </a>
          <a
            href="mailto:hello@oneworld.travel"
            className="p-2 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Email One World"
            style={{ color: 'var(--muted)' }}
          >
            <Mail size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
