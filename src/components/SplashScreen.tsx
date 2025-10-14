import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface SplashScreenProps {
  onFinish: () => void;
}

export default function CustomSplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [backgroundColor, setBackgroundColor] = useState('#995FAF');

  useEffect(() => {
    async function prepare() {
      try {
        // Hide native splash immediately, show our custom one
        await SplashScreen.hideAsync();

        // Wait 2 seconds with light purple background
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Change to deep purple
        setBackgroundColor('#8020A2');

        // Wait another 2 seconds (total 4 seconds)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      } catch (e) {
        console.warn('Splash screen error:', e);
        onFinish();
      }
    }

    prepare();
  }, [fadeAnim, onFinish]);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <Image
          source={require('../../assets/cend-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    width: '60%',
    aspectRatio: 1,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});
