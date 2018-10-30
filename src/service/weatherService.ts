import { apiKey } from 'src/constants/keys';
import { WeatherApiResponse } from 'src/types/weatherApiResponseType';

const weatherService = {
  async getWeatherData(city: string): Promise<WeatherApiResponse> {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKey}`;
    const result = await fetch(url);

    if (!result.ok) throw result;
    return result.json();
  }
}

export default weatherService;