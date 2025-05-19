import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withSequence,
  withSpring,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { ProfileCard, ProfileCardProps } from './ProfileCard';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface AnimatedProfileCardProps extends ProfileCardProps {
  animationType?: 'fade' | 'scale' | 'glow';
  delay?: number;
}

// Animated profile card with various animation options
export const AnimatedProfileCard: React.FC<AnimatedProfileCardProps> = ({
  animationType = 'fade',
  delay = 0,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const glowProgress = useSharedValue(0);

  React.useEffect(() => {
    const animate = () => {
      switch (animationType) {
        case 'fade':
          opacity.value = withTiming(1, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 100,
          });
          break;
        
        case 'scale':
          opacity.value = withTiming(1, { duration: 400 });
          scale.value = withSequence(
            withTiming(1.1, { duration: 300 }),
            withSpring(1, {
              damping: 10,
              stiffness: 100,
            })
          );
          break;
        
        case 'glow':
          opacity.value = withTiming(1, { duration: 400 });
          scale.value = withSpring(1, {
            damping: 15,
            stiffness: 100,
          });
          // Continuous glow effect
          glowProgress.value = withRepeat(
            withSequence(
              withTiming(1, { duration: 2000 }),
              withTiming(0, { duration: 2000 })
            ),
            -1,
            false
          );
          break;
      }
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, [animationType, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const glowStyle = useAnimatedStyle(() => {
    const glowOpacity = interpolate(
      glowProgress.value,
      [0, 0.5, 1],
      [0, 0.3, 0]
    );
    
    const glowScale = interpolate(
      glowProgress.value,
      [0, 1],
      [1, 1.1]
    );

    return {
      opacity: glowOpacity,
      transform: [{ scale: glowScale }],
    };
  });

  if (animationType === 'glow') {
    return (
      <Animated.View style={animatedStyle}>
        <View style={styles.glowContainer}>
          <Animated.View style={[styles.glowEffect, glowStyle]}>
            <LinearGradient
              colors={['#4ECDC4', '#44A08D', '#4ECDC4']}
              style={styles.glowGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
          </Animated.View>
          <ProfileCard {...props} />
        </View>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <ProfileCard {...props} />
    </Animated.View>
  );
};

// Pulsing avatar border effect
export const PulsingProfileCard: React.FC<ProfileCardProps> = (props) => {
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.5);

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      false
    );

    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1000 }),
        withTiming(0.3, { duration: 1000 })
      ),
      -1,
      false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  return (
    <View style={styles.pulseContainer}>
      <Animated.View style={[styles.pulseBorder, pulseStyle]}>
        <LinearGradient
          colors={['#4ECDC4', '#44A08D']}
          style={styles.pulseGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>
      <ProfileCard {...props} />
    </View>
  );
};

// Success animation for profile updates
export const SuccessAnimatedProfileCard: React.FC<ProfileCardProps & {
  showSuccess?: boolean;
}> = ({ showSuccess = false, ...props }) => {
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);

  React.useEffect(() => {
    if (showSuccess) {
      checkOpacity.value = withTiming(1, { duration: 300 });
      checkScale.value = withSequence(
        withSpring(1.2, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 15, stiffness: 100 })
      );

      // Hide after 2 seconds
      setTimeout(() => {
        checkOpacity.value = withTiming(0, { duration: 300 });
        checkScale.value = withTiming(0, { duration: 300 });
      }, 2000);
    }
  }, [showSuccess]);

  const checkStyle = useAnimatedStyle(() => ({
    opacity: checkOpacity.value,
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <View style={styles.successContainer}>
      <ProfileCard {...props} />
      <Animated.View style={[styles.successCheck, checkStyle]}>
        <View style={styles.successIconContainer}>
          <Ionicons name="checkmark-circle" size={60} color="#10B981" />
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  glowContainer: {
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 30,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 30,
  },
  pulseContainer: {
    position: 'relative',
  },
  pulseBorder: {
    position: 'absolute',
    top: 12,
    left: '50%',
    marginLeft: -65,
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  pulseGradient: {
    flex: 1,
    borderRadius: 65,
  },
  successContainer: {
    position: 'relative',
  },
  successCheck: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -30,
  },
  successIconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
});