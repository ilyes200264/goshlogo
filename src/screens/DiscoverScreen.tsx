import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import * as Location from 'expo-location';
import {
  AppHeader,
  ProfessionalSearchInput,
  FilterModal,
  FilterOptions,
  ExploreNearbyCard,
  ProfessionalCategoryFilter,
  CategoryItem,
  FeaturedRestaurantCard,
  FeaturedRestaurantCardProps,
} from '../components';
import { useTheme } from '../contexts';
import { useBottomTabBarHeight } from '../hooks';

type Props = {
  navigation: TabNavigationProp<'Explore'>;
};

export const DiscoverScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchValue, setSearchValue] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<string[]>([]);

  // Categories
  const categories: CategoryItem[] = [
    { id: 'all', name: 'All', icon: 'list' },
    { id: 'italian', name: 'Italian', icon: 'pizza' },
    { id: 'japanese', name: 'Japanese', icon: 'restaurant' },
    { id: 'mexican', name: 'Mexican', icon: 'restaurant' },
    { id: 'chinese', name: 'Chinese', icon: 'restaurant' },
    { id: 'american', name: 'American', icon: 'fast-food' },
    { id: 'indian', name: 'Indian', icon: 'restaurant' },
    { id: 'thai', name: 'Thai', icon: 'restaurant' },
  ];

  // Sample restaurant data with new properties
  const featuredRestaurants: Omit<FeaturedRestaurantCardProps, 'isFavorite' | 'onToggleFavorite' | 'onSeeMenu' | 'onBookTable'>[] = [
    {
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
      isTrending: true,
      restaurantName: 'The Burger Palace',
      categories: ['Fast Food', 'American'],
      distance: '0.8 mi',
      status: 'Open',
      rating: 4.7,
      reviews: 342,
      freeDelivery: true,
      priceLevel: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=400&fit=crop',
      isTrending: false,
      restaurantName: 'Sushi Paradise',
      categories: ['Japanese', 'Sushi Bar'],
      distance: '1.2 mi',
      status: 'Busy',
      rating: 4.9,
      reviews: 523,
      freeDelivery: false,
      priceLevel: 3,
    },
    {
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&h=400&fit=crop',
      isTrending: true,
      restaurantName: 'Napoli Express',
      categories: ['Italian', 'Pizza'],
      distance: '0.5 mi',
      status: 'Open',
      rating: 4.5,
      reviews: 289,
      freeDelivery: true,
      priceLevel: 2,
    },
    {
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=400&fit=crop',
      isTrending: false,
      restaurantName: 'Healthy Bites',
      categories: ['Healthy', 'Salads'],
      distance: '2.1 mi',
      status: 'Open',
      rating: 4.3,
      reviews: 167,
      freeDelivery: true,
      priceLevel: 1,
    },
  ];

  // Handlers
  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
  };

  const handleToggleFavorite = (restaurantName: string) => {
    setFavoriteRestaurants(prev => 
      prev.includes(restaurantName)
        ? prev.filter(name => name !== restaurantName)
        : [...prev, restaurantName]
    );
  };

  const handleSeeMenu = (restaurantName: string) => {
    Alert.alert('Menu', `Viewing menu for ${restaurantName}`);
  };

  const handleBookTable = (restaurantName: string) => {
    Alert.alert('Book Table', `Booking table at ${restaurantName}`);
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <AppHeader
        title="Discover"
        showCity={false}
        showLogo={false}
        onNotificationPress={() => navigation.navigate('Notifications')}
        profileImage="https://i.pravatar.cc/150?img=8"
        onProfilePress={() => navigation.navigate('Profile')}
        showBadge={true}
        badgeCount={3}
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <ProfessionalSearchInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Search cuisines, restaurants..."
            rightIcon="filter-outline"
            onRightIconPress={() => setFilterModalVisible(true)}
          />
        </View>

        {/* Explore Nearby Card */}
        <View style={styles.exploreNearbySection}>
          <ExploreNearbyCard
            backgroundImage="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=400&fit=crop"
            headline="Explore Nearby"
            subtext="Find restaurants near you"
            onUseLocation={async () => {
              try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  Alert.alert('Permission Denied', 'Location permission is required');
                  return;
                }
                
                const location = await Location.getCurrentPositionAsync({});
                Alert.alert('Location Found', `Your location: ${location.coords.latitude}, ${location.coords.longitude}`);
              } catch (error) {
                Alert.alert('Error', 'Failed to get your location');
              }
            }}
            onOpenMap={async () => {
              try {
                // Get current location
                const { status } = await Location.requestForegroundPermissionsAsync();
                let latitude = 0;
                let longitude = 0;
                
                if (status === 'granted') {
                  const location = await Location.getCurrentPositionAsync({});
                  latitude = location.coords.latitude;
                  longitude = location.coords.longitude;
                }
                
                // For iOS, you can choose between Apple Maps or Google Maps
                // Google Maps has better category support
                const useGoogleMaps = true; // Set to false to use Apple Maps on iOS
                
                let url: string | undefined;
                
                if (Platform.OS === 'ios' && !useGoogleMaps) {
                  // Apple Maps - Opens map centered on location
                  // User must manually tap search to see categories
                  url = `maps://?ll=${latitude},${longitude}&z=15`;
                } else {
                  // Google Maps URL that opens with restaurant results
                  // This works on both iOS and Android
                  url = `https://www.google.com/maps/search/Restaurants/@${latitude},${longitude},15z/data=!3m1!4b1`;
                  
                  // Alternative: Use Google Maps app if installed
                  const googleMapsUrl = Platform.select({
                    ios: `comgooglemaps://?q=restaurants&center=${latitude},${longitude}&zoom=15`,
                    android: `geo:${latitude},${longitude}?q=restaurants`,
                  });
                  
                  // Try Google Maps app first
                  if (googleMapsUrl && await Linking.canOpenURL(googleMapsUrl)) {
                    url = googleMapsUrl;
                  }
                }
                
                await Linking.openURL(url);
              } catch (error) {
                Alert.alert('Error', 'Failed to open maps');
              }
            }}
          />
        </View>

        {/* Category Filter */}
        <ProfessionalCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          containerStyle={styles.categoryFilter}
        />

        {/* Featured Restaurants */}
        <View style={styles.restaurantsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Discover Great Places
          </Text>
          {featuredRestaurants.map((restaurant, index) => (
            <FeaturedRestaurantCard
              key={index}
              {...restaurant}
              isFavorite={favoriteRestaurants.includes(restaurant.restaurantName)}
              onToggleFavorite={() => handleToggleFavorite(restaurant.restaurantName)}
              onSeeMenu={() => handleSeeMenu(restaurant.restaurantName)}
              onBookTable={() => handleBookTable(restaurant.restaurantName)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApplyFilters={(filters: FilterOptions) => {
          console.log('Applied filters:', filters);
          // Handle filter application here
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  exploreNearbySection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryFilter: {
    marginBottom: 16,
  },
  restaurantsSection: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});