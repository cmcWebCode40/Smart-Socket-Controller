import {TextInput, StyleSheet, TextInputProps, Platform} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {colors} from '@/libs/constants';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';

export const TextField: React.FunctionComponent<TextInputProps> = ({
  style,
  ...otherTextInputProps
}) => {
  const textInputStyles = useThemedStyles(styles);
  return (
    <TextInput
      {...otherTextInputProps}
      style={[textInputStyles.container, style]}
      placeholderTextColor={colors.black[300]}
    />
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingHorizontal: pixelSizeHorizontal(14),
      borderRadius: theme.radius.md,
      color: theme.colors.black[100],
      backgroundColor: colors.white[300],
      ...Platform.select({
        ios: {
          paddingVertical: pixelSizeVertical(14),
        },
        android: {
          paddingVertical: pixelSizeVertical(10),
        },
      }),
    },
  });
};
