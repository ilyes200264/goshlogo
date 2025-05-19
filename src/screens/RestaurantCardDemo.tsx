import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ProfessionalRestaurantCard, RestaurantData } from '../components';
import { useTheme } from '../contexts';

export const RestaurantCardDemo: React.FC = () => {
  const { theme } = useTheme();
  const [favorites, setFavorites] = useState<string[]>(['2']);

  const sampleRestaurant: RestaurantData = {
    id: '1',
    name: 'La Bella Italia',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
    rating: 4.7,
    reviewCount: 324,
    isFavorite: favorites.includes('1'),
    priceLevel: 3,
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    distance: '1.5 km',
    deliveryTime: '25-35 min',
    promotions: [
      { id: 'p1', text: '20% OFF', color: '#FFFFFF', backgroundColor: '#FF6B35' },
      { id: 'p2', text: 'Free Delivery', color: '#FFFFFF', backgroundColor: '#4ECDC4' },
    ],
  };

  const toggleFavorite = (restaurant: RestaurantData) => {
    if (favorites.includes(restaurant.id)) {
      setFavorites(favorites.filter(id => id !== restaurant.id));
    } else {
      setFavorites([...favorites, restaurant.id]);
    }
  };

  const createRestaurant = (variant: number): RestaurantData => ({
    ...sampleRestaurant,
    id: variant.toString(),
    isFavorite: favorites.includes(variant.toString()),
    name: variant === 2 ? 'Burger Palace' : variant === 3 ? 'Sushi Master' : sampleRestaurant.name,
    image: variant === 2 
      ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop'
      : variant === 3
      ? 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop'
      : sampleRestaurant.image,
    cuisineTypes: variant === 2 
      ? ['American', 'Burgers', 'Fast Food']
      : variant === 3
      ? ['Japanese', 'Sushi', 'Asian']
      : sampleRestaurant.cuisineTypes,
    rating: variant === 2 ? 4.4 : variant === 3 ? 4.9 : sampleRestaurant.rating,
    deliveryTime: variant === 2 ? '15-25 min' : variant === 3 ? '30-40 min' : sampleRestaurant.deliveryTime,
    priceLevel: variant === 2 ? 2 : variant === 3 ? 4 : sampleRestaurant.priceLevel,
    promotions: variant === 3 ? [] : sampleRestaurant.promotions,
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Professional Restaurant Cards
        </Text>

        {/* Default Variant */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Default Variant
          </Text>
          <ProfessionalRestaurantCard
            restaurant={createRestaurant(1)}
            onPress={(r) => console.log('Pressed:', r.name)}
            onFavoriteToggle={toggleFavorite}
          />
        </View>

        {/* Compact Variant */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Compact Variant
          </Text>
          <ProfessionalRestaurantCard
            restaurant={createRestaurant(2)}
            onPress={(r) => console.log('Pressed:', r.name)}
            onFavoriteToggle={toggleFavorite}
            variant="compact"
          />
          <ProfessionalRestaurantCard
            restaurant={createRestaurant(3)}
            onPress={(r) => console.log('Pressed:', r.name)}
            onFavoriteToggle={toggleFavorite}
            variant="compact"
          />
        </View>

        {/* Horizontal Variant */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Horizontal Variant
          </Text>
          <ProfessionalRestaurantCard
            restaurant={createRestaurant(1)}
            onPress={(r) => console.log('Pressed:', r.name)}
            onFavoriteToggle={toggleFavorite}
            variant="horizontal"
          />
          <ProfessionalRestaurantCard
            restaurant={createRestaurant(2)}
            onPress={(r) => console.log('Pressed:', r.name)}
            onFavoriteToggle={toggleFavorite}
            variant="horizontal"
          />
        </View>

        {/* Multiple Cards */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            List View
          </Text>
          {[1, 2, 3].map(i => (
            <ProfessionalRestaurantCard
              key={i}
              restaurant={createRestaurant(i)}
              onPress={(r) => console.log('Pressed:', r.name)}
              onFavoriteToggle={toggleFavorite}
            />
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
  content: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
});