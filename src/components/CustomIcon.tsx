import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import SVG icons as components (after installing react-native-svg-transformer)
import CarIcon from '../../assets/icons/car-icon.svg';
import DispatchIcon from '../../assets/icons/dispatch-icon.svg';
import OkadaIcon from '../../assets/icons/okada-icon.svg';

/**
 * Icon mapping - Maps friendly names to SVG components
 * 
 * To add new icons:
 * 1. Add your SVG file to assets/icons/
 * 2. Import it: import NewIcon from '../../assets/icons/new-icon.svg';
 * 3. Add to iconMap: 'newicon': NewIcon,
 * 4. Use it anywhere: <CustomIcon name="newicon" size={32} />
 */
const iconMap = {
  // Service icons
  car: CarIcon,
  dispatch: DispatchIcon,
  okada: OkadaIcon,
  
  // Add more as you get them - import and add here:
  // reserve: ReserveIcon,
  // schedule: ScheduleIcon,
  // promo: PromoIcon,
  // wallet: WalletIcon,
  // support: SupportIcon,
};

export type CustomIconName = keyof typeof iconMap;
export type IconName = CustomIconName | keyof typeof Ionicons.glyphMap;

interface CustomIconProps {
  /** Icon name - can be custom SVG or Ionicons name */
  name: IconName;
  /** Icon size in pixels */
  size?: number;
  /** Icon color (only works for Ionicons, SVGs use their own colors) */
  color?: string;
}

/**
 * CustomIcon - Unified icon component
 * 
 * Automatically uses custom SVG icons when available, falls back to Ionicons.
 * SVGs are rendered as React components and maintain their original colors.
 * 
 * @example
 * // Custom SVG icon
 * <CustomIcon name="car" size={32} />
 * 
 * @example
 * // Ionicons fallback
 * <CustomIcon name="calendar-outline" size={24} color="#8020A2" />
 * 
 * @example
 * // Adding new icons - just import and add to iconMap!
 */
export function CustomIcon({ name, size = 24, color = '#8020A2' }: CustomIconProps) {
  // Check if it's a custom SVG icon
  const isCustomIcon = name in iconMap;

  if (isCustomIcon) {
    const SvgIcon = iconMap[name as CustomIconName];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <SvgIcon width={size} height={size} />
      </View>
    );
  }

  // Fall back to Ionicons
  return (
    <Ionicons
      name={name as keyof typeof Ionicons.glyphMap}
      size={size}
      color={color}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
