import { configureStore } from '@reduxjs/toolkit';
// reducer
import weatherReducer from '../redux/weatherSlice';
import hourlyWeatherSlice from './hourlyWeatherSlice';

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
const store = configureStore({
  reducer: {
    weather: weatherReducer,
    hourlyWeather: hourlyWeatherSlice,
  },
});

export default store;
