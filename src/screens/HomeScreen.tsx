import { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16, TabBar, ServiceCard } from '../components';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const tabs = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'payment', label: 'Payment', icon: 'wallet' },
    { key: 'activity', label: 'Activity', icon: 'clock-outline' },
    { key: 'messages', label: 'Messages', icon: 'message-outline' },
  ];

  const services = [
    { key: 'bike', icon: 'bike', title: 'Bike' },
    { key: 'car', icon: 'car', title: 'Car' },
    { key: 'food', icon: 'food', title: 'Food' },
    { key: 'package', icon: 'package-variant', title: 'Package' },
  ];

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Home" 
        backgroundColor="#8020A2"
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
            onPress={() => setSelectedService(service.key)}
            active={selectedService === service.key}
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
