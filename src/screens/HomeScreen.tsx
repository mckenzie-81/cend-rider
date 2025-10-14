import { ScreenContainer, Spacer16 } from '../components';
import { Text } from 'react-native-paper';

const HomeScreen = () => {
  return (
    <ScreenContainer>
      <Text variant="headlineMedium">
        This is the home screen
      </Text>
      <Spacer16 />
      <Text variant="bodyMedium">
        Your ride-hailing experience starts here
      </Text>
    </ScreenContainer>
  );
};

export default HomeScreen;
