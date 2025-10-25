import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { ScreenContainer, AppHeader, TabBar } from '../components';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { RideService } from '../services/ride.service';
import { ServicesCatalogService } from '../services/catalog.service';
import { CacheService } from '../services/cache.service';

interface ActivitiesScreenProps {
  onTabChange: (tab: string) => void;
}

type ActivityFilter = 'all' | 'rides' | 'services';
type ActivityStatus = 'completed' | 'cancelled' | 'in_progress';

interface Activity {
  id: string;
  type: 'ride' | 'service';
  title: string;
  subtitle: string;
  date: string;
  time: string;
  status: ActivityStatus;
  amount?: string;
  icon: string;
}

const ActivitiesScreen = ({ onTabChange }: ActivitiesScreenProps) => {
  const [activeTab, setActiveTab] = useState('activity');
  const [filter, setFilter] = useState<ActivityFilter>('all');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadActivities();
  }, [filter]);

  const loadActivities = async (forceRefresh = false) => {
    try {
      if (forceRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      
      // Load rides and services based on filter
      let allActivities: Activity[] = [];

      if (filter === 'all' || filter === 'rides') {
        const rides = forceRefresh 
          ? await RideService.getRideHistory(10)
          : CacheService.getCachedRecentRides(10).length > 0
            ? CacheService.getCachedRecentRides(10)
            : await RideService.getRideHistory(10);
            
        const rideActivities: Activity[] = rides.map(ride => ({
          id: ride.id,
          type: 'ride',
          title: `${ride.vehicleType.charAt(0).toUpperCase() + ride.vehicleType.slice(1)} Ride`,
          subtitle: `${ride.pickup.address} → ${ride.dropoff.address}`,
          date: formatDate(ride.createdAt),
          time: formatTime(ride.createdAt),
          status: ride.status as ActivityStatus,
          amount: `GH₵${ride.fare.toFixed(2)}`,
          icon: ride.vehicleType === 'okada' ? 'bicycle' : 'car',
        }));
        allActivities = [...allActivities, ...rideActivities];
      }

      if (filter === 'all' || filter === 'services') {
        const serviceBookings = await ServicesCatalogService.getServiceBookings(undefined, 10);
        const serviceActivities: Activity[] = serviceBookings.map(booking => ({
          id: booking.id,
          type: 'service',
          title: booking.serviceName,
          subtitle: booking.pickupLocation?.address || 'Service booking',
          date: formatDate(booking.createdAt),
          time: formatTime(booking.createdAt),
          status: booking.status as ActivityStatus,
          amount: booking.finalPrice ? `GH₵${booking.finalPrice.toFixed(2)}` : `GH₵${booking.estimatedPrice.toFixed(2)}`,
          icon: 'cube',
        }));
        allActivities = [...allActivities, ...serviceActivities];
      }

      // Sort by date (most recent first)
      allActivities.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      });

      setActivities(allActivities);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    await CacheService.refreshCache();
    await loadActivities(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

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

  const filters: { key: ActivityFilter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'rides', label: 'Rides' },
    { key: 'services', label: 'Services' },
  ];

  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        title="Activity" 
        backgroundColor="#FFFFFF"
        elevated={true}
      />

      {/* Filter Pills */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map((filterItem) => (
            <TouchableOpacity
              key={filterItem.key}
              style={[
                styles.filterPill,
                filter === filterItem.key && styles.filterPillActive,
              ]}
              onPress={() => setFilter(filterItem.key)}
              activeOpacity={0.7}
            >
              <Text
                variant="labelMedium"
                style={[
                  styles.filterText,
                  filter === filterItem.key && styles.filterTextActive,
                ]}
              >
                {filterItem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Activities List */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#8020A2"
            colors={['#8020A2']}
          />
        }
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#8020A2" />
            <Text variant="bodyMedium" style={styles.loadingText}>
              Loading activities...
            </Text>
          </View>
        ) : activities.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={64} color="#D9D9D9" />
            <Text variant="titleLarge" style={styles.emptyTitle}>
              No activities yet
            </Text>
            <Text variant="bodyMedium" style={styles.emptyText}>
              Your rides and service bookings will appear here
            </Text>
          </View>
        ) : (
          <View style={styles.activitiesList}>
            {activities.map((activity, index) => (
              <TouchableOpacity
                key={activity.id}
                style={[
                  styles.activityCard,
                  index === activities.length - 1 && styles.activityCardLast,
                ]}
                activeOpacity={0.7}
              >
                {/* Route Indicator - same for all activities */}
                <View style={styles.routeIndicator}>
                  <View style={styles.pickupDot} />
                  <View style={styles.routeLine} />
                  <View style={styles.dropoffDot} />
                </View>

                {/* Content */}
                <View style={styles.activityContent}>
                  <Text variant="bodyMedium" style={styles.activityTitle} numberOfLines={1}>
                    {activity.type === 'ride' ? activity.subtitle.split(' → ')[0] : activity.subtitle}
                  </Text>
                  
                  <View style={styles.spacer} />
                  
                  <Text variant="bodyMedium" style={styles.activityDropoff} numberOfLines={1}>
                    {activity.type === 'ride' ? activity.subtitle.split(' → ')[1] : activity.title}
                  </Text>

                  {/* Bottom meta row */}
                  <View style={styles.activityMeta}>
                    <Ionicons name="time-outline" size={14} color="#666" />
                    <Text variant="bodySmall" style={styles.activityDate}>
                      {activity.date} • {activity.time}
                    </Text>
                  </View>
                </View>

                {/* Amount */}
                {activity.amount && (
                  <View style={styles.activityAmount}>
                    <Text variant="titleMedium" style={styles.amountText}>
                      {activity.amount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

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
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  filterContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterPillActive: {
    backgroundColor: '#8020A2',
  },
  filterText: {
    color: '#666',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: '#1C1B1F',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
  activitiesList: {
    paddingHorizontal: 16,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  activityCardLast: {
    marginBottom: 16,
  },
  routeIndicator: {
    width: 20,
    alignItems: 'center',
    marginRight: 12,
    paddingVertical: 2,
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8020A2',
  },
  routeLine: {
    width: 2,
    height: 32,
    backgroundColor: '#D0D0D0',
    marginVertical: 4,
  },
  dropoffDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8020A2',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#1C1B1F',
    fontWeight: '500',
  },
  activityDropoff: {
    color: '#1C1B1F',
    fontWeight: '500',
  },
  spacer: {
    height: 16,
  },
  activityMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  activityDate: {
    color: '#666',
    fontSize: 12,
  },
  activityAmount: {
    justifyContent: 'center',
    marginLeft: 12,
  },
  amountText: {
    color: '#1C1B1F',
    fontWeight: '700',
  },
});
