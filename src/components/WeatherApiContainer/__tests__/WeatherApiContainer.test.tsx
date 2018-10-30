import React from 'react';
import waitForExpect from 'wait-for-expect';
import { mount } from 'enzyme';
import weatherService from 'src/service/weatherService';
import WeatherApiContainer, { WeatherApiContainerRenderProps } from '..';
import stubbedWeatherData from 'src/fixtures/stubbedWeatherData';
import { WeatherError, WeatherEntry, WeatherApiResponse } from 'src/types/weatherApiResponseType';

jest.mock('../../../service/weatherService', () => ({
  getWeatherData: jest.fn()
}));

const TestChild = (props: WeatherApiContainerRenderProps) => <div />;

const getWeatherApiContainer = () => (
  <WeatherApiContainer>
    { renderProps => <TestChild {...renderProps} /> }
  </WeatherApiContainer>
);

describe('<WeatherApiContainer />', () => {
  it('Initially, the state is not loading and there are no errors', () => {
    const wrapper = mount(getWeatherApiContainer());
    expect(wrapper.find(TestChild).props().isLoading).toBeFalsy();
    expect(wrapper.find(TestChild).props().error).toBeFalsy();
  });

  it('After submitting, state is loading', () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.resolve());
    
    const wrapper = mount(getWeatherApiContainer());
    wrapper.find(TestChild).props().onSubmit('San Francisco');
    wrapper.update();
    
    expect(wrapper.find(TestChild).props().isLoading).toBeTruthy();
  });

  it('After submitting, if successful, data is passed down to child and error is undefined', async () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.resolve(stubbedWeatherData));
    
    const wrapper = mount(getWeatherApiContainer());
    wrapper.find(TestChild).props().onSubmit('San Francisco');

    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(TestChild).props().weatherData).toBeTruthy();
      expect(wrapper.props().error).toBeFalsy();
    });
  });

  it('After submitting, if 404, CITY_NOT_FOUND error is passed down to child', async () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.reject({
      status: 404
    }));
    
    const wrapper = mount(getWeatherApiContainer());
    wrapper.find(TestChild).props().onSubmit('Francisco San');

    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(TestChild).props().weatherData).toBeFalsy();
      expect(wrapper.find(TestChild).props().error).toEqual(WeatherError.CITY_NOT_FOUND);
    });
  });

  it('After submitting, if status code is not 404, GENERIC_ERROR error is passed down to child', async () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.reject({
      status: 503
    }));
    
    const wrapper = mount(getWeatherApiContainer());
    wrapper.find(TestChild).props().onSubmit('San Francisco');

    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(TestChild).props().weatherData).toBeFalsy();
      expect(wrapper.find(TestChild).props().error).toEqual(WeatherError.GENERIC_ERROR);
    });
  });

  describe('parseItems', () => {
   const getTestWeatherEntries: () => WeatherEntry[] = () => ([
      {
        "dt": 1540760400,
        "main": {
            "temp": 67.64,
            "temp_min": 63.18,
            "temp_max": 67.64,
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
            }
        ],
        "rain": { "3h": 0.025 },
        "dt_txt": "2018-10-28 21:00:00"
      },
    ]);

    const instance = mount(getWeatherApiContainer()).instance();
    const parseItems: WeatherApiContainer['parseItems'] = (instance as any).parseItems;

    it('converts entry date to local time', () => {
      const result = parseItems(getTestWeatherEntries());
      expect(result[0].localDate.isValid()).toBeTruthy();
    })

    it('If a value for rain exists, then it sets rainMm to be that value', () => {
      const result = parseItems(getTestWeatherEntries());
      expect(result[0].rainMm).toBe(0.025);
    })

    it('If a value for rain does not exist, then it sets rainMm to 0', () => {
      const testEntries = getTestWeatherEntries();
      testEntries[0].rain = {};

      const result = parseItems(testEntries);
      expect(result[0].rainMm).toBe(0);
    })

    it('Strips the time of day off of the icon (the leading d for day, or n for night)', () => {
      const testEntries = getTestWeatherEntries();
      const result = parseItems(testEntries);
      expect(result[0].iconId).toBe('10');
    })
  })

  describe('generateDailySummaries', () => {
    const instance = mount(getWeatherApiContainer()).instance();
    const generateDailySummaries: WeatherApiContainer['generateDailySummaries'] = (instance as any).generateDailySummaries;
    const getTestWeatherApiResponse: () => WeatherApiResponse = () => ({
      cod: '200',
      message: 0.0056,
      cnt: 2,
      list: [{
        "main": {
            "temp": 67.64,
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
            }
        ],
        "rain": { "3h": 0.05 },
        "dt_txt": "2018-10-28 21:00:00"
      },
      {
        "main": {
            "temp": 70.64,
        },
        "weather": [
            {
                "id": 500,
                "main": "Rain",
                "description": "light rain",
                "icon": "10d"
            }
        ],
        "rain": { "3h": 0.05 },
        "dt_txt": "2018-10-28 10:00:00"
      },
      {
        "main": {
            "temp": 60.05
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ],
        "rain": {},
        "dt_txt": "2018-10-30 03:00:00"
      }]
    });

    it('Handles case if list is empty array', () => {
      const responseWithEmptyList: WeatherApiResponse = {
        cod: '200',
        message: 0.0056,
        cnt: 2,
        list: []
      } ;

      const result = generateDailySummaries(responseWithEmptyList);
      expect(result.length).toBe(0);
    })

    it('Aggregates entries by the date', () => {
      const result = generateDailySummaries(getTestWeatherApiResponse());
      expect(result.length).toBe(2);
      expect(result[0].day).toBe('10/28');
      expect(result[1].day).toBe('10/29');
    });

    it('Aggregates the amount of rainfall for each day', () => {
      const result = generateDailySummaries(getTestWeatherApiResponse());

      expect(result[0].totalRainMm).toBe(0.1)
      expect(result[1].totalRainMm).toBe(0)
    });

    it('Aggregates the icon for each day', () => {
      const result = generateDailySummaries(getTestWeatherApiResponse());

      expect(result[0].icon).toBe('10');
      expect(result[1].icon).toBe('01');
    });

    it('Aggregates the description over the day', () => {
      const result = generateDailySummaries(getTestWeatherApiResponse());
      expect(result[0].overallDesc).toBe('light rain');
      expect(result[1].overallDesc).toBe('clear sky');
    })
  })


});