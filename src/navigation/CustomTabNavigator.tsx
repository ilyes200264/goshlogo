import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomNavBar, TabItem } from '../components/CustomBottomNavBar';
import { TabParamList } from './types';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { OffersScreen } from '../screens/OffersScreen';
import { DiscoverScreen } from '../screens/DiscoverScreen';
import { EventsScreen } from '../screens/EventsScreen';

const Tab = createBottomTabNavigator<TabParamList>();

// Custom tab bar component
const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const tabs: TabItem[] = [
    {
      id: 'Home',
      name: 'Home',
      label: 'Home',
      icon: 'home-outline',
    },
    {
      id: 'Offers',
      name: 'Search',
      label: 'Offers',
      icon: 'pricetag-outline',
    },
    {
      id: 'Explore',
      name: 'Explore',
      label: 'Explore',
      icon: 'compass-outline',
      isCenter: true,
    },
    {
      id: 'Events',
      name: 'Notifications',
      label: 'Events',
      icon: 'calendar-outline',
    },
    {
      id: 'Profile',
      name: 'Profile',
      label: 'Profile',
      icon: 'person-outline',
    },
  ];

  const handleTabPress = (tab: TabItem) => {
    const route = state.routes.find((r: any) => r.name === tab.name);
    if (route) {
      navigation.navigate(route.name);
    }
  };

  // Get the active tab name
  const activeRoute = state.routes[state.index];
  const activeTab = activeRoute ? tabs.find(tab => tab.name === activeRoute.name)?.id || 'Home' : 'Home';

  return (
    <CustomBottomNavBar
      tabs={tabs}
      activeTab={activeTab}
      onTabPress={handleTabPress}
    />
  );
};

export const CustomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={OffersScreen} />
      <Tab.Screen name="Explore" component={DiscoverScreen} />
      <Tab.Screen name="Notifications" component={EventsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Standalone example component
export const CustomTabNavigatorExample: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  const tabs: TabItem[] = [
    { id: 'Home', name: 'Home', label: 'Home', icon: 'home-outline' },
    { id: 'Offers', name: 'Offers', label: 'Offers', icon: 'pricetag-outline' },
    { id: 'Explore', name: 'Explore', label: 'Explore', icon: 'compass-outline', isCenter: true },
    { id: 'Events', name: 'Events', label: 'Events', icon: 'calendar-outline' },
    { id: 'Profile', name: 'Profile', label: 'Profile', icon: 'person-outline' },
  ];

  const handleTabPress = (tab: TabItem) => {
    setActiveTab(tab.id);
    console.log('Tab pressed:', tab.label);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Your screen content here */}
      </View>
      <CustomBottomNavBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

