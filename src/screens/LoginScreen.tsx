import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

interface LoginScreenProps {
  onComplete: () => void;
}

export default function LoginScreen({ onComplete }: LoginScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.text}>
        This is the "Login Screen"
      </Text>
      
      <Button mode="contained" onPress={onComplete} style={styles.button}>
        Login
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
});
