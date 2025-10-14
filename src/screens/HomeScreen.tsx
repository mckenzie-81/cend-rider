import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16, TabBar, ServiceCard, QuickActionCard } from '../components';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface HomeScreenProps {
  onTabChange: (tab: string) => void;
}

const HomeScreen = ({ onTabChange }: HomeScreenProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');

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

  const services = [
    { key: 'ride', icon: 'car-outline', title: 'Ride' },
    { key: 'dispatch', icon: 'cube-outline', title: 'Dispatch' },
    { key: 'okada', icon: 'bicycle-outline', title: 'Okada' },
    { key: 'food', icon: 'restaurant-outline', title: 'Food' },
  ];

  const quickActions = [
    { key: 'schedule', icon: 'time-outline', title: 'Schedule' },
    { key: 'promo', icon: 'pricetag-outline', title: 'Promo' },
    { key: 'wallet', icon: 'wallet-outline', title: 'Wallet' },
    { key: 'support', icon: 'help-circle-outline', title: 'Support' },
  ];

  const handleServicePress = (serviceKey: string) => {
    // Handle service selection - for now just log it
    console.log('Service selected:', serviceKey);
  };

  const handleQuickAction = (actionKey: string) => {
    // Handle quick action - for now just log it
    console.log('Quick action:', actionKey);
  };

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Home" 
        gradientColors={['#8020A2', '#995FAF']}
        elevated={false}
      >
        <View style={styles.compactSearchContainer}>
          <Ionicons name="search-outline" size={24} color="#FFFFFF" style={styles.searchIconOutside} />
          <TextInput
            style={styles.compactSearchInput}
            placeholder="Search the Cend App"
            placeholderTextColor="rgba(255, 255, 255, 0.7)"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="rgba(255, 255, 255, 0.7)" />
            </TouchableOpacity>
          )}
        </View>
      </AppHeader>
      
      <View style={styles.cardsWrapper}>
        {/* Service Cards - Horizontal Row */}
        <View style={styles.servicesSection}>
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
        </View>

        {/* Quick Action Cards - Horizontal Row */}
        <View style={styles.quickActionsSection}>
          <Text variant="titleMedium" style={styles.sectionHeading}>
            Quick Actions
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActionsContainer}
          >
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.key}
                icon={action.icon}
                title={action.title}
                onPress={() => handleQuickAction(action.key)}
                style={styles.quickActionCard}
              />
            ))}
          </ScrollView>
        </View>
      </View>

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
        onTabPress={handleTabPress}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  compactSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchIconOutside: {
    marginLeft: 4,
  },
  compactSearchInput: {
    flex: 1,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 18,
    paddingHorizontal: 16,
    color: '#FFFFFF',
    fontSize: 14,
  },
  clearButton: {
    padding: 4,
    marginRight: 4,
  },
  cardsWrapper: {
    // No flex, just wraps the content
  },
  servicesSection: {
    // Wrapper for services ScrollView
  },
  servicesContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 12,
  },
  serviceCard: {
    width: 85,
    height: 85,
  },
  quickActionsSection: {
    // Wrapper for quick actions ScrollView
  },
  sectionHeading: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
    color: '#1C1B1F',
  },
  quickActionsContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  quickActionCard: {
    width: 127.5, // 1.5x the width of service cards (85 * 1.5)
    height: 42.5, // Half the height of service cards (85 / 2)
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
