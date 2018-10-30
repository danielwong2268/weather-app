export interface WeatherApiResponse {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherEntry[];
  city: {
    name: string;
  }
}

export interface WeatherEntry {
  dt_txt: string;
  main: WeatherMainDetails;
  weather: WeatherDetails[];
  rain?: { '3h'?: number };
}

interface WeatherDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface WeatherMainDetails {
  temp: number;
}

export enum WeatherError {
  CITY_NOT_FOUND,
  GENERIC_ERROR
}