import { View, StyleSheet } from 'react-native';
import { ScreenContainer, AppHeader, Spacer16 } from '../components';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScreenContainer safe={false} padding={0}>
      <AppHeader 
        // title="Home" 
        backgroundColor="#8020A2"
        elevated={false}
      />
      <View style={styles.content}>
        <Text variant="displaySmall" style={styles.title}>
          Welcome to CEND
        </Text>
        <Spacer16 />
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your trusted ride-hailing partner
        </Text>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
