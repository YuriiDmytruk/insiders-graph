import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import {CovidData} from '../redux/types';
import Info from '../components/Info';

type pieDataItem = {
  value: number;
  text: string;
  onPress: (label: string, value: number) => void;
};

const PieChartComponent = () => {
  const {data, isFetching} = useSelector((state: RootState) => state.covidData);
  const [chartData, setCahrtData] = useState<pieDataItem[]>([]);

  const [filter, setFilter] = useState<'new' | 'total'>('total');

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{label: string; value: number}>({
    label: '',
    value: 0,
  });

  const handleItemPress = (label: string, value: number): void => {
    setModalData({
      label,
      value,
    });
    setOpenModal(true);
  };

  useEffect(() => {
    const prepareData = (): pieDataItem[] => {
      return data.map((element: CovidData) => {
        const value =
          element.region === ''
            ? 0
            : element.cases.reduce(
                (accumulator, currentValue) =>
                  accumulator + currentValue[filter],
                0,
              );
        return {
          text: element.region,
          value: value,
          onPress: () => handleItemPress(element.region, value),
        };
      });
    };

    if (data[0]?.cases) {
      setCahrtData(prepareData());
    }
  }, [filter, data]);

  return (
    <View style={styles.container}>
      {openModal && (
        <Info
          close={() => {
            setOpenModal(false);
          }}
          {...modalData}
        />
      )}
      {isFetching ? (
        <Loading />
      ) : data[0]?.cases ? (
        <View style={styles.chart_container}>
          <PieChart
            data={chartData}
            labelsPosition="onBorder"
            showText={true}
          />
          <View style={styles.button_container}>
            <TouchableOpacity
              style={
                filter === 'total'
                  ? [styles.button, styles.active_button]
                  : styles.button
              }
              onPress={() => setFilter('total')}>
              <Text
                style={
                  filter === 'total'
                    ? [styles.button_text, styles.active_button_text]
                    : styles.button_text
                }>
                Total
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                filter === 'new'
                  ? [styles.button, styles.active_button]
                  : styles.button
              }
              onPress={() => setFilter('new')}>
              <Text
                style={
                  filter === 'new'
                    ? [styles.button_text, styles.active_button_text]
                    : styles.button_text
                }>
                New
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <NoData />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 30,
  },
  chart_container: {
    width: '100%',
    alignItems: 'center',
  },
  button_container: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderColor: '#2525f5',
    borderRadius: 10,
    borderWidth: 1,
  },
  button_text: {
    fontSize: 15,
    color: '#2525f5',
  },
  active_button_text: {
    color: '#FFF',
  },
  active_button: {
    backgroundColor: '#2525f5',
  },
});

export default PieChartComponent;
