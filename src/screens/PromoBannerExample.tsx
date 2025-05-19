import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { PromoBanner, AnimatedPromoBanner } from '../components';
import { useTheme } from '../contexts';

export const PromoBannerExample: React.FC = () => {
  const { theme } = useTheme();

  const handlePromoPress = (promoType: string) => {
    Alert.alert('Promo Clicked', `You clicked on the ${promoType} promotion!`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Promotional Banners
        </Text>

        {/* Standard Promo Banner */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Standard Banner
          </Text>
          <PromoBanner
            headline="Get up to 40% OFF!"
            subtext="Limited time deals at your favorite restaurants in New York."
            buttonLabel="See Deals"
            onButtonPress={() => handlePromoPress('Standard')}
          />
        </View>

        {/* Animated Promo Banner */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated Banner (Fades in)
          </Text>
          <AnimatedPromoBanner
            headline="Free Delivery Today!"
            subtext="Order from participating restaurants and enjoy free delivery."
            buttonLabel="Order Now"
            onButtonPress={() => handlePromoPress('Free Delivery')}
            backgroundIcon="car-outline"
            colors={['#4ECDC4', '#44A08D']}
          />
        </View>

        {/* Custom Colors */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Custom Colors
          </Text>
          <PromoBanner
            headline="Exclusive VIP Access"
            subtext="Get early access to new restaurants and special events."
            buttonLabel="Join VIP"
            onButtonPress={() => handlePromoPress('VIP')}
            backgroundIcon="star-outline"
            colors={['#667EEA', '#764BA2']}
          />
        </View>

        {/* Different Icon */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Different Icon
          </Text>
          <PromoBanner
            headline="Weekend Special!"
            subtext="Double points on all orders this weekend only."
            buttonLabel="Learn More"
            onButtonPress={() => handlePromoPress('Weekend')}
            backgroundIcon="gift-outline"
            colors={['#F093FB', '#F5576C']}
          />
        </View>

        {/* Compact Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Different Dimensions
          </Text>
          <PromoBanner
            headline="Quick Lunch Deals"
            subtext="15% off lunch orders between 11-2pm"
            buttonLabel="View"
            onButtonPress={() => handlePromoPress('Lunch')}
            backgroundIcon="time-outline"
            containerStyle={{ minHeight: 140 }}
          />
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
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});