/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {theme as themes} from '@/libs/config/theme';
import {useThemedStyles} from '@/libs/hooks';
import {AccountScreen, DevicesScreen, HomeScreen} from '@/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, TextStyle} from 'react-native';
import {HomeIcon} from '@/components/common/icons/Home';
import {AccountIcon, AddIcon, Typography} from '@/components/common';
import {heightPixel, pixelSizeVertical} from '@/libs/utils';

const Tab = createBottomTabNavigator();

type TabBarLabelProps = {
  focused: boolean;
};

export const Dashboard = () => {
  const {tabBarStyle} = useThemedStyles(styles);
  const tabLabelStyle = (focused: boolean): TextStyle => ({
    fontWeight: '500',
    fontSize: themes.fontSize.s,
    fontFamily: themes.fonts.ManropeSemibold,
    borderBottomWidth: 3,
    width: '75%',
    margin: 'auto',
    textAlign: 'center',
    marginBottom: 10,
    paddingVertical: pixelSizeVertical(4),
    borderBottomColor: focused
      ? themes.colors.orange[400]
      : themes.colors.white[100],
    color: focused ? themes.colors.orange[400] : themes.colors.gray[600],
  });

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
      }}>
      {tabs.map(item => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.name,
            tabBarLabel: ({focused}: TabBarLabelProps) => (
              <Typography variant="b2" style={tabLabelStyle(focused)}>
                {item.name}
              </Typography>
            ),
            tabBarIcon: item.icon,
          }}
          component={item.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const updateIconColor = (focused: boolean) => {
  return focused ? themes.colors.orange[400] : themes.colors.gray[600];
};

const tabs = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: ({focused}: TabBarLabelProps) => (
      <HomeIcon color={updateIconColor(focused)} />
    ),
  },
  {
    name: 'Devices',
    component: DevicesScreen,
    icon: ({focused}: TabBarLabelProps) => (
      <AddIcon color={updateIconColor(focused)} />
    ),
  },
  {
    name: 'Account',
    component: AccountScreen,
    icon: ({focused}: TabBarLabelProps) => (
      <AccountIcon color={updateIconColor(focused)} />
    ),
  },
];

const styles = () => {
  return StyleSheet.create({
    tabBarStyle: {
      elevation: 0,
      borderTopWidth: 0,
      minHeight: heightPixel(65),
    },
  });
};
