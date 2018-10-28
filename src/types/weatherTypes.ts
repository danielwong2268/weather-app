export interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: Entry[];
}

export interface WeatherDetails {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMainDetails {
  temp: number;
  temp_min: number;
  temp_max: number;
  weather: WeatherDetails;
}

export interface Entry {
  dt: number;
  dt_txt: string;
  main: WeatherMainDetails;
  weather: WeatherDetails[];
  rain?: { '3h': number };
}

export enum WeatherError {
  CITY_NOT_FOUND,
  GENERIC_ERROR
}