import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppHeader, TabBar, SecondaryButton } from '../components';
import { Text } from 'react-native-paper';

interface AccountScreenProps {
  onTabChange: (tab: string) => void;
  onRestartFlow?: () => void;
}

const AccountScreen = ({ onTabChange, onRestartFlow }: AccountScreenProps) => {
  const [activeTab, setActiveTab] = useState('account');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home-outline' },
    { key: 'services', label: 'Services', icon: 'grid-outline' },
    { key: 'activity', label: 'Activity', icon: 'receipt-outline' },
    { key: 'account', label: 'Account', icon: 'person-outline' },
  ];

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Account" 
        gradientColors={['#8020A2', '#995FAF']}
        elevated={false}
      />
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.text}>
          Account Settings
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Manage your profile and preferences
        </Text>

        {/* Demo Controls */}
        {onRestartFlow && (
          <View style={styles.demoSection}>
            <Text variant="labelLarge" style={styles.demoLabel}>
              Demo Controls
            </Text>
            <SecondaryButton 
              onPress={onRestartFlow}
              style={styles.restartButton}
            >
              🔄 Restart Flow
            </SecondaryButton>
            <Text variant="bodySmall" style={styles.demoDescription}>
              Return to splash screen to demo the full onboarding experience
            </Text>
          </View>
        )}
      </View>
      <TabBar 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </ScreenContainer>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    textAlign: 'center',
    color: '#1C1B1F',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
  },
  demoSection: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  demoLabel: {
    color: '#8020A2',
    fontWeight: '600',
    marginBottom: 12,
  },
  restartButton: {
    marginBottom: 8,
  },
  demoDescription: {
    color: '#666',
    textAlign: 'center',
    fontSize: 12,
  },
});
