import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {LargePlugIcon, SwitchIcon, Typography} from '../common';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {colors} from '@/libs/constants';
import LineImage from '../../../assets/images/line.png';
import {SocketIdentifiers} from '@/libs/types';

interface EnergyDeviceCardProps {
  state: 'on' | 'off';
  voltage: number;
  power: number;
  onViewDetails: (id: SocketIdentifiers) => void;
  socketId: string;
  socketNo: string;
  onSwitch: (socketId: string, state: 'on' | 'off') => void;
}

export const EnergyDeviceCard: React.FunctionComponent<
  EnergyDeviceCardProps
> = ({onViewDetails, state, power, voltage, socketId, socketNo, onSwitch}) => {
  const {green, red} = colors;
  const [isEnabled, setIsEnabled] = useState(false);
  const mainStyle = useThemedStyles(styles);

  useEffect(() => {
    if (state === 'on') {
      setIsEnabled(true);
    }
  }, [state]);

  const isOnline = state === 'on';

  const switchValue = state === 'off' ? 'on' : 'off';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onViewDetails(socketId as SocketIdentifiers)}
      style={mainStyle.container}>
      <View style={mainStyle.cardHeader}>
        <View style={mainStyle.subHeader}>
          <LargePlugIcon />
          <View>
            <Typography style={mainStyle.headerTitle}>
              Socket {socketNo}
            </Typography>
            <Typography style={mainStyle.caption}>{socketId}</Typography>
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
            {socketId}
          </Typography>
        </View>
      </View>
      <View style={mainStyle.footer}>
        <View>
          <Typography style={mainStyle.title}>Optimized</Typography>
        </View>
        <Image source={LineImage} />
        <View>
          <Typography variant="b1" style={mainStyle.reading}>
            {power} KWh
          </Typography>
          <Typography variant="b1" style={mainStyle.reading}>
            {voltage} V
          </Typography>
          <SwitchIcon
            state={state}
            isEnabled={isEnabled}
            style={mainStyle.switch}
            onChange={() => {
              setIsEnabled(state === 'off' ? true : false);
              onSwitch(socketId, switchValue);
            }}
          />
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
      marginBottom: pixelSizeVertical(24),
    },
    headerTitle: {
      fontSize: fontPixel(24),
      textTransform: 'capitalize',
      fontFamily: theme.fonts.ManropeBold,
    },
    status: {
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(8),
      marginTop: '2%',
      marginRight: pixelSizeHorizontal(8),
    },
    statusText: {
      textTransform: 'uppercase',
      fontSize: fontPixel(theme.fontSize.s),
    },
    subHeader: {
      flexDirection: 'row',
    },
    caption: {
      marginTop: pixelSizeVertical(12),
      color: theme.colors.gray[500],
      fontSize: fontPixel(16),
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
    switch: {
      marginTop: pixelSizeVertical(8),
    },
  });
};
