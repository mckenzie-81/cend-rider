import { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import SVG icons
import ActDriverIcon from '../../assets/icons/act-driver-icon.svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.34; // 34% of screen height

// Ride tracking states
type RideState = 'searching' | 'driver-found' | 'driver-arriving' | 'driver-arrived' | 'in-transit' | 'completed';

interface RideTrackingScreenProps {
  onBack: () => void;
  pickup: string;
  dropoff: string;
}

export function RideTrackingScreen({
  onBack,
  pickup,
  dropoff,
}: RideTrackingScreenProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  // State management
  const [rideState, setRideState] = useState<RideState>('searching');
  
  // Ripple animation values
  const rippleAnim1 = useRef(new Animated.Value(0)).current;
  const rippleAnim2 = useRef(new Animated.Value(0)).current;
  const rippleOpacity1 = useRef(new Animated.Value(1)).current;
  const rippleOpacity2 = useRef(new Animated.Value(1)).current;
  
  // Progress line animation
  const progressAnim = useRef(new Animated.Value(0)).current;
  
  // Driver car movement animation
  const driverCarAnim = useRef(new Animated.Value(0)).current;
  
  // Start continuous ripple animation only when searching
  useEffect(() => {
    if (rideState !== 'searching') return;
    
    const createRipple = (scaleAnim: Animated.Value, opacityAnim: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 2000,
            delay,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const ripple1 = createRipple(rippleAnim1, rippleOpacity1, 0);
    const ripple2 = createRipple(rippleAnim2, rippleOpacity2, 1000);

    ripple1.start();
    ripple2.start();

    return () => {
      ripple1.stop();
      ripple2.stop();
      rippleAnim1.setValue(0);
      rippleAnim2.setValue(0);
      rippleOpacity1.setValue(1);
      rippleOpacity2.setValue(1);
    };
  }, [rideState]);

  // Animate progress line when driver is found
  useEffect(() => {
    if (rideState === 'driver-found') {
      // Reset progress to 0
      progressAnim.setValue(0);
      
      // Animate progress from 0 to 1 over 3 seconds
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false, // We need to animate width, can't use native driver
      }).start(() => {
        // When animation completes, transition to driver-arriving state
        setRideState('driver-arriving');
      });
    }
  }, [rideState]);

  // Animate driver car movement when arriving
  useEffect(() => {
    if (rideState === 'driver-arriving') {
      // Reset car position
      driverCarAnim.setValue(0);
      
      // Animate car moving towards user (simulating arrival)
      Animated.timing(driverCarAnim, {
        toValue: 1,
        duration: 8000, // 8 seconds to simulate driver approaching
        useNativeDriver: true,
      }).start();
    }
  }, [rideState]);

  // Simulate finding driver after 5 seconds (for testing)
  useEffect(() => {
    if (rideState === 'searching') {
      const timer = setTimeout(() => {
        setRideState('driver-found');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [rideState]);

  const rippleScale1 = rippleAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  const rippleScale2 = rippleAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.5],
  });

  return (
    <View style={styles.container}>
      {/* Full Screen Map */}
      <View style={styles.mapContainer}>

        {/* Search Animation on Map - Only show when searching */}
        {rideState === 'searching' && (
          <View style={styles.searchAnimationContainer}>
            {/* Ripple 1 */}
            <Animated.View
              style={[
                styles.ripple,
                {
                  transform: [{ scale: rippleScale1 }],
                  opacity: rippleOpacity1,
                },
              ]}
            />
            
            {/* Ripple 2 */}
            <Animated.View
              style={[
                styles.ripple,
                {
                  transform: [{ scale: rippleScale2 }],
                  opacity: rippleOpacity2,
                },
              ]}
            />
            
            {/* Center Car Icon */}
            <View style={styles.carIconContainer}>
              <Image 
                source={require('../../assets/illustrations/car-on-map.png')}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
          </View>
        )}

        {/* User Location Pin - Show when driver found */}
        {rideState === 'driver-found' && (
          <View style={styles.userLocationContainer}>
            <View style={styles.locationPinWrapper}>
              <View style={styles.locationPin}>
                <Ionicons name="location" size={32} color="#8020A2" />
              </View>
              <View style={styles.locationLabelContainer}>
                <Text variant="labelSmall" style={styles.locationLabel}>
                  Your location
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Driver Arriving - Show route and driver car */}
        {rideState === 'driver-arriving' && (
          <>
            {/* Route Path - Dotted line from driver to user */}
            <View style={styles.routePath}>
              <View style={styles.dottedLine} />
            </View>

            {/* Driver's Car - Animated position moving towards user */}
            <Animated.View 
              style={[
                styles.driverCarContainer,
                {
                  transform: [
                    {
                      translateX: driverCarAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 120], // Move 120px to the right
                      }),
                    },
                    {
                      translateY: driverCarAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 120], // Move 120px down
                      }),
                    },
                  ],
                },
              ]}
            >
              <Image 
                source={require('../../assets/illustrations/car-on-map.png')}
                style={styles.driverCarImage}
                resizeMode="contain"
              />
            </Animated.View>

            {/* User Location Pin */}
            <View style={styles.userLocationDestination}>
              <View style={styles.locationPin}>
                <Ionicons name="location" size={16} color="#8020A2" />
              </View>
              <View style={styles.locationLabelContainer}>
                <Text variant="labelSmall" style={styles.locationLabel}>
                  Your location
                </Text>
              </View>
            </View>
          </>
        )}

        {/* Back Button */}
        <View style={[styles.headerContainer, { paddingTop: insets.top + 8 }]}>
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            accessibilityLabel="Go back"
            accessibilityRole="button"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.dragHandle} />
        
        <View style={styles.bottomSheetContent}>
          {/* Render content based on state */}
          {(rideState === 'searching' || rideState === 'driver-found') && (
            <>
              <Text variant="titleLarge" style={styles.searchingTitle}>
                {rideState === 'searching' ? 'Searching for driver' : 'Driver Found'}
              </Text>
              
              <Text variant="bodyMedium" style={styles.searchingSubtitle}>
                {rideState === 'searching' 
                  ? 'Finding the nearest driver for you...'
                  : 'Waiting for driver to confirm order'}
              </Text>

              {/* Progress Line - animates when driver is found */}
              <View style={styles.progressLineContainer}>
                <View style={styles.progressLineBackground} />
                {rideState === 'driver-found' && (
                  <Animated.View 
                    style={[
                      styles.progressLineFill,
                      {
                        width: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['0%', '100%'],
                        }),
                      },
                    ]} 
                  />
                )}
              </View>
            </>
          )}

          {/* Driver Arriving State */}
          {rideState === 'driver-arriving' && (
            <>
              <Text variant="titleLarge" style={styles.searchingTitle}>
                Arriving in 5 min
              </Text>
              
              <Text variant="bodyMedium" style={styles.searchingSubtitle}>
                Driver is on the way to pick you up
              </Text>

              {/* Progress Line - Full */}
              <View style={styles.progressLineContainer}>
                <View style={styles.progressLineFill} />
              </View>

              {/* Driver Details Card */}
              <View style={styles.driverDetailsCard}>
                <View style={styles.driverInfo}>
                  <View style={styles.driverAvatar}>
                    <Ionicons name="person" size={32} color="#8020A2" />
                  </View>
                  <View style={styles.driverTextInfo}>
                    <Text variant="titleMedium" style={styles.driverName}>
                      John Doe
                    </Text>
                    <View style={styles.driverRating}>
                      <Ionicons name="star" size={14} color="#FFC107" />
                      <Text variant="bodySmall" style={styles.ratingText}>
                        4.8 (120 rides)
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View style={styles.vehicleInfo}>
                  <Text variant="bodySmall" style={styles.vehicleLabel}>
                    Vehicle
                  </Text>
                  <Text variant="bodyMedium" style={styles.vehicleText}>
                    Toyota Camry • ABC 1234
                  </Text>
                </View>
              </View>
            </>
          )}

          {/* Action Buttons - Show for searching and driver-found states */}
          {(rideState === 'searching' || rideState === 'driver-found') && (
            <View style={styles.actionButtonsContainer}>
              {/* Driver Placeholder */}
              <View style={styles.actionButton}>
                <View style={styles.actionButtonCircle}>
                  <ActDriverIcon width={60} height={60} />
                </View>
              </View>

              {/* Edit Pickup */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={onBack}
                accessibilityLabel="Edit pickup location"
                accessibilityRole="button"
              >
                <View style={styles.actionButtonCircle}>
                  <Ionicons name="location" size={30} color="#000" />
                </View>
                <Text variant="labelSmall" style={styles.actionButtonLabel}>
                  Edit pickup
                </Text>
              </TouchableOpacity>

              {/* Cancel Ride */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={onBack}
                accessibilityLabel="Cancel ride"
                accessibilityRole="button"
              >
                <View style={styles.actionButtonCircle}>
                  <Ionicons name="close-circle-outline" size={40} color="#F44336" />
                </View>
                <Text variant="labelSmall" style={styles.actionButtonLabel}>
                  Cancel ride
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Action Buttons for Driver Arriving State */}
          {rideState === 'driver-arriving' && (
            <View style={styles.actionButtonsContainer}>
              {/* Call Driver */}
              <TouchableOpacity 
                style={styles.actionButton}
                accessibilityLabel="Call driver"
                accessibilityRole="button"
              >
                <View style={styles.actionButtonCircle}>
                  <Ionicons name="call" size={30} color="#4CAF50" />
                </View>
                <Text variant="labelSmall" style={styles.actionButtonLabel}>
                  Call
                </Text>
              </TouchableOpacity>

              {/* Message Driver */}
              <TouchableOpacity 
                style={styles.actionButton}
                accessibilityLabel="Message driver"
                accessibilityRole="button"
              >
                <View style={styles.actionButtonCircle}>
                  <Ionicons name="chatbubble" size={28} color="#2196F3" />
                </View>
                <Text variant="labelSmall" style={styles.actionButtonLabel}>
                  Message
                </Text>
              </TouchableOpacity>

              {/* Cancel Ride */}
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={onBack}
                accessibilityLabel="Cancel ride"
                accessibilityRole="button"
              >
                <View style={styles.actionButtonCircle}>
                  <Ionicons name="close-circle-outline" size={40} color="#F44336" />
                </View>
                <Text variant="labelSmall" style={styles.actionButtonLabel}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
  },
  mapPlaceholderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#999',
  },
  searchAnimationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 120,
    height: 120,
    marginLeft: -60,
    marginTop: -60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6200EE',
  },
  carIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  carImage: {
    width: 40,
    height: 40,
  },
  userLocationContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20, // Half of pin width
    marginTop: -60, // Offset to account for pin height
    alignItems: 'center',
  },
  locationPinWrapper: {
    alignItems: 'center',
    gap: 8,
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0,
    shadowRadius: 4,
    elevation: 5,
  },
  locationLabelContainer: {
    // backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    shadowRadius: 3,
    elevation: 3,
  },
  locationLabel: {
    color: '#1C1B1F',
    fontWeight: '600',
    fontSize: 12,
  },
  routePath: {
    position: 'absolute',
    top: '30%',
    left: '25%',
    width: '40%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedLine: {
    width: '100%',
    height: 2,
    borderStyle: 'dotted',
    borderWidth: 2,
    borderColor: '#8020A2',
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  driverCarContainer: {
    position: 'absolute',
    top: '25%',
    left: '20%',
    alignItems: 'center',
    width: 56,
    height: 56,
  },
  driverCarImage: {
    width: 56,
    height: 56,
  },
  userLocationDestination: {
    position: 'absolute',
    top: '65%',
    left: '60%',
    alignItems: 'center',
    gap: 8,
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSheet: {
    height: BOTTOM_SHEET_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16, // Match project standard
    paddingTop: 16,
    paddingBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomSheetContent: {
    alignItems: 'flex-start',
    width: '100%',
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    marginBottom: 20,
  },
  searchingTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  searchingSubtitle: {
    color: '#666',
    marginBottom: 20,
  },
  progressLineContainer: {
    width: '100%',
    height: 3,
    backgroundColor: 'transparent',
    marginBottom: 8,
    position: 'relative',
  },
  progressLineBackground: {
    position: 'absolute',
    width: '100%',
    height: 3,
    backgroundColor: '#E8E8E8', // Lightest color - very faint
    borderRadius: 1.5,
  },
  progressLineFill: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#8020A2', // Primary purple - deeper color
    borderRadius: 1.5,
  },
  driverDetailsCard: {
    width: '100%',
    backgroundColor: '#F8E5FF',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    gap: 12,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverTextInfo: {
    flex: 1,
    gap: 4,
  },
  driverName: {
    fontWeight: '600',
    color: '#1C1B1F',
  },
  driverRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: '#666',
    fontSize: 12,
  },
  vehicleInfo: {
    gap: 4,
  },
  vehicleLabel: {
    color: '#666',
    fontSize: 12,
  },
  vehicleText: {
    fontWeight: '600',
    color: '#1C1B1F',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'flex-start',
    gap: 72, 
    marginTop: 32,
    width: '100%',
  },
  actionButton: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
    maxWidth: 140, // Limit button width for proper spacing
  },
  actionButtonCircle: {
    width: 64,
    height: 64,
    borderRadius: 40,
    backgroundColor: '#F8E5FF', // Match service card background
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0, // Remove border like service cards
  },
  actionButtonLabel: {
    fontSize: 11,
    color: '#1C1B1F', // Charcoal like service cards
    textAlign: 'center',
    fontWeight: '600',
  },
});
