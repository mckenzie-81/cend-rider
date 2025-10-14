import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceCardProps {
  /** Service icon name (Material Community Icons) */
  icon: string;
  /** Service title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Press handler */
  onPress: () => void;
  /** Active/selected state */
  active?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * ServiceCard - Home screen service option
 * Clean, minimal card for service selection (Bike, Car, Food, etc.)
 * 
 * @example
 * <ServiceCard
 *   icon="bike"
 *   title="Bike"
 *   subtitle="Fast & Affordable"
 *   onPress={handleBikeSelect}
 *   active={selectedService === 'bike'}
 * />
 */
export function ServiceCard({
  icon,
  title,
  subtitle,
  onPress,
  active = false,
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
          backgroundColor: active ? theme.colors.primaryContainer : theme.colors.surface,
          borderColor: active ? theme.colors.primary : theme.colors.outline,
        },
        style,
      ]}
    >
      {/* Icon */}
      <MaterialCommunityIcons
        name={icon as any}
        size={32}
        color={active ? theme.colors.primary : theme.colors.onSurfaceVariant}
        style={styles.icon}
      />

      {/* Title */}
      <Text
        variant="labelLarge"
        style={[
          styles.title,
          { color: active ? theme.colors.primary : theme.colors.onSurface },
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
    borderWidth: 1.5,
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 8,
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
