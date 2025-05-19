import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface ReviewData {
  id: string;
  userAvatar: string;
  userName: string;
  restaurantName: string;
  timeAgo: string;
  rating: number;
  reviewText: string;
  images?: string[];
  likes: number;
  comments: number;
  isLiked?: boolean;
}

interface ReviewCardProps {
  review: ReviewData;
  onLike?: (reviewId: string) => void;
  onComment?: (reviewId: string) => void;
  onShare?: (reviewId: string) => void;
  onImagePress?: (imageUrl: string) => void;
  style?: ViewStyle;
  animationDelay?: number;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onLike,
  onComment,
  onShare,
  onImagePress,
  style,
  animationDelay = 0,
}) => {
  const likeScale = useSharedValue(1);

  const animatedLikeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  const handleLike = () => {
    likeScale.value = withSpring(0.8, {}, () => {
      likeScale.value = withSpring(1);
    });
    onLike?.(review.id);
  };

  const renderStars = () => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= review.rating ? 'star' : 'star-outline'}
            size={16}
            color="#F59E0B"
            style={styles.star}
          />
        ))}
      </View>
    );
  };

  return (
    <Animated.View
      entering={FadeInUp.delay(animationDelay).duration(500)}
      style={[styles.container, style]}
    >
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: review.userAvatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{review.userName}</Text>
            <Text style={styles.restaurantName}>for {review.restaurantName}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{review.timeAgo}</Text>
      </View>

      {renderStars()}

      <Text style={styles.reviewText}>{review.reviewText}</Text>

      {review.images && review.images.length > 0 && (
        <View style={styles.imagesContainer}>
          {review.images.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              onPress={() => onImagePress?.(image)}
            >
              <Image source={{ uri: image }} style={styles.reviewImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <AnimatedTouchableOpacity
          style={[styles.actionButton, animatedLikeStyle]}
          onPress={handleLike}
        >
          <Ionicons
            name={review.isLiked ? 'heart' : 'heart-outline'}
            size={20}
            color={review.isLiked ? '#EF4444' : '#6B7280'}
          />
          <Text style={[styles.actionText, review.isLiked && styles.likedText]}>
            {review.likes}
          </Text>
        </AnimatedTouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onComment?.(review.id)}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#6B7280" />
          <Text style={styles.actionText}>{review.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onShare?.(review.id)}
        >
          <Ionicons name="share-outline" size={20} color="#6B7280" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  restaurantName: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  timeAgo: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  star: {
    marginRight: 2,
  },
  reviewText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  imageWrapper: {
    marginRight: 8,
  },
  reviewImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  likedText: {
    color: '#EF4444',
  },
});