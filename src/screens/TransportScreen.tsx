import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '../components';

interface TransportScreenProps {
  onBack: () => void;
}

export function TransportScreen({ onBack }: TransportScreenProps) {
  return (
    <ScreenContainer>
      {/* Back button */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#8020A2" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Text variant="displayMedium" style={styles.title}>
          Transport Screen
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Temporary placeholder
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    padding: 16,
    alignSelf: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
  },
});
