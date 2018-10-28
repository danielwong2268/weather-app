import React from 'react';
import { WeatherData } from 'src/types/weatherTypes';

interface WeatherDisplayProps {
  weatherData: WeatherData;
}

const WeatherDisplay = (data: WeatherDisplayProps) => <span>here's your weather</span>;

export default WeatherDisplay;