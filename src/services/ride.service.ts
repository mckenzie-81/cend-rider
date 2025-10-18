/**
 * Ride Service
 * Handles ride booking, pricing, options, and history
 * Used by: TransportScreen, RideOptionsScreen, ActivitiesScreen
 */

import { Location } from './location.service';

// ==================== TYPES ====================

export type VehicleType = 'car' | 'okada' | 'keke' | 'dispatch';

export interface VehicleOption {
  id: string;
  type: VehicleType;
  name: string;
  description: string;
  capacity: number;
  pricePerKm: number;
  basePrice: number;
  icon: string;
  available: boolean;
  eta: number; // Estimated time of arrival in minutes
}

export interface PriceEstimate {
  vehicleType: VehicleType;
  basePrice: number;
  distancePrice: number;
  total: number;
  currency: string;
  distance: number; // in km
  duration: number; // in minutes
  surge?: number; // Surge multiplier (1.0 = no surge, 1.5 = 50% increase)
}

export interface RideBooking {
  pickupLocation: {
    address: string;
    coordinates: Location;
  };
  dropoffLocation: {
    address: string;
    coordinates: Location;
  };
  vehicleType: VehicleType;
  paymentMethod: string;
  notes?: string;
}

export interface Ride {
  id: string;
  status: 'searching' | 'confirmed' | 'arriving' | 'in-progress' | 'completed' | 'cancelled';
  pickupLocation: {
    address: string;
    coordinates: Location;
  };
  dropoffLocation: {
    address: string;
    coordinates: Location;
  };
  vehicleType: VehicleType;
  price: number;
  currency: string;
  driver?: {
    id: string;
    name: string;
    rating: number;
    totalRides: number;
    phone: string;
    vehicle: {
      make: string;
      model: string;
      color: string;
      plate: string;
    };
  };
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

// ==================== MOCK DATA ====================

const MOCK_VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'vehicle_car',
    type: 'car',
    name: 'Car',
    description: 'Comfortable 4-seater ride',
    capacity: 4,
    pricePerKm: 150,
    basePrice: 500,
    icon: 'car',
    available: true,
    eta: 5,
  },
  {
    id: 'vehicle_okada',
    type: 'okada',
    name: 'Okada',
    description: 'Quick motorcycle ride',
    capacity: 1,
    pricePerKm: 80,
    basePrice: 200,
    icon: 'bicycle',
    available: true,
    eta: 3,
  },
  {
    id: 'vehicle_keke',
    type: 'keke',
    name: 'Keke Napep',
    description: 'Affordable tricycle',
    capacity: 3,
    pricePerKm: 100,
    basePrice: 300,
    icon: 'car-sport',
    available: true,
    eta: 4,
  },
  {
    id: 'vehicle_dispatch',
    type: 'dispatch',
    name: 'Dispatch',
    description: 'Package delivery service',
    capacity: 0,
    pricePerKm: 120,
    basePrice: 400,
    icon: 'cube',
    available: true,
    eta: 10,
  },
];

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Get available vehicle options for a route
 */
export const getVehicleOptions = async (
  pickup: Location,
  dropoff: Location
): Promise<VehicleOption[]> => {
  await simulateDelay(800);

  // All vehicles available by default
  return MOCK_VEHICLE_OPTIONS;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/rides/vehicle-options', {
    pickup,
    dropoff,
  });
  return response.data;
  */
};

/**
 * Get price estimate for a ride
 */
export const getPriceEstimate = async (
  pickup: Location,
  dropoff: Location,
  vehicleType: VehicleType
): Promise<PriceEstimate> => {
  await simulateDelay(1000);

  const vehicle = MOCK_VEHICLE_OPTIONS.find(v => v.type === vehicleType);
  if (!vehicle) {
    throw new Error('Invalid vehicle type.');
  }

  // Mock distance calculation (simplified)
  const distance = Math.abs(dropoff.latitude - pickup.latitude) * 111 +
    Math.abs(dropoff.longitude - pickup.longitude) * 111; // Rough approximation in km
  const duration = Math.ceil((distance / 40) * 60); // 40 km/h average speed

  const distancePrice = distance * vehicle.pricePerKm;
  const surge = 1.0; // No surge for mock
  const total = (vehicle.basePrice + distancePrice) * surge;

  return {
    vehicleType,
    basePrice: vehicle.basePrice,
    distancePrice: Math.round(distancePrice),
    total: Math.round(total),
    currency: 'NGN',
    distance: Math.round(distance * 10) / 10,
    duration,
    surge,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/rides/price-estimate', {
    pickup,
    dropoff,
    vehicleType,
  });
  return response.data;
  */
};

/**
 * Book a new ride
 */
export const bookRide = async (booking: RideBooking): Promise<Ride> => {
  await simulateDelay(1500);

  const estimate = await getPriceEstimate(
    booking.pickupLocation.coordinates,
    booking.dropoffLocation.coordinates,
    booking.vehicleType
  );

  const ride: Ride = {
    id: `ride_${Date.now()}`,
    status: 'searching',
    pickupLocation: booking.pickupLocation,
    dropoffLocation: booking.dropoffLocation,
    vehicleType: booking.vehicleType,
    price: estimate.total,
    currency: estimate.currency,
    createdAt: new Date().toISOString(),
  };

  return ride;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/rides/book', booking);
  return response.data;
  */
};

/**
 * Get ride history for user
 */
export const getRideHistory = async (limit: number = 20): Promise<Ride[]> => {
  await simulateDelay(1000);

  // Mock ride history
  const mockRides: Ride[] = [
    {
      id: 'ride_1',
      status: 'completed',
      pickupLocation: {
        address: '123 Main Street, Lagos',
        coordinates: { latitude: 6.5244, longitude: 3.3792 },
      },
      dropoffLocation: {
        address: 'Murtala Muhammed Airport',
        coordinates: { latitude: 6.5774, longitude: 3.3213 },
      },
      vehicleType: 'car',
      price: 2500,
      currency: 'NGN',
      driver: {
        id: 'driver_1',
        name: 'John Doe',
        rating: 4.8,
        totalRides: 120,
        phone: '+2341234567890',
        vehicle: {
          make: 'Toyota',
          model: 'Camry',
          color: 'Silver',
          plate: 'ABC 1234',
        },
      },
      createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      startedAt: new Date(Date.now() - 86100000).toISOString(),
      completedAt: new Date(Date.now() - 85200000).toISOString(),
    },
    {
      id: 'ride_2',
      status: 'completed',
      pickupLocation: {
        address: 'Office, Victoria Island',
        coordinates: { latitude: 6.4281, longitude: 3.4219 },
      },
      dropoffLocation: {
        address: 'Home, Lekki',
        coordinates: { latitude: 6.4507, longitude: 3.4730 },
      },
      vehicleType: 'okada',
      price: 800,
      currency: 'NGN',
      driver: {
        id: 'driver_2',
        name: 'Ahmed Bello',
        rating: 4.9,
        totalRides: 250,
        phone: '+2349876543210',
        vehicle: {
          make: 'Bajaj',
          model: 'Pulsar',
          color: 'Red',
          plate: 'XYZ 5678',
        },
      },
      createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      startedAt: new Date(Date.now() - 172500000).toISOString(),
      completedAt: new Date(Date.now() - 171600000).toISOString(),
    },
  ];

  return mockRides.slice(0, limit);

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/rides/history', {
    params: { limit }
  });
  return response.data;
  */
};

/**
 * Get details of a specific ride
 */
export const getRideDetails = async (rideId: string): Promise<Ride> => {
  await simulateDelay(500);

  const history = await getRideHistory();
  const ride = history.find(r => r.id === rideId);

  if (!ride) {
    throw new Error('Ride not found.');
  }

  return ride;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/rides/${rideId}`);
  return response.data;
  */
};

/**
 * Cancel an ongoing ride
 */
export const cancelRide = async (rideId: string, reason?: string): Promise<void> => {
  await simulateDelay(1000);

  // Mock cancellation
  console.log(`Ride ${rideId} cancelled. Reason: ${reason || 'No reason provided'}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/rides/${rideId}/cancel`, { reason });
  */
};

/**
 * Rate a completed ride
 */
export const rateRide = async (
  rideId: string,
  rating: number,
  comment?: string
): Promise<void> => {
  await simulateDelay(800);

  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  // Mock rating submission
  console.log(`Ride ${rideId} rated ${rating} stars. Comment: ${comment || 'None'}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/rides/${rideId}/rate`, {
    rating,
    comment,
  });
  */
};

// ==================== EXPORT ====================

export const RideService = {
  getVehicleOptions,
  getPriceEstimate,
  bookRide,
  getRideHistory,
  getRideDetails,
  cancelRide,
  rateRide,
};
