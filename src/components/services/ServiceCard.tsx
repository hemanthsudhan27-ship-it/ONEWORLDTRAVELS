'use client'

import {
  Plane,
  Building2,
  MoonStar,
  ShieldCheck,
  Globe,
  Palmtree,
  Ship,
  Sparkles,
  ArrowRight,
  Check,
  PhoneCall,
} from 'lucide-react'
import { Service } from '@/lib/data/services'
import { buildServiceEnquiryUrl } from '@/lib/whatsapp'

interface ServiceCardProps {
  service: Service
  onEnquire: (service: Service) => void
}

const renderServiceIcon = (iconName: string) => {
  const iconProps = { size: 28, className: 'text-white' }
  switch (iconName) {
    case 'Plane':
      return <Plane {...iconProps} aria-hidden="true" />
    case 'Hotel':
      return <Building2 {...iconProps} aria-hidden="true" />
    case 'MoonStar':
      return <MoonStar {...iconProps} aria-hidden="true" />
    case 'ShieldCheck':
      return <ShieldCheck {...iconProps} aria-hidden="true" />
    case 'Globe':
      return <Globe {...iconProps} aria-hidden="true" />
    case 'Palmtree':
      return <Palmtree {...iconProps} aria-hidden="true" />
    case 'Ship':
      return <Ship {...iconProps} aria-hidden="true" />
    default:
      return <Sparkles {...iconProps} aria-hidden="true" />
  }
}

export default function ServiceCard({ service, onEnquire }: ServiceCardProps) {
  const directWhatsAppUrl = buildServiceEnquiryUrl(service.title)

  return (
    <article
      id={`service-${service.id}`}
      className="group relative bg-white rounded-3xl p-7 sm:p-8 border border-black/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 overflow-hidden"
    >
      {/* Background Accent Sheen on hover */}
      <div
        className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[var(--accent)]/10 to-transparent rounded-bl-full pointer-events-none transition-opacity duration-300 group-hover:from-[var(--accent)]/15"
        aria-hidden="true"
      />

      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-6">
          {/* Service Icon with Red Rounded Pill Capsule (reminiscent of the flyer's iconic design) */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#991217] via-[#C4171A] to-[#800F12] flex items-center justify-center shadow-md shadow-[#C4171A]/20 transition-transform duration-300 group-hover:scale-105">
            {renderServiceIcon(service.icon)}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className="text-label text-[11px] font-bold tracking-widest text-black/40"
              aria-label={`Service ${service.number}`}
            >
              {service.number}
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200/60">
              {service.badge}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl font-bold tracking-tight text-gray-950 mb-2 transition-colors group-hover:text-[var(--accent)]">
          {service.title}
        </h3>
        <p className="text-xs font-medium text-[var(--accent)] mb-3">
          {service.tagline}
        </p>

        {/* Short Description */}
        <p className="text-body text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {/* Highlights Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.highlights.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-50 border border-stone-200/80 text-stone-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key Inclusions Checklist */}
        <div className="pt-4 border-t border-black/[0.06] mb-8">
          <p className="text-label text-[10px] text-stone-600 tracking-wider mb-3">
            Key Features & Inclusions
          </p>
          <ul className="space-y-2.5">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 leading-snug">
                <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                  <Check size={11} strokeWidth={3} />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Enquiry Actions Footer */}
      <div className="pt-5 border-t border-black/[0.06] flex items-center gap-2.5">
        {/* Main Enquire Button */}
        <button
          onClick={() => onEnquire(service)}
          className="btn btn-accent flex-1 justify-center text-xs py-3 px-4 font-semibold tracking-wide rounded-xl shadow-sm hover:shadow group/btn"
          aria-label={`Enquire about ${service.title}`}
        >
          <span>Enquire Now</span>
          <ArrowRight
            size={14}
            className="transition-transform group-hover/btn:translate-x-1"
            aria-hidden="true"
          />
        </button>

        {/* WhatsApp Direct Action */}
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors duration-200 flex items-center justify-center flex-shrink-0"
          title={`Enquire on WhatsApp about ${service.title}`}
          aria-label={`Enquire about ${service.title} on WhatsApp`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="17"
            height="17"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Direct Call Link */}
        <a
          href="tel:+919746299992"
          className="p-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors duration-200 flex items-center justify-center flex-shrink-0"
          title="Call One World Travel Puthiyara Office"
          aria-label="Call +91 9746 299 992"
        >
          <PhoneCall size={16} />
        </a>
      </div>
    </article>
  )
}
