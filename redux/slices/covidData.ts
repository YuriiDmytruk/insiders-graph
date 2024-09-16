import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CovidData } from '../types';
import { Country, defaultCountry } from '../../types/country-types';

type CovidDataType = {
  data: CovidData[];
  country: Country;
  isFetching: boolean;
}

const initialState: CovidDataType = {
  data: [],
  country: defaultCountry,
  isFetching: true,
};

const covidData = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateData: (state, action: PayloadAction<CovidData[]>) => {
      state.data = action.payload;
    },
    updateCountry: (state, action: PayloadAction<Country>) => {
      state.country = action.payload;
    },
    updateStatus: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  updateData,
  updateCountry,
  updateStatus,
} = covidData.actions;

export default covidData.reducer;
