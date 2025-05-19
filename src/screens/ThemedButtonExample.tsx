import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ThemedButton } from '../components/ThemedButton';
import { useTheme } from '../contexts';

export const ThemedButtonExample: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Themed Button Examples
        </Text>

        {/* Primary Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary[500] }]}>
            Primary - Light Blue
          </Text>
          <ThemedButton variant="primary" onPress={() => console.log('Primary')}>
            Primary Button
          </ThemedButton>
          <ThemedButton variant="primary" size="small">
            Small Primary
          </ThemedButton>
          <ThemedButton variant="primary" size="large" fullWidth>
            Large Full Width
          </ThemedButton>
          <ThemedButton variant="primary" disabled>
            Disabled Primary
          </ThemedButton>
        </View>

        {/* Secondary Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.secondary[500] }]}>
            Secondary - Dark Teal
          </Text>
          <ThemedButton variant="secondary">
            Secondary Button
          </ThemedButton>
          <ThemedButton variant="secondary" fullWidth>
            Full Width Secondary
          </ThemedButton>
        </View>

        {/* Accent Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.accent[500] }]}>
            Accent - Orange
          </Text>
          <ThemedButton variant="accent">
            Accent Button
          </ThemedButton>
          <ThemedButton variant="accent" size="large">
            Large Accent
          </ThemedButton>
        </View>

        {/* Success Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.success[500] }]}>
            Success - Light Green
          </Text>
          <ThemedButton variant="success">
            Success Button
          </ThemedButton>
          <ThemedButton variant="success" fullWidth>
            Full Width Success
          </ThemedButton>
        </View>

        {/* Outline Buttons */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Outline Variants
          </Text>
          <ThemedButton variant="outline">
            Outline Primary
          </ThemedButton>
          <ThemedButton 
            variant="outline" 
            textStyle={{ color: theme.colors.accent[500] }}
            style={{ borderColor: theme.colors.accent[500] }}
          >
            Outline Accent
          </ThemedButton>
          <ThemedButton 
            variant="outline" 
            textStyle={{ color: theme.colors.secondary[500] }}
            style={{ borderColor: theme.colors.secondary[500] }}
            disabled
          >
            Disabled Outline
          </ThemedButton>
        </View>

        {/* Mixed Examples */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Mixed Usage
          </Text>
          <View style={styles.row}>
            <ThemedButton variant="accent" size="small">
              Save
            </ThemedButton>
            <ThemedButton variant="outline" size="small">
              Cancel
            </ThemedButton>
          </View>
          <View style={styles.row}>
            <ThemedButton 
              variant="primary" 
              style={{ flex: 1, marginRight: 8 }}
            >
              Accept
            </ThemedButton>
            <ThemedButton 
              variant="secondary" 
              style={{ flex: 1, marginLeft: 8 }}
            >
              Decline
            </ThemedButton>
          </View>
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
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
});