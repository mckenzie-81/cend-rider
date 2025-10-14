import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

interface AppHeaderProps {
  /** Title text for the header */
  title?: string;
  /** Show back button */
  showBack?: boolean;
  /** Back button press handler */
  onBackPress?: () => void;
  /** Right side action buttons */
  actions?: Array<{
    icon: string;
    onPress: () => void;
    label?: string;
  }>;
  /** Custom background color */
  backgroundColor?: string;
  /** Gradient colors [start, end] */
  gradientColors?: [string, string];
  /** Elevated style with shadow */
  elevated?: boolean;
  /** Custom content to render inside header (e.g., SearchBar) */
  children?: ReactNode;
}

/**
 * AppHeader component for screen headers
 * Provides consistent header UI with optional back button and actions
 * 
 * @example
 * // Simple header with title
 * <AppHeader title="Home" />
 * 
 * // Header with back button
 * <AppHeader title="Profile" showBack onBackPress={() => navigation.goBack()} />
 * 
 * // Header with gradient
 * <AppHeader gradientColors={['#8020A2', '#7F23FF']} />
 * 
 * // Header with actions
 * <AppHeader 
 *   title="Settings" 
 *   actions={[
 *     { icon: 'cog', onPress: handleSettings },
 *     { icon: 'bell', onPress: handleNotifications }
 *   ]}
 * />
 */
export function AppHeader({
  title,
  showBack = false,
  onBackPress,
  actions = [],
  backgroundColor,
  gradientColors,
  elevated = true,
  children,
}: AppHeaderProps) {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.colors.surface;

  const headerContent = (
    <>
      {showBack && (
        <Appbar.BackAction onPress={onBackPress} color={gradientColors ? '#FFFFFF' : undefined} />
      )}
      
      {!children && title && (
        <Appbar.Content title={title} titleStyle={[styles.title, gradientColors && { color: '#FFFFFF' }]} />
      )}

      {children && (
        <View style={styles.childrenContent}>
          {children}
        </View>
      )}

      {actions.map((action, index) => (
        <Appbar.Action
          key={index}
          icon={action.icon}
          onPress={action.onPress}
          accessibilityLabel={action.label}
          color={gradientColors ? '#FFFFFF' : undefined}
        />
      ))}
    </>
  );

  if (gradientColors) {
    return (
      <View style={[styles.headerContainer, elevated && styles.elevated]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Appbar.Header
            style={[styles.header, { backgroundColor: 'transparent' }]}
          >
            {headerContent}
          </Appbar.Header>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.headerContainer, elevated && styles.elevated]}>
      <Appbar.Header
        style={[
          styles.header,
          { backgroundColor: bgColor },
        ]}
      >
        {headerContent}
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    elevation: 0,
  },
  header: {
    elevation: 0,
  },
  elevated: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradient: {
    width: '100%',
  },
  childrenContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  childrenContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontWeight: '600',
  },
});
