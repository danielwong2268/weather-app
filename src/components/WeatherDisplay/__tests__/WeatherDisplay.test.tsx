import React from 'react';
import WeatherDisplay, { getIndexOfFirstRainyDay, getIndexOfDayWithMinTemp } from '../WeatherDisplay';
import { shallow } from 'enzyme';
import WeatherDay from '../WeatherDaySummary';
import JacketIcon from 'src/components/Icons/JacketIcon';


const defaultTestWeatherData = [
  {
    maxTemp: 80,
    minTemp: 60,
    day: '10/20',
    isRaining: false,
    icon: '01d',
    overallDesc: 'sunny'
  },
  {
    maxTemp: 80,
    minTemp: 70,
    day: '10/21',
    isRaining: false,
    icon: '01d',
    overallDesc: 'sunny'
  },
  {
    maxTemp: 80,
    minTemp: 49,
    day: '10/22',
    isRaining: true,
    icon: '01d',
    overallDesc: 'rainy'
  },
];

describe('<WeatherDisplay />', () => {
  describe('getIndexOfDayWithMostRain', () => {
    it('returns -1 if array is empty', () => {
      expect(getIndexOfFirstRainyDay([])).toBe(-1);
    })

    it('If no days have any rain, then returns undefined', () => {
      const testWeatherDataWithNoRain = [
        {
          maxTemp: 80,
          minTemp: 70,
          day: '10/20',
          isRaining: false,
          totalRainMm: 0,
          icon: '01d',
          overallDesc: 'rainy'
        }
      ];
      expect(getIndexOfFirstRainyDay(testWeatherDataWithNoRain)).toBe(-1);
    })

    it('returns the day with the most rain', () => {
      expect(getIndexOfFirstRainyDay(defaultTestWeatherData)).toBe(2);
    })
  })

  describe('getIndexOfDayWithMinTemp', () => {
    it('returns undefined if array is empty', () => {
      expect(getIndexOfDayWithMinTemp([])).toBe(undefined);
    });

    it('returns day with lowest minumum temperature', () => {
      expect(getIndexOfDayWithMinTemp(defaultTestWeatherData)).toBe(2);
    });

    it('If multiple days have same min temp, returns the first day with min temp', () => {
      const testWeatherDataWithMultipleDaysWithMinTemp = [
        {
          maxTemp: 80,
          minTemp: 60,
          day: '10/20',
          isRaining: false,
          icon: '01d',
          overallDesc: 'rainy'
        },
        {
          maxTemp: 80,
          minTemp: 60,
          day: '10/21',
          isRaining: false,
          icon: '01d',
          overallDesc: 'rainy'
        }
      ];
      expect(getIndexOfDayWithMinTemp(testWeatherDataWithMultipleDaysWithMinTemp)).toBe(0);
    })
  });

  it('Does not show jacket if min temp for all days is greater than 60 degrees', () => {
    const testDataWithHotDays = [
      {
        maxTemp: 80,
        minTemp: 70,
        day: '10/20',
        isRaining: false,
        icon: '01d',
        overallDesc: 'sunny'
      },
      {
        maxTemp: 90,
        minTemp: 80,
        day: '10/21',
        isRaining: false,
        icon: '01d',
        overallDesc: 'sunny'
      }
    ]

    const wrapper = shallow(<WeatherDisplay city="SF" weatherData={testDataWithHotDays} />);

    expect(wrapper.find(JacketIcon).exists()).toBeFalsy();
  })

  it('Renders WeatherDay components showing proper icons', () => {

    
    const wrapper = shallow(<WeatherDisplay city="SF" weatherData={defaultTestWeatherData} />);

    expect(wrapper.find(WeatherDay).at(2).props().showJacket).toBeTruthy();
    expect(wrapper.find(WeatherDay).at(2).props().showUmbrella).toBeTruthy();
  });
});