import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const AcCurrentIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.yellow[100],
  size = '29',
}) => {
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <Path
        d="M4 3.30121L4 17.3012H7.5L7.5 27.8012L15.6667 13.8012L11 13.8012L15.6667 3.30121L4 3.30121ZM22.6667 3.30121L20.3333 3.30121L16.6 13.8012H18.8167L19.6333 11.4679L23.3667 11.4679L24.1833 13.8012H26.4L22.6667 3.30121ZM20.1583 9.89288L21.5 5.63454L22.8417 9.89288H20.1583Z"
        fill={color}
      />
    </Svg>
  );
};
