import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts';

export interface TabItem {
  id: string;
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  isCenter?: boolean;
}

interface CustomBottomNavBarProps {
  tabs: TabItem[];
  activeTab: string;
  onTabPress: (tab: TabItem) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const CustomBottomNavBar: React.FC<CustomBottomNavBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = activeTab === tab.id;
    const isCenter = tab.isCenter;

    if (isCenter) {
      return (
        <View key={tab.id} style={styles.centerTabContainer}>
          <TouchableOpacity
            style={[
              styles.centerTab,
              {
                backgroundColor: theme.colors.accent[500],
                ...theme.shadows.lg,
              },
            ]}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={tab.icon}
              size={28}
              color={theme.colors.text.inverse}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.centerTabLabel,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.xs,
              },
            ]}
          >
            {tab.label}
          </Text>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={tab.id}
        style={styles.tab}
        onPress={() => onTabPress(tab)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={tab.icon}
          size={24}
          color={isActive ? theme.colors.primary[500] : theme.colors.text.secondary}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: isActive ? theme.colors.primary[500] : theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.xs,
            },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.curveContainer}>
        <View
          style={[
            styles.curve,
            {
              backgroundColor: theme.colors.background.primary,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.background.primary,
            paddingBottom: insets.bottom || 10,
            ...theme.shadows.lg,
          },
        ]}
      >
        <View style={styles.tabContainer}>
          {tabs.map((tab, index) => renderTab(tab, index))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  curveContainer: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 20,
    overflow: 'hidden',
  },
  curve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    marginTop: 4,
    fontWeight: '500',
  },
  centerTabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30,
  },
  centerTab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  centerTabLabel: {
    marginTop: 8,
    fontWeight: '500',
  },
});

// Alternative design with more pronounced curve
export const CustomBottomNavBarCurved: React.FC<CustomBottomNavBarProps> = ({
  tabs,
  activeTab,
  onTabPress,
}) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const renderTab = (tab: TabItem, index: number) => {
    const isActive = activeTab === tab.id;
    const isCenter = tab.isCenter;

    if (isCenter) {
      return (
        <View key={tab.id} style={styles.centerTabContainer}>
          <View style={styles.centerTabBackground}>
            <View
              style={[
                styles.centerTabOuter,
                {
                  backgroundColor: theme.colors.background.primary,
                },
              ]}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.centerTabAlt,
              {
                backgroundColor: theme.colors.primary[500],
                ...theme.shadows.lg,
              },
            ]}
            onPress={() => onTabPress(tab)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={tab.icon}
              size={30}
              color={theme.colors.text.inverse}
            />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity
        key={tab.id}
        style={styles.tab}
        onPress={() => onTabPress(tab)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={tab.icon}
          size={24}
          color={isActive ? theme.colors.primary[500] : theme.colors.text.secondary}
        />
        <Text
          style={[
            styles.tabLabel,
            {
              color: isActive ? theme.colors.primary[500] : theme.colors.text.secondary,
              fontSize: theme.typography.fontSize.xs,
            },
          ]}
        >
          {tab.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.containerAlt,
        {
          backgroundColor: theme.colors.background.primary,
          paddingBottom: insets.bottom || 10,
          ...theme.shadows.lg,
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => renderTab(tab, index))}
      </View>
    </View>
  );
};

const stylesAlt = StyleSheet.create({
  containerAlt: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  centerTabBackground: {
    position: 'absolute',
    top: -30,
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
  },
  centerTabAlt: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -35,
  },
});