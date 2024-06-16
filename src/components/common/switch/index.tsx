import {theme} from '@/libs/config/theme';
import React, {useState} from 'react';
import {Switch} from 'react-native';

export const SwitchIcon: React.FunctionComponent = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const {
    colors: {green, gray, white},
  } = theme;
  return (
    <Switch
      trackColor={{false: gray[200], true: green[300]}}
      thumbColor={isEnabled ? white[100] : white[100]}
      ios_backgroundColor={gray[200]}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};
