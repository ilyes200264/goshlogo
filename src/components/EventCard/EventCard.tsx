import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 32;

export interface EventCardProps {
  image: string;
  isTrending?: boolean;
  isBookmarked?: boolean;
  onToggleBookmark?: () => void;
  eventName: string;
  location: string;
  date: string;
  time: string;
  eventType: string;
  attending: string;
  outdoor?: boolean;
  isFreeEntry?: boolean;
  onGetTickets?: () => void;
  onViewDetails?: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  image,
  isTrending = false,
  isBookmarked = false,
  onToggleBookmark,
  eventName,
  location,
  date,
  time,
  eventType,
  attending,
  outdoor = false,
  isFreeEntry = false,
  onGetTickets,
  onViewDetails,
}) => {
  const { theme } = useTheme();
  const bookmarkScale = useSharedValue(1);
  const bookmarkRotation = useSharedValue(0);

  const animatedBookmarkStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: bookmarkScale.value },
        { rotate: `${bookmarkRotation.value}deg` },
      ],
    };
  });

  const handleBookmarkPress = () => {
    bookmarkScale.value = withSequence(
      withSpring(0.8),
      withSpring(1.2),
      withSpring(1)
    );
    bookmarkRotation.value = withSequence(
      withSpring(-10),
      withSpring(10),
      withSpring(0)
    );
    onToggleBookmark?.();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        
        {/* Top Left Badge */}
        {isTrending && (
          <View style={[styles.trendingBadge, { backgroundColor: '#10B981' }]}>
            <FontAwesome5 name="fire" size={16} color="#FFFFFF" />
            <Text style={styles.trendingText}>Trending</Text>
          </View>
        )}

        {/* Top Right Bookmark */}
        <AnimatedTouchableOpacity
          style={[styles.bookmarkButton, animatedBookmarkStyle]}
          onPress={handleBookmarkPress}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#FFD700' : '#FFFFFF'}
          />
        </AnimatedTouchableOpacity>

        {/* Bottom Left Overlay */}
        <View style={[styles.dateTimeOverlay]}>
          <Text style={styles.dateTimeText}>
            {date} • {time}
          </Text>
        </View>

        {/* Bottom Right Badge */}
        <View style={[styles.eventTypeBadge, { backgroundColor: '#FF6B35' }]}>
          <Text style={styles.eventTypeText}>{eventType}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <Text style={[styles.eventName, { color: theme.colors.text.primary }]}>
          {eventName}
        </Text>
        
        <Text style={[styles.locationText, { color: theme.colors.text.secondary }]}>
          {location}
        </Text>

        {/* Info Row */}
        <View style={styles.infoRow}>
          <View style={styles.attendingContainer}>
            <MaterialIcons name="group" size={18} color="#FF6B35" />
            <Text style={[styles.attendingText, { color: '#FF6B35' }]}>
              {attending} attending
            </Text>
          </View>

          {outdoor && (
            <>
              <Text style={[styles.separator, { color: theme.colors.text.secondary }]}>•</Text>
              <Text style={[styles.outdoorText, { color: theme.colors.text.secondary }]}>
                Outdoor
              </Text>
            </>
          )}

          {isFreeEntry && (
            <View style={[styles.freeEntryBadge, { backgroundColor: '#DBEAFE' }]}>
              <Text style={[styles.freeEntryText, { color: '#3B82F6' }]}>
                Free Entry
              </Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.getTicketsButton]}
            onPress={onGetTickets}
            activeOpacity={0.8}
          >
            <Text style={styles.getTicketsText}>Get Tickets</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.viewDetailsButton]}
            onPress={onViewDetails}
            activeOpacity={0.8}
          >
            <Text style={styles.viewDetailsText}>View Details</Text>
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
  bookmarkButton: {
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
  dateTimeOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dateTimeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  eventTypeBadge: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  eventTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  attendingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  outdoorText: {
    fontSize: 14,
  },
  freeEntryBadge: {
    marginLeft: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  freeEntryText: {
    fontSize: 12,
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
  getTicketsButton: {
    backgroundColor: '#FF6B35',
  },
  getTicketsText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  viewDetailsButton: {
    backgroundColor: '#F3F4F6',
  },
  viewDetailsText: {
    color: '#4B5563',
    fontSize: 14,
    fontWeight: '600',
  },
});