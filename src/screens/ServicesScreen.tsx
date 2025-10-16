import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer, AppHeader, TabBar, DriverPromoCard } from '../components';
import { Text } from 'react-native-paper';

interface ServicesScreenProps {
  onTabChange: (tab: string) => void;
}

const ServicesScreen = ({ onTabChange }: ServicesScreenProps) => {
  const [activeTab, setActiveTab] = useState('services');

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleDriverPromoPress = () => {
    console.log('Become a driver pressed');
    // TODO: Navigate to driver signup or more info
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
        title="Services" 
        backgroundColor="#FFFFFF"
        elevated={false}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Driver Promo Card */}
        <DriverPromoCard 
          onPress={handleDriverPromoPress}
          style={styles.promoCard}
        />

        {/* Rest of content */}
        <View style={styles.content}>
          <Text variant="displaySmall" style={styles.text}>
            This is the Services page
          </Text>
        </View>
      </ScrollView>

      <TabBar 
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </ScreenContainer>
  );
};

export default ServicesScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  promoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  text: {
    textAlign: 'center',
    color: '#1C1B1F',
  },
});
