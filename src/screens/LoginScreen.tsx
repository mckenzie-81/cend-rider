import { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import {
  ScreenContainer,
  PrimaryButton,
  SecondaryButton,
  TextInputField,
  Spacer16,
  Spacer24,
} from '../components';
import { Text } from 'react-native-paper';
import { AuthService } from '../services/auth.service';

interface LoginScreenProps {
  onComplete: () => void;
  onSignup: () => void;
}

export default function LoginScreen({ onComplete, onSignup }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Validation
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const response = await AuthService.login({ email, password });
      
      // Store tokens (in real app, use secure storage)
      console.log('Login successful:', response.user.email);
      
      // Navigate to main app
      onComplete();
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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

        <PrimaryButton onPress={handleLogin} loading={loading} disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
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
