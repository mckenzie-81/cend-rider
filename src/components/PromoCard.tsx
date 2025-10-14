import { View, StyleSheet, TouchableOpacity, ViewStyle, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

interface PromoCardProps {
  title: string;
  buttonLabel: string;
  imageSource?: any; // For now, we'll use placeholder
  onPress: () => void;
  style?: ViewStyle;
}

const PromoCard = ({ title, buttonLabel, imageSource, onPress, style }: PromoCardProps) => {
  return (
    <View style={[styles.container, style]}>
      {/* Content section - Takes 2/3 of card width */}
      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
          <Text variant="labelMedium" style={styles.buttonText}>
            {buttonLabel}
          </Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Image placeholder - Takes 1/3 of card width on the right */}
      <View style={styles.imageContainer}>
        {imageSource ? (
          <ImageBackground source={imageSource} style={styles.imagePlaceholder} resizeMode="cover">
            <View style={styles.overlay} />
          </ImageBackground>
        ) : (
          <View style={[styles.imagePlaceholder, styles.placeholderBackground]}>
            <Ionicons name="image-outline" size={40} color="rgba(140, 32, 162, 0.3)" />
          </View>
        )}
      </View>
    </View>
  );
};

export default PromoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Horizontal layout
    backgroundColor: '#F1F1FF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#1C1B1F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  content: {
    flex: 2.7, // Takes more space (about 73% of card width)
    padding: 14,
    justifyContent: 'space-between',
  },
  title: {
    color: '#1C1B1F',
    marginBottom: 6,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#8020A2',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 18,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  imageContainer: {
    flex: 0.8, // Takes less space (about 27% of card width - 0.8/3)
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderBackground: {
    backgroundColor: '#F2D7FC',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});
