import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Dashboard} from './Dashboard';
import {AddDeviceScreen, DeviceDetailsScreen, SignInScreen} from '@/screens';
import {useAuthContext} from '@/libs/context';

const RootStack = createNativeStackNavigator<any>();
const MainStack = createNativeStackNavigator<any>();
const AuthStack = createNativeStackNavigator<any>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name="Dashboard" component={Dashboard} />
      <MainStack.Screen name="AddDevice" component={AddDeviceScreen} />
      <MainStack.Screen name="DeviceDetails" component={DeviceDetailsScreen} />
    </MainStack.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
    </AuthStack.Navigator>
  );
};

export const RootNavigator: React.FunctionComponent = () => {
  const {isAuthenticated} = useAuthContext();
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <RootStack.Screen name="Main" component={MainNavigator} />
      ) : (
        <RootStack.Screen name="Auth" component={AuthNavigator} />
      )}
    </RootStack.Navigator>
  );
};
