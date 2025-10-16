import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';

/**
 * useAssetCache - Pre-loads and caches all app assets
 * Images and fonts are cached on app startup to prevent reloading
 */
export function useAssetCache() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    async function loadAssets() {
      try {
        // Cache images
        const imageAssets = [
          require('../../assets/adaptive-icon.png'),
          require('../../assets/cend-logo.png'),
          require('../../assets/cend-noise.png'),
          require('../../assets/favicon.png'),
          require('../../assets/icon.png'),
          require('../../assets/splash-icon.png'),
          require('../../assets/woman-in-car.png'),
          require('../../assets/illustrations/transport-head.png'),
        ];

        const cacheImages = imageAssets.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });

        // Cache fonts
        const cacheFonts = Font.loadAsync({
          // Product Sans
          'ProductSans-Regular': require('../../assets/fonts/product-sans/Product Sans Regular.ttf'),
          'ProductSans-Bold': require('../../assets/fonts/product-sans/Product Sans Bold.ttf'),
          'ProductSans-Italic': require('../../assets/fonts/product-sans/Product Sans Italic.ttf'),
          'ProductSans-BoldItalic': require('../../assets/fonts/product-sans/Product Sans Bold Italic.ttf'),
          
          // Poppins
          'Poppins-Light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
          'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
          'Poppins-SemiBold': require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
        });

        // Load all assets in parallel
        await Promise.all([...cacheImages, cacheFonts]);
        
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error loading assets:', error);
        // Still set loaded to true to prevent blocking the app
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  return assetsLoaded;
}
