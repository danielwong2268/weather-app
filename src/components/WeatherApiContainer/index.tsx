import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { WeatherApiResponse, WeatherError, WeatherEntry } from 'src/types/weatherApiResponseType';
import { WeatherDaySummary } from 'src/types/weatherData';
import weatherService from 'src/service/weatherService';
import { findMode } from 'src/utils/findMode';
import roundDecimal2Places from 'src/utils/roundDecimal1Place';
import findMax from 'src/utils/findMax';
import findMin from 'src/utils/findMin';

interface WeatherApiContainerState {
  weatherData?: WeatherDaySummary[];
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
          weatherData: this.generateDailySummaries(data),
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

  parseItems = (entries: WeatherEntry[]) => (
    entries.map(item => ({
      localDate: moment.utc(item.dt_txt).local(),
      rainMm: item.rain['3h'] ? item.rain['3h'] : 0,
      temp:  item.main.temp,
      desc: item.weather[0].description,
      iconId: item.weather[0].icon.replace(/[A-Za-z]/g, ''),
      weatherId: item.weather[0].id
    }))
  )

  generateDailySummaries = (data: WeatherApiResponse): WeatherDaySummary[] => {
    const parsedItems = this.parseItems(data.list);
    const itemsGroupedByDay = _.groupBy(parsedItems, item => item.localDate.format('M/D'))

    // Casting is safe here since we know the arrays in the group by must be populated
    const dailySummaries: WeatherDaySummary[] = _.map(itemsGroupedByDay, (items, day) => ({
      maxTemp: roundDecimal2Places(findMax(items, item => item.temp) as number),
      minTemp: roundDecimal2Places(findMin(items, item => item.temp) as number),
      totalRainMm: items.reduce((sum, item) => sum + item.rainMm, 0),
      day,
      icon: findMode(items.map(item => item.iconId)) as string,
      overallDesc: findMode(items.map(item => item.desc)) as string
    }));

    return dailySummaries;
  }

  render() {
    return this.props.children({ ...this.state, onSubmit: this.onSubmit });
  }
}


export default WeatherApiContainer;