import { useEffect, useState } from 'react';
import { Image, StyleSheet, View, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Keep the native splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

interface SplashScreenProps {
  onFinish: () => void;
}

export default function CustomSplashScreen({ onFinish }: SplashScreenProps) {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    async function prepare() {
      try {
        // Show fade-in animation
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();

        // Keep splash visible for minimum 10 seconds
        await new Promise(resolve => setTimeout(resolve, 10000));

        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      } catch (e) {
        console.warn('Splash screen error:', e);
        onFinish();
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fadeAnim, onFinish]);

  return (
    <View style={styles.container}>
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
    backgroundColor: '#8020A2',
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
