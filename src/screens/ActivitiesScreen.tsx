import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppHeader, TabBar } from '../components';
import { Text } from 'react-native-paper';

interface ActivitiesScreenProps {
  onTabChange: (tab: string) => void;
}

const ActivitiesScreen = ({ onTabChange }: ActivitiesScreenProps) => {
  const [activeTab, setActiveTab] = useState('activity');

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
        // title="Activities" 
        gradientColors={['#8020A2', '#995FAF']}
        elevated={false}
      />
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.text}>
          Activities page - all user activities .ie rides and service requests are gonna be logged hear
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

export default ActivitiesScreen;

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
