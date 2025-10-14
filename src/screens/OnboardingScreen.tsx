import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentScreen, setCurrentScreen] = useState(0);

  const screens = ['Welcome to CEND', 'Safe & Reliable'];

  const handleNext = () => {
    if (currentScreen < screens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    } else {
      onComplete();
    }
  };

  const isLastScreen = currentScreen === screens.length - 1;

  return (
    <View style={styles.container}>
      <Button mode="text" onPress={onComplete} style={styles.skip}>
        Skip
      </Button>

      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.text}>
          {screens[currentScreen]}
        </Text>
      </View>

      <View style={styles.dots}>
        {screens.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentScreen && styles.activeDot]}
          />
        ))}
      </View>

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        {isLastScreen ? 'Get Started' : 'Next'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  skip: {
    alignSelf: 'flex-end',
    marginTop: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#DAC1E3',
  },
  activeDot: {
    backgroundColor: '#8020A2',
    width: 24,
  },
  button: {
    marginBottom: 40,
  },
});
