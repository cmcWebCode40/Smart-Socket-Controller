import {theme} from '@/libs/config/theme';
import React, {useEffect, useState} from 'react';
import {StyleProp, Switch, ViewStyle} from 'react-native';

interface SwitchIconProps {
  style?: StyleProp<ViewStyle>;
  state: 'on' | 'off';
}

export const SwitchIcon: React.FunctionComponent<SwitchIconProps> = ({
  style,
  state,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {
    colors: {green, gray, white},
  } = theme;

  useEffect(() => {
    if (state === 'on') {
      setIsEnabled(true);
    }
  }, [state]);
  return (
    <Switch
      trackColor={{false: gray[200], true: green[300]}}
      thumbColor={isEnabled ? white[100] : white[100]}
      ios_backgroundColor={gray[200]}
      onValueChange={toggleSwitch}
      value={isEnabled}
      style={style}
    />
  );
};
