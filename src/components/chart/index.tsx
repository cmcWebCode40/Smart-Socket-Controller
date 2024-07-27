import {theme} from '@/libs/config/theme';
import {useBluetoothContext} from '@/libs/context';
import {heightPixel} from '@/libs/utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';

interface SocketInfo {
  current: number;
  energy: number;
  frequency: number;
  id: string;
  pf: number;
  power: number;
  status: 'on' | 'off';
  voltage: number;
}
export const EnergyUsageChart: React.FunctionComponent = () => {
  const {
    colors: {orange, yellow, gray},
  } = theme;

  const {socketInfo} = useBluetoothContext();

  const [socket1Data, setSocket1Data] = useState<SocketInfo[]>([]);
  const [socket2Data, setSocket2Data] = useState<SocketInfo[]>([]);

  useEffect(() => {
    if (socketInfo.SCK0001) {
      setSocket1Data(prevData => [
        ...prevData,
        ...(Array.isArray(socketInfo.SCK0001)
          ? socketInfo.SCK0001
          : [socketInfo.SCK0001]),
      ]);
    }
    if (socketInfo.SCK0002) {
      setSocket2Data(prevData => [
        ...prevData,
        ...(Array.isArray(socketInfo.SCK0002)
          ? socketInfo.SCK0002
          : [socketInfo.SCK0002]),
      ]);
    }
  }, [socketInfo.SCK0001, socketInfo.SCK0002]);

  const socket1PowerData = socket1Data.map(data => ({
    value: data.power,
  }));
  const socket2PowerData = socket2Data.map(data => ({
    value: data.power,
  }));

  return (
    <View style={styles.container}>
      <LineChart
        data={socket1PowerData}
        data2={socket2PowerData}
        width={300}
        initialSpacing={5}
        color2={yellow[100]}
        color1={orange[400]}
        dataPointsHeight={6}
        dataPointsWidth={6}
        noOfSections={5}
        yAxisColor={gray[400]}
        rulesColor={gray[300]}
        xAxisColor={gray[400]}
        height={heightPixel(200)}
        dataPointsColor1={orange[400]}
        dataPointsColor2={yellow[100]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
