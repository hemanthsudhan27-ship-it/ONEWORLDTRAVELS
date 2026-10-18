export interface Review {
  id: string
  quote: string
  author: string
  location: string
  journey?: string
  rating: number
  date?: string
  image?: string
  verified?: boolean
  createdAt?: string
}

export async function getReviews(): Promise<Review[]> {
  try {
    const data = await import('./reviews.json')
    return (data.default || data) as Review[]
  } catch (err) {
    console.error('Failed to load reviews:', err)
    return []
  }
}
