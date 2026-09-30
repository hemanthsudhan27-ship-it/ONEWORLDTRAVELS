import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getDestinationBySlug, destinations } from '@/lib/data/destinations'
import { journeys } from '@/lib/data/journeys'
import { Calendar, Thermometer, Globe, DollarSign } from 'lucide-react'
import { buildDestinationEnquiryUrl, buildJourneyEnquiryUrl } from '@/lib/whatsapp'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) return { title: 'Destination Not Found' }
  return {
    title: `${dest.name} Travel — ${dest.tagline}`,
    description: dest.longDescription.substring(0, 160),
    alternates: { canonical: `https://oneworld.travel/destinations/${dest.slug}` },
    openGraph: {
      title: `${dest.name} — One World Travel`,
      description: dest.tagline,
      url: `https://oneworld.travel/destinations/${dest.slug}`,
      images: [{ url: dest.heroImage, width: 1200, height: 630, alt: dest.name }],
    },
  }
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params
  const dest = getDestinationBySlug(slug)
  if (!dest) notFound()

  const relatedJourneys = journeys.filter((j) => j.destinationSlug === dest.slug)

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[500px] flex flex-col justify-end" aria-label={dest.name}>
        <div className="absolute inset-0">
          <Image
            src={dest.heroImage}
            alt={`${dest.name} — ${dest.tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 container-wide pb-12">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white/80 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/destinations" className="hover:text-white/80 transition-colors">Destinations</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">{dest.name}</li>
            </ol>
          </nav>

          <span className="text-label text-[10px]" style={{ color: 'var(--accent)' }}>{dest.number}</span>
          <h1 className="text-display text-white mb-2" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
            {dest.name}
          </h1>
          <p className="text-white/70 text-xl">{dest.tagline}</p>
        </div>
      </section>

      {/* Content */}
      <div className="container-wide py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main */}
        <div className="lg:col-span-2 space-y-12">
          <section aria-label="About this destination">
            <h2 className="text-title mb-5">About {dest.name}</h2>
            {dest.longDescription.split('\n\n').map((p, i) => (
              <p key={i} className="text-body mb-4">{p}</p>
            ))}
          </section>

          <section aria-label="Highlights">
            <h2 className="text-title mb-5">Highlights</h2>
            <div className="grid grid-cols-2 gap-3">
              {dest.highlights.map((h) => (
                <div
                  key={h}
                  className="p-4 rounded-2xl flex items-center gap-3 text-sm"
                  style={{ background: 'var(--background-soft)' }}
                >
                  <span className="accent-dot flex-shrink-0" aria-hidden="true" />
                  {h}
                </div>
              ))}
            </div>
          </section>

          {/* Related journeys */}
          {relatedJourneys.length > 0 && (
            <section aria-label={`Journeys to ${dest.name}`}>
              <h2 className="text-title mb-6">Journeys to {dest.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {relatedJourneys.map((j) => (
                  <article key={j.id} className="space-y-3">
                    <Link
                      href={`/journeys/${j.slug}`}
                      className="group block rounded-2xl overflow-hidden border hover:border-transparent hover:shadow-lg transition-all duration-300"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <div className="relative h-40">
                        <Image src={j.image} alt={j.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-3 left-4">
                          <p className="text-white font-semibold">{j.title}</p>
                          <p className="text-white/60 text-xs">{j.duration} · From {j.price ? `₹${j.price.toLocaleString('en-IN')}` : j.priceText || 'On Request'}</p>
                        </div>
                      </div>
                    </Link>
                    <a
                      href={buildJourneyEnquiryUrl(j.title, dest.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline w-full justify-center text-xs"
                      id={`enquire-journey-${j.slug}`}
                    >
                      Enquire via WhatsApp →
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-5">
          <div className="glass rounded-2xl p-6">
            <p className="text-label text-xs mb-5" style={{ color: 'var(--muted)' }}>Quick facts</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Best time to visit</p>
                  <p className="text-sm font-medium">{dest.bestTime}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Thermometer size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Climate</p>
                  <p className="text-sm font-medium">{dest.climate}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Language</p>
                  <p className="text-sm font-medium">{dest.language}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--accent)' }} aria-hidden="true" />
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'var(--muted)' }}>Currency</p>
                  <p className="text-sm font-medium">{dest.currency}</p>
                </div>
              </div>
            </div>
          </div>

          <a
            href={buildDestinationEnquiryUrl(dest.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent w-full justify-center"
            id={`enquire-destination-${dest.slug}`}
          >
            Plan a Trip Here →
          </a>
        </div>
      </div>
    </div>
  )
}
