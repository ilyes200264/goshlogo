import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import {
  AnimatedTextField,
  AnimatedCategoryFilterBar,
  AnimatedRestaurantCard,
  AnimatedBottomNavBar,
  CategoryItem,
  RestaurantData,
  TabItem,
} from '../components';
import { useTheme } from '../contexts';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export const AnimationDemoScreen: React.FC = () => {
  const { theme } = useTheme();
  const scrollY = useSharedValue(0);
  const scrollRef = useAnimatedRef<ScrollView>();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('Home');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All', icon: 'restaurant-outline' },
    { id: 'trending', label: 'Trending', icon: 'trending-up-outline' },
    { id: 'new', label: 'New', icon: 'sparkles-outline' },
    { id: 'popular', label: 'Popular', icon: 'star-outline' },
    { id: 'local', label: 'Local', icon: 'location-outline' },
    { id: 'saved', label: 'Saved', icon: 'bookmark-outline' },
  ];

  const restaurants: RestaurantData[] = [
    {
      id: '1',
      name: 'Pizza Paradise',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
      rating: 4.7,
      reviewCount: 324,
      isFavorite: false,
      priceLevel: 2,
      cuisineTypes: ['Italian', 'Pizza'],
      distance: '1.5 km',
      deliveryTime: '25-35 min',
      promotions: [
        { id: 'p1', text: '20% OFF', color: '#fff', backgroundColor: '#FF6B6B' },
        { id: 'p2', text: 'Free Delivery', color: '#fff', backgroundColor: '#4ECDC4' },
      ],
    },
    {
      id: '2',
      name: 'Burger Joint',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
      rating: 4.4,
      reviewCount: 189,
      isFavorite: true,
      priceLevel: 2,
      cuisineTypes: ['American', 'Burgers'],
      distance: '2.0 km',
      deliveryTime: '30-40 min',
    },
    {
      id: '3',
      name: 'Sushi Master',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
      rating: 4.9,
      reviewCount: 512,
      isFavorite: false,
      priceLevel: 3,
      cuisineTypes: ['Japanese', 'Sushi'],
      distance: '0.8 km',
      deliveryTime: '20-30 min',
      promotions: [
        { id: 'p3', text: 'New User', color: '#fff', backgroundColor: '#4ECDC4' },
      ],
    },
  ];

  const tabs: TabItem[] = [
    { id: 'Home', name: 'Home', label: 'Home', icon: 'home-outline' },
    { id: 'Offers', name: 'Offers', label: 'Offers', icon: 'pricetag-outline' },
    { id: 'Explore', name: 'Explore', label: 'Explore', icon: 'compass-outline', isCenter: true },
    { id: 'Events', name: 'Events', label: 'Events', icon: 'calendar-outline' },
    { id: 'Profile', name: 'Profile', label: 'Profile', icon: 'person-outline' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <AnimatedScrollView
        ref={scrollRef}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
      >
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          React Native Reanimated Demo
        </Text>

        {/* Animated Text Field */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated Focus Effect
          </Text>
          <AnimatedTextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <AnimatedTextField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        {/* Animated Category Filter */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated Category Selection
          </Text>
          <AnimatedCategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(cat) => setSelectedCategory(cat.id)}
            containerStyle={{ marginHorizontal: -theme.spacing[4] }}
          />
        </View>

        {/* Animated Restaurant Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated Restaurant Cards
          </Text>
          {restaurants.map((restaurant, index) => (
            <AnimatedRestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              index={index}
              scrollY={scrollY}
              onPress={(r) => console.log('Pressed:', r.name)}
              onFavoriteToggle={(r) => console.log('Toggle favorite:', r.name)}
            />
          ))}
        </View>
      </AnimatedScrollView>

      {/* Animated Bottom Navigation */}
      <AnimatedBottomNavBar
        tabs={tabs}
        activeTab={activeTab}
        onTabPress={(tab) => setActiveTab(tab.id)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  section: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
});