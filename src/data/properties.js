const getIcalUrl = (url) => url
const getOutboundIcalUrl = (slug) => `/api/ical-out.php?property=${slug}`

export const properties = [
  {
    id: '1579731060033412002',
    slug: 'the-brutalist-den-koramangala',
    name: 'The Brutalist Den, UltraLuxe 3BHK',
    location: 'Koramangala, Bengaluru, India',
    tagline: 'The Brutalist Den, UltraLuxe 3BHK, Koramangala BLR',
    description: [
      'Brutalist architecture meets a touch of modernism in this striking 3 BHK apartment just steps from Sony World Signal in Koramangala.',
      'Expect a carefully balanced mix of styling and comfort with a full kitchen, ACs, strong Wi-Fi, power backup, wet + dry bathrooms, elevator access, two balconies, and covered parking.',
    ],
    features: ['Architectural interiors', 'Steps from Sony World Signal', 'Two balconies', 'Covered parking'],
    amenities: [
      { label: 'Full kitchen', iconKey: 'kitchen' },
      { label: 'Air conditioning', iconKey: 'ac' },
      { label: 'High-speed Wi-Fi', iconKey: 'wifi' },
      { label: 'Power backup', iconKey: 'spa' },
      { label: 'Elevator access', iconKey: 'parking' },
      { label: 'Covered parking', iconKey: 'parking' },
    ],
    capacity: { guests: 7, bedrooms: 3, bathrooms: 3 },
    pricing: {
      weekdayRate: 10950,
      weekendRate: 11936,
      cleaningFee: 0,
      petFee: 0,
      extraGuestFee: 1500,
      extraGuestAfter: 6,
      weeklyDiscountPercent: 0.08,
      monthlyDiscountPercent: 0.15,
      serviceFeePercent: 0.12,
    },
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1579731060033412002/original/54dc3bf9-b662-41ce-9e5b-e6cc235cbaab.jpeg?im_w=720&width=720&quality=70&auto=webp',
    // Gallery images: first five are labeled for the carousel (Hall/Bedroom/Dining/Bathroom/Balcony).
    // Add additional images without labels; they appear only in "Show all photos".
    gallery: [
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', label: 'Bedroom' },
      { src: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=1600&q=80', label: 'Dining' },
      { src: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=1600&q=80', label: 'Bathroom' },
      { src: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1600&q=80', label: 'Balcony' },
      { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80' },
      { src: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80' },
    ],
    iCalUrl: getIcalUrl('https://www.airbnb.co.in/calendar/ical/1579731060033412002.ics?t=a13958616da248379bc3656227809d18'),
    outIcalUrl: getOutboundIcalUrl('the-brutalist-den-koramangala'),
    mapAddress: 'The Brutalist Den',
    mapLink: 'https://maps.app.goo.gl/7V9yZ66hiKWmsf897?g_st=iw',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5536655437977!2d77.6298517!3d12.936383399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144297d6dcf1%3A0xfe608fc250160719!2sZaanz%20Apartments!5e0!3m2!1sen!2sin!4v1768919846220!5m2!1sen!2sin',
    highlights: ['Architectural design', 'Lush indoor plants', 'Central Koramangala address'],
  },
  {
    id: '1194226480033123893',
    slug: 'the-city-boho-jayanagar',
    name: 'The City Boho, Luxe 3BHK',
    location: 'Jayanagar, Bengaluru, India',
    tagline: 'The City Boho, Luxe 3BHK Jayanagar - Great Location',
    description: [
      'The City Boho sits in the heart of Jayanagar, offering a prime Bangalore address that still feels like a secluded, luxe holiday home.',
      'Highlights include indoor plants, a walk-in wardrobe, 50 Mbps Wi-Fi, a fully equipped kitchen, AC, orthopaedic king + queen beds, a dedicated workspace, and power backup.',
    ],
    features: ['Prime Jayanagar address', 'Walk-in wardrobe', 'Dedicated workspace', 'Power backup'],
    amenities: [
      { label: 'Fully equipped kitchen', iconKey: 'kitchen' },
      { label: '50 Mbps Wi-Fi', iconKey: 'wifi' },
      { label: 'Air conditioning', iconKey: 'ac' },
      { label: 'Washer', iconKey: 'laundry' },
      { label: 'Smart TV', iconKey: 'fireplace' },
      { label: 'Power backup', iconKey: 'spa' },
    ],
    capacity: { guests: 7, bedrooms: 3, bathrooms: 3 },
    pricing: {
      weekdayRate: 7078,
      weekendRate: 8028,
      cleaningFee: 0,
      petFee: 0,
      extraGuestFee: 1500,
      extraGuestAfter: 6,
      weeklyDiscountPercent: 0.08,
      monthlyDiscountPercent: 0.15,
      serviceFeePercent: 0.12,
    },
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1194226480033123893/original/415dd0c7-0029-4afb-b50c-cdcc015360fe.jpeg?im_w=720&width=720&quality=70&auto=webp',
    // Gallery images: first five are labeled for the carousel (Hall/Bedroom/Dining/Bathroom/Balcony).
    // Add additional images without labels; they appear only in "Show all photos".
    gallery: [
      { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', label: 'Bedroom' },
      { src: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=1600&q=80', label: 'Dining' },
      { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80', label: 'Bathroom' },
      { src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80', label: 'Balcony' },
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80' },
      { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80' },
    ],
    iCalUrl: getIcalUrl('https://www.airbnb.co.in/calendar/ical/1194226480033123893.ics?t=b74d8cda4c4a4c88a571bcf0ef4d192d'),
    outIcalUrl: getOutboundIcalUrl('the-city-boho-jayanagar'),
    mapAddress: 'The City Boho',
    mapLink: 'https://maps.app.goo.gl/u5TM7erYfxdwcdBt8?g_st=iw',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7094300361236!2d77.58744709999999!3d12.926387799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15a19b89ba9d%3A0x245ca8498b3b2d4a!2sNoor%20Residency%2C%2033rd%20A%20Cross%20Rd%2C%204th%20T%20Block%20East%2C%20Pattabhirama%20Nagar%2C%20Jayanagar%2C%20Bengaluru%2C%20Karnataka%20560011!5e0!3m2!1sen!2sin!4v1769550882336!5m2!1sen!2sin',
    highlights: ['Indoor plant styling', 'Concierge-ready layout', 'Walkable Jayanagar'],
  },
  {
    id: '1312299992373684071',
    slug: 'the-japandi-nest-jayanagar',
    name: 'The Japandi Nest, UltraLuxe 3BHK',
    location: 'Jayanagar, Bengaluru, India',
    tagline: 'The Japandi Nest, UltraLuxe 3BHK Jayanagar - Great Location',
    description: [
      'This luxe apartment channels premium Japanese living with meticulous detailing and warm lighting throughout.',
      'Enjoy a fully equipped kitchen, utility area, balcony sit-out, orthopaedic king + queen beds, high-speed Wi-Fi, dedicated workspace, and heating + AC.',
    ],
    features: ['Japandi-inspired design', 'Balcony sit-out', 'Dedicated workspace', 'Warm ambient lighting'],
    amenities: [
      { label: 'Fully equipped kitchen', iconKey: 'kitchen' },
      { label: 'High-speed Wi-Fi', iconKey: 'wifi' },
      { label: 'Air conditioning', iconKey: 'ac' },
      { label: 'Heaters', iconKey: 'fireplace' },
      { label: 'Utility area', iconKey: 'laundry' },
      { label: 'Balcony sit-out', iconKey: 'view' },
    ],
    capacity: { guests: 7, bedrooms: 3, bathrooms: 3 },
    pricing: {
      weekdayRate: 9950,
      weekendRate: 10950,
      cleaningFee: 0,
      petFee: 0,
      extraGuestFee: 2000,
      extraGuestAfter: 7,
      weeklyDiscountPercent: 0.07,
      monthlyDiscountPercent: 0.15,
      serviceFeePercent: 0.12,
    },
    image:
      'https://a0.muscache.com/im/pictures/hosting/Hosting-1312299992373684071/original/5f429019-3dc0-428f-862c-4926a8c2e79b.jpeg?im_w=720&width=720&quality=70&auto=webp',
    // Gallery images: first five are labeled for the carousel (Hall/Bedroom/Dining/Bathroom/Balcony).
    // Add additional images without labels; they appear only in "Show all photos".
    gallery: [
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80', label: 'Hall' },
      { src: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1600&q=80', label: 'Bedroom' },
      { src: 'https://images.unsplash.com/photo-1501876725168-00c445821c9e?auto=format&fit=crop&w=1600&q=80', label: 'Dining' },
      { src: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1600&q=80', label: 'Bathroom' },
      { src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80', label: 'Balcony' },
      { src: 'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1600&q=80' },
      { src: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80' },
    ],
    iCalUrl: getIcalUrl('https://www.airbnb.co.in/calendar/ical/1312299992373684071.ics?t=4cbc774432c54bdeb01449ae2d32d8d2'),
    outIcalUrl: getOutboundIcalUrl('the-japandi-nest-jayanagar'),
    mapAddress: 'The Japandi Nest',
    mapLink: 'https://maps.app.goo.gl/u5TM7erYfxdwcdBt8?g_st=iw',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7092384341895!2d77.5872318!3d12.9264001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159228ab2755%3A0x81a1841a0391d2c1!2sMoshi%20Moshi%20-%20The%20Communication%20Company!5e0!3m2!1sen!2sin!4v1768919936306!5m2!1sen!2sin',
    highlights: ['Warm Japanese-inspired lighting', 'Central Jayanagar address', 'Thoughtful detailing'],
  },
]

export const getPropertyBySlug = (slug) =>
  properties.find((property) => property.slug === slug)
