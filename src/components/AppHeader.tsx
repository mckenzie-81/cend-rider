import React, { ReactNode } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AppHeaderProps {
  /** Title text for the header */
  title?: string;
  /** Subtitle text (shown below title) */
  subtitle?: string;
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
  /** Custom action component to render in top-right */
  customActions?: ReactNode;
  /** Custom background color */
  backgroundColor?: string;
  /** Gradient colors [start, end] */
  gradientColors?: [string, string];
  /** Elevated style with shadow */
  elevated?: boolean;
  /** Custom content to render inside header (e.g., SearchBar) */
  children?: ReactNode;
  /** Custom height for the header */
  height?: number;
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
  subtitle,
  showBack = false,
  onBackPress,
  actions = [],
  customActions,
  backgroundColor,
  gradientColors,
  elevated = true,
  children,
  height,
}: AppHeaderProps) {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.colors.surface;
  const isCustomHeight = height && height > 100;
  const insets = useSafeAreaInsets();

  // For custom height headers with subtitle, use custom layout
  if (isCustomHeight && (title || subtitle)) {
    const customHeightStyle = height ? { height } : undefined;
    
    return (
      <View style={[styles.headerContainer, elevated && styles.elevated, customHeightStyle]}>
        <LinearGradient
          colors={gradientColors || [bgColor, bgColor]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, customHeightStyle]}
        >
          <View style={[styles.customHeader, { paddingTop: insets.top || (Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0) }]}>
            {/* Top bar with back button, title, and actions */}
            <View style={styles.topBar}>
              {showBack && (
                <View style={styles.backButtonContainer}>
                  <Appbar.BackAction onPress={onBackPress} color={gradientColors ? '#FFFFFF' : undefined} />
                </View>
              )}
              {title && (
                <Text variant="titleLarge" style={[styles.topBarTitle, gradientColors && { color: '#FFFFFF' }]}>
                  {title}
                </Text>
              )}
              <View style={{ flex: 1 }} />
              {customActions || actions.map((action, index) => (
                <Appbar.Action
                  key={index}
                  icon={action.icon}
                  onPress={action.onPress}
                  accessibilityLabel={action.label}
                  color={gradientColors ? '#FFFFFF' : undefined}
                />
              ))}
            </View>
            
            {/* Subtitle with more spacing from title */}
            {subtitle && (
              <View style={styles.subtitleContainer}>
                <Text variant="bodyMedium" style={[styles.customSubtitle, gradientColors && { color: 'rgba(255, 255, 255, 0.95)' }]}>
                  {subtitle}
                </Text>
              </View>
            )}
            
            {/* Children (for custom content like images) */}
            {children && (
              <View style={styles.customChildrenContainer}>
                {children}
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }

  // Standard header layout
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

  const customHeightStyle = height ? { height } : undefined;

  if (gradientColors) {
    return (
      <View style={[styles.headerContainer, elevated && styles.elevated, customHeightStyle]}>
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.gradient, customHeightStyle]}
        >
          <Appbar.Header
            style={[styles.header, { backgroundColor: 'transparent' }, customHeightStyle]}
          >
            {headerContent}
          </Appbar.Header>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={[styles.headerContainer, elevated && styles.elevated, customHeightStyle]}>
      <Appbar.Header
        style={[
          styles.header,
          { backgroundColor: bgColor },
          customHeightStyle,
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
    fontWeight: '900',
    marginLeft: 24,
  },
  customHeader: {
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    zIndex: 10,
  },
  backButtonContainer: {
    zIndex: 20,
  },
  topBarTitle: {
    fontWeight: '600',
    marginLeft: 4,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  subtitleContainer: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
  },
  customTitle: {
    fontWeight: '700',
    marginBottom: 4,
  },
  customSubtitle: {
    lineHeight: 22,
  },
  customChildrenContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
});
