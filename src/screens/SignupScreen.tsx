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

interface SignupScreenProps {
  onComplete: () => void;
  onBackToLogin: () => void;
}

export default function SignupScreen({ onComplete, onBackToLogin }: SignupScreenProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
