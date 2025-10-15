# Gesture Support Documentation

This document outlines all gesture implementations in the Cend Rider app.

## ✅ Implemented Gestures

### 1. **Swipe Back Navigation** (Android)
- **Location**: `app.json`
- **Status**: ✅ Enabled
- **Configuration**: `predictiveBackGestureEnabled: true`
- **Behavior**: Users can swipe from the left edge to go back on Android (iOS has this natively)

### 2. **Keyboard Dismissal**
- **Location**: `TransportScreen.tsx`
- **Status**: ✅ Implemented
- **Implementation**: Wrapped content in `TouchableWithoutFeedback` with `Keyboard.dismiss`
- **Behavior**: Tap anywhere outside the keyboard to dismiss it

### 3. **Swipeable Cards**
- **Component**: `SwipeableCard.tsx`
- **Status**: ✅ Ready to use
- **Features**:
  - Swipe left to reveal actions
  - Customizable favorite and info buttons
  - Smooth animations with friction control
  - Can be disabled via `enableSwipe` prop

**Usage Example:**
```tsx
import { SwipeableCard } from '../components';

<SwipeableCard 
  onFavorite={() => console.log('Added to favorites')}
  onInfo={() => console.log('Show info')}
>
  <ServiceCard title="Ride" icon="car" />
</SwipeableCard>
```

### 4. **Gesture Hooks**
- **File**: `src/hooks/useGestures.ts`
- **Status**: ✅ Ready to use

**Available Hooks:**

#### `usePullToRefresh`
```tsx
const { refreshing, onRefresh } = usePullToRefresh(async () => {
  await fetchData();
});

<ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }
>
  {content}
</ScrollView>
```

#### `useLongPress`
```tsx
const longPressHandlers = useLongPress(() => {
  showContextMenu();
}, 500); // 500ms duration

<TouchableOpacity {...longPressHandlers}>
  <Text>Press and hold</Text>
</TouchableOpacity>
```

#### `useKeyboardDismiss`
```tsx
const { dismissKeyboard } = useKeyboardDismiss();

<TouchableWithoutFeedback onPress={dismissKeyboard}>
  <View>...</View>
</TouchableWithoutFeedback>
```

## 📦 Dependencies

- ✅ **react-native-gesture-handler** (v2.28.0) - Installed and configured
- ✅ **GestureHandlerRootView** - Properly wrapped in App.tsx
- ⚠️ **react-native-reanimated** - Optional for advanced animations

## 🎯 Common Gesture Patterns

### Basic Gestures (Already Available)
- ✅ Tap/Press - `TouchableOpacity`, `Pressable`
- ✅ Long Press - `useLongPress` hook
- ✅ Swipe - `Swipeable` component
- ✅ Keyboard Dismiss - Implemented in screens

### Advanced Gestures (Can be added when needed)
- ⏳ Pan/Drag - Use `PanGestureHandler` for draggable elements
- ⏳ Pinch to Zoom - Use `PinchGestureHandler` for maps/images
- ⏳ Double Tap - Use `TapGestureHandler` with `numberOfTaps={2}`
- ⏳ Rotation - Use `RotationGestureHandler` for image manipulation

## 🚀 How to Add Gestures to Existing Components

### Example: Add Swipe to Service Cards

**Before:**
```tsx
<ServiceCard 
  title="Ride" 
  subtitle="Quick and affordable" 
  icon="car" 
/>
```

**After:**
```tsx
import { SwipeableCard } from '../components';

<SwipeableCard 
  onFavorite={() => addToFavorites('ride')}
  onInfo={() => showServiceInfo('ride')}
>
  <ServiceCard 
    title="Ride" 
    subtitle="Quick and affordable" 
    icon="car" 
  />
</SwipeableCard>
```

### Example: Add Pull-to-Refresh to a List

```tsx
import { usePullToRefresh } from '../hooks/useGestures';
import { ScrollView, RefreshControl } from 'react-native';

function MyScreen() {
  const { refreshing, onRefresh } = usePullToRefresh(async () => {
    await loadData();
  });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh}
          tintColor="#8020A2"
          colors={["#8020A2"]}
        />
      }
    >
      {/* Your content */}
    </ScrollView>
  );
}
```

## 🎨 Customization

### SwipeableCard Actions
You can customize the swipe actions by modifying `SwipeableCard.tsx`:
- Add more action buttons
- Change colors
- Adjust animation friction
- Modify swipe threshold

### Gesture Sensitivity
Most gesture components accept these common props:
- `friction` - How much resistance (higher = slower)
- `overshoot` - Allow swiping past threshold
- `activeOffsetX/Y` - Distance needed to activate
- `failOffsetX/Y` - Distance that cancels gesture

## 🧪 Testing Gestures

### iOS
- Swipe from left edge to go back (native)
- Tap outside keyboard to dismiss
- Swipe left on cards to reveal actions

### Android
- Swipe from left edge to go back (enabled)
- Tap outside keyboard to dismiss
- Swipe left on cards to reveal actions
- System back button works everywhere

## 📝 Best Practices

1. **Always wrap app in GestureHandlerRootView** ✅ (Already done in App.tsx)
2. **Import gesture-handler first** ✅ (Already done at top of App.tsx)
3. **Use TouchableOpacity for simple taps** - Better performance than gesture handlers
4. **Use gesture handlers for complex gestures** - Pan, swipe, pinch, etc.
5. **Test on real devices** - Gestures feel different on physical devices
6. **Provide visual feedback** - Show users that gestures are possible
7. **Don't overuse gestures** - Keep UI intuitive and discoverable

## 🔮 Future Enhancements

When needed, consider adding:
- Drag-to-reorder lists
- Swipe between tabs
- Bottom sheet with drag
- Pinch-to-zoom on images
- Double-tap to like
- Hold to preview
- Shake to undo/feedback

## 🐛 Troubleshooting

### Gestures not working?
1. Check `GestureHandlerRootView` wraps your app
2. Verify `import 'react-native-gesture-handler'` is at top of App.tsx
3. Ensure no conflicting ScrollViews (use `waitFor` or `simultaneousHandlers`)
4. Check gesture handler version compatibility

### Keyboard not dismissing?
1. Ensure `Keyboard.dismiss()` is imported from 'react-native'
2. Check TouchableWithoutFeedback doesn't have `disabled` prop
3. Verify no nested touchables blocking the gesture

### Swipe feels laggy?
1. Add `react-native-reanimated` for smoother animations
2. Reduce friction value (default is 2, try 1.5)
3. Enable native driver in animations
4. Check for expensive renders during swipe
