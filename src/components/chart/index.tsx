import {theme} from '@/libs/config/theme';
import {heightPixel} from '@/libs/utils';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';

export const EnergyUsageChart: React.FunctionComponent = () => {
  const {
    colors: {orange, yellow, gray},
  } = theme;
  const lineData = [
    {value: 0, label: 'Mon'},
    {value: 10, label: 'Tue'},
    {value: 8, label: 'Wed'},
    {value: 20, label: 'Thur'},
    {value: 28, label: 'Fri'},
    {value: 30, label: 'Sat'},
    {value: 10, label: 'Sun'},
  ];

  const lineData2 = [
    {value: 0, label: 'Mon'},
    {value: 20, label: 'Tue'},
    {value: 8, label: 'Wed'},
    {value: 30, label: 'Thur'},
    {value: 10, label: 'Fri'},
    {value: 24, label: 'Sat'},
    {value: 30, label: 'Sun'},
  ];
  return (
    <LineChart
      spacing={50}
      data={lineData}
      data2={lineData2}
      textShiftY={-2}
      textShiftX={-5}
      textFontSize={13}
      initialSpacing={0}
      color2={yellow[100]}
      color1={orange[400]}
      dataPointsHeight={6}
      dataPointsWidth={6}
      noOfSections={4}
      yAxisColor={gray[400]}
      rulesColor={gray[300]}
      xAxisColor={gray[400]}
      height={heightPixel(200)}
      dataPointsColor1={orange[400]}
      dataPointsColor2={yellow[100]}
    />
  );
};
