import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface TabItem {
  /** Unique tab identifier */
  key: string;
  /** Tab label */
  label: string;
  /** Icon name (Material Community Icons) */
  icon: string;
}

interface TabBarProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently active tab key */
  activeTab: string;
  /** Tab press handler */
  onTabPress: (key: string) => void;
}

/**
 * TabBar - Bottom navigation bar
 * Clean, minimal design for Home / Payment / Activity / Messages
 * 
 * @example
 * <TabBar
 *   tabs={[
 *     { key: 'home', label: 'Home', icon: 'home' },
 *     { key: 'payment', label: 'Payment', icon: 'wallet' },
 *     { key: 'activity', label: 'Activity', icon: 'clock-outline' },
 *     { key: 'messages', label: 'Messages', icon: 'message-outline' }
 *   ]}
 *   activeTab={activeTab}
 *   onTabPress={setActiveTab}
 * />
 */
export function TabBar({ tabs, activeTab, onTabPress }: TabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 8,
        },
      ]}
    >
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.tab}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={24}
              color={isActive ? theme.colors.primary : theme.colors.onSurfaceVariant}
            />
            <Text
              variant="labelSmall"
              style={[
                styles.label,
                {
                  color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant,
                  fontWeight: isActive ? '600' : '400',
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 4,
  },
  label: {
    fontSize: 11,
    letterSpacing: 0.3,
  },
});
