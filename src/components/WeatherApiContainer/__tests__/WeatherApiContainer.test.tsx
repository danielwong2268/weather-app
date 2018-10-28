import React from 'react';
import waitForExpect from 'wait-for-expect';
import { mount } from 'enzyme';
import weatherService from 'src/service/weatherService';
import WeatherApiContainer, { WeatherApiContainerRenderProps } from '..';
import stubbedWeatherData from 'src/fixtures/stubbedWeatherData';
import { WeatherError } from 'src/types/weatherTypes';

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
});