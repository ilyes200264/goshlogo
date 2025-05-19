import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useBottomTabBarHeight } from '../../hooks';

interface ScreenWrapperProps {
  children: ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ 
  children, 
  style, 
  noPadding = false 
}) => {
  const tabBarHeight = useBottomTabBarHeight();
  
  return (
    <View 
      style={[
        styles.container, 
        !noPadding && { paddingBottom: tabBarHeight },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});