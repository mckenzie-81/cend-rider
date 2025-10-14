import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

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
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: theme.colors.primary,
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.onPrimary} />
      ) : (
        <Text
          variant="labelLarge"
          style={[
            styles.text,
            { color: theme.colors.onPrimary },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
