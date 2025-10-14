import { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/cend-noise.png')} 
          style={styles.decorativeImage}
          resizeMode="contain"
        />
      </View>
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
          placeholder="eg.johndoe@email.com"
          leftIcon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Spacer16 />

        <TextInputField
          label="Password"
          placeholder="Enter your password"
          leftIcon="lock-closed-outline"
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
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  decorativeImage: {
    width: 100,
    height: 100,
    opacity: 0.7,
  },
  content: {
    paddingTop: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 0,
  },
});
