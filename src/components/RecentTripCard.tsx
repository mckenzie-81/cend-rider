import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface RecentTripCardProps {
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  price: string;
  onPress?: () => void;
  onRideAgain?: () => void;
  style?: ViewStyle;
}

/**
 * RecentTripCard - Clean, minimal design for displaying recent trips
 * No borders, no strokes - premium aesthetic
 */
const RecentTripCard = ({
  pickup,
  dropoff,
  date,
  time,
  price,
  onPress,
  onRideAgain,
  style,
}: RecentTripCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Location Info */}
      <View style={styles.locationSection}>
        {/* Route indicator with dots */}
        <View style={styles.routeIndicator}>
          <View style={styles.pickupDot} />
          <View style={styles.routeLine} />
          <View style={styles.dropoffDot} />
        </View>

        {/* Addresses */}
        <View style={styles.addressContainer}>
          <Text variant="bodyMedium" style={styles.pickupText} numberOfLines={1}>
            {pickup}
          </Text>
          <View style={styles.spacer} />
          <Text variant="bodyMedium" style={styles.dropoffText} numberOfLines={1}>
            {dropoff}
          </Text>
        </View>
      </View>

      {/* Bottom row - Date/Time and Price */}
      <View style={styles.bottomRow}>
        <View style={styles.dateTimeContainer}>
          <Ionicons name="time-outline" size={14} color="#666" />
          <Text variant="bodySmall" style={styles.dateTimeText}>
            {date} • {time}
          </Text>
        </View>

        <View style={styles.priceSection}>
          <Text variant="titleMedium" style={styles.priceText}>
            {price}
          </Text>
          {onRideAgain && (
            <TouchableOpacity
              style={styles.rideAgainButton}
              onPress={(e) => {
                e.stopPropagation();
                onRideAgain();
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="reload-outline" size={16} color="#8020A2" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RecentTripCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  locationSection: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  routeIndicator: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 2,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8020A2',
  },
  routeLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#D0D0D0',
    marginVertical: 4,
  },
  dropoffDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8020A2',
  },
  addressContainer: {
    flex: 1,
  },
  pickupText: {
    color: '#1C1B1F',
    fontWeight: '500',
  },
  spacer: {
    height: 16,
  },
  dropoffText: {
    color: '#1C1B1F',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateTimeText: {
    color: '#666',
    fontSize: 12,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  priceText: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
  rideAgainButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0E0F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
