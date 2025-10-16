import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, AppHeader, TransportModeCard, RecentTripCard } from '../components';

// Transport mode options
const TRANSPORT_MODES = [
  { id: 'ride', label: 'Ride', icon: 'car' as const },
  { id: 'okada', label: 'Okada', icon: 'okada' as const },
];

// Mock recent trips data
const RECENT_TRIPS = [
  {
    id: '1',
    pickup: 'Legon Campus, University of Ghana',
    dropoff: 'Accra Mall, Spintex Road',
    date: 'Oct 15',
    time: '2:30 PM',
    price: 'GH₵ 45.00',
  },
  {
    id: '2',
    pickup: 'Kotoka International Airport',
    dropoff: 'East Legon, Accra',
    date: 'Oct 14',
    time: '9:15 AM',
    price: 'GH₵ 65.00',
  },
  {
    id: '3',
    pickup: 'Circle, Accra',
    dropoff: 'Osu Oxford Street',
    date: 'Oct 13',
    time: '6:45 PM',
    price: 'GH₵ 28.00',
  },
];

interface TransportScreenProps {
  onBack: () => void;
}

export function TransportScreen({ onBack }: TransportScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMode, setSelectedMode] = useState<'ride' | 'okada'>('ride');
  
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

  const handleRideAgain = (tripId: string) => {
    console.log('Ride again:', tripId);
    // TODO: Pre-fill search with this trip's locations
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
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="where to?"
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onBlur={() => Keyboard.dismiss()}
              />
            </View>
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
              
              {RECENT_TRIPS.map((trip) => (
                <RecentTripCard
                  key={trip.id}
                  pickup={trip.pickup}
                  dropoff={trip.dropoff}
                  date={trip.date}
                  time={trip.time}
                  price={trip.price}
                  onPress={() => handleTripPress(trip.id)}
                  onRideAgain={() => handleRideAgain(trip.id)}
                />
              ))}
            </View>
          </ScrollView>
      </View>
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
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1B1F',
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
