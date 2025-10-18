/**
 * Services Catalog Service
 * Handles non-transport services (delivery, errands, logistics, etc.)
 * Used by: ServicesScreen, HomeScreen
 */

// ==================== TYPES ====================

export type ServiceCategory = 
  | 'delivery'
  | 'errands'
  | 'logistics'
  | 'moving'
  | 'shopping'
  | 'courier'
  | 'other';

export type ServiceStatus = 'active' | 'inactive' | 'coming_soon';

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  status: ServiceStatus;
  icon?: string;
  imageUrl?: string;
  basePrice?: number;
  priceUnit?: string; // e.g., 'per km', 'per item', 'per hour'
  estimatedDuration?: string; // e.g., '30-45 mins'
  features?: string[];
  isPopular?: boolean;
  comingSoonDate?: string; // When service will be available
}

export interface ServiceBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  pickupLocation?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  dropoffLocation?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  scheduledTime?: string; // ISO date string
  notes?: string;
  items?: string[]; // For shopping/delivery lists
  estimatedPrice: number;
  finalPrice?: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface ServiceRequest {
  serviceId: string;
  pickupLocation?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  dropoffLocation?: {
    address: string;
    coordinates: { latitude: number; longitude: number };
  };
  scheduledTime?: string;
  notes?: string;
  items?: string[];
}

export interface PriceEstimate {
  serviceId: string;
  estimatedPrice: number;
  breakdown?: {
    basePrice: number;
    distance?: number;
    distanceFee?: number;
    serviceFee?: number;
    tax?: number;
  };
  currency: string;
}

// ==================== MOCK DATA ====================

const MOCK_SERVICES: ServiceItem[] = [
  {
    id: 'service_delivery_1',
    name: 'Package Delivery',
    description: 'Send packages, documents, and parcels across the city',
    category: 'delivery',
    status: 'active',
    icon: 'cube-outline',
    basePrice: 500,
    priceUnit: 'per delivery',
    estimatedDuration: '30-60 mins',
    features: ['Same-day delivery', 'Real-time tracking', 'Proof of delivery'],
    isPopular: true,
  },
  {
    id: 'service_delivery_2',
    name: 'Food Delivery',
    description: 'Get your favorite meals delivered from restaurants',
    category: 'delivery',
    status: 'active',
    icon: 'restaurant-outline',
    basePrice: 300,
    priceUnit: 'per order',
    estimatedDuration: '20-40 mins',
    features: ['Hot meals', 'Multiple restaurants', 'Order tracking'],
    isPopular: true,
  },
  {
    id: 'service_errands_1',
    name: 'Personal Errands',
    description: 'We run errands so you don\'t have to',
    category: 'errands',
    status: 'active',
    icon: 'checkmark-done-outline',
    basePrice: 1000,
    priceUnit: 'per hour',
    estimatedDuration: 'Varies',
    features: ['Bank visits', 'Bill payments', 'Document submission', 'Shopping'],
  },
  {
    id: 'service_shopping_1',
    name: 'Grocery Shopping',
    description: 'We shop for your groceries and deliver to your door',
    category: 'shopping',
    status: 'active',
    icon: 'cart-outline',
    basePrice: 500,
    priceUnit: 'per trip',
    estimatedDuration: '1-2 hours',
    features: ['Fresh produce', 'Shopping list support', 'Quality guarantee'],
  },
  {
    id: 'service_courier_1',
    name: 'Express Courier',
    description: 'Urgent same-day delivery for important items',
    category: 'courier',
    status: 'active',
    icon: 'flash-outline',
    basePrice: 1500,
    priceUnit: 'per delivery',
    estimatedDuration: '15-30 mins',
    features: ['Priority handling', 'Direct delivery', 'Live tracking', 'Insurance'],
    isPopular: false,
  },
  {
    id: 'service_moving_1',
    name: 'Home Moving',
    description: 'Professional moving services for your relocation needs',
    category: 'moving',
    status: 'coming_soon',
    icon: 'home-outline',
    comingSoonDate: '2025-11-01',
    features: ['Professional movers', 'Packing materials', 'Insurance coverage'],
  },
  {
    id: 'service_logistics_1',
    name: 'Business Logistics',
    description: 'Bulk delivery and logistics solutions for businesses',
    category: 'logistics',
    status: 'coming_soon',
    icon: 'business-outline',
    comingSoonDate: '2025-12-01',
    features: ['Bulk deliveries', 'Scheduled pickups', 'Business accounts'],
  },
];

const MOCK_BOOKINGS: ServiceBooking[] = [
  {
    id: 'booking_1',
    serviceId: 'service_delivery_1',
    serviceName: 'Package Delivery',
    category: 'delivery',
    pickupLocation: {
      address: 'Osu Oxford Street, Accra',
      coordinates: { latitude: 5.5558, longitude: -0.1828 },
    },
    dropoffLocation: {
      address: 'Legon Campus, Accra',
      coordinates: { latitude: 5.6519, longitude: -0.1873 },
    },
    notes: 'Please handle with care - fragile items',
    estimatedPrice: 25,
    finalPrice: 25,
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 82800000).toISOString(),
  },
  {
    id: 'booking_2',
    serviceId: 'service_shopping_1',
    serviceName: 'Grocery Shopping',
    category: 'shopping',
    pickupLocation: {
      address: 'Accra Mall, Tetteh Quarshie',
      coordinates: { latitude: 5.6486, longitude: -0.1746 },
    },
    dropoffLocation: {
      address: 'Ridge, Accra',
      coordinates: { latitude: 5.5560, longitude: -0.1969 },
    },
    items: ['Rice - 5kg', 'Tomatoes', 'Onions', 'Chicken', 'Milk'],
    notes: 'Please call when you arrive',
    estimatedPrice: 2500,
    status: 'in_progress',
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
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
 * Get all available services
 */
export const getAllServices = async (
  category?: ServiceCategory,
  includeComingSoon: boolean = true
): Promise<ServiceItem[]> => {
  await simulateDelay(800);

  let services = [...MOCK_SERVICES];

  if (!includeComingSoon) {
    services = services.filter(s => s.status !== 'coming_soon');
  }

  if (category) {
    services = services.filter(s => s.category === category);
  }

  return services;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/services', {
    params: { category, includeComingSoon }
  });
  return response.data;
  */
};

/**
 * Get service by ID
 */
export const getServiceById = async (serviceId: string): Promise<ServiceItem> => {
  await simulateDelay(500);

  const service = MOCK_SERVICES.find(s => s.id === serviceId);

  if (!service) {
    throw new Error('Service not found');
  }

  return service;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/services/${serviceId}`);
  return response.data;
  */
};

/**
 * Get popular services
 */
export const getPopularServices = async (): Promise<ServiceItem[]> => {
  await simulateDelay(500);

  const popular = MOCK_SERVICES.filter(s => s.isPopular && s.status === 'active');
  return popular;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/services/popular');
  return response.data;
  */
};

/**
 * Get services by category
 */
export const getServicesByCategory = async (category: ServiceCategory): Promise<ServiceItem[]> => {
  await simulateDelay(500);

  const services = MOCK_SERVICES.filter(
    s => s.category === category && s.status === 'active'
  );

  return services;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/services/category/${category}`);
  return response.data;
  */
};

/**
 * Get price estimate for a service
 */
export const getServicePriceEstimate = async (
  serviceId: string,
  pickupLocation?: { latitude: number; longitude: number },
  dropoffLocation?: { latitude: number; longitude: number }
): Promise<PriceEstimate> => {
  await simulateDelay(1000);

  const service = MOCK_SERVICES.find(s => s.id === serviceId);

  if (!service) {
    throw new Error('Service not found');
  }

  // Mock price calculation
  let basePrice = service.basePrice || 500;
  let distance = 0;
  let distanceFee = 0;

  if (pickupLocation && dropoffLocation) {
    // Simple distance calculation (Haversine formula approximation)
    const R = 6371; // Earth's radius in km
    const dLat = ((dropoffLocation.latitude - pickupLocation.latitude) * Math.PI) / 180;
    const dLon = ((dropoffLocation.longitude - pickupLocation.longitude) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((pickupLocation.latitude * Math.PI) / 180) *
        Math.cos((dropoffLocation.latitude * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distance = R * c;
    distanceFee = distance * 100; // GH¢100 per km
  }

  const serviceFee = basePrice * 0.1; // 10% service fee
  const tax = (basePrice + distanceFee + serviceFee) * 0.05; // 5% tax
  const estimatedPrice = Math.round(basePrice + distanceFee + serviceFee + tax);

  return {
    serviceId,
    estimatedPrice,
    breakdown: {
      basePrice,
      distance: Math.round(distance * 10) / 10,
      distanceFee: Math.round(distanceFee),
      serviceFee: Math.round(serviceFee),
      tax: Math.round(tax),
    },
    currency: 'GHS',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/services/estimate', {
    serviceId,
    pickupLocation,
    dropoffLocation
  });
  return response.data;
  */
};

/**
 * Book a service
 */
export const bookService = async (request: ServiceRequest): Promise<ServiceBooking> => {
  await simulateDelay(1500);

  const service = MOCK_SERVICES.find(s => s.id === request.serviceId);

  if (!service) {
    throw new Error('Service not found');
  }

  if (service.status !== 'active') {
    throw new Error('Service is not currently available');
  }

  // Get price estimate
  const estimate = await getServicePriceEstimate(
    request.serviceId,
    request.pickupLocation?.coordinates,
    request.dropoffLocation?.coordinates
  );

  const booking: ServiceBooking = {
    id: `booking_${Date.now()}`,
    serviceId: request.serviceId,
    serviceName: service.name,
    category: service.category,
    pickupLocation: request.pickupLocation,
    dropoffLocation: request.dropoffLocation,
    scheduledTime: request.scheduledTime,
    notes: request.notes,
    items: request.items,
    estimatedPrice: estimate.estimatedPrice,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return booking;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/services/book', request);
  return response.data;
  */
};

/**
 * Get user's service bookings
 */
export const getServiceBookings = async (
  status?: ServiceBooking['status'],
  limit: number = 50
): Promise<ServiceBooking[]> => {
  await simulateDelay(800);

  let bookings = [...MOCK_BOOKINGS];

  if (status) {
    bookings = bookings.filter(b => b.status === status);
  }

  return bookings.slice(0, limit);

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/services/bookings', {
    params: { status, limit }
  });
  return response.data;
  */
};

/**
 * Get booking details
 */
export const getBookingDetails = async (bookingId: string): Promise<ServiceBooking> => {
  await simulateDelay(500);

  const booking = MOCK_BOOKINGS.find(b => b.id === bookingId);

  if (!booking) {
    throw new Error('Booking not found');
  }

  return booking;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/services/bookings/${bookingId}`);
  return response.data;
  */
};

/**
 * Cancel a service booking
 */
export const cancelServiceBooking = async (
  bookingId: string,
  reason: string
): Promise<void> => {
  await simulateDelay(1000);

  console.log(`Booking ${bookingId} cancelled. Reason: ${reason}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/services/bookings/${bookingId}/cancel`, { reason });
  */
};

/**
 * Rate a completed service
 */
export const rateService = async (
  bookingId: string,
  rating: number,
  comment?: string
): Promise<void> => {
  await simulateDelay(800);

  if (rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5');
  }

  console.log(`Booking ${bookingId} rated: ${rating} stars`);
  if (comment) {
    console.log(`Comment: ${comment}`);
  }

  // TODO: Replace with actual API call
  /*
  await api.post(`/services/bookings/${bookingId}/rate`, {
    rating,
    comment
  });
  */
};

/**
 * Search services
 */
export const searchServices = async (query: string): Promise<ServiceItem[]> => {
  await simulateDelay(600);

  const lowercaseQuery = query.toLowerCase();
  const results = MOCK_SERVICES.filter(
    s =>
      s.name.toLowerCase().includes(lowercaseQuery) ||
      s.description.toLowerCase().includes(lowercaseQuery) ||
      s.category.toLowerCase().includes(lowercaseQuery)
  );

  return results;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/services/search', {
    params: { query }
  });
  return response.data;
  */
};

// ==================== EXPORT ====================

export const ServicesCatalogService = {
  getAllServices,
  getServiceById,
  getPopularServices,
  getServicesByCategory,
  getServicePriceEstimate,
  bookService,
  getServiceBookings,
  getBookingDetails,
  cancelServiceBooking,
  rateService,
  searchServices,
};
