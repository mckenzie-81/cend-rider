import { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
  Keyboard,
} from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { PrimaryButton } from './PrimaryButton';
import { LocationService, Place } from '../services/location.service';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface RideBookingModalProps {
  visible: boolean;
  onClose: () => void;
  initialPickup?: string;
  selectedMode?: 'ride' | 'okada';
  onConfirm?: (pickup: string, dropoff: string) => void;
}

export function RideBookingModal({
  visible,
  onClose,
  initialPickup = '',
  selectedMode = 'ride',
  onConfirm,
}: RideBookingModalProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pickup, setPickup] = useState(initialPickup);
  const [dropoff, setDropoff] = useState('');
  const [focusedInput, setFocusedInput] = useState<'pickup' | 'dropoff' | null>(null);
  const [recentLocations, setRecentLocations] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Load recent and saved locations
  useEffect(() => {
    if (visible) {
      loadLocations();
    }
  }, [visible]);

  const loadLocations = async () => {
    try {
      setIsLoading(true);
      const locations = await LocationService.getSavedAndRecentPlaces();
      setRecentLocations(locations);
    } catch (error) {
      console.error('Error loading locations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      // Slide up animation
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      // Slide down and reset
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsExpanded(false);
      });
    }
  }, [visible]);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    Keyboard.dismiss();
  };

  const handleLocationSelect = (location: Place) => {
    if (focusedInput === 'pickup') {
      setPickup(location.name);
      setFocusedInput('dropoff');
    } else {
      setDropoff(location.name);
      setFocusedInput(null);
    }
  };

  const handleClose = () => {
    Keyboard.dismiss();
    onClose();
  };

  const canProceed = pickup.trim() !== '' && dropoff.trim() !== '';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Backdrop */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleClose}
        />

        {/* Modal Content */}
        <Animated.View
          style={[
            styles.modalContainer,
            isExpanded ? styles.modalExpanded : styles.modalCollapsed,
            {
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Handle Bar */}
          <View style={styles.handleBar} />

          {/* Header */}
          <View style={styles.header}>
            <Text variant="headlineSmall" style={styles.headerTitle}>
              Where to?
            </Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1C1B1F" />
            </TouchableOpacity>
          </View>

          {/* Mode Indicator */}
          <View style={styles.modeIndicator}>
            <Ionicons 
              name={selectedMode === 'ride' ? 'car' : 'bicycle'} 
              size={16} 
              color="#666" 
            />
            <Text variant="bodySmall" style={styles.modeText}>
              {selectedMode === 'ride' ? 'Car Ride' : 'Okada Ride'}
            </Text>
          </View>

          {/* Location Inputs */}
          <View style={styles.inputsContainer}>
            {/* Pickup Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.dotIndicator}>
                <View style={styles.pickupDot} />
              </View>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'pickup' && styles.inputFocused,
                ]}
                placeholder="Pickup location"
                placeholderTextColor="#999"
                value={pickup}
                onChangeText={setPickup}
                onFocus={() => {
                  setFocusedInput('pickup');
                  if (!isExpanded) handleExpand();
                }}
              />
            </View>

            {/* Connecting Line */}
            <View style={styles.connectingLine} />

            {/* Dropoff Input */}
            <View style={styles.inputWrapper}>
              <View style={styles.dotIndicator}>
                <View style={styles.dropoffDot} />
              </View>
              <TextInput
                style={[
                  styles.input,
                  focusedInput === 'dropoff' && styles.inputFocused,
                ]}
                placeholder="Dropoff location"
                placeholderTextColor="#999"
                value={dropoff}
                onChangeText={setDropoff}
                onFocus={() => {
                  setFocusedInput('dropoff');
                  if (!isExpanded) handleExpand();
                }}
              />
            </View>
          </View>

          {/* Recent/Saved Locations */}
          <ScrollView
            style={styles.locationsScroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text variant="titleSmall" style={styles.sectionTitle}>
              Recent & Saved
            </Text>

            {recentLocations.map((location) => (
              <TouchableOpacity
                key={location.id}
                style={styles.locationItem}
                onPress={() => handleLocationSelect(location)}
              >
                <View style={styles.locationIconContainer}>
                  <Ionicons name="location-outline" size={20} color="#8020A2" />
                </View>
                <View style={styles.locationInfo}>
                  <Text variant="bodyLarge" style={styles.locationName}>
                    {location.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.locationAddress}>
                    {location.address}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Confirm Button */}
          {canProceed && (
            <View style={styles.buttonContainer}>
              <PrimaryButton
                onPress={() => {
                  if (onConfirm) {
                    onConfirm(pickup, dropoff);
                  }
                  handleClose();
                }}
              >
                Confirm Locations
              </PrimaryButton>
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
  },
  modalCollapsed: {
    height: SCREEN_HEIGHT * 0.5,
  },
  modalExpanded: {
    height: SCREEN_HEIGHT * 0.95,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  headerTitle: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  modeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 6,
  },
  modeText: {
    color: '#666',
    fontSize: 13,
  },
  inputsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dotIndicator: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#8020A2',
  },
  dropoffDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
  },
  connectingLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 31,
    marginVertical: 4,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1C1B1F',
    marginLeft: 12,
  },
  inputFocused: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#8020A2',
  },
  locationsScroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#666',
    fontWeight: '600',
    marginBottom: 12,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  locationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    color: '#1C1B1F',
    fontWeight: '600',
    marginBottom: 2,
  },
  locationAddress: {
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
  },
});
