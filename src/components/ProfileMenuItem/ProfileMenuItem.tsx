import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export interface ProfileMenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  rightText?: string;
  onPress: () => void;
  showBorder?: boolean;
  style?: ViewStyle;
  iconColor?: string;
  danger?: boolean;
}

export const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  title,
  subtitle,
  rightIcon = 'chevron-forward',
  rightText,
  onPress,
  showBorder = true,
  style,
  iconColor,
  danger = false,
}) => {
  const { theme } = useTheme();
  
  console.log('Theme in ProfileMenuItem:', theme);
  console.log('Props:', { icon, title, subtitle });

  const getColor = () => {
    if (danger) return theme?.colors?.error?.[500] || '#EF4444';
    if (iconColor) return iconColor;
    return theme?.colors?.primary?.[500] || '#3B82F6';
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        showBorder && {
          borderBottomWidth: 1,
          borderBottomColor: theme?.colors?.border?.default || '#E5E7EB',
        },
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: danger ? (theme?.colors?.error?.[50] || '#FEE2E2') : (theme?.colors?.primary?.[50] || '#EBF5FF') }]}>
        <Ionicons name={icon} size={22} color={getColor()} />
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.title, { color: danger ? (theme?.colors?.error?.[500] || '#EF4444') : (theme?.colors?.text?.primary || '#1F2937') }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: theme?.colors?.text?.secondary || '#6B7280' }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightText && (
          <Text style={[styles.rightText, { color: theme?.colors?.text?.secondary || '#6B7280' }]}>
            {rightText}
          </Text>
        )}
        <Ionicons
          name={rightIcon}
          size={20}
          color={theme?.colors?.text?.secondary || '#6B7280'}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    fontSize: 14,
    marginRight: 8,
  },
});