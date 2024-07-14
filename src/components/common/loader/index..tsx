import {View, ActivityIndicator, StyleSheet} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {colors} from '@/libs/constants';
import {Typography} from '../typography';
import {fontPixel, pixelSizeVertical} from '@/libs/utils';

interface SpinnerProps {
  title?: string;
  loading: boolean;
}

export const Spinner: React.FunctionComponent<SpinnerProps> = ({
  loading,
  title,
}) => {
  const style = useThemedStyles(styles);
  const {orange} = colors;

  if (!loading) {
    return null;
  }
  return (
    <View style={style.container}>
      <ActivityIndicator size={40} color={orange[400]} />
      {title && (
        <Typography style={style.loadingText} variant="h2">
          {title}...
        </Typography>
      )}
    </View>
  );
};

const styles = () => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 'auto',
    },
    loadingText: {
      fontSize: fontPixel(16),
      marginTop: pixelSizeVertical(8),
    },
  });
};
