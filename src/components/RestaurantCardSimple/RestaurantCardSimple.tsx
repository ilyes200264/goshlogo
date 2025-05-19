import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface RestaurantCardSimpleProps {
  name: string;
  rating: number;
  cuisineTypes: string[];
  distance: string;
  deliveryTime: string;
  imageUrl?: string;
  onPress?: () => void;
}

export const RestaurantCardSimple: React.FC<RestaurantCardSimpleProps> = ({
  name,
  rating,
  cuisineTypes,
  distance,
  deliveryTime,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <Image
        source={{ uri: imageUrl || 'https://via.placeholder.com/300x200' }}
        style={styles.image}
      />
      
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={14} color="#FFA500" />
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.restaurantName}>{name}</Text>
        <Text style={styles.cuisineTypes}>{cuisineTypes.join(' • ')}</Text>
        
        <View style={styles.deliveryInfo}>
          <View style={styles.deliveryItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>{deliveryTime}</Text>
          </View>
          <View style={styles.deliveryItem}>
            <Ionicons name="location-outline" size={14} color="#666" />
            <Text style={styles.deliveryText}>{distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  ratingText: {
    fontWeight: '600',
    fontSize: 14,
  },
  cardBody: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  cuisineTypes: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  deliveryInfo: {
    flexDirection: 'row',
    gap: 16,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryText: {
    fontSize: 12,
    color: '#666',
  },
});