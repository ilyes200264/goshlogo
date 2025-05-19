import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import { ProfileMenuItem, ProfileStats, ScreenWrapper } from '../components';
import { useTheme } from '../contexts';
import { useBottomTabBarHeight } from '../hooks';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type Props = {
  navigation: TabNavigationProp<'Profile'>;
};

export const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  
  if (!theme) {
    return null;
  }

  // Profile stats data
  const stats = [
    {
      icon: 'heart' as keyof typeof Ionicons.glyphMap,
      value: '156',
      label: 'Favorites',
      color: '#EF4444',
    },
    {
      icon: 'star' as keyof typeof Ionicons.glyphMap,
      value: '4.8',
      label: 'Avg Rating',
      color: '#FFD700',
    },
    {
      icon: 'restaurant' as keyof typeof Ionicons.glyphMap,
      value: '89',
      label: 'Reviews',
      color: '#3B82F6',
    },
  ];

  // Handlers
  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon');
  };

  const handleStatPress = (stat: any) => {
    Alert.alert(stat.label, `Viewing ${stat.label} details`);
  };

  const handleEditPhoto = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: () => console.log('Camera') },
        { text: 'Choose from Library', onPress: () => console.log('Library') },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => console.log('Logout'), style: 'destructive' }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.background?.primary || '#FFFFFF' }]}>
      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme?.colors?.primary?.[500] || '#5BC4DB' }]}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              // Settings screen not implemented yet
              Alert.alert('Settings', 'Settings screen coming soon');
            }}
          >
            <Ionicons name="settings-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <TouchableOpacity onPress={handleEditPhoto} activeOpacity={0.8}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' }}
                  style={styles.avatar}
                />
                <View style={[styles.editPhotoButton, { backgroundColor: theme?.colors?.secondary?.[500] || '#016167' }]}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </View>
              </View>
            </TouchableOpacity>

            <Text style={styles.name}>Sarah Miller</Text>
            <Text style={styles.subtitle}>Food Explorer • Midtown</Text>

            <View style={styles.badges}>
              <View style={[styles.badge, { backgroundColor: theme?.colors?.accent?.[50] || '#FFFFFF' }]}>
                <MaterialIcons name="verified" size={16} color="#FF6233" />
                <Text style={[styles.badgeText2, { marginLeft: 4 }]}>Verified</Text>
              </View>
              <View style={[styles.badge, { backgroundColor: theme?.colors?.accent?.[500] || '#FF6233' }]}>
                <Ionicons name="star" size={16} color="#FFFFFF" />
                <Text style={[styles.badgeText, { marginLeft: 4 }]}>Premium</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats Section */}
        <ProfileStats stats={stats} onStatPress={handleStatPress} />

        {/* Rewards Section */}
        <View style={[styles.rewardsSection, { backgroundColor: theme?.colors?.primary?.[50] || '#E6F7FA' }]}>
          <View style={styles.rewardsHeader}>
            <View style={styles.rewardsLeft}>
              <Ionicons name="trophy" size={24} color={theme?.colors?.primary?.[500] || '#5BC4DB'} />
              <View style={styles.rewardsTextContainer}>
                <Text style={[styles.rewardsTitle, { color: theme?.colors?.text?.primary || '#1F2937' }]}>
                  GoSholo Rewards
                </Text>
                <Text style={[styles.rewardsPoints, { color: theme?.colors?.accent?.[500] || '#FF6233' }]}>
                  2,450 points
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => Alert.alert('Rewards', 'View rewards details')}>
              <Text style={[styles.viewRewards, { color: theme?.colors?.secondary?.[500] || '#016167' }]}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={[styles.section, { backgroundColor: theme?.colors?.background?.secondary || '#F9FAFB' }]}>
          <Text style={[styles.sectionTitle, { color: theme?.colors?.text?.primary || '#1F2937' }]}>
            Account
          </Text>
          <ProfileMenuItem
            icon="person-outline"
            title="Personal Information"
            subtitle="Update your details"
            onPress={() => Alert.alert('Personal Info', 'Edit personal information')}
          />
          <ProfileMenuItem
            icon="location-outline"
            title="Addresses"
            subtitle="Manage delivery addresses"
            rightText="3"
            onPress={() => Alert.alert('Addresses', 'Manage addresses')}
          />
          <ProfileMenuItem
            icon="card-outline"
            title="Payment Methods"
            subtitle="Add or remove payment methods"
            rightText="2"
            onPress={() => Alert.alert('Payment', 'Manage payment methods')}
            showBorder={false}
          />
        </View>

        <View style={[styles.section, { backgroundColor: theme?.colors?.background?.secondary || '#F9FAFB' }]}>
          <Text style={[styles.sectionTitle, { color: theme?.colors?.text?.primary || '#1F2937' }]}>
            Preferences
          </Text>
          <ProfileMenuItem
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage notification settings"
            onPress={() => {
              // Notifications screen exists, safe to navigate
              try {
                navigation.navigate('Notifications');
              } catch (error) {
                Alert.alert('Notifications', 'Notifications screen');
              }
            }}
          />
          <ProfileMenuItem
            icon="language-outline"
            title="Language"
            subtitle="English"
            onPress={() => Alert.alert('Language', 'Select language')}
          />
          <ProfileMenuItem
            icon="color-palette-outline"
            title="Appearance"
            subtitle="Light theme"
            onPress={() => Alert.alert('Theme', 'Select theme')}
            showBorder={false}
          />
        </View>

        <View style={[styles.section, { backgroundColor: theme?.colors?.background?.secondary || '#F9FAFB' }]}>
          <Text style={[styles.sectionTitle, { color: theme?.colors?.text?.primary || '#1F2937' }]}>
            Support & About
          </Text>
          <ProfileMenuItem
            icon="help-circle-outline"
            title="Help Center"
            onPress={() => Alert.alert('Help', 'Opening help center')}
          />
          <ProfileMenuItem
            icon="chatbubble-outline"
            title="Contact Us"
            onPress={() => Alert.alert('Contact', 'Contact support')}
          />
          <ProfileMenuItem
            icon="document-text-outline"
            title="Terms & Privacy"
            onPress={() => Alert.alert('Terms', 'View terms and privacy')}
          />
          <ProfileMenuItem
            icon="information-circle-outline"
            title="About"
            subtitle="Version 1.0.0"
            onPress={() => Alert.alert('About', 'GoSholo v1.0.0')}
            showBorder={false}
          />
        </View>

        {/* Logout */}
        <View style={[styles.section, { backgroundColor: theme?.colors?.background?.secondary || '#F9FAFB' }]}>
          <ProfileMenuItem
            icon="log-out-outline"
            title="Logout"
            onPress={handleLogout}
            danger
            showBorder={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  header: {
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  badgeText2: {
    color: '#FF6233',
    fontSize: 12,
    fontWeight: '600',
  },
  editProfileButton: {
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsSection: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardsTextContainer: {
    // gap: 2,
  },
  rewardsTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  rewardsPoints: {
    fontSize: 14,
    fontWeight: '500',
  },
  viewRewards: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
});