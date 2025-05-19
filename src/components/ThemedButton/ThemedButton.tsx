import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../contexts';

export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ThemedButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  fullWidth?: boolean;
  textStyle?: TextStyle;
}

export const ThemedButton: React.FC<ThemedButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  fullWidth = false,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const getButtonColors = () => {
    switch (variant) {
      case 'primary':
        return {
          background: theme.colors.primary[500],
          text: theme.colors.text.inverse,
          disabled: theme.colors.primary[200],
        };
      case 'secondary':
        return {
          background: theme.colors.secondary[500],
          text: theme.colors.text.inverse,
          disabled: theme.colors.secondary[200],
        };
      case 'accent':
        return {
          background: theme.colors.accent[500],
          text: theme.colors.text.inverse,
          disabled: theme.colors.accent[200],
        };
      case 'success':
        return {
          background: theme.colors.success[400],
          text: theme.colors.secondary[800],
          disabled: theme.colors.success[200],
        };
      case 'outline':
        return {
          background: 'transparent',
          text: theme.colors.primary[500],
          disabled: theme.colors.neutral[300],
          border: theme.colors.primary[500],
        };
      default:
        return {
          background: theme.colors.primary[500],
          text: theme.colors.text.inverse,
          disabled: theme.colors.primary[200],
        };
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 8,
          paddingHorizontal: 16,
          fontSize: 14,
        };
      case 'large':
        return {
          paddingVertical: 16,
          paddingHorizontal: 32,
          fontSize: 18,
        };
      default:
        return {
          paddingVertical: 12,
          paddingHorizontal: 24,
          fontSize: 16,
        };
    }
  };

  const colors = getButtonColors();
  const sizes = getButtonSize();

  const buttonStyle: ViewStyle[] = [
    styles.button,
    {
      backgroundColor: disabled ? colors.disabled : colors.background,
      paddingVertical: sizes.paddingVertical,
      paddingHorizontal: sizes.paddingHorizontal,
    },
    variant === 'outline' && {
      borderWidth: 2,
      borderColor: disabled ? colors.disabled : colors.border,
    },
    fullWidth && styles.fullWidth,
    style as ViewStyle,
  ];

  const textStyles: TextStyle[] = [
    styles.text,
    {
      color: disabled ? theme.colors.text.secondary : colors.text,
      fontSize: sizes.fontSize,
    },
    variant === 'outline' && {
      color: disabled ? colors.disabled : colors.border,
    },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyle}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={textStyles}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: '600',
  },
});