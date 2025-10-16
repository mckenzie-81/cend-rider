import { useState } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { PrimaryButton, SecondaryButton } from '../components';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const theme = useTheme();
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    {
      title: "Your Ride,\nYour Way",
      subtitle: "From quick okada trips to comfortable car rides,\nwe've got every journey covered",
      image: require('../../assets/illustrations/onboarding1.png'),
      gradient: ['#8020A2', '#995FAF'] as const,
    },
    {
      title: "Ride with\nConfidence",
      subtitle: "Verified drivers, real-time tracking, and safe rides—\nevery time you travel with us",
      image: require('../../assets/illustrations/onboarding2.png'),
      gradient: ['#6B1A8F', '#8020A2'] as const,
    },
  ];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const isLastScreen = currentScreen === screens.length - 1;
  const currentScreenData = screens[currentScreen];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={currentScreenData.gradient}
        style={styles.gradientBackground}
      >
        {/* Skip Button */}
        <View style={styles.topBar}>
          <SecondaryButton 
            onPress={onComplete} 
            variant="ghost" 
            style={styles.skipButton}
            textStyle={styles.skipButtonText}
          >
            Skip
          </SecondaryButton>
        </View>

        {/* Illustration */}
        <View style={styles.illustrationContainer}>
          <Image 
            source={currentScreenData.image} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Progress Dots */}
          <View style={styles.dotsContainer}>
            {screens.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  index === currentScreen && styles.activeDot,
                ]}
              />
            ))}
          </View>

          <Text variant="displaySmall" style={styles.title}>
            {currentScreenData.title}
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            {currentScreenData.subtitle}
          </Text>

          {/* Next/Get Started Button */}
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={handleNext}>
              {isLastScreen ? 'Get Started' : 'Next'}
            </PrimaryButton>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  skipButton: {
    width: 'auto',
    paddingHorizontal: 0,
  },
  skipButtonText: {
    color: '#FFFFFF',
    opacity: 0.8,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 0,
  },
  illustration: {
    width: SCREEN_WIDTH * 1,
    height: SCREEN_HEIGHT * 0.6,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 24,
    minHeight: SCREEN_HEIGHT * 0.40,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  activeDot: {
    width: 32,
    backgroundColor: '#8020A2',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
    color: '#1C1B1F',
    lineHeight: 40,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});
