import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { RestaurantData, PromotionalTag } from './types';

interface RestaurantCardProps {
  restaurant: RestaurantData;
  onPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  style?: ViewStyle;
  imageHeight?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onPress,
  onFavoriteToggle,
  style,
  imageHeight = 200,
}) => {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(restaurant.isFavorite || false);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) {
      onFavoriteToggle({ ...restaurant, isFavorite: !isFavorite });
    }
  };

  const handlePress = () => {
    if (onPress) {
      onPress(restaurant);
    }
  };

  const getPriceLevel = (level: number) => {
    return '$'.repeat(Math.min(Math.max(level, 1), 4));
  };

  const getImageSource = () => {
    if (typeof restaurant.image === 'string') {
      return { uri: restaurant.image };
    }
    return restaurant.image;
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          ...theme.shadows.md,
        },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      {/* Restaurant Image */}
      <View style={[styles.imageContainer, { height: imageHeight }]}>
        <Image
          source={getImageSource()}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="cover"
          defaultSource={{ uri: 'https://via.placeholder.com/300x200?text=Restaurant' }}
        />
        
        {/* Rating Badge */}
        <View
          style={[
            styles.ratingBadge,
            {
              backgroundColor: theme.colors.background.primary,
              ...theme.shadows.sm,
            },
          ]}
        >
          <Ionicons name="star" size={14} color={theme.colors.semantic.warning} />
          <Text
            style={[
              styles.ratingText,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.sm,
              },
            ]}
          >
            {restaurant.rating.toFixed(1)}
          </Text>
          <Text
            style={[
              styles.reviewCount,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.xs,
              },
            ]}
          >
            ({restaurant.reviewCount})
          </Text>
        </View>

        {/* Favorite Button */}
        <TouchableOpacity
          style={[
            styles.favoriteButton,
            {
              backgroundColor: theme.colors.background.primary,
              ...theme.shadows.sm,
            },
          ]}
          onPress={handleFavoriteToggle}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? theme.colors.semantic.error : theme.colors.text.secondary}
          />
        </TouchableOpacity>

        {/* Delivery Info Overlay */}
        <View style={styles.deliveryInfoContainer}>
          <View
            style={[
              styles.deliveryBadge,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              },
            ]}
          >
            <Ionicons name="time-outline" size={14} color="white" />
            <Text style={styles.deliveryText}>{restaurant.deliveryTime}</Text>
          </View>
          <View
            style={[
              styles.deliveryBadge,
              {
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                marginLeft: 8,
              },
            ]}
          >
            <Ionicons name="location-outline" size={14} color="white" />
            <Text style={styles.deliveryText}>{restaurant.distance}</Text>
          </View>
        </View>
      </View>

      {/* Card Body */}
      <View style={[styles.cardBody, { padding: theme.spacing[3] }]}>
        {/* Restaurant Name and Price Level */}
        <View style={styles.headerRow}>
          <Text
            style={[
              styles.restaurantName,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
              },
            ]}
            numberOfLines={1}
          >
            {restaurant.name}
          </Text>
          <Text
            style={[
              styles.priceLevel,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.base,
              },
            ]}
          >
            {getPriceLevel(restaurant.priceLevel)}
          </Text>
        </View>

        {/* Cuisine Types */}
        <Text
          style={[
            styles.cuisineTypes,
            {
              color: theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.sm,
              marginTop: theme.spacing[1],
            },
          ]}
          numberOfLines={1}
        >
          {restaurant.cuisineTypes.join(' • ')}
        </Text>

        {/* Promotional Tags */}
        {restaurant.promotions && restaurant.promotions.length > 0 && (
          <View style={[styles.promotionContainer, { marginTop: theme.spacing[2] }]}>
            {restaurant.promotions.map((promo) => (
              <View
                key={promo.id}
                style={[
                  styles.promotionBadge,
                  {
                    backgroundColor: promo.backgroundColor || theme.colors.primary[50],
                    borderRadius: theme.borderRadius.sm,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.promotionText,
                    {
                      color: promo.color || theme.colors.primary[600],
                      fontSize: theme.typography.fontSize.xs,
                    },
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
  );
};

// Horizontal variant for horizontal scrolling
export const RestaurantCardHorizontal: React.FC<RestaurantCardProps> = (props) => {
  return (
    <RestaurantCard
      {...props}
      style={[{ width: 280 }, props.style]}
      imageHeight={150}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    fontWeight: '600',
  },
  reviewCount: {
    marginLeft: 2,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deliveryInfoContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
  },
  deliveryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  deliveryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardBody: {},
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantName: {
    fontWeight: '700',
    flex: 1,
  },
  priceLevel: {
    fontWeight: '500',
    marginLeft: 8,
  },
  cuisineTypes: {},
  promotionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  promotionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  promotionText: {
    fontWeight: '600',
  },
});