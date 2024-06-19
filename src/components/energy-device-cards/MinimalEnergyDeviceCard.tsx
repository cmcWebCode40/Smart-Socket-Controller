import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {PlugIcon, SwitchIcon, Typography} from '../common';
import {fontPixel, pixelSizeVertical} from '@/libs/utils';
import TriangleImage from '../../../assets/images/triangle.png';
import {colors} from '@/libs/constants';

interface MinimalEnergyDeviceCardProps {
  style?: StyleProp<ViewStyle>;
  index: number;
  onViewDetails: () => void;
}

export const MinimalEnergyDeviceCard: React.FunctionComponent<
  MinimalEnergyDeviceCardProps
> = ({style, index, onViewDetails}) => {
  const mainStyle = useThemedStyles(styles);
  const textColor = index % 2 === 0 ? colors.orange[400] : colors.green[300];
  return (
    <Pressable onPress={onViewDetails} style={[mainStyle.wrapper, style]}>
      <Image source={TriangleImage} style={mainStyle.image} />
      <View style={mainStyle.container}>
        <View style={[mainStyle.flexDir, mainStyle.cardHeader]}>
          <PlugIcon />
          <Typography style={[mainStyle.powerRating, {color: textColor}]}>
            200KWh
          </Typography>
        </View>
        <View style={mainStyle.flexDir}>
          <View>
            <Typography style={mainStyle.title}>Socket 1</Typography>
            <Typography style={mainStyle.deviceId}>SCK0001</Typography>
          </View>
          <SwitchIcon />
        </View>
      </View>
    </Pressable>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
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
      fontSize: fontPixel(theme.fontSize.s),
    },
    flexDir: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
};
