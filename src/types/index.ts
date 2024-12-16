export interface CityWeather {
  id: string; // Унікальний ідентифікатор
  name: string; // Назва міста
  temp: number; // Температура
  description: string; // Опис погоди
}

export interface WeatherState {
  cities: CityWeather[];
  loading: boolean;
  error: string | null;
}
