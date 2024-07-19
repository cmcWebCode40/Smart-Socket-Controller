import {
  Pressable,
  StyleSheet,
  PressableProps,
  TextStyle,
  View,
  StyleProp,
  ViewStyle,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {Typography} from '../typography';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {colors} from '@/libs/constants';

type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'outlined' | 'contained' | 'text' | 'filled';

interface ButtonProps extends PressableProps {
  noStyles?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  textStyles?: StyleProp<TextStyle>;
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
  loading,
  children,
  ...otherPressableProps
}) => {
  const baseStyle = useThemedStyles(styles);

  const baseTextStyle = {
    outlined: baseStyle.outLineText,
    contained: baseStyle.containedText,
    text: baseStyle.textTypography,
    filled: baseStyle.fillText,
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
    filled: baseStyle.fill,
  };

  const mainButtonStyles = ({pressed}: {pressed: boolean}) => [
    baseStyle.button,
    buttonStyles[variant],
    sizeStyle[size],
    pressed && baseStyle.buttonPressed,
    disabled && baseStyle.disabled,
    style,
  ];

  const loadingIconStyles = {
    outlined: colors.orange[200],
    contained: colors.white[100],
    text: colors.orange[200],
    filled: colors.white[100],
  };

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
      {loading && (
        <ActivityIndicator
          style={baseStyle.loader}
          color={loadingIconStyles[variant]}
          size={16}
        />
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: pixelSizeVertical(16),
      borderRadius: theme.radius.xxxl,
    },
    buttonText: {
      fontWeight: '600',
      textTransform: 'capitalize',
      fontSize: fontPixel(theme.fontSize.l),
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
      color: theme.colors.orange[400],
    },
    outLineText: {
      color: theme.colors.gray[200],
    },
    fillText: {
      color: theme.colors.white[100],
    },
    fill: {
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.orange[500],
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
    loader: {
      marginLeft: pixelSizeHorizontal(10),
    },
  });
};
