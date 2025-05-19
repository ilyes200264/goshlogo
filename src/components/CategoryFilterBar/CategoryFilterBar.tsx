import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export interface CategoryItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  value?: string;
}

interface CategoryFilterBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategorySelect: (category: CategoryItem) => void;
  containerStyle?: ViewStyle;
  showAllOption?: boolean;
  allOptionLabel?: string;
  allOptionIcon?: keyof typeof Ionicons.glyphMap;
}

export const CategoryFilterBar: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
  showAllOption = true,
  allOptionLabel = 'All',
  allOptionIcon = 'apps-outline',
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  // Add "All" option if enabled
  const allCategory: CategoryItem = {
    id: 'all',
    label: allOptionLabel,
    icon: allOptionIcon,
    value: 'all',
  };

  const allCategories = showAllOption ? [allCategory, ...categories] : categories;

  // Auto-scroll to selected category
  useEffect(() => {
    const selectedIndex = allCategories.findIndex(cat => cat.id === selectedCategory);
    if (selectedIndex > 0 && scrollViewRef.current) {
      // Calculate approximate position (button width + margins)
      const buttonWidth = 120; // Approximate width
      const scrollPosition = selectedIndex * buttonWidth;
      
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ x: scrollPosition, animated: true });
      }, 100);
    }
  }, [selectedCategory]);

  const renderCategory = (category: CategoryItem) => {
    const isSelected = selectedCategory === category.id;

    const buttonStyles: ViewStyle[] = [
      styles.categoryButton,
      {
        backgroundColor: isSelected
          ? theme.colors.primary[500]
          : theme.colors.background.secondary,
        borderColor: isSelected
          ? theme.colors.primary[500]
          : theme.colors.border.default,
        borderWidth: isSelected ? 0 : 1,
      },
    ];

    const textStyles = [
      styles.categoryText,
      {
        color: isSelected
          ? theme.colors.text.inverse
          : theme.colors.text.secondary,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: isSelected ? '600' : '400',
      },
    ];

    const iconColor = isSelected
      ? theme.colors.text.inverse
      : theme.colors.text.secondary;

    return (
      <TouchableOpacity
        key={category.id}
        style={buttonStyles}
        onPress={() => onCategorySelect(category)}
        activeOpacity={0.7}
      >
        <Ionicons name={category.icon} size={18} color={iconColor} />
        <Text style={textStyles}>{category.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {allCategories.map(renderCategory)}
      </ScrollView>
    </View>
  );
};

// Alternative implementation with FlatList for better performance with many items
export const CategoryFilterBarOptimized: React.FC<CategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
  showAllOption = true,
  allOptionLabel = 'All',
  allOptionIcon = 'apps-outline',
}) => {
  const { theme } = useTheme();
  const flatListRef = useRef<FlatList>(null);

  const allCategory: CategoryItem = {
    id: 'all',
    label: allOptionLabel,
    icon: allOptionIcon,
    value: 'all',
  };

  const allCategories = showAllOption ? [allCategory, ...categories] : categories;

  useEffect(() => {
    const selectedIndex = allCategories.findIndex(cat => cat.id === selectedCategory);
    if (selectedIndex >= 0 && flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: selectedIndex, animated: true });
    }
  }, [selectedCategory]);

  const renderCategory = ({ item }: { item: CategoryItem }) => {
    const isSelected = selectedCategory === item.id;

    const buttonStyles: ViewStyle[] = [
      styles.categoryButton,
      {
        backgroundColor: isSelected
          ? theme.colors.primary[500]
          : theme.colors.background.secondary,
        borderColor: isSelected
          ? theme.colors.primary[500]
          : theme.colors.border.default,
        borderWidth: isSelected ? 0 : 1,
      },
    ];

    const textStyles = [
      styles.categoryText,
      {
        color: isSelected
          ? theme.colors.text.inverse
          : theme.colors.text.secondary,
        fontSize: theme.typography.fontSize.sm,
        fontWeight: isSelected ? '600' : '400',
      },
    ];

    const iconColor = isSelected
      ? theme.colors.text.inverse
      : theme.colors.text.secondary;

    return (
      <TouchableOpacity
        style={buttonStyles}
        onPress={() => onCategorySelect(item)}
        activeOpacity={0.7}
      >
        <Ionicons name={item.icon} size={18} color={iconColor} />
        <Text style={textStyles}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <FlatList
        ref={flatListRef}
        data={allCategories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        getItemLayout={(data, index) => ({
          length: 120,
          offset: 120 * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    gap: 6,
    minWidth: 80,
  },
  categoryText: {
    marginLeft: 4,
  },
});