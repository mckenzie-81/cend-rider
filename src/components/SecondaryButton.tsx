import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface SecondaryButtonProps {
  /** Button text */
  children: string;
  /** Press handler */
  onPress: () => void;
  /** Disabled state */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Variant style */
  variant?: 'outline' | 'ghost';
  /** Custom button style */
  style?: ViewStyle;
  /** Custom text style */
  textStyle?: TextStyle;
}

/**
 * SecondaryButton - Neutral or secondary actions
 * Clean outline or ghost style for non-primary actions
 * 
 * @example
 * <SecondaryButton onPress={handleCancel} variant="outline">
 *   Cancel
 * </SecondaryButton>
 * 
 * <SecondaryButton onPress={handleSkip} variant="ghost">
 *   Skip
 * </SecondaryButton>
 */
export function SecondaryButton({
  children,
  onPress,
  disabled = false,
  fullWidth = false,
  variant = 'outline',
  style,
  textStyle,
}: SecondaryButtonProps) {
  const theme = useTheme();

  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.button,
        {
          backgroundColor: isOutline ? 'transparent' : 'transparent',
          borderWidth: isOutline ? 1.5 : 0,
          borderColor: isOutline ? theme.colors.outline : 'transparent',
          opacity: disabled ? 0.5 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      <Text
        variant="labelLarge"
        style={[
          styles.text,
          {
            color: theme.colors.primary,
          },
          textStyle,
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 28, // Fully rounded (pill shape)
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
