import { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Image, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Import SVG icons
import ActDriverIcon from '../../assets/icons/act-driver-icon.svg';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.34; // 34% of screen height

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
  
  // Ripple animation values
  const rippleAnim1 = useRef(new Animated.Value(0)).current;
  const rippleAnim2 = useRef(new Animated.Value(0)).current;
  const rippleOpacity1 = useRef(new Animated.Value(1)).current;
  const rippleOpacity2 = useRef(new Animated.Value(1)).current;
  
  // Start continuous ripple animation
  useEffect(() => {
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
    };
  }, []);

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

        {/* Search Animation on Map */}
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
          <Text variant="titleLarge" style={styles.searchingTitle}>
            Searching for driver
          </Text>
          
          <Text variant="bodyMedium" style={styles.searchingSubtitle}>
            Finding the nearest driver for you...
          </Text>

          {/* Progress Line - will animate in next state */}
          <View style={styles.progressLineContainer}>
            <View style={styles.progressLine} />
          </View>

          {/* Action Buttons */}
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
    height: 2,
    backgroundColor: 'transparent',
    marginBottom: 8,
  },
  progressLine: {
    width: '100%',
    height: 3,
    backgroundColor: '#E8E8E8', // Lightest color - very faint
    borderRadius: 1,
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
