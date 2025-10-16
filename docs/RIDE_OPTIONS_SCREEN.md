# Ride Options Screen

## 🎯 Overview
Premium ride selection screen that displays different vehicle options with pricing, inspired by modern ride-hailing apps like Uber/Bolt.

---

## ✨ Features

### 1. **Clean Header**
- Back button to return to transport screen
- "Choose a ride" title
- Pickup location display with purple dot indicator
- Minimal, clean design

### 2. **Map Preview**
- Placeholder for map integration (200px height)
- Route visualization area
- Distance and time estimate badge overlay
- Ready for Google Maps/Mapbox integration

### 3. **Ride Options Cards** 🚗
Dynamic list based on mode:

#### **Car Ride Options:**
- **Standard** - Affordable rides (~2 mins, 4 capacity, GH₵20)
- **Basic** - Everyday rides (~3 mins, 4 capacity, GH₵30)
- **Comfort** - Premium comfort (~5 mins, 4 capacity, GH₵35)
- **Luxury** - Top-tier experience (~8 mins, 3 capacity, GH₵40)

#### **Okada Options:**
- **Okada** - Quick & affordable (~2 mins, 1 capacity, GH₵15)

### 4. **Option Cards Design**
- Soft gray background (#F5F5F5)
- Vehicle icon in white square container
- Option name (bold)
- Description text
- ETA badge
- Passenger capacity indicator
- Price (bold, right-aligned)
- No borders - clean aesthetic ✨

### 5. **Selection State**
- Tapping card selects it
- Selected card:
  - Light purple background (#F5F0F7)
  - Purple border (2px, #8020A2)
  - Checkmark icon in top-right corner
- Only one option can be selected at a time

### 6. **Gradient Confirm Button**
- Appears when option is selected
- Shows: "Select [Option Name]"
- Purple gradient background
- Arrow icon
- Fixed at bottom with border separator
- Smooth fade-in animation

---

## 🔄 User Flow

```
1. User confirms locations in modal
   ↓
2. Navigate to RideOptionsScreen
   ↓
3. User sees map preview + ride options
   ↓
4. User taps a ride option (card highlights)
   ↓
5. Confirm button appears at bottom
   ↓
6. User taps "Select [Option]"
   ↓
7. Navigate to booking confirmation
```

---

## 📱 Navigation Integration

### AppNavigator State:
- `transportMode`: 'ride' | 'okada'
- `rideDetails`: { pickup, dropoff }

### Flow:
```
HomeScreen
  → Select "Ride" or "Okada"
    → TransportScreen (pre-selected mode)
      → Open booking modal
        → Confirm locations
          → RideOptionsScreen ✨
            → Select vehicle variant
              → Booking confirmation (TODO)
```

---

## 🎨 Design Specifications

### Colors:
- Background: `#FFFFFF`
- Card background: `#F5F5F5`
- Selected card bg: `#F5F0F7`
- Selected border: `#8020A2` (2px)
- Text primary: `#1C1B1F`
- Text secondary: `#666`
- Icon container: `#FFFFFF`

### Spacing:
- Card padding: 16px
- Card margin: 12px bottom
- Icon size: 32px
- Icon container: 56x56px
- Border radius: 16px (cards), 12px (icon)

### Typography:
- Option name: `titleMedium`, bold (700)
- Option type: `bodySmall`, gray (#666)
- Price: `titleMedium`, bold (700)
- Header: `titleMedium`, bold (700)

---

## 📊 Mock Data Structure

```typescript
interface RideOption {
  id: string;           // 'standard', 'basic', etc.
  name: string;         // 'Standard', 'Comfort', etc.
  type: string;         // 'Affordable rides', etc.
  time: string;         // '2 mins', '5 mins'
  capacity: number;     // 1, 3, 4
  price: string;        // 'GH₵20.00'
  icon: string;         // Ionicon name
}
```

---

## 🔧 Components Used

- `ScreenContainer` - Full screen wrapper
- `LinearGradient` - Button gradient
- `Ionicons` - Vehicle icons, UI icons
- `ScrollView` - Scrollable options list
- `TouchableOpacity` - Interactive elements

---

## 🚀 Next Steps (Future Enhancements)

1. **Map Integration**
   - Replace placeholder with Google Maps
   - Show actual route
   - Animate from pickup to dropoff

2. **Real-time Data**
   - Live vehicle availability
   - Dynamic pricing (surge pricing)
   - Accurate ETA calculations
   - Driver locations on map

3. **Enhanced Features**
   - Price breakdown tooltip
   - Vehicle photos/images
   - Driver ratings display
   - Promo code application
   - Payment method selection

4. **Animations**
   - Card entrance animations
   - Selection ripple effect
   - Button slide-up animation
   - Map zoom/pan animations

5. **Booking Confirmation**
   - Create booking confirmation screen
   - Show driver matching progress
   - Live tracking screen
   - Trip details summary

---

## ✅ Testing Checklist

- [ ] Navigate from Home → Transport → Modal → Options
- [ ] Ride mode shows 4 car options
- [ ] Okada mode shows 1 okada option
- [ ] Tapping option highlights it correctly
- [ ] Only one option can be selected
- [ ] Confirm button appears on selection
- [ ] Button shows correct option name
- [ ] Back button returns to transport screen
- [ ] Smooth transitions throughout

---

## 🎯 Design Consistency

Matches app's premium aesthetic:
- ✅ No heavy borders/strokes
- ✅ Soft gray backgrounds
- ✅ Purple accent colors
- ✅ Clean typography
- ✅ Proper spacing (16-20px)
- ✅ Smooth interactions
- ✅ Professional layout

---

Enjoy selecting your ride! 🚗✨
