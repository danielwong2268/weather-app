import React from 'react';
import App from 'src/App';
import { mount } from 'enzyme';
import WeatherInputForm from 'src/components/WeatherInputForm';
import weatherService from 'src/service/weatherService';
import stubbedWeatherData from 'src/fixtures/stubbedWeatherData';
import LoadingOverlay from 'src/components/LoadingOverlay';
import WeatherDisplay from 'src/components/WeatherDisplay/WeatherDisplay';
import waitForExpect from 'wait-for-expect';

jest.mock('../service/weatherService', () => ({
  getWeatherData: jest.fn()
}));

describe('<App /> [Integration Test]', () => {
  it('Initially WeatherInputForm displays and WeatherDisplay does not', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(WeatherInputForm).exists()).toBeTruthy();
    expect(wrapper.find(WeatherDisplay).exists()).toBeFalsy();
  });

  it('While in loading/submitting state, the loading overlay is present', () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.resolve(stubbedWeatherData));
    const wrapper = mount(<App />);

    wrapper.find(WeatherInputForm).props().onSubmit('San Francisco');
    wrapper.update();

    expect(wrapper.find(LoadingOverlay).exists()).toBeTruthy();
  });

  it('After successful submission, then the WeatherDisplay component is displayed', async () => {
    (weatherService.getWeatherData as jest.Mock).mockImplementationOnce(() => Promise.resolve(stubbedWeatherData));
    const wrapper = mount(<App />);

    wrapper.find(WeatherInputForm).props().onSubmit('San Francisco');

    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find(WeatherDisplay).exists()).toBeTruthy();
    })
  });
});