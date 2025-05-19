import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { TextField } from '../components';
import { useTheme } from '../contexts';

export const FormExamplesScreen: React.FC = () => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    default: '',
    filled: '',
    outlined: '',
    withIcon: '',
    disabled: 'This field is disabled',
    required: '',
    error: 'invalid@email',
  });

  const [touched, setTouched] = useState({
    error: true,
  });

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          { paddingHorizontal: theme.spacing[5] },
        ]}
      >
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize['2xl'],
              marginBottom: theme.spacing[6],
            },
          ]}
        >
          TextField Examples
        </Text>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Variants
          </Text>

          <TextField
            label="Default Style"
            value={form.default}
            onChangeText={(text) => handleChange('default', text)}
            placeholder="Default input field"
          />

          <TextField
            label="Filled Style"
            value={form.filled}
            onChangeText={(text) => handleChange('filled', text)}
            placeholder="Filled input field"
            variant="filled"
          />

          <TextField
            label="Outlined Style"
            value={form.outlined}
            onChangeText={(text) => handleChange('outlined', text)}
            placeholder="Outlined input field"
            variant="outlined"
          />
        </View>

        <View style={[styles.section, { marginTop: theme.spacing[6] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            With Icons
          </Text>

          <TextField
            label="Email"
            value={form.withIcon}
            onChangeText={(text) => handleChange('withIcon', text)}
            placeholder="Enter your email"
            icon="mail-outline"
            keyboardType="email-address"
          />

          <TextField
            label="Phone"
            value=""
            onChangeText={() => {}}
            placeholder="Enter your phone"
            icon="call-outline"
            keyboardType="phone-pad"
          />

          <TextField
            label="Search"
            value=""
            onChangeText={() => {}}
            placeholder="Search for something"
            icon="search-outline"
          />
        </View>

        <View style={[styles.section, { marginTop: theme.spacing[6] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            States
          </Text>

          <TextField
            label="Disabled Field"
            value={form.disabled}
            onChangeText={(text) => handleChange('disabled', text)}
            placeholder="This field is disabled"
            disabled
          />

          <TextField
            label="Required Field"
            value={form.required}
            onChangeText={(text) => handleChange('required', text)}
            placeholder="This field is required"
            required
          />

          <TextField
            label="Error State"
            value={form.error}
            onChangeText={(text) => handleChange('error', text)}
            placeholder="Email with error"
            icon="mail-outline"
            error="Please enter a valid email address"
            touched={touched.error}
            keyboardType="email-address"
          />
        </View>

        <View style={[styles.section, { marginTop: theme.spacing[6] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            Different Types
          </Text>

          <TextField
            label="Multiline Text"
            value=""
            onChangeText={() => {}}
            placeholder="Enter your message..."
            multiline
            numberOfLines={4}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />

          <TextField
            label="Number Field"
            value=""
            onChangeText={() => {}}
            placeholder="Enter a number"
            keyboardType="numeric"
          />

          <TextField
            label="URL Field"
            value=""
            onChangeText={() => {}}
            placeholder="Enter a URL"
            keyboardType="url"
            autoCapitalize="none"
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
  scrollContainer: {
    paddingVertical: 24,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
  },
  section: {},
  sectionTitle: {
    fontWeight: '600',
  },
});