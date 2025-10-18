/**
 * Ride Tracking Service
 * Handles real-time ride tracking, driver location updates, and ride status
 * Used by: RideTrackingScreen
 */

import { Location } from './location.service';

// ==================== TYPES ====================

export type RideState = 'searching' | 'driver-found' | 'driver-arriving' | 'driver-arrived' | 'in-transit' | 'completed';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  totalRides: number;
  profileImage?: string;
  vehicle: {
    make: string;
    model: string;
    color: string;
    plate: string;
    year?: number;
  };
  currentLocation?: Location;
}

export interface RideStatus {
  rideId: string;
  state: RideState;
  driver?: Driver;
  estimatedArrival?: number; // minutes
  distanceToPickup?: number; // km
  distanceToDropoff?: number; // km
  updatedAt: string;
}

// ==================== MOCK DATA ====================

const MOCK_DRIVER: Driver = {
  id: 'driver_12345',
  name: 'Yaw Boateng',
  phone: '+233244789012',
  rating: 4.8,
  totalRides: 120,
  profileImage: undefined,
  vehicle: {
    make: 'Toyota',
    model: 'Camry',
    color: 'Silver',
    plate: 'GR 4567-21',
    year: 2020,
  },
  currentLocation: {
    latitude: 5.6037,
    longitude: -0.1870,
  },
};

// ==================== SERVICE FUNCTIONS ====================

/**
 * Simulate network delay
 */
const simulateDelay = (ms: number = 1000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Find a driver for the ride
 */
export const findDriver = async (
  pickup: Location,
  dropoff: Location,
  vehicleType: string
): Promise<Driver> => {
  await simulateDelay(3000); // Simulate searching time

  // Mock driver assignment
  return MOCK_DRIVER;

  // TODO: Replace with actual API call
  /*
  const response = await api.post('/rides/find-driver', {
    pickup,
    dropoff,
    vehicleType,
  });
  return response.data;
  */
};

/**
 * Confirm driver acceptance
 */
export const confirmDriver = async (rideId: string): Promise<{ confirmed: boolean; eta: number }> => {
  await simulateDelay(2000);

  return {
    confirmed: true,
    eta: 5, // 5 minutes
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post(`/rides/${rideId}/confirm-driver`);
  return response.data;
  */
};

/**
 * Get driver's current location (for real-time tracking)
 */
export const getDriverLocation = async (driverId: string): Promise<Location> => {
  await simulateDelay(500);

  // Mock location update (simulate movement)
  const baseLocation = MOCK_DRIVER.currentLocation || { latitude: 6.5200, longitude: 3.3750 };
  
  return {
    latitude: baseLocation.latitude + (Math.random() * 0.001 - 0.0005),
    longitude: baseLocation.longitude + (Math.random() * 0.001 - 0.0005),
  };

  // TODO: Replace with actual API call or WebSocket connection
  /*
  const response = await api.get(`/drivers/${driverId}/location`);
  return response.data;
  */
};

/**
 * Get driver details
 */
export const getDriverDetails = async (driverId: string): Promise<Driver> => {
  await simulateDelay(500);

  return MOCK_DRIVER;

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/drivers/${driverId}`);
  return response.data;
  */
};

/**
 * Get current ride status
 */
export const getRideStatus = async (rideId: string): Promise<RideStatus> => {
  await simulateDelay(500);

  return {
    rideId,
    state: 'driver-arriving',
    driver: MOCK_DRIVER,
    estimatedArrival: 5,
    distanceToPickup: 2.5,
    updatedAt: new Date().toISOString(),
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.get(`/rides/${rideId}/status`);
  return response.data;
  */
};

/**
 * Cancel an active ride
 */
export const cancelRide = async (rideId: string, reason?: string): Promise<void> => {
  await simulateDelay(1000);

  console.log(`Ride ${rideId} cancelled. Reason: ${reason || 'No reason'}`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/rides/${rideId}/cancel`, { reason });
  */
};

/**
 * Contact driver (initiate call)
 */
export const contactDriver = async (driverId: string): Promise<{ phoneNumber: string }> => {
  await simulateDelay(500);

  return {
    phoneNumber: MOCK_DRIVER.phone,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post(`/drivers/${driverId}/contact`);
  return response.data;
  */
};

/**
 * Send message to driver
 */
export const messageDriver = async (
  driverId: string,
  message: string
): Promise<{ sent: boolean; timestamp: string }> => {
  await simulateDelay(800);

  return {
    sent: true,
    timestamp: new Date().toISOString(),
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post(`/drivers/${driverId}/message`, { message });
  return response.data;
  */
};

/**
 * Start trip (when passenger is picked up)
 */
export const startTrip = async (rideId: string): Promise<void> => {
  await simulateDelay(500);

  console.log(`Trip ${rideId} started`);

  // TODO: Replace with actual API call
  /*
  await api.post(`/rides/${rideId}/start`);
  */
};

/**
 * Complete trip (when passenger is dropped off)
 */
export const completeTrip = async (rideId: string): Promise<{
  completed: boolean;
  finalPrice: number;
  distance: number;
  duration: number;
}> => {
  await simulateDelay(1000);

  return {
    completed: true,
    finalPrice: 2500,
    distance: 8.5,
    duration: 25,
  };

  // TODO: Replace with actual API call
  /*
  const response = await api.post(`/rides/${rideId}/complete`);
  return response.data;
  */
};

/**
 * Subscribe to real-time ride updates (WebSocket simulation)
 */
export const subscribeToRideUpdates = (
  rideId: string,
  onUpdate: (status: RideStatus) => void
): (() => void) => {
  // Mock real-time updates with polling
  const interval = setInterval(async () => {
    try {
      const status = await getRideStatus(rideId);
      onUpdate(status);
    } catch (error) {
      console.error('Error fetching ride status:', error);
    }
  }, 5000); // Update every 5 seconds

  // Return cleanup function
  return () => clearInterval(interval);

  // TODO: Replace with actual WebSocket connection
  /*
  const socket = io.connect(WEBSOCKET_URL);
  
  socket.on('connect', () => {
    socket.emit('subscribe_ride', rideId);
  });

  socket.on('ride_update', (data) => {
    onUpdate(data);
  });

  return () => {
    socket.emit('unsubscribe_ride', rideId);
    socket.disconnect();
  };
  */
};

// ==================== EXPORT ====================

export const RideTrackingService = {
  findDriver,
  confirmDriver,
  getDriverLocation,
  getDriverDetails,
  getRideStatus,
  cancelRide,
  contactDriver,
  messageDriver,
  startTrip,
  completeTrip,
  subscribeToRideUpdates,
};
