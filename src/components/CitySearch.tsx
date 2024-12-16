import React, { useCallback, useState } from 'react';
//select
import Select, { SingleValue } from 'react-select';
// material ui
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
// endpoints
import { API_KEY, BASE_URL } from '../utilities/endpoints';

interface CityOption {
  label: string;
  value: string;
  country: string;
}

interface CitySelectProps {
  onCitySelect: (cityName: string, country: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ onCitySelect }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [options, setOptions] = useState<CityOption[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const fetchCities = useCallback(async (inputValue: string) => {
    if (!inputValue) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}?q=${inputValue}&limit=5&appid=${API_KEY}`,
      );
      const data = await response.json();

      const cityOptions = data.map((city: any) => ({
        label: `${city.name}, ${city.country}`,
        value: city.name,
        country: city.country,
      }));
      setOptions(cityOptions);
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (inputValue: string) => {
    fetchCities(inputValue);
  };

  const handleChange = (
    newValue: SingleValue<{ label: string; value: string }>,
  ) => {
    if (newValue) {
      const selected = options.find(
        (option) => option.value === newValue.value,
      );
      if (selected) {
        setSelectedCity(selected);
        onCitySelect(selected.value, selected.country);
      }
    } else {
      setSelectedCity(null);
      onCitySelect('', '');
    }
  };

  const handleClear = () => {
    setSelectedCity(null);
    onCitySelect('', '');
  };

  return (
    <div style={{ position: 'relative' }}>
      <Select
        id="city-select"
        options={options}
        isLoading={isLoading}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search for a city..."
        value={
          selectedCity
            ? { label: selectedCity.label, value: selectedCity.value }
            : null
        }
      />
      {selectedCity && (
        <IconButton
          onClick={handleClear}
          size="small"
          style={{
            top: '4px',
            fontSize: 8,
            right: '80px',
            color: 'black',
            position: 'absolute',
          }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CitySelect;
