import {SocketIdentifiers} from '@/libs/types';

export type MainStackScreens = {
  Account: undefined;
  AddDevice: undefined;
  Devices: undefined;
  Dashboard: undefined;
  DeviceDetails?: {
    socketId: SocketIdentifiers;
  };
};

export type RootStackScreens = {
  Main: MainStackScreens;
  Auth: {
    SignIn: undefined;
  };
};
