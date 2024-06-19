import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {
  BluetoothAudioIcon,
  Button,
  HomeRoundedIcon,
  Typography,
} from '@/components/common';
import {pixelSizeHorizontal, pixelSizeVertical} from '@/libs/utils';
import PrintedCircuitBoardImage from '../../assets/images/pc_board.png';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';

export const AddDeviceScreen: React.FunctionComponent = () => {
  const style = useThemedStyles(styles);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();
  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={style.container}>
      <Button
        style={style.button}
        textStyles={style.buttonText}
        variant="outlined">
        Add Device
      </Button>
      <View style={style.bleIcon}>
        <BluetoothAudioIcon />
      </View>
      <View style={[style.content, style.boxShadow]}>
        <View style={[style.innerContent, style.boxShadow]}>
          <Typography style={style.scanText}>1 Device Found</Typography>
          <Image source={PrintedCircuitBoardImage} style={style.image} />
          <Typography style={style.bleText}>ESP32 HUB BLE</Typography>
        </View>
      </View>
      <TouchableOpacity style={style.homeIcon} onPress={navigateToDashboard}>
        <HomeRoundedIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(32),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: theme.colors.white[100],
    },
    boxShadow: {
      shadowOffset: {
        width: 0,
        height: 8,
      },
      shadowOpacity: 0.4,
      shadowRadius: 5.5,
      elevation: 4,
      shadowColor: theme.colors.black[100],
      backgroundColor: theme.colors.white[100],
    },
    content: {
      height: 315,
      width: 315,
      marginHorizontal: 'auto',
      marginTop: '25%',
      borderWidth: 2,
      borderStyle: 'dashed',
      borderRadius: theme.radius.full,
      borderColor: theme.colors.orange[400],
    },
    innerContent: {
      height: 300,
      width: 300,
      margin: 'auto',
      borderWidth: 2,
      borderStyle: 'dashed',
      borderRadius: theme.radius.full,
      borderColor: theme.colors.orange[400],
    },
    image: {
      height: 200,
      width: 200,
      margin: 'auto',
    },
    button: {
      width: '60%',
      marginHorizontal: 'auto',
      borderColor: theme.colors.orange[400],
    },
    buttonText: {
      color: theme.colors.black[200],
    },
    bleText: {
      margin: 'auto',
      marginTop: '0%',
      marginBottom: '10%',
    },
    scanText: {
      marginTop: '10%',
      marginHorizontal: 'auto',
      marginBottom: '0%',
      color: theme.colors.gray[500],
    },
    homeIcon: {
      marginTop: pixelSizeVertical(24),
    },
    bleIcon: {
      position: 'absolute',
      top: '40%',
      zIndex: 999,
      marginLeft: pixelSizeHorizontal(4),
    },
  });
};
