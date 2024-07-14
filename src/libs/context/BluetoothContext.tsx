import React, {createContext, useContext, useEffect, useState} from 'react';
import {showMessage} from 'react-native-flash-message';
import {byteToString} from '../utils/binaryFormatters';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SocketResponse, Sockets} from '../types';

type DefaultContext = {
  stopScan: () => void;
  isPairing: boolean;
  isScanning: boolean;
  socketInfo?: Sockets;
  scanAvailableDevices: () => void;
  peripherals: Map<string, Peripheral>;
  characteristics?: PeripheralServices;
  connectPeripheral: (peripheral: Peripheral) => void;
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
      console.log('BleManager initialized');
    });

    let stopDiscoverListener = BleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      (peripheral: Peripheral) => {
        const wordToMatch = 'Smart Socket BLE';
        const regex = /\s*smart\s*socket\s*ble\s*/i;
        const localName = peripheral.advertising?.localName;
        if (localName && regex.test(localName)) {
          console.log(`Found match for "${wordToMatch}" in localName`);
          console.log(peripheral);
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
      console.log('scanAvailableDevices');
      if (!isScanning) {
        BleManager.scan([], 1, true)
          .then(() => {
            setIsScanning(true);
          })
          .catch(error => {
            console.error(error);
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
    console.log(services);
    try {
      await BleManager.write(
        services.peripheralId,
        services.serviceId,
        services.receive,
        data,
      );
    } catch (error) {
      console.log('============error========================');
      console.log(error);
      console.log('====================================');
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
      setSocketInfo(info => ({
        ...info,
        [field]: formattedPayload[field],
      }));
    });
    console.log('============formattedPayload========================');
    console.log(formattedPayload);
    console.log('====================================');
    return response;
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
