import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { RestaurantCard, RestaurantData } from '../components';
import { useTheme } from '../contexts';

// Mock data for all restaurants
const allRestaurants: RestaurantData[] = [
  {
    id: '1',
    name: 'The Italian Kitchen',
    image: require('../../assets/splash-icon.png'),
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
  {
    id: '6',
    name: 'Pizza Palace',
    image: require('../../assets/icon.png'),
    rating: 4.4,
    reviewCount: 289,
    isFavorite: false,
    priceLevel: 2,
    cuisineTypes: ['Italian', 'Pizza'],
    distance: '1.8 km',
    deliveryTime: '25-35 min',
    promotions: [],
  },
  {
    id: '7',
    name: 'Thai Spice',
    image: require('../../assets/adaptive-icon.png'),
    rating: 4.7,
    reviewCount: 423,
    isFavorite: true,
    priceLevel: 3,
    cuisineTypes: ['Thai', 'Asian', 'Spicy'],
    distance: '2.5 km',
    deliveryTime: '35-45 min',
    promotions: [
      { id: 'p7', text: 'Lunch Special', color: '#fff', backgroundColor: '#E74C3C' },
    ],
  },
];

export const AllRestaurantsScreen: React.FC = () => {
  const { theme } = useTheme();
  const [restaurants, setRestaurants] = useState(allRestaurants);

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
          ? { ...r, isFavorite: !r.isFavorite } 
          : r
      )
    );
  };

  const renderRestaurant = ({ item }: { item: RestaurantData }) => (
    <View style={{ paddingHorizontal: theme.spacing[4], paddingBottom: theme.spacing[3] }}>
      <RestaurantCard
        restaurant={item}
        onPress={handleRestaurantPress}
        onFavoriteToggle={handleFavoriteToggle}
      />
    </View>
  );

  const renderHeader = () => (
    <View style={[styles.header, { paddingHorizontal: theme.spacing[4] }]}>
      <Text
        style={[
          styles.title,
          {
            color: theme.colors.text.primary,
            fontSize: theme.typography.fontSize['2xl'],
            marginBottom: theme.spacing[2],
          },
        ]}
      >
        All Restaurants
      </Text>
      <Text
        style={[
          styles.subtitle,
          {
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.base,
          },
        ]}
      >
        {restaurants.length} restaurants available
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <FlatList
        data={restaurants}
        renderItem={renderRestaurant}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {},
  listContent: {
    paddingBottom: 24,
  },
});