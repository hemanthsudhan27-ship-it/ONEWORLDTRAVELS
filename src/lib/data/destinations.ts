export interface Destination {
  id: string
  slug: string
  number: string
  name: string
  region: string
  tagline: string
  description: string
  longDescription: string
  image: string
  heroImage: string
  gallery: string[]
  highlights: string[]
  bestTime: string
  climate: string
  language: string
  currency: string
  featured: boolean
}

export const destinations: Destination[] = [
  {
    id: 'thailand',
    slug: 'thailand',
    number: '01',
    name: 'Thailand',
    region: 'Southeast Asia',
    tagline: 'Islands, golden temples & coastal wonders',
    description: 'Vibrant markets, turquoise waters, and ancient temples.',
    longDescription:
      'Thailand combines tropical islands, bustling night markets, ancient Buddhist temples, and legendary hospitality. From the beaches of Pattaya and Coral Island to the urban energy of Bangkok.',
    image: '/images/packages/thailand-poster-1.jpg',
    heroImage: '/images/packages/thailand-poster-1.jpg',
    gallery: ['/images/packages/thailand-poster-1.jpg', '/images/packages/thailand-itinerary-poster.jpg'],
    highlights: ['Bangkok Temples', 'Pattaya Coral Island', 'Floating Market', 'Safari World & Marine Park'],
    bestTime: 'November – April',
    climate: 'Tropical',
    language: 'Thai',
    currency: 'THB',
    featured: true,
  },
  {
    id: 'kazakhstan',
    slug: 'kazakhstan',
    number: '02',
    name: 'Kazakhstan',
    region: 'Central Asia',
    tagline: 'Majestic alpine landscapes & nomadic heritage',
    description: 'Stark mountain ranges, crystal lakes, and steppe culture.',
    longDescription:
      'Kazakhstan offers dramatic alpine valleys, pristine lakes, and rich historical traditions at the crossroads of Central Asia.',
    image: '/images/packages/kazakhstan-poster.jpg',
    heroImage: '/images/packages/kazakhstan-poster.jpg',
    gallery: ['/images/packages/kazakhstan-poster.jpg'],
    highlights: ['Almaty Peaks', 'Charyn Canyon', 'Kaindy Lake', 'Nomadic Traditions'],
    bestTime: 'May – September',
    climate: 'Continental',
    language: 'Kazakh, Russian',
    currency: 'KZT',
    featured: true,
  },
  {
    id: 'maldives',
    slug: 'maldives',
    number: '03',
    name: 'Maldives',
    region: 'Indian Ocean',
    tagline: 'Paradise found, love in overwater sanctuaries',
    description: 'Turquoise lagoons, white sand beaches, and 5-star island luxury.',
    longDescription:
      'The Maldives is the ultimate tropical sanctuary — ringed by coral reefs, serene crystal waters, and world-class luxury island resorts.',
    image: '/images/packages/maldives-poster.jpg',
    heroImage: '/images/packages/maldives-poster.jpg',
    gallery: ['/images/packages/maldives-poster.jpg'],
    highlights: ['Private Island Resorts', 'Coral Reef Snorkeling', 'Sunset Cruises', 'Water Villas'],
    bestTime: 'November – April',
    climate: 'Tropical Maritime',
    language: 'Dhivehi, English',
    currency: 'MVR / USD',
    featured: true,
  },
  {
    id: 'bali',
    slug: 'bali',
    number: '04',
    name: 'Bali',
    region: 'Indonesia',
    tagline: 'Island of gods, lush terraces & ocean cliffs',
    description: 'Emerald rice terraces, spiritual temples, and surf sunsets.',
    longDescription:
      'Bali is a timeless paradise where ancient Hindu heritage blends with volcanic peaks, terraced rice fields, and serene beach retreats.',
    image: '/images/packages/bali-poster-1.jpg',
    heroImage: '/images/packages/bali-poster-1.jpg',
    gallery: ['/images/packages/bali-poster-1.jpg', '/images/packages/bali-poster-2.jpg'],
    highlights: ['Ubud Rice Terraces', 'Uluwatu Temple', 'Nusa Penida', 'Floating Breakfasts'],
    bestTime: 'April – October',
    climate: 'Tropical',
    language: 'Indonesian, Balinese',
    currency: 'IDR',
    featured: true,
  },
  {
    id: 'lakshadweep',
    slug: 'lakshadweep',
    number: '05',
    name: 'Lakshadweep',
    region: 'India',
    tagline: 'Unspoiled coral lagoons & crystal waters',
    description: 'India’s hidden coral atoll paradise.',
    longDescription:
      'Lakshadweep features clear glass waters, coral reefs, A/C beachside stays, and excursions to Kalpitti island by glass bottom boat.',
    image: '/images/packages/lakshadweep-poster.jpg',
    heroImage: '/images/packages/lakshadweep-poster.jpg',
    gallery: ['/images/packages/lakshadweep-poster.jpg'],
    highlights: ['Kalpitti Glass Bottom Boat', 'Bangaram & Agatti Atolls', 'Coral Reefs', 'Beachside Rooms'],
    bestTime: 'October – May',
    climate: 'Tropical',
    language: 'Malayalam, English',
    currency: 'INR',
    featured: true,
  },
  {
    id: 'srilanka',
    slug: 'srilanka',
    number: '06',
    name: 'Sri Lanka',
    region: 'South Asia',
    tagline: 'Ancient heritage, wildlife safaris & hill country tea',
    description: 'Golden beaches, ancient UNESCO ruins, and tea trails.',
    longDescription:
      'Sri Lanka captivates travelers with ancient cities like Anuradhapura, Kandy’s Temple of the Tooth, tea estates, and wild leopards in Yala.',
    image: '/images/packages/srilanka-poster.jpg',
    heroImage: '/images/packages/srilanka-poster.jpg',
    gallery: ['/images/packages/srilanka-poster.jpg'],
    highlights: ['Kandy Temple of Tooth', 'Yala Safari', 'Anuradhapura Ruins', 'Highland Tea Estates'],
    bestTime: 'December – April',
    climate: 'Tropical',
    language: 'Sinhala, Tamil, English',
    currency: 'LKR',
    featured: true,
  },
  {
    id: 'andaman',
    slug: 'andaman',
    number: '07',
    name: 'Andaman Islands',
    region: 'India',
    tagline: 'Tropical beach sanctuaries & historic waters',
    description: 'Emerald islands, white sand, and vibrant marine life.',
    longDescription:
      'Andaman offers pristine island beaches, historic landmarks, and world-class scuba and water adventures.',
    image: '/images/packages/andaman-poster.jpg',
    heroImage: '/images/packages/andaman-poster.jpg',
    gallery: ['/images/packages/andaman-poster.jpg'],
    highlights: ['Radhanagar Beach', 'Cellular Jail', 'Havelock Island', 'Scuba Diving'],
    bestTime: 'October – May',
    climate: 'Tropical',
    language: 'Hindi, English, Bengali',
    currency: 'INR',
    featured: true,
  },
  {
    id: 'meghalaya',
    slug: 'meghalaya',
    number: '08',
    name: 'Meghalaya',
    region: 'Northeast India',
    tagline: 'Abode of clouds, living root bridges & glass rivers',
    description: 'Misty hills, waterfalls, and transparent rivers.',
    longDescription:
      'Meghalaya features the crystal-clear Dawki river, UNESCO candidate living root bridges, and misty waterfalls of Cherrapunji.',
    image: '/images/packages/meghalaya-poster.jpg',
    heroImage: '/images/packages/meghalaya-poster.jpg',
    gallery: ['/images/packages/meghalaya-poster.jpg'],
    highlights: ['Dawki Transparent River', 'Cherrapunji Waterfalls', 'Nohkalikai Falls', 'Living Root Bridges'],
    bestTime: 'October – April',
    climate: 'Subtropical Highland',
    language: 'Khasi, Garo, English',
    currency: 'INR',
    featured: true,
  },
]

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug)
}
