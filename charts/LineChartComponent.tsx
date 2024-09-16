import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {Case, CovidData} from '../redux/types';
import NoData from '../components/NoData';
import Loading from '../components/Loading';
import {ScrollView} from 'react-native-gesture-handler';

type lineDataItem = {
  value: number;
  label: string;
};

const LineChartComponent = () => {
  const {data, isFetching} = useSelector((state: RootState) => state.covidData);
  const [regionIndex, setRegionIndex] = useState<number>(0);

  const [dataTotal, setDataTotal] = useState<lineDataItem[]>([]);
  const [dataNew, setDataNew] = useState<lineDataItem[]>([]);

  const setRegion = (region: string) => {
    console.log(region);
    setRegionIndex(
      data.findIndex((element: CovidData) => element.region === region),
    );
  };

  useEffect(() => {
    const createDataTotal = (): lineDataItem[] => {
      return data[regionIndex].cases.map((element: Case) => ({
        value: element.total,
        label: element.date,
      }));
    };

    const createDataNew = (): lineDataItem[] => {
      return data[regionIndex].cases.map((element: Case) => ({
        value: element.new,
        label: element.date,
      }));
    };
    if (data[regionIndex]?.cases) {
      setDataNew(createDataNew());
      setDataTotal(createDataTotal());
    }
  }, [regionIndex, data]);

  return (
    <ScrollView style={styles.container}>
      {isFetching ? (
        <Loading />
      ) : data[0]?.cases ? (
        <View>
          <LineChart data={dataTotal} data2={dataNew} />
          <View style={styles.button_container}>
            {data.length > 0 &&
              data.map((element: CovidData) => (
                <TouchableOpacity
                  key={element.region} // Added key prop for list rendering
                  style={styles.button}
                  onPress={() => setRegion(element.region)}>
                  <Text style={styles.button_text}>
                    {element.region === '' ? 'All' : element.region}
                  </Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>
      ) : (
        <NoData />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 30,
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

export default LineChartComponent;
