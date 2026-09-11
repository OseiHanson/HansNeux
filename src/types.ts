export type TripStatus = 
  | 'idle'
  | 'dispatching'
  | 'driver_assigned'
  | 'en_route_to_airport'
  | 'arrived_at_terminal'
  | 'passenger_onboard'
  | 'completed'
  | 'cancelled';

export interface AirportTerminal {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  terminals: {
    id: string;
    name: string;
    pickupCurbs: string[];
  }[];
}

export interface Vehicle {
  id: string;
  name: string;
  model: string;
  year: number;
  category: 'Executive SUV' | 'Business Sedan' | 'VIP Armored SUV' | 'Eco Premier';
  plateNumber: string;
  image: string;
  interiorImage?: string;
  passengers: number;
  luggage: number;
  basePrice: number;
  perKmRate: number;
  highlightBadge?: string;
  features: string[];
  description: string;
  rating: number;
  totalTrips: number;
  isFlagship?: boolean;
}

export interface Driver {
  id: string;
  name: string;
  title: string;
  avatar: string;
  phone: string;
  rating: number;
  reviewCount: number;
  completedTrips: number;
  yearsExperience: number;
  languages: string[];
  vehicleId: string;
  vehicleName: string;
  vehiclePlate: string;
  badges: string[];
  status: 'available' | 'on_trip' | 'staging_airport';
  bio: string;
  punctualityRate: string;
}

export interface ChatMessage {
  id: string;
  sender: 'passenger' | 'driver' | 'system';
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Booking {
  id: string;
  bookingRef: string;
  createdAt: string;
  pickupAirport: string;
  terminal: string;
  pickupZone: string;
  flightNumber?: string;
  flightStatus?: string;
  dropoffLocation: string;
  pickupTimeType: 'immediate' | 'scheduled';
  scheduledTime?: string;
  meetAndGreet: boolean;
  passengerName: string;
  passengerPhone: string;
  placardText?: string;
  passengersCount: number;
  luggageCount: number;
  vehicle: Vehicle;
  driver?: Driver;
  status: TripStatus;
  fareBreakdown: {
    baseFare: number;
    distanceKm: number;
    distanceFare: number;
    airportTollFee: number;
    meetAndGreetFee: number;
    discount: number;
    tax: number;
    total: number;
  };
  paymentMethod: 'card' | 'momo' | 'apple_pay' | 'cash';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  rating?: number;
  ratingTags?: string[];
  ratingComment?: string;
  driverTip?: number;
  etaMinutes?: number;
  receiptNumber: string;
}
