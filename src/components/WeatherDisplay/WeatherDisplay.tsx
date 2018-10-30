import React from 'react';
import WeatherDay from './WeatherDaySummary';
import { WeatherDaySummary } from 'src/types/weatherData';

interface WeatherDisplayProps {
  weatherData: WeatherDaySummary[];
}

export const getIndexOfDayWithMostRain = (weatherData: WeatherDaySummary[]) => {
  if (weatherData.length === 0) return undefined;

  const indexOfMax = weatherData.reduce((maxIndex, summary, currentIndex) =>
    summary.totalRainMm > weatherData[maxIndex].totalRainMm
      ? currentIndex
      : maxIndex
  , 0);

  return (weatherData[indexOfMax].totalRainMm !== 0)
    ? indexOfMax
    : undefined;
}

export const getIndexOfDayWithMinTemp = (weatherData: WeatherDaySummary[]) => {
  if (weatherData.length === 0) return undefined;

  return weatherData.reduce((minIndex, summary, currentIndex) =>
    summary.minTemp < weatherData[minIndex].minTemp
      ? currentIndex
      : minIndex
  , 0);
}

const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  const indexWithMostRain = getIndexOfDayWithMostRain(weatherData);
  const indexWithColdestTemp = getIndexOfDayWithMinTemp(weatherData);

  return (
    <div>
      {
        weatherData.map((summary, i) => (
          <WeatherDay
            showUmbrella={i === indexWithMostRain}
            showJacket={i === indexWithColdestTemp}
            key={i} 
            summary={summary}
          />
        ))
      }
    </div>
  )
}

export default WeatherDisplay;