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
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { RestaurantData } from './types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

interface ProfessionalRestaurantCardProps {
  restaurant: RestaurantData;
  onPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  variant?: 'default' | 'compact' | 'horizontal';
}

export const ProfessionalRestaurantCard: React.FC<ProfessionalRestaurantCardProps> = ({
  restaurant,
  onPress,
  onFavoriteToggle,
  variant = 'default',
}) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const favoriteScale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withTiming(0.97, { duration: 100 });
    setTimeout(() => {
      scale.value = withSpring(1);
    }, 100);
    
    if (onPress) {
      runOnJS(onPress)(restaurant);
    }
  };

  const handleFavoritePress = () => {
    favoriteScale.value = withSpring(0.7, { duration: 150 });
    setTimeout(() => {
      favoriteScale.value = withSpring(1.2, { duration: 150 });
      setTimeout(() => {
        favoriteScale.value = withSpring(1);
      }, 150);
    }, 150);

    if (onFavoriteToggle) {
      runOnJS(onFavoriteToggle)(restaurant);
    }
  };

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedFavoriteStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favoriteScale.value }],
  }));

  if (variant === 'compact') {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View
          style={[
            styles.compactContainer,
            { backgroundColor: theme.colors.background.primary },
            animatedContainerStyle,
          ]}
        >
          <Image
            source={
              restaurant.image
                ? (typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image)
                : { uri: restaurant.imageUrl || '' }
            }
            style={styles.compactImage}
          />
          <View style={styles.compactContent}>
            <View style={styles.compactHeader}>
              <Text style={[styles.compactName, { color: theme.colors.text.primary }]} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <View style={styles.compactRating}>
                <Ionicons name="star" size={14} color="#FFB800" />
                <Text style={[styles.compactRatingText, { color: theme.colors.text.primary }]}>
                  {restaurant.rating}
                </Text>
              </View>
            </View>
            <Text style={[styles.compactCuisine, { color: theme.colors.text.secondary }]} numberOfLines={1}>
              {restaurant.cuisineTypes?.join(' • ') || restaurant.cuisine || ''}
            </Text>
            <View style={styles.compactFooter}>
              {restaurant.deliveryTime && (
                <Text style={[styles.compactDelivery, { color: theme.colors.text.secondary }]}>
                  {restaurant.deliveryTime}
                </Text>
              )}
              {restaurant.promotions && restaurant.promotions.length > 0 ? (
                <View style={[styles.compactPromo, { backgroundColor: restaurant.promotions[0].backgroundColor || '#FEF3C7' }]}>
                  <Text style={[styles.compactPromoText, { color: restaurant.promotions[0].color || '#92400E' }]}>
                    {restaurant.promotions[0].text || restaurant.promotions[0].label}
                  </Text>
                </View>
              ) : restaurant.promotionalTag ? (
                <View style={[
                  styles.compactPromo, 
                  { 
                    backgroundColor: 
                      restaurant.promotionalTag.type === 'discount' ? '#FEE2E2' :
                      restaurant.promotionalTag.type === 'new' ? '#DBEAFE' :
                      '#E0E7FF'
                  }
                ]}>
                  <Text style={[
                    styles.compactPromoText, 
                    { 
                      color: 
                        restaurant.promotionalTag.type === 'discount' ? '#991B1B' :
                        restaurant.promotionalTag.type === 'new' ? '#1E40AF' :
                        '#4C1D95'
                    }
                  ]}>
                    {restaurant.promotionalTag.label}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  if (variant === 'horizontal') {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
        <Animated.View
          style={[
            styles.horizontalContainer,
            { backgroundColor: theme.colors.background.primary },
            animatedContainerStyle,
          ]}
        >
          <Image
            source={
              restaurant.image
                ? (typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image)
                : { uri: restaurant.imageUrl || '' }
            }
            style={styles.horizontalImage}
          />
          <View style={styles.horizontalContent}>
            <View style={styles.horizontalHeader}>
              <Text style={[styles.horizontalName, { color: theme.colors.text.primary }]} numberOfLines={1}>
                {restaurant.name}
              </Text>
              <TouchableOpacity onPress={handleFavoritePress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Animated.View style={animatedFavoriteStyle}>
                  <Ionicons
                    name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
                    size={20}
                    color={restaurant.isFavorite ? '#FF4757' : theme.colors.text.tertiary}
                  />
                </Animated.View>
              </TouchableOpacity>
            </View>
            <View style={styles.horizontalRating}>
              <Ionicons name="star" size={14} color="#FFB800" />
              <Text style={[styles.horizontalRatingText, { color: theme.colors.text.primary }]}>
                {restaurant.rating} ({restaurant.reviewCount})
              </Text>
              <Text style={[styles.horizontalDistance, { color: theme.colors.text.secondary }]}>
                • {restaurant.distance}
              </Text>
            </View>
            <Text style={[styles.horizontalCuisine, { color: theme.colors.text.secondary }]} numberOfLines={1}>
              {restaurant.cuisineTypes?.join(' • ') || restaurant.cuisine || ''} • {'$'.repeat(restaurant.priceLevel)}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  // Default variant
  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: theme.colors.background.primary },
          animatedContainerStyle,
        ]}
      >
        {/* Image Container */}
        <View style={styles.imageContainer}>
          <Image
            source={
              restaurant.image
                ? (typeof restaurant.image === 'string' ? { uri: restaurant.image } : restaurant.image)
                : { uri: restaurant.imageUrl || '' }
            }
            style={styles.image}
          />
          
          {/* Rating Badge */}
          <View style={[styles.ratingBadge, { backgroundColor: theme.colors.background.primary }]}>
            <Ionicons name="star" size={14} color="#FFB800" />
            <Text style={[styles.ratingText, { color: theme.colors.text.primary }]}>
              {restaurant.rating}
            </Text>
          </View>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={handleFavoritePress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Animated.View style={animatedFavoriteStyle}>
              <Ionicons
                name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
                size={24}
                color={restaurant.isFavorite ? '#FF4757' : '#FFFFFF'}
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Delivery Time */}
          {restaurant.deliveryTime && (
            <View style={[styles.deliveryBadge, { backgroundColor: theme.colors.background.primary }]}>
              <Text style={[styles.deliveryText, { color: theme.colors.text.primary }]}>
                {restaurant.deliveryTime}
              </Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={[styles.name, { color: theme.colors.text.primary }]} numberOfLines={1}>
              {restaurant.name}
            </Text>
            <Text style={[styles.price, { color: theme.colors.text.secondary }]}>
              {restaurant.price || '$'.repeat(restaurant.priceLevel || 1)}
            </Text>
          </View>

          <View style={styles.info}>
            <Text style={[styles.cuisine, { color: theme.colors.text.secondary }]} numberOfLines={1}>
              {restaurant.cuisineTypes?.join(' • ') || restaurant.cuisine || ''}
            </Text>
            <Text style={[styles.distance, { color: theme.colors.text.secondary }]}>
              • {restaurant.distance}
            </Text>
          </View>

          {/* Promotions */}
          {(restaurant.promotions && restaurant.promotions.length > 0) || restaurant.promotionalTag ? (
            <View style={styles.promotions}>
              {restaurant.promotions ? (
                restaurant.promotions.slice(0, 2).map((promo) => (
                  <View
                    key={promo.id || promo.text}
                    style={[
                      styles.promoTag,
                      { backgroundColor: promo.backgroundColor || '#FEF3C7' },
                    ]}
                  >
                    <Text style={[styles.promoText, { color: promo.color || '#92400E' }]}>
                      {promo.text || promo.label}
                    </Text>
                  </View>
                ))
              ) : restaurant.promotionalTag ? (
                <View
                  style={[
                    styles.promoTag,
                    { 
                      backgroundColor: 
                        restaurant.promotionalTag.type === 'discount' ? '#FEE2E2' :
                        restaurant.promotionalTag.type === 'new' ? '#DBEAFE' :
                        '#E0E7FF'
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.promoText,
                      { 
                        color: 
                          restaurant.promotionalTag.type === 'discount' ? '#991B1B' :
                          restaurant.promotionalTag.type === 'new' ? '#1E40AF' :
                          '#4C1D95'
                      }
                    ]}
                  >
                    {restaurant.promotionalTag.label}
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Default variant styles
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  imageContainer: {
    height: 180,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deliveryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  header: {
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
    fontWeight: '500',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cuisine: {
    fontSize: 14,
    fontWeight: '400',
  },
  distance: {
    fontSize: 14,
    fontWeight: '400',
  },
  promotions: {
    flexDirection: 'row',
    gap: 8,
  },
  promoTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promoText: {
    fontSize: 12,
    fontWeight: '600',
  },

  // Compact variant styles
  compactContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    height: 100,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  compactImage: {
    width: 100,
    height: '100%',
  },
  compactContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  compactRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactRatingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  compactCuisine: {
    fontSize: 14,
    marginVertical: 4,
  },
  compactFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  compactDelivery: {
    fontSize: 12,
  },
  compactPromo: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  compactPromoText: {
    fontSize: 11,
    fontWeight: '600',
  },

  // Horizontal variant styles
  horizontalContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    height: 120,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  horizontalImage: {
    width: 120,
    height: '100%',
  },
  horizontalContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  horizontalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  horizontalRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  horizontalRatingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
  horizontalDistance: {
    fontSize: 14,
  },
  horizontalCuisine: {
    fontSize: 14,
  },
});