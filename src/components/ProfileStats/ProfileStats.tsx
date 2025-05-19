import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

interface StatItem {
  icon: keyof typeof Ionicons.glyphMap;
  value: string;
  label: string;
  color: string;
}

export interface ProfileStatsProps {
  stats: StatItem[];
  onStatPress?: (stat: StatItem) => void;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats, onStatPress }) => {
  const { theme } = useTheme();
  
  console.log('Theme in ProfileStats:', theme);
  console.log('Stats:', stats);

  return (
    <View style={[styles.container, { backgroundColor: theme?.colors?.background?.secondary || '#F9FAFB' }]}>
      {stats.map((stat, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.statItem,
            index !== stats.length - 1 && {
              borderRightWidth: 1,
              borderRightColor: theme?.colors?.border?.default || '#E5E7EB',
            },
          ]}
          onPress={() => onStatPress?.(stat)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
            <Ionicons name={stat.icon} size={24} color={stat.color} />
          </View>
          <Text style={[styles.value, { color: theme?.colors?.text?.primary || '#1F2937' }]}>
            {stat.value}
          </Text>
          <Text style={[styles.label, { color: theme?.colors?.text?.secondary || '#6B7280' }]}>
            {stat.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});