import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacityProps,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../../contexts';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  icon,
  iconPosition = 'left',
  style,
  disabled,
  ...props
}) => {
  const { theme } = useTheme();

  const buttonStyles: ViewStyle[] = [
    styles.base,
    {
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.sm,
    },
  ];

  const textStyles: TextStyle[] = [styles.text];

  // Size styles
  switch (size) {
    case 'sm':
      buttonStyles.push({
        paddingVertical: theme.spacing[2],
        paddingHorizontal: theme.spacing[3],
      });
      textStyles.push({
        fontSize: theme.typography.fontSize.sm,
        lineHeight: theme.typography.lineHeight.sm,
      });
      break;
    case 'lg':
      buttonStyles.push({
        paddingVertical: theme.spacing[4],
        paddingHorizontal: theme.spacing[6],
      });
      textStyles.push({
        fontSize: theme.typography.fontSize.lg,
        lineHeight: theme.typography.lineHeight.lg,
      });
      break;
    default:
      buttonStyles.push({
        paddingVertical: theme.spacing[3],
        paddingHorizontal: theme.spacing[5],
      });
      textStyles.push({
        fontSize: theme.typography.fontSize.base,
        lineHeight: theme.typography.lineHeight.base,
      });
  }

  // Variant styles
  switch (variant) {
    case 'primary':
      buttonStyles.push({
        backgroundColor: theme.colors.primary[500],
      });
      textStyles.push({
        color: theme.colors.text.inverse,
      });
      break;
    case 'secondary':
      buttonStyles.push({
        backgroundColor: theme.colors.secondary[500],
      });
      textStyles.push({
        color: theme.colors.text.inverse,
      });
      break;
    case 'outline':
      buttonStyles.push({
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary[500],
      });
      textStyles.push({
        color: theme.colors.primary[500],
      });
      break;
    case 'ghost':
      buttonStyles.push({
        backgroundColor: 'transparent',
      });
      textStyles.push({
        color: theme.colors.primary[500],
      });
      break;
    case 'danger':
      buttonStyles.push({
        backgroundColor: theme.colors.semantic.error,
      });
      textStyles.push({
        color: theme.colors.text.inverse,
      });
      break;
  }

  if (fullWidth) {
    buttonStyles.push({ width: '100%' });
  }

  if (disabled || loading) {
    buttonStyles.push({
      opacity: 0.6,
    });
  }

  const renderContent = () => {
    if (loading) {
      return <ActivityIndicator color={textStyles[1].color} />;
    }

    const textElement = <Text style={textStyles}>{children}</Text>;

    if (!icon) {
      return textElement;
    }

    return (
      <>
        {iconPosition === 'left' && icon}
        {textElement}
        {iconPosition === 'right' && icon}
      </>
    );
  };

  return (
    <TouchableOpacity
      style={[buttonStyles, style]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    fontWeight: '600',
  },
});
