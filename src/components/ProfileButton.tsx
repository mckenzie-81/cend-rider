import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface ProfileButtonProps {
  /** User's profile photo URL */
  photoUrl?: string;
  /** Press handler */
  onPress: () => void;
  /** Show notification badge */
  showBadge?: boolean;
  /** Custom container style */
  style?: ViewStyle;
}

/**
 * ProfileButton - Avatar or icon in top right
 * Links to profile/settings with optional notification badge
 * 
 * @example
 * // With photo
 * <ProfileButton
 *   photoUrl="https://example.com/avatar.jpg"
 *   onPress={handleProfile}
 *   showBadge={hasNotifications}
 * />
 * 
 * // Without photo (icon fallback)
 * <ProfileButton onPress={handleProfile} />
 */
export function ProfileButton({
  photoUrl,
  onPress,
  showBadge = false,
  style,
}: ProfileButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, style]}
    >
      {photoUrl ? (
        <Image source={{ uri: photoUrl }} style={styles.photo} />
      ) : (
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <MaterialCommunityIcons
            name="account"
            size={20}
            color={theme.colors.onSurfaceVariant}
          />
        </View>
      )}

      {showBadge && (
        <View
          style={[
            styles.badge,
            { backgroundColor: theme.colors.error },
          ]}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  photo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
