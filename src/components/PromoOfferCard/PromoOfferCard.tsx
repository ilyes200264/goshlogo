import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  ViewStyle,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

interface PromoOfferCardProps {
  image: string;
  promoText: string;
  minSpend: string;
  distance: string;
  timeLeft: string;
  restaurantName: string;
  categories: string[];
  rating: number;
  reviews: number;
  freeDelivery: boolean;
  priceLevel: number;
  onClaim: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  style?: ViewStyle;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const PromoOfferCard: React.FC<PromoOfferCardProps> = ({
  image,
  promoText,
  minSpend,
  distance,
  timeLeft,
  restaurantName,
  categories,
  rating,
  reviews,
  freeDelivery,
  priceLevel,
  onClaim,
  isFavorite,
  onToggleFavorite,
  style,
}) => {
  const heartScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleFavoritePress = () => {
    heartScale.value = withSequence(
      withSpring(1.2),
      withSpring(0.8),
      withSpring(1)
    );
    onToggleFavorite();
  };

  const handleClaimPress = () => {
    buttonScale.value = withSequence(
      withSpring(0.95),
      withSpring(1)
    );
    onClaim();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Promo Badge */}
        <View style={styles.promoBadge}>
          <Ionicons name="pricetag" size={16} color="#FFFFFF" />
          <Text style={styles.promoText}>{promoText}</Text>
        </View>

        {/* Favorite Button */}
        <AnimatedTouchableOpacity
          style={[styles.favoriteButton, animatedHeartStyle]}
          onPress={handleFavoritePress}
        >
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? '#EF4444' : '#FFFFFF'}
          />
        </AnimatedTouchableOpacity>

        {/* Bottom Left Info */}
        <View style={styles.bottomInfoContainer}>
          <Text style={styles.bottomInfoText}>
            Min. spend {minSpend} • {distance}
          </Text>
        </View>

        {/* Time Left Badge */}
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>{timeLeft}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.categories}>{categories.join(' • ')}</Text>

        <View style={styles.infoRow}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#F59E0B" />
            <Text style={styles.rating}>{rating}</Text>
            <Text style={styles.reviews}>({reviews})</Text>
          </View>

          {freeDelivery && (
            <View style={styles.freeDeliveryBadge}>
              <Text style={styles.freeDeliveryText}>Free Delivery</Text>
            </View>
          )}

          <View style={styles.priceBadge}>
            <Text style={styles.priceText}>
              {'$'.repeat(priceLevel)}
            </Text>
          </View>
        </View>

        <AnimatedTouchableOpacity
          style={[styles.claimButton, animatedButtonStyle]}
          onPress={handleClaimPress}
          activeOpacity={0.8}
        >
          <Text style={styles.claimButtonText}>Claim Offer</Text>
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    height: 200,
    position: 'relative',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  promoBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  promoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomInfoContainer: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  bottomInfoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  timeBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#F97316',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  categories: {
    fontSize: 14,
    color: '#6B7280',
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
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
    marginRight: 2,
  },
  reviews: {
    fontSize: 14,
    color: '#6B7280',
  },
  freeDeliveryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 16,
  },
  freeDeliveryText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  priceBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 'auto',
  },
  priceText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  claimButton: {
    backgroundColor: '#F97316',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});