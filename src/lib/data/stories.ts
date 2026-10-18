export interface Story {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  authorTitle: string
  authorImage: string
  image: string
  heroImage: string
  date: string
  readingTime: string
  featured: boolean
  tags: string[]
}

export const stories: Story[] = [
  {
    id: 'finding-silence-spiti',
    slug: 'finding-silence-spiti',
    title: 'Finding Silence in the Spiti Valley',
    excerpt:
      'At 4,200 metres above sea level, with no signal and no agenda, I finally understood what it meant to be somewhere completely.',
    content: `There is a particular quality of silence at high altitude that you don't find anywhere else. It's not the silence of a library or an empty room. It's an active silence — the kind that presses gently against your eardrums and asks you to pay attention.

I arrived in Kaza on a Tuesday, or a Wednesday. I'd lost track of days somewhere on the drive through the Rohtang Pass. The landscape had changed so dramatically — from Himalayan forest to something lunar and bone-dry — that time seemed to reorganize itself around geography rather than clocks.

My guide, Tenzin, was a man of forty-something who spoke in short, well-placed sentences. He didn't fill silence with words. He seemed to understand that the landscape was doing enough talking.

We spent three days in the Pin Valley, walking mostly in the early morning when the light came in sideways and made the rock formations look like they were made of amber. The valley is home to snow leopards, though we saw only their footprints in the first morning snow. That felt like enough.

On our final evening, we sat outside the monastery at Tabo and watched the sky turn colours that don't have names in English. Tenzin made tea. We didn't say much.

It is a strange thing to realize, after years of planning and booking and optimizing travel, that the best moments are often the ones you couldn't have planned. The ones that happen in the silences between the activities.

I came back from Spiti with fewer photographs than I expected. But I came back with something I hadn't gone looking for: a sense of perspective that has, so far, proven remarkably durable.`,
    category: 'Journal',
    author: 'Priya Mehta',
    authorTitle: 'Travel Writer',
    authorImage: '/images/hero-himalaya.jpg',
    image: '/images/hero-himalaya.jpg',
    heroImage: '/images/hero-himalaya.jpg',
    date: '2026-08-12',
    readingTime: '6 min read',
    featured: true,
    tags: ['himalayas', 'solitude', 'slow-travel', 'india'],
  },
  {
    id: 'rajasthan-after-dark-story',
    slug: 'rajasthan-after-dark-story',
    title: 'The Blue City After Dark',
    excerpt:
      'Jodhpur reveals its real character after the tour groups leave and the lanes quiet down. Here\'s what you find.',
    content: `Most people photograph Jodhpur\'s famous blue lanes from the base of Mehrangarh Fort, then leave by noon. It\'s efficient travel, and it misses almost everything.

The city's real character emerges in the late afternoon, when the light turns the indigo walls to violet and the temperature becomes something you want to sit inside of. The chai stalls come alive. Children play cricket in small courtyards. Old men sit outside doorways that look like they've been there since the Mughals.

We stayed four nights in a haveli in the old city — a hundred-year-old building that had been in the same family for five generations. Our host, Vikram, was a retired professor who had decided to open three rooms rather than sell. He gave us a set of keys and the freedom to wander.

What I remember most is a Tuesday evening when the electricity went out for two hours. The whole neighbourhood lit candles. Someone started playing sarangi somewhere nearby. We sat on our terrace with cold beer and let the city perform for us without asking anything in return.

That's what Jodhpur is, at its best: a city that performs on its own terms, for its own pleasure, and occasionally lets you in.`,
    category: 'Story',
    author: 'Arjun Sharma',
    authorTitle: 'Photographer & Writer',
    authorImage: '/images/dest-rajasthan.jpg',
    image: '/images/dest-rajasthan.jpg',
    heroImage: '/images/dest-rajasthan.jpg',
    date: '2026-07-28',
    readingTime: '4 min read',
    featured: true,
    tags: ['rajasthan', 'culture', 'india', 'slow-travel'],
  },
  {
    id: 'the-art-of-doing-nothing-kerala',
    slug: 'the-art-of-doing-nothing-kerala',
    title: 'The Art of Doing Nothing in Kerala',
    excerpt:
      'I went to Kerala with a list of things to do. I came back having done almost none of them. This is not a complaint.',
    content: `My itinerary for Kerala was ambitious: backwaters, hill stations, wildlife sanctuaries, beach. I had it all mapped out with a precision that would have impressed any project manager.

The houseboat had other ideas.

We embarked in Alleppey on a warm Thursday morning. Our captain — a quiet man named Suresh who seemed to navigate by some internal sense of the water — moved us through the first canal at a pace that forced recalibration. This was not the pace of a schedule. This was the pace of watching a kingfisher wait.

By the second hour, my phone was in my bag. By the second day, I had forgotten what day it was.

Kerala does this to you. It's the quality of the light, which is never harsh. The way everything is green without being aggressive. The food, which arrives at intervals that feel correct rather than scheduled.

I saw a fraction of what I'd planned. I also slept eight hours a night for the first time in years, cooked fish curry in someone's kitchen, watched the sun rise over the backwaters from a small wooden chair, and had a conversation with my partner that we'd been meaning to have for months.

Productive? By any conventional metric, no. Necessary? Entirely.`,
    category: 'Essay',
    author: 'Sarah Chen',
    authorTitle: 'Editor, Wanderlust',
    authorImage: '/images/dest-kerala.jpg',
    image: '/images/dest-kerala.jpg',
    heroImage: '/images/dest-kerala.jpg',
    date: '2026-06-15',
    readingTime: '5 min read',
    featured: false,
    tags: ['kerala', 'slow-travel', 'india', 'wellness'],
  },
]

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug)
}

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured)
}
