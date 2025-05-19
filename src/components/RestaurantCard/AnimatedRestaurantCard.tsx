import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { RestaurantData } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

interface AnimatedRestaurantCardProps {
  restaurant: RestaurantData;
  onPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  index?: number;
  scrollY?: Animated.SharedValue<number>;
}

export const AnimatedRestaurantCard: React.FC<AnimatedRestaurantCardProps> = ({
  restaurant,
  onPress,
  onFavoriteToggle,
  index = 0,
  scrollY,
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const favoriteScale = useSharedValue(1);

  // Entry animation
  React.useEffect(() => {
    const delay = index * 100;
    
    setTimeout(() => {
      scale.value = withSpring(1, {
        damping: 12,
        stiffness: 100,
      });
      
      opacity.value = withTiming(1, {
        duration: 400,
      });
      
      translateY.value = withSpring(0, {
        damping: 15,
        stiffness: 80,
      });
    }, delay);
  }, []);

  const handlePress = () => {
    if (onPress) {
      scale.value = withSpring(0.98, {
        damping: 20,
        stiffness: 400,
      }, () => {
        scale.value = withSpring(1);
      });
      runOnJS(onPress)(restaurant);
    }
  };

  const handleFavoritePress = () => {
    if (onFavoriteToggle) {
      favoriteScale.value = withSpring(0.7, {
        damping: 20,
        stiffness: 400,
      }, () => {
        favoriteScale.value = withSpring(1.2, {
          damping: 10,
          stiffness: 200,
        }, () => {
          favoriteScale.value = withSpring(1);
        });
      });
      runOnJS(onFavoriteToggle)(restaurant);
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    let finalScale = scale.value;
    let finalTranslateY = translateY.value;
    
    // Parallax scroll effect if scrollY is provided
    if (scrollY) {
      const inputRange = [
        -1,
        0,
        index * 300,
        (index + 2) * 300,
      ];
      
      finalScale = interpolate(
        scrollY.value,
        inputRange,
        [1, 1, 1, 0.85],
        Extrapolate.CLAMP
      );
      
      finalTranslateY = interpolate(
        scrollY.value,
        inputRange,
        [0, 0, 0, -20],
        Extrapolate.CLAMP
      );
    }

    return {
      opacity: opacity.value,
      transform: [
        { scale: finalScale },
        { translateY: finalTranslateY },
      ],
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    
    const inputRange = [
      (index - 1) * 300,
      index * 300,
      (index + 1) * 300,
    ];
    
    const parallaxTranslateY = interpolate(
      scrollY.value,
      inputRange,
      [40, 0, -40],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ translateY: parallaxTranslateY }],
    };
  });

  const animatedFavoriteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <TouchableOpacity 
        activeOpacity={0.8} 
        onPress={handlePress}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.background.primary,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Animated.Image
            source={
              typeof restaurant.image === 'string'
                ? { uri: restaurant.image }
                : restaurant.image
            }
            style={[styles.image, animatedImageStyle]}
          />
          
          {/* Image Overlays */}
          <View style={styles.imageOverlay}>
            {/* Rating Badge */}
            <View style={[styles.ratingBadge, { backgroundColor: theme.colors.background.primary }]}>
              <Ionicons name="star" size={14} color={theme.colors.warning[500]} />
              <Text style={[styles.ratingText, { color: theme.colors.text.primary }]}>
                {restaurant.rating.toFixed(1)}
              </Text>
              <Text style={[styles.reviewCount, { color: theme.colors.text.secondary }]}>
                ({restaurant.reviewCount})
              </Text>
            </View>

            {/* Favorite Button */}
            <TouchableOpacity onPress={handleFavoritePress} style={styles.favoriteButton}>
              <Animated.View style={animatedFavoriteStyle}>
                <Ionicons
                  name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={restaurant.isFavorite ? theme.colors.danger[500] : '#FFFFFF'}
                />
              </Animated.View>
            </TouchableOpacity>
          </View>

          {/* Delivery Time Badge */}
          <View style={[styles.deliveryBadge, { backgroundColor: theme.colors.background.primary }]}>
            <Ionicons name="time-outline" size={14} color={theme.colors.text.secondary} />
            <Text style={[styles.deliveryText, { color: theme.colors.text.primary }]}>
              {restaurant.deliveryTime}
            </Text>
          </View>
        </View>

        {/* Card Content */}
        <View style={[styles.content, { backgroundColor: theme.colors.background.primary }]}>
          {/* Restaurant Name & Price */}
          <View style={styles.headerRow}>
            <Text style={[styles.name, { color: theme.colors.text.primary }]} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <Text style={[styles.price, { color: theme.colors.text.secondary }]}>
              {'$'.repeat(restaurant.priceLevel)}
            </Text>
          </View>

          {/* Cuisine Types */}
          <Text style={[styles.cuisine, { color: theme.colors.text.secondary }]} numberOfLines={1}>
            {restaurant.cuisineTypes.join(' • ')} • {restaurant.distance}
          </Text>

          {/* Promotions */}
          {restaurant.promotions && restaurant.promotions.length > 0 && (
            <View style={styles.promotions}>
              {restaurant.promotions.map((promo) => (
                <View
                  key={promo.id}
                  style={[
                    styles.promoTag,
                    { backgroundColor: promo.backgroundColor || theme.colors.primary[100] },
                  ]}
                >
                  <Text
                    style={[
                      styles.promoText,
                      { color: promo.color || theme.colors.primary[700] },
                    ]}
                  >
                    {promo.text}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 200,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  reviewCount: {
    marginLeft: 2,
    fontSize: 12,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  deliveryText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
  },
  cuisine: {
    fontSize: 14,
    marginBottom: 8,
  },
  promotions: {
    flexDirection: 'row',
    gap: 8,
  },
  promoTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promoText: {
    fontSize: 12,
    fontWeight: '600',
  },
});