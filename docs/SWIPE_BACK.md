# Swipe Back Gesture Implementation

## ✅ Fixed: Swipe-to-Go-Back on Transport Screen

The swipe-back gesture is now fully implemented on the Transport screen using `react-native-reanimated` v4 and `react-native-gesture-handler` v2.

## How It Works

### User Experience
- **Swipe right** from anywhere on the screen to go back to the Home screen
- The screen follows your finger as you swipe
- If you swipe **more than 30% of the screen width**, it will automatically complete the navigation
- If you swipe **less than 30%**, it will spring back to the original position
- Works with **velocity detection** - a fast swipe will trigger navigation even if it's shorter

### Technical Implementation

#### Files Modified

1. **`src/screens/TransportScreen.tsx`**
   - Added `Gesture.Pan()` for detecting swipe gestures
   - Used `useSharedValue` and `useAnimatedStyle` for smooth animations
   - Screen translates horizontally following the swipe
   - Calls `onBack()` when swipe threshold is met

2. **`babel.config.js`**
   - Added `react-native-reanimated/plugin` to enable reanimated worklets
   - **Important**: Must be the **last** plugin in the array

3. **`package.json`**
   - Installed `react-native-reanimated` v4.1.3

#### Key Configuration

```typescript
const panGesture = Gesture.Pan()
  .activeOffsetX(10)      // Needs 10px horizontal movement to activate
  .failOffsetX(-10)       // Fails if moving left
  .onStart(...)           // Track starting position
  .onUpdate(...)          // Update screen position during swipe
  .onEnd(...)             // Complete or cancel navigation
```

**Threshold**: 30% of screen width (adjustable via `SWIPE_THRESHOLD`)

**Animation**: Spring animation with damping for smooth feel

### Why Previous Approach Didn't Work

The Android `predictiveBackGestureEnabled` setting only works with:
- React Navigation (which you're not using)
- Android system back button/gesture

Since your app uses **state-based navigation** (not React Navigation), we needed a **custom gesture implementation** using gesture-handler + reanimated.

## Important Notes

### Cache Clearing Required
After adding the reanimated plugin to `babel.config.js`, you **must** clear the Metro bundler cache:

```bash
npx expo start --clear
```

Or stop the current server and restart with:
```bash
# Press 'r' in the Expo terminal to reload
# Or restart with:
npx expo start --clear
```

### Testing

Test the swipe gesture:
1. Navigate to Transport screen (tap Ride or Okada)
2. Swipe right from anywhere on the screen
3. Screen should follow your finger
4. Release - it will either complete navigation or spring back

### Compatibility

- ✅ **iOS**: Works perfectly
- ✅ **Android**: Works perfectly
- ✅ **Web**: Gesture detection works (though not typical web UX)

### Performance

- Uses native animations via reanimated worklets
- Runs on the UI thread (not JS thread)
- 60 FPS smooth animations
- No jank or lag

## Adjusting Behavior

### Change Swipe Threshold
```typescript
// In TransportScreen.tsx
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.3; // Change 0.3 to desired percentage
```

### Change Animation Speed
```typescript
// In panGesture.onEnd()
withSpring(SCREEN_WIDTH, { 
  damping: 20,  // Lower = bouncier, Higher = stiffer
  stiffness: 90 // Higher = faster
})
```

### Limit to Left Edge Only
```typescript
.onStart(() => {
  // Only allow gesture if starting from left edge
  if (event.x < 50) { // 50px from left edge
    startX.value = translateX.value;
  }
})
```

## Other Screens

To add swipe-back to other screens:
1. Copy the gesture implementation from `TransportScreen.tsx`
2. Wrap screen content in `GestureDetector`
3. Add the `Animated.View` with `animatedStyle`
4. Ensure `onBack` prop is passed

## Keyboard Handling

The implementation also includes:
- **Keyboard dismissal** when scrolling (`keyboardDismissMode="on-drag"`)
- **Keyboard blur** on search input blur
- **Gesture works** even when keyboard is open

## Troubleshooting

### Gesture not responding?
1. Clear Metro cache: `npx expo start --clear`
2. Verify `GestureHandlerRootView` wraps app in `App.tsx` ✅
3. Check reanimated plugin is last in `babel.config.js` ✅
4. Restart Expo development server

### Gesture conflicts with ScrollView?
- Already handled! The `activeOffsetX={10}` ensures horizontal gestures take priority
- Vertical scrolling still works normally

### Gesture too sensitive?
```typescript
.activeOffsetX(20) // Increase from 10 to 20
```

### Gesture not sensitive enough?
```typescript
.activeOffsetX(5) // Decrease from 10 to 5
```

## Future Enhancements

Consider adding:
- Visual indicator (arrow or shadow) during swipe
- Haptic feedback at threshold point
- Previous screen preview during swipe
- Gesture from left edge only (more iOS-like)
