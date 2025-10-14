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
import { useCustomFonts } from './src/hooks/useFonts';
import './src/theme/nativewind';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const fontsLoaded = useCustomFonts();

  // Show loading while fonts are loading
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#995FAF' }}>
        <ActivityIndicator size="large" color="#8020A2" />
      </View>
    );
  }

  if (!isReady) {
    return <CustomSplashScreen onFinish={() => setIsReady(true)} />;
  }

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
                onComplete={() => setIsAuthenticated(true)} 
                onBackToLogin={() => setShowSignup(false)}
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
