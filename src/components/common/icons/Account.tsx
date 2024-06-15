import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const AccountIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.gray[600],
  size = '33',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 33 32" fill="none">
      <Path
        d="M24.4574 25.2664C24.3094 22.6608 22.8238 21.8344 20.651 21.1104C19.0974 20.5928 18.5974 19.0232 18.4366 18.0656"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
      />
      <Path
        d="M15.2277 18.0648C15.0669 19.0224 14.5685 20.5928 13.0157 21.1112C10.8429 21.8352 9.34373 22.6512 9.19653 25.2568"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
      />
      <Path
        d="M16.8333 18.4C14.6245 18.4 12.8333 16.6088 12.8333 14.4V12.8C12.8333 10.5912 14.6245 8.79999 16.8333 8.79999C19.0421 8.79999 20.8333 10.5912 20.8333 12.8V14.4C20.8333 16.6088 19.0421 18.4 16.8333 18.4Z"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M28.821 16.5691C29.1352 9.94901 24.0232 4.32767 17.403 4.01354C10.7829 3.6994 5.16157 8.81141 4.84743 15.4315C4.53329 22.0517 9.6453 27.673 16.2654 27.9871C22.8856 28.3013 28.5069 23.1893 28.821 16.5691Z"
        stroke={color}
        strokeWidth="1.92"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </Svg>
  );
};
