import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface PrimaryButtonProps {
  /** Button text */
  children: string;
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Custom button style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
}

/**
 * PrimaryButton - Main call-to-action button
 * Clean, professional design with subtle interactions
 * 
 * @example
 * <PrimaryButton onPress={handleRideRequest}>
 *   Request Ride
 * </PrimaryButton>
 */
export function PrimaryButton({
  children,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
  style,
  textStyle,
}: PrimaryButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { opacity: disabled ? 0.5 : 1 },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <LinearGradient
        colors={['#8020A2', '#995FAF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text
            variant="labelLarge"
            style={[
              styles.text,
              textStyle,
            ]}
          >
            {children}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28, // Fully rounded (pill shape)
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
