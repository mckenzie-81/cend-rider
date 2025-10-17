# Searching for Driver Screen - Figma Update

## 🎨 UI Update Summary

Updated the "Searching for Driver" state in RideTrackingScreen to match the Figma design with animated ripple effects and car illustration.

---

## ✨ What Changed

### Visual Elements
1. **Replaced loading spinner** with car-on-map illustration
2. **Added animated ripple circles** (purple gradient rings)
3. **Updated text** to match Figma: "Searching for a Driver..."
4. **Changed cancel button** style and text to "Cancel Search"

### Animation Details
- **Two concentric ripple circles** that expand and fade out
- **Continuous loop animation** (2-second cycle)
- **Staggered timing** (second ripple starts 1 second after first)
- **Smooth scaling** from 1x to 1.8x for outer, 1x to 1.5x for inner

---

## 🎯 Design Specifications

### Ripple Circles
```
Outer Circle: 220px diameter
Inner Circle: 180px diameter
Color: #B794C3 (light purple)
Animation: Scale + fade out over 2 seconds
```

### Car Container
```
Size: 140px diameter
Background: #8020A2 (brand purple)
Shape: Circle
Contents: car-on-map.png (80x80px)
```

### Text
```
Title: "Searching for a Driver..."
  - Font: titleLarge
  - Weight: 700 (bold)
  - Color: #1C1B1F

Subtitle: "This may takes a few seconds"
  - Font: bodyMedium
  - Color: #666
```

### Cancel Button
```
Background: #D9BFE8 (lavender)
Text: Black (#1C1B1F)
Border Radius: 24px
Padding: 16px vertical
Text: "Cancel Search" (when searching)
      "Cancel Ride" (other states)
```

---

## 📱 Component Structure

```
SearchingContainer
├── RippleContainer
│   ├── Animated Ripple Circle 1 (outer)
│   ├── Animated Ripple Circle 2 (inner)
│   └── CarContainer
│       └── car-on-map.png
│
├── Title Text
└── Subtitle Text
```

---

## 🔄 Animation Flow

```
Loop 1 (Outer Ripple):
  Start: Scale 1.0, Opacity 1.0
  End: Scale 1.8, Opacity 0.0
  Duration: 2 seconds
  Delay: 0ms

Loop 2 (Inner Ripple):
  Start: Scale 1.0, Opacity 1.0
  End: Scale 1.5, Opacity 0.0
  Duration: 2 seconds
  Delay: 1000ms
```

---

## 💻 Code Changes

### New Imports
```typescript
import { useRef } from 'react';
import { Animated, Image } from 'react-native';
```

### New State
```typescript
const rippleAnim1 = useRef(new Animated.Value(0)).current;
const rippleAnim2 = useRef(new Animated.Value(0)).current;
const rippleOpacity1 = useRef(new Animated.Value(1)).current;
const rippleOpacity2 = useRef(new Animated.Value(1)).current;
```

### New Styles
- `searchingContainer`
- `rippleContainer`
- `rippleCircle`
- `rippleOuter`
- `rippleInner`
- `carContainer`
- `carImage`
- `searchingTitle`
- `searchingSubtitle`

### Updated Styles
- `cancelButton`: Changed background to lavender (#D9BFE8)
- `cancelButtonText`: Changed color to black, increased font size

---

## 🎨 Color Palette

```
Brand Purple:     #8020A2  (car container background)
Light Purple:     #B794C3  (ripple circles)
Lavender:         #D9BFE8  (cancel button)
Text Dark:        #1C1B1F  (title, button text)
Text Gray:        #666     (subtitle)
```

---

## ✅ Features

✅ Animated ripple effect matching Figma  
✅ Car illustration centered  
✅ Smooth continuous animation loop  
✅ Proper cleanup on unmount  
✅ Dynamic button text (Cancel Search vs Cancel Ride)  
✅ Lavender cancel button matching design  
✅ No compilation errors  

---

## 📊 Before vs After

### Before:
- Generic loading spinner
- "Finding you a driver..." text
- Trip details card visible
- Red cancel button

### After:
- ✨ Animated purple ripple circles
- ✨ Car-on-map illustration
- ✨ "Searching for a Driver..." text
- ✨ Cleaner, minimal UI
- ✨ Lavender cancel button
- ✨ Professional animation matching industry standards

---

## 🚀 Result

The searching state now perfectly matches the Figma design with:
- Professional animated ripple effect
- Clean, minimal interface
- Brand-consistent purple theme
- Smooth, continuous animations
- Better visual feedback for users

**Ready to test!** The animation will start automatically when entering the ride tracking screen in the "searching" state. 🚗✨

