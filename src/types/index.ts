export interface CityCardProps {
  id: string;
  name: string;
  temp: number;
  description: string;
}

export interface CityWeather {
  id: string;
  name: string;
  temp: number;
  description: string;
  details: any;
}

export interface WeatherState {
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}

export interface HourlyWeather {
  time: string;
  temperature: number;
}

export interface HourlyWeatherState {
  hourlyData: Record<string, HourlyWeather[]>;
  loading: boolean;
  error: string | null;
}

export interface CityOption {
  label: string;
  value: string;
  country: string;
}

export interface CityState {
  options: CityOption[];
  isLoading: boolean;
  error: string | null;
}

export interface CitySelectProps {
  onCitySelect: (cityName: string, country: string) => void;
}

export interface CardColor {
  backgroundColor: string;
  color: string;
}
