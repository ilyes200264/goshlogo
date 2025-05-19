import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { AppHeader } from '../components';
import { Ionicons } from '@expo/vector-icons';

// Example SVG Logo Component
const SVGLogo: React.FC = () => (
  <View style={styles.svgLogo}>
    <Ionicons name="fast-food" size={24} color="#10B981" />
  </View>
);

// Example custom styled logo
const StyledLogo: React.FC = () => (
  <View style={styles.styledLogo}>
    <Text style={styles.logoTextMain}>go</Text>
    <Text style={styles.logoTextAccent}>sholo</Text>
  </View>
);

export const AppHeaderDemo: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('New York');
  const [notificationCount, setNotificationCount] = useState(5);
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

  const handleCityPress = () => {
    Alert.alert(
      'Select City',
      'Choose your location',
      cities.map(city => ({
        text: city,
        onPress: () => setSelectedCity(city),
      })).concat([{ text: 'Cancel', style: 'cancel' }]),
    );
  };

  const handleNotificationPress = () => {
    Alert.alert('Notifications', `You have ${notificationCount} new notifications`);
    // Simulate marking notifications as read
    setTimeout(() => setNotificationCount(0), 1000);
  };

  const handleProfilePress = () => {
    Alert.alert('Profile', 'Navigate to profile screen');
  };

  const headerExamples = [
    {
      title: 'Default Header',
      component: (
        <AppHeader
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=1"
          onProfilePress={handleProfilePress}
          showBadge={notificationCount > 0}
          badgeCount={notificationCount}
        />
      ),
    },
    {
      title: 'With SVG Icon Logo',
      component: (
        <AppHeader
          logo={<SVGLogo />}
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=2"
          onProfilePress={handleProfilePress}
          showBadge={true}
          badgeCount={3}
        />
      ),
    },
    {
      title: 'With Custom Styled Logo',
      component: (
        <AppHeader
          logo={<StyledLogo />}
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=3"
          onProfilePress={handleProfilePress}
        />
      ),
    },
    {
      title: 'Without City Selector',
      component: (
        <AppHeader
          city="San Francisco"
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=4"
          onProfilePress={handleProfilePress}
        />
      ),
    },
    {
      title: 'With Large Badge Count',
      component: (
        <AppHeader
          city={selectedCity}
          onCityPress={handleCityPress}
          onNotificationPress={handleNotificationPress}
          profileImage="https://i.pravatar.cc/150?img=5"
          onProfilePress={handleProfilePress}
          showBadge={true}
          badgeCount={99}
        />
      ),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainTitle}>App Header Examples</Text>
        
        <View style={styles.exampleSelector}>
          {headerExamples.map((example, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.selectorButton,
                selectedExample === index && styles.selectorButtonActive,
              ]}
              onPress={() => setSelectedExample(index)}
            >
              <Text
                style={[
                  styles.selectorText,
                  selectedExample === index && styles.selectorTextActive,
                ]}
              >
                {example.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.headerContainer}>
          {headerExamples[selectedExample].component}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Component Features</Text>
          <View style={styles.featureList}>
            <FeatureItem title="Animated interactions" />
            <FeatureItem title="Customizable logo" />
            <FeatureItem title="City selector with callback" />
            <FeatureItem title="Notification badge" />
            <FeatureItem title="Profile image with border" />
            <FeatureItem title="Responsive design" />
          </View>
        </View>

        <View style={styles.codeExample}>
          <Text style={styles.codeTitle}>Usage Example</Text>
          <View style={styles.codeBlock}>
            <Text style={styles.codeText}>{`<AppHeader
  logo={<CustomLogo />}
  city="New York"
  onCityPress={handleCitySelect}
  onNotificationPress={handleNotifications}
  profileImage={userAvatar}
  onProfilePress={handleProfile}
  showBadge={hasNotifications}
  badgeCount={notificationCount}
/>`}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const FeatureItem: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.featureItem}>
    <Ionicons name="checkmark-circle" size={20} color="#10B981" />
    <Text style={styles.featureText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  exampleSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  selectorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  selectorButtonActive: {
    backgroundColor: '#10B981',
  },
  selectorText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  selectorTextActive: {
    color: '#FFFFFF',
  },
  headerContainer: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  svgLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styledLogo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  logoTextMain: {
    fontSize: 24,
    fontWeight: '300',
    color: '#111827',
  },
  logoTextAccent: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
  },
  infoSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  featureList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  codeExample: {
    paddingHorizontal: 16,
  },
  codeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
  },
});

