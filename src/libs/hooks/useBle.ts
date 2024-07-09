//@ts-ignore
// @ts-nocheck
// import {byteToString} from '@/utils';
import {useEffect, useState} from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import BleManager, {Peripheral} from 'react-native-ble-manager';
import {showMessage} from 'react-native-flash-message';
import {byteToString} from '../utils/binaryFormatters';

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

type UseBle = {
  updateListener?: (value: string) => void;
};

export const useBle = (updateListener?: UseBle['updateListener']) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isPairing, setIsPairing] = useState(false);
  const [peripherals, setPeripherals] = useState<Map<string, Peripheral>>(
    new Map<Peripheral['id'], Peripheral>(),
  );
  const [characteristics, setCharacteristics] = useState<PeripheralServices>({
    peripheralId: '',
    serviceId: '',
    transfer: '',
    receive: '',
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
    console.log('====================================');
    console.log(
      new TextEncoder().encode(JSON.stringify({id: 'SCK0001', cmd: 'on'})),
    );
    console.log('====================================');

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
          console.log(peripheral);
          console.log(`Found match for "${wordToMatch}" in localName`);
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
      ({value}) => {
        console.log(
          '=================BleManagerDidUpdateValueForCharacteristic===================',
        );
        console.log(byteToString(value));
        console.log('====================================');
        // const formatted = byteToString(value);
        // if (formatted === 'error') {
        //   showMessage({
        //     message: 'An Error occurred try again',
        //     type: 'danger',
        //   });
        //   return;
        // }
        if (updateListener) {
          updateListener(formatted);
        }
      },
    );

    return () => {
      listenedForUpdates.remove();
      stopDiscoverListener.remove();
      stopScanListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          setCharacteristics({
            peripheralId: peripheral.id,
            serviceId: peripheralData.characteristics[7].service,
            transfer: peripheralData.characteristics[6].characteristic,
            receive: peripheralData.characteristics[7].characteristic,
          });
          showMessage({
            message: `Connected to ${peripheral.name ?? peripheral.id} `,
            type: 'success',
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
  };

  const stopScan = async () => {
    await BleManager.stopScan();
    setIsScanning(false);
  };

  const write = async (data: any, services: PeripheralServices) => {
    await BleManager.writeWithoutResponse(
      services.peripheralId,
      services.serviceId,
      services.receive,
      data,
    );
    await BleManager.startNotification(
      services.peripheralId,
      services.serviceId,
      services.transfer,
    );
  };

  const read = async (services: PeripheralServices) => {
    const response = await BleManager.read(
      services.peripheralId,
      services.serviceId,
      services.transfer,
    );

    console.log('==========read==========================');
    console.log(byteToString(response));
    console.log('====================================');
    return response;
  };

  return {
    read,
    write,
    stopScan,
    isPairing,
    isScanning,
    peripherals,
    characteristics,
    connectPeripheral,
    disconnectPeripheral,
    scanAvailableDevices,
  };
};
