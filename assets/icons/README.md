# Custom Icons Guide

This folder contains custom SVG icons for the Cend Rider app.

## How to Add New Icons

Adding new icons is simple and requires only 2 steps:

### Step 1: Add Your SVG File
- Place your `.svg` file in this folder (`assets/icons/`)
- Use a descriptive name like `schedule-icon.svg`, `wallet-icon.svg`, etc.

### Step 2: Register the Icon
- Open `/src/components/CustomIcon.tsx`
- Add your icon to the `iconMap` object:

```typescript
const iconMap = {
  // Existing icons
  'car': require('../../assets/icons/car-icon.svg'),
  'dispatch': require('../../assets/icons/dispatch-icon.svg'),
  'okada': require('../../assets/icons/okada-icon.svg'),
  
  // Add your new icon here:
  'schedule': require('../../assets/icons/schedule-icon.svg'),
  'wallet': require('../../assets/icons/wallet-icon.svg'),
};
```

### Step 3: Use It!
That's it! Now you can use your icon anywhere in the app:

```tsx
<CustomIcon name="schedule" size={32} />
<ServiceCard icon="wallet" title="Wallet" onPress={handleWallet} />
```

## Current Icons

✅ **Available:**
- `car` - Car/Ride service icon
- `dispatch` - Dispatch/Delivery icon
- `okada` - Motorcycle/Okada icon

🔜 **Coming Soon** (add these as you get them):
- `reserve` - Reservation icon
- `schedule` - Schedule/Time icon
- `promo` - Promotion/Discount icon
- `wallet` - Wallet/Payment icon
- `support` - Support/Help icon

## Fallback Behavior

If an icon isn't found in the custom icons, the system automatically falls back to **Ionicons**. This means you can use any Ionicons name (like `calendar-outline`, `time-outline`, etc.) and it will just work!

## Icon Naming Convention

For consistency, use this naming pattern:
- Icon file: `feature-icon.svg` (e.g., `wallet-icon.svg`)
- Icon name in code: `feature` (e.g., `wallet`)

## Notes

- SVGs maintain their original colors (no color override)
- Ionicons support color customization via the `color` prop
- Icons are automatically sized based on the `size` prop
- All icons are loaded at build time (no runtime loading)
