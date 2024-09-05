import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {
  AcCurrentIcon,
  AcVoltIcon,
  ElectricPlugIcon,
  Typography,
} from '../common';
import {colors} from '@/libs/constants';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {
  fontPixel,
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '@/libs/utils';
import TriangleImage from '../../../assets/images/triangle.png';
const {orange, yellow, blue, green} = colors;

export type DeviceInfoStatus =
  | 'AC_VOLTAGE'
  | 'AC_CURRENT'
  | 'POWER_CONSUMPTION'
  | 'POWER_FACTOR';

const statues = {
  AC_VOLTAGE: {
    icon: <AcVoltIcon />,
    color: orange[400],
    title: 'AC Voltage',
  },
  AC_CURRENT: {
    icon: <AcCurrentIcon />,
    color: yellow[100],
    title: 'AC Current',
  },
  POWER_CONSUMPTION: {
    icon: <ElectricPlugIcon />,
    color: blue[100],
    title: 'Power Consumption',
  },
  POWER_FACTOR: {
    icon: <AcVoltIcon />,
    color: green[400],
    title: 'Power Factor',
  },
};
interface EnergyDeviceInfoCardProps {
  type: DeviceInfoStatus;
  value: string;
}

export const EnergyDeviceInfoCard: React.FunctionComponent<
  EnergyDeviceInfoCardProps
> = ({type, value}) => {
  const style = useThemedStyles(styles);

  return (
    <View style={style.wrapper}>
      <Image source={TriangleImage} style={style.image} />
      <View style={style.container}>
        {statues[type].icon}
        <Typography variant="b2" style={style.title}>
          {statues[type].title}
        </Typography>
        <Typography style={style.info}>{value}</Typography>
      </View>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    wrapper: {
      position: 'relative',
    },
    image: {
      marginHorizontal: 'auto',
    },
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.lg,
      borderWidth: 1.5,
      borderColor: theme.colors.gray[500],
      backgroundColor: theme.colors.gray[100],
      paddingHorizontal: pixelSizeHorizontal(16),
      paddingVertical: pixelSizeVertical(20),
      height: heightPixel(124),
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 5.5,
      elevation: 4,
      shadowColor: theme.colors.black[100],
    },
    btn: {
      flexBasis: '60%',
    },
    title: {
      fontWeight: '600',
      fontFamily: theme.fonts.ManropeBold,
      color: theme.colors.gray[500],
      marginVertical: pixelSizeVertical(8),
    },
    info: {
      fontSize: fontPixel(24),
    },
  });
};
