import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Switch,
} from 'react-native';
import {
  EnhancedCategoryFilterBar,
  ChipCategoryFilterBar,
  IconCategoryFilterBar,
  CategoryItem,
} from '../components';
import { useTheme } from '../contexts';

export const CategoryFilterDemoScreen: React.FC = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['pizza', 'sushi']);
  const [showCounts, setShowCounts] = useState(true);

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All', icon: 'apps-outline', color: '#3498DB', count: 156 },
    { id: 'pizza', label: 'Pizza', icon: 'pizza-outline', color: '#E74C3C', count: 42 },
    { id: 'burger', label: 'Burger', icon: 'fast-food-outline', color: '#FF6B35', count: 38 },
    { id: 'sushi', label: 'Sushi', icon: 'fish-outline', color: '#1ABC9C', count: 24 },
    { id: 'pasta', label: 'Pasta', icon: 'restaurant-outline', color: '#9B59B6', count: 31 },
    { id: 'coffee', label: 'Coffee', icon: 'cafe-outline', color: '#795548', count: 67 },
    { id: 'dessert', label: 'Dessert', icon: 'ice-cream-outline', color: '#E91E63', count: 29 },
    { id: 'healthy', label: 'Healthy', icon: 'leaf-outline', color: '#4CAF50', count: 45 },
    { id: 'drinks', label: 'Drinks', icon: 'wine-outline', color: '#2196F3', count: 52 },
  ];

  const iconOnlyCategories: CategoryItem[] = [
    { id: 'home', label: 'Home', icon: 'home-outline', color: '#3498DB' },
    { id: 'search', label: 'Search', icon: 'search-outline', color: '#E74C3C' },
    { id: 'cart', label: 'Cart', icon: 'cart-outline', color: '#FF6B35' },
    { id: 'heart', label: 'Favorites', icon: 'heart-outline', color: '#E91E63' },
    { id: 'user', label: 'Profile', icon: 'person-outline', color: '#9B59B6' },
  ];

  const handleCategorySelect = (category: CategoryItem) => {
    setSelectedCategory(category.id);
  };

  const handleMultiSelect = (category: CategoryItem) => {
    setSelectedCategories(prev => {
      if (prev.includes(category.id)) {
        return prev.filter(id => id !== category.id);
      }
      return [...prev, category.id];
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Enhanced Category Filters
        </Text>

        {/* Standard Enhanced Filter */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Enhanced with Animations
          </Text>
          <EnhancedCategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            showCounts={showCounts}
          />
        </View>

        {/* Multi-select Filter */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Multi-select Mode
          </Text>
          <EnhancedCategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            selectedCategories={selectedCategories}
            onCategorySelect={handleMultiSelect}
            multiSelect={true}
            showCounts={showCounts}
          />
        </View>

        {/* Chip Style Variant */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Chip Style Variant
          </Text>
          <ChipCategoryFilterBar
            categories={categories.slice(0, 5)}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </View>

        {/* Icon Only Variant */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Icon Only (Compact)
          </Text>
          <IconCategoryFilterBar
            categories={iconOnlyCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />
        </View>

        {/* Custom Colors */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Custom Colored Categories
          </Text>
          <EnhancedCategoryFilterBar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            showCounts={false}
          />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, { color: theme.colors.text.primary }]}>
              Show Counts
            </Text>
            <Switch
              value={showCounts}
              onValueChange={setShowCounts}
              trackColor={{ false: '#767577', true: theme.colors.primary[300] }}
              thumbColor={showCounts ? theme.colors.primary[500] : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Selected Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Selection Info
          </Text>
          <View style={[styles.infoCard, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
              Single Select: {selectedCategory}
            </Text>
            <Text style={[styles.infoText, { color: theme.colors.text.primary }]}>
              Multi Select: {selectedCategories.join(', ')}
            </Text>
          </View>
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  controls: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
  },
});