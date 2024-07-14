import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {
  heightPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
} from '@/libs/utils';
import {Socket, colors} from '@/libs/constants';
import {EnergyUsageChart} from '@/components/chart';
import {Button, Typography} from '@/components/common';
import {MinimalEnergyDeviceCard} from '@/components/energy-device-cards';
import {EnergyUsageProgressIndicator} from '@/components/energy-usage-progress-indicator';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';
import {useBluetoothContext} from '@/libs/context';
import {SocketIdentifiers} from '@/libs/types';

export const HomeScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  const {socketInfo} = useBluetoothContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();

  const handleViewDetails = (socketId: SocketIdentifiers) => {
    navigation.navigate('DeviceDetails', {socketId});
  };

  return (
    <View style={style.container}>
      <ScrollView
        style={style.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <View style={style.energyUsageContainer}>
          <Button
            variant="outlined"
            style={style.energyUsageBtn}
            textStyles={style.energyUsageBtnText}>
            Total Energy Usage KWh
          </Button>
        </View>
        <View style={style.progressIndicatorContainer}>
          <EnergyUsageProgressIndicator />
        </View>
        <View style={style.devices}>
          {['Socket 1', 'Socket 2'].map((item, index) => (
            <View style={style.deviceItem} key={item}>
              <View
                style={[
                  style.indicator,
                  {
                    backgroundColor:
                      index % 2 === 0 ? colors.orange[400] : colors.yellow[100],
                  },
                ]}
              />
              <Typography style={style.device}>{item}</Typography>
            </View>
          ))}
        </View>
        <View style={style.energyChartContainer}>
          <EnergyUsageChart />
        </View>
        <View style={style.deviceCards}>
          <Typography style={style.deviceHeaderTitle}>
            High Usage Device
          </Typography>
          <View style={style.connectDeviceList}>
            {socketInfo?.SCK0001 && (
              <MinimalEnergyDeviceCard
                index={0}
                socketNo={'1'}
                socketId={Socket.SCK0001}
                power={socketInfo.SCK0001.power}
                onViewDetails={handleViewDetails}
                style={style.connectedDeviceCard}
              />
            )}
            {socketInfo?.SCK0002 && (
              <MinimalEnergyDeviceCard
                index={1}
                socketNo={'2'}
                socketId={Socket.SCK0002}
                power={socketInfo.SCK0002.power}
                onViewDetails={handleViewDetails}
                style={style.connectedDeviceCard}
              />
            )}
          </View>
        </View>
      </ScrollView>
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
    energyUsageBtn: {
      borderColor: theme.colors.yellow[100],
    },
    energyUsageBtnText: {
      color: theme.colors.black[200],
    },
    energyUsageContainer: {
      width: '60%',
      marginHorizontal: 'auto',
      marginTop: pixelSizeVertical(24),
    },
    progressIndicatorContainer: {
      marginHorizontal: 'auto',
      marginTop: pixelSizeVertical(40),
    },
    devices: {
      flexDirection: 'row',
      marginHorizontal: 'auto',
      marginTop: pixelSizeVertical(32),
    },
    deviceItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: pixelSizeHorizontal(24),
    },
    indicator: {
      height: heightPixel(20),
      width: heightPixel(20),
      borderRadius: theme.radius.full,
      marginRight: pixelSizeHorizontal(8),
    },
    energyChartContainer: {
      marginTop: pixelSizeVertical(32),
    },
    device: {
      fontSize: theme.fontSize.m,
    },
    deviceCards: {
      marginTop: pixelSizeVertical(24),
      marginBottom: pixelSizeVertical(24),
    },
    deviceHeaderTitle: {
      fontSize: theme.fontSize.m,
      fontWeight: '600',
      fontFamily: theme.fonts.ManropeBold,
    },
    connectDeviceList: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: pixelSizeVertical(16),
    },
    connectedDeviceCard: {
      flexBasis: '47%',
    },
    scrollContainer: {
      paddingBottom: pixelSizeVertical(24),
    },
  });
};
