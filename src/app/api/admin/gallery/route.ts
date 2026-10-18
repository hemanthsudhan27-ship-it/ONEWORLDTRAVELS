import { NextResponse } from 'next/server'
import type { GalleryItem } from '@/lib/data/gallery'

const OWNER = process.env.GITHUB_REPO_OWNER || 'hemanthsudhan27-ship-it'
const REPO = process.env.GITHUB_REPO_NAME || 'ONEWORLDTRAVELS'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const TOKEN = process.env.GITHUB_PAT
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Oneworldtravels@adminpassowrd'

const GALLERY_JSON_PATH = 'src/lib/data/gallery.json'

// Helper to fetch file content and SHA from GitHub
async function getGitHubFile(path: string) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`
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
  path: string,
  contentBase64: string,
  message: string,
  sha?: string
) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`
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
    throw new Error(`Failed to commit ${path}: ${errorText}`)
  }
  return await res.json()
}

// GET: Fetch current gallery items from GitHub
export async function GET() {
  try {
    const file = await getGitHubFile(GALLERY_JSON_PATH)
    if (!file || !file.content) {
      return NextResponse.json({ items: [] })
    }
    const decoded = Buffer.from(file.content, 'base64').toString('utf-8')
    const items = JSON.parse(decoded)
    return NextResponse.json({ items })
  } catch (error: any) {
    console.error('Error fetching gallery items from GitHub:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch items' },
      { status: 500 }
    )
  }
}

// POST: Upload an image and add item to gallery.json
export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const pass = authHeader?.replace('Bearer ', '')
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized: Invalid password' }, { status: 401 })
    }

    if (!TOKEN) {
      return NextResponse.json(
        { error: 'GitHub PAT is not configured in environment variables' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const caption = (formData.get('caption') as string) || ''
    const location = (formData.get('location') as string) || ''
    const alt = (formData.get('alt') as string) || caption || 'One World Travel'
    const aspectRatio = (formData.get('aspectRatio') as string) || '4/5'

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64Image = buffer.toString('base64')

    // Clean safe filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const cleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, '-')
      .replace(/-+/g, '-')
    const uniqueId = `gallery-${Date.now()}`
    const fileName = `${uniqueId}-${cleanName}.${ext}`
    const imagePath = `public/images/gallery/${fileName}`

    // 1. Commit the image file to GitHub
    await putGitHubFile(
      imagePath,
      base64Image,
      `admin(gallery): upload image ${fileName}`
    )

    // 2. Fetch existing gallery.json
    const galleryJsonFile = await getGitHubFile(GALLERY_JSON_PATH)
    let currentItems: GalleryItem[] = []
    let currentSha: string | undefined = undefined

    if (galleryJsonFile && galleryJsonFile.content) {
      currentSha = galleryJsonFile.sha
      const decoded = Buffer.from(galleryJsonFile.content, 'base64').toString('utf-8')
      try {
        currentItems = JSON.parse(decoded)
      } catch {
        currentItems = []
      }
    }

    const newItem: GalleryItem = {
      id: uniqueId,
      src: `/images/gallery/${fileName}`,
      caption,
      location,
      alt,
      aspectRatio,
      createdAt: new Date().toISOString(),
    }

    // Add new item to front of gallery
    const updatedItems = [newItem, ...currentItems]
    const updatedJsonBase64 = Buffer.from(
      JSON.stringify(updatedItems, null, 2),
      'utf-8'
    ).toString('base64')

    // 3. Commit updated gallery.json
    await putGitHubFile(
      GALLERY_JSON_PATH,
      updatedJsonBase64,
      `admin(gallery): add ${newItem.caption || fileName} to gallery.json`,
      currentSha
    )

    return NextResponse.json({
      success: true,
      item: newItem,
      message: 'Image uploaded and committed to GitHub successfully!',
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Upload failed' },
      { status: 500 }
    )
  }
}

// DELETE: Remove an item and optionally its image
export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    const pass = authHeader?.replace('Bearer ', '')
    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 })
    }

    // 1. Get gallery.json
    const galleryJsonFile = await getGitHubFile(GALLERY_JSON_PATH)
    if (!galleryJsonFile || !galleryJsonFile.content) {
      return NextResponse.json({ error: 'Gallery file not found' }, { status: 404 })
    }

    const decoded = Buffer.from(galleryJsonFile.content, 'base64').toString('utf-8')
    const items: GalleryItem[] = JSON.parse(decoded)
    const targetItem = items.find((item) => item.id === id)

    if (!targetItem) {
      return NextResponse.json({ error: 'Item not found in gallery' }, { status: 404 })
    }

    const updatedItems = items.filter((item) => item.id !== id)
    const updatedJsonBase64 = Buffer.from(
      JSON.stringify(updatedItems, null, 2),
      'utf-8'
    ).toString('base64')

    // Commit updated gallery.json
    await putGitHubFile(
      GALLERY_JSON_PATH,
      updatedJsonBase64,
      `admin(gallery): remove item ${id}`,
      galleryJsonFile.sha
    )

    // Optional: Delete physical image file from GitHub if it's in public/images/gallery
    if (targetItem.src.startsWith('/images/gallery/')) {
      const filePath = `public${targetItem.src}`
      try {
        const fileToDelete = await getGitHubFile(filePath)
        if (fileToDelete && fileToDelete.sha) {
          const deleteUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`
          await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              Accept: 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
              'User-Agent': 'OneWorldTravels-Admin',
            },
            body: JSON.stringify({
              message: `admin(gallery): delete image file ${filePath}`,
              sha: fileToDelete.sha,
              branch: BRANCH,
            }),
          })
        }
      } catch (err) {
        console.warn('Could not delete image file on GitHub (might not exist):', err)
      }
    }

    return NextResponse.json({ success: true, message: 'Item deleted successfully' })
  } catch (error: any) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: error?.message || 'Delete failed' },
      { status: 500 }
    )
  }
}
