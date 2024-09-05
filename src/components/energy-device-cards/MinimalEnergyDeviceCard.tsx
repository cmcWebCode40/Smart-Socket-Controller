import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {Button, PlugIcon, Typography} from '../common';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import TriangleImage from '../../../assets/images/triangle.png';
import {colors} from '@/libs/constants';
import {SocketIdentifiers} from '@/libs/types';

interface MinimalEnergyDeviceCardProps {
  style?: StyleProp<ViewStyle>;
  index: number;
  socketId: string;
  socketNo: string;
  energy: number;
  state: 'on' | 'off';
  onViewDetails: (id: SocketIdentifiers) => void;
  onSwitch: (socketId: string, state: 'on' | 'off') => void;
}

export const MinimalEnergyDeviceCard: React.FunctionComponent<
  MinimalEnergyDeviceCardProps
> = ({style, index, energy, socketId, socketNo, onViewDetails, onSwitch}) => {
  const textColor = index % 2 === 0 ? colors.orange[400] : colors.green[300];
  const mainStyle = useThemedStyles(styles);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onViewDetails(socketId as SocketIdentifiers)}
      style={[mainStyle.wrapper, style]}>
      <Image source={TriangleImage} style={mainStyle.image} />
      <View style={mainStyle.container}>
        <View style={[mainStyle.flexDir, mainStyle.cardHeader]}>
          <PlugIcon />
          <Typography style={[mainStyle.powerRating, {color: textColor}]}>
            {energy} KWh
          </Typography>
        </View>
        <View style={mainStyle.flexDir}>
          <View>
            <Typography style={mainStyle.title}>Socket {socketNo}</Typography>
            <Typography style={mainStyle.deviceId}>{socketId}</Typography>
          </View>
        </View>
        <View style={mainStyle.btnContainer}>
          <Button
            variant="filled"
            size="sm"
            onPress={() => onSwitch(socketId, 'on')}
            style={[mainStyle.btnFooter, mainStyle.btnSpaceRight]}>
            On
          </Button>
          <Button
            size="sm"
            variant="contained"
            onPress={() => onSwitch(socketId, 'off')}
            style={[mainStyle.btnFooter, mainStyle.btnSpaceLeft]}>
            Off
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    btnContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: pixelSizeVertical(8),
    },
    btnFooter: {
      width: '50%',
    },
    btnSpaceRight: {},
    btnSpaceLeft: {
      marginLeft: pixelSizeHorizontal(4),
    },
    wrapper: {
      position: 'relative',
    },
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
    image: {
      zIndex: 9999,
      top: 1.5,
      height: 20,
      marginHorizontal: 'auto',
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
      textTransform: 'uppercase',
      fontSize: fontPixel(theme.fontSize.s),
    },
    flexDir: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
