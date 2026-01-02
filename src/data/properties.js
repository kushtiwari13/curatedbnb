import P1 from '../assets/P1.svg'
import P2 from '../assets/P2.svg'
import P3 from '../assets/P3.svg'

const ical =
  'https://www.airbnb.com/calendar/ical/1194226480033123893.ics?t=b74d8cda4c4a4c88a571bcf0ef4d192d&locale=en-GB'

export const properties = [
  {
    id: 'p1',
    slug: 'property-1',
    name: 'Seaside Atelier',
    location: 'Positano Coast, Italy',
    tagline: 'Sun-drenched terraces above the Tyrrhenian Sea.',
    description: [
      'Perched along the cliffside, Seaside Atelier pairs Mediterranean light with modern craft. Hand-plastered walls, sculptural seating, and linen-dressed suites open onto sweeping sea views.',
      'Breakfast baskets arrive with Amalfi citrus, while dusk invites aperitivo on the shaded loggia. A dedicated host coordinates boat charters, vineyard tastings, and private transfers.',
    ],
    features: ['Cliffside views', 'Private plunge terrace', 'Dedicated concierge', 'Chef-on-call'],
    amenities: [
      { label: 'Ocean terrace', iconKey: 'view' },
      { label: 'Plunge pool', iconKey: 'pool' },
      { label: 'Chefs kitchen', iconKey: 'kitchen' },
      { label: 'High-speed Wi-Fi', iconKey: 'wifi' },
      { label: 'Climate control', iconKey: 'ac' },
      { label: 'In-suite spa', iconKey: 'spa' },
    ],
    capacity: { guests: 4, bedrooms: 2, bathrooms: 2 },
    pricing: { nightlyRate: 520, cleaningFee: 110, serviceFeePercent: 0.12 },
    image: P1,
    iCalUrl: ical,
    highlights: ['Walk to the marina', 'Sunrise-facing suites', 'Curated art pieces'],
  },
  {
    id: 'p2',
    slug: 'property-2',
    name: 'Hillside Hideaway',
    location: 'Napa Valley, USA',
    tagline: 'Modern timber lodge framed by vineyards and cypress.',
    description: [
      'Hillside Hideaway is a warm, cedar-lined retreat with panoramic vineyard views. Floor-to-ceiling glazing draws the outside in, while a suspended fireplace anchors the living salon.',
      'Sip reserve bottles from the temperature-controlled cellar, or unwind in the cedar spa deck overlooking rows of Cabernet vines. A sommelier and driver can be arranged on request.',
    ],
    features: ['Vineyard panoramas', 'Sommelier on request', 'Cedar spa deck', 'EV-friendly garage'],
    amenities: [
      { label: 'Outdoor spa', iconKey: 'spa' },
      { label: 'Fireplace', iconKey: 'fireplace' },
      { label: 'Wine fridge', iconKey: 'kitchen' },
      { label: 'Fiber Wi-Fi', iconKey: 'wifi' },
      { label: 'EV charger', iconKey: 'parking' },
      { label: 'Private deck', iconKey: 'view' },
    ],
    capacity: { guests: 6, bedrooms: 3, bathrooms: 3 },
    pricing: { nightlyRate: 620, cleaningFee: 140, serviceFeePercent: 0.12 },
    image: P2,
    iCalUrl: ical,
    highlights: ['Adjacent to tasting rooms', 'Chef partnerships', 'West-facing sunsets'],
  },
  {
    id: 'p3',
    slug: 'property-3',
    name: 'Terrace Maison',
    location: 'Lisbon, Portugal',
    tagline: 'Elevated duplex with luminous city terraces.',
    description: [
      'Terrace Maison layers marble, oak, and woven textiles for a calm city escape. Corner terraces capture castle views, while custom millwork frames an art-filled living room.',
      'Morning espresso arrives via in-suite barista setup; evenings glow with lantern-lit dining on the upper terrace. Discreet housekeeping keeps everything effortless.',
    ],
    features: ['Dual terraces', 'Art-filled interiors', 'Barista setup', 'Quiet yet central'],
    amenities: [
      { label: 'City terrace', iconKey: 'view' },
      { label: 'Elevator access', iconKey: 'parking' },
      { label: 'Gourmet kitchen', iconKey: 'kitchen' },
      { label: 'Premium Wi-Fi', iconKey: 'wifi' },
      { label: 'Climate control', iconKey: 'ac' },
      { label: 'Washer & dryer', iconKey: 'laundry' },
    ],
    capacity: { guests: 4, bedrooms: 2, bathrooms: 2 },
    pricing: { nightlyRate: 440, cleaningFee: 95, serviceFeePercent: 0.11 },
    image: P3,
    iCalUrl: ical,
    highlights: ['Walkable to Bairro Alto', 'Curated art walls', 'Sunset terrace dining'],
  },
]

export const getPropertyBySlug = (slug) =>
  properties.find((property) => property.slug === slug)
