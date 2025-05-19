import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  Login: undefined;
  OTP: { email: string; fullName?: string; password?: string };
  ForgotPassword: undefined;
  TabNavigator: NavigatorScreenParams<TabParamList>;
  Settings: undefined;
  Profile: { userId: string };
  CustomNavBarDemo: undefined;
  RestaurantExample: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Offers: undefined;
  Explore: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type MainStackNavigationProp<T extends keyof MainStackParamList> =
  StackNavigationProp<MainStackParamList, T>;

export type MainStackRouteProp<T extends keyof MainStackParamList> = RouteProp<
  MainStackParamList,
  T
>;

export type TabNavigationProp<T extends keyof TabParamList> = StackNavigationProp<
  TabParamList,
  T
>;

export type TabRouteProp<T extends keyof TabParamList> = RouteProp<TabParamList, T>;
