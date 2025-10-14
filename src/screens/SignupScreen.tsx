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

interface SignupScreenProps {
  onComplete: () => void;
  onBackToLogin: () => void;
}

export default function SignupScreen({ onComplete, onBackToLogin }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScreenContainer scrollable>
      <Text variant="displaySmall" style={{ marginBottom: 8 }}>
        Create Account
      </Text>
      <Text variant="bodyLarge" style={{ marginBottom: 32 }}>
        Sign up to get started
      </Text>

      <TextInputField
        label="Full Name"
        placeholder="Enter your name"
        leftIcon="account-outline"
        value={name}
        onChangeText={setName}
      />

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
        label="Phone Number"
        placeholder="Enter your phone"
        leftIcon="phone-outline"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <TextInputField
        label="Password"
        placeholder="Create a password"
        leftIcon="lock-outline"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Spacer24 />

      <PrimaryButton onPress={onComplete}>
        Sign Up
      </PrimaryButton>

      <Spacer16 />

      <SecondaryButton onPress={onBackToLogin} variant="ghost">
        Already have an account? Log In
      </SecondaryButton>
    </ScreenContainer>
  );
}
