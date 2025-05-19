import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { RestaurantCard, RestaurantData } from '../components';
import { useTheme } from '../contexts';

export const FavoriteRestaurantsScreen: React.FC = () => {
  const { theme } = useTheme();
  
  // Mock favorite restaurants
  const [favoriteRestaurants] = useState<RestaurantData[]>([
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
      ],
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
      ],
    },
  ]);

  const handleRestaurantPress = (restaurant: RestaurantData) => {
    Alert.alert(
      restaurant.name,
      `Navigate to restaurant details for ${restaurant.name}`,
      [{ text: 'OK' }]
    );
  };

  const handleFavoriteToggle = (restaurant: RestaurantData) => {
    console.log(`Removed ${restaurant.name} from favorites`);
  };

  const EmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text
        style={[
          styles.emptyText,
          {
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.lg,
            marginBottom: theme.spacing[2],
          },
        ]}
      >
        No favorite restaurants yet
      </Text>
      <Text
        style={[
          styles.emptySubtext,
          {
            color: theme.colors.text.tertiary,
            fontSize: theme.typography.fontSize.base,
          },
        ]}
      >
        Start exploring and add your favorite places
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
            Favorite Restaurants
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
            Your saved places
          </Text>
        </View>
        
        {favoriteRestaurants.length === 0 ? (
          EmptyComponent
        ) : (
          <View style={{ paddingHorizontal: theme.spacing[4] }}>
            {favoriteRestaurants.map((restaurant) => (
              <View key={restaurant.id} style={{ marginBottom: theme.spacing[3] }}>
                <RestaurantCard
                  restaurant={restaurant}
                  onPress={handleRestaurantPress}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    fontWeight: '700',
  },
  subtitle: {},
  emptyContainer: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  emptySubtext: {
    textAlign: 'center',
  },
});