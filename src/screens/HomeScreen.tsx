import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16, TabBar } from '../components';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'payment', label: 'Payment', icon: 'wallet' },
    { key: 'activity', label: 'Activity', icon: 'clock-outline' },
    { key: 'messages', label: 'Messages', icon: 'message-outline' },
  ];

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Home" 
        backgroundColor="#8020A2"
        elevated={false}
      />
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome to CEND
        </Text>
        <Spacer16 />
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your trusted ride-hailing partner
        </Text>
      </View>
      <TabBar 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
});
