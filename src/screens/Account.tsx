import {View, StyleSheet} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {Button} from '@/components/common';
import {useAuthContext} from '@/libs/context';

export const AccountScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);

  const {clearUser} = useAuthContext();
  return (
    <View style={style.container}>
      <Button variant="filled" onPress={clearUser}>
        Logout
      </Button>
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
