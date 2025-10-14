import { useState } from 'react';
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
      <Text variant="displaySmall" style={{ marginBottom: 8 }}>
        Welcome Back
      </Text>
      <Text variant="bodyLarge" style={{ marginBottom: 32 }}>
        Sign in to continue
      </Text>

      <TextInputField
        label="Email"
        placeholder="Enter your email"
        leftIcon="email-outline"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

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

      <SecondaryButton onPress={onSignup} variant="ghost">
        Don't have an account? Sign Up
      </SecondaryButton>
    </ScreenContainer>
  );
}
