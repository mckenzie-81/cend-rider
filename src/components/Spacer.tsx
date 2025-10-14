import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  /** Size of the spacer in pixels */
  size?: number;
  /** Create horizontal spacing instead of vertical */
  horizontal?: boolean;
}

/**
 * Spacer component for consistent spacing between elements
 * @example
 * // Vertical spacing (default)
 * <Spacer size={16} />
 * 
 * // Horizontal spacing
 * <Spacer size={12} horizontal />
 */
export function Spacer({ size = 16, horizontal = false }: SpacerProps) {
  return (
    <View
      style={{
        width: horizontal ? size : undefined,
        height: horizontal ? undefined : size,
      }}
    />
  );
}

// Predefined spacer sizes for convenience
export const Spacer4 = () => <Spacer size={4} />;
export const Spacer8 = () => <Spacer size={8} />;
export const Spacer12 = () => <Spacer size={12} />;
export const Spacer16 = () => <Spacer size={16} />;
export const Spacer24 = () => <Spacer size={24} />;
export const Spacer32 = () => <Spacer size={32} />;
