import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import {
  AppHeader,
  ProfessionalSearchInput,
  AnimatedPromoBanner,
  ProfessionalCategoryFilter,
  CategoryItem,
  PromoOfferCard,
  FilterModal,
  FilterOptions,
} from '../components';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts';
import { useBottomTabBarHeight } from '../hooks';

type Props = {
  navigation: TabNavigationProp<'Offers'>;
};

export const OffersScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favoriteOffers, setFavoriteOffers] = useState<string[]>([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  // Sample data
const categories: CategoryItem[] = [
    { id: 'all', label: 'All', icon: 'list' },
    { id: 'burger', label: 'Burger', icon: 'fast-food' },
    { id: 'pizza', label: 'Pizza', icon: 'pizza' },
    { id: 'sushi', label: 'Sushi', icon: 'restaurant' },
    { id: 'coffee', label: 'Coffee', icon: 'cafe' },
    { id: 'chinese', label: 'Chinese', icon: 'restaurant-outline' },
    { id: 'italian', label: 'Italian', icon: 'wine' },
  ];

  const offers = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
      promoText: '40% OFF',
      minSpend: '$20',
      distance: '1.1 miles',
      timeLeft: 'Ends in 2h',
      restaurantName: 'Crispy Bites',
      categories: ['Fast Food', 'Burgers'],
      rating: 4.7,
      reviews: 112,
      freeDelivery: true,
      priceLevel: 1,
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop',
      promoText: '50% OFF',
      minSpend: '$30',
      distance: '2.5 miles',
      timeLeft: 'Ends today',
      restaurantName: 'Sushi Master',
      categories: ['Japanese', 'Sushi'],
      rating: 4.9,
      reviews: 225,
      freeDelivery: false,
      priceLevel: 3,
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
      promoText: 'Buy 1 Get 1',
      minSpend: '$15',
      distance: '0.8 miles',
      timeLeft: 'Ends in 5h',
      restaurantName: 'Pizza Palace',
      categories: ['Italian', 'Pizza'],
      rating: 4.5,
      reviews: 89,
      freeDelivery: true,
      priceLevel: 2,
    },
  ];

  // Handlers
  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
    console.log('Selected category:', category.id);
  };

  const handleOfferClaim = (offerId: string) => {
    Alert.alert('Offer Claimed', `You've claimed the offer for ${offerId}`);
  };

  const handleToggleFavorite = (offerId: string) => {
    setFavoriteOffers(prev =>
      prev.includes(offerId)
        ? prev.filter(id => id !== offerId)
        : [...prev, offerId]
    );
  };

  const handlePromoBannerPress = () => {
    console.log('Promo banner pressed');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <AppHeader
        title="Exclusive Offers"
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
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for restaurants, foods..."
            onSubmitEditing={handleSearch}
            rightIcon="filter-outline"
            onRightIconPress={() => setFilterModalVisible(true)}
          />
        </View>

        {/* Promotion Banner */}
        <View style={styles.bannerSection}>
          <AnimatedPromoBanner
            headline="50% OFF Everything!"
            subtext="Limited time offer on all restaurants"
            buttonLabel="View Details"
            onButtonPress={handlePromoBannerPress}
            colors={['#CC4A1F', '#FF6233']}
            animationType="slide"
          />
        </View>

        {/* Category Filter */}
        <ProfessionalCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          containerStyle={styles.categoryFilter}
        />

        {/* Offers Cards */}
        <View style={styles.offersSection}>
          {offers.map((offer) => (
            <PromoOfferCard
              key={offer.id}
              {...offer}
              isFavorite={favoriteOffers.includes(offer.id)}
              onClaim={() => handleOfferClaim(offer.id)}
              onToggleFavorite={() => handleToggleFavorite(offer.id)}
            />
          ))}
        </View>
      </ScrollView>
      
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileButton: {
    marginLeft: 12,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  searchSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  bannerSection: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryFilter: {
    marginBottom: 16,
  },
  offersSection: {
    paddingHorizontal: 16,
  },
});

