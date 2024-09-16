import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { Country, CountryCode } from '../types/country-types';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCovidDataByCountryQuery } from '../redux/covidApi';
import { updateCountry, updateData, updateStatus } from '../redux/slices/covidData';
import { CovidData, CovidDataQuery } from '../redux/types';
import { RootState } from '../redux/store';

const CountryPick = () => {
  const _country = useSelector((state: RootState) => state.covidData.country);
  const [currentCountry, setCurrentCountry] = useState<Country>(_country);
  const [countryCode, setCountryCode] = useState<CountryCode>(_country.cca2);
  const [pickerVisible, setPickerVisible] = useState(false); // State for picker visibility

  const onSelect = (value: Country) => {
    setCountryCode(value.cca2);
    setCurrentCountry(value);
    setPickerVisible(false); // Hide picker after selection
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
    if (data) {
      dispatch(updateCountry(currentCountry));
      dispatch(updateData(mapCasesToArray(data)));
    }
  }, [data, isFetching, currentCountry, dispatch]);

  return (
    <View style={styles.container}>
      <CountryPicker
        countryCode={countryCode}
        withFilter={true}
        withFlag={true}
        withCountryNameButton={true}
        withAlphaFilter={true}
        withCallingCode={false}
        withEmoji={true}
        onSelect={onSelect}
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)} // Close picker on outside click or pressing close
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
  pickerButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  pickerText: {
    fontSize: 16,
  },
});

export default CountryPick;
