import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import { ProfessionalSearchInput, ProfessionalCategoryFilter, CategoryItem, AppHeader } from '../components';
import { useTheme } from '../contexts';

type Props = {
  navigation: TabNavigationProp<'Search'>;
};

interface SearchResult {
  id: string;
  title: string;
  description: string;
}

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchCategories: CategoryItem[] = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'restaurants', label: 'Restaurants', icon: 'restaurant' },
    { id: 'cafes', label: 'Cafes', icon: 'cafe' },
    { id: 'fast-food', label: 'Fast Food', icon: 'fast-food' },
    { id: 'desserts', label: 'Desserts', icon: 'ice-cream' },
    { id: 'drinks', label: 'Drinks', icon: 'wine' },
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const categoryInfo = selectedCategory !== 'all' ? ` in ${selectedCategory}` : '';
      
      setResults([
        {
          id: '1',
          title: `Result for "${searchQuery}"${categoryInfo}`,
          description: 'This is a sample search result matching your criteria',
        },
        {
          id: '2',
          title: `Another result for "${searchQuery}"${categoryInfo}`,
          description: 'This is another sample search result with great ratings',
        },
        {
          id: '3',
          title: `Top rated result for "${searchQuery}"${categoryInfo}`,
          description: 'Highly recommended by other users in your area',
        },
      ]);
    } else {
      setResults([]);
    }
  };

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
    if (searchQuery.trim()) {
      handleSearch();
    }
  };

  const renderResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      style={[
        styles.resultCard,
        {
          backgroundColor: theme.colors.background.primary,
          borderColor: theme.colors.border.light,
        },
      ]}
      onPress={() => console.log('Result pressed:', item.title)}
    >
      <Text style={[styles.resultTitle, { color: theme.colors.text.primary }]}>
        {item.title}
      </Text>
      <Text style={[styles.resultDescription, { color: theme.colors.text.secondary }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <AppHeader
        city="New York"
        onCityPress={() => {
          console.log('City selection from search');
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
      <View style={styles.header}>
        <ProfessionalSearchInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          placeholder="Search restaurants, cuisines..."
          autoFocus={true}
          rightIcon="search"
          onRightIconPress={handleSearch}
        />
        <ProfessionalCategoryFilter
          categories={searchCategories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          containerStyle={styles.categoryFilter}
        />
      </View>
      
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={renderResult}
        contentContainerStyle={styles.resultsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
              {searchQuery ? 'No results found' : 'Start searching...'}
            </Text>
            {!searchQuery && (
              <Text style={[styles.emptySubtext, { color: theme.colors.text.tertiary }]}>
                Try searching for "Pizza", "Sushi", or "Coffee"
              </Text>
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  categoryFilter: {
    marginHorizontal: -16,
    marginTop: 8,
  },
  resultsContainer: {
    padding: 16,
  },
  resultCard: {
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});