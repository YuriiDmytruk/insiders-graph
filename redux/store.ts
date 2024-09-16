import { configureStore } from '@reduxjs/toolkit';
import { covidApi } from './covidApi';
import covidData from './slices/covidData';

export const store = configureStore({
  reducer: {
    covidData: covidData,
    [covidApi.reducerPath]: covidApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(covidApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
