import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {LargePlugIcon, SwitchIcon, Typography} from '../common';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {colors} from '@/libs/constants';
import LineImage from '../../../assets/images/line.png';

interface EnergyDeviceCardProps {
  state: 'online' | 'offline';
  onViewDetails: () => void;
}

export const EnergyDeviceCard: React.FunctionComponent<
  EnergyDeviceCardProps
> = ({onViewDetails, state}) => {
  const {green, red} = colors;
  const mainStyle = useThemedStyles(styles);
  const isOnline = state === 'online';
  return (
    <TouchableOpacity onPress={onViewDetails} style={mainStyle.container}>
      <View style={mainStyle.cardHeader}>
        <View style={mainStyle.subHeader}>
          <LargePlugIcon />
          <View style={mainStyle.iconText}>
            <Typography style={mainStyle.headerTitle}>Socket 1</Typography>
            <Typography style={mainStyle.caption}>SCK0001</Typography>
          </View>
        </View>
        <View
          style={[
            mainStyle.status,
            {backgroundColor: isOnline ? green[700] : red[100]},
          ]}>
          <Typography
            style={[
              mainStyle.statusText,
              {color: isOnline ? green[600] : red[200]},
            ]}>
            SCK0001
          </Typography>
        </View>
      </View>
      <View style={mainStyle.footer}>
        <View>
          <Typography style={mainStyle.title}>50% Optimized</Typography>
        </View>
        <Image source={LineImage} />
        <View>
          <Typography style={mainStyle.reading}>50.0KWh</Typography>
          <Typography style={mainStyle.reading}>220V</Typography>
          <SwitchIcon />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 10,
      shadowRadius: 6.65,
      elevation: 4,
      borderWidth: 1,
      borderRadius: theme.radius.lg,
      shadowColor: theme.colors.black[100],
      borderColor: theme.colors.green[300],
      backgroundColor: theme.colors.gray[100],
      paddingVertical: pixelSizeVertical(16),
    },
    headerTitle: {
      fontSize: fontPixel(32),
      fontFamily: theme.fonts.ManropeExtraBold,
    },
    status: {
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(8),
      marginTop: '2%',
      marginRight: pixelSizeHorizontal(8),
    },
    statusText: {
      fontSize: fontPixel(theme.fontSize.s),
    },
    subHeader: {
      flexDirection: 'row',
    },
    iconText: {
      // marginTop: pixelSizeVertical(8),
    },
    caption: {
      marginTop: pixelSizeVertical(12),
      color: theme.colors.gray[500],
    },
    cardHeader: {
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: pixelSizeVertical(-24),
    },
    powerRating: {
      fontSize: fontPixel(theme.fontSize.m),
    },
    btn: {
      flexBasis: '60%',
    },
    title: {
      fontSize: fontPixel(20),
      marginBottom: pixelSizeVertical(8),
      color: theme.colors.orange[400],
    },
    deviceId: {
      fontSize: fontPixel(theme.fontSize.s),
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: pixelSizeVertical(-8),
      paddingHorizontal: pixelSizeVertical(12),
    },
    reading: {
      fontFamily: theme.fonts.ManropeBold,
      color: theme.colors.orange[400],
    },
  });
};
