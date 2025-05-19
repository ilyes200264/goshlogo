import { ImageSourcePropType } from 'react-native';

export interface PromotionalTag {
  id?: string;
  type: 'discount' | 'new' | 'featured';
  label: string;
  text?: string;
  color?: string;
  backgroundColor?: string;
}

export interface RestaurantData {
  id: string;
  name: string;
  image?: ImageSourcePropType | string;
  imageUrl?: string; // Alternative to image
  rating: number;
  reviewCount?: number;
  isFavorite?: boolean;
  priceLevel?: number; // 1-4 ($-$$$$)
  price?: string; // Alternative representation
  cuisine?: string; // Single cuisine string
  cuisineTypes?: string[]; // Array of cuisines
  distance: string;
  deliveryTime?: string;
  deliveryFee?: number;
  minimumOrder?: number;
  promotions?: PromotionalTag[];
  promotionalTag?: PromotionalTag; // Single tag
}