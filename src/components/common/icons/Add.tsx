import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const AddIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.gray[600],
  size = '33',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
      <Path
        d="M16.5 4.79999L16.5 27.2"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M27.7 16L5.29999 16"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </Svg>
  );
};
