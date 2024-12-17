import store, { RootState } from '../redux/store';

describe('Redux Store', () => {
  it('should configure the store with correct reducers', () => {
    const state: RootState = store.getState();

    expect(state.weather).toBeDefined();
    expect(state.weather).toEqual(expect.objectContaining({}));

    expect(state.hourlyWeather).toBeDefined();
    expect(state.hourlyWeather).toEqual(expect.objectContaining({}));
  });
});
