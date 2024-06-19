import {theme} from '@/libs/config/theme';
import {heightPixel} from '@/libs/utils';
import React from 'react';
import {LineChart} from 'react-native-gifted-charts';

export const EnergyUsageChart: React.FunctionComponent = () => {
  const {
    colors: {orange, yellow, gray},
  } = theme;
  const labelTextStyle = {color: gray[600], fontSize: 12};
  const lineData = [
    {value: 0, label: 'Mon', spacing: 5, labelTextStyle},
    {value: 10, label: 'Tue', labelTextStyle},
    {value: 8, label: 'Wed', labelTextStyle},
    {value: 20, label: 'Thur', labelTextStyle},
    {value: 28, label: 'Fri', labelTextStyle},
    {value: 30, label: 'Sat', labelTextStyle},
    {value: 10, label: 'Sun', labelTextStyle},
  ];

  const lineData2 = [
    {value: 0, label: 'Mon', labelTextStyle},
    {value: 20, label: 'Tue', labelTextStyle},
    {value: 8, label: 'Wed', labelTextStyle},
    {value: 30, label: 'Thur', labelTextStyle},
    {value: 10, label: 'Fri', labelTextStyle},
    {value: 24, label: 'Sat', labelTextStyle},
    {value: 30, label: 'Sun', labelTextStyle},
  ];
  return (
    <LineChart
      spacing={45}
      data={lineData}
      data2={lineData2}
      initialSpacing={5}
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
