# Location Tracking Guide

## Overview

This guide explains how to use the location tracking features in the Cend Rider app for both **user location** and **driver location** tracking.

## Setup

### 1. Install Dependencies

```bash
npx expo install expo-location
```

### 2. Permissions

Location permissions are already configured in `app.json`:
- **iOS**: `NSLocationWhenInUseUsageDescription` and `NSLocationAlwaysAndWhenInUseUsageDescription`
- **Android**: `ACCESS_FINE_LOCATION`, `ACCESS_COARSE_LOCATION`, `ACCESS_BACKGROUND_LOCATION`

## User Location Tracking

### Get Current Location (One-time)

```typescript
import { LocationService } from '../services/location.service';

// Get user's current location
const location = await LocationService.getCurrentLocation();
console.log('User location:', location);
// Output: { latitude: 5.6037, longitude: -0.1870 }
```

### Watch User Location (Real-time)

```typescript
import { useEffect, useState } from 'react';
import { LocationService, Location } from '../services/location.service';

function MyComponent() {
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    let subscription: { remove: () => void } | null = null;

    const startWatching = async () => {
      // Start watching user location
      subscription = await LocationService.watchLocation(
        (location) => {
          console.log('User location updated:', location);
          setUserLocation(location);
        },
        {
          accuracy: ExpoLocation.Accuracy.High,
          distanceInterval: 10, // Update every 10 meters
          timeInterval: 5000, // Update every 5 seconds
        }
      );
    };

    startWatching();

    // Cleanup on unmount
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View>
      <Text>Current Location:</Text>
      <Text>Lat: {userLocation?.latitude}</Text>
      <Text>Lng: {userLocation?.longitude}</Text>
    </View>
  );
}
```

### Request Location Permission

```typescript
import { LocationService } from '../services/location.service';

// Check if location is enabled
const isEnabled = await LocationService.isLocationEnabled();

if (!isEnabled) {
  Alert.alert(
    'Location Services Disabled',
    'Please enable location services to use this feature.'
  );
  return;
}

// Request permission
const hasPermission = await LocationService.requestLocationPermission();

if (!hasPermission) {
  Alert.alert(
    'Permission Denied',
    'Location permission is required to provide ride services.'
  );
  return;
}
```

## Driver Location Tracking

### Get Driver Location (One-time)

```typescript
import { RideTrackingService } from '../services/rideTracking.service';

const driverLocation = await RideTrackingService.getDriverLocation('driver_123');
console.log('Driver location:', driverLocation);
```

### Watch Driver Location (Real-time)

```typescript
import { useEffect, useState } from 'react';
import { RideTrackingService } from '../services/rideTracking.service';
import { Location } from '../services/location.service';

function RideTrackingScreen() {
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const driverId = 'driver_123'; // Get from ride data

  useEffect(() => {
    // Start watching driver location
    const stopWatching = RideTrackingService.watchDriverLocation(
      driverId,
      (location) => {
        console.log('Driver location updated:', location);
        setDriverLocation(location);
      },
      5000 // Update every 5 seconds
    );

    // Cleanup on unmount
    return () => {
      stopWatching();
    };
  }, [driverId]);

  return (
    <View>
      <Text>Driver Location:</Text>
      <Text>Lat: {driverLocation?.latitude}</Text>
      <Text>Lng: {driverLocation?.longitude}</Text>
    </View>
  );
}
```

## Complete Example: Live Tracking Screen

```typescript
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { LocationService, Location } from '../services/location.service';
import { RideTrackingService } from '../services/rideTracking.service';

export function LiveTrackingScreen({ rideId, driverId }) {
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [driverLocation, setDriverLocation] = useState<Location | null>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    // Check permissions first
    const checkPermissions = async () => {
      const isEnabled = await LocationService.isLocationEnabled();
      if (!isEnabled) {
        Alert.alert('Location Disabled', 'Please enable location services.');
        return;
      }

      const hasPermission = await LocationService.requestLocationPermission();
      if (!hasPermission) {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }
    };

    checkPermissions();
  }, []);

  useEffect(() => {
    let userSubscription: { remove: () => void } | null = null;

    // Watch user location
    const startUserTracking = async () => {
      userSubscription = await LocationService.watchLocation(
        (location) => {
          setUserLocation(location);
        },
        {
          distanceInterval: 10,
          timeInterval: 5000,
        }
      );
    };

    startUserTracking();

    return () => {
      if (userSubscription) {
        userSubscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Watch driver location
    const stopDriverTracking = RideTrackingService.watchDriverLocation(
      driverId,
      (location) => {
        setDriverLocation(location);
      },
      5000
    );

    return () => {
      stopDriverTracking();
    };
  }, [driverId]);

  useEffect(() => {
    // Calculate distance between user and driver
    if (userLocation && driverLocation) {
      const dist = LocationService.calculateDistance(userLocation, driverLocation);
      setDistance(dist);
    }
  }, [userLocation, driverLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Tracking</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Your Location:</Text>
        <Text>Lat: {userLocation?.latitude.toFixed(6) || 'Loading...'}</Text>
        <Text>Lng: {userLocation?.longitude.toFixed(6) || 'Loading...'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Driver Location:</Text>
        <Text>Lat: {driverLocation?.latitude.toFixed(6) || 'Loading...'}</Text>
        <Text>Lng: {driverLocation?.longitude.toFixed(6) || 'Loading...'}</Text>
      </View>

      {distance && (
        <View style={styles.section}>
          <Text style={styles.label}>Distance to Driver:</Text>
          <Text style={styles.distance}>{distance.toFixed(2)} km</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
    fontSize: 16,
  },
  distance: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8020A2',
  },
});
```

## Features

### LocationService Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getCurrentLocation()` | Get user's current location once | `Promise<Location>` |
| `watchLocation(callback, options)` | Watch user location in real-time | `Promise<Subscription>` |
| `isLocationEnabled()` | Check if location services are enabled | `Promise<boolean>` |
| `requestLocationPermission()` | Request location permission | `Promise<boolean>` |
| `calculateDistance(from, to)` | Calculate distance between two points | `number` (km) |
| `calculateTravelTime(distance, mode)` | Estimate travel time | `number` (minutes) |

### RideTrackingService Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `getDriverLocation(driverId)` | Get driver's location once | `Promise<Location>` |
| `watchDriverLocation(driverId, callback, interval)` | Watch driver location in real-time | `() => void` (cleanup) |

## Error Handling

```typescript
try {
  const location = await LocationService.getCurrentLocation();
  console.log('Location:', location);
} catch (error) {
  if (error.message.includes('permission')) {
    Alert.alert('Permission Required', 'Please grant location permission.');
  } else {
    Alert.alert('Error', 'Unable to get location. Please try again.');
  }
}
```

## Best Practices

1. **Always request permission** before accessing location
2. **Check if location is enabled** on the device
3. **Clean up subscriptions** in `useEffect` cleanup
4. **Handle errors gracefully** with user-friendly messages
5. **Use appropriate accuracy** settings based on your needs:
   - `Accuracy.Low` - City-level (battery friendly)
   - `Accuracy.Balanced` - Block-level
   - `Accuracy.High` - Precise (uses more battery)
   - `Accuracy.Highest` - Most precise (GPS only)

6. **Update intervals**: Balance between accuracy and battery:
   - Pickup/Dropoff: Every 10-30 seconds
   - Active ride: Every 5-10 seconds
   - Background: Every 30-60 seconds

## Integration with Backend (TODO)

When integrating with a real backend:

1. **Replace mock data** in `location.service.ts` and `rideTracking.service.ts`
2. **Use WebSocket** for real-time driver location updates instead of polling
3. **Send user location** to backend for matching and tracking
4. **Implement location history** for analytics and support

```typescript
// Example WebSocket integration
import io from 'socket.io-client';

const socket = io('https://api.cend.com');

socket.on('connect', () => {
  socket.emit('track-ride', { rideId: '123' });
});

socket.on('driver-location', (location) => {
  setDriverLocation(location);
});
```

## Testing

**Simulator Testing:**
- iOS Simulator: Features > Location > Custom Location
- Android Emulator: Extended Controls > Location

**Real Device Testing:**
- Test in various locations (indoor/outdoor)
- Test with poor GPS signal
- Test with location services disabled
- Test permission denial flow
