import {View, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Theme} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import {EnergyDeviceCard} from '@/components/energy-device-cards';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';

type State = 'offline' | 'online';

export const DevicesScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();

  const handleViewDetails = () => {
    navigation.navigate('DeviceDetails');
  };

  return (
    <View style={style.container}>
      <View style={style.content}>
        <FlatList
          data={['offline', 'online'] as State[]}
          renderItem={({item}) => (
            <View style={style.deviceItem} key={item}>
              <EnergyDeviceCard
                state={item}
                onViewDetails={handleViewDetails}
              />
            </View>
          )}
        />
      </View>
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
    content: {
      marginTop: pixelSizeVertical(48),
    },
    deviceItem: {
      marginBottom: pixelSizeVertical(40),
    },
  });
};
