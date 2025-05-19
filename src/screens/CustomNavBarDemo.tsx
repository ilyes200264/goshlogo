import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { CustomBottomNavBar, CustomBottomNavBarCurved, TabItem } from '../components/CustomBottomNavBar';
import { useTheme } from '../contexts';

export const CustomNavBarDemo: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');
  const [navStyle, setNavStyle] = useState<'default' | 'curved'>('default');

  const tabs: TabItem[] = [
    { id: 'Home', name: 'Home', label: 'Home', icon: 'home-outline' },
    { id: 'Offers', name: 'Offers', label: 'Offers', icon: 'pricetag-outline' },
    { id: 'Explore', name: 'Explore', label: 'Explore', icon: 'compass-outline', isCenter: true },
    { id: 'Events', name: 'Events', label: 'Events', icon: 'calendar-outline' },
    { id: 'Profile', name: 'Profile', label: 'Profile', icon: 'person-outline' },
  ];

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab.id);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <View style={styles.contentSection}>
            <Text style={[styles.contentTitle, { color: theme.colors.text.primary }]}>
              Home Screen
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.text.secondary }]}>
              Welcome to the home screen. This is where your main content would go.
            </Text>
          </View>
        );
      case 'Offers':
        return (
          <View style={styles.contentSection}>
            <Text style={[styles.contentTitle, { color: theme.colors.text.primary }]}>
              Offers Screen
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.text.secondary }]}>
              Special offers and promotions appear here.
            </Text>
          </View>
        );
      case 'Explore':
        return (
          <View style={styles.contentSection}>
            <Text style={[styles.contentTitle, { color: theme.colors.text.primary }]}>
              Explore Screen
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.text.secondary }]}>
              Discover new places and experiences.
            </Text>
          </View>
        );
      case 'Events':
        return (
          <View style={styles.contentSection}>
            <Text style={[styles.contentTitle, { color: theme.colors.text.primary }]}>
              Events Screen
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.text.secondary }]}>
              Upcoming events in your area.
            </Text>
          </View>
        );
      case 'Profile':
        return (
          <View style={styles.contentSection}>
            <Text style={[styles.contentTitle, { color: theme.colors.text.primary }]}>
              Profile Screen
            </Text>
            <Text style={[styles.contentText, { color: theme.colors.text.secondary }]}>
              Your profile and settings.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background.secondary }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize['2xl'],
              },
            ]}
          >
            Custom Navigation Bar Demo
          </Text>
          <View style={styles.styleToggle}>
            <Text style={[styles.toggleLabel, { color: theme.colors.text.secondary }]}>
              Style:
            </Text>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: navStyle === 'default'
                    ? theme.colors.primary[500]
                    : theme.colors.background.primary,
                  borderColor: theme.colors.primary[500],
                },
              ]}
              onPress={() => setNavStyle('default')}
            >
              <Text
                style={{
                  color: navStyle === 'default'
                    ? theme.colors.text.inverse
                    : theme.colors.primary[500],
                }}
              >
                Default
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                {
                  backgroundColor: navStyle === 'curved'
                    ? theme.colors.primary[500]
                    : theme.colors.background.primary,
                  borderColor: theme.colors.primary[500],
                },
              ]}
              onPress={() => setNavStyle('curved')}
            >
              <Text
                style={{
                  color: navStyle === 'curved'
                    ? theme.colors.text.inverse
                    : theme.colors.primary[500],
                }}
              >
                Curved
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView 
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {renderContent()}
          
          <View style={[styles.infoSection, { backgroundColor: theme.colors.background.primary }]}>
            <Text style={[styles.infoTitle, { color: theme.colors.text.primary }]}>
              Features
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              • Center tab with floating design
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              • Active state highlighting
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              • Curved top edge
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              • Shadow effects
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.secondary }]}>
              • Safe area support
            </Text>
          </View>

          <View style={[styles.codeExample, { backgroundColor: theme.colors.neutral[900] }]}>
            <Text style={[styles.codeTitle, { color: theme.colors.text.inverse }]}>
              Usage Example
            </Text>
            <Text style={[styles.codeText, { color: theme.colors.text.inverse }]}>
              {`<CustomBottomNavBar
  tabs={tabs}
  activeTab={activeTab}
  onTabPress={handleTabPress}
/>`}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {navStyle === 'default' ? (
        <CustomBottomNavBar
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      ) : (
        <CustomBottomNavBarCurved
          tabs={tabs}
          activeTab={activeTab}
          onTabPress={handleTabPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
  },
  styleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  toggleLabel: {
    marginRight: 8,
  },
  toggleButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  contentSection: {
    marginVertical: 20,
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoSection: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    marginVertical: 4,
  },
  codeExample: {
    padding: 20,
    borderRadius: 12,
    marginVertical: 20,
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  codeText: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});

