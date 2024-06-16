import React from 'react';
import {Typography} from '../common';
import {StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Theme, theme as themes} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {heightPixel, pixelSizeHorizontal} from '@/libs/utils';
import {Circle} from 'react-native-svg';

export const EnergyUsageProgressIndicator: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  const {
    colors: {orange, gray},
  } = themes;
  return (
    <AnimatedCircularProgress
      width={20}
      fill={65}
      lineCap="round"
      size={heightPixel(220)}
      tintColor={orange[400]}
      backgroundColor={gray[300]}
      renderCap={({center}) => (
        <Circle cx={center.x} cy={center.y} r="13" fill={orange[400]} />
      )}>
      {() => (
        <View style={style.container}>
          <Typography variant="h1">250KWh</Typography>
          <Typography variant="h2" style={style.subTitle}>
            80% of the Limit
          </Typography>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      padding: pixelSizeHorizontal(24),
    },
    subTitle: {
      color: theme.colors.black[200],
      fontSize: theme.fontSize.m,
      fontFamily: theme.fonts.ManropeSemibold,
    },
  });
};
