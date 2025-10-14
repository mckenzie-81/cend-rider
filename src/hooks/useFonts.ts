import { useEffect, useState } from 'react';
import * as Font from 'expo-font';

export function useCustomFonts() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // Product Sans variants (note: file names have spaces)
          'ProductSans-Regular': require('../../assets/fonts/product-sans/Product Sans Regular.ttf'),
          'ProductSans-Bold': require('../../assets/fonts/product-sans/Product Sans Bold.ttf'),
          'ProductSans-Italic': require('../../assets/fonts/product-sans/Product Sans Italic.ttf'),
          'ProductSans-BoldItalic': require('../../assets/fonts/product-sans/Product Sans Bold Italic.ttf'),
          
          // Poppins variants
          'Poppins-Regular': require('../../assets/fonts/Poppins/Poppins-Regular.ttf'),
          'Poppins-Bold': require('../../assets/fonts/Poppins/Poppins-Bold.ttf'),
          'Poppins-SemiBold': require('../../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'Poppins-Medium': require('../../assets/fonts/Poppins/Poppins-Medium.ttf'),
          'Poppins-Light': require('../../assets/fonts/Poppins/Poppins-Light.ttf'),
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }

    loadFonts();
  }, []);

  return fontsLoaded;
}
