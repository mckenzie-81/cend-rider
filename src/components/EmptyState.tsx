import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface EmptyStateProps {
  /** Icon name (Material Community Icons) */
  icon?: string;
  /** Main title */
  title: string;
  /** Description text */
  description?: string;
  /** Optional action component (e.g., button) */
  action?: React.ReactNode;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * EmptyState - Friendly message when there's no data
 * Clean, professional design with icon, title, description, and optional action
 * 
 * @example
 * <EmptyState
 *   icon="car-off"
 *   title="No rides yet"
 *   description="Start your first ride by searching for a destination"
 *   action={
 *     <PrimaryButton onPress={handleSearch}>
 *       Find a Ride
 *     </PrimaryButton>
 *   }
 * />
 */
export function EmptyState({
  icon = 'alert-circle-outline',
  title,
  description,
  action,
  style,
}: EmptyStateProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, style]}>
      {/* Icon */}
      {icon && (
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: theme.colors.surfaceVariant },
          ]}
        >
          <MaterialCommunityIcons
            name={icon as any}
            size={48}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}

      {/* Title */}
      <Text
        variant="titleLarge"
        style={[
          styles.title,
          { color: theme.colors.onSurface },
        ]}
      >
        {title}
      </Text>

      {/* Description */}
      {description && (
        <Text
          variant="bodyMedium"
          style={[
            styles.description,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          {description}
        </Text>
      )}

      {/* Action */}
      {action && (
        <View style={styles.actionContainer}>
          {action}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  actionContainer: {
    marginTop: 24,
    width: '100%',
    maxWidth: 280,
  },
});
