import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const { width: screenWidth } = Dimensions.get('window');

export interface PromoBannerProps {
  headline: string;
  subtext: string;
  buttonLabel: string;
  onButtonPress: () => void;
  backgroundIcon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  colors?: string[];
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  headline,
  subtext,
  buttonLabel,
  onButtonPress,
  backgroundIcon = 'pricetag-outline',
  containerStyle,
  colors = ['#FF6B35', '#FF8C42'], // Default orange gradient
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background icon illustration */}
        <View style={styles.backgroundIconContainer}>
          <Ionicons
            name={backgroundIcon}
            size={120}
            color="rgba(255, 255, 255, 0.15)"
          />
        </View>

        {/* Content container */}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.headline}>{headline}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>{buttonLabel}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gradient: {
    minHeight: 180,
    position: 'relative',
  },
  backgroundIconContainer: {
    position: 'absolute',
    right: -30,
    top: '50%',
    transform: [{ translateY: -60 }],
    opacity: 0.4,
  },
  contentContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  textContainer: {
    marginBottom: 20,
    maxWidth: '70%', // Leave space for background icon
  },
  headline: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    lineHeight: 22,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  buttonText: {
    color: '#FF6B35',
    fontSize: 16,
    fontWeight: '700',
  },
});

// Animated version using React Native Animated API
import { Animated } from 'react-native';

export const AnimatedPromoBanner: React.FC<PromoBannerProps> = (props) => {
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <PromoBanner {...props} />
    </Animated.View>
  );
};