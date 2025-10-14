import React from 'react';
import { View, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';

interface ScreenContainerProps {
  children: React.ReactNode;
  /** Enable scrolling for content that exceeds screen height */
  scrollable?: boolean;
  /** Use SafeAreaView for notch/status bar handling */
  safe?: boolean;
  /** Horizontal padding for content */
  padding?: number;
  /** Custom background color (defaults to theme background) */
  backgroundColor?: string;
  /** Additional style for the container */
  style?: ViewStyle;
}

export function ScreenContainer({
  children,
  scrollable = false,
  safe = true,
  padding = 20,
  backgroundColor,
  style,
}: ScreenContainerProps) {
  const theme = useTheme();
  const bgColor = backgroundColor || theme.colors.background;

  const Wrapper = safe ? SafeAreaView : View;

  if (scrollable) {
    return (
      <Wrapper style={[styles.container, { backgroundColor: bgColor }]}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { padding }]}
          showsVerticalScrollIndicator={false}
          bounces={true}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </Wrapper>
    );
  }

  return (
    <Wrapper style={[styles.container, { backgroundColor: bgColor, padding }, style]}>
      {children}
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
