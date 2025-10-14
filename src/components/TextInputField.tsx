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
import { Ionicons } from '@expo/vector-icons';

interface TextInputFieldProps extends Omit<RNTextInputProps, 'style'> {
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Left icon name (Ionicons) */
  leftIcon?: keyof typeof Ionicons.glyphMap;
  /** Right icon name (Ionicons) */
  rightIcon?: keyof typeof Ionicons.glyphMap;
  /** Right icon press handler */
  onRightIconPress?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * TextInputField - Clean, professional text input for forms
 * Matches Figma design with proper states and behavior
 * 
 * @example
 * <TextInputField
 *   label="Email"
 *   placeholder="eg.Placeholder"
 *   leftIcon="mail-outline"
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
  const hasValue = !!props.value || !!props.defaultValue;

  const hasError = !!error;
  
  // Active state: purple border (1.5px)
  // Inactive state: light gray border (1.5px)
  // Error state: red border
  const borderColor = hasError
    ? theme.colors.error
    : isFocused
    ? '#8020A2' // Purple for active state
    : 'rgba(0, 0, 0, 0.12)'; // Light gray for inactive state

  const borderWidth = 1.5;

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text variant="labelMedium" style={styles.label}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          styles.inputContainer,
          {
            borderColor,
            borderWidth,
            backgroundColor: isFocused ? '#FFFFFF' : '#F5F5F5', // White when focused, light gray when not
          },
        ]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color={isFocused ? '#8020A2' : 'rgba(0, 0, 0, 0.4)'} // Purple when focused, gray when not
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[
            styles.input,
            {
              color: '#1C1B1F', // Charcoal text color
            },
          ]}
          placeholderTextColor="rgba(0, 0, 0, 0.4)" // Gray placeholder
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} disabled={!onRightIconPress}>
            <Ionicons
              name={rightIcon}
              size={20}
              color={isFocused ? '#8020A2' : 'rgba(0, 0, 0, 0.4)'}
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
    width: '100%',
  },
  label: {
    marginBottom: 8,
    fontWeight: '500',
    fontSize: 14,
    color: '#1C1B1F', // Charcoal for label
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.5,
    borderRadius: 24, // Rounded corners but not fully rounded (matching Figma)
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 0,
    height: '100%',
  },
  leftIcon: {
    marginRight: 12,
  },
  rightIcon: {
    marginLeft: 12,
  },
  error: {
    marginTop: 6,
    marginLeft: 4,
  },
});
