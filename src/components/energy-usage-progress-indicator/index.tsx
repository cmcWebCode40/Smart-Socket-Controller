import React from 'react';
import {Typography} from '../common';
import {StyleSheet, View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Theme, theme as themes} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {heightPixel, pixelSizeHorizontal} from '@/libs/utils';
import {Circle} from 'react-native-svg';

interface EnergyUsageProgressIndicatorProps {
  invertColor?: boolean;
}

export const EnergyUsageProgressIndicator: React.FunctionComponent<
  EnergyUsageProgressIndicatorProps
> = ({invertColor}) => {
  const style = useThemedStyles(styles);
  const {
    colors: {orange, gray, green},
  } = themes;
  const fillColor = invertColor ? green[300] : orange[400];
  return (
    <AnimatedCircularProgress
      width={20}
      fill={65}
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
      padding: pixelSizeHorizontal(24),
    },
    subTitle: {
      color: theme.colors.black[200],
      fontSize: theme.fontSize.m,
      fontFamily: theme.fonts.ManropeSemibold,
    },
  });
};
