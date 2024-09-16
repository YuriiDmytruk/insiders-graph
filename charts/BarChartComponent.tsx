import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import Loading from '../components/Loading';
import NoData from '../components/NoData';
import {Case, CovidData} from '../redux/types';

type barDataItem = {
  value: number;
  label: string;
};

const defaultData: barDataItem[] = [{value: 0.0001, label: ''}];

const BarChartComponent = () => {
  const {data, isFetching} = useSelector((state: RootState) => state.covidData);
  const [chartData, setChartData] = useState<barDataItem[]>(defaultData);

  const [filterData, setFilterData] = useState<'new' | 'total'>('total');
  const [filterType, setFilterType] = useState<'days' | 'region'>('region');

  useEffect(() => {
    const prepareData = (): barDataItem[] => {
      if (filterType === 'days') {
        const allIndex = data.findIndex(
          (element: CovidData) => element.region === '',
        );
        if (allIndex !== -1) {
          const chartItems = data[allIndex].cases.map((element: Case) => {
            const value = filterData === 'total' ? element.total : element.new;
            return {
              value: isNaN(value) ? defaultData[0].value : value,
              label: element.date,
            };
          });
          return chartItems;
        }
      }
      if (filterType === 'region') {
        return data.map((element: CovidData) => {
          return {
            label: element.region,
            value:
              element.region === ''
                ? defaultData[0].value
                : element.cases.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue[filterData],
                    0,
                  ),
          };
        });
      }

      return defaultData;
    };
    if (data[0]?.cases) {
      setChartData(prepareData());
    }
  }, [filterData, filterType, data]);

  return (
    <View style={styles.container}>
      {isFetching ? (
        <Loading />
      ) : data[0]?.cases ? (
        <View style={styles.chart_container}>
          <BarChart data={chartData} />
          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFilterData('total')}>
              <Text style={styles.button_text}>Total</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFilterData('new')}>
              <Text style={styles.button_text}>New</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button_container}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFilterType('region')}>
              <Text style={styles.button_text}>Regions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setFilterType('days')}>
              <Text style={styles.button_text}>Days</Text>
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
});

export default BarChartComponent;
