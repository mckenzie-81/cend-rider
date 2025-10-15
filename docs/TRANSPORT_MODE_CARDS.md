# Transport Mode Cards - Implementation Guide

## ✅ **Implemented: Transport Mode Selection Cards**

Two cards have been added to the Transport screen below the search bar for selecting between Ride (car) and Okada (motorcycle).

## 🎨 **Current Implementation**

### Features
- ✅ Two side-by-side cards (Ride and Okada)
- ✅ Visual selection state with border highlight
- ✅ Background color change when selected
- ✅ Checkmark indicator on selected card
- ✅ Icon color changes based on selection
- ✅ Smooth tap feedback
- ✅ Using CustomIcon SVGs (car and okada)

### Design Details
- **Card Size**: Equal width, responsive
- **Border**: 2px, gray when unselected, purple (#8020A2) when selected
- **Background**: White when unselected, light purple (#F9F5FF) when selected
- **Icon Size**: 64px
- **Icon Color**: Gray (#666) when unselected, purple (#8020A2) when selected
- **Spacing**: 16px gap between cards
- **Border Radius**: 16px for rounded corners
- **Shadow**: Subtle elevation for depth

## 🖼️ **Using 3D Images (When Available)**

Currently using SVG icons. To switch to 3D images like in Figma:

### 1. Add Images to Project
Place your 3D images in:
```
assets/illustrations/
  ├── car-3d.png
  └── bike-3d.png
```

### 2. Update the Code
In `TransportScreen.tsx`, replace the CustomIcon components:

**Change this:**
```tsx
<CustomIcon 
  name="car" 
  size={64} 
  color={selectedMode === 'ride' ? '#8020A2' : '#666'}
/>
```

**To this:**
```tsx
<Image 
  source={require('../../assets/illustrations/car-3d.png')}
  style={styles.modeImage}
  resizeMode="contain"
/>
```

**And add this style:**
```tsx
modeImage: {
  width: 90,
  height: 70,
},
```

### 3. Recommended Image Specs
- **Format**: PNG with transparency
- **Size**: 300x300px @ 3x (or 150x150px @ 2x)
- **Style**: 3D rendered, isometric view
- **Background**: Transparent
- **Colors**: Match brand colors when possible

## 🎯 **User Interaction**

1. **Default**: "Ride" is selected by default
2. **Tap to Select**: User taps either card to switch mode
3. **Visual Feedback**:
   - Border changes from gray to purple
   - Background tints light purple
   - Icon changes from gray to purple
   - Checkmark appears in top-right corner
4. **State Tracking**: Selected mode is logged to console

## 🎨 **Customization Options**

### Change Colors
```tsx
// Selected border color
borderColor: '#8020A2', // Change to your brand color

// Selected background
backgroundColor: '#F9F5FF', // Light tint of brand color

// Unselected border
borderColor: '#E0E0E0', // Light gray
```

### Change Card Size
```tsx
modeCard: {
  flex: 1, // Equal width
  padding: 20, // Increase for larger cards
},

modeImageContainer: {
  height: 100, // Increase for taller cards
},
```

### Change Icon Size
```tsx
<CustomIcon 
  size={72} // Increase from 64 for larger icons
/>
```

### Add More Cards
To add a third option (e.g., "Delivery"):

1. Update the type:
```tsx
const [selectedMode, setSelectedMode] = useState<'ride' | 'okada' | 'delivery'>('ride');
```

2. Add another card in the JSX:
```tsx
<TouchableOpacity 
  style={[
    styles.modeCard,
    selectedMode === 'delivery' && styles.modeCardSelected
  ]}
  onPress={() => handleModeSelect('delivery')}
>
  <CustomIcon name="bicycle" size={64} />
  <Text>Delivery</Text>
</TouchableOpacity>
```

3. Adjust flex layout:
```tsx
modesContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap', // Allow wrapping for 3+ cards
  gap: 12, // Smaller gap for 3+ cards
},
```

## 🚀 **Next Steps**

### Current State
- ✅ Cards are fully functional with SVG icons
- ✅ Selection state is tracked
- ✅ Visual feedback is polished

### When 3D Images Are Ready
1. Add PNG files to `assets/illustrations/`
2. Replace CustomIcon with Image components
3. Test on device to ensure images look good
4. Adjust `modeImage` style if needed for sizing

### Integration with Booking Flow
To use the selected mode in booking:

```tsx
const handleContinue = () => {
  console.log('Booking with mode:', selectedMode);
  // Pass selectedMode to booking screen
  // onNavigate('booking', { mode: selectedMode });
};
```

## 💡 **Design Tips**

1. **Icon Style**: Keep consistent with home screen service cards
2. **Selection Feedback**: Current implementation matches iOS/Material Design patterns
3. **Accessibility**: Cards have good tap targets (minimum 44x44)
4. **Visual Hierarchy**: Selected state is clear but not overwhelming
5. **Spacing**: Proper spacing ensures cards don't feel cramped

## 📱 **Responsive Behavior**

- **Small Screens**: Cards shrink proportionally
- **Large Screens**: Cards maintain aspect ratio
- **Tablets**: Consider using `maxWidth` on cards
- **Landscape**: Cards remain side-by-side

---

**The cards are ready to use! Just reload the app and navigate to the Transport screen to see them.**
