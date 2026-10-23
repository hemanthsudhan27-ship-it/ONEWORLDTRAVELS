import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { stories } from '@/lib/data/stories'
import { Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Stories — Travel Journal',
  description:
    'Read travel stories, essays, and journals from One World travellers and writers. Real experiences from real journeys to the Himalayas, Rajasthan, Kerala, Morocco and beyond.',
  alternates: { canonical: 'https://oneworld.travel/stories' },
  openGraph: {
    title: 'One World Stories — Travel Journal & Editorial',
    description: 'Real travel stories from people who went somewhere.',
    url: 'https://oneworld.travel/stories',
  },
}

export default function StoriesPage() {
  const [featured, ...rest] = stories

  return (
    <div className="pt-20 sm:pt-24">
      {/* Compact Top Header — Stories listed first */}
      <div className="container-wide py-3 sm:py-4 border-b border-black/[0.06] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-foreground">
            Travel Journal &amp; Stories
          </h1>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent/10 text-accent font-semibold hidden sm:inline-block">
            {stories.length} Dispatches
          </span>
        </div>
        <Link href="/packages" className="btn btn-outline text-xs px-3.5 py-1.5">
          Explore Packages →
        </Link>
      </div>

      {/* Featured Story & Collection — starts right away! */}
      <section className="py-6 sm:py-8" aria-label="Featured story">
        <div className="container-wide">
          <Link
            href={`/stories/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            aria-label={`Featured: ${featured.title}`}
          >
            <div className="img-organic relative aspect-[4/3] overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={85}
              />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-label text-xs px-3 py-1 rounded-full"
                  style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}
                >
                  {featured.category}
                </span>
                <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                  <Clock size={12} aria-hidden="true" />
                  {featured.readingTime}
                </span>
              </div>
              <h2 className="text-title mb-4 transition-colors group-hover:text-[var(--accent)]">
                {featured.title}
              </h2>
              <p className="text-body mb-5">{featured.excerpt}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image src={featured.authorImage} alt={featured.author} width={32} height={32} className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium">{featured.author}</p>
                  <p className="text-xs" style={{ color: 'var(--muted)' }}>{featured.date}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="section-padding" style={{ background: 'var(--background-soft)' }} aria-label="All stories">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((story) => (
              <article key={story.id}>
                <Link
                  href={`/stories/${story.slug}`}
                  className="group block"
                  aria-label={story.title}
                >
                  <div className="img-organic relative aspect-[3/2] overflow-hidden mb-5">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      quality={75}
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-label text-[10px] px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(196,23,26,0.08)', color: 'var(--accent)' }}
                    >
                      {story.category}
                    </span>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--muted)' }}>
                      <Clock size={11} aria-hidden="true" />
                      {story.readingTime}
                    </span>
                  </div>
                  <h2 className="font-semibold text-lg tracking-tight mb-2 transition-colors group-hover:text-[var(--accent)]" style={{ letterSpacing: '-0.01em' }}>
                    {story.title}
                  </h2>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{story.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
