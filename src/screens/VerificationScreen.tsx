import { useState, useRef } from 'react';
import { View, StyleSheet, TextInput as RNTextInput } from 'react-native';
import {
  ScreenContainer,
  PrimaryButton,
  SecondaryButton,
  Spacer16,
  Spacer24,
} from '../components';
import { Text, useTheme } from 'react-native-paper';

interface VerificationScreenProps {
  onComplete: () => void;
  onResendCode: () => void;
  phoneNumber?: string;
}

export default function VerificationScreen({
  onComplete,
  onResendCode,
  phoneNumber = '+1 (555) 123-4567',
}: VerificationScreenProps) {
  const theme = useTheme();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(RNTextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  return (
    <ScreenContainer scrollable>
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Verification
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Enter the 6-digit code sent to
        </Text>
        <Text variant="bodyMedium" style={[styles.phone, { color: theme.colors.primary }]}>
          {phoneNumber}
        </Text>

        <Spacer24 />

        {/* OTP Input */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <RNTextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.codeInput,
                {
                  borderColor: digit
                    ? theme.colors.primary
                    : theme.colors.outline,
                  backgroundColor: theme.colors.surface,
                  color: theme.colors.onSurface,
                },
              ]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <Spacer24 />

        <PrimaryButton
          onPress={onComplete}
          disabled={!isCodeComplete}
        >
          Verify
        </PrimaryButton>

        <Spacer16 />

        <View style={styles.resendContainer}>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            Didn't receive the code?
          </Text>
          <SecondaryButton
            onPress={onResendCode}
            variant="ghost"
            style={styles.resendButton}
          >
            Resend Code
          </SecondaryButton>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 500,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    marginBottom: 4,
    textAlign: 'center',
  },
  phone: {
    textAlign: 'center',
    fontWeight: '600',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  codeInput: {
    width: 48,
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  resendContainer: {
    alignItems: 'center',
  },
  resendButton: {
    marginTop: 8,
  },
});
