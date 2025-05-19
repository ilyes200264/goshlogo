import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Switch,
} from 'react-native';
import { 
  ProfileCard, 
  AnimatedProfileCard,
  PulsingProfileCard,
  SuccessAnimatedProfileCard,
} from '../components';
import { useTheme } from '../contexts';

export const ProfileCardExample: React.FC = () => {
  const { theme } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  const handleEditPhoto = () => {
    Alert.alert('Edit Photo', 'Opening camera or photo library...');
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Opening profile editor...');
  };

  const handleUpdate = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>
          Profile Card Examples
        </Text>

        {/* Standard Profile Card */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Standard Profile Card
          </Text>
          <ProfileCard
            avatarUri="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Sarah Miller"
            subtitle="Food Explorer • Midtown"
            isPremium={isPremium}
            isVerified={isVerified}
            onEditProfile={handleEditProfile}
          />
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, { color: theme.colors.text.primary }]}>
              Premium Badge
            </Text>
            <Switch
              value={isPremium}
              onValueChange={setIsPremium}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isPremium ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
          <View style={styles.controlRow}>
            <Text style={[styles.controlLabel, { color: theme.colors.text.primary }]}>
              Verified Badge
            </Text>
            <Switch
              value={isVerified}
              onValueChange={setIsVerified}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isVerified ? '#f5dd4b' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Animated Fade In */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Animated (Fade In)
          </Text>
          <AnimatedProfileCard
            avatarUri="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="John Doe"
            subtitle="Chef • Brooklyn"
            isPremium={true}
            isVerified={false}
            onEditProfile={handleEditProfile}
            animationType="fade"
          />
        </View>

        {/* Scale Animation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Scale Animation
          </Text>
          <AnimatedProfileCard
            avatarUri="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Emma Wilson"
            subtitle="Food Critic • Manhattan"
            isPremium={false}
            isVerified={true}
            onEditProfile={handleEditProfile}
            animationType="scale"
            delay={300}
          />
        </View>

        {/* Glowing Animation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Glowing Effect
          </Text>
          <AnimatedProfileCard
            avatarUri="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Michael Chen"
            subtitle="Restaurant Owner • Queens"
            isPremium={true}
            isVerified={true}
            onEditProfile={handleEditProfile}
            animationType="glow"
          />
        </View>

        {/* Pulsing Avatar */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Pulsing Avatar Border
          </Text>
          <PulsingProfileCard
            avatarUri="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Alex Johnson"
            subtitle="Food Blogger • SoHo"
            isPremium={true}
            isVerified={true}
            onEditProfile={handleEditProfile}
          />
        </View>

        {/* Success Animation */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Success Animation (Click Edit)
          </Text>
          <SuccessAnimatedProfileCard
            avatarUri="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Lisa Anderson"
            subtitle="Home Cook • Upper East"
            isPremium={false}
            isVerified={false}
            onEditProfile={handleUpdate}
            showSuccess={showSuccess}
          />
        </View>

        {/* Compact Version */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text.secondary }]}>
            Compact Version
          </Text>
          <ProfileCard
            avatarUri="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
            onEditPhoto={handleEditPhoto}
            name="Tom Wilson"
            subtitle="Foodie • Downtown"
            isPremium={true}
            isVerified={true}
            onEditProfile={handleEditProfile}
            containerStyle={{ padding: 16 }}
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
  controls: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});