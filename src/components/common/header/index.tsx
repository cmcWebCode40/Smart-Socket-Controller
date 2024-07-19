import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Button} from '../button';
import {AccountIcon, BluetoothRoundedIcon, HomeRoundedIcon} from '../icons';
import {useThemedStyles} from '@/libs/hooks';
import {Theme} from '@/libs/config/theme';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackScreens} from '@/navigation/type';
import {useAuthContext} from '@/libs/context';

interface HeaderProps {
  title?: string;
  showHomeIcon?: boolean;
  buttonStyles?: StyleProp<ViewStyle>;
  buttonTextStyles?: StyleProp<TextStyle>;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  buttonStyles,
  showHomeIcon,
  buttonTextStyles,
}) => {
  const style = useThemedStyles(styles);
  const {user} = useAuthContext();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackScreens>>();
  const navigateToDashboard = () => {
    navigation.navigate<any>('Main', {screen: 'Dashboard'});
  };
  return (
    <View style={style.container}>
      {showHomeIcon ? (
        <TouchableOpacity onPress={navigateToDashboard}>
          <HomeRoundedIcon />
        </TouchableOpacity>
      ) : (
        <AccountIcon size={44} />
      )}
      <Button style={[style.btn, buttonStyles]} textStyles={buttonTextStyles}>
        {user?.firstName} {user?.lastName}
      </Button>
      <TouchableOpacity
        onPress={() => navigation.navigate<any>('Main', {screen: 'AddDevice'})}>
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
