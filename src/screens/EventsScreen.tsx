import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import {
  AppHeader,
  ProfessionalSearchInput,
  FilterModal,
  FilterOptions,
  ProfessionalCategoryFilter,
  CategoryItem,
  EventCard,
  EventCardProps,
} from '../components';
import { useTheme } from '../contexts';
import { useBottomTabBarHeight } from '../hooks';

type Props = {
  navigation: TabNavigationProp<'Notifications'>;
};

export const EventsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const tabBarHeight = useBottomTabBarHeight();
  const [searchValue, setSearchValue] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedEvents, setBookmarkedEvents] = useState<string[]>([]);

  // Categories
  const categories: CategoryItem[] = [
    { id: 'all', name: 'All', icon: 'list' },
    { id: 'foodfest', name: 'Food Fest', icon: 'restaurant' },
    { id: 'music', name: 'Music', icon: 'musical-notes' },
    { id: 'workshop', name: 'Workshop', icon: 'bulb' },
    { id: 'tasting', name: 'Tasting', icon: 'wine' },
    { id: 'festival', name: 'Festival', icon: 'calendar' },
    { id: 'market', name: 'Market', icon: 'basket' },
  ];

  // Sample event data
  const events: Omit<EventCardProps, 'isBookmarked' | 'onToggleBookmark' | 'onGetTickets' | 'onViewDetails'>[] = [
    {
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=400&fit=crop',
      isTrending: true,
      eventName: 'Food & Wine Festival',
      location: 'Central Park West',
      date: 'Sat, May 25',
      time: '6–10 PM',
      eventType: 'Food Fest',
      attending: '1.2k+',
      outdoor: true,
      isFreeEntry: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?w=800&h=400&fit=crop',
      isTrending: false,
      eventName: 'Italian Cooking Workshop',
      location: 'Little Italy Kitchen Studio',
      date: 'Sun, May 26',
      time: '2–5 PM',
      eventType: 'Workshop',
      attending: '45',
      outdoor: false,
      isFreeEntry: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop',
      isTrending: true,
      eventName: 'Jazz & BBQ Night',
      location: 'Riverside Park',
      date: 'Fri, May 31',
      time: '7–11 PM',
      eventType: 'Music',
      attending: '850+',
      outdoor: true,
      isFreeEntry: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=400&fit=crop',
      isTrending: false,
      eventName: 'Farmers Market Festival',
      location: 'Union Square',
      date: 'Sat, Jun 1',
      time: '8 AM–2 PM',
      eventType: 'Market',
      attending: '2.5k+',
      outdoor: true,
      isFreeEntry: true,
    },
  ];

  // Handlers
  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
  };

  const handleToggleBookmark = (eventName: string) => {
    setBookmarkedEvents(prev => 
      prev.includes(eventName)
        ? prev.filter(name => name !== eventName)
        : [...prev, eventName]
    );
  };

  const handleGetTickets = (eventName: string) => {
    Alert.alert('Get Tickets', `Getting tickets for ${eventName}`);
  };

  const handleViewDetails = (eventName: string) => {
    Alert.alert('Event Details', `Viewing details for ${eventName}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      {/* Header */}
      <AppHeader
        title="Events"
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
            placeholder="Search events..."
            rightIcon="filter-outline"
            onRightIconPress={() => setFilterModalVisible(true)}
          />
        </View>

        {/* Category Filter */}
        <ProfessionalCategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          containerStyle={styles.categoryFilter}
        />

        {/* Events List */}
        <View style={styles.eventsSection}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Upcoming Events
          </Text>
          {events.map((event, index) => (
            <EventCard
              key={index}
              {...event}
              isBookmarked={bookmarkedEvents.includes(event.eventName)}
              onToggleBookmark={() => handleToggleBookmark(event.eventName)}
              onGetTickets={() => handleGetTickets(event.eventName)}
              onViewDetails={() => handleViewDetails(event.eventName)}
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
  categoryFilter: {
    marginBottom: 16,
  },
  eventsSection: {
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});