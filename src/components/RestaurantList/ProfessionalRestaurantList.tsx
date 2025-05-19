import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ViewStyle,
  Text,
  RefreshControl,
} from 'react-native';
import { ProfessionalRestaurantCard } from '../RestaurantCard';
import { RestaurantData } from '../RestaurantCard/types';
import { useTheme } from '../../contexts';

interface ProfessionalRestaurantListProps {
  restaurants: RestaurantData[];
  onRestaurantPress?: (restaurant: RestaurantData) => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
  variant?: 'default' | 'compact' | 'horizontal';
  showHeader?: boolean;
  title?: string;
  ListHeaderComponent?: React.ReactElement;
  ListFooterComponent?: React.ReactElement;
  ListEmptyComponent?: React.ReactElement;
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export const ProfessionalRestaurantList: React.FC<ProfessionalRestaurantListProps> = ({
  restaurants,
  onRestaurantPress,
  onFavoriteToggle,
  variant = 'default',
  showHeader = true,
  title,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  containerStyle,
  contentContainerStyle,
  refreshing = false,
  onRefresh,
}) => {
  const { theme } = useTheme();

  const renderRestaurant = ({ item }: { item: RestaurantData }) => (
    <ProfessionalRestaurantCard
      restaurant={item}
      onPress={onRestaurantPress}
      onFavoriteToggle={onFavoriteToggle}
      variant={variant}
    />
  );

  const defaultEmptyComponent = (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, { color: theme.colors.text.secondary }]}>
        No restaurants found
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.colors.text.tertiary }]}>
        Try adjusting your filters or search criteria
      </Text>
    </View>
  );

  const headerComponent = (
    <>
      {showHeader && title && (
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {title}
          </Text>
          <Text style={[styles.count, { color: theme.colors.text.secondary }]}>
            {restaurants.length} restaurants
          </Text>
        </View>
      )}
      {ListHeaderComponent}
    </>
  );

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
            colors={[theme.colors.primary[500]]}
          />
        ) : undefined
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  count: {
    fontSize: 14,
    fontWeight: '400',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
  },
});