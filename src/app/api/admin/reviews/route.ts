import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { Review } from '@/lib/data/reviews'

export const dynamic = 'force-dynamic'

const OWNER = process.env.GITHUB_REPO_OWNER || 'hemanthsudhan27-ship-it'
const REPO = process.env.GITHUB_REPO_NAME || 'ONEWORLDTRAVELS'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const TOKEN = process.env.GITHUB_PAT
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Oneworldtravels@adminpassword'

const REVIEWS_JSON_RELATIVE_PATH = 'src/lib/data/reviews.json'
const LOCAL_REVIEWS_PATH = path.join(process.cwd(), REVIEWS_JSON_RELATIVE_PATH)

// Helper to fetch file content and SHA from GitHub
async function getGitHubFile(filePath: string) {
  if (!TOKEN) return null
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'OneWorldTravels-Admin',
    },
    cache: 'no-store',
  })
  if (!res.ok) {
    if (res.status === 404) return null
    throw new Error(`GitHub API error (${res.status}): ${await res.text()}`)
  }
  return await res.json()
}

// Helper to commit file changes to GitHub
async function putGitHubFile(
  filePath: string,
  contentBase64: string,
  message: string,
  sha?: string
) {
  if (!TOKEN) return null
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`
  const body: Record<string, unknown> = {
    message,
    content: contentBase64,
    branch: BRANCH,
  }
  if (sha) {
    body.sha = sha
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'OneWorldTravels-Admin',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to commit ${filePath}: ${errorText}`)
  }
  return await res.json()
}

// Helper to read local reviews safely
async function readLocalReviews(): Promise<Review[]> {
  try {
    const raw = await fs.readFile(LOCAL_REVIEWS_PATH, 'utf-8')
    return JSON.parse(raw) as Review[]
  } catch {
    return []
  }
}

// Helper to write local reviews
async function writeLocalReviews(items: Review[]) {
  try {
    await fs.writeFile(LOCAL_REVIEWS_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Failed to write local reviews file:', err)
  }
}

// GET: Fetch all reviews
export async function GET() {
  try {
    // 1. Try GitHub if token is available
    if (TOKEN) {
      try {
        const ghFile = await getGitHubFile(REVIEWS_JSON_RELATIVE_PATH)
        if (ghFile && ghFile.content) {
          const decoded = Buffer.from(ghFile.content, 'base64').toString('utf-8')
          const items: Review[] = JSON.parse(decoded)
          // Also sync to local disk
          await writeLocalReviews(items)
          return NextResponse.json({ items })
        }
      } catch (err) {
        console.warn('GitHub fetch failed, falling back to local file:', err)
      }
    }

    // 2. Fall back to local file
    const localItems = await readLocalReviews()
    return NextResponse.json({ items: localItems })
  } catch (error: any) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

// POST: Add new review
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const pass = authHeader?.replace('Bearer ', '')
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 })
    }

    const body = await req.json()
    const { author, location, journey, quote, rating, date, image, verified } = body

    if (!author?.trim()) {
      return NextResponse.json({ error: 'Traveler name is required' }, { status: 400 })
    }
    if (!quote?.trim()) {
      return NextResponse.json({ error: 'Review quote/feedback is required' }, { status: 400 })
    }

    const uniqueId = `review-${Date.now()}`
    const newReview: Review = {
      id: uniqueId,
      author: author.trim(),
      location: location?.trim() || 'Traveler',
      journey: journey?.trim() || 'Curated Journey',
      quote: quote.trim(),
      rating: Number(rating) || 5,
      date: date?.trim() || new Date().toISOString().slice(0, 7),
      image: image?.trim() || '',
      verified: verified !== false,
      createdAt: new Date().toISOString(),
    }

    // 1. Read existing reviews (prefer GitHub if available to get SHA)
    let currentItems: Review[] = []
    let currentSha: string | undefined = undefined

    if (TOKEN) {
      try {
        const ghFile = await getGitHubFile(REVIEWS_JSON_RELATIVE_PATH)
        if (ghFile && ghFile.content) {
          currentSha = ghFile.sha
          const decoded = Buffer.from(ghFile.content, 'base64').toString('utf-8')
          currentItems = JSON.parse(decoded)
        }
      } catch (err) {
        console.warn('GitHub check error, using local fallback:', err)
      }
    }

    if (currentItems.length === 0) {
      currentItems = await readLocalReviews()
    }

    const updatedItems = [newReview, ...currentItems]
    const updatedJsonString = JSON.stringify(updatedItems, null, 2)

    // 2. Commit to GitHub if TOKEN is configured
    if (TOKEN) {
      try {
        const updatedJsonBase64 = Buffer.from(updatedJsonString, 'utf-8').toString('base64')
        await putGitHubFile(
          REVIEWS_JSON_RELATIVE_PATH,
          updatedJsonBase64,
          `admin(reviews): add review from ${newReview.author}`,
          currentSha
        )
      } catch (ghErr: any) {
        console.warn('GitHub commit failed, will still write local disk:', ghErr)
      }
    }

    // 3. Always write to local file for instant localhost reactivity
    await writeLocalReviews(updatedItems)

    return NextResponse.json({
      success: true,
      item: newReview,
      message: 'Review published successfully!',
    })
  } catch (error: any) {
    console.error('Review creation error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to create review' },
      { status: 500 }
    )
  }
}

// PUT: Edit existing review
export async function PUT(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const pass = authHeader?.replace('Bearer ', '')
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 })
    }

    const body = await req.json()
    const { id, author, location, journey, quote, rating, date, image, verified } = body

    if (!id) {
      return NextResponse.json({ error: 'Review ID is required for editing' }, { status: 400 })
    }
    if (!author?.trim()) {
      return NextResponse.json({ error: 'Traveler name is required' }, { status: 400 })
    }
    if (!quote?.trim()) {
      return NextResponse.json({ error: 'Review quote/feedback is required' }, { status: 400 })
    }

    let currentItems: Review[] = []
    let currentSha: string | undefined = undefined
    const localItems = await readLocalReviews()

    if (TOKEN) {
      try {
        const ghFile = await getGitHubFile(REVIEWS_JSON_RELATIVE_PATH)
        if (ghFile && ghFile.content) {
          currentSha = ghFile.sha
          const decoded = Buffer.from(ghFile.content, 'base64').toString('utf-8')
          currentItems = JSON.parse(decoded)
        }
      } catch (err) {
        console.warn('GitHub check error on edit:', err)
      }
    }

    const existingInGh = currentItems.find((r) => r.id === id)
    const existingInLocal = localItems.find((r) => r.id === id)
    const existing = existingInGh || existingInLocal

    if (!existing) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 })
    }

    const updatedReview: Review = {
      ...existing,
      author: author.trim(),
      location: location?.trim() || 'Traveler',
      journey: journey?.trim() || 'Curated Journey',
      quote: quote.trim(),
      rating: Number(rating) || 5,
      date: date?.trim() || existing.date || new Date().toISOString().slice(0, 7),
      image: image !== undefined ? image.trim() : (existing.image || ''),
      verified: verified !== false,
      createdAt: existing.createdAt || new Date().toISOString(),
    }

    const updatedGhItems = currentItems.map((r) => (r.id === id ? updatedReview : r))
    const updatedLocalItems = localItems.map((r) => (r.id === id ? updatedReview : r))
    if (!localItems.some((r) => r.id === id)) {
      updatedLocalItems.unshift(updatedReview)
    }

    if (TOKEN && currentSha && currentItems.some((r) => r.id === id)) {
      try {
        const updatedJsonBase64 = Buffer.from(JSON.stringify(updatedGhItems, null, 2), 'utf-8').toString('base64')
        await putGitHubFile(
          REVIEWS_JSON_RELATIVE_PATH,
          updatedJsonBase64,
          `admin(reviews): edit review ${id} by ${updatedReview.author}`,
          currentSha
        )
      } catch (ghErr) {
        console.warn('GitHub commit failed on edit:', ghErr)
      }
    }

    // Always update local file
    await writeLocalReviews(updatedLocalItems)

    return NextResponse.json({
      success: true,
      item: updatedReview,
      message: 'Review updated successfully!',
    })
  } catch (error: any) {
    console.error('Review edit error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to update review' },
      { status: 500 }
    )
  }
}

// DELETE: Remove a review
export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const pass = authHeader?.replace('Bearer ', '')
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let id: string | null = null
    try {
      const body = await req.json()
      id = body?.id
    } catch {
      // not JSON body
    }
    if (!id) {
      const url = new URL(req.url)
      id = url.searchParams.get('id')
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing review ID' }, { status: 400 })
    }

    let currentItems: Review[] = []
    let currentSha: string | undefined = undefined

    const localItems = await readLocalReviews()

    if (TOKEN) {
      try {
        const ghFile = await getGitHubFile(REVIEWS_JSON_RELATIVE_PATH)
        if (ghFile && ghFile.content) {
          currentSha = ghFile.sha
          const decoded = Buffer.from(ghFile.content, 'base64').toString('utf-8')
          currentItems = JSON.parse(decoded)
        }
      } catch (err) {
        console.warn('GitHub check error on delete:', err)
      }
    }

    const updatedGhItems = currentItems.filter((item) => item.id !== id)
    const updatedLocalItems = localItems.filter((item) => item.id !== id)

    if (TOKEN && currentSha && currentItems.length > 0) {
      try {
        const updatedJsonBase64 = Buffer.from(JSON.stringify(updatedGhItems, null, 2), 'utf-8').toString('base64')
        await putGitHubFile(
          REVIEWS_JSON_RELATIVE_PATH,
          updatedJsonBase64,
          `admin(reviews): delete review ${id}`,
          currentSha
        )
      } catch (ghErr) {
        console.warn('GitHub commit failed on delete:', ghErr)
      }
    }

    // Always update local disk
    await writeLocalReviews(updatedLocalItems)

    return NextResponse.json({ success: true, message: 'Review deleted successfully' })
  } catch (error: any) {
    console.error('Review delete error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to delete review' },
      { status: 500 }
    )
  }
}
