import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ViewStyle,
  ImageSourcePropType,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const { width: screenWidth } = Dimensions.get('window');

export interface ExploreNearbyCardProps {
  backgroundImage: ImageSourcePropType | string;
  onUseLocation: () => void;
  onOpenMap: () => void;
  headline?: string;
  subtext?: string;
  containerStyle?: ViewStyle;
}

export const ExploreNearbyCard: React.FC<ExploreNearbyCardProps> = ({
  backgroundImage,
  onUseLocation,
  onOpenMap,
  headline = 'Explore Nearby',
  subtext = 'Find restaurants & events around you',
  containerStyle,
}) => {
  const { theme } = useTheme();
  
  // Convert string to proper image source if needed
  const imageSource = typeof backgroundImage === 'string' 
    ? { uri: backgroundImage }
    : backgroundImage;

  return (
    <View style={[styles.container, containerStyle]}>
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        {/* Use My Location Button */}
        <TouchableOpacity
          style={styles.locationButton}
          onPress={onUseLocation}
          activeOpacity={0.8}
        >
          <Ionicons
            name="location"
            size={20}
            color="#FF6B35"
          />
          <Text style={styles.locationButtonText}>Use My Location</Text>
        </TouchableOpacity>

        {/* Bottom Content with Gradient Overlay */}
        <LinearGradient
          colors={[
            'rgba(0, 0, 0, 0)', 
            'rgba(0, 0, 0, 0.6)', 
            'rgba(0, 0, 0, 0.85)'
          ]}
          style={styles.bottomGradient}
          locations={[0, 0.5, 1]}
        >
          <View style={styles.bottomContent}>
            <View style={styles.textContainer}>
              <Text style={styles.headline}>{headline}</Text>
              <Text style={styles.subtext}>{subtext}</Text>
            </View>
            
            <TouchableOpacity
              style={styles.mapButton}
              onPress={onOpenMap}
              activeOpacity={0.8}
            >
              <Text style={styles.mapButtonText}>Open Map</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    borderRadius: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 16,
    alignSelf: 'flex-start',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  bottomGradient: {
    padding: 20,
    paddingTop: 40,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
    marginRight: 16,
  },
  headline: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    lineHeight: 20,
  },
  mapButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-end',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

// Alternative version with solid overlay instead of gradient
export const ExploreNearbyCardSolid: React.FC<ExploreNearbyCardProps> = ({
  backgroundImage,
  onUseLocation,
  onOpenMap,
  headline = 'Explore Nearby',
  subtext = 'Find restaurants & events around you',
  containerStyle,
}) => {
  const imageSource = typeof backgroundImage === 'string' 
    ? { uri: backgroundImage }
    : backgroundImage;

  return (
    <View style={[styles.container, containerStyle]}>
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <TouchableOpacity
          style={styles.locationButton}
          onPress={onUseLocation}
          activeOpacity={0.8}
        >
          <Ionicons
            name="location"
            size={20}
            color="#FF6B35"
          />
          <Text style={styles.locationButtonText}>Use My Location</Text>
        </TouchableOpacity>

        <View style={[styles.bottomContent, styles.solidOverlay]}>
          <View style={styles.textContainer}>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.mapButton}
            onPress={onOpenMap}
            activeOpacity={0.8}
          >
            <Text style={styles.mapButtonText}>Open Map</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const additionalStyles = StyleSheet.create({
  solidOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 20,
  },
});