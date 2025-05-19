import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
} from 'react-native';
import { MainStackNavigationProp } from '../navigation/types';
import { Button } from '../components';
import { useTheme } from '../contexts';

type Props = {
  navigation: MainStackNavigationProp<'Settings'>;
};

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: theme.spacing[4] },
        ]}
      >
        <View style={[styles.section, { marginBottom: theme.spacing[6] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            General
          </Text>
          <View
            style={[
              styles.settingRow,
              {
                paddingVertical: theme.spacing[3],
                borderBottomColor: theme.colors.border.default,
              },
            ]}
          >
            <Text
              style={[
                styles.settingLabel,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.base,
                },
              ]}
            >
              Notifications
            </Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: theme.colors.neutral[300],
                true: theme.colors.primary[500],
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
          <View
            style={[
              styles.settingRow,
              {
                paddingVertical: theme.spacing[3],
                borderBottomColor: theme.colors.border.default,
              },
            ]}
          >
            <Text
              style={[
                styles.settingLabel,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize.base,
                },
              ]}
            >
              Dark Mode
            </Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{
                false: theme.colors.neutral[300],
                true: theme.colors.primary[500],
              }}
              thumbColor={theme.colors.background.primary}
            />
          </View>
        </View>

        <View style={[styles.section, { marginBottom: theme.spacing[6] }]}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize.lg,
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            About
          </Text>
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onPress={() => console.log('Privacy Policy')}
            style={{ marginBottom: theme.spacing[3] }}
          >
            Privacy Policy
          </Button>
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onPress={() => console.log('Terms of Service')}
          >
            Terms of Service
          </Button>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.versionText,
              {
                color: theme.colors.text.tertiary,
                fontSize: theme.typography.fontSize.sm,
              },
            ]}
          >
            Version 1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {},
  sectionTitle: {
    fontWeight: '600',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  settingLabel: {},
  versionText: {
    textAlign: 'center',
  },
});
