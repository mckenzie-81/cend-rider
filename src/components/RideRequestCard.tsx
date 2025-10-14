import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface RideRequestCardProps {
  /** Pickup location */
  pickup: string;
  /** Destination location */
  destination: string;
  /** Estimated fare */
  fare: string;
  /** Distance in km */
  distance?: string;
  /** Estimated time */
  estimatedTime?: string;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * RideRequestCard - Clean ride summary card
 * Displays pickup, destination, and fare information
 * 
 * @example
 * <RideRequestCard
 *   pickup="123 Main St, Downtown"
 *   destination="456 Park Ave, Uptown"
 *   fare="$12.50"
 *   distance="5.2 km"
 *   estimatedTime="15 min"
 * />
 */
export function RideRequestCard({
  pickup,
  destination,
  fare,
  distance,
  estimatedTime,
  style,
}: RideRequestCardProps) {
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
      {/* Route Section */}
      <View style={styles.routeContainer}>
        {/* Pickup */}
        <View style={styles.locationRow}>
          <View style={styles.iconWrapper}>
            <View
              style={[
                styles.pickupDot,
                { backgroundColor: theme.colors.primary },
              ]}
            />
          </View>
          <View style={styles.locationText}>
            <Text variant="labelSmall" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
              Pickup
            </Text>
            <Text variant="bodyMedium" style={[styles.address, { color: theme.colors.onSurface }]}>
              {pickup}
            </Text>
          </View>
        </View>

        {/* Connecting Line */}
        <View style={styles.connectingLineContainer}>
          <View style={[styles.connectingLine, { backgroundColor: theme.colors.outline }]} />
        </View>

        {/* Destination */}
        <View style={styles.locationRow}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={theme.colors.primary}
            />
          </View>
          <View style={styles.locationText}>
            <Text variant="labelSmall" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
              Destination
            </Text>
            <Text variant="bodyMedium" style={[styles.address, { color: theme.colors.onSurface }]}>
              {destination}
            </Text>
          </View>
        </View>
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

      {/* Fare & Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          {distance && (
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="map-marker-distance"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text variant="bodySmall" style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}>
                {distance}
              </Text>
            </View>
          )}
          {estimatedTime && (
            <View style={styles.infoItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color={theme.colors.onSurfaceVariant}
              />
              <Text variant="bodySmall" style={[styles.infoText, { color: theme.colors.onSurfaceVariant }]}>
                {estimatedTime}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.fareContainer}>
          <Text variant="labelMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Estimated Fare
          </Text>
          <Text variant="headlineSmall" style={[styles.fare, { color: theme.colors.primary }]}>
            {fare}
          </Text>
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
  routeContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: 24,
    alignItems: 'center',
    marginRight: 12,
    paddingTop: 2,
  },
  pickupDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  locationText: {
    flex: 1,
  },
  label: {
    marginBottom: 4,
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  address: {
    lineHeight: 20,
  },
  connectingLineContainer: {
    flexDirection: 'row',
    paddingLeft: 11,
    marginVertical: 8,
  },
  connectingLine: {
    width: 2,
    height: 24,
    marginRight: 12,
  },
  divider: {
    height: 1,
    marginBottom: 16,
  },
  infoContainer: {
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontWeight: '500',
  },
  fareContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fare: {
    fontWeight: '700',
  },
});
