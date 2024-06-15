import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RootStackScreens} from './type';
import {Dashboard} from './Dashboard';
import {AddDeviceScreen, DeviceDetailsScreen} from '@/screens';

const Stack = createNativeStackNavigator<RootStackScreens>();

export const RootNavigator: React.FunctionComponent = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
      <Stack.Screen name="DeviceDetails" component={DeviceDetailsScreen} />
    </Stack.Navigator>
  );
};
