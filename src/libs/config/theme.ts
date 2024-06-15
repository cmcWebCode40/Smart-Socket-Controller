import {colors} from '../constants';

export const theme = {
  colors,
  fonts: {
    ManropeBold: 'Manrope-Bold',
    ManropeLight: 'Manrope-Light',
    ManropeRegular: 'Manrope-Regular',
    ManropeSemibold: 'Manrope-Semibold',
    ManropeExtraBold: 'Manrope-ExtraBold',
    ManropeExtraLight: 'Manrope-ExtraLight',
  },
  spacing: {
    xs: 4,
    sm: 8,
    m: 16,
    lg: 24,
    xl: 36,
    xxl: 40,
  },
  fontSize: {
    s: 12,
    m: 14,
    l: 16,
    xl: 20,
    xxl: 28,
    xxxl: 36,
  },
  radius: {
    none: 0,
    sm: 2,
    rounded: 4,
    md: 6,
    lg: 8,
    xl: 12,
    xxl: 16,
    xxxl: 24,
    full: 9999,
  },
};

export type Theme = typeof theme;
