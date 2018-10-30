import React from 'react';
import findIndex from 'lodash/findIndex';
import WeatherDay from './WeatherDaySummary';
import { WeatherDaySummary } from 'src/types/weatherData';

interface WeatherDisplayProps {
  weatherData: WeatherDaySummary[];
  city: string;
}

export const getIndexOfFirstRainyDay = (weatherData: WeatherDaySummary[]) => (
  findIndex(weatherData, day => day.isRaining)
);

export const getIndexOfDayWithMinTemp = (weatherData: WeatherDaySummary[]) => {
  if (weatherData.length === 0) return undefined;

  return weatherData.reduce((minIndex, summary, currentIndex) =>
    summary.minTemp < weatherData[minIndex].minTemp
      ? currentIndex
      : minIndex
  , 0);
}

const isColdEnoughToShowJacket = (temp: number) => temp <= 60;

const WeatherDisplay = ({ weatherData, city }: WeatherDisplayProps) => {
  const indexWithMostRain = getIndexOfFirstRainyDay(weatherData);
  const indexWithColdestTemp = getIndexOfDayWithMinTemp(weatherData);

  return (
    <div>
      <h1>{city}</h1>
      {
        weatherData.map((summary, i) => (
          <WeatherDay
            showUmbrella={i === indexWithMostRain}
            showJacket={i === indexWithColdestTemp && isColdEnoughToShowJacket(summary.minTemp)}
            key={i} 
            summary={summary}
          />
        ))
      }
    </div>
  )
}

export default WeatherDisplay;