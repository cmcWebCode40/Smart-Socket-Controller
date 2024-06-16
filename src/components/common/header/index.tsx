import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Avatar} from '../avatar';
import {Button} from '../button';
import {BluetoothRoundedIcon} from '../icons';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';

export const Header: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  return (
    <View style={style.container}>
      <Avatar />
      <Button style={style.btn}>Israel Obanijesu</Button>
      <BluetoothRoundedIcon />
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.white[100],
    },
    btn: {
      flexBasis: '60%',
    },
  });
};
