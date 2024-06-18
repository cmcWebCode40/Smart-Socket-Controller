import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const HomeRoundedIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.orange[300],
  size = '45',
}) => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Rect
        x="0.5"
        y="0.967865"
        width="44"
        height="44"
        rx="22"
        fill="#FEF6F1"
      />
      <Path
        d="M12.2858 22.0393L22.5001 13.6821L32.7143 22.0393"
        stroke={color}
        strokeWidth="2.22857"
        strokeMiterlimit="10"
      />
      <Path
        d="M20.6428 33.1821L20.6428 27.6107L24.3571 27.6107L24.3571 33.1821"
        stroke={color}
        strokeWidth="2.22857"
        strokeMiterlimit="10"
      />
      <Path
        d="M15.0714 23.8964L15.0714 31.325C15.0714 32.3511 15.9025 33.1822 16.9286 33.1822L28.0714 33.1822C29.0975 33.1822 29.9286 32.3511 29.9286 31.325L29.9286 23.8964"
        stroke={color}
        strokeWidth="2.22857"
        strokeMiterlimit="10"
        stroke-linecap="square"
      />
    </Svg>
  );
};
