import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import WeatherDaySummary from '../WeatherDaySummary';
import { shallow } from 'enzyme';
import JacketIcon from 'src/components/Icons/JacketIcon';
import UmbrellaIcon from 'src/components/Icons/UmbrellaIcon';

const testSummary = {
    maxTemp: 80,
    minTemp: 70,
    day: '10/21',
    isRaining: true,
    icon: '01',
    overallDesc: 'rainy'
}

describe('<WeatherDaySummary />', () => {
  it('Renders with summary data and icons', () => {
    const renderer = ShallowRenderer.createRenderer();
    renderer.render(<WeatherDaySummary summary={testSummary} showJacket showUmbrella />);

    expect(renderer.getRenderOutput()).toMatchSnapshot();
  });

  it('Does not render jacket icon if showJacket is false', () => {
    const wrapper = shallow(<WeatherDaySummary summary={testSummary} showJacket={false} showUmbrella />);

    expect(wrapper.find(JacketIcon).exists()).toBeFalsy();
  });

  it('Does not render umbrella icon if showUmbrella is false', () => {
    const wrapper = shallow(<WeatherDaySummary summary={testSummary} showJacket showUmbrella={false} />);

    expect(wrapper.find(UmbrellaIcon).exists()).toBeFalsy();
  });
});