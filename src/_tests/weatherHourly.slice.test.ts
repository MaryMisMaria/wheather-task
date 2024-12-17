import { configureStore } from '@reduxjs/toolkit';
// redux
import hourlyWeatherReducer, {
  clearHourlyData,
  fetchHourlyWeatherData,
} from '../redux/hourlyWeatherSlice';

global.fetch = jest.fn();

const initialState = {
  hourlyData: {},
  loading: false,
  error: null,
};

describe('hourlyWeatherSlice', () => {
  it('should handle the pending state for fetchHourlyWeatherData', async () => {
    const store = configureStore({
      reducer: {
        hourlyWeather: hourlyWeatherReducer,
      },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        list: [
          { dt_txt: '2024-12-17 01:00:00', main: { temp: 10 } },
          { dt_txt: '2024-12-17 02:00:00', main: { temp: 11 } },
        ],
      }),
    });

    store.dispatch(fetchHourlyWeatherData('Kyiv'));

    const state = store.getState().hourlyWeather;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle the fulfilled state for fetchHourlyWeatherData', async () => {
    const store = configureStore({
      reducer: {
        hourlyWeather: hourlyWeatherReducer,
      },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        list: [
          { dt_txt: '2024-12-17 01:00:00', main: { temp: 10 } },
          { dt_txt: '2024-12-17 02:00:00', main: { temp: 11 } },
        ],
      }),
    });

    await store.dispatch(fetchHourlyWeatherData('Kyiv'));

    const state = store.getState().hourlyWeather;
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.hourlyData['Kyiv']).toEqual([
      { time: '2024-12-17 01:00:00', temperature: 10 },
      { time: '2024-12-17 02:00:00', temperature: 11 },
    ]);
  });

  it('should handle the rejected state for fetchHourlyWeatherData', async () => {
    const store = configureStore({
      reducer: {
        hourlyWeather: hourlyWeatherReducer,
      },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'Error fetching data',
    });

    await store.dispatch(fetchHourlyWeatherData('Kyiv'));

    const state = store.getState().hourlyWeather;
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Error');
  });

  it('should handle clearHourlyData action', () => {
    const store = configureStore({
      reducer: {
        hourlyWeather: hourlyWeatherReducer,
      },
    });

    store.dispatch(fetchHourlyWeatherData('Kyiv'));
    store.dispatch(clearHourlyData('Kyiv'));

    const state = store.getState().hourlyWeather;
    expect(state.hourlyData['Kyiv']).toBeUndefined();
  });
});
