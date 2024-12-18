import React, { FC, useCallback } from 'react';
import Select, { SingleValue } from 'react-select';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCities, clearCities } from '../redux/citySearchSlice';
// types
import { CitySelectProps } from '../types';
// lodash
import { debounce } from 'lodash';

const CitySelect: FC<CitySelectProps> = ({ onCitySelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { options, isLoading } = useSelector(
    (state: RootState) => state.cities,
  );

  const debouncedFetchCities = useCallback(
    debounce((inputValue: string) => {
      if (inputValue) {
        dispatch(fetchCities(inputValue));
      } else {
        dispatch(clearCities());
      }
    }, 500),
    [dispatch],
  );

  const handleInputChange = (inputValue: string) => {
    debouncedFetchCities(inputValue);
  };

  const handleChange = (
    newValue: SingleValue<{ label: string; value: string }>,
  ) => {
    if (newValue) {
      const selected = options.find(
        (option: { value: string }) => option.value === newValue.value,
      );
      if (selected) {
        onCitySelect(selected.value, selected.country);
      }
    } else {
      onCitySelect('', '');
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Select
        isClearable
        id="city-select"
        options={options}
        isLoading={isLoading}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search for a city..."
      />
    </div>
  );
};

export default CitySelect;
