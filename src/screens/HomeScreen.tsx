import { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16, TabBar, ServiceCard, QuickActionCard, PromoCard, IconName } from '../components';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HomeScreenProps {
  onTabChange: (tab: string) => void;
  onNavigate: (screen: string) => void;
}

const HomeScreen = ({ onTabChange, onNavigate }: HomeScreenProps) => {
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

  const services: Array<{ key: string; icon: IconName; title: string }> = [
    { key: 'ride', icon: 'car', title: 'Ride' },
    { key: 'dispatch', icon: 'dispatch', title: 'Dispatch' },
    { key: 'okada', icon: 'okada', title: 'Okada' },
    { key: 'reserve', icon: 'reserve', title: 'Reserve' }, // Using Ionicons until we get the SVG
  ];

  const quickActions: Array<{ key: string; icon: IconName; title: string }> = [
    { key: 'schedule', icon: 'time-outline', title: 'Schedule' },
    { key: 'promo', icon: 'pricetag-outline', title: 'Promo' },
    { key: 'wallet', icon: 'wallet-outline', title: 'Wallet' },
    { key: 'support', icon: 'help-circle-outline', title: 'Support' },
  ];

  const promos = [
    { key: 'promo1', title: 'Get 20% off your next ride', buttonLabel: 'Claim Now' },
    { key: 'promo2', title: 'Free delivery on orders above GHc5000', buttonLabel: 'Order Now' },
    { key: 'promo3', title: 'Invite friends and earn rewards', buttonLabel: 'Share Now' },
  ];

  const handleServicePress = (serviceKey: string) => {
    // Navigate to transport screen for ride and okada
    if (serviceKey === 'ride' || serviceKey === 'okada') {
      onNavigate('transport');
    } else {
      // Handle other services - for now just log it
      console.log('Service selected:', serviceKey);
    }
  };

  const handleQuickAction = (actionKey: string) => {
    // Handle quick action - for now just log it
    console.log('Quick action:', actionKey);
  };

  const handlePromoPress = (promoKey: string) => {
    // Handle promo card press - for now just log it
    console.log('Promo pressed:', promoKey);
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
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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

        {/* Promo Cards - Horizontal Row */}
        <View style={styles.promoSection}>
          <Text variant="titleMedium" style={styles.sectionHeading}>
            Special Offers
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoContainer}
            snapToInterval={SCREEN_WIDTH - 24} // Snap to card width + gap
            decelerationRate="fast"
          >
            {promos.map((promo) => (
              <PromoCard
                key={promo.key}
                title={promo.title}
                buttonLabel={promo.buttonLabel}
                onPress={() => handlePromoPress(promo.key)}
                style={styles.promoCard}
              />
            ))}
          </ScrollView>
        </View>

        {/* Story Banner with Image */}
        <View style={styles.storyBanner}>
          <View style={styles.storyContent}>
            <View style={styles.storyBadge}>
              <Ionicons name="shield-checkmark" size={16} color="#8020A2" />
              <Text variant="labelSmall" style={styles.badgeText}>Verified & Safe</Text>
            </View>
            <Text variant="headlineSmall" style={styles.storyTitle}>
              Your Journey,{'\n'}Our Priority
            </Text>
            <Text variant="bodyMedium" style={styles.storyText}>
              Experience comfort and reliability on every ride
            </Text>
          </View>
          <Image 
            source={require('../../assets/woman-in-car.png')} 
            style={styles.storyImage}
            resizeMode="cover"
          />
        </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16, // Extra padding at bottom for better scrolling experience
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
  promoSection: {
    // Wrapper for promo cards ScrollView
  },
  promoContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    gap: 12,
  },
  promoCard: {
    width: SCREEN_WIDTH - 32, // Full screen width minus 16px padding on each side
    height: 150, // Increased by 10% from 136px (136 * 1.1 ≈ 150)
  },
  storyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginTop: 16,
  },
  storyContent: {
    flex: 1,
    paddingRight: 16,
  },
  storyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8E5FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeText: {
    color: '#8020A2',
    fontWeight: '600',
  },
  storyTitle: {
    color: '#1C1B1F',
    marginBottom: 8,
    lineHeight: 32,
  },
  storyText: {
    color: '#6B6B6B',
    lineHeight: 22,
  },
  storyImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
});
