import { configureStore } from '@reduxjs/toolkit';
// reducer
import weatherReducer from './weatherSlice';
import cityReducer from './citySearchSlice';
import hourlyWeatherSlice from './hourlyWeatherSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: {
    cities: cityReducer,
    weather: weatherReducer,
    hourlyWeather: hourlyWeatherSlice,
  },
});

export default store;
