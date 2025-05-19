import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {
  ProfessionalSearchInput,
  ProfessionalCategoryFilter,
  CategoryItem,
} from '../components';
import { useTheme } from '../contexts';

export const ProfessionalUIDemo: React.FC = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All', icon: 'apps' },
    { id: 'pizza', label: 'Pizza', icon: 'pizza' },
    { id: 'burger', label: 'Burgers', icon: 'fast-food' },
    { id: 'sushi', label: 'Sushi', icon: 'fish' },
    { id: 'coffee', label: 'Coffee', icon: 'cafe' },
    { id: 'dessert', label: 'Desserts', icon: 'ice-cream' },
    { id: 'healthy', label: 'Healthy', icon: 'leaf' },
    { id: 'drinks', label: 'Drinks', icon: 'wine' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Professional UI Components
        </Text>

        {/* Clean Search Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Clean Search Input
          </Text>
          <ProfessionalSearchInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search for restaurants, foods..."
            rightIcon="options"
            onRightIconPress={() => console.log('Filter pressed')}
          />
        </View>

        {/* Clean Category Filter */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Clean Category Filter
          </Text>
          <ProfessionalCategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(category) => setSelectedCategory(category.id)}
          />
        </View>

        {/* Combined Example */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Combined Usage
          </Text>
          <View style={styles.combinedExample}>
            <ProfessionalSearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="What are you looking for?"
            />
            <ProfessionalCategoryFilter
              categories={categories.slice(0, 5)}
              selectedCategory={selectedCategory}
              onCategorySelect={(category) => setSelectedCategory(category.id)}
            />
          </View>
        </View>

        {/* Design Principles */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Design Principles
          </Text>
          <View style={[styles.principleCard, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.principleTitle, { color: theme.colors.text.primary }]}>
              Clean & Minimal
            </Text>
            <Text style={[styles.principleText, { color: theme.colors.text.secondary }]}>
              • Reduced visual clutter{'\n'}
              • Professional typography{'\n'}
              • Subtle animations{'\n'}
              • Consistent spacing
            </Text>
          </View>
          <View style={[styles.principleCard, { backgroundColor: theme.colors.background.secondary }]}>
            <Text style={[styles.principleTitle, { color: theme.colors.text.primary }]}>
              Better Spacing
            </Text>
            <Text style={[styles.principleText, { color: theme.colors.text.secondary }]}>
              • Smaller component heights{'\n'}
              • Consistent margins{'\n'}
              • Balanced padding{'\n'}
              • Proper alignment
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
    marginBottom: 12,
  },
  combinedExample: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FAFAFA',
  },
  principleCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  principleTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  principleText: {
    fontSize: 14,
    lineHeight: 20,
  },
});