export interface GalleryItem {
  id: string
  src: string
  caption: string
  location?: string
  alt: string
  aspectRatio?: '4/5' | '3/4' | '4/3' | '1/1' | string
  createdAt?: string
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const data = await import('./gallery.json')
    return (data.default || data) as GalleryItem[]
  } catch (err) {
    console.error('Failed to load gallery items:', err)
    return []
  }
}
