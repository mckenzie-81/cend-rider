import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PrimaryButton, SecondaryButton } from '../components';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const theme = useTheme();
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = [
    { title: 'Welcome to CEND', subtitle: 'Your trusted ride partner' },
    { title: 'Safe & Reliable', subtitle: 'Verified drivers, secure rides' },
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
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['top', 'bottom']}>
      {/* Skip Button */}
      <View style={styles.topBar}>
        <SecondaryButton onPress={onComplete} variant="ghost" style={styles.skipButton}>
          Skip
        </SecondaryButton>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text variant="displayMedium" style={styles.title}>
          {currentScreenData.title}
        </Text>
        <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
          {currentScreenData.subtitle}
        </Text>
      </View>

      {/* Progress Dots */}
      <View style={styles.dotsContainer}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: theme.colors.surfaceVariant },
              index === currentScreen && [
                styles.activeDot,
                { backgroundColor: theme.colors.primary },
              ],
            ]}
          />
        ))}
      </View>

      {/* Next/Get Started Button */}
      <View style={styles.buttonContainer}>
        <PrimaryButton onPress={handleNext}>
          {isLastScreen ? 'Get Started' : 'Next'}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    alignItems: 'flex-end',
    paddingTop: 16,
    paddingHorizontal: 20,
  },
  skipButton: {
    width: 'auto',
    paddingHorizontal: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
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
  },
  activeDot: {
    width: 24,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
});
