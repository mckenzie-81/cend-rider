import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface TextInputFieldProps extends Omit<RNTextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Left icon name (Material Community Icons) */
  leftIcon?: string;
  /** Right icon name (Material Community Icons) */
  rightIcon?: string;
  /** Right icon press handler */
  onRightIconPress?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * TextInputField - Clean, professional text input for forms
 * Apple/Google inspired design with floating label and minimal styling
 * 
 * @example
 * <TextInputField
 *   label="Email"
 *   placeholder="Enter your email"
 *   leftIcon="email-outline"
 *   value={email}
 *   onChangeText={setEmail}
 *   error={emailError}
 * />
 */
export function TextInputField({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}: TextInputFieldProps) {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const hasError = !!error;
  const borderColor = hasError
    ? theme.colors.error
    : isFocused
    ? theme.colors.primary
    : theme.colors.outline;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="labelMedium" style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            backgroundColor: theme.colors.surface,
          },
        ]}
      >
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon as any}
            size={20}
            color={theme.colors.onSurfaceVariant}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.onSurface,
            },
          ]}
          placeholderTextColor={theme.colors.onSurfaceVariant}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
            <MaterialCommunityIcons
              name={rightIcon as any}
              size={20}
              color={theme.colors.onSurfaceVariant}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {hasError && (
        <Text variant="labelSmall" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Spacing controlled by parent (use Spacer components)
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 0,
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  error: {
    marginTop: 4,
    marginLeft: 4,
  },
});
