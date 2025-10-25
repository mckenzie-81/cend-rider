import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { CustomIcon, IconName } from './CustomIcon';

interface ServiceCardProps {
  /** Service icon name (custom SVG or Ionicons) */
  icon: IconName;
  /** Service title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Press handler */
  onPress: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * ServiceCard - Home screen service option
 * Clean, minimal card for service selection (Bike, Car, Food, etc.)
 * 
 * @example
 * <ServiceCard
 *   icon="car"
 *   title="Ride"
 *   subtitle="Fast & Affordable"
 *   onPress={handleRideSelect}
 * />
 */
export function ServiceCard({
  icon,
  title,
  subtitle,
  onPress,
  style,
}: ServiceCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: '#F5F5F5', // Light ash background
        },
        style,
      ]}
    >
      {/* Icon */}
      <CustomIcon
        name={icon}
        size={46}
        color='#8020A2' // Primary purple
      />

      {/* Title */}
      <Text
        variant="labelSmall"
        style={[
          styles.title,
          { color: '#1C1B1F' }, // Charcoal
        ]}
      >
        {title}
      </Text>

      {/* Subtitle */}
      {subtitle && (
        <Text
          variant="bodySmall"
          style={[
            styles.subtitle,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 0,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 11,
  },
});
