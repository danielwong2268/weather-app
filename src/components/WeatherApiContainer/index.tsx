import React from 'react';
import { WeatherData, WeatherError } from 'src/types/weatherTypes';
import weatherService from 'src/service/weatherService';

interface WeatherApiContainerState {
  weatherData?: WeatherData;
  isLoading: boolean;
  error?: WeatherError;
}

export type WeatherApiContainerRenderProps = WeatherApiContainerState & {
  onSubmit: WeatherApiContainer['onSubmit']
}

interface WeatherApiContainerProps {
  children: (renderProps: WeatherApiContainerRenderProps) => React.ReactNode;
}

class WeatherApiContainer extends React.Component<WeatherApiContainerProps, WeatherApiContainerState> {
  state: WeatherApiContainerState = {
    isLoading: false
  }

  onSubmit = (city: string) => {
    this.setState({ isLoading: true });
    weatherService.getWeatherData(city)
      .then(data => {
        this.setState({
          weatherData: data,
          isLoading: false
        })
      })
      .catch((err: { status: number }) => {
        const error = err.status === 404
          ? WeatherError.CITY_NOT_FOUND
          : WeatherError.GENERIC_ERROR;

        this.setState(() => ({
          isLoading: false,
          error
        }));
      });
  }

  render() {
    return this.props.children({ ...this.state, onSubmit: this.onSubmit });
  }
}

export default WeatherApiContainer;