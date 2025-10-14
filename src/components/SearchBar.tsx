import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SearchBarProps extends Omit<RNTextInputProps, 'style'> {
  /** Search value */
  value: string;
  /** Value change handler */
  onChangeText: (text: string) => void;
  /** Clear button press handler */
  onClear?: () => void;
  /** Filter/options button press handler */
  onFilterPress?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * SearchBar - Clean search input for home screen
 * Google/Apple Maps inspired design with subtle styling
 * 
 * @example
 * <SearchBar
 *   value={searchQuery}
 *   onChangeText={setSearchQuery}
 *   onClear={() => setSearchQuery('')}
 *   placeholder="Where to?"
 * />
 */
export function SearchBar({
  value,
  onChangeText,
  onClear,
  onFilterPress,
  placeholder = 'Where to?',
  style,
  ...props
}: SearchBarProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.outline,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name="magnify"
        size={24}
        color={theme.colors.onSurfaceVariant}
        style={styles.searchIcon}
      />

      <TextInput
        style={[
          styles.input,
          {
            color: theme.colors.onSurface,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.onSurfaceVariant}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />

      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="close-circle"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      )}

      {onFilterPress && (
        <TouchableOpacity onPress={onFilterPress} style={styles.iconButton}>
          <MaterialCommunityIcons
            name="tune-variant"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingVertical: 0,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
});
