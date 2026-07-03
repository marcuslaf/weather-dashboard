import { useCallback, useState } from 'react';
import type { SummaryData } from '../types';

const API_BASE = 'https://api.openweathermap.org/data/2.5';

export function useWeatherAPI() {
  const [weatherData, setWeatherData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherSummary = useCallback(async (lat: number, lon: number): Promise<SummaryData> => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL(`${API_BASE}/weather`);
      url.searchParams.set('lat', lat.toString());
      url.searchParams.set('lon', lon.toString());
      url.searchParams.set('appid', import.meta.env.VITE_OPENWEATHER_API_KEY || '');
      url.searchParams.set('units', 'metric');

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();

      const result: SummaryData = {
        city: data.name,
        country: data.sys?.country || 'N/A',
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: (data.visibility / 1000).toFixed(1),
        weatherMain: data.weather[0].main,
        weatherDescription: data.weather[0].description,
        dt: data.dt,
      };
      setWeatherData(result);
      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { weatherData, loading, error, fetchWeatherSummary };
}