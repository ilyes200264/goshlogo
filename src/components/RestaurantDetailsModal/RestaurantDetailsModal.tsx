import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';
import { RestaurantData } from '../RestaurantCard/types';
import { BlurView } from 'expo-blur';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HEADER_HEIGHT = Platform.OS === 'ios' ? 100 : 80;
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.45;

interface RestaurantDetailsModalProps {
  visible: boolean;
  restaurant: RestaurantData | null;
  onClose: () => void;
  onFavoriteToggle?: (restaurant: RestaurantData) => void;
}

export const RestaurantDetailsModal: React.FC<RestaurantDetailsModalProps> = ({
  visible,
  restaurant,
  onClose,
  onFavoriteToggle,
}) => {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);

  useEffect(() => {
    if (visible && restaurant) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          bounciness: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, restaurant]);

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200, 250],
    outputRange: [0, 0, 1],
  });


  if (!restaurant) return null;

  const renderHeader = () => (
    <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
      <BlurView intensity={95} tint="light" style={styles.headerBlur}>
        <SafeAreaView style={styles.headerContent}>
          <TouchableOpacity onPress={onClose} style={styles.headerButton}>
            <View style={styles.iconCircle}>
              <Ionicons name="arrow-back" size={20} color="#333" />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle} numberOfLines={1}>
            {restaurant.name}
          </Text>
          
          <TouchableOpacity 
            onPress={() => onFavoriteToggle?.(restaurant)} 
            style={styles.headerButton}
          >
            <View style={[styles.iconCircle, restaurant.isFavorite && styles.favoriteActive]}>
              <Ionicons
                name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={restaurant.isFavorite ? '#FFFFFF' : '#333'}
              />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </BlurView>
    </Animated.View>
  );

  const renderFloatingButtons = () => (
    <>
      <TouchableOpacity 
        style={[styles.floatingButton, styles.backButton]}
        onPress={onClose}
      >
        <View style={styles.floatingButtonInner}>
          <Ionicons name="arrow-back" size={22} color="#333" />
        </View>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.floatingButton, styles.favoriteFloatingButton]}
        onPress={() => onFavoriteToggle?.(restaurant)}
      >
        <View style={[
          styles.floatingButtonInner,
          restaurant.isFavorite && styles.favoriteActiveFloating
        ]}>
          <Ionicons
            name={restaurant.isFavorite ? 'heart' : 'heart-outline'}
            size={22}
            color={restaurant.isFavorite ? '#FFFFFF' : '#333'}
          />
        </View>
      </TouchableOpacity>
    </>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <StatusBar hidden={visible} />
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {renderHeader()}
        
        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { 
              useNativeDriver: true,
              listener: (event: any) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                setIsHeaderVisible(offsetY > 200);
              },
            }
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.imageContainer}>
            <Image
              source={
                typeof restaurant.image === 'string'
                  ? { uri: restaurant.image }
                  : restaurant.image
              }
              style={styles.image}
            />
            <View style={styles.imageOverlay} />
          </View>

          <View style={styles.contentContainer}>
            <View style={styles.mainInfoCard}>
              <View style={styles.titleRow}>
                <View style={styles.titleSection}>
                  <Text style={styles.restaurantName}>{restaurant.name}</Text>
                  {restaurant.cuisineTypes && restaurant.cuisineTypes.length > 0 && (
                    <View style={styles.cuisineContainer}>
                      {restaurant.cuisineTypes.map((cuisine, index) => (
                        <View key={index} style={styles.cuisineTag}>
                          <Text style={styles.cuisineText}>{cuisine}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                
                {restaurant.priceLevel && (
                  <View style={styles.priceIndicator}>
                    <Text style={styles.priceText}>
                      {'$'.repeat(restaurant.priceLevel)}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Ionicons name="star" size={18} color="#FFB800" />
                  <Text style={styles.statValue}>{restaurant.rating}</Text>
                  {restaurant.reviewCount && (
                    <Text style={styles.statLabel}>({restaurant.reviewCount})</Text>
                  )}
                </View>
                
                {restaurant.deliveryTime && (
                  <>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                      <Ionicons name="time-outline" size={18} color="#007AFF" />
                      <Text style={styles.statValue}>{restaurant.deliveryTime}</Text>
                    </View>
                  </>
                )}
                
                <View style={styles.statDivider} />
                
                <View style={styles.statItem}>
                  <Ionicons name="location-outline" size={18} color="#34C759" />
                  <Text style={styles.statValue}>{restaurant.distance}</Text>
                </View>
              </View>
            </View>

            {restaurant.promotions && restaurant.promotions.length > 0 && (
              <View style={styles.promotionsSection}>
                <Text style={styles.sectionTitle}>Special Offers</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.promotionsScroll}
                >
                  {restaurant.promotions.map((promo) => (
                    <View
                      key={promo.id}
                      style={[
                        styles.promoCard,
                        { backgroundColor: promo.backgroundColor },
                      ]}
                    >
                      <MaterialIcons name="local-offer" size={16} color={promo.color} />
                      <Text style={[styles.promoText, { color: promo.color }]}>
                        {promo.text}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            <View style={styles.deliveryInfoSection}>
              <Text style={styles.sectionTitle}>Delivery Information</Text>
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryRow}>
                  <View style={styles.deliveryItem}>
                    <MaterialIcons name="delivery-dining" size={24} color="#007AFF" />
                    <Text style={styles.deliveryLabel}>Delivery Fee</Text>
                    <Text style={styles.deliveryValue}>
                      ${restaurant.deliveryFee?.toFixed(2) || '0.00'}
                    </Text>
                  </View>
                  
                  <View style={styles.deliveryDivider} />
                  
                  <View style={styles.deliveryItem}>
                    <MaterialIcons name="shopping-cart" size={24} color="#34C759" />
                    <Text style={styles.deliveryLabel}>Minimum Order</Text>
                    <Text style={styles.deliveryValue}>
                      ${restaurant.minimumOrder?.toFixed(2) || '10.00'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.actionSection}>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>View Menu</Text>
                <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              
              <View style={styles.secondaryButtons}>
                <TouchableOpacity style={styles.secondaryButton}>
                  <Ionicons name="call-outline" size={22} color="#007AFF" />
                  <Text style={styles.secondaryButtonText}>Call</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryButton}>
                  <Ionicons name="navigate-outline" size={22} color="#007AFF" />
                  <Text style={styles.secondaryButtonText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Animated.ScrollView>
        
        {!isHeaderVisible && renderFloatingButtons()}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: HEADER_HEIGHT,
  },
  headerBlur: {
    flex: 1,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  headerButton: {
    padding: 4,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteActive: {
    backgroundColor: '#FF4757',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 100,
  },
  backButton: {
    top: 50,
    left: 16,
  },
  favoriteFloatingButton: {
    top: 50,
    right: 16,
  },
  floatingButtonInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  favoriteActiveFloating: {
    backgroundColor: '#FF4757',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    width: SCREEN_WIDTH,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
    paddingTop: 32,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  mainInfoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flex: 1,
    marginRight: 16,
  },
  restaurantName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  cuisineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cuisineTag: {
    backgroundColor: '#F0F0F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cuisineText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  priceIndicator: {
    backgroundColor: '#F0F0F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F5',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 14,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#F0F0F5',
  },
  promotionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  promotionsScroll: {
    paddingRight: 20,
  },
  promoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    gap: 8,
  },
  promoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryInfoSection: {
    marginBottom: 24,
  },
  deliveryCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    padding: 20,
  },
  deliveryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  deliveryItem: {
    alignItems: 'center',
    gap: 8,
  },
  deliveryLabel: {
    fontSize: 14,
    color: '#666',
  },
  deliveryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  deliveryDivider: {
    width: 1,
    height: 60,
    backgroundColor: '#E5E5E5',
  },
  actionSection: {
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: '#F0F0F5',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '500',
  },
});