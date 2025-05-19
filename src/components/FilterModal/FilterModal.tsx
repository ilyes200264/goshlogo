import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

export interface FilterOptions {
  priceRange: number[];
  rating: number;
  distance: number;
  cuisines: string[];
  dietaryOptions: string[];
  sortBy: string;
  freeDelivery: boolean;
  openNow: boolean;
}

const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];
const CUISINES = ['Italian', 'Chinese', 'Japanese', 'Mexican', 'American', 'Thai', 'Indian', 'Mediterranean'];
const DIETARY_OPTIONS = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher'];
const SORT_OPTIONS = ['Relevance', 'Distance', 'Rating', 'Price: Low to High', 'Price: High to Low'];

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApplyFilters,
  initialFilters = {
    priceRange: [],
    rating: 0,
    distance: 10,
    cuisines: [],
    dietaryOptions: [],
    sortBy: 'Relevance',
    freeDelivery: false,
    openNow: false,
  },
}) => {
  const { theme } = useTheme();
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const handlePriceToggle = (priceIndex: number) => {
    const newPriceRange = [...filters.priceRange];
    if (newPriceRange.includes(priceIndex)) {
      newPriceRange.splice(newPriceRange.indexOf(priceIndex), 1);
    } else {
      newPriceRange.push(priceIndex);
    }
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleCuisineToggle = (cuisine: string) => {
    const newCuisines = [...filters.cuisines];
    if (newCuisines.includes(cuisine)) {
      newCuisines.splice(newCuisines.indexOf(cuisine), 1);
    } else {
      newCuisines.push(cuisine);
    }
    setFilters({ ...filters, cuisines: newCuisines });
  };

  const handleDietaryToggle = (dietary: string) => {
    const newDietary = [...filters.dietaryOptions];
    if (newDietary.includes(dietary)) {
      newDietary.splice(newDietary.indexOf(dietary), 1);
    } else {
      newDietary.push(dietary);
    }
    setFilters({ ...filters, dietaryOptions: newDietary });
  };

  const handleReset = () => {
    setFilters({
      priceRange: [],
      rating: 0,
      distance: 10,
      cuisines: [],
      dietaryOptions: [],
      sortBy: 'Relevance',
      freeDelivery: false,
      openNow: false,
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background.primary }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.headerTitle, { color: theme.colors.text.primary }]}>
              Filters
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.text.primary} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Sort By */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Sort By
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {SORT_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.optionChip,
                      filters.sortBy === option && { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={() => setFilters({ ...filters, sortBy: option })}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        { color: filters.sortBy === option ? '#fff' : theme.colors.text.primary },
                      ]}
                    >
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Price Range */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Price Range
              </Text>
              <View style={styles.priceRangeContainer}>
                {PRICE_RANGES.map((price, index) => (
                  <TouchableOpacity
                    key={price}
                    style={[
                      styles.priceButton,
                      filters.priceRange.includes(index) && { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={() => handlePriceToggle(index)}
                  >
                    <Text
                      style={[
                        styles.priceButtonText,
                        { color: filters.priceRange.includes(index) ? '#fff' : theme.colors.text.primary },
                      ]}
                    >
                      {price}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Rating */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Minimum Rating
              </Text>
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity
                    key={star}
                    onPress={() => setFilters({ ...filters, rating: star })}
                    style={styles.starButton}
                  >
                    <Ionicons
                      name={star <= filters.rating ? 'star' : 'star-outline'}
                      size={24}
                      color={star <= filters.rating ? '#FFD700' : theme.colors.text.secondary}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Distance */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Maximum Distance: {filters.distance} miles
              </Text>
              <View style={styles.distanceContainer}>
                {[1, 3, 5, 10, 15].map((distance) => (
                  <TouchableOpacity
                    key={distance}
                    style={[
                      styles.distanceButton,
                      filters.distance === distance && { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={() => setFilters({ ...filters, distance })}
                  >
                    <Text
                      style={[
                        styles.distanceButtonText,
                        { color: filters.distance === distance ? '#fff' : theme.colors.text.primary },
                      ]}
                    >
                      {distance} mi
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Cuisines */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Cuisines
              </Text>
              <View style={styles.optionsGrid}>
                {CUISINES.map((cuisine) => (
                  <TouchableOpacity
                    key={cuisine}
                    style={[
                      styles.optionChip,
                      filters.cuisines.includes(cuisine) && { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={() => handleCuisineToggle(cuisine)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        { color: filters.cuisines.includes(cuisine) ? '#fff' : theme.colors.text.primary },
                      ]}
                    >
                      {cuisine}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Dietary Options */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
                Dietary Options
              </Text>
              <View style={styles.optionsGrid}>
                {DIETARY_OPTIONS.map((dietary) => (
                  <TouchableOpacity
                    key={dietary}
                    style={[
                      styles.optionChip,
                      filters.dietaryOptions.includes(dietary) && { backgroundColor: theme.colors.primary[500] },
                    ]}
                    onPress={() => handleDietaryToggle(dietary)}
                  >
                    <Text
                      style={[
                        styles.optionChipText,
                        { color: filters.dietaryOptions.includes(dietary) ? '#fff' : theme.colors.text.primary },
                      ]}
                    >
                      {dietary}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Additional Options */}
            <View style={styles.section}>
              <View style={styles.switchOption}>
                <Text style={[styles.switchLabel, { color: theme.colors.text.primary }]}>
                  Free Delivery
                </Text>
                <Switch
                  value={filters.freeDelivery}
                  onValueChange={(value) => setFilters({ ...filters, freeDelivery: value })}
                  trackColor={{ false: '#767577', true: theme.colors.primary[500] }}
                  thumbColor={filters.freeDelivery ? theme.colors.primary[600] : '#f4f3f4'}
                />
              </View>
              <View style={styles.switchOption}>
                <Text style={[styles.switchLabel, { color: theme.colors.text.primary }]}>
                  Open Now
                </Text>
                <Switch
                  value={filters.openNow}
                  onValueChange={(value) => setFilters({ ...filters, openNow: value })}
                  trackColor={{ false: '#767577', true: theme.colors.primary[500] }}
                  thumbColor={filters.openNow ? theme.colors.primary[600] : '#f4f3f4'}
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.footerButton, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, styles.applyButton, { backgroundColor: theme.colors.primary[500] }]}
              onPress={handleApply}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '85%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    marginBottom: 8,
  },
  optionChipText: {
    fontSize: 14,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  priceButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starButton: {
    marginRight: 8,
  },
  distanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  distanceButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  distanceButtonText: {
    fontSize: 14,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resetButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  applyButton: {
    // backgroundColor will be set dynamically
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});