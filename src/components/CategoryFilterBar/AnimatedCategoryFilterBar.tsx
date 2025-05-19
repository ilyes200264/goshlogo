import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { CategoryItem } from './CategoryFilterBar';

export interface AnimatedCategoryFilterBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategorySelect: (category: CategoryItem) => void;
  containerStyle?: ViewStyle;
}

const CategoryButton: React.FC<{
  category: CategoryItem;
  isSelected: boolean;
  onPress: () => void;
}> = ({ category, isSelected, onPress }) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const rotateZ = useSharedValue(0);
  const backgroundColor = useSharedValue(0);

  React.useEffect(() => {
    scale.value = withSpring(isSelected ? 1.05 : 1, {
      damping: 15,
      stiffness: 300,
    });
    
    backgroundColor.value = withTiming(isSelected ? 1 : 0, {
      duration: 300,
    });

    if (isSelected) {
      rotateZ.value = withSpring(360, {
        damping: 20,
        stiffness: 200,
      });
    } else {
      rotateZ.value = withSpring(0);
    }
  }, [isSelected]);

  const handlePress = () => {
    scale.value = withSpring(0.95, {
      damping: 20,
      stiffness: 400,
    }, () => {
      scale.value = withSpring(isSelected ? 1.05 : 1);
    });
    runOnJS(onPress)();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolate(
      backgroundColor.value,
      [0, 1],
      [theme.colors.background.secondary, theme.colors.primary[500]]
    );

    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
      backgroundColor: bgColor,
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const color = interpolate(
      backgroundColor.value,
      [0, 1],
      [theme.colors.text.secondary, '#FFFFFF']
    );

    return {
      color,
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View style={[styles.categoryButton, animatedStyle]}>
        {category.icon && (
          <Animated.Text style={[styles.icon, textStyle]}>
            <Ionicons
              name={category.icon}
              size={18}
              color={isSelected ? '#FFFFFF' : theme.colors.text.secondary}
            />
          </Animated.Text>
        )}
        <Animated.Text style={[styles.label, textStyle]}>
          {category.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const AnimatedCategoryFilterBar: React.FC<AnimatedCategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: theme.spacing[4] },
        ]}
      >
        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.id}
            onPress={() => onCategorySelect(category)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  scrollContent: {
    alignItems: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});