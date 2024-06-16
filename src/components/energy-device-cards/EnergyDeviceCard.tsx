import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {PlugIcon, SwitchIcon, Typography} from '../common';
import {fontPixel, pixelSizeVertical} from '@/libs/utils';

interface EnergyDeviceCardProps {
  style?: StyleProp<ViewStyle>;
}

export const EnergyDeviceCard: React.FunctionComponent<
  EnergyDeviceCardProps
> = ({style}) => {
  const mainStyle = useThemedStyles(styles);
  return (
    <View style={style}>
      <View style={mainStyle.container}>
        <View style={[mainStyle.flexDir, mainStyle.cardHeader]}>
          <PlugIcon />
          <Typography style={mainStyle.powerRating}>200KWh</Typography>
        </View>
        <View style={mainStyle.flexDir}>
          <View>
            <Typography style={mainStyle.title}>Socket 1</Typography>
            <Typography style={mainStyle.deviceId}>SCK0001</Typography>
          </View>
          <SwitchIcon />
        </View>
      </View>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.21,
      shadowRadius: 6.65,
      elevation: 4,
      borderRadius: theme.radius.lg,
      padding: pixelSizeVertical(12),
      shadowColor: theme.colors.black[100],
      backgroundColor: theme.colors.gray[100],
    },
    cardHeader: {
      marginBottom: pixelSizeVertical(12),
    },
    powerRating: {
      fontSize: fontPixel(theme.fontSize.m),
    },
    btn: {
      flexBasis: '60%',
    },
    title: {
      fontSize: fontPixel(18),
      marginBottom: pixelSizeVertical(8),
    },
    deviceId: {
      fontSize: fontPixel(theme.fontSize.s),
    },
    flexDir: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
