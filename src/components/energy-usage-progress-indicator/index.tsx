import React from 'react';
import {Typography, WireLessIcon} from '../common';
import {StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Theme, theme as themes} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {fontPixel, heightPixel, pixelSizeHorizontal} from '@/libs/utils';
import {Circle} from 'react-native-svg';

interface EnergyUsageProgressIndicatorProps {
  invertColor?: boolean;
  energy?: number;
}

export const EnergyUsageProgressIndicator: React.FunctionComponent<
  EnergyUsageProgressIndicatorProps
> = ({invertColor, energy = 0}) => {
  const style = useThemedStyles(styles);
  const {
    colors: {orange, gray, green},
  } = themes;
  const fillColor = invertColor ? green[300] : orange[400];
  const wirelessColor = invertColor ? orange[400] : green[300];

  const maxEnergyCap = 1;

  const totalEnergy = (energy / maxEnergyCap) * 100;

  return (
    <AnimatedCircularProgress
      width={20}
      fill={totalEnergy}
      lineCap="round"
      style={[style.container, {shadowColor: fillColor}]}
      size={heightPixel(220)}
      tintColor={fillColor}
      backgroundColor={gray[300]}
      renderCap={({center}) => (
        <Circle cx={center.x} cy={center.y} r="13" fill={fillColor} />
      )}>
      {() => (
        <View style={style.content}>
          <WireLessIcon color={wirelessColor} />
          <Typography style={style.progressTitle} variant="h1">
            {energy} KWh
          </Typography>
          <Typography variant="b1" style={style.tag}>
            Energy Usage
          </Typography>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 14,
      elevation: 20,
      borderRadius: theme.radius.full,
      backgroundColor: theme.colors.white[100],
    },
    content: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: pixelSizeHorizontal(20),
    },
    subTitle: {
      color: theme.colors.black[200],
      fontSize: theme.fontSize.m,
      fontFamily: theme.fonts.ManropeBold,
    },
    tag: {
      textAlign: 'center',
      fontSize: fontPixel(theme.fontSize.s),
      color: theme.colors.black[200],
    },
    progressTitle: {
      textAlign: 'center',
    },
  });
};
