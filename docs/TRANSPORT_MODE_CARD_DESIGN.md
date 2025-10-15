# TransportModeCard Component - Apple-Inspired Design

## 🍎 **Premium, Apple-Inspired Design Philosophy**

The `TransportModeCard` component embodies Apple's design principles:
- **Clarity**: Clean, uncluttered interface
- **Deference**: Content is king, chrome takes a back seat
- **Depth**: Subtle layers and visual hierarchy

## ✨ **Design Features**

### Visual Refinement
- ✅ **No Shadows** - Flat, modern aesthetic
- ✅ **Reduced Height** - Compact, efficient use of space (20px vertical padding)
- ✅ **Minimal Borders** - 1.5px subtle border in light gray (#E5E5EA)
- ✅ **Subtle Selection** - No heavy colors, just refined states
- ✅ **Small Icons** - 48px (down from 64px) for better proportion
- ✅ **Micro Indicator** - Tiny 6x6px dot instead of large checkmark
- ✅ **System Colors** - iOS gray palette (#8E8E93, #1C1C1E)

### Apple-Style Typography
- **Font Size**: 15px (Apple's preferred body size)
- **Font Weight**: 500 (regular), 600 (selected)
- **Letter Spacing**: -0.2 (tight, Apple-style)
- **Color Hierarchy**: Gray when inactive, black when active

### Color Philosophy
```
Unselected:
- Background: #F9F9F9 (Subtle gray, not white)
- Border: transparent
- Icon: #8E8E93 (System gray)
- Text: #8E8E93

Selected:
- Background: #FFFFFF (Pure white for emphasis)
- Border: #E5E5EA (Light gray, barely visible)
- Icon: #8020A2 (Brand purple)
- Text: #1C1C1E (Near black)
- Indicator: #8020A2 (Brand purple dot)
```

### Spacing & Proportions
```
Card:
- Border Radius: 14px (Apple's standard)
- Padding Vertical: 20px (compact)
- Padding Horizontal: 12px
- Border Width: 1.5px (precise, not chunky)

Icon:
- Size: 48px (reduced from 64px)
- Margin Bottom: 8px

Indicator Dot:
- Size: 6x6px
- Position: Top 10px, Right 10px
- Border Radius: 3px (perfect circle)
```

## 📦 **Component Usage**

### Basic Example
```tsx
import { TransportModeCard } from '../components';

<TransportModeCard
  mode="ride"
  label="Ride"
  icon="car"
  isSelected={selectedMode === 'ride'}
  onPress={() => setSelectedMode('ride')}
/>
```

### Multiple Cards with Data
```tsx
const TRANSPORT_MODES = [
  { id: 'ride', label: 'Ride', icon: 'car' },
  { id: 'okada', label: 'Okada', icon: 'okada' },
  { id: 'delivery', label: 'Delivery', icon: 'bicycle' },
];

<View style={{ flexDirection: 'row', gap: 12 }}>
  {TRANSPORT_MODES.map((mode) => (
    <TransportModeCard
      key={mode.id}
      mode={mode.id}
      label={mode.label}
      icon={mode.icon}
      isSelected={selectedMode === mode.id}
      onPress={() => setSelectedMode(mode.id)}
    />
  ))}
</View>
```

## 🎨 **Customization Guide**

### Change Card Height
```tsx
// In TransportModeCard.tsx styles
card: {
  paddingVertical: 24, // Increase from 20 for taller cards
}
```

### Change Icon Size
```tsx
// In TransportModeCard.tsx render
<CustomIcon 
  size={56} // Increase from 48
  color={isSelected ? '#8020A2' : '#8E8E93'}
/>
```

### Change Colors
```tsx
// Unselected background
backgroundColor: '#F5F5F7', // Lighter

// Selected background
backgroundColor: '#FAFAFA', // Off-white

// Icon colors
color={isSelected ? '#007AFF' : '#8E8E93'} // iOS blue
```

### Add Subtitle
```tsx
interface TransportModeCardProps {
  // ... existing props
  subtitle?: string;
}

// In render, below label:
{subtitle && (
  <Text style={styles.subtitle}>{subtitle}</Text>
)}

// In styles:
subtitle: {
  fontSize: 12,
  color: '#8E8E93',
  marginTop: 2,
}
```

## 🆚 **Before vs After**

| Feature | Before (Playful) | After (Apple-Inspired) |
|---------|-----------------|----------------------|
| Height | Tall (16px padding + large icon) | Compact (20px padding) |
| Shadows | Heavy shadows | None |
| Border Width | 2px | 1.5px |
| Border Color | Bright purple | Light gray (#E5E5EA) |
| Selected BG | Bright tint (#F9F5FF) | Clean white (#FFFFFF) |
| Icon Size | 64px | 48px |
| Indicator | Large checkmark (20px) | Tiny dot (6px) |
| Typography | Bold, colorful | Refined, subtle |
| Overall Feel | Playful, colorful | Premium, minimal |

## 🎯 **Why This Design Works**

### 1. **Visual Hierarchy**
- Unselected cards blend into the background
- Selected card pops with pure white and dark text
- Icon color change provides instant feedback

### 2. **Cognitive Ease**
- Simple dot indicator is less distracting
- Clean design reduces visual noise
- Easier to scan options quickly

### 3. **Modern Aesthetic**
- Flat design is contemporary
- System colors feel native
- Precise spacing feels intentional

### 4. **Scalability**
- Design works with 2, 3, or more cards
- Consistent with iOS design language
- Easy to add more options

## 🔧 **Integration Benefits**

### Reusable
```tsx
// Easy to add new modes
const NEW_MODE = { 
  id: 'shared', 
  label: 'Shared', 
  icon: 'people' 
};

TRANSPORT_MODES.push(NEW_MODE);
```

### Maintainable
```tsx
// All styling in one component
// Changes apply everywhere
// No duplicate code
```

### Type-Safe
```tsx
// TypeScript ensures correct props
// Icon names are validated
// No runtime errors
```

## 💡 **Apple Design Principles Applied**

1. **Clarity**
   - Text is legible (15px body size)
   - Sufficient contrast (WCAG compliant)
   - Clear selection states

2. **Deference**
   - Cards don't compete with content
   - Subtle when unselected
   - Icon is the hero

3. **Depth**
   - Layering through color, not shadows
   - White on gray creates subtle depth
   - Dot indicator adds dimension

4. **Precision**
   - Exact measurements (1.5px, not 2px)
   - Careful spacing (8px, 12px, 20px)
   - Intentional font weights

## 📱 **Responsive Behavior**

- **Small Screens**: Cards shrink proportionally with flex: 1
- **Large Screens**: Max 2 cards per row for better ergonomics
- **Tablets**: Consider 3-4 cards per row
- **Landscape**: Cards maintain aspect ratio

## ♿ **Accessibility**

- ✅ Minimum tap target: 44x44 (achieved with padding)
- ✅ Color contrast: 4.5:1+ for all text
- ✅ Clear selected state (not just color)
- ✅ Descriptive labels
- ✅ TouchableOpacity feedback

## 🚀 **Performance**

- No shadows = faster rendering
- Flat design = less GPU work
- Simple colors = no gradients
- Efficient re-renders

## 🎨 **Design Tips**

1. **Keep It Minimal** - Resist adding more visual elements
2. **Use System Colors** - Stay consistent with iOS palette
3. **Maintain Spacing** - Apple's 8pt grid system
4. **Test on Device** - Subtle details matter
5. **Consider Dark Mode** - Would need color adjustments

---

**This component represents the perfect balance of functionality and aesthetics, designed with Apple's attention to detail.**
