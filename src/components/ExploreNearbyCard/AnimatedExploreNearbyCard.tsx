import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
  Easing,
} from 'react-native-reanimated';
import { TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { ExploreNearbyCard, ExploreNearbyCardProps } from './ExploreNearbyCard';
import { StyleSheet } from 'react-native';

interface AnimatedExploreNearbyCardProps extends ExploreNearbyCardProps {
  animationType?: 'fade' | 'scale' | 'parallax';
  delay?: number;
}

export const AnimatedExploreNearbyCard: React.FC<AnimatedExploreNearbyCardProps> = ({
  animationType = 'fade',
  delay = 0,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);
  const translateY = useSharedValue(30);

  React.useEffect(() => {
    const animate = () => {
      switch (animationType) {
        case 'fade':
          opacity.value = withTiming(1, {
            duration: 800,
            easing: Easing.out(Easing.ease),
          });
          translateY.value = withTiming(0, {
            duration: 800,
            easing: Easing.out(Easing.cubic),
          });
          break;
        
        case 'scale':
          opacity.value = withTiming(1, { duration: 300 });
          scale.value = withSpring(1, {
            damping: 12,
            stiffness: 100,
          });
          break;
        
        case 'parallax':
          opacity.value = withTiming(1, { duration: 600 });
          translateY.value = withTiming(0, {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
          });
          scale.value = withTiming(1, {
            duration: 1000,
            easing: Easing.out(Easing.cubic),
          });
          break;
      }
    };

    const timeout = setTimeout(animate, delay);
    return () => clearTimeout(timeout);
  }, [animationType, delay]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <ExploreNearbyCard {...props} />
    </Animated.View>
  );
};

// Interactive version with press animations
export const InteractiveExploreNearbyCard: React.FC<ExploreNearbyCardProps> = (props) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const gestureHandler = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onStart: () => {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 400,
      });
      opacity.value = withTiming(0.9, { duration: 100 });
    },
    onEnd: () => {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 400,
      });
      opacity.value = withTiming(1, { duration: 100 });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <TapGestureHandler onHandlerStateChange={gestureHandler}>
      <Animated.View style={animatedStyle}>
        <ExploreNearbyCard {...props} />
      </Animated.View>
    </TapGestureHandler>
  );
};

// Parallax scroll effect component
export const ParallaxExploreNearbyCard: React.FC<ExploreNearbyCardProps & {
  scrollY: Animated.SharedValue<number>;
  index: number;
}> = ({ scrollY, index, ...props }) => {
  const animatedStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * 300, index * 300, (index + 1) * 300];
    
    const translateY = interpolate(
      scrollY.value,
      inputRange,
      [0, 0, -50],
      Extrapolate.CLAMP
    );
    
    const scale = interpolate(
      scrollY.value,
      inputRange,
      [0.95, 1, 0.95],
      Extrapolate.CLAMP
    );
    
    const opacity = interpolate(
      scrollY.value,
      inputRange,
      [0.7, 1, 0.7],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        { translateY },
        { scale },
      ],
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.parallaxContainer, animatedStyle]}>
      <ExploreNearbyCard {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  parallaxContainer: {
    marginVertical: 10,
  },
});