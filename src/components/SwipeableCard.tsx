import React, { ReactNode } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';

interface SwipeableCardProps {
  /** The card content to render */
  children: ReactNode;
  /** Callback when favorite action is pressed */
  onFavorite?: () => void;
  /** Callback when info action is pressed */
  onInfo?: () => void;
  /** Whether to show swipeable actions */
  enableSwipe?: boolean;
}

/**
 * SwipeableCard component that wraps content with swipe gestures
 * Swipe left to reveal favorite and info actions
 * 
 * @example
 * <SwipeableCard 
 *   onFavorite={() => console.log('Added to favorites')}
 *   onInfo={() => console.log('Show info')}
 * >
 *   <ServiceCard title="Ride" icon="car" />
 * </SwipeableCard>
 */
export function SwipeableCard({
  children,
  onFavorite,
  onInfo,
  enableSwipe = true,
}: SwipeableCardProps) {
  // If swipe is disabled, just render the children
  if (!enableSwipe) {
    return <>{children}</>;
  }

  const renderRightActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.AnimatedInterpolation<number>
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.rightActions}>
        {onFavorite && (
          <Animated.View style={[styles.actionButton, { transform: [{ scale }] }]}>
            <IconButton
              icon="heart-outline"
              iconColor="#8020A2"
              size={20}
              onPress={onFavorite}
              style={styles.iconButton}
            />
          </Animated.View>
        )}
        {onInfo && (
          <Animated.View style={[styles.actionButton, { transform: [{ scale }] }]}>
            <IconButton
              icon="information-outline"
              iconColor="#8020A2"
              size={20}
              onPress={onInfo}
              style={styles.iconButton}
            />
          </Animated.View>
        )}
      </View>
    );
  };

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingRight: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2D7FC',
    borderRadius: 22,
    marginLeft: 8,
  },
  iconButton: {
    margin: 0,
  },
});
