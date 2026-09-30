'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { journeys } from '@/lib/data/journeys'
import { Search, MapPin, Compass } from 'lucide-react'

const experienceTypes = ['All', 'Beach & City', 'Culture & Nature', 'Luxury & Beach', 'Tropical & Culture', 'Nature & Adventure']
const categories = ['All', 'International', 'Domestic']
const durations = ['All', '1–4 days', '5–7 days', '8+ days']

export default function JourneysPageClient() {
  const [experienceFilter, setExperienceFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [durationFilter, setDurationFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return journeys.filter((j) => {
      const matchExperience = experienceFilter === 'All' || j.experienceType === experienceFilter
      const matchCategory = categoryFilter === 'All' || j.category === categoryFilter
      const matchSearch =
        !search ||
        j.title.toLowerCase().includes(search.toLowerCase()) ||
        j.destination.toLowerCase().includes(search.toLowerCase())
      const matchDuration =
        durationFilter === 'All' ||
        (durationFilter === '1–4 days' && j.durationDays <= 4) ||
        (durationFilter === '5–7 days' && j.durationDays >= 5 && j.durationDays <= 7) ||
        (durationFilter === '8+ days' && j.durationDays >= 8)
      return matchExperience && matchCategory && matchSearch && matchDuration
    })
  }, [experienceFilter, categoryFilter, durationFilter, search])

  return (
    <div>
      {/* Header */}
      <section
        className="pt-32 pb-16 md:pt-40 md:pb-20 bg-background-soft border-b border-black/[0.06]"
        aria-label="Journeys collection"
      >
        <div className="container-wide">
          <div className="flex items-center gap-2.5 mb-6">
            <span className="accent-dot" aria-hidden="true" />
            <span className="text-label text-xs text-muted">Official Packages Catalog</span>
          </div>
          <h1 className="text-display text-foreground mb-4">
            Curated Escapes &
            <br />
            <span className="text-accent font-serif">Verified Packages.</span>
          </h1>
          <p className="text-body max-w-lg text-base">
            Explore 14+ verified travel packages from One World Holidays. Filter by destination, category, or experience type.
          </p>
        </div>
      </section>

      {/* Sticky Filters */}
      <section
        className="sticky top-16 z-30 py-4 border-b border-black/[0.08] bg-white/95 backdrop-blur-xl shadow-sm"
        aria-label="Journey filters"
      >
        <div className="container-wide">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
              <input
                id="journey-search"
                type="search"
                placeholder="Search packages..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full border border-black/15 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted font-medium mr-1 hidden sm:inline">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                    categoryFilter === cat
                      ? 'bg-foreground text-white border-foreground font-semibold'
                      : 'bg-white text-foreground border-black/15 hover:border-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Duration Filter */}
            <div className="flex gap-2 items-center">
              <span className="text-xs text-muted font-medium mr-1 hidden sm:inline">Duration:</span>
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setDurationFilter(d)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    durationFilter === d
                      ? 'bg-accent text-white border-accent font-semibold'
                      : 'bg-white text-foreground border-black/15 hover:border-accent'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Results */}
      <section className="py-16 bg-background" aria-label="Journey results">
        <div className="container-wide">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-background-soft rounded-3xl p-8 border border-black/[0.06]">
              <p className="text-body mb-4">No packages match your search filters.</p>
              <button
                onClick={() => {
                  setExperienceFilter('All')
                  setCategoryFilter('All')
                  setDurationFilter('All')
                  setSearch('')
                }}
                className="btn btn-outline text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <p className="text-xs font-medium text-muted">
                  Showing <span className="font-bold text-foreground">{filtered.length}</span> verified package{filtered.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((journey) => (
                  <article key={journey.id} className="group">
                    <Link
                      href={`/journeys/${journey.slug}`}
                      className="block bg-background-soft rounded-3xl p-3 border border-black/[0.08] hover:border-black/20 hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4 bg-black">
                        <Image
                          src={journey.image}
                          alt={journey.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          quality={95}
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide uppercase">
                          {journey.duration}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent text-white text-[10px] font-semibold">
                          {journey.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-2 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-xs text-accent font-semibold mb-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{journey.destination}</span>
                          </div>
                          <h2 className="font-bold text-foreground text-lg tracking-tight mb-2 group-hover:text-accent transition-colors line-clamp-2">
                            {journey.title}
                          </h2>
                          <p className="text-muted text-xs line-clamp-2 leading-relaxed mb-4">
                            {journey.description}
                          </p>
                        </div>

                        {/* Inclusions Pill Preview */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {journey.includes.slice(0, 3).map((inc) => (
                            <span
                              key={inc}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-black/[0.08] text-muted font-medium"
                            >
                              ✓ {inc}
                            </span>
                          ))}
                          {journey.includes.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-muted font-semibold">
                              +{journey.includes.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Pricing & Link */}
                        <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-muted block uppercase tracking-wider">Package Rate</span>
                            <span className="font-bold text-foreground text-base tracking-tight">
                              {journey.price
                                ? `₹${journey.price.toLocaleString('en-IN')}`
                                : journey.priceText || 'On Request'}
                            </span>
                          </div>
                          <span className="text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform flex items-center gap-1">
                            View Package →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
