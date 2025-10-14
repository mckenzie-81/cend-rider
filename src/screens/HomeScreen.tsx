import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16, TabBar, ServiceCard } from '../components';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home-outline' },
    { key: 'services', label: 'Services', icon: 'grid-outline' },
    { key: 'activity', label: 'Activity', icon: 'receipt-outline' },
    { key: 'account', label: 'Account', icon: 'person-outline' },
  ];

  const services = [
    { key: 'bike', icon: 'bicycle-outline', title: 'Bike' },
    { key: 'car', icon: 'car-outline', title: 'Car' },
    { key: 'food', icon: 'restaurant-outline', title: 'Food' },
    { key: 'package', icon: 'cube-outline', title: 'Package' },
  ];

  const handleServicePress = (serviceKey: string) => {
    // Handle service selection - for now just log it
    console.log('Service selected:', serviceKey);
  };

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Home" 
        gradientColors={['#8020A2', '#995FAF']}
        elevated={false}
      />
      
      {/* Service Cards - Horizontal Row */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {services.map((service) => (
          <ServiceCard
            key={service.key}
            icon={service.icon}
            title={service.title}
            onPress={() => handleServicePress(service.key)}
            style={styles.serviceCard}
          />
        ))}
      </ScrollView>

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
  servicesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  serviceCard: {
    width: 85,
    height: 85,
  },
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
