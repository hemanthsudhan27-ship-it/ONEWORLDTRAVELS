export interface Service {
  id: string
  number: string
  title: string
  tagline: string
  category: 'Flights' | 'Hotels' | 'Umra' | 'Insurance' | 'Visa' | 'Holidays' | 'Cruises'
  badge: string
  shortDescription: string
  fullDescription: string
  icon: string
  features: string[]
  highlights: string[]
  sampleQuery: string
}

export const servicesData: Service[] = [
  {
    id: 'flight-tickets',
    number: '01',
    title: 'Flight Tickets',
    tagline: 'Domestic & International Air Ticketing with Best Fare Guarantee',
    category: 'Flights',
    badge: 'IATA Accredited',
    shortDescription: 'Seamless domestic and international airline bookings with instant PNR confirmation, seat selection, extra baggage, and flexible cancellations.',
    fullDescription: 'As an IATA-accredited agency, One World Travel & Tours connects you to major international and domestic carriers with exclusive contracted rates. From direct departures out of Calicut (CCJ), Kochi, Kannur, and global hubs to complex multi-city itineraries, our ticketing desk guarantees optimal flight connections and round-the-clock rescheduling support.',
    icon: 'Plane',
    features: [
      'Instant PNR issuance & verified e-tickets',
      'Exclusive student, family, and group discounts',
      'Direct departures from Calicut, Kerala & all major airports',
      'Baggage allowance guidance & preferred seat assignments',
      '24/7 rebooking, cancellation & date-change assistance',
    ],
    highlights: ['Domestic & International', 'IATA Certified', 'Multi-City Flights', 'Corporate & Group Fares'],
    sampleQuery: 'I would like to enquire about flight tickets from Calicut to [Destination].',
  },
  {
    id: 'hotel-booking',
    number: '02',
    title: 'Hotel Booking',
    tagline: 'Handpicked Luxury Resorts, Boutique Stays & Verified Accommodations',
    category: 'Hotels',
    badge: 'Best Rates Guaranteed',
    shortDescription: 'Worldwide accommodation booking ranging from 5-star luxury resorts and boutique villas to budget-friendly verified hotels.',
    fullDescription: 'Whether traveling for business, family leisure, or romantic honeymoon escapes, we partner with premier hotel chains, private heritage villas, and boutique properties across the world. Enjoy negotiated corporate tariffs, complimentary breakfast upgrades, and hassle-free check-ins verified by our travel team.',
    icon: 'Hotel',
    features: [
      'Over 500,000+ verified hotels and luxury private pool villas',
      'Complimentary room upgrades & early check-in (subject to availability)',
      'Centrally located properties close to key attractions & transport',
      'Free cancellation & flexible amendment options on select properties',
      'Family suites, honeymoon decorations, and special dining arrangements',
    ],
    highlights: ['5-Star Luxury', 'Boutique Villas', 'Family Resorts', 'Global Network'],
    sampleQuery: 'I am looking for hotel accommodations in [City/Country] for [Number of Guests].',
  },
  {
    id: 'umra-packages',
    number: '03',
    title: 'Umra Packages',
    tagline: 'Spiritual Journeys to the Holy Lands with Dedicated Care & Reverence',
    category: 'Umra',
    badge: 'Sacred Pilgrimage',
    shortDescription: 'Comprehensive Umra pilgrimage programs with convenient direct flights, premium hotels near Haram in Makkah & Madinah, and guided Ziyarat.',
    fullDescription: 'Perform your holy pilgrimage with peace of mind and heartfelt comfort. One World Travel & Tours curates respectful, hassle-free Umra packages with direct departures from Calicut and South India. We provide hand-picked 3-star, 4-star, and 5-star hotels within walking distance of Masjid al-Haram and Masjid an-Nabawi, comprehensive visa clearance, comfortable AC ground transfers, and scholarly guidance for Ziyarat.',
    icon: 'MoonStar',
    features: [
      'Direct flight connectivity from Calicut (CCJ) & major international hubs',
      'Premium hotels in close walking distance to Haram in Makkah & Madinah',
      'Complete Umra e-visa issuance, medical insurance & biometric assistance',
      'Guided historical Ziyarat tours in Makkah and Madinah with experienced guides',
      'Sanitized private luxury buses and VIP private car transfers (Jeddah/Makkah/Madinah)',
      '24/7 dedicated Malayalam, English, and Arabic speaking ground support staff',
    ],
    highlights: ['Near Haram Stays', 'Direct Flights from Calicut', 'Scholarly Ziyarat', 'Ramadan & Year-Round'],
    sampleQuery: 'I would like to enquire about upcoming Umra packages from Calicut for [Family/Solo].',
  },
  {
    id: 'travel-insurance',
    number: '04',
    title: 'Travel Insurance',
    tagline: 'Comprehensive Worldwide Protection for Complete Peace of Mind',
    category: 'Insurance',
    badge: 'Cashless Medical Cover',
    shortDescription: 'End-to-end domestic and international travel insurance covering medical emergencies, trip interruptions, delayed luggage, and passport loss.',
    fullDescription: 'Never let unforeseen events disrupt your journey. Our international travel insurance policies are mandatory and compliant for Schengen, USA, UK, and worldwide visa requirements. Experience peace of mind with 24/7 international helplines, cashless hospital networks, and quick claim settlements for medical crises or flight cancellations.',
    icon: 'ShieldCheck',
    features: [
      'Overseas medical emergency & hospitalization coverage up to $500,000+',
      'Full Schengen visa compliant policies with instant certificate issuance',
      'Trip cancellation, curtailment, flight delay & missed connection compensation',
      'Baggage loss, luggage delay & emergency passport replacement coverage',
      'COVID-19 and infectious disease hospitalization protection included',
      '24/7 global multilingual claim assistance with cashless medical network',
    ],
    highlights: ['Schengen Compliant', 'Instant Issuance', 'Cashless Claims', 'Zero Deductible Options'],
    sampleQuery: 'I need international travel insurance for my trip to [Country] for [Number of Days].',
  },
  {
    id: 'global-visa',
    number: '05',
    title: 'Global Visa',
    tagline: 'Expert Visa Consultation, Hassle-Free Filing & High Approval Rate',
    category: 'Visa',
    badge: '50+ Countries',
    shortDescription: 'Professional visa assistance for tourist, business, visit, and transit visas across 50+ countries with meticulous documentation support.',
    fullDescription: 'Navigating international visa requirements can be intricate and time-consuming. Our seasoned visa consultants in Puthiyara, Calicut guide you every step of the way — from selecting the appropriate visa category to document preparation, travel itinerary crafting, cover letter drafting, VFS appointment booking, and mock interview briefing.',
    icon: 'Globe',
    features: [
      'Tourist, business, visit, and transit visa assistance for 50+ countries',
      'Schengen (Europe), UK, USA, Canada, Australia & New Zealand expertise',
      'Express E-Visas: Dubai/UAE, Saudi Arabia, Singapore, Malaysia, Thailand, Vietnam, Oman',
      'Accurate document vetting, flight/hotel reservation proofs & cover letter drafting',
      'VFS Global / Embassy appointment scheduling & biometric appointment coordination',
      'High approval track record backed by experienced documentation specialists',
    ],
    highlights: ['99% Success Track', 'Express E-Visas', 'Schengen & USA/UK', 'Complete Documentation'],
    sampleQuery: 'I need visa consultation and processing for [Country] for [Purpose of Travel].',
  },
  {
    id: 'holiday-packages',
    number: '06',
    title: 'Holiday Packages',
    tagline: 'Tailor-Made Domestic & International Vacations Tailored to You',
    category: 'Holidays',
    badge: '100% Customized',
    shortDescription: 'Customized vacation packages for families, honeymoons, and adventure seekers across exotic domestic and international destinations.',
    fullDescription: 'Every traveler is unique, and so should be your holiday. One World Travel & Tours crafts bespoke holiday packages tailored precisely to your style, budget, and travel dates. From romantic escapes in Bali and Maldives to cultural journeys in Kazakhstan, Georgia, and Europe, or scenic trails in Kashmir, Meghalaya, and Andaman — we handle hotels, sightseeing, guides, and transfers effortlessly.',
    icon: 'Palmtree',
    features: [
      'Top international destinations: Thailand, Bali, Malaysia, Maldives, Kazakhstan, Georgia, Sri Lanka, Europe',
      'Domestic favorites: Kashmir, Himachal/Manali, Kerala, Meghalaya, Andaman, Lakshadweep',
      'Bespoke itineraries crafted around your pace with verified 3/4/5-star stays',
      'Private chauffeured airport transfers & comfortable sightseeing vehicles',
      'Curated experiences: island hopping, desert safaris, cable cars, cultural dinners & adventure sports',
      'Dedicated travel manager reachable on WhatsApp throughout your journey',
    ],
    highlights: ['Family & Honeymoon', 'Bespoke Itineraries', 'Private Transfers', 'Verified Stays'],
    sampleQuery: 'I would like to plan a holiday package to [Destination] for [Number of Days] for [Group Size].',
  },
  {
    id: 'cruise-booking',
    number: '07',
    title: 'Cruise Booking',
    tagline: 'Luxury Ocean Liners & Scenic River Cruises Across the World',
    category: 'Cruises',
    badge: 'All-Inclusive Luxury',
    shortDescription: 'Unforgettable voyages with world-class cruise lines, ocean-view staterooms, gourmet dining, and spectacular onboard entertainment.',
    fullDescription: 'Set sail on the voyage of a lifetime. Whether you crave the coastal beauty of India and Sri Lanka aboard Cordelia Cruises or the grandeur of international ocean liners like Royal Caribbean, Costa, and MSC across Singapore, the Mediterranean, or the Caribbean — our cruise desk secures the best cabin allocations, shore excursions, and all-inclusive packages.',
    icon: 'Ship',
    features: [
      'Domestic sailings on Cordelia Cruises (Mumbai, Goa, Kochi, Lakshadweep & Sri Lanka)',
      'International liners: Royal Caribbean, Costa Cruises, MSC Cruises, Norwegian',
      'Scenic river cruises: European rivers (Rhine/Danube), Nile River & Halong Bay voyages',
      'Ocean view staterooms, interior cabins, and private balcony suites',
      'All-inclusive gourmet dining, Broadway-style theater shows, casinos & kids clubs',
      'Guided onshore excursions, port disembarkation tours, and travel insurance assistance',
    ],
    highlights: ['Cordelia Cruises', 'Royal Caribbean & Costa', 'Balcony Cabins', 'All-Inclusive Dining'],
    sampleQuery: 'I am interested in booking a cruise voyage on [Cordelia / International] for [Travel Month].',
  },
]

export const companyDetails = {
  name: 'One World Travel & Tours',
  tagline: 'Connecting Globally',
  accreditations: [
    { code: 'IATA', label: 'IATA Accredited Agent', description: 'International Air Transport Association certification for global airline ticketing authority.' },
    { code: 'TAFI', label: 'TAFI Member', description: 'Travel Agents Federation of India member — The Way Forward.' },
  ],
  phones: [
    { display: '+91 907 2329 992', raw: '919072329992', primary: true },
    { display: '+91 952 6617 757', raw: '919526617757', primary: false },
  ],
  email: 'hello@oneworld.travel',
  address: 'Puthiyara, Calicut (Kozhikode), Kerala, India',
}
