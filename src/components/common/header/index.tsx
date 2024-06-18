import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Avatar} from '../avatar';
import {Button} from '../button';
import {BluetoothRoundedIcon, HomeRoundedIcon} from '../icons';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';

interface HeaderProps {
  title?: string;
  showHomeIcon?: boolean;
  buttonStyles?: StyleProp<ViewStyle>;
  buttonTextStyles?: StyleProp<TextStyle>;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  buttonStyles,
  title,
  showHomeIcon,
  buttonTextStyles,
}) => {
  const style = useThemedStyles(styles);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();
  const navigateToDashboard = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={style.container}>
      {showHomeIcon ? (
        <TouchableOpacity onPress={navigateToDashboard}>
          <HomeRoundedIcon />
        </TouchableOpacity>
      ) : (
        <Avatar />
      )}
      <Button style={[style.btn, buttonStyles]} textStyles={buttonTextStyles}>
        {title ?? 'Israel Obanijesu'}
      </Button>
      <TouchableOpacity onPress={() => navigation.navigate('AddDevice')}>
        <BluetoothRoundedIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.white[100],
    },
    btn: {
      flexBasis: '60%',
    },
  });
};
