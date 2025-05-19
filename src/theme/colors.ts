// Custom Color Palette
const CustomColors = {
  lightBlue: '#5BC4DB',
  darkTeal: '#016167',
  orange: '#FF6233',
  lightGreen: '#B2FD9D',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  }
};

// Generate color shades
const generateShades = (baseColor: string) => {
  // This is a simplified version - in production you'd want to use a proper color manipulation library
  return {
    50: baseColor + '1A', // 10% opacity
    100: baseColor + '33', // 20% opacity
    200: baseColor + '4D', // 30% opacity
    300: baseColor + '66', // 40% opacity
    400: baseColor + '80', // 50% opacity
    500: baseColor, // 100% opacity
    600: baseColor + 'E6', // 90% opacity with darker tone
    700: baseColor + 'CC', // 80% opacity with darker tone
    800: baseColor + 'B3', // 70% opacity with darker tone
    900: baseColor + '99', // 60% opacity with darker tone
  };
};

export const Colors = {
  // Primary color - Light Blue
  primary: {
    50: '#E6F7FA',
    100: '#C2EEF5',
    200: '#9AE4EF',
    300: '#72DAE9',
    400: '#4FD1E2',
    500: '#5BC4DB', // Main color
    600: '#4BB4CB',
    700: '#3CA4BB',
    800: '#2C94AB',
    900: '#1C849B',
  },
  // Secondary color - Dark Teal
  secondary: {
    50: '#E6F0F0',
    100: '#C2DADA',
    200: '#99C4C5',
    300: '#70AEAF',
    400: '#479899',
    500: '#016167', // Main color
    600: '#015157',
    700: '#014147',
    800: '#013137',
    900: '#012127',
  },
  // Accent color - Orange
  accent: {
    50: '#FFF0EC',
    100: '#FFDDD4',
    200: '#FFC8BB',
    300: '#FFB3A2',
    400: '#FF9E89',
    500: '#FF6233', // Main color
    600: '#E55629',
    700: '#CC4A1F',
    800: '#B23E15',
    900: '#99320B',
  },
  // Success color - Light Green
  success: {
    50: '#F0FDF6',
    100: '#DEFAEB',
    200: '#C9F7DD',
    300: '#B4F4CF',
    400: '#B2FD9D', // Main color
    500: '#A0F18B',
    600: '#8EE579',
    700: '#7CD967',
    800: '#6ACD55',
    900: '#58C143',
  },
  // Additional semantic colors
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  info: {
    ...generateShades('#5BC4DB'), // Using primary light blue for info
  },
  // Neutral colors
  neutral: CustomColors.gray,
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFB',
    tertiary: '#F1F5F9',
    // Custom backgrounds using the palette
    accent: '#FFF0EC', // Light shade of orange
    success: '#F0FDF6', // Light shade of green
    teal: '#E6F0F0', // Light shade of teal
  },
  // Text colors
  text: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
    // Using custom colors for specific text
    accent: CustomColors.orange,
    success: CustomColors.lightGreen,
    teal: CustomColors.darkTeal,
    blue: CustomColors.lightBlue,
  },
  // Border colors
  border: {
    default: '#E2E8F0',
    focus: CustomColors.lightBlue,
    accent: CustomColors.orange,
    success: CustomColors.lightGreen,
  },
  // Raw color values for direct access
  raw: {
    lightBlue: CustomColors.lightBlue,
    darkTeal: CustomColors.darkTeal,
    orange: CustomColors.orange,
    lightGreen: CustomColors.lightGreen,
  }
} as const;

export type ColorsType = typeof Colors;