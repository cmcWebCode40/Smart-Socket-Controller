import {Text, TextProps, StyleSheet} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {fontPixel} from '@/libs/utils';

type Heading = 'h1' | 'h2';
type Body = 'b1' | 'b2';

interface TypographyProps extends TextProps {
  variant?: Heading | Body;
}

export const Typography: React.FunctionComponent<TypographyProps> = ({
  variant = 'h2',
  style,
  ...otherTextProps
}) => {
  const otherStyles = useThemedStyles(styles);

  return <Text style={[otherStyles[variant], style]} {...otherTextProps} />;
};

const styles = ({colors, fontSize, fonts}: Theme) => {
  return StyleSheet.create({
    h1: {
      fontSize: fontPixel(fontSize.xxl),
      fontWeight: '700',
      fontFamily: fonts.ManropeBold,
      color: colors.black[100],
    },
    h2: {
      fontSize: fontPixel(fontSize.xl),
      fontWeight: '500',
      color: colors.black[100],
      fontFamily: fonts.ManropeSemibold,
    },
    b1: {
      fontSize: fontPixel(fontSize.l),
      fontWeight: '400',
      color: colors.gray[300],
      fontFamily: fonts.ManropeRegular,
    },
    b2: {
      fontSize: fontPixel(fontSize.m),
      fontWeight: '400',
      color: colors.gray[300],
      fontFamily: fonts.ManropeLight,
    },
  });
};
