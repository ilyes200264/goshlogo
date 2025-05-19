import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { TabNavigationProp } from '../navigation/types';
import { useTheme } from '../contexts';
import { AppHeader } from '../components';

type Props = {
  navigation: TabNavigationProp<'Notifications'>;
};

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome to GoSholo',
      message: 'Thanks for using our app!',
      time: '2 hours ago',
      read: false,
    },
    {
      id: '2',
      title: 'Profile Updated',
      message: 'Your profile was successfully updated',
      time: '1 day ago',
      read: true,
    },
  ];

  const renderNotification = ({ item }: { item: Notification }) => (
    <View
      style={[
        styles.notificationCard,
        {
          backgroundColor: item.read
            ? theme.colors.background.secondary
            : theme.colors.primary[50],
          borderColor: theme.colors.border.default,
          padding: theme.spacing[4],
          marginBottom: theme.spacing[3],
          borderRadius: theme.borderRadius.lg,
        },
      ]}
    >
      <View style={styles.notificationHeader}>
        <Text
          style={[
            styles.notificationTitle,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.base,
            },
          ]}
        >
          {item.title}
        </Text>
        <Text
          style={[
            styles.notificationTime,
            {
              color: theme.colors.text.tertiary,
              fontSize: theme.typography.fontSize.sm,
            },
          ]}
        >
          {item.time}
        </Text>
      </View>
      <Text
        style={[
          styles.notificationMessage,
          {
            color: theme.colors.text.secondary,
            fontSize: theme.typography.fontSize.base,
            marginTop: theme.spacing[2],
          },
        ]}
      >
        {item.message}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <AppHeader
        city="New York"
        onCityPress={() => {
          console.log('City selection from notifications');
        }}
        onNotificationPress={() => {
          console.log('Already on notifications');
        }}
        profileImage="https://i.pravatar.cc/150?img=8"
        onProfilePress={() => {
          navigation.navigate('Profile');
        }}
        showBadge={false}
      />
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        contentContainerStyle={[
          styles.listContainer,
          { paddingHorizontal: theme.spacing[4] },
        ]}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[
                styles.emptyText,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.base,
                },
              ]}
            >
              No notifications
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  notificationCard: {
    borderWidth: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationTitle: {
    fontWeight: '600',
  },
  notificationTime: {},
  notificationMessage: {},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    textAlign: 'center',
  },
});
