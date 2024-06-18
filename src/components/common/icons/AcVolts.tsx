import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const AcVoltIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.orange[400],
}) => {
  return (
    <Svg width="19" height="24" viewBox="0 0 19 24" fill="none">
      <Path
        d="M12.6383 0.546186L0.551649 11.3729C-0.195018 12.0495 0.224982 13.2979 1.22832 13.3912L10.6666 14.3012L5.00831 22.1879C4.75165 22.5495 4.78665 23.0512 5.10165 23.3662C5.45165 23.7162 5.99998 23.7279 6.36165 23.3895L18.4483 12.5629C19.195 11.8862 18.775 10.6379 17.7716 10.5445L8.33331 9.63452L13.9916 1.74785C14.2483 1.38619 14.2133 0.884519 13.8983 0.569519C13.5483 0.219519 13 0.207852 12.6383 0.546186Z"
        fill={color}
      />
    </Svg>
  );
};
