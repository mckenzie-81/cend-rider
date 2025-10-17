import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import AccountScreen from './screens/AccountScreen';
import { TransportScreen } from './screens/TransportScreen';
import { RideOptionsScreen } from './screens/RideOptionsScreen';
import { RideTrackingScreen } from './screens/RideTrackingScreen';

interface AppNavigatorProps {
  onRestartFlow?: () => void;
}

const AppNavigator = ({ onRestartFlow }: AppNavigatorProps) => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [transportMode, setTransportMode] = useState<'ride' | 'okada'>('ride');
  const [rideDetails, setRideDetails] = useState<{
    pickup: string;
    dropoff: string;
    vehicleType?: string;
    estimatedPrice?: string;
  } | null>(null);

  const handleNavigate = (screen: string, params?: { mode?: 'ride' | 'okada' }) => {
    if (screen === 'transport' && params?.mode) {
      setTransportMode(params.mode);
    }
    setCurrentScreen(screen);
  };

  const handleRideOptionsNavigate = (pickup: string, dropoff: string) => {
    setRideDetails({ pickup, dropoff });
    setCurrentScreen('ride-options');
  };

  const handleRideConfirm = (vehicleType: string, price: string) => {
    setRideDetails((prev) => ({
      ...prev!,
      vehicleType,
      estimatedPrice: price,
    }));
    setCurrentScreen('ride-tracking');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onTabChange={setCurrentScreen} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesScreen onTabChange={setCurrentScreen} />;
      case 'activity':
        return <ActivitiesScreen onTabChange={setCurrentScreen} />;
      case 'account':
        return <AccountScreen onTabChange={setCurrentScreen} onRestartFlow={onRestartFlow} />;
      case 'transport':
        return (
          <TransportScreen
            onBack={() => setCurrentScreen('home')}
            initialMode={transportMode}
            onConfirmLocations={handleRideOptionsNavigate}
          />
        );
      case 'ride-options':
        return (
          <RideOptionsScreen
            onBack={() => setCurrentScreen('transport')}
            onConfirm={handleRideConfirm}
            pickup={rideDetails?.pickup || ''}
            dropoff={rideDetails?.dropoff || ''}
            mode={transportMode}
          />
        );
      case 'ride-tracking':
        return (
          <RideTrackingScreen
            onBack={() => setCurrentScreen('ride-options')}
            onComplete={() => setCurrentScreen('home')}
            pickup={rideDetails?.pickup || ''}
            dropoff={rideDetails?.dropoff || ''}
            vehicleType={rideDetails?.vehicleType || ''}
            estimatedPrice={rideDetails?.estimatedPrice || ''}
          />
        );
      default:
        return <HomeScreen onTabChange={setCurrentScreen} onNavigate={handleNavigate} />;
    }
  };

  return renderScreen();
};

export default AppNavigator;
