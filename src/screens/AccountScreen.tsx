import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppHeader, TabBar } from '../components';
import { Text } from 'react-native-paper';

interface AccountScreenProps {
  onTabChange: (tab: string) => void;
}

const AccountScreen = ({ onTabChange }: AccountScreenProps) => {
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
          This is the Account page
        </Text>
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
  },
});
