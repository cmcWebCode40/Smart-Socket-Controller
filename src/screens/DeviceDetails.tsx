import {View, StyleSheet, ViewStyle, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {fontPixel, pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {Header} from '@/components/common/header';
import {Button, Modal, Typography} from '@/components/common';
import {EnergyUsageProgressIndicator} from '@/components/energy-usage-progress-indicator';
import {
  DeviceInfoStatus,
  EnergyDeviceInfoCard,
} from '@/components/energy-device-cards';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackScreens} from '@/navigation/type';
import {useBluetoothContext} from '@/libs/context';
import {SocketInfo} from '@/libs/types';
import {EnergyLimitForm} from '@/components/set-energy-limit-form';

type DeviceDetailsScreenProps = NativeStackScreenProps<
  MainStackScreens,
  'DeviceDetails'
>;

export const DeviceDetailsScreen: React.FunctionComponent<
  DeviceDetailsScreenProps
> = ({route: {params}}) => {
  const [openModal, setOpenModal] = useState(false);
  const style = useThemedStyles(styles);
  const {socketInfo, socketPowerControl} = useBluetoothContext();

  const socket = params?.socketId
    ? (socketInfo[params?.socketId] as SocketInfo)
    : null;

  if (!socket) {
    return null;
  }

  const info: {type: DeviceInfoStatus; value: string}[] = [
    {
      type: 'AC_CURRENT',
      value: `${socket?.current} A`,
    },
    {
      type: 'AC_VOLTAGE',
      value: `${socket?.voltage} V`,
    },
    {
      type: 'POWER_CONSUMPTION',
      value: `${socket?.power} KW`,
    },
    {
      type: 'FREQUENCY',
      value: `${socket?.frequency}`,
    },
  ];

  const energyUsage = Math.round(socket.energy * 10);

  const resetSocket = () => {
    socketPowerControl(socket.id, 'r');
  };

  return (
    <View style={style.container}>
      <Header
        title={socket.id}
        showHomeIcon={true}
        buttonStyles={style.headerButton}
        buttonTextStyles={style.headerButtonText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.deviceStatus}>
          <View style={[style.status, style.devicePowerStatus]}>
            <Typography style={[style.statusText, style.devicePowerStatusText]}>
              {socket.power} KW Load Limit Set
            </Typography>
          </View>
          <View style={[style.status, style.deviceStateStatus]}>
            <Typography style={[style.statusText, style.deviceStateStatusText]}>
              Active
            </Typography>
          </View>
        </View>
        <View style={style.progressIndicatorContainer}>
          <EnergyUsageProgressIndicator power={energyUsage} invertColor />
        </View>
        <View style={style.infoContainer}>
          {info.map((item, index) => (
            <View
              style={[style.infoCard, actionCardStyle(index)]}
              key={item.type}>
              <EnergyDeviceInfoCard type={item.type} value={item.value} />
            </View>
          ))}
        </View>
        <View style={style.buttonContainer}>
          <Button
            variant="outlined"
            style={style.reset}
            onPress={resetSocket}
            textStyles={style.resetTextStyle}>
            Reset
          </Button>
        </View>
      </ScrollView>
      <Modal
        onClose={() => setOpenModal(false)}
        title="Set Energy Limit"
        visible={openModal}>
        <EnergyLimitForm />
      </Modal>
    </View>
  );
};

const actionCardStyle = (index: number): ViewStyle => ({
  marginRight: index % 2 === 0 ? '2.5%' : 0,
  marginLeft: index % 2 !== 0 ? '1.5%' : 0,
  marginTop: '3%',
});

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(16),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
    },
    content: {
      marginTop: pixelSizeVertical(40),
    },
    headerButton: {
      backgroundColor: theme.colors.green[100],
    },
    headerButtonText: {
      textTransform: 'uppercase',
      color: theme.colors.green[200],
    },
    deviceStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: pixelSizeVertical(24),
    },
    status: {
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(16),
    },
    statusText: {
      fontSize: fontPixel(theme.fontSize.s),
      fontWeight: '600',
    },
    devicePowerStatus: {
      backgroundColor: theme.colors.red[100],
    },
    devicePowerStatusText: {
      color: theme.colors.red[200],
    },
    deviceStateStatus: {
      backgroundColor: theme.colors.green[300],
      borderRadius: theme.radius.xxl,
      paddingVertical: pixelSizeVertical(8),
      paddingHorizontal: pixelSizeHorizontal(16),
    },
    deviceStateStatusText: {
      color: theme.colors.white[100],
    },
    progressIndicatorContainer: {
      marginHorizontal: 'auto',
      marginTop: pixelSizeVertical(40),
      marginBottom: pixelSizeVertical(20),
    },
    infoContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      paddingHorizontal: pixelSizeHorizontal(8),
    },
    infoCard: {
      width: '48%',
      marginBottom: pixelSizeVertical(24),
    },
    reset: {
      borderRadius: theme.radius.lg,
      marginTop: pixelSizeVertical(20),
      borderColor: theme.colors.green[500],
    },
    resetTextStyle: {
      color: theme.colors.green[500],
      fontSize: fontPixel(theme.fontSize.xl),
    },
    limit: {
      borderRadius: theme.radius.lg,
      marginTop: pixelSizeVertical(20),
      borderColor: theme.colors.orange[400],
    },
    limitTextStyle: {
      color: theme.colors.gray[500],
      fontSize: fontPixel(theme.fontSize.xl),
    },
    buttonContainer: {
      marginTop: pixelSizeVertical(24),
      marginBottom: pixelSizeVertical(24),
    },
  });
};
