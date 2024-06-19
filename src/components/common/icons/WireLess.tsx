import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const WireLessIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.orange[400],
  size = '35',
}) => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Path
        d="M18.35 12.8679L14.95 17.9679H20.05L16.65 23.0679"
        stroke={color}
        strokeWidth="2.04"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M8.484 8.9519C7.29995 10.1359 6.3607 11.5415 5.7199 13.0884C5.07909 14.6354 4.74927 16.2934 4.74927 17.9679C4.74927 19.6423 5.07909 21.3003 5.7199 22.8473C6.3607 24.3943 7.29995 25.7998 8.484 26.9838"
        stroke={color}
        strokeWidth="2.04"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M26.516 26.9838C27.7 25.7998 28.6393 24.3943 29.2801 22.8473C29.9209 21.3003 30.2507 19.6423 30.2507 17.9679C30.2507 16.2934 29.9209 14.6354 29.2801 13.0884C28.6393 11.5415 27.7 10.1359 26.516 8.9519"
        stroke={color}
        strokeWidth="2.04"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M11.4897 11.9575C9.89563 13.5516 9.00012 15.7136 9.00012 17.9679C9.00012 20.2222 9.89563 22.3842 11.4897 23.9782"
        stroke={color}
        strokeWidth="2.04"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M23.5104 23.9782C25.1044 22.3842 25.9999 20.2222 25.9999 17.9679C25.9999 15.7136 25.1044 13.5516 23.5104 11.9575"
        stroke={color}
        strokeWidth="2.04"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </Svg>
  );
};
