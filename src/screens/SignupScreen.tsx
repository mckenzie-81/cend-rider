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
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Create Account
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign up to get started
        </Text>

        <Spacer24 />

        <TextInputField
          label="Full Name"
          placeholder="Enter your name"
          leftIcon="account-outline"
          value={name}
          onChangeText={setName}
        />

        <Spacer16 />

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
          label="Phone Number"
          placeholder="Enter your phone"
          leftIcon="phone-outline"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <Spacer16 />

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

        <SecondaryButton onPress={onBackToLogin} variant="ghost" fullWidth>
          Already have an account? Log In
        </SecondaryButton>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 0,
  },
});
