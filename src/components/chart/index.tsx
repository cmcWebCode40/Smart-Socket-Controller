import {theme} from '@/libs/config/theme';
import {useBluetoothContext} from '@/libs/context';
import {heightPixel} from '@/libs/utils';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {Typography} from '../common';

interface SocketInfo {
  current: number;
  energy: number;
  frequency: number;
  id: string;
  pf: number;
  power: number;
  status: 'on' | 'off';
  voltage: number;
  timeStamp?: string;
}

export const EnergyUsageChart: React.FunctionComponent = () => {
  const {
    colors: {orange, yellow, gray},
  } = theme;

  const {socketInfo} = useBluetoothContext();

  const [socket1Data, setSocket1Data] = useState<SocketInfo[]>([]);
  const [socket2Data, setSocket2Data] = useState<SocketInfo[]>([]);

  useEffect(() => {
    if (
      (!socketInfo.SCK0001 && socketInfo.SCK0002) ||
      (!socketInfo.SCK0002 && socketInfo.SCK0001)
    ) {
      const socketData = socketInfo.SCK0001 || socketInfo.SCK0002;
      setSocket1Data(prevData => [
        ...prevData,
        ...(Array.isArray(socketData) ? socketData : [socketData]),
      ]);
    }
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
    value: data.energy,
    label: `${data.timeStamp ?? ''}`,
  }));

  const socket2PowerData = socket2Data.map(data => ({
    value: data.energy,
    label: `${data.timeStamp ?? ''}`,
  }));

  if (
    (!socketInfo.SCK0001 && socketInfo.SCK0002) ||
    (!socketInfo.SCK0002 && socketInfo.SCK0001)
  ) {
    return (
      <View style={styles.container}>
        <Typography style={[styles.rotate, styles.text]}>
          Energy(Kwh)
        </Typography>
        <View>
          <LineChart
            width={300}
            data={socket1PowerData}
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
          <Typography style={[styles.text]}>Time</Typography>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Typography style={[styles.rotate, styles.text]}>Energy(Kwh)</Typography>
      <View>
        <LineChart
          width={300}
          data={socket1PowerData}
          data2={socket2PowerData}
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
          style={styles.chart}
        />
        <Typography style={[styles.text]}>Time</Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    flexBasis: '10%',
  },
  rotate: {
    transform: [{rotate: '-90deg'}],
  },
  chart: {},
});
