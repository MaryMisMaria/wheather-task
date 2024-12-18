import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// types
import { HourlyWeatherState } from '../types';
// endpoints
import { API_KEY, BASE_URL_HOURLY } from '../utilities/endpoints';

const initialState: HourlyWeatherState = {
  hourlyData: {},
  loading: false,
  error: null,
};

export const fetchHourlyWeatherData = createAsyncThunk(
  'hourlyWeather/fetchHourlyWeatherData',
  async (cityName: string, { rejectWithValue }) => {
    try {
      if (!cityName) {
        throw new Error('City name is required');
      }

      const url = `${BASE_URL_HOURLY}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch hourly weather data: ${errorMessage}`);
      }

      const data = await response.json();
      return {
        cityName,
        hourly: data.list.slice(0, 8).map((item: any) => ({
          time: item.dt_txt,
          temperature: item.main.temp,
        })),
      };
    } catch (error) {
      return rejectWithValue('Error');
    }
  },
);

const hourlyWeatherSlice = createSlice({
  name: 'hourlyWeather',
  initialState,
  reducers: {
    clearHourlyData: (state, action: PayloadAction<string>) => {
      delete state.hourlyData[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHourlyWeatherData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHourlyWeatherData.fulfilled, (state, action) => {
        state.loading = false;
        const { cityName, hourly } = action.payload;
        state.hourlyData[cityName] = hourly;
      })
      .addCase(fetchHourlyWeatherData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearHourlyData } = hourlyWeatherSlice.actions;
export default hourlyWeatherSlice.reducer;
