import { View, StyleSheet, TouchableOpacity, ViewStyle, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface DriverPromoCardProps {
  onPress: () => void;
  style?: ViewStyle;
}

/**
 * DriverPromoCard - Premium promo card for "Become a Driver" campaign
 * Features dark purple gradient background with illustration
 */
const DriverPromoCard = ({ onPress, style }: DriverPromoCardProps) => {
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Content section */}
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Become a Driver
        </Text>
        
        <Text variant="bodyMedium" style={styles.subtitle}>
          Drive Your Future: Great Pay and Flexible Hours
        </Text>
        
        <View style={styles.linkContainer}>
          <Text variant="labelLarge" style={styles.linkText}>
            Drive with Cend
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </View>
      </View>

      {/* Illustration section */}
      <View style={styles.illustrationContainer}>
        {/* Placeholder for car and driver illustration */}
        <View style={styles.carPlaceholder}>
          <Ionicons name="car-sport" size={114} color="rgba(255, 255, 255, 0.3)" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DriverPromoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C063A', // Deep purple from Figma
    borderRadius: 20,
    overflow: 'hidden',
    minHeight: 160,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 16,
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 20,
    marginBottom: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  linkText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  illustrationContainer: {
    width: 140,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  carPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.6,
    marginBottom: -8,
  },
});
