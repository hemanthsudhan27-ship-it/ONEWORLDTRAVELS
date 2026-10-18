import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildGeneralEnquiryUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Gallery — Journeys in Frame',
  description:
    'A visual collection of the places, people, and moments that define One World Travel. From the Himalayas to Kerala, Morocco to Japan.',
  alternates: { canonical: 'https://oneworld.travel/gallery' },
  openGraph: {
    title: 'Gallery — One World Travel',
    description: 'Journeys in frame — a visual anthology of our curated destinations.',
    url: 'https://oneworld.travel/gallery',
  },
}

import { getGalleryItems } from '@/lib/data/gallery'

export default async function GalleryPage() {
  const galleryImages = await getGalleryItems()

  return (
    <div>
      {/* Hero */}
      <section
        className="section-padding"
        style={{ background: 'var(--background-soft)' }}
        aria-label="Photo gallery"
      >
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-dot" aria-hidden="true" />
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>Gallery</span>
          </div>
          <h1 className="text-headline mb-6">
            Journeys
            <br />
            <span style={{ color: 'var(--accent)' }}>in frame.</span>
          </h1>
          <p className="text-body max-w-md">
            A visual anthology of the places, people, and moments that define how we travel.
          </p>
        </div>
      </section>

      {/* Masonry-style gallery grid */}
      <section className="section-padding" aria-label="Photo collection">
        <div className="container-wide">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
            {galleryImages.map((img, i) => (
              <figure
                key={img.id || `${img.src}-${i}`}
                className="break-inside-avoid group relative overflow-hidden rounded-3xl"
                style={{
                  aspectRatio: img.aspectRatio || (i % 3 === 0 ? '4/5' : i % 3 === 1 ? '3/4' : '4/3'),
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <figcaption className="absolute bottom-0 left-0 right-0 p-5 text-white text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding"
        style={{ background: 'var(--background-soft)' }}
        aria-label="Plan your journey"
      >
        <div className="container-narrow text-center">
          <h2 className="text-title mb-4">Want to be in these photos?</h2>
          <p className="text-body mx-auto max-w-sm mb-8">
            Every image here is a place we can take you. Tell us where you want to go.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              id="gallery-cta-whatsapp"
            >
              Plan My Journey →
            </a>
            <Link href="/journeys" className="btn btn-outline">
              Browse Journeys
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
