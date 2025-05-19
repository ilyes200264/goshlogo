import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { 
  RestaurantList, 
  RestaurantData, 
  CategoryFilterBar, 
  CategoryItem,
  RestaurantCard 
} from '../components';
import { useTheme } from '../contexts';

const mockRestaurants: RestaurantData[] = [
  {
    id: '1',
    name: 'The Italian Kitchen',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&h=300&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
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
];

export const RestaurantExampleScreen: React.FC = () => {
  const { theme } = useTheme();
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

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
        r.id === restaurant.id 
          ? { ...r, isFavorite: restaurant.isFavorite } 
          : r
      )
    );
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleCuisineSelect = (category: CategoryItem) => {
    setSelectedCuisine(category.id);
  };

  const filteredRestaurants = selectedCuisine === 'all' 
    ? restaurants 
    : restaurants.filter(r => {
        const cuisineMap: { [key: string]: string[] } = {
          italian: ['Italian', 'Pizza', 'Pasta'],
          american: ['American', 'Burgers', 'Fast Food'],
          asian: ['Japanese', 'Sushi', 'Asian'],
          mexican: ['Mexican', 'Tacos', 'Latin'],
          healthy: ['Healthy', 'Salads', 'Vegetarian'],
        };
        
        const targetCuisines = cuisineMap[selectedCuisine] || [];
        return r.cuisineTypes.some(cuisine => targetCuisines.includes(cuisine));
      });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={styles.headerContainer}>
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['2xl'],
              paddingHorizontal: theme.spacing[4],
              marginBottom: theme.spacing[4],
            },
          ]}
        >
          Restaurants Near You
        </Text>
        
        <CategoryFilterBar
          categories={cuisineCategories}
          selectedCategory={selectedCuisine}
          onCategorySelect={handleCuisineSelect}
          allOptionLabel="All"
          containerStyle={{ marginBottom: theme.spacing[2] }}
        />
      </View>

      <RestaurantList
        restaurants={filteredRestaurants}
        onRestaurantPress={handleRestaurantPress}
        onFavoriteToggle={handleFavoriteToggle}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={{
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
              }}
            >
              No restaurants found
            </Text>
          </View>
        }
      />

      {/* Example of a single card */}
      <View style={[styles.singleCardExample, { paddingHorizontal: theme.spacing[4] }]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.lg,
              marginBottom: theme.spacing[3],
            },
          ]}
        >
          Single Card Example
        </Text>
        <RestaurantCard
          restaurant={restaurants[0]}
          onPress={handleRestaurantPress}
          onFavoriteToggle={handleFavoriteToggle}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 16,
  },
  title: {
    fontWeight: '700',
  },
  sectionTitle: {
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  singleCardExample: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});