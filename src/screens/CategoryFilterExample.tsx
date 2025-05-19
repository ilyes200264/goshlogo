import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { CategoryFilterBar, CategoryItem } from '../components';
import { useTheme } from '../contexts';

// Sample restaurant categories
const restaurantCategories: CategoryItem[] = [
  { id: 'fast-food', label: 'Fast Food', icon: 'fast-food-outline' },
  { id: 'italian', label: 'Italian', icon: 'pizza-outline' },
  { id: 'asian', label: 'Asian', icon: 'restaurant-outline' },
  { id: 'mexican', label: 'Mexican', icon: 'flame-outline' },
  { id: 'american', label: 'American', icon: 'american-football-outline' },
  { id: 'dessert', label: 'Dessert', icon: 'ice-cream-outline' },
  { id: 'coffee', label: 'Coffee', icon: 'cafe-outline' },
  { id: 'healthy', label: 'Healthy', icon: 'nutrition-outline' },
];

// Sample shopping categories
const shoppingCategories: CategoryItem[] = [
  { id: 'electronics', label: 'Electronics', icon: 'laptop-outline' },
  { id: 'clothing', label: 'Clothing', icon: 'shirt-outline' },
  { id: 'home', label: 'Home', icon: 'home-outline' },
  { id: 'sports', label: 'Sports', icon: 'fitness-outline' },
  { id: 'books', label: 'Books', icon: 'book-outline' },
  { id: 'toys', label: 'Toys', icon: 'game-controller-outline' },
  { id: 'beauty', label: 'Beauty', icon: 'flower-outline' },
  { id: 'jewelry', label: 'Jewelry', icon: 'diamond-outline' },
];

// Sample news categories
const newsCategories: CategoryItem[] = [
  { id: 'world', label: 'World', icon: 'globe-outline' },
  { id: 'business', label: 'Business', icon: 'business-outline' },
  { id: 'technology', label: 'Technology', icon: 'desktop-outline' },
  { id: 'sports', label: 'Sports', icon: 'football-outline' },
  { id: 'entertainment', label: 'Entertainment', icon: 'musical-notes-outline' },
  { id: 'health', label: 'Health', icon: 'medical-outline' },
  { id: 'science', label: 'Science', icon: 'flask-outline' },
];

export const CategoryFilterExample: React.FC = () => {
  const { theme } = useTheme();
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');
  const [selectedShopping, setSelectedShopping] = useState('all');
  const [selectedNews, setSelectedNews] = useState('world');
  const [selectedCustom, setSelectedCustom] = useState('category-1');

  // Example with custom data
  const customCategories: CategoryItem[] = [
    { id: 'category-1', label: 'Category 1', icon: 'star-outline' },
    { id: 'category-2', label: 'Category 2', icon: 'heart-outline' },
    { id: 'category-3', label: 'Category 3', icon: 'bookmark-outline' },
  ];

  const handleCategorySelect = (
    category: CategoryItem,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(category.id);
    console.log('Selected category:', category);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['2xl'],
              marginBottom: theme.spacing[6],
            },
          ]}
        >
          Category Filter Examples
        </Text>

        {/* Restaurant Categories */}
        <View style={[styles.section, { marginBottom: theme.spacing[8] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Restaurant Categories
          </Text>
          <CategoryFilterBar
            categories={restaurantCategories}
            selectedCategory={selectedRestaurant}
            onCategorySelect={(category) => handleCategorySelect(category, setSelectedRestaurant)}
          />
          <Text
            style={[
              styles.selectedText,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                marginTop: theme.spacing[3],
              },
            ]}
          >
            Selected: {selectedRestaurant}
          </Text>
        </View>

        {/* Shopping Categories */}
        <View style={[styles.section, { marginBottom: theme.spacing[8] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Shopping Categories
          </Text>
          <CategoryFilterBar
            categories={shoppingCategories}
            selectedCategory={selectedShopping}
            onCategorySelect={(category) => handleCategorySelect(category, setSelectedShopping)}
            allOptionLabel="All Products"
            allOptionIcon="grid-outline"
          />
          <Text
            style={[
              styles.selectedText,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                marginTop: theme.spacing[3],
              },
            ]}
          >
            Selected: {selectedShopping}
          </Text>
        </View>

        {/* News Categories (without All option) */}
        <View style={[styles.section, { marginBottom: theme.spacing[8] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            News Categories (No "All" Option)
          </Text>
          <CategoryFilterBar
            categories={newsCategories}
            selectedCategory={selectedNews}
            onCategorySelect={(category) => handleCategorySelect(category, setSelectedNews)}
            showAllOption={false}
          />
          <Text
            style={[
              styles.selectedText,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                marginTop: theme.spacing[3],
              },
            ]}
          >
            Selected: {selectedNews}
          </Text>
        </View>

        {/* Custom Categories */}
        <View style={[styles.section, { marginBottom: theme.spacing[8] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Custom Categories (Without "All")
          </Text>
          <CategoryFilterBar
            categories={customCategories}
            selectedCategory={selectedCustom}
            onCategorySelect={(category) => handleCategorySelect(category, setSelectedCustom)}
            showAllOption={false}
          />
          <Text
            style={[
              styles.selectedText,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.sm,
                marginTop: theme.spacing[3],
              },
            ]}
          >
            Selected: {selectedCustom}
          </Text>
        </View>

        {/* Performance Optimized Version */}
        <View style={[styles.section, { marginBottom: theme.spacing[8] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Optimized Version (FlatList)
          </Text>
          <CategoryFilterBarOptimized
            categories={shoppingCategories}
            selectedCategory={selectedShopping}
            onCategorySelect={(category) => handleCategorySelect(category, setSelectedShopping)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 24,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {},
  sectionTitle: {
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  selectedText: {
    paddingHorizontal: 16,
  },
});