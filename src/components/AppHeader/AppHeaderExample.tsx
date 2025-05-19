import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
} from 'react-native';
import { AppHeader } from './AppHeader';

// Example custom logo component
const CustomLogo: React.FC = () => (
  <View style={styles.customLogo}>
    <Text style={styles.customLogoText}>GoSholo</Text>
  </View>
);

export const AppHeaderExample: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [notificationCount, setNotificationCount] = useState(3);

  const handleCityPress = () => {
    // In a real app, this would open a city selector
    Alert.alert(
      'Select City',
      'Choose your location',
      [
        { text: 'New York', onPress: () => setSelectedCity('New York') },
        { text: 'Los Angeles', onPress: () => setSelectedCity('Los Angeles') },
        { text: 'Chicago', onPress: () => setSelectedCity('Chicago') },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', `You have ${notificationCount} new notifications`);
    setNotificationCount(0);
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Navigate to profile screen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Default Header with Text Logo</Text>
        <AppHeader
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage={require('../../../assets/images/profile-placeholder.jpg')}
          onProfilePress={handleProfilePress}
          showBadge={notificationCount > 0}
          badgeCount={notificationCount}
        />

        <Text style={styles.title}>Header with Custom Logo</Text>
        <AppHeader
          logo={<CustomLogo />}
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=3"
          onProfilePress={handleProfilePress}
        />

        <Text style={styles.title}>Header without City Selector</Text>
        <AppHeader
          city="San Francisco"
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=5"
          onProfilePress={handleProfilePress}
        />

        <Text style={styles.title}>Usage in a Screen</Text>
        <View style={styles.screenExample}>
          <AppHeader
            city={selectedCity}
            onCityPress={handleCityPress}
            onNotificationPress={handleNotificationPress}
            profileImage="https://i.pravatar.cc/150?img=8"
            onProfilePress={handleProfilePress}
            showBadge={true}
            badgeCount={99}
          />
          <View style={styles.content}>
            <Text style={styles.contentText}>Your app content here</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginTop: 24,
    marginBottom: 12,
  },
  customLogo: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  customLogoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  screenExample: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  contentText: {
    fontSize: 16,
    color: '#6B7280',
  },
});