import React from 'react';
import { mount } from 'enzyme';
import WeatherInputForm, { emptyInputError, cityNotFoundError, genericSubmissionError } from '..';
import { Input, Button } from 'antd';
import ErrorMessage from 'src/components/ErrorMessage';
import { WeatherError } from 'src/types/weatherTypes';

describe('<WeatherInputForm />', () => {
  it('Input display updates correctly when changed', () => {
    const wrapper = mount(<WeatherInputForm onSubmit={jest.fn()} />);
    const cityName = 'San Francisco';

    wrapper.find(Input).simulate('change', { target: { value: cityName }});
    wrapper.update();
    
    expect(wrapper.find(Input).props().value).toBe(cityName);
  });

  describe('Handling errors:', () => {
    it('If no error, does not display any error message', () => {
      const wrapper = mount(<WeatherInputForm onSubmit={jest.fn()} />);
      expect(wrapper.find(ErrorMessage).exists()).toBeFalsy();
    });

    it('If submitting while the Input is empty, then show the right error', () => {
      const wrapper = mount(<WeatherInputForm onSubmit={jest.fn()} />);
      wrapper.find(Button).simulate('click');
      wrapper.update();
      expect(wrapper.find(ErrorMessage).text()).toBe(emptyInputError);
    });

    it('If the error is CITY_NOT_FOUND, then show the right error', () => {
      const wrapper = mount(<WeatherInputForm error={WeatherError.CITY_NOT_FOUND} onSubmit={jest.fn()} />);
      expect(wrapper.find(ErrorMessage).text()).toBe(cityNotFoundError);
    });

    it('If the error is GENERIC_ERROR, then show the right error', () => {
      const wrapper = mount(<WeatherInputForm error={WeatherError.GENERIC_ERROR} onSubmit={jest.fn()} />);
      expect(wrapper.find(ErrorMessage).text()).toBe(genericSubmissionError);
    });
  });

  describe('When submitting successfully:', () => {
    it('The form error goes away', () => {
      const wrapper = mount(<WeatherInputForm onSubmit={jest.fn()} />);
      const cityName = 'San Francisco';

      // reproduce empty input error
      wrapper.find(Button).simulate('click')
      wrapper.update();
      expect(wrapper.find(ErrorMessage).text()).toBe(emptyInputError);

      // fix the error and submit
      wrapper.find(Input).simulate('change', { target: { value: cityName }});
      wrapper.find(Button).simulate('click')
      expect(wrapper.find(ErrorMessage).exists()).toBeFalsy();
    });

    it('onSubmit is invoked with the city name', () => {
      const wrapper = mount(<WeatherInputForm onSubmit={jest.fn()} />);
      const cityName = 'San Francisco';
      wrapper.find(Input).simulate('change', { target: { value: cityName }});
      wrapper.find(Button).simulate('click');
      expect(wrapper.props().onSubmit).toHaveBeenCalledWith(cityName);
    });
  })
});