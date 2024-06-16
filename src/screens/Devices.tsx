import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';

export const DevicesScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.container}>
      <Text>AddDeviceScreen</Text>
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
