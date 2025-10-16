import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '../components';

interface RideOption {
  id: string;
  name: string;
  type: string;
  time: string;
  capacity: number;
  price: string;
  icon: string; // For now using icon names, can be replaced with images
}

interface RideOptionsScreenProps {
  onBack: () => void;
  pickup: string;
  dropoff: string;
  mode: 'ride' | 'okada';
}

export function RideOptionsScreen({
  onBack,
  pickup,
  dropoff,
  mode,
}: RideOptionsScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Mock ride options data
  const rideOptions: RideOption[] = mode === 'ride' 
    ? [
        {
          id: 'standard',
          name: 'Standard',
          type: 'Affordable rides',
          time: '2 mins',
          capacity: 4,
          price: 'GH₵20.00',
          icon: 'car-outline',
        },
        {
          id: 'basic',
          name: 'Basic',
          type: 'Everyday rides',
          time: '3 mins',
          capacity: 4,
          price: 'GH₵30.00',
          icon: 'car',
        },
        {
          id: 'comfort',
          name: 'Comfort',
          type: 'Premium comfort',
          time: '5 mins',
          capacity: 4,
          price: 'GH₵35.00',
          icon: 'car-sport',
        },
        {
          id: 'luxury',
          name: 'Luxury',
          type: 'Top-tier experience',
          time: '8 mins',
          capacity: 3,
          price: 'GH₵40.00',
          icon: 'diamond',
        },
      ]
    : [
        {
          id: 'okada-standard',
          name: 'Okada',
          type: 'Quick & affordable',
          time: '2 mins',
          capacity: 1,
          price: 'GH₵15.00',
          icon: 'bicycle',
        },
      ];

  const handleSelectOption = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleConfirm = () => {
    if (selectedOption) {
      console.log('Booking confirmed:', {
        pickup,
        dropoff,
        mode,
        option: selectedOption,
      });
      // TODO: Navigate to booking confirmation/tracking screen
    }
  };

  return (
    <ScreenContainer safe={false} padding={0}>
      <View style={styles.container}>
        {/* Full Screen Map */}
        <View style={styles.mapContainer}>
          {/* Floating Back Button */}
          <TouchableOpacity onPress={onBack} style={styles.floatingBackButton}>
            <Ionicons name="arrow-back" size={24} color="#1C1B1F" />
          </TouchableOpacity>

          {/* Distance Info Badge */}
          <View style={styles.distanceInfoContainer}>
            <View style={styles.distanceInfo}>
              <Ionicons name="time-outline" size={16} color="#1C1B1F" />
              <Text variant="bodyMedium" style={styles.distanceText}>
                ~8 mins • 3.2 km
              </Text>
            </View>
          </View>
        </View>

        {/* Ride Options List */}
        <View style={styles.optionsContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsScroll}
          >
            {rideOptions.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  selectedOption === option.id && styles.optionCardSelected,
                ]}
                onPress={() => handleSelectOption(option.id)}
                activeOpacity={0.7}
              >
                {/* Vehicle Icon */}
                <View style={styles.optionIcon}>
                  <Ionicons name={option.icon as any} size={32} color="#1C1B1F" />
                </View>

                {/* Option Details */}
                <View style={styles.optionDetails}>
                  <View style={styles.optionHeader}>
                    <Text variant="titleMedium" style={styles.optionName}>
                      {option.name}
                    </Text>
                    <Text variant="bodySmall" style={styles.optionTime}>
                      <Ionicons name="time-outline" size={12} color="#666" /> {option.time}
                    </Text>
                  </View>
                  <View style={styles.optionMeta}>
                    <Text variant="bodySmall" style={styles.optionType}>
                      {option.type}
                    </Text>
                    <Ionicons name="person-outline" size={12} color="#666" />
                    <Text variant="bodySmall" style={styles.optionCapacity}>
                      {option.capacity}
                    </Text>
                  </View>
                </View>

                {/* Price */}
                <Text variant="titleMedium" style={styles.optionPrice}>
                  {option.price}
                </Text>

                {/* Selection Indicator */}
                {selectedOption === option.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark-circle" size={24} color="#8020A2" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Confirm Button */}
        {selectedOption && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#8020A2', '#995FAF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.confirmButtonGradient}
              >
                <Text variant="titleMedium" style={styles.confirmButtonText}>
                  Select {rideOptions.find((o) => o.id === selectedOption)?.name}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
    height: 300,
    backgroundColor: '#E8F5E9',
    position: 'relative',
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
    elevation: 5,
    zIndex: 10,
  },
  distanceInfoContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    alignItems: 'flex-start',
  },
  distanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  distanceText: {
    color: '#1C1B1F',
    fontWeight: '600',
  },
  optionsContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  optionsScroll: {
    padding: 16,
    paddingBottom: 100,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
  },
  optionCardSelected: {
    backgroundColor: '#F5F0F7',
    borderWidth: 2,
    borderColor: '#8020A2',
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionDetails: {
    flex: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionName: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
  optionTime: {
    color: '#666',
    fontSize: 12,
  },
  optionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  optionType: {
    color: '#666',
    marginRight: 8,
  },
  optionCapacity: {
    color: '#666',
  },
  optionPrice: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginLeft: 12,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  confirmButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  confirmButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
