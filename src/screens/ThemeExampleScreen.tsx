import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../contexts';

export const ThemeExampleScreen: React.FC = () => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Custom Theme Colors
        </Text>

        {/* Primary Color - Light Blue */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.primary[500] }]}>
            Primary - Light Blue (#5BC4DB)
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.primary[500] }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text.inverse }]}>
              Primary Button
            </Text>
          </TouchableOpacity>
          <View style={[styles.badge, { backgroundColor: theme.colors.primary[100] }]}>
            <Text style={[styles.badgeText, { color: theme.colors.primary[700] }]}>
              Primary Badge
            </Text>
          </View>
        </View>

        {/* Secondary Color - Dark Teal */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.secondary[500] }]}>
            Secondary - Dark Teal (#016167)
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.secondary[500] }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text.inverse }]}>
              Secondary Button
            </Text>
          </TouchableOpacity>
          <View style={[styles.card, { backgroundColor: theme.colors.background.teal }]}>
            <Text style={[styles.cardText, { color: theme.colors.secondary[700] }]}>
              Teal Background Card
            </Text>
          </View>
        </View>

        {/* Accent Color - Orange */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.accent[500] }]}>
            Accent - Orange (#FF6233)
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.accent[500] }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: theme.colors.text.inverse }]}>
              Accent Button
            </Text>
          </TouchableOpacity>
          <View style={[styles.outlineButton, { borderColor: theme.colors.accent[500] }]}>
            <Text style={[styles.outlineButtonText, { color: theme.colors.accent[500] }]}>
              Outline Button
            </Text>
          </View>
        </View>

        {/* Success Color - Light Green */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.success[400] }]}>
            Success - Light Green (#B2FD9D)
          </Text>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: theme.colors.success[400] }]}
            activeOpacity={0.8}
          >
            <Text style={[styles.buttonText, { color: theme.colors.secondary[700] }]}>
              Success Button
            </Text>
          </TouchableOpacity>
          <View style={[styles.successNotice, { 
            backgroundColor: theme.colors.background.success,
            borderColor: theme.colors.border.success,
          }]}>
            <Text style={[styles.noticeText, { color: theme.colors.success[700] }]}>
              Success Message
            </Text>
          </View>
        </View>

        {/* Combined Usage */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Combined Usage Example
          </Text>
          <View style={[styles.exampleCard, { 
            backgroundColor: theme.colors.background.primary,
            borderColor: theme.colors.border.default,
          }]}>
            <View style={[styles.cardHeader, { backgroundColor: theme.colors.primary[50] }]}>
              <Text style={[styles.cardTitle, { color: theme.colors.primary[700] }]}>
                Modern Card Design
              </Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={[styles.cardDescription, { color: theme.colors.text.secondary }]}>
                Using custom theme colors throughout the app
              </Text>
              <View style={styles.cardActions}>
                <TouchableOpacity style={[styles.smallButton, { backgroundColor: theme.colors.accent[500] }]}>
                  <Text style={styles.smallButtonText}>Action</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.smallButton, { 
                  backgroundColor: 'transparent',
                  borderWidth: 1,
                  borderColor: theme.colors.secondary[500],
                }]}>
                  <Text style={[styles.smallButtonText, { color: theme.colors.secondary[500] }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Raw Colors Access */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.primary }]}>
            Direct Color Access
          </Text>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.raw.lightBlue }]} />
            <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
              {theme.colors.raw.lightBlue}
            </Text>
          </View>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.raw.darkTeal }]} />
            <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
              {theme.colors.raw.darkTeal}
            </Text>
          </View>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.raw.orange }]} />
            <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
              {theme.colors.raw.orange}
            </Text>
          </View>
          <View style={styles.colorRow}>
            <View style={[styles.colorBox, { backgroundColor: theme.colors.raw.lightGreen }]} />
            <Text style={[styles.colorLabel, { color: theme.colors.text.secondary }]}>
              {theme.colors.raw.lightGreen}
            </Text>
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    marginBottom: 12,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },
  successNotice: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 8,
  },
  noticeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  exampleCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 12,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  smallButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  colorBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  colorLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});