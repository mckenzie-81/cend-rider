import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, AppHeader } from '../components';

interface TransportScreenProps {
  onBack: () => void;
}

export function TransportScreen({ onBack }: TransportScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleMapPress = () => {
    console.log('Map pressed');
  };

  return (
    <ScreenContainer safe={false} padding={0}>
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
          />
        </View>
      </View>

      <View style={styles.container}>
        {/* Content goes here */}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 48,
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
  },
  illustration: {
    width: 240,
    height: 140,
  },
});
