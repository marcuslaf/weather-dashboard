import type { HistoricalData } from '../types';

export type Metric = 'temperature' | 'humidity' | 'windSpeed' | 'pressure';
export type Comparison = 'gt' | 'lt' | 'eq';

export interface FilterState {
  metric: Metric;
  comparison: Comparison;
  threshold: string;
  chartType: 'line' | 'bar' | 'radar';
}

function getMetricValue(item: HistoricalData, metric: Metric): number {
  switch (metric) {
    case 'temperature': return item.temp;
    case 'humidity': return item.humidity;
    case 'windSpeed': return item.windSpeed;
    case 'pressure': return item.pressure;
  }
}

export function filterHistoricalData(
  data: HistoricalData[],
  filterState: FilterState,
): HistoricalData[] {
  const value = filterState.threshold ? parseFloat(filterState.threshold) : undefined;
  if (value === undefined || isNaN(value)) return data;

  return data.filter((item) => {
    const metric = getMetricValue(item, filterState.metric);
    switch (filterState.comparison) {
      case 'gt': return metric > value;
      case 'lt': return metric < value;
      case 'eq': return Math.abs(metric - value) < 0.01;
    }
  });
}

type Period = '24h' | '7d' | '30d' | 'custom';

export function filterDataByPeriod(
  data: HistoricalData[],
  period: Period,
  customStart?: string,
  customEnd?: string
): HistoricalData[] {
  const now = Date.now();
  const periodMs: Record<string, number> = {
    '24h': 86400000,
    '7d': 604800000,
    '30d': 2592000000,
  };

  if (period === 'custom' && customStart && customEnd) {
    const start = new Date(customStart).getTime();
    const end = new Date(customEnd).getTime() + 86400000;
    return data.filter((d) => d.dt * 1000 >= start && d.dt * 1000 <= end);
  }

  const cutoff = now - (periodMs[period] || periodMs['7d']);
  return data.filter((d) => d.dt * 1000 >= cutoff);
}