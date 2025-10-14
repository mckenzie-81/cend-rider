import React from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface DriverInfoCardProps {
  /** Driver's name */
  name: string;
  /** Driver's photo URL */
  photo?: string;
  /** Driver's rating (0-5) */
  rating: number;
  /** Vehicle make and model */
  vehicle: string;
  /** Vehicle color */
  vehicleColor?: string;
  /** License plate number */
  licensePlate: string;
  /** Trip count */
  tripCount?: number;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * DriverInfoCard - Displays driver information
 * Clean, professional card for during/after ride
 * 
 * @example
 * <DriverInfoCard
 *   name="John Doe"
 *   photo="https://example.com/photo.jpg"
 *   rating={4.8}
 *   vehicle="Toyota Camry"
 *   vehicleColor="Silver"
 *   licensePlate="ABC 1234"
 *   tripCount={1250}
 * />
 */
export function DriverInfoCard({
  name,
  photo,
  rating,
  vehicle,
  vehicleColor,
  licensePlate,
  tripCount,
  style,
}: DriverInfoCardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
        },
        style,
      ]}
    >
      {/* Driver Info Row */}
      <View style={styles.driverRow}>
        {/* Driver Photo */}
        <View style={styles.photoContainer}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <View
              style={[
                styles.photoPlaceholder,
                { backgroundColor: theme.colors.surfaceVariant },
              ]}
            >
              <MaterialCommunityIcons
                name="account"
                size={32}
                color={theme.colors.onSurfaceVariant}
              />
            </View>
          )}
        </View>

        {/* Driver Details */}
        <View style={styles.driverInfo}>
          <Text variant="titleMedium" style={[styles.name, { color: theme.colors.onSurface }]}>
            {name}
          </Text>
          
          <View style={styles.ratingRow}>
            <MaterialCommunityIcons
              name="star"
              size={16}
              color="#FFA500"
            />
            <Text variant="bodyMedium" style={[styles.rating, { color: theme.colors.onSurface }]}>
              {rating.toFixed(1)}
            </Text>
            {tripCount && (
              <>
                <View style={[styles.dot, { backgroundColor: theme.colors.onSurfaceVariant }]} />
                <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                  {tripCount} trips
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

      {/* Vehicle Info */}
      <View style={styles.vehicleContainer}>
        <View style={styles.vehicleRow}>
          <MaterialCommunityIcons
            name="car"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            {vehicleColor ? `${vehicleColor} ${vehicle}` : vehicle}
          </Text>
        </View>

        <View style={styles.licensePlateContainer}>
          <View
            style={[
              styles.licensePlate,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              variant="labelLarge"
              style={[styles.licensePlateText, { color: theme.colors.onSurface }]}
            >
              {licensePlate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoContainer: {
    marginRight: 12,
  },
  photo: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  photoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInfo: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontWeight: '600',
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    marginHorizontal: 4,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  vehicleContainer: {
    gap: 12,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  licensePlateContainer: {
    alignItems: 'flex-start',
  },
  licensePlate: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  licensePlateText: {
    fontWeight: '700',
    letterSpacing: 2,
  },
});
