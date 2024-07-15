import {View, StyleSheet} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {EnergyDeviceCard} from '@/components/energy-device-cards';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';
import {useBluetoothContext} from '@/libs/context';
import {Socket} from '@/libs/constants';
import {SocketIdentifiers} from '@/libs/types';

export const DevicesScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  const {socketInfo, socketPowerControl} = useBluetoothContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();

  const handleViewDetails = (socketId: SocketIdentifiers) => {
    navigation.navigate('DeviceDetails', {
      socketId,
    });
  };

  return (
    <View style={style.container}>
      <View style={style.content}>
        {socketInfo?.SCK0001 && (
          <EnergyDeviceCard
            socketNo={'1'}
            socketId={Socket.SCK0001}
            onSwitch={socketPowerControl}
            power={socketInfo.SCK0001.power}
            state={socketInfo.SCK0001.status}
            voltage={socketInfo.SCK0001.voltage}
            onViewDetails={handleViewDetails}
          />
        )}
        {socketInfo?.SCK0002 && (
          <EnergyDeviceCard
            socketNo={'2'}
            socketId={Socket.SCK0002}
            onSwitch={socketPowerControl}
            power={socketInfo.SCK0002.power}
            state={socketInfo.SCK0002.status}
            voltage={socketInfo.SCK0002.voltage}
            onViewDetails={handleViewDetails}
          />
        )}
      </View>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(16),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
    },
    content: {
      marginTop: pixelSizeVertical(48),
    },
    deviceItem: {
      marginBottom: pixelSizeVertical(40),
    },
  });
};
