import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  Keyboard,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ProfessionalSearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmitEditing?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  containerStyle?: ViewStyle;
  autoFocus?: boolean;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export const ProfessionalSearchInput: React.FC<ProfessionalSearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search',
  onClear,
  onSubmitEditing,
  onFocus,
  onBlur,
  containerStyle,
  autoFocus = false,
  leftIcon = 'search',
  rightIcon,
  onRightIconPress,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  
  // Animation values
  const focusAnimation = useSharedValue(0);
  const clearButtonOpacity = useSharedValue(0);

  const handleFocus = () => {
    setIsFocused(true);
    focusAnimation.value = withTiming(1, { duration: 200 });
    if (onFocus) onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    focusAnimation.value = withTiming(0, { duration: 200 });
    if (onBlur) onBlur();
  };

  const handleClear = () => {
    if (onClear) {
      runOnJS(onClear)();
    } else {
      onChangeText('');
    }
  };

  React.useEffect(() => {
    clearButtonOpacity.value = withTiming(value.length > 0 ? 1 : 0, { duration: 150 });
  }, [value]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolate(
      focusAnimation.value,
      [0, 1],
      [0, 1]
    );

    return {
      borderColor: borderColor === 1 
        ? theme.colors.text.primary 
        : theme.colors.border.light,
    };
  });

  const animatedClearButtonStyle = useAnimatedStyle(() => ({
    opacity: clearButtonOpacity.value,
    transform: [{ scale: clearButtonOpacity.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background.secondary,
          borderColor: theme.colors.border.light,
        },
        containerStyle,
        animatedContainerStyle,
      ]}
    >
      <Ionicons
        name={leftIcon}
        size={20}
        color={isFocused ? theme.colors.text.primary : theme.colors.text.tertiary}
        style={styles.leftIcon}
      />

      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text.tertiary}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        autoFocus={autoFocus}
        autoCorrect={false}
        autoCapitalize="none"
        style={[
          styles.input,
          {
            color: theme.colors.text.primary,
          },
        ]}
      />

      {value.length > 0 && (
        <Animated.View style={[styles.clearButton, animatedClearButtonStyle]}>
          <TouchableOpacity
            onPress={handleClear}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name="close"
              size={18}
              color={theme.colors.text.tertiary}
            />
          </TouchableOpacity>
        </Animated.View>
      )}

      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={styles.rightIcon}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={rightIcon}
            size={20}
            color={theme.colors.text.secondary}
          />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '400',
    paddingVertical: 0,
  },
  clearButton: {
    padding: 4,
  },
  rightIcon: {
    marginLeft: 8,
    padding: 4,
  },
});