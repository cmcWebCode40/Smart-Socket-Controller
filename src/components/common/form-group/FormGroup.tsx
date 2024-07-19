import {
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {ClosedEyeIcon, OpenEyeIcon} from '../icons';
import {Typography} from '../typography';
import {Theme} from '@/libs/config/theme';
import {fontPixel, pixelSizeVertical} from '@/libs/utils';
import {TextField} from './TextField';
import {useThemedStyles} from '@/libs/hooks';

interface FormGroupProps extends TextInputProps {
  label?: string;
  ref?: React.LegacyRef<TextInput>;
  errorMessage?: string;
  usePassword?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<TextStyle>;
}

export const FormGroup: React.FunctionComponent<FormGroupProps> = ({
  label,
  labelStyle,
  inputStyle,
  usePassword = false,
  errorMessage,
  containerStyle,
  ...otherTextInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const style = useThemedStyles(styles);

  return (
    <View style={containerStyle}>
      {label && (
        <Typography variant="b1" style={[style.label, labelStyle]}>
          {label}
        </Typography>
      )}
      <View style={[style.inputContainer, inputStyle]}>
        <TextField
          style={[style.input, inputStyle]}
          secureTextEntry={usePassword ? !showPassword : undefined}
          {...otherTextInputProps}
        />
        {usePassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? <ClosedEyeIcon /> : <OpenEyeIcon />}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage && (
        <Typography style={style.error} variant="b2">
          {errorMessage}
        </Typography>
      )}
    </View>
  );
};

const styles = (theme: Theme) => {
  return StyleSheet.create({
    label: {
      marginBottom: pixelSizeVertical(10),
      fontWeight: '600',
      fontSize: fontPixel(theme.fontSize.l),
      textTransform: 'capitalize',
      color: theme.colors.black[300],
      fontFamily: theme.fonts.ManropeRegular,
    },
    error: {
      color: theme.colors.red[200],
      marginTop: 4,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: theme.radius.lg,
      backgroundColor: theme.colors.white[300],
    },
    input: {
      flexBasis: '92%',
      fontSize: fontPixel(theme.fontSize.l),
      color: theme.colors.black[200],
    },
    showPasswordText: {
      fontWeight: '700',
      fontFamily: theme.fonts.ManropeSemibold,
      color: theme.colors.black[100],
    },
  });
};
