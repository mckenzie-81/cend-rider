import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import ServicesScreen from './screens/ServicesScreen';
import ActivitiesScreen from './screens/ActivitiesScreen';
import AccountScreen from './screens/AccountScreen';
import { TransportScreen } from './screens/TransportScreen';

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onTabChange={setCurrentScreen} onNavigate={setCurrentScreen} />;
      case 'services':
        return <ServicesScreen onTabChange={setCurrentScreen} />;
      case 'activity':
        return <ActivitiesScreen onTabChange={setCurrentScreen} />;
      case 'account':
        return <AccountScreen onTabChange={setCurrentScreen} />;
      case 'transport':
        return <TransportScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <HomeScreen onTabChange={setCurrentScreen} onNavigate={setCurrentScreen} />;
    }
  };

  return renderScreen();
};

export default AppNavigator;
