import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import { PromoBanner, PromoBannerProps } from './PromoBanner';

interface AnimatedPromoBannerProps extends PromoBannerProps {
  animationType?: 'fade' | 'slide' | 'scale' | 'bounce';
  delay?: number;
}

export const ReanimatedPromoBanner: React.FC<AnimatedPromoBannerProps> = ({
  animationType = 'fade',
  delay = 0,
  ...props
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const scale = useSharedValue(0.8);

  React.useEffect(() => {
    const animate = () => {
      switch (animationType) {
        case 'fade':
          opacity.value = withTiming(1, {
            duration: 600,
            easing: Easing.out(Easing.ease),
          });
          break;
        
        case 'slide':
          opacity.value = withTiming(1, { duration: 400 });
          translateY.value = withTiming(0, {
            duration: 600,
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
        
        case 'bounce':
          opacity.value = withTiming(1, { duration: 300 });
          translateY.value = withSequence(
            withTiming(-20, { duration: 300, easing: Easing.out(Easing.ease) }),
            withSpring(0, { damping: 8, stiffness: 100 })
          );
          scale.value = withSequence(
            withTiming(1.1, { duration: 200 }),
            withSpring(1, { damping: 10, stiffness: 100 })
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
      transform: [
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <PromoBanner {...props} />
    </Animated.View>
  );
};

// Gesture-based interactive animation
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export const InteractivePromoBanner: React.FC<PromoBannerProps> = (props) => {
  const pressed = useSharedValue(false);
  const scale = useSharedValue(1);

  const gesture = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
      scale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 400,
      });
    })
    .onFinalize(() => {
      pressed.value = false;
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 400,
      });
      runOnJS(props.onButtonPress)();
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <PromoBanner {...props} />
      </Animated.View>
    </GestureDetector>
  );
};