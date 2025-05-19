import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const { width: screenWidth } = Dimensions.get('window');

export interface ProfileCardProps {
  avatarUri: string;
  onEditPhoto: () => void;
  name: string;
  subtitle: string;
  isPremium?: boolean;
  isVerified?: boolean;
  onEditProfile: () => void;
  containerStyle?: ViewStyle;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  avatarUri,
  onEditPhoto,
  name,
  subtitle,
  isPremium = false,
  isVerified = false,
  onEditProfile,
  containerStyle,
}) => {
  const { theme } = useTheme();

  // Split subtitle into role and location
  const [role, location] = subtitle.includes('•') 
    ? subtitle.split('•').map(s => s.trim())
    : [subtitle, ''];

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          style={styles.avatarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.avatarInner}>
            <Image
              source={{ uri: avatarUri }}
              style={styles.avatar}
            />
          </View>
        </LinearGradient>
        
        {/* Camera Icon Button */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={onEditPhoto}
          activeOpacity={0.8}
        >
          <View style={styles.cameraButtonInner}>
            <Ionicons
              name="camera"
              size={20}
              color="#FFFFFF"
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={[styles.userName, { color: theme.colors.teal?.[600] || '#14B8A6' }]}>
        {name}
      </Text>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>{role}</Text>
        {location && (
          <>
            <Text style={styles.dot}> • </Text>
            <Text style={styles.subtitle}>{location}</Text>
          </>
        )}
      </View>

      {/* Badges */}
      <View style={styles.badgesContainer}>
        {isPremium && (
          <View style={[styles.badge, styles.premiumBadge]}>
            <Ionicons
              name="star"
              size={14}
              color="#FFFFFF"
              style={styles.badgeIcon}
            />
            <Text style={styles.badgeText}>Premium</Text>
          </View>
        )}
        
        {isVerified && (
          <View style={[styles.badge, styles.verifiedBadge]}>
            <Ionicons
              name="checkmark-circle"
              size={14}
              color="#FFFFFF"
              style={styles.badgeIcon}
            />
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        )}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={onEditProfile}
        activeOpacity={0.8}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarGradient: {
    width: 124,
    height: 124,
    borderRadius: 62,
    padding: 3,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 58,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B35',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cameraButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  dot: {
    fontSize: 16,
    color: '#6B7280',
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeIcon: {
    marginRight: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  premiumBadge: {
    backgroundColor: '#10B981',
  },
  verifiedBadge: {
    backgroundColor: '#3B82F6',
  },
  editButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});