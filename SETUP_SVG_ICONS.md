# SVG Icons Setup Guide

## ⚠️ Current Issue

SVG files can't be loaded directly with `require()` and `Image` in React Native. They need special handling.

## 🔧 Solution: Use react-native-svg-transformer

This is the standard, recommended way to handle SVG icons in Expo/React Native.

### Step 1: Install the transformer

```bash
npm install --save-dev react-native-svg-transformer
```

### Step 2: Configure Metro bundler

Create or update `metro.config.js` in your project root:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

module.exports = config;
```

### Step 3: Add TypeScript definitions

Create `custom.d.ts` in your project root:

```typescript
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
```

### Step 4: Update CustomIcon component

Replace the content of `/src/components/CustomIcon.tsx`:

```typescript
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Import SVG icons as components
import CarIcon from '../../assets/icons/car-icon.svg';
import DispatchIcon from '../../assets/icons/dispatch-icon.svg';
import OkadaIcon from '../../assets/icons/okada-icon.svg';

/**
 * Icon mapping - Maps friendly names to SVG components
 */
const iconMap = {
  car: CarIcon,
  dispatch: DispatchIcon,
  okada: OkadaIcon,
  // Add more as you get them:
  // reserve: ReserveIcon,
  // schedule: ScheduleIcon,
  // promo: PromoIcon,
  // wallet: WalletIcon,
  // support: SupportIcon,
};

export type CustomIconName = keyof typeof iconMap;
export type IconName = CustomIconName | keyof typeof Ionicons.glyphMap;

interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
}

export function CustomIcon({ name, size = 24, color = '#8020A2' }: CustomIconProps) {
  const isCustomIcon = name in iconMap;

  if (isCustomIcon) {
    const SvgIcon = iconMap[name as CustomIconName];
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <SvgIcon width={size} height={size} />
      </View>
    );
  }

  return (
    <Ionicons
      name={name as keyof typeof Ionicons.glyphMap}
      size={size}
      color={color}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

### Step 5: Restart your dev server

```bash
# Stop the current server (Ctrl+C)
# Clear cache and restart
npx expo start -c
```

## 📝 Adding New Icons (After Setup)

Once configured, adding new icons is just 2 steps:

1. **Add SVG to** `assets/icons/`
2. **Import and register** in `CustomIcon.tsx`:

```typescript
import NewIcon from '../../assets/icons/new-icon.svg';

const iconMap = {
  // ... existing icons
  'newicon': NewIcon,
};
```

That's it! The icon will work immediately.

## 🎯 Why This Approach?

✅ **Industry Standard** - Used by major React Native apps
✅ **Zero Runtime Cost** - SVGs compiled at build time  
✅ **Type Safe** - Full TypeScript support
✅ **Maintainable** - Easy to add/remove icons
✅ **Performant** - No image loading delays
✅ **Scalable** - SVGs stay crisp at any size

## 🚀 Quick Setup Commands

Run these in order:

```bash
# 1. Install transformer
npm install --save-dev react-native-svg-transformer

# 2. Create metro config (copy from above)
# 3. Create custom.d.ts (copy from above)
# 4. Update CustomIcon.tsx (copy from above)

# 5. Restart with cache clear
npx expo start -c
```

## ⚡ Alternative: Use PNG/WebP Instead

If you want a quicker solution without configuration:

1. Convert SVGs to PNG (2x and 3x resolution for retina)
2. Use `Image` component directly
3. Simpler but less flexible (no runtime scaling, larger file size)

The SVG transformer is recommended for best results!
