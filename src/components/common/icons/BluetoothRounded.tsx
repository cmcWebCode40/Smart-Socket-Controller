import React from 'react';
import {Path, Rect, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const BluetoothRoundedIcon: React.FunctionComponent<SvgIconProps> = ({
  size = '45',
}) => {
  const {
    colors: {orange},
  } = theme;
  return (
    <Svg width={size} height={size} viewBox="0 0 45 45" fill="none">
      <Rect
        x="0.5"
        y="0.967865"
        width="44"
        height="44"
        rx="22"
        fill={orange[100]}
      />
      <Path
        d="M17.0833 22.9679L14.9167 20.8012L12.75 22.9679L14.9167 25.1345L17.0833 22.9679ZM28.6858 18.3204L22.5 12.1345L21.4167 12.1345L21.4167 20.357L16.4442 15.3845L14.9167 16.912L20.9725 22.9679L14.9167 29.0237L16.4442 30.5512L21.4167 25.5787L21.4167 33.8012H22.5L28.6858 27.6154L24.0275 22.9679L28.6858 18.3204ZM23.5833 16.2837L25.62 18.3204L23.5833 20.357L23.5833 16.2837ZM25.62 27.6154L23.5833 29.652V25.5787L25.62 27.6154ZM30.0833 20.8012L27.9167 22.9679L30.0833 25.1345L32.25 22.9679L30.0833 20.8012Z"
        fill={orange[600]}
      />
    </Svg>
  );
};
