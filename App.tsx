import 'react-native-gesture-handler';

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/AppNavigator';
import { darkTheme, lightTheme } from './src/theme';
import CustomSplashScreen from './src/components/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import VerificationScreen from './src/screens/VerificationScreen';
import { useAssetCache } from './src/hooks/useAssetCache';
import { CacheService } from './src/services/cache.service';
import './src/theme/nativewind';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const assetsLoaded = useAssetCache();

  // Preload data after authentication
  const handleLoginComplete = async () => {
    setDataLoading(true);
    console.log('🔐 User authenticated, preloading data...');
    await CacheService.preloadAppData();
    setDataLoading(false);
    setIsAuthenticated(true);
  };

  // Handle restart flow for demo purposes
  const handleRestartFlow = () => {
    setShowSplash(true);
    setHasCompletedOnboarding(false);
    setIsAuthenticated(false);
    setShowSignup(false);
    setNeedsVerification(false);
  };

  // Show loading while assets are loading
  if (!assetsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#995FAF' }}>
        <ActivityIndicator size="large" color="#8020A2" />
      </View>
    );
  }

  // Show splash screen (with data preloading if authenticated)
  if (showSplash) {
    return (
      <CustomSplashScreen 
        onFinish={() => setShowSplash(false)} 
        preloadData={false} 
      />
    );
  }

  // All screens wrapped in providers after fonts are loaded
  if (!hasCompletedOnboarding) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider
            theme={theme}
            settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
          >
            <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            <OnboardingScreen onComplete={() => setHasCompletedOnboarding(true)} />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  if (!isAuthenticated) {
    // Show verification screen after signup
    if (needsVerification) {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PaperProvider
              theme={theme}
              settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
            >
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
              <VerificationScreen 
                onComplete={handleLoginComplete}
                onResendCode={() => console.log('Resend code')}
              />
            </PaperProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      );
    }

    // Show signup screen
    if (showSignup) {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <PaperProvider
              theme={theme}
              settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
            >
              <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
              <SignupScreen 
                onComplete={() => {
                  setShowSignup(false);
                  setNeedsVerification(true);
                }}
                onBackToLogin={() => setShowSignup(false)}
              />
            </PaperProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      );
    }

    // Show login screen
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider
            theme={theme}
            settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
          >
            <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            <LoginScreen 
              onComplete={handleLoginComplete} 
              onSignup={() => setShowSignup(true)}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }

  // Show loading while preloading data after authentication
  if (dataLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#8020A2' }}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider
          theme={theme}
          settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
        >
          <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
          <AppNavigator onRestartFlow={handleRestartFlow} />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
