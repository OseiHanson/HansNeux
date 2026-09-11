import { AirportTerminal, Driver, Vehicle, Booking, ChatMessage } from '../types';

export const AIRPORTS_DATA: AirportTerminal[] = [
  {
    id: 'acc',
    name: 'Kotoka International Airport',
    code: 'ACC',
    city: 'Accra',
    country: 'Ghana',
    terminals: [
      {
        id: 't3',
        name: 'Terminal 3 (International Arrivals)',
        pickupCurbs: [
          'Arrival Curbside Door B (Standard Pick-Up)',
          'Arrival Curbside Door A (Outer Island)',
          'VIP Chauffeur Staging Lane 1',
          'Terminal 3 Baggage Exit - Meet & Greet Placard Area'
        ]
      },
      {
        id: 't2',
        name: 'Terminal 2 (Domestic Flights)',
        pickupCurbs: [
          'Terminal 2 Main Entrance Curb',
          'Short Stay Parking Bay A'
        ]
      },
      {
        id: 'vip',
        name: 'Presidential & Executive VVIP Lounge',
        pickupCurbs: [
          'VVIP Private Escort Gate',
          'Executive Jet Terminal Ramp'
        ]
      }
    ]
  },
  {
    id: 'lhr',
    name: 'London Heathrow Airport',
    code: 'LHR',
    city: 'London',
    country: 'United Kingdom',
    terminals: [
      {
        id: 't5',
        name: 'Terminal 5 (International Arrivals)',
        pickupCurbs: [
          'Chauffeur Meeting Point (Ground Floor)',
          'Short Stay Car Park Level 1 Bay C',
          'Terminal 5 North Curb'
        ]
      },
      {
        id: 't2-lhr',
        name: 'Terminal 2 (The Queen\'s Terminal)',
        pickupCurbs: [
          'Arrival Hall Costa Coffee Meeting Spot',
          'Express Chauffeur Drop & Pick Bay'
        ]
      }
    ]
  },
  {
    id: 'jfk',
    name: 'John F. Kennedy International',
    code: 'JFK',
    city: 'New York',
    country: 'United States',
    terminals: [
      {
        id: 't4-jfk',
        name: 'Terminal 4 (International Arrivals)',
        pickupCurbs: [
          'Passenger Pick-Up Area B (Outer Lane)',
          'Welcome Center Chauffeur Meet Area',
          'Terminal 4 Ground Transportation Level 1'
        ]
      },
      {
        id: 't8-jfk',
        name: 'Terminal 8 (American & OneWorld)',
        pickupCurbs: [
          'Arrivals Curb Station 2',
          'VIP Chauffeur Area'
        ]
      }
    ]
  },
  {
    id: 'dxb',
    name: 'Dubai International Airport',
    code: 'DXB',
    city: 'Dubai',
    country: 'United Arab Emirates',
    terminals: [
      {
        id: 't3-dxb',
        name: 'Terminal 3 (Emirates Hub)',
        pickupCurbs: [
          'Chauffeur Drive Lounge Door 1',
          'Valet & Pre-Booked Pick-up Zone C',
          'VIP Terminal Concierge Gate'
        ]
      }
    ]
  }
];

export const POPULAR_DESTINATIONS = [
  'Kempinski Hotel Gold Coast City, Ministries, Accra',
  'Accra Marriott Hotel, Airport City',
  'Mövenpick Ambassador Hotel, Independence Avenue',
  'Cantonments Diplomatic Enclave & Embassies',
  'Airport Residential Area, 4th Circular Road',
  'Labone Luxury Suites & Villas, Accra',
  'Labadi Beach Hotel, La Palm Road',
  'East Legon Executive Villas, Boundary Road',
  'British High Commission, Osu Link',
  'US Embassy Consular Section, Cantonments'
];

export const FLEET_VEHICLES: Vehicle[] = [
  {
    id: 'honda-crv-2017',
    name: 'Honda CR-V EX',
    model: 'EX Luxury Edition (2017)',
    year: 2017,
    category: 'Executive SUV',
    plateNumber: 'DV 9A6030',
    image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=800&q=80',
    interiorImage: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    passengers: 4,
    luggage: 3,
    basePrice: 35,
    perKmRate: 2.2,
    highlightBadge: 'Hans Nexus Flagship Choice',
    isFlagship: true,
    features: [
      'Push Start (Keyless Convenience)',
      'Power Sunroof (Fresh Air Flow)',
      'Reverse Camera & Park Assist',
      'Dual-Zone Chilled Climate Control',
      'Spacious Cream Leather Interior',
      'High-Speed In-Car Wi-Fi & Bottled Water',
      'Clean Interior & Exterior Guarantee',
      'Cleared 2026 Fleet Paperwork'
    ],
    description: 'Style. Comfort. Performance. The signature Hans Nexus airport workhorse offering generous legroom, plush cream leather upholstery, and ample luggage space for seamless airport pickups.',
    rating: 4.98,
    totalTrips: 1840
  },
  {
    id: 'mercedes-e300',
    name: 'Mercedes-Benz E-Class',
    model: 'E300 AMG Line Chauffeur',
    year: 2022,
    category: 'Business Sedan',
    plateNumber: 'DV 7B1290',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
    interiorImage: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80',
    passengers: 3,
    luggage: 2,
    basePrice: 55,
    perKmRate: 3.4,
    highlightBadge: 'Executive First Class',
    features: [
      'Burmester 3D Surround Audio',
      'Ambient LED Mood Cabin Lighting',
      'Acoustic Glass for Silent Ride',
      'Rear Seat Wireless Qi Chargers',
      'Complimentary Perrier & San Pellegrino',
      'Formal Suit & Tie Chauffeur'
    ],
    description: 'The definitive business executive sedan designed for diplomats, C-suite executives, and solo international travelers seeking quiet prestige.',
    rating: 4.96,
    totalTrips: 1210
  },
  {
    id: 'landcruiser-v8',
    name: 'Toyota Land Cruiser 300',
    model: 'GR-Sport VIP Executive',
    year: 2023,
    category: 'VIP Armored SUV',
    plateNumber: 'GR 8900-24',
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80',
    interiorImage: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
    passengers: 6,
    luggage: 5,
    basePrice: 85,
    perKmRate: 4.5,
    highlightBadge: 'Presidential & Family VIP',
    features: [
      'Commanding Road Presence & Elevated View',
      'Massive 5-Suitcase Trunk Capacity',
      'Refrigerator Cool Box with Chilled Towels',
      'Multi-Zone Rear Passenger Climate',
      'Active Electronic Air Suspension',
      'VVIP Security Clearances & Police Escort Ready'
    ],
    description: 'Supreme comfort, unparalleled road authority, and abundant space for delegations, families, or travelers with extensive international luggage.',
    rating: 4.99,
    totalTrips: 940
  },
  {
    id: 'tesla-model-y',
    name: 'Tesla Model Y',
    model: 'Long Range Dual Motor',
    year: 2023,
    category: 'Eco Premier',
    plateNumber: 'DV 4X9810',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
    interiorImage: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
    passengers: 4,
    luggage: 3,
    basePrice: 42,
    perKmRate: 2.6,
    highlightBadge: 'Zero Emissions Eco Luxury',
    features: [
      '100% Electric & Ultra-Quiet Ride',
      'Panoramic All-Glass Tinted Roof',
      'HEPA Bioweapon Defense Air Filtration',
      'In-Cabin High Speed Connectivity',
      'Deep Front & Rear Trunk Storage'
    ],
    description: 'Modern whisper-quiet electric airport transit with zero tailpipe emissions and cutting-edge digital climate comfort.',
    rating: 4.95,
    totalTrips: 780
  }
];

export const PRIMARY_DRIVER: Driver = {
  id: 'drv-01',
  name: 'Captain Samuel Mensah',
  title: 'Senior Master Chauffeur',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  phone: '+233 24 892 4011',
  rating: 4.98,
  reviewCount: 684,
  completedTrips: 1840,
  yearsExperience: 9,
  languages: ['English', 'French (Conversational)', 'Twi', 'Ga'],
  vehicleId: 'honda-crv-2017',
  vehicleName: 'Honda CR-V EX (2017)',
  vehiclePlate: 'DV 9A6030',
  badges: [
    'Hans Nexus Certified Chauffeur',
    'Airport Security Clearance 2026',
    'Defensive VIP Driving Certified',
    'Pristine Vehicle Sanitation 5★',
    'Luggage Master'
  ],
  status: 'staging_airport',
  bio: '9+ years dedicated to Kotoka & regional airport transfers. Trained in executive protocol, baggage handling, and punctual flight tracking.',
  punctualityRate: '99.7%'
};

export const SECONDARY_DRIVER: Driver = {
  id: 'drv-02',
  name: 'Kofi Kwakye Asante',
  title: 'Executive Diplomatic Driver',
  avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  phone: '+233 55 318 9042',
  rating: 4.96,
  reviewCount: 432,
  completedTrips: 1210,
  yearsExperience: 7,
  languages: ['English', 'German', 'Twi'],
  vehicleId: 'mercedes-e300',
  vehicleName: 'Mercedes-Benz E300 AMG',
  vehiclePlate: 'DV 7B1290',
  badges: [
    'Embassy Protocol Specialist',
    'Fluent German Speaker',
    'VIP Security Escort'
  ],
  status: 'staging_airport',
  bio: 'Specialized in diplomatic missions, corporate conferences, and VIP hotel shuttles.',
  punctualityRate: '99.4%'
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HN-98241',
    bookingRef: 'HN-98241',
    createdAt: '2026-09-08 14:32',
    pickupAirport: 'Kotoka International Airport (ACC)',
    terminal: 'Terminal 3 (International Arrivals)',
    pickupZone: 'Arrival Curbside Door B (Standard Pick-Up)',
    flightNumber: 'BA 081 (British Airways)',
    flightStatus: 'Landed On Time (13:55)',
    dropoffLocation: 'Kempinski Hotel Gold Coast City, Ministries, Accra',
    pickupTimeType: 'immediate',
    meetAndGreet: true,
    passengerName: 'Osei Hanson',
    passengerPhone: '+233 20 119 4588',
    placardText: 'MR. OSEI HANSON - HANS NEXUS VIP',
    passengersCount: 2,
    luggageCount: 2,
    vehicle: FLEET_VEHICLES[0],
    driver: PRIMARY_DRIVER,
    status: 'completed',
    fareBreakdown: {
      baseFare: 35.00,
      distanceKm: 9.4,
      distanceFare: 20.68,
      airportTollFee: 4.00,
      meetAndGreetFee: 8.00,
      discount: 0,
      tax: 4.32,
      total: 72.00
    },
    paymentMethod: 'card',
    paymentStatus: 'paid',
    rating: 5,
    ratingTags: ['Punctual Chauffeur', 'Pristine Honda CR-V', 'Assisted with Luggage', 'Comfortable Drive'],
    ratingComment: 'Exceptional pickup! Captain Samuel was waiting right by Door B with my name board. The Honda CR-V interior smelled brand new and AC was nice and cold.',
    driverTip: 10,
    receiptNumber: 'REC-HN-2026-09081'
  },
  {
    id: 'HN-94112',
    bookingRef: 'HN-94112',
    createdAt: '2026-09-01 19:10',
    pickupAirport: 'Kotoka International Airport (ACC)',
    terminal: 'Terminal 3 (International Arrivals)',
    pickupZone: 'VIP Chauffeur Staging Lane 1',
    flightNumber: 'DL 156 (Delta Airlines)',
    flightStatus: 'Landed (18:40)',
    dropoffLocation: 'Airport Residential Area, 4th Circular Road, Accra',
    pickupTimeType: 'immediate',
    meetAndGreet: false,
    passengerName: 'Osei Hanson',
    passengerPhone: '+233 20 119 4588',
    passengersCount: 1,
    luggageCount: 1,
    vehicle: FLEET_VEHICLES[1],
    driver: SECONDARY_DRIVER,
    status: 'completed',
    fareBreakdown: {
      baseFare: 55.00,
      distanceKm: 5.2,
      distanceFare: 17.68,
      airportTollFee: 4.00,
      meetAndGreetFee: 0,
      discount: 5.00,
      tax: 4.32,
      total: 76.00
    },
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    rating: 5,
    ratingTags: ['Smooth Ride', 'Professional Driver', 'Great Wi-Fi'],
    ratingComment: 'Very smooth airport pickup. Quick dispatch and clear instructions.',
    driverTip: 5,
    receiptNumber: 'REC-HN-2026-09012'
  }
];

export const PRESET_CHAT_CHIPS = [
  'I just passed through customs & immigration!',
  'Waiting for luggage at Carousel 4.',
  'I am stepping out through Arrival Door B now.',
  'Can you please confirm your Honda CR-V plate?',
  'Flight was delayed by 15 mins, walking out now.',
  'I see your Hans Nexus name placard!'
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'system',
    text: 'Flight BA 081 landed. Driver Captain Samuel Mensah is staged at Kotoka T3 Curbside Door B.',
    timestamp: '14:02',
    read: true
  },
  {
    id: 'msg-2',
    sender: 'driver',
    text: 'Hello Mr. Hanson! Welcome to Accra. I am Captain Samuel in the Black Honda CR-V (DV 9A6030). I am holding your Hans Nexus welcome placard right at the Door B arrival exit. Take your time with baggage claim!',
    timestamp: '14:04',
    read: true
  }
];
