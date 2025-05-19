import React from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  TextInputProps, 
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

interface AnimatedTextFieldProps extends TextInputProps {
  label: string;
  error?: string;
  helperText?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  variant?: 'default' | 'outlined';
}

export const AnimatedTextField: React.FC<AnimatedTextFieldProps> = ({
  label,
  error,
  helperText,
  icon,
  containerStyle,
  variant = 'default',
  secureTextEntry,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(!secureTextEntry);
  
  const borderWidth = useSharedValue(1);
  const borderColor = useSharedValue(0);
  const labelPosition = useSharedValue(0);
  const labelScale = useSharedValue(1);

  const focusInput = () => {
    setIsFocused(true);
    borderWidth.value = withTiming(2, { duration: 200 });
    borderColor.value = withTiming(1, { duration: 200 });
    
    if (!props.value) {
      labelPosition.value = withSpring(-25);
      labelScale.value = withSpring(0.75);
    }
  };

  const blurInput = () => {
    setIsFocused(false);
    borderWidth.value = withTiming(1, { duration: 200 });
    borderColor.value = withTiming(0, { duration: 200 });
    
    if (!props.value) {
      labelPosition.value = withSpring(0);
      labelScale.value = withSpring(1);
    }
  };

  React.useEffect(() => {
    if (props.value) {
      labelPosition.value = withSpring(-25);
      labelScale.value = withSpring(0.75);
    }
  }, [props.value]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    const interpolatedBorderColor = interpolate(
      borderColor.value,
      [0, 1],
      [
        error ? theme.colors.danger[500] : theme.colors.border.default,
        error ? theme.colors.danger[500] : theme.colors.primary[500]
      ]
    );

    return {
      borderWidth: borderWidth.value,
      borderColor: interpolatedBorderColor,
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: labelPosition.value },
        { scale: labelScale.value },
      ],
    };
  });

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View 
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.background.secondary,
            borderRadius: theme.borderRadius.lg,
          },
          animatedContainerStyle,
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={isFocused ? theme.colors.primary[500] : theme.colors.text.secondary}
            style={styles.icon}
          />
        )}
        
        <View style={styles.inputWrapper}>
          <Animated.Text
            style={[
              styles.label,
              {
                color: isFocused ? theme.colors.primary[500] : theme.colors.text.secondary,
              },
              animatedLabelStyle,
            ]}
          >
            {label}
          </Animated.Text>
          
          <TextInput
            {...props}
            style={[
              styles.input,
              {
                color: theme.colors.text.primary,
                paddingTop: 20,
              },
            ]}
            onFocus={focusInput}
            onBlur={blurInput}
            placeholderTextColor={theme.colors.text.tertiary}
            secureTextEntry={secureTextEntry && !showPassword}
          />
        </View>

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color={theme.colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </Animated.View>

      {error && (
        <Text style={[styles.errorText, { color: theme.colors.danger[500] }]}>
          {error}
        </Text>
      )}
      
      {helperText && !error && (
        <Text style={[styles.helperText, { color: theme.colors.text.secondary }]}>
          {helperText}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    minHeight: 56,
    position: 'relative',
  },
  icon: {
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    top: 17,
    left: 0,
    fontSize: 16,
    backgroundColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  eyeIcon: {
    marginLeft: 12,
  },
  errorText: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 12,
  },
  helperText: {
    marginTop: 4,
    marginLeft: 16,
    fontSize: 12,
  },
});