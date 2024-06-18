import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {Typography} from '@/components/common';

export const AccountScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.container}>
      <Typography>Accounts</Typography>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(16),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
    },
  });
};
