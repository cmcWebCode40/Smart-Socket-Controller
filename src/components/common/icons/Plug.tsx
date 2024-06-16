import React from 'react';
import {Path, Svg} from 'react-native-svg';
import {SvgIconProps} from './type';
import {theme} from '@/libs/config/theme';

export const PlugIcon: React.FunctionComponent<SvgIconProps> = ({
  color = theme.colors.black[300],
  size = '25',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 25 25" fill="none">
      <Path
        d="M8.21436 14.6821L16.7858 14.6821V18.1107C16.7858 18.6735 16.6749 19.2308 16.4596 19.7508C16.2442 20.2707 15.9285 20.7432 15.5305 21.1412C15.1326 21.5391 14.6601 21.8548 14.1401 22.0702C13.6202 22.2856 13.0629 22.3964 12.5001 22.3964C11.3634 22.3964 10.2733 21.9449 9.46961 21.1412C8.66588 20.3374 8.21436 19.2473 8.21436 18.1107V14.6821Z"
        stroke={color}
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M9.92847 14.6821V12.1107"
        stroke={color}
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M15.0715 14.6821V12.1107"
        stroke={color}
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M4.59548 18.1107C3.67006 16.6877 3.14596 15.0413 3.0785 13.3452C3.01103 11.6491 3.4027 9.9662 4.21217 8.4742C5.02164 6.98219 6.21889 5.73638 7.67754 4.86825C9.1362 4.00012 10.8022 3.54187 12.4996 3.54187C14.1971 3.54187 15.863 4.00012 17.3217 4.86825C18.7803 5.73638 19.9776 6.98219 20.7871 8.4742C21.5965 9.9662 21.9882 11.6491 21.9207 13.3452C21.8533 15.0413 21.3292 16.6877 20.4038 18.1107"
        stroke={color}
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
      <Path
        d="M8.21436 8.76785C8.76587 8.20497 9.42286 7.75624 10.1478 7.4473C10.8728 7.13835 11.6515 6.97525 12.4395 6.96729C13.2275 6.95933 14.0093 7.10667 14.7403 7.40091C15.4714 7.69514 16.1373 8.13051 16.7001 8.68213"
        stroke={color}
        strokeWidth="2.05714"
        strokeMiterlimit="10"
        strokeLinecap="square"
      />
    </Svg>
  );
};
