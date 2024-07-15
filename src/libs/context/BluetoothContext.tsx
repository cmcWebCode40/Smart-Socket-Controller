import React, {createContext, useContext, useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {byteToString, stringToCharCodeArray} from '../utils/binaryFormatters';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SocketResponse, Sockets} from '../types';
import {Socket} from '../constants';

type DefaultContext = {
  stopScan: () => void;
  isPairing: boolean;
  isScanning: boolean;
  socketInfo: Sockets;
  scanAvailableDevices: () => void;
  peripherals: Map<string, Peripheral>;
  characteristics?: PeripheralServices;
  connectPeripheral: (peripheral: Peripheral) => void;
  socketPowerControl: (socketId: string, state: 'on' | 'off' | 'r') => void;
  disconnectPeripheral: (peripheralId: string) => void;
  read: (services: PeripheralServices) => Promise<number[]>;
  write: (data: any, services: PeripheralServices) => Promise<void>;
};

declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

type PeripheralServices = {
  peripheralId: string;
  serviceId: string;
  transfer: string;
  receive: string;
};

type BluetoothContextProvider = {
  children: React.ReactNode;
};

export const BluetoothContext = createContext<DefaultContext>({
  read: async () => [],
  write: async () => undefined,
  stopScan: () => undefined,
  isPairing: false,
  isScanning: false,
  socketInfo: {
    SCK0002: undefined,
    SCK0001: undefined,
  },
  peripherals: new Map<Peripheral['id'], Peripheral>(),
  characteristics: undefined,
  socketPowerControl: () => undefined,
  connectPeripheral: () => undefined,
  disconnectPeripheral: () => undefined,
  scanAvailableDevices: () => undefined,
});

export const BluetoothContextProvider: React.FunctionComponent<
  BluetoothContextProvider
> = ({children}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isPairing, setIsPairing] = useState(false);
  const [peripherals, setPeripherals] = useState<Map<string, Peripheral>>(
    new Map<Peripheral['id'], Peripheral>(),
  );
  const [characteristics, setCharacteristics] = useState<
    PeripheralServices | undefined
  >(undefined);
  const [socketInfo, setSocketInfo] = useState<Sockets>({
    SCK0002: undefined,
    SCK0001: undefined,
  });

  const handleLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        );
      } catch (error) {
        Alert.alert('Error requesting location permission');
      }
    }
  };
  useEffect(() => {
    handleLocationPermission();
    BleManager.checkState().then(state => {
      if (state !== 'on') {
        BleManager.enableBluetooth().then(() => {
          showMessage({
            message: 'Bluetooth Enabled ',
            type: 'success',
          });
        });
      }
    });

    BleManager.start({showAlert: false}).then(() => {
      console.info('BleManager initialized');
    });

    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (peripheral: Peripheral) => {
        const wordToMatch = 'Smart Socket BLE';
        const regex = /\s*smart\s*socket\s*ble\s*/i;
        const localName = peripheral.advertising?.localName;
        if (localName && regex.test(localName)) {
          console.info(`Found match for "${wordToMatch}" in localName`);
          setPeripherals(map => {
            return new Map(map.set(peripheral.id, peripheral));
          });
        }
      },
    );

    let stopScanListener = BleManagerEmitter.addListener(
      'BleManagerStopScan',
      () => {
        setIsScanning(false);
      },
    );

    let listenedForUpdates = BleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      () => {
        if (characteristics) {
          read(characteristics);
        }
      },
    );
    BleManager.getConnectedPeripherals([]).then(connectedPeripherals => {
      // Success code
      const discoveredDevice = Array.from(connectedPeripherals.values())[0];
      if (Array.from(peripherals.values()).length < 1 && discoveredDevice) {
        connectPeripheral({
          advertising: discoveredDevice?.advertising,
          id: discoveredDevice?.id,
          rssi: discoveredDevice?.rssi,
        });
        setPeripherals(map => {
          return new Map(map.set(discoveredDevice.id, discoveredDevice));
        });
      }
    });

    return () => {
      listenedForUpdates.remove();
      stopDiscoverListener.remove();
      stopScanListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characteristics]);

  const scanAvailableDevices = () => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
    ).then(() => {
      setPeripherals(new Map());
      if (!isScanning) {
        BleManager.scan([], 1, true)
          .then(() => {
            setIsScanning(true);
          })
          .catch(error => {
            showMessage({
              message: error?.toString(),
              type: 'danger',
            });
          });
      }
    });
  };

  const connectPeripheral = async (peripheral: Peripheral) => {
    try {
      setIsPairing(true);
      if (peripheral) {
        await BleManager.connect(peripheral.id);
        await sleep(900);
        const peripheralData = await BleManager.retrieveServices(peripheral.id);
        if (peripheralData.characteristics) {
          const response = {
            peripheralId: peripheral.id,
            serviceId: peripheralData.characteristics[7].service,
            transfer: peripheralData.characteristics[6].characteristic,
            receive: peripheralData.characteristics[7].characteristic,
          };
          setCharacteristics(response);
          await BleManager.startNotification(
            response.peripheralId,
            response.serviceId,
            response.transfer,
          );
          showMessage({
            message: `Connected to ${peripheral.name ?? peripheral.id} `,
            type: 'success',
            position: 'bottom',
          });
        }
      }
    } catch (error) {
      showMessage({
        message: `[connectPeripheral][${peripheral.id}] connectPeripheral error  ${error}`,
        type: 'danger',
      });
    } finally {
      setIsPairing(false);
    }
  };

  const disconnectPeripheral = async (peripheralId: string) => {
    await BleManager.disconnect(peripheralId);
    setCharacteristics(undefined);
    setPeripherals(new Map());
    setSocketInfo({
      SCK0002: undefined,
      SCK0001: undefined,
    });
    showMessage({
      message: 'Disconnected successfully',
      type: 'success',
      position: 'bottom',
    });
  };

  const stopScan = async () => {
    await BleManager.stopScan();
    setIsScanning(false);
  };

  const write = async (data: any, services: PeripheralServices) => {
    try {
      await BleManager.write(
        services.peripheralId,
        services.serviceId,
        services.receive,
        data,
      );
    } catch (error) {
      Alert.alert(error?.toString() as string);
    }
  };

  const read = async (services: PeripheralServices) => {
    const response = await BleManager.read(
      services.peripheralId,
      services.serviceId,
      services.transfer,
    );

    const formattedPayload = JSON.parse(
      byteToString(response),
    ) as SocketResponse;
    Object.keys(formattedPayload).forEach((field: string) => {
      if (field === Socket.SCK0001) {
        setSocketInfo(info => ({
          ...info,
          SCK0001: formattedPayload[field],
        }));
      }
      if (field === Socket.SCK0002) {
        setSocketInfo(info => ({
          ...info,
          SCK0002: formattedPayload[field],
        }));
      }
    });
    return response;
  };

  const socketPowerControl = async (
    socketId: string,
    state: 'on' | 'off' | 'r',
  ) => {
    let socketCommand = '';
    if (Socket.SCK0001 === socketId) {
      socketCommand = '1';
    }
    if (Socket.SCK0002 === socketId) {
      socketCommand = '2';
    }
    const byteArray = stringToCharCodeArray(
      JSON.stringify({id: socketCommand, c: state}),
    );
    if (characteristics) {
      await write(byteArray, characteristics);
      showMessage({
        message: `Socket ${socketId} successfully ${state}`,
        type: 'success',
        position: 'bottom',
      });
    }
  };

  const contextValues = {
    read,
    write,
    stopScan,
    isPairing,
    isScanning,
    peripherals,
    socketInfo,
    characteristics,
    connectPeripheral,
    socketPowerControl,
    disconnectPeripheral,
    scanAvailableDevices,
  };

  return (
    <BluetoothContext.Provider value={contextValues}>
      {children}
    </BluetoothContext.Provider>
  );
};

export const useBluetoothContext = () => {
  return useContext(BluetoothContext);
};
