import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface QuickActionCardProps {
  /** Action icon name (Ionicons) */
  icon: string;
  /** Action title */
  title: string;
  /** Press handler */
  onPress: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * QuickActionCard - Quick action button for home screen
 * Smaller, horizontal card for common actions
 * 
 * @example
 * <QuickActionCard
 *   icon="time-outline"
 *   title="Schedule"
 *   onPress={handleSchedule}
 * />
 */
export function QuickActionCard({
  icon,
  title,
  onPress,
  style,
}: QuickActionCardProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor: '#FFFFFF', // White background
          borderColor: '#F2D7FC', // Light lavender border
        },
        style,
      ]}
    >
      {/* Icon */}
      <Ionicons
        name={icon as any}
        size={24}
        color='#8020A2' // Primary purple
        style={styles.icon}
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 8,
  },
  icon: {
    marginLeft: 4,
  },
  title: {
    fontWeight: '600',
  },
});
