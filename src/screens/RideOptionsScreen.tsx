import { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, PrimaryButton, RideOptionCard, RideOption } from '../components';

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

  // Pre-select first option by default
  const [selectedOption, setSelectedOption] = useState<string>(rideOptions[0].id);

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

        {/* Bottom Sheet Modal for Ride Options */}
        <View style={styles.bottomSheet}>
          {/* Handle Bar */}
          <View style={styles.handleBar} />
          
          {/* Sheet Header */}
          <View style={styles.sheetHeader}>
            <Text variant="titleLarge" style={styles.sheetTitle}>
              Choose a ride
            </Text>
            <View style={styles.routeInfo}>
              <Ionicons name="ellipse" size={8} color="#8020A2" />
              <Text variant="bodySmall" style={styles.routeText} numberOfLines={1}>
                {pickup} → {dropoff}
              </Text>
            </View>
          </View>

          {/* Ride Options List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsScroll}
          >
            {rideOptions.map((option) => (
              <RideOptionCard
                key={option.id}
                option={option}
                isSelected={selectedOption === option.id}
                onSelect={handleSelectOption}
              />
            ))}
          </ScrollView>

          {/* Confirm Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleConfirm}>
              {`Confirm ${rideOptions.find((o) => o.id === selectedOption)?.name || 'Ride'}`}
            </PrimaryButton>
          </View>
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
    bottom: 24,
    left: 16,
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
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  handleBar: {
    width: 40,
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sheetTitle: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginBottom: 4,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  routeText: {
    color: '#666',
    flex: 1,
  },
  optionsScroll: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
  },
});
