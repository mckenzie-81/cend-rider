import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface SignupScreenProps {
  onComplete: () => void;
  onBackToLogin: () => void;
}

export default function SignupScreen({ onComplete, onBackToLogin }: SignupScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.text}>
        This is the "Signup Screen"
      </Text>
      
      <Button mode="contained" onPress={onComplete} style={styles.button}>
        Sign Up
      </Button>

      <Button mode="text" onPress={onBackToLogin} style={styles.backButton}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#000000',
    textAlign: 'center',
  },
  button: {
    marginTop: 40,
  },
  backButton: {
    marginTop: 20,
  },
});
