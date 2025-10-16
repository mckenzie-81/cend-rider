import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export interface OkadaOption {
  id: string;
  name: string;
  type: string;
  time: string;
  price: string;
  icon: string;
}

interface OkadaOptionCardProps {
  option: OkadaOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * OkadaOptionCard - Premium card component for motorcycle/okada options
 * Clean, minimal design matching RideOptionCard
 */
export function OkadaOptionCard({ option, isSelected, onSelect }: OkadaOptionCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={() => onSelect(option.id)}
      activeOpacity={0.7}
    >
      {/* Motorcycle Icon */}
      <Ionicons name={option.icon as any} size={36} color="#1C1B1F" />

      {/* Option Details */}
      <View style={styles.details}>
        <Text variant="titleMedium" style={styles.name}>
          {option.name}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text variant="bodySmall" style={styles.meta}>
              {option.time}
            </Text>
          </View>
          <Text variant="bodySmall" style={styles.type}>
            {option.type}
          </Text>
        </View>
      </View>

      {/* Price */}
      <Text variant="titleMedium" style={styles.price}>
        {option.price}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    paddingLeft: 20,
    marginBottom: 12,
    gap: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#B794C3',
  },
  details: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: '#1C1B1F',
    fontWeight: '600',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  type: {
    color: '#666',
  },
  meta: {
    color: '#666',
  },
  price: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
});
