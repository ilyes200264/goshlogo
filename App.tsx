import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, AssetProvider } from './src/contexts';
import { MainNavigator } from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AssetProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </AssetProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
