import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import { ScreenContainer, PrimaryButton, LoadingSpinner } from '../components';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

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
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Cache car illustration image
  useEffect(() => {
    const cacheImage = async () => {
      try {
        await Asset.fromModule(require('../../assets/illustrations/car-on-map.png')).downloadAsync();
        setImageLoaded(true);
      } catch (error) {
        console.log('Error caching car image:', error);
        setImageLoaded(true); // Continue anyway
      }
    };
    cacheImage();
  }, []);
  
  // Ripple animation for searching state
  const rippleAnim1 = useRef(new Animated.Value(0)).current;
  const rippleAnim2 = useRef(new Animated.Value(0)).current;
  const rippleOpacity1 = useRef(new Animated.Value(1)).current;
  const rippleOpacity2 = useRef(new Animated.Value(1)).current;

  // Start ripple animation when in searching state
  useEffect(() => {
    if (rideState === 'searching') {
      const ripple1 = Animated.loop(
        Animated.parallel([
          Animated.timing(rippleAnim1, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity1, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );

      const ripple2 = Animated.loop(
        Animated.parallel([
          Animated.timing(rippleAnim2, {
            toValue: 1,
            duration: 2000,
            delay: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity2, {
            toValue: 0,
            duration: 2000,
            delay: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      ripple1.start();
      ripple2.start();

      return () => {
        ripple1.stop();
        ripple2.stop();
      };
    }
  }, [rideState]);

  // Simulate ride state progression
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Searching → Driver Found (15 seconds)
    if (rideState === 'searching') {
      timers.push(setTimeout(() => {
        setRideState('driver-found');
      }, 15000));
    }

    // Driver Found → Driver Arriving (15 seconds to show driver info)
    if (rideState === 'driver-found') {
      timers.push(setTimeout(() => {
        setRideState('driver-arriving');
      }, 15000));
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
          <View style={styles.searchingContentContainer}>
            <Text variant="titleLarge" style={styles.searchingTitle}>
              Searching for a Driver...
            </Text>
            <Text variant="bodyMedium" style={styles.searchingSubtitle}>
              This may takes a few seconds
            </Text>
          </View>
        );

      case 'driver-found':
        return (
          <View style={styles.driverFoundContainer}>
            {/* Header */}
            <View style={styles.driverFoundHeader}>
              <Text variant="titleLarge" style={styles.driverFoundTitle}>
                Driver Found
              </Text>
              <View style={styles.etaBadge}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text variant="bodyMedium" style={styles.etaBadgeText}>
                  30Min Way
                </Text>
              </View>
            </View>

            <Text variant="bodySmall" style={styles.driverFoundSubtitle}>
              Please wait while your driver confirms{'\n'}and heads your way.
            </Text>

            {/* Driver Card */}
            <View style={styles.driverFoundCard}>
              <View style={styles.driverFoundAvatar}>
                <Ionicons name="person" size={24} color="#8020A2" />
              </View>
              <View style={styles.driverFoundInfo}>
                <Text variant="titleMedium" style={styles.driverFoundName}>
                  {MOCK_DRIVER.name}
                </Text>
                <Text variant="bodySmall" style={styles.driverFoundRole}>
                  Driver
                </Text>
              </View>
              <View style={styles.driverFoundVehicle}>
                <Text variant="bodyMedium" style={styles.vehiclePlate}>
                  {MOCK_DRIVER.vehiclePlate}
                </Text>
                <Text variant="bodySmall" style={styles.vehicleDetails}>
                  {MOCK_DRIVER.vehicleColor}  {MOCK_DRIVER.vehicleModel}
                </Text>
              </View>
            </View>

            <Text variant="bodySmall" style={styles.contactNote}>
              You can contact your driver soon
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
          {/* Animated Ripple (only during searching) */}
          {rideState === 'searching' && imageLoaded && (
            <View style={styles.mapRippleContainer}>
              <Animated.View
                style={[
                  styles.mapRippleCircle,
                  styles.mapRippleOuter,
                  {
                    transform: [{
                      scale: rippleAnim1.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.8],
                      }),
                    }],
                    opacity: rippleOpacity1,
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.mapRippleCircle,
                  styles.mapRippleInner,
                  {
                    transform: [{
                      scale: rippleAnim2.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1.5],
                      }),
                    }],
                    opacity: rippleOpacity2,
                  },
                ]}
              />
              <View style={styles.mapCarContainer}>
                <Image
                  source={require('../../assets/illustrations/car-on-map.png')}
                  style={styles.mapCarImage}
                  resizeMode="contain"
                  fadeDuration={0}
                />
              </View>
            </View>
          )}
          
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
                {rideState === 'searching' ? 'Cancel Search' : 'Cancel Ride'}
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
    marginBottom: -24, // Extend 10% under bottom card (overlap for rounded corners)
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
    minHeight: 280, // Slightly shorter for better proportions
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
  // Searching state styles
  searchingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  rippleContainer: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  // Searching state styles (on map)
  mapRippleContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    top: '55%', // Centered in available map area (considering bottom card)
    left: '50%',
    marginLeft: -80, // Half of width to center
    marginTop: -80, // Half of height to center
  },
  mapRippleCircle: {
    position: 'absolute',
    borderRadius: 80,
    backgroundColor: '#B794C3',
  },
  mapRippleOuter: {
    width: 120,
    height: 120,
  },
  mapRippleInner: {
    width: 90, // Smaller inner circle
    height: 90,
  },
  mapCarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A366B9',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  mapCarImage: {
    width: 50,
    height: 50,
  },
  searchingContentContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  searchingTitle: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  searchingSubtitle: {
    color: '#666',
    textAlign: 'center',
  },
  // Driver Found state styles
  driverFoundContainer: {
    paddingVertical: 8,
  },
  driverFoundHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverFoundTitle: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  etaBadgeText: {
    color: '#666',
    fontSize: 14,
  },
  driverFoundSubtitle: {
    color: '#666',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 20,
  },
  driverFoundCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    gap: 12,
  },
  driverFoundAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8D9F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverFoundInfo: {
    flex: 1,
  },
  driverFoundName: {
    color: '#1C1B1F',
    fontWeight: '600',
    marginBottom: 2,
  },
  driverFoundRole: {
    color: '#666',
    fontSize: 13,
  },
  driverFoundVehicle: {
    alignItems: 'flex-end',
  },
  vehiclePlate: {
    color: '#1C1B1F',
    fontWeight: '600',
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 13,
    marginBottom: 4,
  },
  vehicleDetails: {
    color: '#666',
    fontSize: 12,
  },
  contactNote: {
    color: '#666',
    textAlign: 'center',
    fontSize: 13,
  },
  // Other state styles
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
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#F8383B',
  },
  cancelButtonText: {
    color: '#ffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
