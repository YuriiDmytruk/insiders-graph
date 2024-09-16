import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CovidData } from './types';

export const covidApi = createApi({
  reducerPath: 'covidApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.api-ninjas.com',
    prepareHeaders: (headers) => {
      headers.set('X-Api-Key', 'FZ/AKic+o4S4M8w6uUkbDA==m9YD4yHpLhWnTHuj');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCovidDataByCountry: builder.query<CovidData[], string>({
      query: (country) => ({
        url: '/v1/covid19',
        params: {
          country: country,
        },
      }),
    }),
  }),
});

export const { useGetCovidDataByCountryQuery } = covidApi;
