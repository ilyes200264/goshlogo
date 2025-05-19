import React from 'react';
import { Alert } from 'react-native';
import { LoginScreen } from './LoginScreen';
import { NavigationProp } from '@react-navigation/native';

interface LoginExampleProps {
  navigation: NavigationProp<any>;
}

export const LoginExample: React.FC<LoginExampleProps> = ({ navigation }) => {
  const handleLogin = async (email: string, password: string) => {
    try {
      // Your login logic here
      const response = await fetch('https://api.yourapp.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save auth token, navigate to home, etc.
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Implement Google Sign-In
      // For example, using @react-native-google-signin/google-signin
      Alert.alert('Google Login', 'Implement Google Sign-In here');
    } catch (error) {
      Alert.alert('Error', 'Google login failed');
    }
  };

  const handleAppleLogin = async () => {
    try {
      // Implement Apple Sign-In
      // For example, using @invertase/react-native-apple-authentication
      Alert.alert('Apple Login', 'Implement Apple Sign-In here');
    } catch (error) {
      Alert.alert('Error', 'Apple login failed');
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <LoginScreen
      navigation={navigation}
      onLogin={handleLogin}
      onGoogleLogin={handleGoogleLogin}
      onAppleLogin={handleAppleLogin}
      onForgotPassword={handleForgotPassword}
    />
  );
};

/* Usage in your navigation setup:

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginExample } from './src/screens/LoginExample';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { ForgotPasswordScreen } from './src/screens/ForgotPasswordScreen';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginExample} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="RegisterScreen" 
          component={RegisterScreen} 
          options={{ title: 'Register' }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: 'Forgot Password' }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/