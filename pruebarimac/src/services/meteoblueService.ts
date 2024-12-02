import axios from 'axios';
import { WeatherData, WeatherMetadata } from '../models/weatherModel';

const METEO_API_URL = process.env.METEO_API_URL || 'http://my.meteoblue.com/packages/basic-1h_basic-day';

export const getWeatherData = async (lat: number, lon: number): Promise<{ metadata: WeatherMetadata; data: WeatherData[] }> => {
  const response = await axios.get(METEO_API_URL, {
    params: {
      lat,
      lon,
      apikey: process.env.METEO_API_KEY,
    },
    timeout: 5000,
  });

  const { metadata, data_1h } = response.data;

  // Mapear los datos meteorológicos
  const weatherData: WeatherData[] = data_1h.time.map((timestamp: string, index: number) => ({
    timestamp,
    temperature: data_1h.temperature[index],
    humidity: data_1h.humidity[index],
    pressure: data_1h.pressure[index],
    windSpeed: data_1h.wind_speed[index],
    windDirection: data_1h.wind_direction[index],
    precipitationProbability: data_1h.precipitation_probability[index],
    precipitation: data_1h.precipitation[index],
  }));

  // Metadata
  const weatherMetadata: WeatherMetadata = {
    modelRunUpdateTime: metadata.modelrun_updatetime_utc,
    latitude: metadata.latitude,
    longitude: metadata.longitude,
    height: metadata.height,
    timezone: metadata.timezone_abbrevation,
  };

  return { metadata: weatherMetadata, data: weatherData };
};
