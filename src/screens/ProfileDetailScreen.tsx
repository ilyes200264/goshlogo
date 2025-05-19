import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { MainStackNavigationProp, MainStackRouteProp } from '../navigation/types';
import { Button } from '../components';
import { useTheme, useAssets } from '../contexts';

type Props = {
  navigation: MainStackNavigationProp<'Profile'>;
  route: MainStackRouteProp<'Profile'>;
};

export const ProfileDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { theme } = useTheme();
  const { images } = useAssets();
  const { userId } = route.params;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          { paddingHorizontal: theme.spacing[4] },
        ]}
      >
        <View style={[styles.profileHeader, { marginBottom: theme.spacing[6] }]}>
          <Image
            source={images.placeholder}
            style={[
              styles.avatar,
              {
                borderRadius: theme.borderRadius.full,
                marginBottom: theme.spacing[4],
              },
            ]}
          />
          <Text
            style={[
              styles.userName,
              {
                color: theme.colors.text.primary,
                fontSize: theme.typography.fontSize['2xl'],
                marginBottom: theme.spacing[2],
              },
            ]}
          >
            User {userId}
          </Text>
          <Text
            style={[
              styles.userBio,
              {
                color: theme.colors.text.secondary,
                fontSize: theme.typography.fontSize.base,
                textAlign: 'center',
                marginBottom: theme.spacing[4],
              },
            ]}
          >
            This is a user profile detail screen. You can add more information about the user here.
          </Text>
          <Button
            variant="primary"
            size="lg"
            onPress={() => console.log('Follow user')}
          >
            Follow
          </Button>
        </View>

        <View style={[styles.statsContainer, { marginBottom: theme.spacing[6] }]}>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize['2xl'],
                },
              ]}
            >
              123
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              Posts
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize['2xl'],
                },
              ]}
            >
              456
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              Followers
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[
                styles.statNumber,
                {
                  color: theme.colors.text.primary,
                  fontSize: theme.typography.fontSize['2xl'],
                },
              ]}
            >
              789
            </Text>
            <Text
              style={[
                styles.statLabel,
                {
                  color: theme.colors.text.secondary,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              Following
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
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
  },
  userName: {
    fontWeight: '700',
  },
  userBio: {},
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: '700',
  },
  statLabel: {
    marginTop: 4,
  },
});
