import React from 'react';
import { Alert } from 'react-native';
import { RegisterScreen } from './RegisterScreen';
import { NavigationProp } from '@react-navigation/native';

interface RegisterExampleProps {
  navigation: NavigationProp<any>;
}

export const RegisterExample: React.FC<RegisterExampleProps> = ({ navigation }) => {
  const handleRegister = async (fullName: string, email: string, password: string) => {
    try {
      // Your registration logic here
      const response = await fetch('https://api.yourapp.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save auth token, navigate to home, etc.
        Alert.alert('Success', 'Registration successful! Please log in.');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message || 'Registration failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    }
  };

  const handleGoogleSignup = async () => {
    try {
      // Implement Google Sign-Up
      // For example, using @react-native-google-signin/google-signin
      Alert.alert('Google Signup', 'Implement Google Sign-Up here');
    } catch (error) {
      Alert.alert('Error', 'Google signup failed');
    }
  };

  const handleAppleSignup = async () => {
    try {
      // Implement Apple Sign-Up
      // For example, using @invertase/react-native-apple-authentication
      Alert.alert('Apple Signup', 'Implement Apple Sign-Up here');
    } catch (error) {
      Alert.alert('Error', 'Apple signup failed');
    }
  };

  return (
    <RegisterScreen
      navigation={navigation}
      onRegister={handleRegister}
      onGoogleSignup={handleGoogleSignup}
      onAppleSignup={handleAppleSignup}
    />
  );
};

/* Usage in your navigation setup:

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterExample } from './src/screens/RegisterExample';
import { HomeScreen } from './src/screens/HomeScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterExample} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TabNavigator" 
          component={TabNavigator} 
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
*/