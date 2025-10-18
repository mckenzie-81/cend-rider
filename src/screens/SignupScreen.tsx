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

interface SignupScreenProps {
  onComplete: (phone: string) => void; // Pass phone to verification screen
  onBackToLogin: () => void;
}

export default function SignupScreen({ onComplete, onBackToLogin }: SignupScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    // Validation
    if (!fullName.trim() || !email.trim() || !phoneNumber.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Split full name into first and last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || '';

      const response = await AuthService.signup({
        email,
        phone: phoneNumber,
        password,
        firstName,
        lastName,
      });

      console.log('Signup successful:', response.user.email);
      
      // Navigate to verification screen with phone number
      onComplete(phoneNumber);
    } catch (error: any) {
      Alert.alert('Signup Failed', error.message || 'Unable to create account. Please try again.');
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
          Create Account
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Sign up to get started
        </Text>

        <Spacer24 />

                <TextInputField
          label="Full Name"
          placeholder="eg.John Doe"
          leftIcon="person-outline"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />

        <Spacer16 />

        <TextInputField
          label="Email"
          placeholder="eg.johndoe@email.com"
          leftIcon="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Spacer16 />

        <TextInputField
          label="Phone Number"
          placeholder="eg.+234 800 000 0000"
          leftIcon="call-outline"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <Spacer16 />

                <TextInputField
          label="Password"
          placeholder="Enter your password"
          leftIcon="lock-closed-outline"
          rightIcon={showPassword ? 'eye-outline' : 'eye-off-outline'}
          onRightIconPress={() => setShowPassword(!showPassword)}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <Spacer24 />

        <PrimaryButton onPress={handleSignup} loading={loading} disabled={loading}>
          {loading ? 'Creating Account...' : 'Sign Up'}
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
    paddingVertical: 24,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 0,
  },
});
