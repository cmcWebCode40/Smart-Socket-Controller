import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../common';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {pixelSizeVertical} from '@/libs/utils';

export const EnergyLimitForm: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  return (
    <View>
      <TextInput
        style={style.input}
        keyboardType="number-pad"
        placeholder="Enter limit e.g 5"
        placeholderTextColor={'#9095A1'}
      />
      <Button>Send</Button>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    input: {
      borderWidth: 1,
      borderRadius: theme.radius.lg,
      padding: pixelSizeVertical(10),
      backgroundColor: theme.colors.white[100],
      borderColor: theme.colors.gray[300],
      marginVertical: pixelSizeVertical(24),
      color: theme.colors.black[200],
    },
  });
};
