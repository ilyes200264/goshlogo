import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { TabItem } from './CustomBottomNavBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface AnimatedBottomNavBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tab: TabItem) => void;
}

const AnimatedTabButton: React.FC<{
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
  index: number;
  totalTabs: number;
}> = ({ tab, isActive, onPress, index, totalTabs }) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);
  const iconTranslateY = useSharedValue(0);
  const labelOpacity = useSharedValue(isActive ? 1 : 0.7);
  const rotateZ = useSharedValue(0);

  React.useEffect(() => {
    if (isActive) {
      scale.value = withSpring(1.1, {
        damping: 12,
        stiffness: 180,
      });
      
      if (tab.isCenter) {
        rotateZ.value = withSpring(360, {
          damping: 20,
          stiffness: 100,
        });
      }
      
      iconTranslateY.value = withSpring(-3, {
        damping: 15,
        stiffness: 200,
      });
      
      labelOpacity.value = withTiming(1, {
        duration: 200,
      });
    } else {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
      
      rotateZ.value = withSpring(0);
      
      iconTranslateY.value = withSpring(0, {
        damping: 15,
        stiffness: 200,
      });
      
      labelOpacity.value = withTiming(0.7, {
        duration: 200,
      });
    }
  }, [isActive]);

  const handlePress = () => {
    scale.value = withSpring(0.9, {
      damping: 20,
      stiffness: 400,
    }, () => {
      scale.value = withSpring(isActive ? 1.1 : 1);
    });
    
    runOnJS(onPress)();
  };

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotateZ.value}deg` },
      ],
    };
  });

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: iconTranslateY.value }],
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      opacity: labelOpacity.value,
    };
  });

  if (tab.isCenter) {
    return (
      <TouchableOpacity
        key={tab.id}
        onPress={handlePress}
        style={styles.centerTabContainer}
      >
        <Animated.View
          style={[
            styles.centerTab,
            {
              backgroundColor: theme.colors.primary[500],
              borderColor: theme.colors.background.primary,
            },
            animatedContainerStyle,
          ]}
        >
          <Animated.View style={animatedIconStyle}>
            <Ionicons
              name={tab.icon}
              size={28}
              color="#FFFFFF"
            />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      key={tab.id}
      onPress={handlePress}
      style={styles.tabContainer}
    >
      <Animated.View style={[styles.tab, animatedContainerStyle]}>
        <Animated.View style={animatedIconStyle}>
          <Ionicons
            name={tab.icon}
            size={24}
            color={isActive ? theme.colors.primary[500] : theme.colors.text.secondary}
          />
        </Animated.View>
        <Animated.Text
          style={[
            styles.tabLabel,
            {
              color: isActive ? theme.colors.primary[500] : theme.colors.text.secondary,
            },
            animatedLabelStyle,
          ]}
        >
          {tab.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

export const AnimatedBottomNavBar: React.FC<AnimatedBottomNavBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { theme } = useTheme();
  const indicatorPosition = useSharedValue(0);
  
  // Calculate indicator position based on active tab
  React.useEffect(() => {
    const activeIndex = tabs.findIndex(tab => tab.id === activeTab);
    const tabWidth = SCREEN_WIDTH / tabs.length;
    indicatorPosition.value = withSpring(activeIndex * tabWidth + tabWidth / 2 - 20, {
      damping: 15,
      stiffness: 150,
    });
  }, [activeTab, tabs]);

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: indicatorPosition.value }],
    };
  });

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.primary,
          borderTopColor: theme.colors.border.default,
        },
      ]}
    >
      {/* Animated Indicator */}
      <Animated.View
        style={[
          styles.indicator,
          {
            backgroundColor: theme.colors.primary[500],
          },
          animatedIndicatorStyle,
        ]}
      />
      
      {/* Tab Buttons */}
      <View style={styles.tabsContainer}>
        {tabs.map((tab, index) => (
          <AnimatedTabButton
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            onPress={() => onTabPress(tab)}
            index={index}
            totalTabs={tabs.length}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 3,
    borderRadius: 2,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 80 : 56,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 4,
  },
  centerTabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    borderWidth: 4,
  },
});