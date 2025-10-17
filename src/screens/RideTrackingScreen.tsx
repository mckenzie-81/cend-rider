import { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, PrimaryButton, LoadingSpinner } from '../components';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Ride tracking states
type RideState = 'searching' | 'driver-found' | 'driver-arriving' | 'driver-arrived' | 'in-transit' | 'completed';

interface RideTrackingScreenProps {
  onBack: () => void;
  onComplete?: () => void;
  pickup: string;
  dropoff: string;
  vehicleType: string;
  estimatedPrice: string;
}

// Mock driver data
const MOCK_DRIVER = {
  name: 'Kwame Mensah',
  rating: 4.8,
  totalTrips: 342,
  vehicleModel: 'Toyota Corolla',
  vehiclePlate: 'GN 2341-23',
  vehicleColor: 'Silver',
  phone: '+233 24 123 4567',
  photo: null, // Can add driver photo later
};

export function RideTrackingScreen({
  onBack,
  onComplete,
  pickup,
  dropoff,
  vehicleType,
  estimatedPrice,
}: RideTrackingScreenProps) {
  const [rideState, setRideState] = useState<RideState>('searching');
  const [driverETA, setDriverETA] = useState(5);

  // Simulate ride state progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Searching → Driver Found (7 seconds)
    if (rideState === 'searching') {
      timers.push(setTimeout(() => {
        setRideState('driver-found');
      }, 7000));
    }

    // Driver Found → Driver Arriving (7 seconds to show driver info)
    if (rideState === 'driver-found') {
      timers.push(setTimeout(() => {
        setRideState('driver-arriving');
      }, 7000));
    }

    // Driver Arriving → Update ETA countdown
    if (rideState === 'driver-arriving') {
      const interval = setInterval(() => {
        setDriverETA((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setRideState('driver-arrived');
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Update every second for demo (use 60000 for real minutes)
      timers.push(interval);
    }

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [rideState]);

  const handleCancel = () => {
    // TODO: Show cancellation confirmation
    console.log('Cancelling ride...');
    onBack();
  };

  const handleCall = () => {
    console.log('Calling driver:', MOCK_DRIVER.phone);
    // TODO: Implement phone call
  };

  const handleMessage = () => {
    console.log('Messaging driver');
    // TODO: Implement messaging
  };

  const renderContent = () => {
    switch (rideState) {
      case 'searching':
        return (
          <View style={styles.stateContainer}>
            <LoadingSpinner size="large" />
            <Text variant="headlineSmall" style={styles.stateTitle}>
              Finding you a driver...
            </Text>
            <Text variant="bodyMedium" style={styles.stateSubtitle}>
              This usually takes less than a minute
            </Text>

            {/* Trip Details */}
            <View style={styles.tripDetailsCard}>
              <View style={styles.tripDetailRow}>
                <Ionicons name="ellipse" size={12} color="#8020A2" />
                <Text variant="bodyMedium" style={styles.tripDetailText} numberOfLines={1}>
                  {pickup}
                </Text>
              </View>
              <View style={styles.tripDetailRow}>
                <Ionicons name="location" size={12} color="#FF6B6B" />
                <Text variant="bodyMedium" style={styles.tripDetailText} numberOfLines={1}>
                  {dropoff}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.tripMetaRow}>
                <Text variant="bodySmall" style={styles.tripMetaText}>
                  {vehicleType}
                </Text>
                <Text variant="bodySmall" style={styles.tripMetaPrice}>
                  {estimatedPrice}
                </Text>
              </View>
            </View>
          </View>
        );

      case 'driver-found':
        return (
          <View style={styles.stateContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={64} color="#4CAF50" />
            </View>
            <Text variant="headlineSmall" style={styles.stateTitle}>
              Driver Found!
            </Text>
            <Text variant="bodyMedium" style={styles.stateSubtitle}>
              {MOCK_DRIVER.name} is on the way
            </Text>
          </View>
        );

      case 'driver-arriving':
      case 'driver-arrived':
        const isArrived = rideState === 'driver-arrived';
        return (
          <View style={styles.contentFull}>
            {/* Driver Info Card */}
            <View style={styles.driverCard}>
              <View style={styles.driverHeader}>
                <View style={styles.driverAvatar}>
                  <Ionicons name="person" size={32} color="#8020A2" />
                </View>
                <View style={styles.driverInfo}>
                  <Text variant="titleMedium" style={styles.driverName}>
                    {MOCK_DRIVER.name}
                  </Text>
                  <View style={styles.driverMeta}>
                    <Ionicons name="star" size={14} color="#FFB800" />
                    <Text variant="bodySmall" style={styles.driverRating}>
                      {MOCK_DRIVER.rating} • {MOCK_DRIVER.totalTrips} trips
                    </Text>
                  </View>
                </View>
                <View style={styles.driverActions}>
                  <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
                    <Ionicons name="call" size={20} color="#8020A2" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton} onPress={handleMessage}>
                    <Ionicons name="chatbubble" size={20} color="#8020A2" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Vehicle Info */}
              <View style={styles.vehicleInfo}>
                <View style={styles.vehicleDetail}>
                  <Ionicons name="car" size={16} color="#666" />
                  <Text variant="bodySmall" style={styles.vehicleText}>
                    {MOCK_DRIVER.vehicleModel}
                  </Text>
                </View>
                <View style={styles.vehicleDetail}>
                  <Ionicons name="card" size={16} color="#666" />
                  <Text variant="bodySmall" style={styles.vehicleText}>
                    {MOCK_DRIVER.vehiclePlate}
                  </Text>
                </View>
                <View style={styles.vehicleDetail}>
                  <View style={[styles.colorDot, { backgroundColor: '#C0C0C0' }]} />
                  <Text variant="bodySmall" style={styles.vehicleText}>
                    {MOCK_DRIVER.vehicleColor}
                  </Text>
                </View>
              </View>
            </View>

            {/* ETA Card */}
            <View style={[styles.etaCard, isArrived && styles.arrivedCard]}>
              {isArrived ? (
                <>
                  <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
                  <Text variant="titleLarge" style={styles.arrivedText}>
                    Driver has arrived!
                  </Text>
                  <Text variant="bodyMedium" style={styles.arrivedSubtext}>
                    Your driver is waiting for you
                  </Text>
                </>
              ) : (
                <>
                  <Text variant="displaySmall" style={styles.etaTime}>
                    {driverETA} min
                  </Text>
                  <Text variant="bodyMedium" style={styles.etaText}>
                    Driver is arriving
                  </Text>
                </>
              )}
            </View>

            {/* Trip Route */}
            <View style={styles.tripRoute}>
              <View style={styles.routeRow}>
                <Ionicons name="ellipse" size={12} color="#8020A2" />
                <Text variant="bodyMedium" style={styles.routeText} numberOfLines={1}>
                  {pickup}
                </Text>
              </View>
              <View style={styles.routeLine} />
              <View style={styles.routeRow}>
                <Ionicons name="location" size={12} color="#FF6B6B" />
                <Text variant="bodyMedium" style={styles.routeText} numberOfLines={1}>
                  {dropoff}
                </Text>
              </View>
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScreenContainer safe={false} padding={0}>
      <View style={styles.container}>
        {/* Full Screen Map Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapPlaceholder}>Map View</Text>
          
          {/* Back Button */}
          <TouchableOpacity onPress={onBack} style={styles.floatingBackButton}>
            <Ionicons name="arrow-back" size={24} color="#1C1B1F" />
          </TouchableOpacity>
        </View>

        {/* Bottom Content Card */}
        <View style={styles.bottomCard}>
          {renderContent()}

          {/* Cancel Button */}
          {rideState !== 'completed' && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text variant="labelLarge" style={styles.cancelButtonText}>
                Cancel Ride
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    fontSize: 18,
    color: '#999',
    fontWeight: '600',
  },
  floatingBackButton: {
    position: 'absolute',
    top: 60,
    left: 16,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  bottomCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 32,
    minHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  stateContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  contentFull: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: 16,
  },
  stateTitle: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  stateSubtitle: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  tripDetailsCard: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  tripDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  tripDetailText: {
    flex: 1,
    color: '#1C1B1F',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 12,
  },
  tripMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripMetaText: {
    color: '#666',
  },
  tripMetaPrice: {
    color: '#8020A2',
    fontWeight: '700',
  },
  driverCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  driverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8D9F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginBottom: 4,
  },
  driverMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverRating: {
    color: '#666',
  },
  driverActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  vehicleInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  vehicleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  vehicleText: {
    color: '#666',
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  etaCard: {
    backgroundColor: '#E8D9F0',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  arrivedCard: {
    backgroundColor: '#E8F5E9',
  },
  etaTime: {
    color: '#8020A2',
    fontWeight: '700',
    marginBottom: 4,
  },
  etaText: {
    color: '#666',
  },
  arrivedText: {
    color: '#4CAF50',
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  arrivedSubtext: {
    color: '#666',
  },
  tripRoute: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
  },
  routeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
    marginVertical: 4,
  },
  routeText: {
    flex: 1,
    color: '#1C1B1F',
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFE5E5',
  },
  cancelButtonText: {
    color: '#D32F2F',
    fontWeight: '600',
  },
});
