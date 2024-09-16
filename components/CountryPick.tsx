import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Country, CountryCode, defaultCountry} from '../country-types';
import {useDispatch} from 'react-redux';
import {useGetCovidDataByCountryQuery} from '../redux/covidApi';
import { updateCountry, updateData, updateStatus } from '../redux/slices/covidData';
import { CovidData, CovidDataQuery } from '../redux/types';

const CountryPick = () => {
  const [currentCountry, setCurrentCountry] = useState<Country>(defaultCountry);
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountry.cca2);

  const onSelect = (value: Country) => {
    setCountryCode(value.cca2);
    setCurrentCountry(value);
  };

  const { data, isFetching } = useGetCovidDataByCountryQuery(currentCountry.name.toString().toLocaleLowerCase());


  const dispatch = useDispatch();

  const mapCasesToArray = (_data: CovidDataQuery[]): CovidData[] => {
    return _data.map(({ country, region, cases }) => ({
      country,
      region,
      cases: Object.entries(cases).map(([date, caseData]) => ({
        date,
        ...caseData,
      })),
    }));
  };

  useEffect(() => {
    dispatch(updateStatus(isFetching));
    if(data){
      dispatch(updateCountry(currentCountry));
      dispatch(updateData(mapCasesToArray(data)));
    }
  }, [data, isFetching, currentCountry, dispatch]);

  return (
    <View style={styles.container}>
      <CountryPicker
        {...{
          countryCode,
          withFilter: true,
          withFlag: true,
          withCountryNameButton: true,
          withAlphaFilter: true,
          withCallingCode: false,
          withEmoji: true,
          onSelect,
        }}
        visible
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
});

export default CountryPick;
