import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, AppHeader, TransportModeCard, RecentTripCard, RideBookingModal } from '../components';
import { RideService } from '../services/ride.service';
import { LocationService, Location } from '../services/location.service';
import type { Ride } from '../services/ride.service';

// Transport mode options
const TRANSPORT_MODES = [
  { id: 'ride', label: 'Ride', icon: 'car' as const },
  { id: 'okada', label: 'Okada', icon: 'okada' as const },
];

interface TransportScreenProps {
  onBack: () => void;
  initialMode?: 'ride' | 'okada';
  onConfirmLocations?: (pickup: string, dropoff: string) => void;
}

export function TransportScreen({ onBack, initialMode = 'ride', onConfirmLocations }: TransportScreenProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<'ride' | 'okada'>(initialMode);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [recentTrips, setRecentTrips] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
  
  useEffect(() => {
    loadRecentTrips();
    requestLocationAndGetCurrent();
  }, []);

  const requestLocationAndGetCurrent = async () => {
    try {
      // Check if location services are enabled
      const isEnabled = await LocationService.isLocationEnabled();
      if (!isEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services to see your current location and get accurate ride estimates.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Request permission
      const hasPermission = await LocationService.requestLocationPermission();
      setLocationPermissionGranted(hasPermission);

      if (!hasPermission) {
        Alert.alert(
          'Location Permission Required',
          'Cend needs your location to provide accurate pickup services and show nearby drivers.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Get current location
      const location = await LocationService.getCurrentLocation();
      setCurrentLocation(location);
      console.log('Current location:', location);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

  const loadRecentTrips = async () => {
    try {
      setLoading(true);
      const history = await RideService.getRideHistory(3); // Get last 3 trips
      setRecentTrips(history);
    } catch (error) {
      console.error('Failed to load recent trips:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleMapPress = () => {
    console.log('Map pressed');
  };

  const handleModeSelect = (mode: 'ride' | 'okada') => {
    setSelectedMode(mode);
    console.log('Selected mode:', mode);
  };

  const handleTripPress = (tripId: string) => {
    console.log('Trip pressed:', tripId);
  };

  const handleRideAgain = (trip: Ride) => {
    console.log('Ride again:', trip.id);
    // Pre-fill search with this trip's locations
    if (onConfirmLocations) {
      onConfirmLocations(trip.pickupLocation.address, trip.dropoffLocation.address);
    }
  };

  const handleSearchPress = () => {
    setShowBookingModal(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  return (
    <ScreenContainer safe={false} padding={0}>
      <View style={{ flex: 1 }}>
        <AppHeader 
          title="Transport"
          subtitle={`Wherever you're going, let's\nget you there!`}
          showBack
          onBackPress={onBack}
          gradientColors={['#8020A2', '#995FAF']}
          height={232}
            customActions={
              <TouchableOpacity 
                style={styles.mapButton}
                onPress={handleMapPress}
                activeOpacity={0.7}
              >
                <Ionicons name="map-outline" size={16} color="#8020A2" />
                <Text style={styles.mapText}>Map</Text>
              </TouchableOpacity>
            }
          >
            {/* Illustration image at the bottom of header */}
            <View style={styles.illustrationContainer}>
              <Image 
                source={require('../../assets/illustrations/transport-head.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </AppHeader>

          {/* Search Box - Overlapping header and content */}
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={styles.searchBox}
              onPress={handleSearchPress}
              activeOpacity={0.7}
            >
              <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
              <Text style={styles.searchPlaceholder}>where to?</Text>
            </TouchableOpacity>
            
            {/* Current Location Indicator */}
            {currentLocation && locationPermissionGranted && (
              <View style={styles.locationIndicator}>
                <Ionicons name="location" size={14} color="#8020A2" />
                <Text style={styles.locationText}>
                  Using current location: {currentLocation.latitude.toFixed(4)}, {currentLocation.longitude.toFixed(4)}
                </Text>
              </View>
            )}
          </View>

          <ScrollView 
            style={styles.container}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            showsVerticalScrollIndicator={false}
          >
            {/* Transport Mode Selection Cards */}
            <View style={styles.modesContainer}>
              {TRANSPORT_MODES.map((mode) => (
                <TransportModeCard
                  key={mode.id}
                  mode={mode.id}
                  label={mode.label}
                  icon={mode.icon}
                  isSelected={selectedMode === mode.id}
                  onPress={() => handleModeSelect(mode.id as 'ride' | 'okada')}
                />
              ))}
            </View>

            {/* Recent Trips Section */}
            <View style={styles.recentTripsSection}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Recent Trips
              </Text>
              
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={theme.colors.primary} />
                </View>
              ) : recentTrips.length === 0 ? (
                <View style={styles.emptyContainer}>
                  <Text variant="bodyMedium" style={styles.emptyText}>
                    No recent trips yet
                  </Text>
                </View>
              ) : (
                recentTrips.map((trip) => (
                  <RecentTripCard
                    key={trip.id}
                    pickup={trip.pickupLocation.address}
                    dropoff={trip.dropoffLocation.address}
                    date={formatDate(trip.createdAt)}
                    time={formatTime(trip.createdAt)}
                    price={`GH¢${trip.price.toLocaleString()}`}
                    onPress={() => handleTripPress(trip.id)}
                    onRideAgain={() => handleRideAgain(trip)}
                  />
                ))
              )}
            </View>
          </ScrollView>
      </View>

      {/* Ride Booking Modal */}
      <RideBookingModal
        visible={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        initialPickup="Current Location"
        selectedMode={selectedMode}
        onConfirm={(pickup, dropoff) => {
          if (onConfirmLocations) {
            onConfirmLocations(pickup, dropoff);
          }
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  modesContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  recentTripsSection: {
    marginTop: 32,
    paddingBottom: 24,
  },
  sectionTitle: {
    color: '#1C1B1F',
    fontWeight: '600',
    marginBottom: 16,
  },
  loadingContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
  },
  searchContainer: {
    position: 'absolute',
    top: 232 - 20,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  locationIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
    marginRight: 20,
  },
  mapText: {
    color: '#1C1B1F',
    fontSize: 14,
    fontWeight: '600',
  },
  illustrationContainer: {
    position: 'absolute',
    right: -24,
    bottom: -44,
    width: 220,
    height: 140,
    zIndex: 1,
  },
  illustration: {
    width: 240,
    height: 140,
  },
});
