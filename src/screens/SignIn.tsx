import {Alert, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {Button, Typography} from '@/components/common';
import {useThemedStyles} from '@/libs/hooks';
import {FormGroup} from '@/components/common/form-group';
import * as Yup from 'yup';
import {Theme} from '@/libs/config/theme';
import {
  USER_SESSION,
  fontPixel,
  pixelSizeHorizontal,
  pixelSizeVertical,
  saveToAsyncStore,
} from '@/libs/utils';
import {useAuthContext} from '@/libs/context';
import {Formik} from 'formik';

export const SignInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required!').trim(),
  password: Yup.string().required('Password is required!').trim(),
});

const USER_EMAIL = '';
const USER_PASSWORD = '';

const formInitialValues = {
  email: USER_EMAIL,
  password: USER_PASSWORD,
};

export const SignInScreen: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {updateUser} = useAuthContext();
  const style = useThemedStyles(styles);

  const handleLogin = async (payload: typeof formInitialValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    if (
      payload.email.toLocaleLowerCase() !== USER_EMAIL.toLocaleLowerCase() ||
      payload.password !== USER_PASSWORD
    ) {
      Alert.alert('Incorrect email or password');
      return;
    }
    const user = {
      email: payload.email,
      firstName: 'Nicanor',
      lastName: 'Forcka MBATCHOU',
    };
    await saveToAsyncStore(USER_SESSION, user);
    updateUser(user);
  };
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Typography style={style.title}>Smart Socket Controller</Typography>
      </View>
      <Formik
        enableReinitialize={true}
        initialValues={formInitialValues}
        onSubmit={handleLogin}
        validationSchema={SignInSchema}>
        {({
          values,
          isValid,
          errors,
          handleChange,
          setFieldTouched,
          handleSubmit,
        }) => (
          <>
            <View style={style.space}>
              <FormGroup
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                value={values.email}
                editable={!isLoading}
                errorMessage={errors.email}
                placeholder="Enter email"
              />
            </View>
            <View>
              <FormGroup
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                value={values.password}
                editable={!isLoading}
                errorMessage={errors.password}
                placeholder="Enter password"
                usePassword={true}
              />
            </View>
            <Button
              loading={isLoading}
              disabled={!isValid || isLoading}
              onPress={() => {
                handleSubmit();
              }}
              style={style.button}
              variant="filled">
              Login In
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = ({colors, fontSize, fonts}: Theme) => {
  return StyleSheet.create({
    space: {
      marginBottom: pixelSizeVertical(24),
    },
    error: {
      color: colors.red[100],
      marginBottom: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: pixelSizeVertical(24),
    },
    title: {
      fontSize: fontPixel(fontSize.xxl),
      fontFamily: fonts.ManropeBold,
      fontWeight: '700',
      textAlign: 'center',
    },
    button: {
      marginTop: pixelSizeVertical(40),
    },
    container: {
      flex: 1,
      paddingVertical: pixelSizeVertical(16),
      paddingHorizontal: pixelSizeHorizontal(16),
      backgroundColor: colors.white[100],
      justifyContent: 'center',
    },
    text: {
      color: colors.gray[200],
      fontSize: fontPixel(fontSize.s),
      marginLeft: pixelSizeHorizontal(4),
    },
  });
};
