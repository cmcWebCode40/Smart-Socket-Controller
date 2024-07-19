import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootNavigator} from '@/navigation';
import FlashMessage from 'react-native-flash-message';
import {AuthProvider, BluetoothContextProvider} from '@/libs/context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BluetoothContextProvider>
          <NavigationContainer>
            <StatusBar barStyle={'default'} />
            <RootNavigator />
          </NavigationContainer>
          <FlashMessage position="top" />
        </BluetoothContextProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;
