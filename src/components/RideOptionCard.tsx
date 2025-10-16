import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export interface RideOption {
  id: string;
  name: string;
  type: string;
  time: string;
  capacity: number;
  price: string;
  icon: string;
}

interface RideOptionCardProps {
  option: RideOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

/**
 * RideOptionCard - Premium card component for ride options
 * Clean, Apple/Google-inspired design with smooth interactions
 */
export function RideOptionCard({ option, isSelected, onSelect }: RideOptionCardProps) {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={() => onSelect(option.id)}
      activeOpacity={0.7}
    >
      {/* Vehicle Icon */}
      <View style={styles.iconContainer}>
        <Ionicons name={option.icon as any} size={28} color="#1C1B1F" />
      </View>

      {/* Option Details */}
      <View style={styles.details}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.name}>
            {option.name}
          </Text>
          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={12} color="#666" />
            <Text variant="bodySmall" style={styles.time}>
              {option.time}
            </Text>
          </View>
        </View>
        <View style={styles.meta}>
          <Text variant="bodySmall" style={styles.type}>
            {option.type}
          </Text>
          <View style={styles.capacityContainer}>
            <Ionicons name="person-outline" size={12} color="#666" />
            <Text variant="bodySmall" style={styles.capacity}>
              {option.capacity}
            </Text>
          </View>
        </View>
      </View>

      {/* Price */}
      <Text variant="titleMedium" style={styles.price}>
        {option.price}
      </Text>

      {/* Selection Indicator */}
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Ionicons name="checkmark-circle" size={24} color="#8020A2" />
        </View>
      )}
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
    marginBottom: 12,
    position: 'relative',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  cardSelected: {
    backgroundColor: '#F9F5FB',
    ...Platform.select({
      ios: {
        shadowColor: '#8020A2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    color: '#1C1B1F',
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  time: {
    color: '#666',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  type: {
    color: '#666',
  },
  capacityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  capacity: {
    color: '#666',
  },
  price: {
    color: '#1C1B1F',
    fontWeight: '700',
    marginLeft: 12,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
});
