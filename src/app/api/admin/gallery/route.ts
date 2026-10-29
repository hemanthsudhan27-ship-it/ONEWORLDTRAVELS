import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import type { GalleryItem } from '@/lib/data/gallery'

export const dynamic = 'force-dynamic'

const OWNER = process.env.GITHUB_REPO_OWNER || 'hemanthsudhan27-ship-it'
const REPO = process.env.GITHUB_REPO_NAME || 'ONEWORLDTRAVELS'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const TOKEN = process.env.GITHUB_PAT
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Oneworldtravels@adminpassword'

const GALLERY_JSON_PATH = 'src/lib/data/gallery.json'
const LOCAL_GALLERY_JSON_PATH = path.join(process.cwd(), GALLERY_JSON_PATH)

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

// Read local gallery
async function readLocalGallery(): Promise<GalleryItem[]> {
  try {
    const raw = await fs.readFile(LOCAL_GALLERY_JSON_PATH, 'utf-8')
    return JSON.parse(raw) as GalleryItem[]
  } catch {
    return []
  }
}

// Write local gallery
async function writeLocalGallery(items: GalleryItem[]) {
  try {
    await fs.writeFile(LOCAL_GALLERY_JSON_PATH, JSON.stringify(items, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Failed to write local gallery file:', err)
  }
}

// GET: Fetch current gallery items
export async function GET() {
  try {
    if (TOKEN) {
      try {
        const file = await getGitHubFile(GALLERY_JSON_PATH)
        if (file && file.content) {
          const decoded = Buffer.from(file.content, 'base64').toString('utf-8')
          const items = JSON.parse(decoded)
          await writeLocalGallery(items)
          return NextResponse.json({ items })
        }
      } catch (ghErr) {
        console.warn('GitHub fetch failed, falling back to local file:', ghErr)
      }
    }

    const localItems = await readLocalGallery()
    return NextResponse.json({ items: localItems })
  } catch (error: any) {
    console.error('Error fetching gallery items:', error)
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

    // 1. Commit the image file to GitHub if TOKEN configured
    if (TOKEN) {
      try {
        await putGitHubFile(
          imagePath,
          base64Image,
          `admin(gallery): upload image ${fileName}`
        )
      } catch (ghErr) {
        console.warn('GitHub image commit failed, continuing local write:', ghErr)
      }
    }

    // Write image locally to public/images/gallery
    try {
      const localImagePath = path.join(process.cwd(), imagePath)
      await fs.mkdir(path.dirname(localImagePath), { recursive: true })
      await fs.writeFile(localImagePath, buffer)
    } catch (fsErr) {
      console.warn('Could not save image to local filesystem:', fsErr)
    }

    // 2. Fetch existing gallery.json
    let currentItems: GalleryItem[] = []
    let currentSha: string | undefined = undefined

    if (TOKEN) {
      try {
        const galleryJsonFile = await getGitHubFile(GALLERY_JSON_PATH)
        if (galleryJsonFile && galleryJsonFile.content) {
          currentSha = galleryJsonFile.sha
          const decoded = Buffer.from(galleryJsonFile.content, 'base64').toString('utf-8')
          currentItems = JSON.parse(decoded)
        }
      } catch {
        currentItems = []
      }
    }

    if (currentItems.length === 0) {
      currentItems = await readLocalGallery()
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
    const updatedJsonString = JSON.stringify(updatedItems, null, 2)

    // 3. Commit updated gallery.json to GitHub
    if (TOKEN) {
      try {
        const updatedJsonBase64 = Buffer.from(updatedJsonString, 'utf-8').toString('base64')
        await putGitHubFile(
          GALLERY_JSON_PATH,
          updatedJsonBase64,
          `admin(gallery): add ${newItem.caption || fileName} to gallery.json`,
          currentSha
        )
      } catch (ghErr) {
        console.warn('GitHub JSON commit failed:', ghErr)
      }
    }

    // Always write updated JSON to local filesystem
    await writeLocalGallery(updatedItems)

    return NextResponse.json({
      success: true,
      item: newItem,
      message: 'Image uploaded and saved successfully!',
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
      return NextResponse.json({ error: 'Missing image ID' }, { status: 400 })
    }

    let items: GalleryItem[] = []
    let currentSha: string | undefined = undefined

    const localItems = await readLocalGallery()

    if (TOKEN) {
      try {
        const galleryJsonFile = await getGitHubFile(GALLERY_JSON_PATH)
        if (galleryJsonFile && galleryJsonFile.content) {
          currentSha = galleryJsonFile.sha
          const decoded = Buffer.from(galleryJsonFile.content, 'base64').toString('utf-8')
          items = JSON.parse(decoded)
        }
      } catch {
        items = []
      }
    }

    const targetItem =
      items.find((item) => item.id === id || item.src === id) ||
      localItems.find((item) => item.id === id || item.src === id)

    if (!targetItem) {
      return NextResponse.json({ error: 'Item not found in gallery' }, { status: 404 })
    }

    const updatedGhItems = items.filter((item) => item.id !== targetItem.id && item.src !== targetItem.src)
    const updatedLocalItems = localItems.filter((item) => item.id !== targetItem.id && item.src !== targetItem.src)

    // Commit updated gallery.json to GitHub if available
    if (TOKEN && currentSha) {
      try {
        const updatedJsonBase64 = Buffer.from(JSON.stringify(updatedGhItems, null, 2), 'utf-8').toString('base64')
        await putGitHubFile(
          GALLERY_JSON_PATH,
          updatedJsonBase64,
          `admin(gallery): remove item ${targetItem.id}`,
          currentSha
        )
      } catch (ghErr) {
        console.warn('GitHub commit failed on delete:', ghErr)
      }
    }

    // Write local JSON
    await writeLocalGallery(updatedLocalItems)

    // Optional: Delete physical image file from GitHub and local
    if (targetItem.src.startsWith('/images/gallery/')) {
      const filePath = `public${targetItem.src}`
      if (TOKEN) {
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
          console.warn('Could not delete image file on GitHub:', err)
        }
      }

      try {
        const localPath = path.join(process.cwd(), filePath)
        await fs.unlink(localPath)
      } catch {
        // file might not exist locally
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
