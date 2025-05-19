import React from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { 
  ExploreNearbyCard, 
  ExploreNearbyCardSolid,
  AnimatedExploreNearbyCard,
  InteractiveExploreNearbyCard,
} from '../components';
import { useTheme } from '../contexts';

// Sample map images - you would use your own assets
const mapImages = {
  default: require('../assets/images/map-illustration.png'),
  satellite: require('../assets/images/map-satellite.png'),
  dark: require('../assets/images/map-dark.png'),
};

export const ExploreNearbyExample: React.FC = () => {
  const { theme } = useTheme();

  const handleUseLocation = () => {
    Alert.alert('Location', 'Using your current location...');
  };

  const handleOpenMap = () => {
    Alert.alert('Map', 'Opening map view...');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Explore Nearby Cards
        </Text>

        {/* Standard Card with Gradient */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Standard with Gradient Overlay
          </Text>
          <ExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
          />
        </View>

        {/* Solid Overlay Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Solid Overlay Version
          </Text>
          <ExploreNearbyCardSolid
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
          />
        </View>

        {/* Animated Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated (Fade In)
          </Text>
          <AnimatedExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1577086664693-894d8405334a?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
            animationType="fade"
          />
        </View>

        {/* Scale Animation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Scale Animation
          </Text>
          <AnimatedExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1517519014922-8fc06b814a0e?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
            animationType="scale"
            delay={300}
          />
        </View>

        {/* Custom Content */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Custom Content
          </Text>
          <ExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1519998570045-f3c6a9c5f9d8?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
            headline="Discover Events"
            subtext="Find concerts, festivals, and more happening near you"
          />
        </View>

        {/* Interactive Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Interactive (Press Effect)
          </Text>
          <InteractiveExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1502920514313-52581002a659?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
            headline="Explore Cities"
            subtext="Discover new places in your city"
          />
        </View>

        {/* Compact Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Compact Size
          </Text>
          <ExploreNearbyCard
            backgroundImage={{ uri: 'https://images.unsplash.com/photo-1524634126442-357e0eac3c14?w=800&h=600&fit=crop' }}
            onUseLocation={handleUseLocation}
            onOpenMap={handleOpenMap}
            containerStyle={{ height: 180 }}
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