import reviewsData from './reviews.json'
import type { Review } from './reviews'

export type Testimonial = Review

export const testimonials: Testimonial[] = reviewsData as Testimonial[]
