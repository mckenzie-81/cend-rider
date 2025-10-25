import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { ScreenContainer, AppHeader, TabBar, DriverPromoCard, ServiceCard, IconName } from '../components';
import { Text } from 'react-native-paper';
import { ServicesCatalogService, ServiceItem } from '../services/catalog.service';

interface ServicesScreenProps {
  onTabChange: (tab: string) => void;
  onNavigate?: (screen: string, params?: any) => void;
}

const ServicesScreen = ({ onTabChange, onNavigate }: ServicesScreenProps) => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      
      // Load available services from catalog
      const catalogServices = await ServicesCatalogService.getAllServices();
      setServices(catalogServices);
    } catch (error) {
      console.error('Error loading services:', error);
      // Services will remain empty on error
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (category: string): IconName => {
    const iconMap: Record<string, IconName> = {
      delivery: 'dispatch',
      other: 'car', // Default for 'other' category (used by ride, okada, reserve)
    };
    return iconMap[category] || 'car';
  };

  const getServiceIconByName = (name: string): IconName => {
    const nameMap: Record<string, IconName> = {
      'Ride': 'car',
      'Dispatch': 'dispatch',
      'Okada': 'okada',
      'Reserve': 'reserve',
    };
    return nameMap[name] || 'car';
  };

  const handleTabPress = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleDriverPromoPress = () => {
    console.log('Become a driver pressed');
    // TODO: Navigate to driver signup or more info
  };

  const handleServicePress = (service: ServiceItem) => {
    // Simply call the service's onPress handler, passing the navigation function
    const navigate = onNavigate || ((screen, params) => {
      console.log('Navigate to:', screen, params);
    });
    service.onPress(navigate);
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

        {/* Services Grid Section */}
        <View style={styles.servicesSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            All Services
          </Text>
          
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <View key={service.id} style={styles.serviceCardWrapper}>
                <ServiceCard
                  icon={getServiceIconByName(service.name)}
                  title={service.name}
                  onPress={() => handleServicePress(service)}
                  style={styles.serviceCard}
                />
              </View>
            ))}
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

export default ServicesScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  promoCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  servicesSection: {
    backgroundColor: '#FFFFFF', // White background
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#1C1B1F',
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6, // Negative margin to offset card wrapper padding
  },
  serviceCardWrapper: {
    width: '25%', // 4 cards per row
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  serviceCard: {
    width: '100%',
    aspectRatio: 1, // Square cards
  },
});
