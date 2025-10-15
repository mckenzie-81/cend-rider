import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { CustomIcon, IconName } from './CustomIcon';

interface TransportModeCardProps {
  /** The mode identifier */
  mode: string;
  /** Display label for the mode */
  label: string;
  /** Icon name from CustomIcon or Ionicons */
  icon: IconName;
  /** Whether this card is currently selected */
  isSelected: boolean;
  /** Callback when card is pressed */
  onPress: () => void;
}

/**
 * TransportModeCard - A premium, Apple-inspired transport mode selection card
 * 
 * Features:
 * - Minimal design with subtle selection states
 * - Clean typography and spacing
 * - Smooth interaction feedback
 * - Reusable for any transport mode
 * 
 * @example
 * <TransportModeCard
 *   mode="ride"
 *   label="Ride"
 *   icon="car"
 *   isSelected={selectedMode === 'ride'}
 *   onPress={() => setSelectedMode('ride')}
 * />
 */
export function TransportModeCard({
  mode,
  label,
  icon,
  isSelected,
  onPress,
}: TransportModeCardProps) {
  return (
    <TouchableOpacity 
      style={[
        styles.card,
        isSelected && styles.cardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View style={styles.iconContainer}>
        <CustomIcon 
          name={icon} 
          size={48} 
          color={isSelected ? '#8020A2' : '#8E8E93'}
        />
      </View>
      
      {/* Label */}
      <Text style={[
        styles.label,
        isSelected && styles.labelSelected
      ]}>
        {label}
      </Text>
      
      {/* Minimal selection indicator - just a subtle dot */}
      {isSelected && (
        <View style={styles.selectionDot} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
    position: 'relative',
  },
  cardSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5EA',
  },
  iconContainer: {
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#8E8E93',
    letterSpacing: -0.2,
  },
  labelSelected: {
    color: '#1C1C1E',
    fontWeight: '600',
  },
  selectionDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8020A2',
  },
});
