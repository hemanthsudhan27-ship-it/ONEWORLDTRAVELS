import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getStoryBySlug, stories } from '@/lib/data/stories'
import { Clock, ArrowLeft } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return { title: 'Story Not Found' }
  return {
    title: story.title,
    description: story.excerpt,
    alternates: { canonical: `https://oneworld.travel/stories/${story.slug}` },
    openGraph: {
      title: story.title,
      description: story.excerpt,
      url: `https://oneworld.travel/stories/${story.slug}`,
      type: 'article',
      images: [{ url: story.heroImage, width: 1200, height: 630, alt: story.title }],
      authors: [story.author],
      publishedTime: story.date,
    },
  }
}

export default async function StoryDetailPage({ params }: Props) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  const otherStories = stories.filter((s) => s.slug !== slug).slice(0, 2)

  return (
    <article>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] flex flex-col justify-end" aria-label={story.title}>
        <div className="absolute inset-0">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 container-narrow pb-12">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-white/60 text-sm mb-6 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            All Stories
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-label text-[10px] px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(196,23,26,0.3)', color: 'rgba(255,255,255,0.9)' }}
            >
              {story.category}
            </span>
            <span className="text-xs flex items-center gap-1 text-white/50">
              <Clock size={11} aria-hidden="true" />
              {story.readingTime}
            </span>
          </div>
          <h1 className="text-white font-bold tracking-tight mb-3" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            {story.title}
          </h1>
          <p className="text-white/70 text-lg leading-relaxed">{story.excerpt}</p>
        </div>
      </section>

      {/* Author bar */}
      <div className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="container-narrow py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={story.authorImage}
                alt={story.author}
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold">{story.author}</p>
              <p className="text-xs" style={{ color: 'var(--muted)' }}>{story.authorTitle} · {story.date}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {story.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full"
                style={{ background: 'var(--background-soft)', color: 'var(--muted)' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="container-narrow py-16">
        <div className="prose max-w-none" style={{ '--tw-prose-body': 'var(--muted)', fontFamily: 'var(--font-dm-sans)' } as React.CSSProperties}>
          {story.content.split('\n\n').map((paragraph, i) => (
            <p
              key={i}
              className="mb-6 leading-8"
              style={{
                fontSize: i === 0 ? '1.125rem' : '1rem',
                color: i === 0 ? 'var(--foreground)' : 'var(--muted)',
                lineHeight: '1.85',
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Related stories */}
      {otherStories.length > 0 && (
        <section
          className="section-padding border-t"
          style={{ background: 'var(--background-soft)', borderColor: 'var(--border)' }}
          aria-label="More stories"
        >
          <div className="container-wide">
            <h2 className="text-title mb-10">More stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherStories.map((s) => (
                <Link
                  key={s.id}
                  href={`/stories/${s.slug}`}
                  className="group flex gap-5 items-start"
                  aria-label={s.title}
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div>
                    <span className="text-label text-[10px]" style={{ color: 'var(--accent)' }}>{s.category}</span>
                    <h3 className="font-semibold mt-1 mb-1 leading-tight group-hover:text-[var(--accent)] transition-colors">{s.title}</h3>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{s.readingTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
