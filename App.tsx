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
import './src/theme/nativewind';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const assetsLoaded = useAssetCache();

  // Show loading while assets are loading OR before splash finishes
  if (!assetsLoaded || !isReady) {
    if (!assetsLoaded) {
      // Still loading assets - show loader
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#995FAF' }}>
          <ActivityIndicator size="large" color="#8020A2" />
        </View>
      );
    }
    // Assets loaded, show splash screen
    return <CustomSplashScreen onFinish={() => setIsReady(true)} />;
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
                onComplete={() => setIsAuthenticated(true)}
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
              onComplete={() => setIsAuthenticated(true)} 
              onSignup={() => setShowSignup(true)}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
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
          <AppNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
