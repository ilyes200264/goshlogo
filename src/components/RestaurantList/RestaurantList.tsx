import React from 'react';
import {
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  ViewStyle,
  Text,
  RefreshControl,
} from 'react-native';
import { RestaurantCard, RestaurantCardHorizontal, RestaurantData } from '../RestaurantCard';
import { useTheme } from '../../contexts';

interface RestaurantListProps {
  restaurants: RestaurantData[];
  onRestaurantPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  horizontal?: boolean;
  showSeparator?: boolean;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  title?: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const RestaurantList: React.FC<RestaurantListProps> = ({
  restaurants,
  onRestaurantPress,
  onFavoriteToggle,
  horizontal = false,
  showSeparator = false,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  containerStyle,
  contentContainerStyle,
  title,
  refreshing = false,
  onRefresh,
}) => {
  const { theme } = useTheme();

  const renderRestaurant = ({ item }: { item: RestaurantData }) => {
    const CardComponent = horizontal ? RestaurantCardHorizontal : RestaurantCard;
    
    return (
      <View style={horizontal ? styles.horizontalCard : styles.verticalCard}>
        <CardComponent
          restaurant={item}
          onPress={onRestaurantPress}
          onFavoriteToggle={onFavoriteToggle}
        />
      </View>
    );
  };

  const renderSeparator = () => {
    if (!showSeparator || horizontal) return null;
    return (
      <View
        style={{
          height: 1,
          backgroundColor: theme.colors.border.default,
          marginVertical: theme.spacing[2],
        }}
      />
    );
  };

  const defaultEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text
        style={{
          color: theme.colors.text.secondary,
          fontSize: theme.typography.fontSize.base,
        }}
      >
        No restaurants found
      </Text>
    </View>
  );

  const headerComponent = (
    <>
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: theme.colors.text.primary,
              fontSize: theme.typography.fontSize.xl,
              marginBottom: theme.spacing[4],
              paddingHorizontal: horizontal ? 0 : theme.spacing[4],
            },
          ]}
        >
          {title}
        </Text>
      )}
      {ListHeaderComponent}
    </>
  );

  if (horizontal) {
    return (
      <View style={[styles.horizontalContainer, containerStyle]}>
        {headerComponent}
        <FlatList
          data={restaurants}
          renderItem={renderRestaurant}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[
            styles.horizontalContentContainer,
            contentContainerStyle,
          ]}
          ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
        />
      </View>
    );
  }

  return (
    <FlatList
      data={restaurants}
      renderItem={renderRestaurant}
      keyExtractor={(item) => item.id}
      style={[styles.container, containerStyle]}
      contentContainerStyle={[
        styles.contentContainer,
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={renderSeparator}
      ListHeaderComponent={headerComponent}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={ListEmptyComponent || defaultEmptyComponent}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary[500]}
          />
        ) : undefined
      }
    />
  );
};

// Simple vertical list component
export const RestaurantVerticalList: React.FC<{
  restaurants: RestaurantData[];
  onRestaurantPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  containerStyle?: ViewStyle;
}> = ({ restaurants, onRestaurantPress, onFavoriteToggle, containerStyle }) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, containerStyle]}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {restaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.verticalCard}>
          <RestaurantCard
            restaurant={restaurant}
            onPress={onRestaurantPress}
            onFavoriteToggle={onFavoriteToggle}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingVertical: 16,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  horizontalContainer: {
    marginVertical: 16,
  },
  horizontalContentContainer: {
    paddingHorizontal: 16,
  },
  verticalCard: {
    paddingHorizontal: 16,
  },
  horizontalCard: {
    width: 280,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: '700',
  },
});