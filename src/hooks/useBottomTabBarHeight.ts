import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const TAB_BAR_HEIGHT = 60;
const TAB_CURVE_HEIGHT = 20;

export const useBottomTabBarHeight = () => {
  const insets = useSafeAreaInsets();
  
  // Total height is the tab bar height + curve height + bottom safe area inset
  const totalHeight = TAB_BAR_HEIGHT + TAB_CURVE_HEIGHT + insets.bottom;
  
  return totalHeight;
};