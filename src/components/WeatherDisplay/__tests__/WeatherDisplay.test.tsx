import React from 'react';
import WeatherDisplay, { getIndexOfDayWithMostRain, getIndexOfDayWithMinTemp } from '../WeatherDisplay';
import { shallow } from 'enzyme';
import WeatherDay from '../WeatherDaySummary';

const testWeatherData = [
  {
    maxTemp: 80,
    minTemp: 60,
    day: '10/20',
    totalRainMm: 0.3,
    icon: '01d',
    overallDesc: 'rainy'
  },
  {
    maxTemp: 80,
    minTemp: 70,
    day: '10/21',
    totalRainMm: 0.5,
    icon: '01d',
    overallDesc: 'rainy'
  },
  {
    maxTemp: 80,
    minTemp: 49,
    day: '10/22',
    totalRainMm: 0,
    icon: '01d',
    overallDesc: 'sunny'
  },
];

const getWeatherDisplay = () => (
  <WeatherDisplay weatherData={testWeatherData} />
);

describe('<WeatherDisplay />', () => {
  describe('getIndexOfDayWithMostRain', () => {
    it('returns undefined if array is empty', () => {
      expect(getIndexOfDayWithMostRain([])).toBe(undefined);
    })

    it('If no days have any rain, then returns undefined', () => {
      const testWeatherDataWithNoRain = [
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/20',
          totalRainMm: 0,
          icon: '01d',
          overallDesc: 'rainy'
        },
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/21',
          totalRainMm: 0,
          icon: '01d',
          overallDesc: 'rainy'
        }
      ];
      expect(getIndexOfDayWithMostRain(testWeatherDataWithNoRain)).toBe(undefined);
    })

    it('returns the day with the most rain', () => {
      expect(getIndexOfDayWithMostRain(testWeatherData)).toBe(1);
    })

    it('if multiple days have the same amount of most rain, returns the first day with most rain', () => {
      const testWeatherDataWithMultipleDaysWithMostRain = [
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/20',
          totalRainMm: 0,
          icon: '01d',
          overallDesc: 'rainy'
        },
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/21',
          totalRainMm: 2,
          icon: '01d',
          overallDesc: 'rainy'
        },
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/21',
          totalRainMm: 2,
          icon: '01d',
          overallDesc: 'rainy'
        }
      ];

      expect(getIndexOfDayWithMostRain(testWeatherDataWithMultipleDaysWithMostRain)).toBe(1);
    })
  })

  describe('getIndexOfDayWithMinTemp', () => {
    it('returns undefined if array is empty', () => {
      expect(getIndexOfDayWithMinTemp([])).toBe(undefined);
    });

    it('returns day with lowest minumum temperature', () => {
      expect(getIndexOfDayWithMinTemp(testWeatherData)).toBe(2);
    });

    it('If multiple days have same min temp, returns the first day with min temp', () => {
      const testWeatherDataWithMultipleDaysWithMinTemp = [
        {
          maxTemp: 80,
          minTemp: 60,
          day: '10/20',
          totalRainMm: 0,
          icon: '01d',
          overallDesc: 'rainy'
        },
        {
          maxTemp: 80,
          minTemp: 60,
          day: '10/21',
          totalRainMm: 2,
          icon: '01d',
          overallDesc: 'rainy'
        }
      ];
      expect(getIndexOfDayWithMinTemp(testWeatherDataWithMultipleDaysWithMinTemp)).toBe(0);
    })
    
  });

  it('Renders WeatherDay components showing proper icons', () => {
    const wrapper = shallow(getWeatherDisplay());

    expect(wrapper.find(WeatherDay).at(2).props().showJacket).toBeTruthy();
    expect(wrapper.find(WeatherDay).at(1).props().showUmbrella).toBeTruthy();
  });
});