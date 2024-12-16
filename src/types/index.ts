import { ChartData, ChartOptions } from 'chart.js';

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

const chartData: ChartData<'line'> = {
  labels: ['10:00', '11:00', '12:00', '13:00', '14:00'],
  datasets: [
    {
      label: 'Temperature (°C)',
      data: [22, 23, 21, 24, 25],
      fill: false,
      borderColor: '#2196f3',
      tension: 0.1,
    },
  ],
};

const chartOptions: ChartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
};
