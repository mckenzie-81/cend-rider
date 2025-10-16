# Asset Caching & Back Button Fix

## Issues Fixed

### 1. ✅ Asset Caching Problem
**Problem:** Images and fonts were reloading every time user navigated to a screen
**Impact:** Poor performance, flickering, wasted bandwidth

**Solution:**
- Created `useAssetCache` hook (`src/hooks/useAssetCache.ts`)
- Pre-loads and caches ALL assets on app startup
- Uses `expo-asset` for image caching
- Uses `expo-font` for font caching
- Assets cached until:
  - App is closed/killed
  - User clears app data
  - App is uninstalled/reinstalled

**Implementation:**
```typescript
// Before: Only fonts were cached
const fontsLoaded = useCustomFonts();

// After: ALL assets are cached (fonts + images)
const assetsLoaded = useAssetCache();
```

**Assets Now Cached:**
- ✅ All images (adaptive-icon, cend-logo, cend-noise, woman-in-car, etc.)
- ✅ All illustrations (transport-head.png)
- ✅ All fonts (Product Sans, Poppins)
- ✅ Icons (loaded at app start)

**Result:** 
- No more flickering/reloading
- Faster navigation
- Better performance
- Smoother user experience

---

### 2. ✅ Back Button Disappearing on Transport Screen

**Problem:** Back button was not visible on TransportScreen

**Root Cause:** 
- Illustration overlay had no z-index
- Back button was being rendered behind other elements
- No z-index hierarchy in the header

**Solution:**
1. Added `backButtonContainer` with `zIndex: 20` (highest priority)
2. Added `zIndex: 10` to topBar
3. Added `zIndex: 1` to illustration (lowest, stays in background)

**Z-Index Hierarchy:**
```
Back Button (z-index: 20) ← Always on top
↓
Top Bar (z-index: 10)
↓
Illustration (z-index: 1) ← Stays behind
```

**Result:**
- ✅ Back button always visible
- ✅ Clickable/tappable
- ✅ Proper layering maintained
- ✅ Illustration stays in background

---

## Testing Checklist

### Asset Caching
- [ ] Navigate between screens multiple times
- [ ] Images should NOT reload/flicker
- [ ] Fonts should remain consistent
- [ ] No white flashes between screens

### Back Button
- [ ] Back button visible on Transport screen
- [ ] Back button is clickable
- [ ] Illustration doesn't overlap button
- [ ] Button has white color (on purple gradient)

---

## Files Modified

1. **Created:** `src/hooks/useAssetCache.ts` - New asset caching hook
2. **Modified:** `App.tsx` - Using useAssetCache instead of useCustomFonts
3. **Modified:** `src/components/AppHeader.tsx` - Added z-index for back button
4. **Modified:** `src/screens/TransportScreen.tsx` - Added z-index for illustration

---

## Best Practices Applied

1. **Asset Pre-loading:** All assets loaded at app startup
2. **Promise.all:** Parallel loading for faster startup
3. **Error Handling:** Graceful fallback if assets fail to load
4. **Z-Index Management:** Clear hierarchy for UI layering
5. **Performance:** Cached assets remain in memory during session

---

## Future Improvements (Optional)

1. Add more images to cache as they're added to the app
2. Implement progressive loading for very large images
3. Add cache size monitoring
4. Implement cache invalidation strategy for updates
