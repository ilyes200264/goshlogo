import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ProfessionalSearchInput } from '../components';
import { useTheme } from '../contexts';

export const SearchDemoScreen: React.FC = () => {
  const { theme } = useTheme();
  const [searchValue, setSearchValue] = useState('');
  const [searchValue2, setSearchValue2] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchValue);
  };

  const handleSearch2 = () => {
    console.log('Searching for:', searchValue2);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Search Input Demo
        </Text>

        {/* Standard Search Input */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Professional Search Input with Right Icon
          </Text>
          <ProfessionalSearchInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Search for restaurants, cuisines..."
            onSubmitEditing={handleSearch}
            rightIcon="search"
            onRightIconPress={handleSearch}
          />
        </View>

        {/* Search Input Without Right Icon */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Professional Search Input (Simple)
          </Text>
          <ProfessionalSearchInput
            value={searchValue2}
            onChangeText={setSearchValue2}
            placeholder="Type to search..."
            onSubmitEditing={handleSearch2}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
});