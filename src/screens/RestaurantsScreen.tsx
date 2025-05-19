import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { RestaurantList, RestaurantCard, RestaurantData, CategoryFilterBar, CategoryItem } from '../components';
import { useTheme } from '../contexts';

// Mock data for restaurants
const mockRestaurants: RestaurantData[] = [
  {
    id: '1',
    name: 'The Italian Kitchen',
    image: require('../../assets/splash-icon.png'), // Replace with actual restaurant images
    rating: 4.5,
    reviewCount: 324,
    isFavorite: true,
    priceLevel: 3,
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    distance: '2.3 km',
    deliveryTime: '30-45 min',
    promotions: [
      { id: 'p1', text: '20% OFF', color: '#fff', backgroundColor: '#FF6B6B' },
      { id: 'p2', text: 'Free Delivery', color: '#fff', backgroundColor: '#4ECDC4' },
    ],
  },
  {
    id: '2',
    name: 'Burger House',
    image: require('../../assets/icon.png'),
    rating: 4.2,
    reviewCount: 189,
    isFavorite: false,
    priceLevel: 2,
    cuisineTypes: ['American', 'Burgers', 'Fast Food'],
    distance: '1.5 km',
    deliveryTime: '20-30 min',
    promotions: [
      { id: 'p3', text: 'Buy 1 Get 1', color: '#fff', backgroundColor: '#9B59B6' },
    ],
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: require('../../assets/adaptive-icon.png'),
    rating: 4.8,
    reviewCount: 567,
    isFavorite: false,
    priceLevel: 4,
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    distance: '3.8 km',
    deliveryTime: '40-55 min',
    promotions: [],
  },
  {
    id: '4',
    name: 'Taco Paradise',
    image: require('../../assets/favicon.png'),
    rating: 4.3,
    reviewCount: 245,
    isFavorite: true,
    priceLevel: 2,
    cuisineTypes: ['Mexican', 'Tacos', 'Latin'],
    distance: '1.2 km',
    deliveryTime: '25-35 min',
    promotions: [
      { id: 'p4', text: 'Happy Hour', color: '#fff', backgroundColor: '#F39C12' },
      { id: 'p5', text: '$5 OFF', color: '#fff', backgroundColor: '#27AE60' },
    ],
  },
  {
    id: '5',
    name: 'Green Bowl',
    image: require('../../assets/splash-icon.png'),
    rating: 4.6,
    reviewCount: 412,
    isFavorite: false,
    priceLevel: 3,
    cuisineTypes: ['Healthy', 'Salads', 'Vegetarian'],
    distance: '2.0 km',
    deliveryTime: '30-40 min',
    promotions: [
      { id: 'p6', text: 'New', color: '#fff', backgroundColor: '#3498DB' },
    ],
  },
];

const cuisineCategories: CategoryItem[] = [
  { id: 'italian', label: 'Italian', icon: 'pizza-outline' },
  { id: 'american', label: 'American', icon: 'american-football-outline' },
  { id: 'asian', label: 'Asian', icon: 'restaurant-outline' },
  { id: 'mexican', label: 'Mexican', icon: 'flame-outline' },
  { id: 'healthy', label: 'Healthy', icon: 'nutrition-outline' },
  { id: 'dessert', label: 'Dessert', icon: 'ice-cream-outline' },
];

export const RestaurantsScreen: React.FC = () => {
  const { theme } = useTheme();
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [filteredRestaurants, setFilteredRestaurants] = useState(mockRestaurants);

  const handleRestaurantPress = (restaurant: RestaurantData) => {
    Alert.alert(
      restaurant.name,
      `Navigate to restaurant details for ${restaurant.name}`,
      [{ text: 'OK' }]
    );
  };

  const handleFavoriteToggle = (restaurant: RestaurantData) => {
    setRestaurants(prevRestaurants =>
      prevRestaurants.map(r =>
        r.id === restaurant.id ? { ...r, isFavorite: restaurant.isFavorite } : r
      )
    );
    console.log(`Toggled favorite for ${restaurant.name}:`, restaurant.isFavorite);
  };

  const handleCuisineSelect = (category: CategoryItem) => {
    setSelectedCuisine(category.id);
    
    if (category.id === 'all') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant => {
        const cuisineMap: { [key: string]: string[] } = {
          italian: ['Italian', 'Pizza', 'Pasta'],
          american: ['American', 'Burgers', 'Fast Food'],
          asian: ['Japanese', 'Sushi', 'Asian'],
          mexican: ['Mexican', 'Tacos', 'Latin'],
          healthy: ['Healthy', 'Salads', 'Vegetarian'],
        };
        
        const targetCuisines = cuisineMap[category.id] || [];
        return restaurant.cuisineTypes.some(cuisine => 
          targetCuisines.includes(cuisine)
        );
      });
      setFilteredRestaurants(filtered);
    }
  };

  const nearbyRestaurants = filteredRestaurants.filter(r => 
    parseFloat(r.distance) < 2.5
  );

  const popularRestaurants = filteredRestaurants.filter(r => 
    r.rating >= 4.5
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: theme.spacing[4] }]}>
          <Text
            style={[
              styles.title,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize['2xl'],
              },
            ]}
          >
            Restaurants
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.base,
                marginTop: theme.spacing[1],
              },
            ]}
          >
            Find your favorite places to eat
          </Text>
        </View>

        {/* Cuisine Filter */}
        <View style={{ marginTop: theme.spacing[4] }}>
          <CategoryFilterBar
            categories={cuisineCategories}
            selectedCategory={selectedCuisine}
            onCategorySelect={handleCuisineSelect}
            allOptionLabel="All Cuisines"
          />
        </View>

        {/* Popular Restaurants - Horizontal */}
        {popularRestaurants.length > 0 && (
          <View style={{ marginTop: theme.spacing[6] }}>
            <RestaurantList
              restaurants={popularRestaurants}
              onRestaurantPress={handleRestaurantPress}
              onFavoriteToggle={handleFavoriteToggle}
              horizontal
              title="Popular Restaurants"
            />
          </View>
        )}

        {/* Nearby Restaurants - Horizontal */}
        {nearbyRestaurants.length > 0 && (
          <View style={{ marginTop: theme.spacing[6] }}>
            <RestaurantList
              restaurants={nearbyRestaurants}
              onRestaurantPress={handleRestaurantPress}
              onFavoriteToggle={handleFavoriteToggle}
              horizontal
              title="Nearby"
            />
          </View>
        )}

        {/* All Restaurants - Vertical */}
        <View style={{ marginTop: theme.spacing[6], paddingBottom: theme.spacing[6] }}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.xl,
                marginBottom: theme.spacing[4],
                paddingHorizontal: theme.spacing[4],
              },
            ]}
          >
            All Restaurants
          </Text>
          {filteredRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={{ marginBottom: theme.spacing[3] }}>
              <RestaurantCard
                restaurant={restaurant}
                onPress={handleRestaurantPress}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </View>
          ))}
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
    paddingBottom: 24,
  },
  header: {
    paddingTop: 16,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {},
  sectionTitle: {
    fontWeight: '700',
  },
});