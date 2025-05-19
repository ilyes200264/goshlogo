import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface FilterButton {
  id: string;
  label: string;
  icon?: string;
  iconType?: 'ionicon' | 'material';
  isActive?: boolean;
}

interface FilterButtonsProps {
  filters?: FilterButton[];
  onFilterPress?: (filterId: string) => void;
  style?: any;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const defaultFilters: FilterButton[] = [
  { id: 'filter', label: 'Filter', icon: 'filter', iconType: 'ionicon' },
  { id: 'near-me', label: 'Near me', icon: 'location-on', iconType: 'material' },
  { id: 'highly-rated', label: 'Highly rated', icon: 'star', iconType: 'ionicon' },
  { id: 'open-now', label: 'Open now', icon: 'time-outline', iconType: 'ionicon' },
];

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters = defaultFilters,
  onFilterPress,
  style,
}) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterPress = (filterId: string) => {
    if (filterId === 'filter') {
      // Handle main filter button differently
      onFilterPress?.(filterId);
      return;
    }

    setActiveFilters(prev => {
      const isActive = prev.includes(filterId);
      const updated = isActive
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId];
      
      return updated;
    });
    
    onFilterPress?.(filterId);
  };

  const renderIcon = (filter: FilterButton) => {
    const iconColor = activeFilters.includes(filter.id) || filter.id === 'filter' 
      ? '#FFFFFF' 
      : '#6B7280';
    
    if (filter.iconType === 'material') {
      return (
        <MaterialIcons
          name={filter.icon as any}
          size={16}
          color={iconColor}
          style={styles.icon}
        />
      );
    }
    
    return (
      <Ionicons
        name={filter.icon as any}
        size={16}
        color={iconColor}
        style={styles.icon}
      />
    );
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id) || filter.id === 'filter';
        const scale = useSharedValue(1);
        
        const animatedStyle = useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
        }));

        return (
          <AnimatedTouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              isActive && styles.filterButtonActive,
              filter.id === 'filter' && styles.mainFilterButton,
              animatedStyle,
            ]}
            onPress={() => handleFilterPress(filter.id)}
            onPressIn={() => {
              scale.value = withSpring(0.95);
            }}
            onPressOut={() => {
              scale.value = withSpring(1);
            }}
          >
            {filter.icon && renderIcon(filter)}
            <Text
              style={[
                styles.filterText,
                isActive && styles.filterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </AnimatedTouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingRight: 32,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  mainFilterButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  icon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
});