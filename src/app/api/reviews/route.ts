import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { Review } from '@/lib/data/reviews'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/lib/data/reviews.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const reviews: Review[] = JSON.parse(raw)
    return NextResponse.json({ reviews }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  } catch (err: any) {
    console.error('Failed to read reviews:', err)
    return NextResponse.json({ reviews: [] })
  }
}
