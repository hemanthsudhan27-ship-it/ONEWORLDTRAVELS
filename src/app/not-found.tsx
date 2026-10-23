'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center"
      style={{ background: 'var(--background-soft)' }}
    >
      <p
        className="text-[10rem] font-bold leading-none mb-6 select-none"
        style={{ color: 'rgba(0,0,0,0.04)', letterSpacing: '-0.05em' }}
        aria-hidden="true"
      >
        404
      </p>
      <div className="-mt-16">
        <h1 className="text-title mb-3">Page not found.</h1>
        <p className="text-body max-w-xs mx-auto mb-8">
          The page you&apos;re looking for doesn&apos;t exist, or has moved.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/" className="btn btn-primary">Go Home</Link>
          <Link href="/packages" className="btn btn-outline">Browse Packages</Link>
        </div>
      </div>
    </div>
  )
}
