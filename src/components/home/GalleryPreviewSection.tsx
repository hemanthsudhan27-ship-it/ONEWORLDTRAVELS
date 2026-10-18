'use client'

import { useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import galleryData from '@/lib/data/gallery.json'

export default function GalleryPreviewSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const previewImages = (galleryData && galleryData.length > 0
    ? galleryData.slice(0, 4)
    : [
        { src: '/images/gallery-placeholder.svg', alt: 'One World Travel' },
        { src: '/images/gallery-placeholder.svg', alt: 'One World Travel' },
        { src: '/images/gallery-placeholder.svg', alt: 'One World Travel' },
        { src: '/images/gallery-placeholder.svg', alt: 'One World Travel' },
      ])


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-up').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100)
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

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      aria-label="Gallery preview"
    >
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div>
            <div className="reveal-up flex items-center gap-3 mb-5">
              <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>06 — Gallery</span>
              <span className="accent-line" aria-hidden="true" />
            </div>
            <h2 className="text-headline reveal-up">
              Journeys
              <br />
              in frame.
            </h2>
          </div>
          <div className="reveal-up">
            <Link href="/gallery" className="btn btn-outline text-sm">
              Full Gallery →
            </Link>
          </div>
        </div>

        {/* 4-image asymmetric grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-up">
          {previewImages.map((img, i) => (
            <Link
              key={img.src}
              href="/gallery"
              aria-label={`View gallery — ${img.alt}`}
              className={`group relative overflow-hidden rounded-2xl block ${
                i === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              style={{ aspectRatio: i === 0 ? '1/1' : '4/3' }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={70}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
