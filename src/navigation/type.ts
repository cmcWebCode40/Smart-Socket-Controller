import {SocketIdentifiers} from '@/libs/types';

export type RootStackScreens = {
  Account: undefined;
  AddDevice: undefined;
  Devices: undefined;
  Dashboard: undefined;
  DeviceDetails: {
    socketId: SocketIdentifiers;
  };
};
