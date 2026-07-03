import type { HistoricalData, SummaryData } from '../types';

export const mockSummary: SummaryData = {
  city: 'London',
  country: 'GB',
  temperature: 18,
  feelsLike: 16,
  humidity: 65,
  windSpeed: 4.2,
  pressure: 1013,
  visibility: '10.0',
  weatherMain: 'Clouds',
  weatherDescription: 'scattered clouds',
  dt: Math.floor(Date.now() / 1000),
};

export function generateMockHistorical(days: number): HistoricalData[] {
  const now = Date.now();
  const data: HistoricalData[] = [];
  const count = days <= 1 ? 24 : days;
  const intervalMs = days <= 1 ? 3600000 : 86400000;

  for (let i = count - 1; i >= 0; i--) {
    const ts = now - i * intervalMs;
    data.push({
      dt: Math.floor(ts / 1000),
      temp: 15 + Math.sin(i * 0.5) * 8 + (Math.random() - 0.5) * 4,
      humidity: 55 + Math.sin(i * 0.3) * 15 + (Math.random() - 0.5) * 10,
      windSpeed: 3 + Math.sin(i * 0.7) * 2 + (Math.random() - 0.5) * 1.5,
      pressure: 1013 + Math.sin(i * 0.2) * 8 + (Math.random() - 0.5) * 5,
      pop: Math.max(0, Math.min(1, 0.3 + Math.sin(i * 0.4) * 0.3 + (Math.random() - 0.5) * 0.2)),
    });
  }

  return data;
}