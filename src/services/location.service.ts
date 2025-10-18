/**
 * Location Service
 * Handles location-based operations: geocoding, places search, coordinates
 * Used by: TransportScreen, HomeScreen, RideTrackingScreen
 */

// ==================== TYPES ====================

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  location: Location;
  type?: 'home' | 'work' | 'recent' | 'search';
}

export interface GeocodeResult {
  address: string;
  location: Location;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// ==================== MOCK DATA ====================

const MOCK_PLACES: Place[] = [
  {
    id: 'place_1',
    name: 'Home',
    address: 'Ring Road Central, Accra',
    location: { latitude: 5.6037, longitude: -0.1870 },
    type: 'home',
  },
  {
    id: 'place_2',
    name: 'Office',
    address: 'Independence Avenue, Ridge, Accra',
    location: { latitude: 5.5560, longitude: -0.1969 },
    type: 'work',
  },
  {
    id: 'place_3',
    name: 'Accra Mall',
    address: 'Tetteh Quarshie Interchange, Accra',
    location: { latitude: 5.6486, longitude: -0.1746 },
    type: 'recent',
  },
  {
    id: 'place_4',
    name: 'Kotoka International Airport',
    address: 'Airport Road, Accra',
    location: { latitude: 5.6052, longitude: -0.1668 },
    type: 'recent',
  },
  {
    id: 'place_5',
    name: 'Osu Oxford Street',
    address: 'Oxford Street, Osu, Accra',
    location: { latitude: 5.5558, longitude: -0.1828 },
    type: 'search',
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
 * Search for places by query string
 */
export const searchPlaces = async (query: string): Promise<Place[]> => {
  await simulateDelay(800);

  if (!query || query.trim().length === 0) {
    return [];
  }

  // Mock search - filter places by query
  const results = MOCK_PLACES.filter(place =>
    place.name.toLowerCase().includes(query.toLowerCase()) ||
    place.address.toLowerCase().includes(query.toLowerCase())
  );

  // Add some dynamic search results
  if (query.toLowerCase().includes('restaurant')) {
    results.push({
      id: 'dynamic_1',
      name: 'Azmera Restaurant',
      address: 'Labone, Accra',
      location: { latitude: 5.5679, longitude: -0.1781 },
      type: 'search',
    });
  }

  return results;

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/locations/search', {
    params: { query, limit: 10 }
  });
  return response.data;
  */
};

/**
 * Get user's current location
 */
export const getCurrentLocation = async (): Promise<Location> => {
  await simulateDelay(500);

  // Mock current location (Accra, Ghana)
  return {
    latitude: 5.6037,
    longitude: -0.1870,
  };

  // TODO: Replace with actual device location
  /*
  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });
  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
  */
};

/**
 * Reverse geocode coordinates to address
 */
export const reverseGeocode = async (location: Location): Promise<GeocodeResult> => {
  await simulateDelay(1000);

  // Mock reverse geocoding
  return {
    address: '123 Main Street, Lagos, Nigeria',
    location,
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
    postalCode: '100001',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/locations/reverse-geocode', location);
  return response.data;
  */
};

/**
 * Forward geocode address to coordinates
 */
export const geocode = async (address: string): Promise<GeocodeResult> => {
  await simulateDelay(1000);

  if (!address) {
    throw new Error('Address is required.');
  }

  // Mock geocoding
  return {
    address,
    location: { latitude: 6.5244, longitude: 3.3792 },
    city: 'Lagos',
    state: 'Lagos State',
    country: 'Nigeria',
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/locations/geocode', { address });
  return response.data;
  */
};

/**
 * Get saved/favorite places for user
 */
export const getSavedPlaces = async (): Promise<Place[]> => {
  await simulateDelay(500);

  // Return home and work places
  return MOCK_PLACES.filter(place => place.type === 'home' || place.type === 'work');

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/saved-places');
  return response.data;
  */
};

/**
 * Get recent places for user
 */
export const getRecentPlaces = async (): Promise<Place[]> => {
  await simulateDelay(500);

  return MOCK_PLACES.filter(place => place.type === 'recent');

  // TODO: Replace with actual API call
  /*
  const response = await api.get('/user/recent-places');
  return response.data;
  */
};

/**
 * Save a place as favorite
 */
export const savePlace = async (place: Omit<Place, 'id' | 'type'>): Promise<Place> => {
  await simulateDelay(800);

  const savedPlace: Place = {
    ...place,
    id: `place_${Date.now()}`,
    type: 'home', // or 'work' based on input
  };

  return savedPlace;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/user/saved-places', place);
  return response.data;
  */
};

/**
 * Calculate distance between two locations (in kilometers)
 */
export const calculateDistance = (from: Location, to: Location): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((to.latitude - from.latitude) * Math.PI) / 180;
  const dLon = ((to.longitude - from.longitude) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.latitude * Math.PI) / 180) *
      Math.cos((to.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal
};

/**
 * Calculate estimated travel time (in minutes)
 */
export const calculateTravelTime = (distanceKm: number, mode: 'car' | 'bike' | 'walk' = 'car'): number => {
  // Average speeds (km/h)
  const speeds = {
    car: 40,
    bike: 25,
    walk: 5,
  };

  const hours = distanceKm / speeds[mode];
  return Math.ceil(hours * 60); // Convert to minutes and round up
};

// ==================== EXPORT ====================

export const LocationService = {
  searchPlaces,
  getCurrentLocation,
  reverseGeocode,
  geocode,
  getSavedPlaces,
  getRecentPlaces,
  savePlace,
  calculateDistance,
  calculateTravelTime,
};
