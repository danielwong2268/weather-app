import json from '../fixtures/stubbedWeatherData';
import { WeatherData } from 'src/types/weatherTypes';

const wait = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

const weatherService = {
  async getWeatherData(city: string): Promise<WeatherData> {
    await wait();
    return json;
  }
}

export default weatherService;