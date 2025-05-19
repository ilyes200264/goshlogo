import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export interface FeaturedRestaurantCardProps {
  image: string;
  isTrending?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  restaurantName: string;
  categories: string[];
  distance: string;
  status: 'Open' | 'Closed' | 'Busy';
  rating: number;
  reviews: number;
  freeDelivery?: boolean;
  priceLevel: number;
  onSeeMenu?: () => void;
  onBookTable?: () => void;
}

export const FeaturedRestaurantCard: React.FC<FeaturedRestaurantCardProps> = ({
  image,
  isTrending = false,
  isFavorite = false,
  onToggleFavorite,
  restaurantName,
  categories,
  distance,
  status,
  rating,
  reviews,
  freeDelivery = false,
  priceLevel,
  onSeeMenu,
  onBookTable,
}) => {
  const { theme } = useTheme();
  const heartScale = useSharedValue(1);

  const animatedHeartStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: heartScale.value }],
    };
  });

  const handleFavoritePress = () => {
    heartScale.value = withSpring(0.8, {}, () => {
      heartScale.value = withSpring(1.2, {}, () => {
        heartScale.value = withSpring(1);
      });
    });
    onToggleFavorite?.();
  };

  const getStatusColor = () => {
    switch (status) {
      case 'Open':
        return '#FF6B35';
      case 'Closed':
        return '#EF4444';
      case 'Busy':
        return '#F59E0B';
      default:
        return theme.colors.primary[500];
    }
  };

  const getPriceString = () => {
    return '$'.repeat(priceLevel);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Top Left Badge */}
        {isTrending && (
          <View style={[styles.trendingBadge, { backgroundColor: '#10B981' }]}>
            <MaterialIcons name="trending-up" size={16} color="#FFFFFF" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}

        {/* Top Right Heart */}
        <AnimatedTouchableOpacity
          style={[styles.favoriteButton, animatedHeartStyle]}
          onPress={handleFavoritePress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#EF4444' : '#FFFFFF'}
          />
        </AnimatedTouchableOpacity>

        {/* Bottom Left Overlay */}
        <View style={[styles.bottomLeftOverlay]}>
          <Text style={styles.categoryDistanceText}>
            {categories[0]} • {distance}
          </Text>
        </View>

        {/* Bottom Right Badge */}
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={[styles.restaurantName, { color: theme.colors.text.primary }]}>
          {restaurantName}
        </Text>
        
        <Text style={[styles.cuisineText, { color: theme.colors.text.secondary }]}>
          {categories.join(' • ')}
        </Text>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={[styles.ratingText, { color: theme.colors.text.primary }]}>
              {rating}
            </Text>
            <Text style={[styles.reviewsText, { color: theme.colors.text.secondary }]}>
              ({reviews})
            </Text>
          </View>

          {freeDelivery && (
            <View style={styles.deliveryContainer}>
              <MaterialIcons name="delivery-dining" size={18} color={theme.colors.primary[500]} />
              <Text style={[styles.deliveryText, { color: theme.colors.text.secondary }]}>
                Free Delivery
              </Text>
            </View>
          )}

          <View style={[styles.priceLevel, { backgroundColor: theme.colors.primary[100] }]}>
            <Text style={[styles.priceLevelText, { color: theme.colors.primary[600] }]}>
              {getPriceString()}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.seeMenuButton]}
            onPress={onSeeMenu}
            activeOpacity={0.8}
          >
            <Text style={styles.seeMenuText}>See Menu</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.bookTableButton]}
            onPress={onBookTable}
            activeOpacity={0.8}
          >
            <Text style={styles.bookTableText}>Book Table</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  trendingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  trendingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomLeftOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryDistanceText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cuisineText: {
    fontSize: 14,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    marginLeft: 2,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  deliveryText: {
    fontSize: 14,
    marginLeft: 4,
  },
  priceLevel: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priceLevelText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeMenuButton: {
    backgroundColor: '#FF6B35',
  },
  seeMenuText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bookTableButton: {
    backgroundColor: '#F3F4F6',
  },
  bookTableText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
  },
});