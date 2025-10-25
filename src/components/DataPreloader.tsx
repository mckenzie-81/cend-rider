import { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { CacheService } from '../services/cache.service';

interface DataPreloaderProps {
  onComplete: () => void;
}

/**
 * DataPreloader - Shows a loading screen while preloading app data
 * This ensures smooth experience by loading all data before showing home screen
 */
const DataPreloader = ({ onComplete }: DataPreloaderProps) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading...');
  const fadeAnim = useState(new Animated.Value(0))[0];
  const scaleAnim = useState(new Animated.Value(0.8))[0];

  useEffect(() => {
    // Fade in animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Start preloading
    preloadData();
  }, []);

  const preloadData = async () => {
    try {
      // Simulate progress updates for better UX
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      // Update loading text
      setTimeout(() => setLoadingText('Loading services...'), 200);
      setTimeout(() => setLoadingText('Loading promotions...'), 500);
      setTimeout(() => setLoadingText('Loading your data...'), 800);

      // Preload all data
      await CacheService.preloadAppData();

      // Complete progress
      clearInterval(progressInterval);
      setProgress(100);
      setLoadingText('Ready!');

      // Short delay before completing
      setTimeout(() => {
        // Fade out
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onComplete();
        });
      }, 300);
    } catch (error) {
      console.error('Preload error:', error);
      // Even if preload fails, continue to app
      setProgress(100);
      setLoadingText('Ready!');
      setTimeout(onComplete, 500);
    }
  };

  return (
    <LinearGradient colors={['#8020A2', '#995FAF']} style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo or App Name */}
        <View style={styles.logoContainer}>
          <Text variant="displayLarge" style={styles.logoText}>
            cend
          </Text>
          <Text variant="bodyLarge" style={styles.tagline}>
            Your ride, delivered
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text variant="bodySmall" style={styles.loadingText}>
            {loadingText}
          </Text>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

export default DataPreloader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    width: '80%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 56,
    marginBottom: 8,
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '400',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  loadingText: {
    color: '#FFFFFF',
    marginTop: 16,
    opacity: 0.8,
  },
});
