'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe2, Share2, Mail, MapPin, Phone, ShieldCheck, Award } from 'lucide-react'

const footerLinks = {
  packages: [
    { label: 'Thailand (Bangkok & Pattaya)', href: '/packages/thailand-bangkok-pattaya' },
    { label: 'Bali Tropical Escape', href: '/packages/bali-tropical-escape' },
    { label: 'Maldives Paradise Getaway', href: '/packages/maldives-paradise-getaway' },
    { label: 'Lakshadweep Island', href: '/packages/lakshadweep-island-getaway' },
    { label: 'All Packages', href: '/packages' },
  ],
  destinations: [
    { label: 'Destinations', href: '/destinations' },
    { label: 'Our Services', href: '/services' },
    { label: 'About Us', href: '/about' },
    { label: 'Photo Gallery', href: '/gallery' },
    { label: 'Traveler Reviews', href: '/reviews' },
    { label: 'Contact Us', href: '/contact' },
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
      <div className="container-wide py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2"
              aria-label="Oneworld Travel and Tours home"
            >
              <Image
                src="/logo.svg"
                alt="Oneworld Travel and Tours Logo"
                width={140}
                height={52}
                className="w-32 h-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
              ONEWORLD TRAVEL AND TOURS — IATA Accredited Agent &amp; TAFI Member. Founded in 2019 by Shahul Hameed. In-house direct ticketing &amp; bespoke tour packages.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-[10px] font-semibold">
                <ShieldCheck size={12} className="text-emerald-600" />
                IATA Accredited
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200/80 text-[10px] font-semibold">
                <Award size={12} className="text-accent" />
                TAFI Member
              </span>
            </div>
          </div>

          {/* Packages Column */}
          <div>
            <p className="text-label text-xs mb-4 font-semibold tracking-wider uppercase" style={{ color: 'var(--foreground)' }}>
              Tour Packages
            </p>
            <ul className="space-y-2.5">
              {footerLinks.packages.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--accent)] py-0.5 inline-block"
                    style={{ color: 'var(--muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <p className="text-label text-xs mb-4 font-semibold tracking-wider uppercase" style={{ color: 'var(--foreground)' }}>
              Quick Links
            </p>
            <ul className="space-y-2.5">
              {footerLinks.destinations.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[var(--accent)] py-0.5 inline-block"
                    style={{ color: 'var(--muted)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Desk Column */}
          <div>
            <p className="text-label text-xs mb-4 font-semibold tracking-wider uppercase" style={{ color: 'var(--foreground)' }}>
              Contact &amp; Offices
            </p>
            <div className="space-y-3">
              <a
                href="https://wa.me/919746299992"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm transition-colors hover:text-[var(--accent)] group"
                style={{ color: 'var(--foreground)' }}
                aria-label="Chat with Oneworld Travel on WhatsApp"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </span>
                <span className="font-semibold text-xs sm:text-sm">+91 9746 299 992</span>
              </a>

              <a
                href="tel:+919526617757"
                className="flex items-center gap-2.5 text-xs sm:text-sm transition-colors hover:text-[var(--accent)] group"
                style={{ color: 'var(--muted)' }}
              >
                <span className="w-7 h-7 rounded-full bg-neutral-200/60 text-neutral-700 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Phone size={13} />
                </span>
                <span>+91 952 6617 757</span>
              </a>

              <a
                href="mailto:Calicut@oneworldtravel.co.in"
                className="flex items-center gap-2.5 text-xs sm:text-sm transition-colors hover:text-[var(--accent)] group"
                style={{ color: 'var(--muted)' }}
              >
                <span className="w-7 h-7 rounded-full bg-neutral-200/60 text-neutral-700 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                  <Mail size={13} />
                </span>
                <span className="truncate">Calicut@oneworldtravel.co.in</span>
              </a>

              <div className="flex items-start gap-2.5 text-xs" style={{ color: 'var(--muted)' }}>
                <span className="w-7 h-7 rounded-full bg-neutral-200/60 text-neutral-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={13} />
                </span>
                <span className="leading-relaxed">
                  27/19, First Floor, Zam Zam Building, Mini Bypass Road, Puthiyara, Calicut · Dubai Branch
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="border-t container-wide py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="text-xs text-center sm:text-left" style={{ color: 'var(--muted)' }}>
          © {new Date().getFullYear()} ONEWORLD TRAVEL AND TOURS. All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/919746299992"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-xs flex items-center gap-1 font-medium"
            style={{ color: 'var(--muted)' }}
          >
            <span>WhatsApp Support</span>
          </a>
          <span className="text-neutral-300">·</span>
          <Link
            href="/contact"
            className="p-2 rounded-full hover:bg-black/5 transition-colors text-xs font-medium"
            style={{ color: 'var(--muted)' }}
          >
            Contact Desk
          </Link>
        </div>
      </div>
    </footer>
  )
}
