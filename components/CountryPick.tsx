import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {Country, CountryCode, defaultCountry} from '../country-types';
import {useDispatch} from 'react-redux';
import {useGetCovidDataByCountryQuery} from '../redux/covidApi';
import { updateCountry, updateData, updateStatus } from '../redux/slices/covidData';

const CountryPick = () => {
  const [country, setCountry] = useState<Country>(defaultCountry);
  const [countryCode, setCountryCode] = useState<CountryCode>(defaultCountry.cca2);

  const onSelect = (value: Country) => {
    setCountryCode(value.cca2);
    setCountry(value);
  };

  const { data, isFetching } = useGetCovidDataByCountryQuery(country.name.toString().toLocaleLowerCase());


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateStatus(isFetching));
    if(data){
      dispatch(updateCountry(country));
      dispatch(updateData(data));
    }
  }, [data, isFetching, country, dispatch]);

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
