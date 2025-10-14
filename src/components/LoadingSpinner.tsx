import React from 'react';
import { View, ActivityIndicator, StyleSheet, ViewStyle } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface LoadingSpinnerProps {
  /** Loading message text */
  message?: string;
  /** Size of the spinner */
  size?: 'small' | 'large';
  /** Fullscreen overlay mode */
  fullscreen?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * LoadingSpinner - Universal loader for API waits or state transitions
 * Clean, minimal design with optional message
 * 
 * @example
 * // Inline loader
 * <LoadingSpinner message="Loading rides..." />
 * 
 * // Fullscreen loader
 * <LoadingSpinner fullscreen message="Processing payment..." />
 * 
 * // Simple spinner without text
 * <LoadingSpinner size="small" />
 */
export function LoadingSpinner({
  message,
  size = 'large',
  fullscreen = false,
  style,
}: LoadingSpinnerProps) {
  const theme = useTheme();

  const content = (
    <View
      style={[
        styles.container,
        fullscreen && styles.fullscreen,
        fullscreen && { backgroundColor: theme.colors.background },
        style,
      ]}
    >
      <ActivityIndicator
        size={size}
        color={theme.colors.primary}
      />
      
      {message && (
        <Text
          variant="bodyMedium"
          style={[
            styles.message,
            { color: theme.colors.onSurfaceVariant },
          ]}
        >
          {message}
        </Text>
      )}
    </View>
  );

  if (fullscreen) {
    return (
      <View style={styles.overlay}>
        {content}
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fullscreen: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  message: {
    marginTop: 16,
    textAlign: 'center',
  },
});
