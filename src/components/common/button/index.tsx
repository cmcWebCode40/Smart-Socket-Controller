import {
  Pressable,
  StyleSheet,
  PressableProps,
  TextStyle,
  View,
  StyleProp,
  ViewStyle,
  Platform,
} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {Typography} from '../typography';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';

type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'outlined' | 'contained' | 'text';

interface ButtonProps extends PressableProps {
  noStyles?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  textStyles?: TextStyle;
  children: React.ReactNode;
  prefixIcon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Button: React.FunctionComponent<ButtonProps> = ({
  style,
  prefixIcon,
  size = 'md',
  variant = 'contained',
  textStyles,
  disabled,
  noStyles,
  children,
  ...otherPressableProps
}) => {
  const baseStyle = useThemedStyles(styles);

  const baseTextStyle = {
    outlined: baseStyle.outLineText,
    contained: baseStyle.containedText,
    text: baseStyle.textTypography,
  };

  const sizeStyle = {
    sm: baseStyle.sm,
    md: baseStyle.md,
    lg: baseStyle.lg,
  };

  const buttonStyles = {
    outlined: baseStyle.outlined,
    contained: baseStyle.contained,
    text: baseStyle.text,
  };

  const mainButtonStyles = ({pressed}: {pressed: boolean}) => [
    baseStyle.button,
    buttonStyles[variant],
    sizeStyle[size],
    pressed && baseStyle.buttonPressed,
    disabled && baseStyle.disabled,
    style,
  ];

  if (noStyles) {
    return (
      <Pressable
        {...otherPressableProps}
        style={({pressed}) => [pressed && baseStyle.buttonPressed, style]}
        disabled={disabled}>
        {children}
      </Pressable>
    );
  }

  return (
    <Pressable
      disabled={disabled}
      style={mainButtonStyles}
      {...otherPressableProps}>
      {prefixIcon && <View style={baseStyle.iconContainer}>{prefixIcon}</View>}
      <Typography
        style={[baseStyle.buttonText, baseTextStyle[variant], textStyles]}>
        {children}
      </Typography>
    </Pressable>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      paddingVertical: pixelSizeVertical(16),
      borderRadius: theme.radius.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: fontPixel(theme.fontSize.m),
      fontWeight: '600',
    },
    contained: {
      backgroundColor: theme.colors.orange[200],
    },
    outlined: {
      borderWidth: 1,
      borderColor: theme.colors.black[100],
    },
    text: {
      borderColor: theme.colors.white[100],
      backgroundColor: theme.colors.white[100],
    },
    textTypography: {
      color: theme.colors.black[100],
    },
    containedText: {
      color: theme.colors.white[100],
    },
    outLineText: {
      color: theme.colors.gray[200],
    },
    lg: {
      paddingVertical: pixelSizeVertical(20),
    },
    md: {
      ...Platform.select({
        ios: {
          paddingVertical: pixelSizeVertical(14),
        },
        android: {
          paddingVertical: pixelSizeVertical(16),
        },
      }),
    },
    sm: {
      paddingVertical: pixelSizeVertical(10),
    },
    iconContainer: {
      marginRight: pixelSizeHorizontal(16),
    },
    buttonPressed: {
      opacity: 0.6,
    },
    disabled: {
      opacity: 0.5,
    },
  });
};
