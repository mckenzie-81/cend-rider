import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  ScreenContainer,
  PrimaryButton,
  SecondaryButton,
  TextInputField,
  Spacer16,
  Spacer24,
} from '../components';
import { Text } from 'react-native-paper';

interface LoginScreenProps {
  onComplete: () => void;
  onSignup: () => void;
}

export default function LoginScreen({ onComplete, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome Back
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign in to continue
        </Text>

        <Spacer24 />

        <TextInputField
          label="Email"
          placeholder="Enter your email"
          leftIcon="email-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Spacer16 />

        <TextInputField
          label="Password"
          placeholder="Enter your password"
          leftIcon="lock-outline"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Spacer24 />

        <PrimaryButton onPress={onComplete}>
          Log In
        </PrimaryButton>

        <Spacer16 />

        <SecondaryButton onPress={onSignup} variant="ghost" fullWidth>
          Don't have an account? Sign Up
        </SecondaryButton>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 0,
  },
});
