import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  interpolateColor,
  Extrapolate,
  runOnJS,
  FadeIn,
  FadeOut,
  Layout,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../contexts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export interface CategoryItem {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  count?: number;
}

export interface EnhancedCategoryFilterBarProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onCategorySelect: (category: CategoryItem) => void;
  containerStyle?: ViewStyle;
  showCounts?: boolean;
  multiSelect?: boolean;
  selectedCategories?: string[];
}

const CategoryButton: React.FC<{
  category: CategoryItem;
  isSelected: boolean;
  onPress: () => void;
  index: number;
  showCount?: boolean;
}> = ({ category, isSelected, onPress, index, showCount = false }) => {
  const { theme } = useTheme();
  
  // Animation values
  const scale = useSharedValue(1);
  const bgOpacity = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const countScale = useSharedValue(0);
  const shadowOpacity = useSharedValue(0);
  const borderWidth = useSharedValue(0);

  // Initialize animations based on selection state
  React.useEffect(() => {
    if (isSelected) {
      scale.value = withSpring(1.05, { damping: 15, stiffness: 200 });
      bgOpacity.value = withTiming(1, { duration: 300 });
      iconRotation.value = withSpring(360, { damping: 20, stiffness: 150 });
      shadowOpacity.value = withTiming(0.15, { duration: 300 });
      borderWidth.value = withTiming(2, { duration: 200 });
      
      if (showCount && category.count) {
        countScale.value = withSpring(1, { damping: 12, stiffness: 180 });
      }
    } else {
      scale.value = withSpring(1, { damping: 15, stiffness: 200 });
      bgOpacity.value = withTiming(0, { duration: 300 });
      iconRotation.value = withSpring(0, { damping: 20, stiffness: 150 });
      shadowOpacity.value = withTiming(0, { duration: 300 });
      borderWidth.value = withTiming(0, { duration: 200 });
      countScale.value = withTiming(0, { duration: 200 });
    }
  }, [isSelected]);

  const handlePress = () => {
    scale.value = withSpring(0.9, {
      damping: 20,
      stiffness: 400,
    }, () => {
      scale.value = withSpring(isSelected ? 1 : 1.05);
    });
    
    runOnJS(onPress)();
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      bgOpacity.value,
      [0, 1],
      [
        theme.colors.background.secondary,
        category.color || theme.colors.primary[500],
      ]
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
      borderWidth: borderWidth.value,
      borderColor: category.color || theme.colors.primary[500],
      shadowOpacity: shadowOpacity.value,
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      bgOpacity.value,
      [0, 1],
      [theme.colors.text.primary, '#FFFFFF']
    );

    return { color };
  });

  const animatedCountStyle = useAnimatedStyle(() => ({
    transform: [{ scale: countScale.value }],
    opacity: countScale.value,
  }));

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.9}>
      <Animated.View
        style={[
          styles.categoryButton,
          animatedContainerStyle,
          {
            shadowColor: category.color || theme.colors.shadow,
          },
        ]}
      >
        {category.icon && (
          <Animated.View style={animatedIconStyle}>
            <Animated.Text style={animatedTextStyle}>
              <Ionicons name={category.icon} size={18} />
            </Animated.Text>
          </Animated.View>
        )}
        
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {category.label}
        </Animated.Text>
        
        {showCount && category.count !== undefined && isSelected && (
          <Animated.View style={[styles.countBadge, animatedCountStyle]}>
            <Text style={styles.countText}>{category.count}</Text>
          </Animated.View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export const EnhancedCategoryFilterBar: React.FC<EnhancedCategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
  showCounts = false,
  multiSelect = false,
  selectedCategories = [],
}) => {
  const { theme } = useTheme();
  const scrollViewRef = useRef<ScrollView>(null);
  const [showGradients, setShowGradients] = useState({ left: false, right: true });
  
  // Animation values
  const indicatorPosition = useSharedValue(0);
  const indicatorWidth = useSharedValue(0);
  const scrollX = useSharedValue(0);

  // Handle scroll to show/hide gradients
  const handleScroll = (event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    scrollX.value = contentOffset.x;
    
    setShowGradients({
      left: contentOffset.x > 0,
      right: contentOffset.x < contentSize.width - layoutMeasurement.width,
    });
  };

  // Calculate indicator position for single select
  React.useEffect(() => {
    if (!multiSelect) {
      const selectedIndex = categories.findIndex(cat => cat.id === selectedCategory);
      if (selectedIndex !== -1) {
        // Mock calculation - in reality, you'd measure button positions
        const estimatedButtonWidth = 100;
        const estimatedGap = 12;
        indicatorPosition.value = withSpring(
          selectedIndex * (estimatedButtonWidth + estimatedGap) + estimatedButtonWidth / 2,
          { damping: 15, stiffness: 150 }
        );
        indicatorWidth.value = withSpring(estimatedButtonWidth, {
          damping: 15,
          stiffness: 150,
        });
      }
    }
  }, [selectedCategory, categories, multiSelect]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorPosition.value - indicatorWidth.value / 2 }],
    width: indicatorWidth.value,
  }));

  const isSelected = (categoryId: string) => {
    if (multiSelect) {
      return selectedCategories.includes(categoryId);
    }
    return selectedCategory === categoryId;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Background Blur Effect */}
      <View style={styles.backgroundContainer}>
        <BlurView intensity={10} style={StyleSheet.absoluteFill} />
      </View>

      {/* Animated Indicator (for single select) */}
      {!multiSelect && (
        <Animated.View
          style={[
            styles.indicator,
            animatedIndicatorStyle,
            { backgroundColor: theme.colors.primary[500] },
          ]}
        />
      )}

      {/* Left Gradient */}
      {showGradients.left && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.gradient, styles.gradientLeft]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={[theme.colors.background.primary, 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}

      {/* Categories ScrollView */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {categories.map((category, index) => (
          <CategoryButton
            key={category.id}
            category={category}
            isSelected={isSelected(category.id)}
            onPress={() => onCategorySelect(category)}
            index={index}
            showCount={showCounts}
          />
        ))}
      </ScrollView>

      {/* Right Gradient */}
      {showGradients.right && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[styles.gradient, styles.gradientRight]}
          pointerEvents="none"
        >
          <LinearGradient
            colors={['transparent', theme.colors.background.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}

      {/* Selected Count for Multi-select */}
      {multiSelect && selectedCategories.length > 0 && (
        <Animated.View
          entering={FadeIn.springify()}
          exiting={FadeOut}
          style={[
            styles.selectedCount,
            { backgroundColor: theme.colors.primary[500] },
          ]}
        >
          <Text style={styles.selectedCountText}>
            {selectedCategories.length} selected
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    marginVertical: 16,
    position: 'relative',
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    overflow: 'hidden',
    opacity: 0.05,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
  countBadge: {
    marginLeft: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    borderRadius: 2,
    zIndex: -1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 30,
    zIndex: 10,
  },
  gradientLeft: {
    left: 0,
  },
  gradientRight: {
    right: 0,
  },
  selectedCount: {
    position: 'absolute',
    bottom: -20,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

// Chip-style variant
export const ChipCategoryFilterBar: React.FC<EnhancedCategoryFilterBarProps> = (props) => {
  const { theme } = useTheme();
  
  return (
    <EnhancedCategoryFilterBar
      {...props}
      containerStyle={[
        {
          backgroundColor: theme.colors.background.secondary,
          borderRadius: 12,
          padding: 8,
        },
        props.containerStyle,
      ]}
    />
  );
};

// Icon-only variant
export const IconCategoryFilterBar: React.FC<EnhancedCategoryFilterBarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  containerStyle,
}) => {
  const { theme } = useTheme();
  
  const iconOnlyCategories = categories.map(cat => ({
    ...cat,
    label: '', // Remove labels for icon-only view
  }));
  
  return (
    <View style={[styles.iconContainer, containerStyle]}>
      <EnhancedCategoryFilterBar
        categories={iconOnlyCategories}
        selectedCategory={selectedCategory}
        onCategorySelect={onCategorySelect}
        containerStyle={{ height: 50 }}
      />
    </View>
  );
};

const iconStyles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
});