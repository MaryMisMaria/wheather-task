import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// types
import { CityWeather, WeatherState } from '../types';
// endpoints
import { API_KEY, BASE_URL_HOURLY } from '../utilities/endpoints';

const loadFromLocalStorage = (): CityWeather[] => {
  const data = localStorage.getItem('cities');
  return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (cities: CityWeather[]) => {
  localStorage.setItem('cities', JSON.stringify(cities));
};

const initialState: WeatherState = {
  cities: loadFromLocalStorage(),
  loading: false,
  error: null,
};

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cityName: string) => {
    const response = await fetch(
      `${BASE_URL_HOURLY}/weather?q=${cityName}&appid=${API_KEY}&units=metric`,
    );
    if (!response.ok) {
      throw new Error('Such a city does not exist. Please check information.');
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
      saveToLocalStorage(state.cities);
    },
    updateCityWeather: (state, action: PayloadAction<CityWeather>) => {
      const index = state.cities.findIndex(
        (city) => city.id === action.payload.id,
      );
      if (index !== -1) {
        state.cities[index] = action.payload;
      }
      saveToLocalStorage(state.cities);
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
        const city = action.payload;
        const existingCity = state.cities.find((c) => c.id === city.id);
        if (existingCity) {
          state.cities = state.cities.map((c) =>
            c.id === city.id ? { ...c, ...city } : c,
          );
        } else {
          state.cities.push(city);
        }
        saveToLocalStorage(state.cities);
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error fetching weather data';
      });
  },
});

export const { removeCity, updateCityWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
