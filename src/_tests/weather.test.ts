import { configureStore } from '@reduxjs/toolkit';
// redux
import weatherReducer, { fetchWeather } from '../redux/weatherSlice';
import { CityWeather } from '../types';

// Мок для localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();
global.localStorage = mockLocalStorage;

describe('weatherSlice', () => {
  // Створення Redux store
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        weather: weatherReducer,
      },
    });
    mockLocalStorage.clear();
  });

  it('should return initial state', () => {
    const state = store.getState().weather;
    expect(state).toEqual({
      cities: [],
      loading: false,
      error: null,
    });
  });

  it('should handle fetchWeather.pending', () => {
    store.dispatch(fetchWeather.pending());
    const state = store.getState().weather;
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle fetchWeather.fulfilled', async () => {
    const mockCity: CityWeather = {
      id: 123,
      name: 'Test City',
      temp: 25,
      description: 'Clear sky',
      details: {},
    };

    // Мок для fetch
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockCity,
    });

    await store.dispatch(fetchWeather('Test City'));

    const state = store.getState().weather;

    expect(state.cities).toContainEqual(mockCity);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'cities',
      JSON.stringify([mockCity]),
    );
  });
});
