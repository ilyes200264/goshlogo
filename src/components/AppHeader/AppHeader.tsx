import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface AppHeaderProps {
  logo?: React.ReactNode;
  title?: string;
  city?: string;
  onCityPress?: () => void;
  onNotificationPress: () => void;
  profileImage: ImageSourcePropType | string;
  onProfilePress: () => void;
  style?: ViewStyle;
  showBadge?: boolean;
  badgeCount?: number;
  showCity?: boolean;
  showLogo?: boolean;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const AppHeader: React.FC<AppHeaderProps> = ({
  logo,
  title,
  city = 'New York',
  onCityPress,
  onNotificationPress,
  profileImage,
  onProfilePress,
  style,
  showBadge = false,
  badgeCount = 0,
  showCity = true,
  showLogo = true,
}) => {
  const notificationScale = useSharedValue(1);
  const profileScale = useSharedValue(1);
  const cityScale = useSharedValue(1);

  const animatedNotificationStyle = useAnimatedStyle(() => ({
    transform: [{ scale: notificationScale.value }],
  }));

  const animatedProfileStyle = useAnimatedStyle(() => ({
    transform: [{ scale: profileScale.value }],
  }));

  const animatedCityStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cityScale.value }],
  }));

  const handleNotificationPress = () => {
    notificationScale.value = withSpring(0.9, {}, () => {
      notificationScale.value = withSpring(1);
    });
    onNotificationPress();
  };

  const handleProfilePress = () => {
    profileScale.value = withSpring(0.9, {}, () => {
      profileScale.value = withSpring(1);
    });
    onProfilePress();
  };

  const handleCityPress = () => {
    if (!onCityPress) return;
    cityScale.value = withSpring(0.95, {}, () => {
      cityScale.value = withSpring(1);
    });
    onCityPress();
  };

  const renderLogo = () => {
    if (logo) {
      return logo;
    }
    return (
      <Text style={styles.logoText}>olo</Text>
    );
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftSection}>
        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <>
            {showLogo && renderLogo()}
            
            {showCity && (
              <AnimatedTouchableOpacity
                style={[styles.cityPill, animatedCityStyle]}
                onPress={handleCityPress}
                disabled={!onCityPress}
                activeOpacity={onCityPress ? 0.7 : 1}
              >
                <MaterialIcons name="location-pin" size={16} color="#1F2937" />
                <Text style={styles.cityText}>{city}</Text>
              </AnimatedTouchableOpacity>
            )}
          </>
        )}
      </View>

      <View style={styles.rightSection}>
        <AnimatedTouchableOpacity
          style={[styles.notificationButton, animatedNotificationStyle]}
          onPress={handleNotificationPress}
        >
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          {showBadge && badgeCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badgeCount > 9 ? '9+' : badgeCount}</Text>
            </View>
          )}
        </AnimatedTouchableOpacity>

        <AnimatedTouchableOpacity
          style={[styles.profileButton, animatedProfileStyle]}
          onPress={handleProfilePress}
        >
          <Image
            source={typeof profileImage === 'string' ? { uri: profileImage } : profileImage}
            style={styles.profileImage}
          />
        </AnimatedTouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    letterSpacing: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  cityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 12,
  },
  cityText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 4,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  profileButton: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#10B981',
    padding: 2,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
});