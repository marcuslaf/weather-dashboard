export interface SummaryData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: string;
  weatherMain: string;
  weatherDescription: string;
  dt: number;
}

export interface HistoricalData {
  dt: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  pop: number; // Probability of precipitation
}

export interface HistoricalDataResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
      pressure: number;
    };
    wind: { speed: number };
    pop: number;
  }>;
}

export type TimeRange = '24h' | '7d' | '30d';
