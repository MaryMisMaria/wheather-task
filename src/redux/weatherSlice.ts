import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const API_KEY = '25c8be501c64dbbdeebf56b6b9b6644c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface CityWeather {
  id: string;
  name: string;
  temp: number;
  description: string;
  details: any;
}

interface WeatherState {
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

// Thunk для отримання погоди з використанням fetch
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cityName: string) => {
    const response = await fetch(
      `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch weather data for ${cityName}: ${response.statusText}`,
      );
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      temp: data.main.temp,
      description: data.weather[0].description,
      details: data,
    };
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.cities.push(action.payload);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching weather data';
      });
  },
});

export const { removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
