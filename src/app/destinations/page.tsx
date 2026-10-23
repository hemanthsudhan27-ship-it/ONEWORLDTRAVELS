import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { destinations } from '@/lib/data/destinations'

export const metadata: Metadata = {
  title: 'Destinations — The World, Curated',
  description:
    'Explore our curated selection of extraordinary destinations — from the Himalayas to Morocco, Kerala to Japan. Every place on our list is somewhere we know deeply.',
  alternates: { canonical: 'https://oneworld.travel/destinations' },
  openGraph: {
    title: 'Destinations — The World, Curated by One World Travel',
    description: 'Extraordinary places, curated for intentional travellers.',
    url: 'https://oneworld.travel/destinations',
  },
}

export default function DestinationsPage() {
  return (
    <div className="pt-20 sm:pt-24">
      {/* Compact Top Header — Destinations listed first */}
      <div className="container-wide py-3 sm:py-4 border-b border-black/[0.06] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            Destinations
          </h1>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold hidden sm:inline-block">
            {destinations.length} Curated Regions
          </span>
        </div>
        <Link href="/packages" className="btn btn-outline text-xs px-3.5 py-1.5">
          View All Packages →
        </Link>
      </div>

      {/* Destination grid — starts right away! */}
      <section className="py-6 sm:py-8" aria-label="All Destinations">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, index) => (
              <article key={dest.id}>
                <Link
                  href={`/destinations/${dest.slug}`}
                  className="group block"
                  aria-label={`Explore ${dest.name} — ${dest.tagline}`}
                >
                  <div
                    className="relative overflow-hidden rounded-3xl mb-5"
                    style={{ aspectRatio: index === 0 || index === 3 ? '4/5' : '3/4' }}
                  >
                    <Image
                      src={dest.image}
                      alt={`${dest.name} — ${dest.tagline}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={80}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Destination number */}
                    <span
                      className="absolute top-5 left-5 text-label text-[10px] text-white/60"
                      aria-hidden="true"
                    >
                      {dest.number}
                    </span>

                    {/* Bottom info */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h2
                        className="text-white font-bold tracking-tight mb-1 transition-transform duration-300 group-hover:-translate-y-1"
                        style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.02em' }}
                      >
                        {dest.name}
                      </h2>
                      <p className="text-white/60 text-sm">{dest.region}</p>

                      {/* Hover reveal */}
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{
                          maxHeight: '0',
                          opacity: 0,
                        }}
                      >
                        <p className="text-white/70 text-sm mt-2">{dest.tagline}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm px-1" style={{ color: 'var(--muted)' }}>{dest.description}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'var(--background-soft)' }} aria-label="Plan your journey">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-4">Don&apos;t see your destination?</h2>
          <p className="text-body mx-auto max-w-sm mb-8">
            We operate in many more places. Tell us where you want to go and we&apos;ll tell you what&apos;s possible.
          </p>
          <Link href="/contact" className="btn btn-accent">Get in Touch →</Link>
        </div>
      </section>
    </div>
  )
}
