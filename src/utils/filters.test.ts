import { filterHistoricalData, filterDataByPeriod } from './filters';
import type { HistoricalData } from '../types';
import type { FilterState } from './filters';

const now = Date.now();
const DAY = 86400;
const mockData: HistoricalData[] = [
  { dt: Math.floor(now / 1000) - 0 * DAY, temp: 25, humidity: 60, windSpeed: 3, pressure: 1013, pop: 0.1 },
  { dt: Math.floor(now / 1000) - 1 * DAY, temp: 18, humidity: 70, windSpeed: 5, pressure: 1008, pop: 0.6 },
  { dt: Math.floor(now / 1000) - 2 * DAY, temp: 30, humidity: 45, windSpeed: 2, pressure: 1020, pop: 0.0 },
  { dt: Math.floor(now / 1000) - 3 * DAY, temp: 12, humidity: 85, windSpeed: 7, pressure: 1002, pop: 0.9 },
];

describe('filterHistoricalData', () => {
  const baseFilter: FilterState = {
    metric: 'temperature',
    comparison: 'gt',
    threshold: '',
    chartType: 'line',
  };

  it('returns all data when threshold is empty', () => {
    expect(filterHistoricalData(mockData, baseFilter)).toEqual(mockData);
  });

  it('returns all data when threshold is NaN', () => {
    expect(filterHistoricalData(mockData, { ...baseFilter, threshold: 'abc' })).toEqual(mockData);
  });

  it('filters by temperature > 20', () => {
    const result = filterHistoricalData(mockData, { ...baseFilter, threshold: '20' });
    expect(result).toHaveLength(2);
    expect(result[0].temp).toBe(25);
    expect(result[1].temp).toBe(30);
  });

  it('filters by temperature < 20', () => {
    const result = filterHistoricalData(mockData, {
      metric: 'temperature',
      comparison: 'lt',
      threshold: '20',
      chartType: 'line',
    });
    expect(result).toHaveLength(2);
    expect(result[0].temp).toBe(18);
    expect(result[1].temp).toBe(12);
  });

  it('filters by humidity > 50', () => {
    const result = filterHistoricalData(mockData, {
      metric: 'humidity',
      comparison: 'gt',
      threshold: '50',
      chartType: 'line',
    });
    expect(result).toHaveLength(3);
  });

  it('filters by wind speed eq 5', () => {
    const result = filterHistoricalData(mockData, {
      metric: 'windSpeed',
      comparison: 'eq',
      threshold: '5',
      chartType: 'line',
    });
    expect(result).toHaveLength(1);
    expect(result[0].windSpeed).toBe(5);
  });

  it('filters by pressure < 1010', () => {
    const result = filterHistoricalData(mockData, {
      metric: 'pressure',
      comparison: 'lt',
      threshold: '1010',
      chartType: 'line',
    });
    expect(result).toHaveLength(2);
  });
});

describe('filterDataByPeriod', () => {
  it('returns empty array for custom period with no match', () => {
    const result = filterDataByPeriod(mockData, 'custom', '2020-01-01', '2020-01-02');
    expect(result).toHaveLength(0);
  });

  it('returns data for custom period that matches', () => {
    const oneYearAgo = new Date(Date.now() - 365 * 86400000).toISOString().split('T')[0];
    const oneYearFromNow = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];
    const result = filterDataByPeriod(mockData, 'custom', oneYearAgo, oneYearFromNow);
    expect(result).toEqual(mockData);
  });

  it('returns all data for 30d period', () => {
    const result = filterDataByPeriod(mockData, '30d');
    expect(result).toEqual(mockData);
  });
});