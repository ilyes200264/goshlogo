import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import * as Location from 'expo-location';
import { TabNavigationProp } from '../navigation/types';
import { 
  AppHeader,
  ProfessionalCategoryFilter,
  FilterButtons,
  CategoryItem,
  ProfessionalRestaurantCard,
  RestaurantData,
  ReviewCard,
  ReviewData,
  RestaurantDetailsModal,
  ProfessionalSearchInput,
  FilterModal,
  FilterOptions,
} from '../components';
import { useTheme } from '../contexts';
import { useBottomTabBarHeight } from '../hooks';

type Props = {
  navigation: TabNavigationProp<'Home'>;
};

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantData | null>(null);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [currentCity, setCurrentCity] = useState('Loading...');

  // Get user's current location and city
  useEffect(() => {
    (async () => {
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setCurrentCity('Location Access Denied');
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({});
        
        // Get city from coordinates
        const [address] = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address) {
          setCurrentCity(address.city || address.subregion || address.region || 'Unknown Location');
        } else {
          setCurrentCity('Unknown Location');
        }
      } catch (error) {
        console.error('Error getting location:', error);
        setCurrentCity('Location Unavailable');
      }
    })();
  }, []);

  // Sample data
  const categories: CategoryItem[] = [
    { id: 'all', name: 'All', icon: 'list' },
    { id: 'burger', name: 'Burger', icon: 'fast-food' },
    { id: 'pizza', name: 'Pizza', icon: 'pizza' },
    { id: 'sushi', name: 'Sushi', icon: 'restaurant' },
    { id: 'coffee', name: 'Coffee', icon: 'cafe' },
    { id: 'dessert', name: 'Dessert', icon: 'ice-cream' },
  ];

  const featuredRestaurants: RestaurantData[] = [
    {
      id: '1',
      name: 'The Burger Joint',
      cuisine: 'American',
      rating: 4.5,
      price: '$$',
      distance: '0.5 miles',
      imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
      isFavorite: false,
      promotionalTag: { type: 'discount', label: '20% OFF' },
    },
    {
      id: '2',
      name: 'Sushi Paradise',
      cuisine: 'Japanese',
      rating: 4.8,
      price: '$$$',
      distance: '1.2 miles',
      imageUrl: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&h=300&fit=crop',
      isFavorite: true,
      promotionalTag: { type: 'new', label: 'NEW' },
    },
    {
      id: '3',
      name: 'Pizza Heaven',
      cuisine: 'Italian',
      rating: 4.3,
      price: '$$',
      distance: '0.8 miles',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=300&fit=crop',
      isFavorite: false,
    },
  ];

  const otherRestaurants: RestaurantData[] = [
    {
      id: '4',
      name: 'Coffee & Co',
      cuisine: 'Cafe',
      rating: 4.6,
      price: '$',
      distance: '0.3 miles',
      imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&h=300&fit=crop',
      isFavorite: true,
    },
    {
      id: '5',
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.4,
      price: '$',
      distance: '1.5 miles',
      imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=500&h=300&fit=crop',
      isFavorite: false,
      promotionalTag: { type: 'featured', label: 'FEATURED' },
    },
  ];

  const latestReviews: ReviewData[] = [
    {
      id: '1',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      userName: 'Sophia Lee',
      restaurantName: 'Burger & Lobster',
      timeAgo: '2 days ago',
      rating: 4,
      reviewText: 'Amazing experience! The lobster was perfectly cooked and the service was outstanding. The ambiance was great too, perfect for a special dinner.',
      images: [
        'https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=400&fit=crop',
      ],
      likes: 23,
      comments: 5,
      isLiked: false,
    },
    {
      id: '2',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      userName: 'Michael Chen',
      restaurantName: 'Sushi Paradise',
      timeAgo: '1 week ago',
      rating: 5,
      reviewText: 'Best sushi in town! Fresh ingredients, creative rolls, and excellent presentation. Will definitely come back.',
      images: [
        'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=400&fit=crop',
      ],
      likes: 45,
      comments: 12,
      isLiked: true,
    },
  ];

  // Handlers
  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
    console.log('Selected category:', category.id);
  };

  const handleFilterPress = (filterId: string) => {
    console.log('Filter pressed:', filterId);
    if (filterId === 'filter') {
      // Open a filter modal
      Alert.alert('Filter', 'Filter options would open here');
    }
  };

  const handleRestaurantPress = (restaurant: RestaurantData) => {
    setSelectedRestaurant(restaurant);
    setDetailsModalVisible(true);
  };

  const handleFavoriteToggle = (restaurant: RestaurantData) => {
    console.log(`Toggled favorite for ${restaurant.name}:`, restaurant.isFavorite);
  };

  const handleReviewLike = (reviewId: string) => {
    setLikedReviews(prev => 
      prev.includes(reviewId)
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const handleReviewComment = (reviewId: string) => {
    console.log('Comment on review:', reviewId);
  };

  const handleReviewShare = (reviewId: string) => {
    console.log('Share review:', reviewId);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* 1. Header */}
      <AppHeader
        city={currentCity}
        onCityPress={() => {
          Alert.alert('Select City', 'City selection coming soon');
        }}
        onNotificationPress={() => {
          navigation.navigate('Notifications');
        }}
        profileImage="https://i.pravatar.cc/150?img=8"
        onProfilePress={() => {
          navigation.navigate('Profile');
        }}
        showBadge={true}
        badgeCount={3}
      />
      
      {/* 2. Search Input */}
      <View style={styles.searchInputContainer}>
        <ProfessionalSearchInput
          value={searchValue}
          onChangeText={setSearchValue}
          placeholder="Search restaurants, cuisines..."
          rightIcon="filter-outline"
          onRightIconPress={() => setFilterModalVisible(true)}
        />
      </View>

      <ScrollView 
        contentContainerStyle={[styles.scrollContent, { paddingBottom: tabBarHeight + 20 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* 3. Category Filter */}
        <ProfessionalCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          containerStyle={styles.categoryFilter}
        />

        {/* 4. Featured Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Featured Restaurants
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary[500] }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          
          {featuredRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantCard}>
              <ProfessionalRestaurantCard
                restaurant={restaurant}
                onPress={handleRestaurantPress}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </View>
          ))}
        </View>

        {/* 5. Other Restaurants */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              More Restaurants
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary[500] }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          
          {otherRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantCard}>
              <ProfessionalRestaurantCard
                restaurant={restaurant}
                onPress={handleRestaurantPress}
                onFavoriteToggle={handleFavoriteToggle}
              />
            </View>
          ))}
        </View>

        {/* 6. Latest Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
              Latest Reviews
            </Text>
            <TouchableOpacity onPress={() => console.log('See all reviews')}>
              <Text style={[styles.seeAll, { color: theme.colors.primary[500] }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>
          
          {latestReviews.map((review, index) => (
            <ReviewCard
              key={review.id}
              review={{
                ...review,
                isLiked: likedReviews.includes(review.id),
              }}
              onLike={handleReviewLike}
              onComment={handleReviewComment}
              onShare={handleReviewShare}
              onImagePress={(imageUrl) => console.log('Image pressed:', imageUrl)}
              animationDelay={index * 100}
            />
          ))}
        </View>
      </ScrollView>

      <RestaurantDetailsModal
        visible={detailsModalVisible}
        restaurant={selectedRestaurant}
        onClose={() => {
          setDetailsModalVisible(false);
          setSelectedRestaurant(null);
        }}
        onFavoriteToggle={handleFavoriteToggle}
      />
      
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
  searchInputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryFilter: {
    marginBottom: 8,
  },
  filterButtons: {
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  restaurantCard: {
    marginBottom: 16,
  },
});