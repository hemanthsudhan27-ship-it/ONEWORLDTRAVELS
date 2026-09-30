export interface Testimonial {
  id: string
  quote: string
  author: string
  location: string
  journey: string
  image: string
  rating: number
  date: string
}

export const testimonials: Testimonial[] = [
  {
    id: 'priya-himalaya',
    quote:
      'I have travelled to 34 countries. The Himalayan Trail with One World was the first time I felt genuinely transported — not just moved from place to place, but taken somewhere I could not have reached alone. Tenzin, our guide, was extraordinary. The silence of the Pin Valley at dawn will stay with me for the rest of my life.',
    author: 'Priya Mehta',
    location: 'Mumbai, India',
    journey: 'Himalayan Trail · 7 Days',
    image: '/images/testimonial-traveler.jpg',
    rating: 5,
    date: '2026-08',
  },
  {
    id: 'sarah-kerala',
    quote:
      'We booked Coastal Kerala for our anniversary expecting to relax. What we didn\'t expect was to come home genuinely changed — slower, more attentive, more grateful. The houseboat nights on the backwaters are something I cannot adequately describe. You simply have to go.',
    author: 'Sarah & James Chen',
    location: 'London, UK',
    journey: 'Coastal Kerala · 6 Days',
    image: '/images/about-story.jpg',
    rating: 5,
    date: '2026-07',
  },
  {
    id: 'arjun-rajasthan',
    quote:
      'Rajasthan After Dark delivered exactly what the name promises. Private fort access at dusk in Mehrangarh — no crowds, no audio guides, just the architecture and the light — was worth the entire trip on its own. The team clearly spends time thinking about what makes a journey meaningful.',
    author: 'Arjun Nair',
    location: 'Bengaluru, India',
    journey: 'Rajasthan After Dark · 5 Days',
    image: '/images/testimonial-traveler.jpg',
    rating: 5,
    date: '2026-06',
  },
]
