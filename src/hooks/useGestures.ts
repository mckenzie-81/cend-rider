import { useState, useCallback } from 'react';

/**
 * Hook for handling pull-to-refresh gesture
 * 
 * @param onRefresh - Async function to call when refreshing
 * @returns Object with refreshing state and refresh handler
 * 
 * @example
 * const { refreshing, onRefresh } = usePullToRefresh(async () => {
 *   await fetchData();
 * });
 * 
 * <ScrollView
 *   refreshControl={
 *     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
 *   }
 * >
 *   {content}
 * </ScrollView>
 */
export function usePullToRefresh(onRefresh: () => Promise<void>) {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  return { refreshing, onRefresh: handleRefresh };
}

/**
 * Hook for handling long press gesture
 * 
 * @param onLongPress - Function to call on long press
 * @param duration - Duration in ms to trigger long press (default: 500ms)
 * @returns Object with long press handlers
 * 
 * @example
 * const longPressHandlers = useLongPress(() => {
 *   console.log('Long pressed!');
 * });
 * 
 * <TouchableOpacity {...longPressHandlers}>
 *   <Text>Press and hold me</Text>
 * </TouchableOpacity>
 */
export function useLongPress(onLongPress: () => void, duration: number = 500) {
  return {
    onLongPress,
    delayLongPress: duration,
  };
}

/**
 * Hook for managing keyboard dismissal
 * 
 * @example
 * const { dismissKeyboard } = useKeyboardDismiss();
 * 
 * <TouchableWithoutFeedback onPress={dismissKeyboard}>
 *   <View>...</View>
 * </TouchableWithoutFeedback>
 */
export function useKeyboardDismiss() {
  const { Keyboard } = require('react-native');
  
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, [Keyboard]);

  return { dismissKeyboard };
}
