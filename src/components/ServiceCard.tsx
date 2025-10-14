import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface ServiceCardProps {
  /** Service icon name (Ionicons) */
  icon: string;
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
 *   icon="bicycle-outline"
 *   title="Bike"
 *   subtitle="Fast & Affordable"
 *   onPress={handleBikeSelect}
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
          backgroundColor: '#F2D7FC', // Light lavender - always this color
        },
        style,
      ]}
    >
      {/* Icon */}
      <Ionicons
        name={icon as any}
        size={32}
        color='#8020A2' // Deep purple
        style={styles.icon}
      />

      {/* Title */}
      <Text
        variant="labelSmall"
        style={[
          styles.title,
          { color: '#8020A2' }, // Deep purple
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
  icon: {
    marginBottom: 4,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 11,
  },
});
