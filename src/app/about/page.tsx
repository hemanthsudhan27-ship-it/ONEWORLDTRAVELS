import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Travel, With Intention',
  description:
    'One World was born from a simple belief: every traveller deserves a journey built around them. Learn our story, philosophy, and the team behind your next adventure.',
  alternates: { canonical: 'https://oneworld.travel/about' },
  openGraph: {
    title: 'About One World Travel',
    description: 'We don\'t just plan trips. We create stories you take home.',
    url: 'https://oneworld.travel/about',
  },
}

const milestones = [
  { year: '2016', event: 'Founded in Mumbai with a team of three.' },
  { year: '2018', event: 'First international journeys to Morocco and Japan.' },
  { year: '2020', event: 'Rebuilt from scratch. Came back more intentional.' },
  { year: '2022', event: 'Reached 1,000 curated journeys. Celebrated quietly.' },
  { year: '2024', event: 'Expanded to 48 destinations across Asia, Africa, and Europe.' },
  { year: '2026', event: 'Still the same three people. Plus about forty more.' },
]

const values = [
  { title: 'Intention over impulse.', body: 'We turn down journeys that don\'t make sense. Every trip we build has a reason.' },
  { title: 'Depth over breadth.', body: 'Six cities in five days is not a journey. It\'s a to-do list. We plan differently.' },
  { title: 'Local over generic.', body: 'We work with guides, cooks, and storytellers who live in the places we visit.' },
  { title: 'Honest over impressive.', body: 'If something doesn\'t match your vision of a great trip, we\'ll tell you.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="min-h-[70vh] flex flex-col justify-end section-padding relative overflow-hidden"
        aria-label="About One World"
        style={{ background: 'var(--background-soft)' }}
      >
        <div className="container-wide relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <span className="accent-dot" aria-hidden="true" />
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>About</span>
          </div>
          <h1 className="text-display mb-6" style={{ maxWidth: '10ch' }}>
            Travel,
            <br />
            <em style={{ color: 'var(--accent)', fontStyle: 'normal' }}>with intention.</em>
          </h1>
          <p className="text-body max-w-lg">
            We are a small team of travel designers who believe that every journey should feel like it was built
            specifically for the person taking it. Because it should be.
          </p>
        </div>

        {/* Decorative number */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-bold leading-none select-none pointer-events-none"
          style={{ color: 'rgba(0,0,0,0.03)', letterSpacing: '-0.05em' }}
          aria-hidden="true"
        >
          01
        </div>
      </section>

      {/* Story section */}
      <section className="section-padding" aria-label="Our Story">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <h2 className="text-title mb-8">How we began.</h2>
              <div className="space-y-5">
                <p className="text-body">
                  One World started with a bad trip. Not dangerous — just hollow. A week in a place we&apos;d
                  wanted to visit for years, spent mostly on a bus with a flag, looking at things through a
                  camera we didn&apos;t have time to focus properly.
                </p>
                <p className="text-body">
                  We came back and thought: there must be a better way to do this. There is. It just requires
                  more patience than most travel companies are willing to spend.
                </p>
                <p className="text-body">
                  So we started One World in 2016 with that patience as our product. We spend more time
                  listening before we plan. We turn down trips that don&apos;t make sense. We work with guides
                  who are passionate about their places — not just fluent in English.
                </p>
                <p className="text-body">
                  The result, we like to think, is journeys that feel less like itineraries and more like stories
                  you had something to do with writing.
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="img-organic relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/images/about-story.jpg"
                  alt="The One World team planning journeys together over maps and travel journals"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={85}
                />
              </div>

              {/* Glass stats */}
              <div className="glass rounded-2xl p-6 grid grid-cols-2 gap-6">
                {[
                  { num: '2,400+', label: 'Journeys crafted' },
                  { num: '48', label: 'Destinations' },
                  { num: '97%', label: 'Would return' },
                  { num: '10yr', label: 'Experience' },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold tracking-tight mb-1" style={{ letterSpacing: '-0.02em' }}>{s.num}</p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding" style={{ background: 'var(--background-soft)' }} aria-label="Our Values">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>What we believe</span>
            <span className="accent-line" aria-hidden="true" />
          </div>
          <h2 className="text-title mb-16">The things we won&apos;t compromise on.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((v, i) => (
              <div key={v.title} className="flex gap-5">
                <span className="text-label text-xs pt-1 flex-shrink-0" style={{ color: 'var(--accent)' }}>
                  0{i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-lg mb-2 tracking-tight">{v.title}</h3>
                  <p className="text-body">{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding" aria-label="Our Journey — Milestones">
        <div className="container-wide">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-label text-xs" style={{ color: 'var(--muted)' }}>Timeline</span>
            <span className="accent-line" aria-hidden="true" />
          </div>
          <h2 className="text-title mb-16">Ten years of journeys.</h2>
          <div className="space-y-0 max-w-2xl">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="flex gap-8 py-6 border-t"
                style={{ borderColor: 'var(--border)' }}
              >
                <span className="font-mono text-sm font-bold w-12 flex-shrink-0 pt-0.5" style={{ color: 'var(--accent)' }}>
                  {m.year}
                </span>
                <p className="text-body">{m.event}</p>
              </div>
            ))}
            <div className="border-t" style={{ borderColor: 'var(--border)' }} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'var(--background-soft)' }} aria-label="Start your journey">
        <div className="container-narrow text-center">
          <h2 className="text-title mb-4">Ready to travel differently?</h2>
          <p className="text-body mx-auto max-w-sm mb-8">
            Tell us where you want to go. We&apos;ll tell you what you haven&apos;t thought of yet.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn btn-accent">Start Planning →</Link>
            <Link href="/journeys" className="btn btn-outline">Browse Journeys</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
