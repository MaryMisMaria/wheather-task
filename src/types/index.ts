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
