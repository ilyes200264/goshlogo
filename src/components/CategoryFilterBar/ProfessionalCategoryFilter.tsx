import React, { useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface CategoryItem {
  id: string;
  label?: string;
  name?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export interface ProfessionalCategoryFilterProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategorySelect: (category: CategoryItem) => void;
  containerStyle?: ViewStyle;
}

const CategoryButton: React.FC<{
  category: CategoryItem;
  isSelected: boolean;
  onPress: () => void;
  index: number;
}> = ({ category, isSelected, onPress, index }) => {
  const { theme } = useTheme();
  
  // Animation values
  const pressAnimation = useSharedValue(0);
  const selectionAnimation = useSharedValue(isSelected ? 1 : 0);

  React.useEffect(() => {
    selectionAnimation.value = withTiming(isSelected ? 1 : 0, { duration: 200 });
  }, [isSelected]);

  const handlePress = () => {
    pressAnimation.value = withTiming(1, { duration: 100 });
    setTimeout(() => {
      pressAnimation.value = withTiming(0, { duration: 100 });
    }, 100);
    runOnJS(onPress)();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      pressAnimation.value,
      [0, 1],
      [1, 0.95]
    );

    const backgroundColor = interpolate(
      selectionAnimation.value,
      [0, 1],
      [0, 1]
    );

    return {
      transform: [{ scale }],
      backgroundColor: backgroundColor === 1 
        ? theme.colors.text.primary
        : 'transparent',
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolate(
      selectionAnimation.value,
      [0, 1],
      [0, 1]
    );

    return {
      color: color === 1 
        ? theme.colors.background.primary
        : theme.colors.text.primary,
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.categoryButton,
          isSelected && styles.selectedButton,
          animatedStyle,
        ]}
      >
        {category.icon && (
          <Animated.Text style={[styles.icon, animatedTextStyle]}>
            <Ionicons name={category.icon} size={16} />
          </Animated.Text>
        )}
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {category.label || category.name || ''}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const ProfessionalCategoryFilter: React.FC<ProfessionalCategoryFilterProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => onCategorySelect(category)}
            index={index}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 36,
    marginVertical: 12,
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
    borderRadius: 18,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  selectedButton: {
    borderColor: 'transparent',
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
});