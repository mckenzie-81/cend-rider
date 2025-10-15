import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer, AppHeader } from '../components';

interface TransportScreenProps {
  onBack: () => void;
}

export function TransportScreen({ onBack }: TransportScreenProps) {
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
