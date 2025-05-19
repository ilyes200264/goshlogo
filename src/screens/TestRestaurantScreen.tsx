import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { RestaurantCard, RestaurantData } from '../components';
import { useTheme } from '../contexts';

export const TestRestaurantScreen: React.FC = () => {
  const { theme } = useTheme();

  const testRestaurant: RestaurantData = {
    id: '1',
    name: 'Test Restaurant',
    image: { uri: 'https://via.placeholder.com/300x200?text=Test' },
    rating: 4.5,
    reviewCount: 100,
    isFavorite: false,
    priceLevel: 2,
    cuisineTypes: ['Italian', 'Pizza'],
    distance: '1.5 km',
    deliveryTime: '30 min',
    promotions: [],
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 20, marginBottom: 16 }}>Restaurant Card Test</Text>
        <RestaurantCard
          restaurant={testRestaurant}
          onPress={() => console.log('Pressed')}
          onFavoriteToggle={() => console.log('Favorite toggled')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});