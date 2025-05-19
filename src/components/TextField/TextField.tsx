import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts';

export type TextFieldVariant = 'default' | 'filled' | 'outlined';

interface TextFieldProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  error?: string;
  touched?: boolean;
  variant?: TextFieldVariant;
  containerStyle?: ViewStyle;
  required?: boolean;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  error,
  touched,
  variant = 'default',
  containerStyle,
  required = false,
  disabled = false,
  style,
  secureTextEntry,
  ...props
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const showError = touched && error;

  const containerStyles: ViewStyle[] = [
    styles.container,
    containerStyle,
  ];

  const inputContainerStyles: ViewStyle[] = [
    styles.inputContainer,
    {
      backgroundColor: theme.colors.background.secondary,
      borderRadius: theme.borderRadius.lg,
    },
  ];

  // Apply variant styles
  if (variant === 'outlined') {
    inputContainerStyles.push({
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.border.default,
    });
  } else if (variant === 'filled') {
    inputContainerStyles.push({
      backgroundColor: theme.colors.neutral[100],
    });
  }

  // Apply focus styles
  if (isFocused) {
    inputContainerStyles.push({
      borderWidth: 2,
      borderColor: theme.colors.primary[500],
    });
  }

  // Apply error styles
  if (showError) {
    inputContainerStyles.push({
      borderWidth: 1,
      borderColor: theme.colors.semantic.error,
    });
  }

  // Apply disabled styles
  if (disabled) {
    inputContainerStyles.push({
      opacity: 0.6,
      backgroundColor: theme.colors.neutral[50],
    });
  }

  const inputStyles = [
    styles.input,
    {
      color: theme.colors.text.primary,
      fontSize: theme.typography.fontSize.base,
    },
    icon && { paddingRight: 40 },
    style,
  ];

  const labelStyles = [
    styles.label,
    {
      color: theme.colors.primary[700],
      fontSize: theme.typography.fontSize.sm,
      fontWeight: '600',
    },
  ];

  if (showError) {
    labelStyles.push({ color: theme.colors.semantic.error });
  }

  return (
    <View style={containerStyles}>
      <View style={styles.labelContainer}>
        <Text style={labelStyles}>
          {label}
          {required && (
            <Text style={{ color: theme.colors.semantic.error }}> *</Text>
          )}
        </Text>
      </View>
      <View 
        style={[
          inputContainerStyles,
          Platform.select({
            ios: {
              shadowColor: theme.colors.neutral[900],
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3,
            },
            android: {
              elevation: 2,
            },
          }),
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={!disabled}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        {(icon || secureTextEntry) && (
          <View style={styles.iconContainer}>
            {secureTextEntry ? (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.passwordToggle}
              >
                <Ionicons
                  name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={
                    isFocused
                      ? theme.colors.primary[500]
                      : theme.colors.text.secondary
                  }
                />
              </TouchableOpacity>
            ) : (
              icon && (
                <Ionicons
                  name={icon}
                  size={20}
                  color={
                    isFocused
                      ? theme.colors.primary[500]
                      : theme.colors.text.secondary
                  }
                />
              )
            )}
          </View>
        )}
      </View>
      {showError && (
        <Text
          style={[
            styles.errorText,
            {
              color: theme.colors.semantic.error,
              fontSize: theme.typography.fontSize.xs,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    marginBottom: 8,
  },
  label: {
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    minHeight: 48,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 16,
    height: '100%',
    justifyContent: 'center',
  },
  errorText: {
    marginTop: 4,
    marginLeft: 4,
  },
  passwordToggle: {
    padding: 4,
  },
});