import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackParamList } from './types';
import { CustomTabNavigator } from './CustomTabNavigator';
import {SettingsScreen, ProfileDetailScreen, AuthScreen, OTPScreen, ForgotPasswordScreen} from '../screens';
import { useTheme } from '../contexts';

const Stack = createStackNavigator<MainStackParamList>();

export const MainNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
          borderBottomColor: theme.colors.border.default,
          borderBottomWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: theme.typography.fontSize.lg,
        },
        cardStyle: {
          backgroundColor: theme.colors.background.primary,
        },
      }}
    >
      <Stack.Screen
        name="Login"
        component={AuthScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={CustomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileDetailScreen}
        options={{ title: 'Profile' }}
      />
    </Stack.Navigator>
  );
};
