import React, { FC, useState } from 'react';
import {
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { SelectChangeEvent } from '@mui/material/Select';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

interface Option {
  name: string;
  id: string;
}

interface CustomSelectComponentProps {
  rowData: string;
  options: Option[];
  disabled?: boolean;
  setRowData: (value: string) => void;
  onSelectChange?: (value: string) => void;
  initialValueName?: string;
}

const CustomSelectComponent: FC<CustomSelectComponentProps> = ({
  disabled,
  setRowData,
  onSelectChange,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { cities, loading, error } = useSelector(
    (state: RootState) => state.weather,
  );

  const [cityName, setCityName] = useState<string>('');

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedCity = event.target.value;
    setCityName(selectedCity);
    setRowData(selectedCity);
    onSelectChange && onSelectChange(selectedCity);
  };

  const getSelectName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1); // Basic capitalization if no translation
  };

  return (
    <Box width="95%" display="flex" alignSelf="center">
      <FormControl fullWidth>
        <Select
          value={cityName}
          onChange={handleSelectChange}
          disabled={disabled}
          displayEmpty
          sx={{
            fieldset: { border: 'none' },
            maxHeight: { sm: '30px', xs: '20px' },
            '.MuiOutlinedInput-input': {
              textAlign: 'center',
              textTransform: 'none',
              color: 'text.primary',
              backgroundColor: 'secondaryTableRow',
            },
          }}
        >
          <MenuItem value="" disabled>
            Select City
          </MenuItem>
          {cities.map((option) => (
            <MenuItem key={option.id} value={option.name} disabled={disabled}>
              {getSelectName(option.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading && (
        <CircularProgress
          size={20}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        />
      )}
    </Box>
  );
};

export default CustomSelectComponent;
