import React, { useCallback, useState } from 'react';
import Select, { SingleValue } from 'react-select'; // Імпортуємо SingleValue
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

interface CityOption {
  label: string;
  value: string;
  country: string;
}

interface CitySelectProps {
  onCitySelect: (cityName: string, country: string) => void;
}

const CitySelect: React.FC<CitySelectProps> = ({ onCitySelect }) => {
  const [options, setOptions] = useState<CityOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const fetchCities = useCallback(async (inputValue: string) => {
    if (!inputValue) return;

    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

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
      // Перетворюємо на тип CityOption, додавши country
      const selected = options.find(
        (option) => option.value === newValue.value,
      );
      if (selected) {
        setSelectedCity(selected);
        onCitySelect(selected.value, selected.country);
      }
    } else {
      setSelectedCity(null);
      onCitySelect('', ''); // Очищуємо значення
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
        onInputChange={handleInputChange}
        onChange={handleChange} // Використовуємо оновлену функцію handleChange
        placeholder="Search for a city..."
        isLoading={isLoading}
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
            fontSize: 8,
            color: 'black',
            position: 'absolute',
            top: '4px',
            right: '80px',
          }}
        >
          <ClearIcon />
        </IconButton>
      )}
    </div>
  );
};

export default CitySelect;
