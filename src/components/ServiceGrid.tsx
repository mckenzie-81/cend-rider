import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ServiceGridProps {
  /** Service cards to display */
  children: React.ReactNode;
  /** Number of columns (default: 3) */
  columns?: 2 | 3 | 4;
  /** Gap between items in pixels (default: 12) */
  gap?: number;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * ServiceGrid - Responsive grid layout for ServiceCards
 * Automatically adjusts card width based on column count
 * 
 * @example
 * <ServiceGrid columns={3} gap={12}>
 *   <ServiceCard icon="bike" title="Bike" onPress={handleBike} />
 *   <ServiceCard icon="car" title="Car" onPress={handleCar} />
 *   <ServiceCard icon="food" title="Food" onPress={handleFood} />
 *   <ServiceCard icon="package" title="Parcel" onPress={handleParcel} />
 * </ServiceGrid>
 */
export function ServiceGrid({
  children,
  columns = 3,
  gap = 12,
  style,
}: ServiceGridProps) {
  return (
    <View style={[styles.container, { gap }, style]}>
      {React.Children.map(children, (child) => (
        <View style={[styles.item, { width: `${(100 / columns) - (gap * (columns - 1) / columns)}%` }]}>
          {child}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    marginBottom: 12,
  },
});
