import json from '../fixtures/stubbedWeatherData';
import { WeatherApiResponse } from 'src/types/weatherApiResponseType';

const wait = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

const weatherService = {
  async getWeatherData(city: string): Promise<WeatherApiResponse> {
    await wait();
    return json;
  }
}

export default weatherService;