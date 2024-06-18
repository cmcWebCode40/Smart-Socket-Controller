import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const FrequencyIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.green[400],
}) => {
  return (
    <Svg width="22" height="13" viewBox="0 0 22 13" fill="none">
      <Path
        d="M0.76 12.9679L0.76 0.00789499H2.929L2.929 5.4619L9.067 5.4619L9.067 0.00789499L11.227 0.00789499L11.227 12.9679H9.067L9.067 7.4959L2.929 7.4959L2.929 12.9679H0.76ZM12.8502 12.9679V12.6709L17.9982 5.1469L13.3722 5.1469V3.2479L21.3732 3.2479V3.5539L16.2432 11.0689H21.1572V12.9679H12.8502Z"
        fill={color}
      />
    </Svg>
  );
};
