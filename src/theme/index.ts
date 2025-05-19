import { Colors } from './colors';
import { Typography } from './typography';
import { Spacing } from './spacing';

export const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  borderRadius: {
    none: 0,
    sm: 2,
    default: 4,
    md: 6,
    lg: 8,
    xl: 12,
    '2xl': 16,
    '3xl': 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    },
  },
} as const;

export type ThemeType = typeof theme;
