import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

// Реєстрація модулів Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const CityDetailPage = () => {
  const { name } = useParams();
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  useEffect(() => {
    if (name) {
      fetchHourlyWeatherData(name);
    }
  }, [name]);

  const fetchHourlyWeatherData = async (cityName: string) => {
    const apiKey = 'your-api-key'; // Replace with your API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setHourlyData(data.list.slice(0, 8)); // First 8 hours data
      } else {
        console.error('Failed to fetch hourly weather data');
      }
    } catch (error) {
      console.error('Error fetching hourly weather data:', error);
    }
  };

  const chartData = {
    labels: hourlyData.map((item) => item.dt_txt), // Labels for each hour
    datasets: [
      {
        label: 'Temperature (°C)',
        data: hourlyData.map((item) => item.main.temp), // Temperature data
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        fill: false, // No fill below the line
      },
    ],
  };

  return (
    <div>
      <h1>{name} Weather Details</h1>
      <Line data={chartData} />
    </div>
  );
};

export default CityDetailPage;
