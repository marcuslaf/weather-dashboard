const translations: Record<string, Record<string, string | ((options: Record<string, unknown>) => string)>> = {
  en: {
    appTitle: 'Weather Dashboard',
    loading: 'Loading...',
    loadingDashboard: 'Loading dashboard...',
    searchPlaceholder: 'Search city... (e.g. London, New York, Tokyo)',
    searchCityLabel: 'Search for a city',
    searchWeatherLabel: 'Search weather',
    searchButton: 'Search',
    switchToLightMode: 'Switch to light mode',
    switchToDarkMode: 'Switch to dark mode',
    weatherSummaryFor: (opts: Record<string, unknown>) => `Weather summary for ${opts.city}`,
    feelsLike: 'Feels like',
    showMore: 'Show more',
    showLess: 'Show less',
    detailedMetrics: 'Detailed weather metrics',
    humidity: 'Humidity',
    windSpeed: 'Wind Speed',
    pressure: 'Pressure',
    visibility: 'Visibility',
    noDataToDisplay: 'No data to display',
    lineChartLabel: 'Line chart of temperature and humidity over time',
    barChartLabel: 'Bar chart of wind speed and precipitation',
    radarChartLabel: 'Radar chart comparing weather metrics',
    temperatureC: 'Temperature (°C)',
    humidityPercent: 'Humidity (%)',
    windSpeedMs: 'Wind Speed (m/s)',
    precipitationPercent: 'Precipitation (%)',
    temperature: 'Temperature',
    noDataAvailable: 'No data available',
    tableDate: 'Date',
    tableTemp: 'Temp (°C)',
    tableHumidity: 'Humidity (%)',
    tableWind: 'Wind (m/s)',
    tablePressure: 'Pressure (hPa)',
    tablePagination: (opts: Record<string, unknown>) => `Page ${opts.current} of ${opts.total}`,
    previousPage: 'Previous page',
    nextPage: 'Next page',
    period24h: '24 hours',
    period7d: '7 days',
    period30d: '30 days',
    periodCustom: 'Custom',
    startDate: 'Start date',
    endDate: 'End date',
    to: 'to',
    advancedFilters: 'Advanced filters',
    metric: 'Metric',
    condition: 'Condition',
    value: 'Value',
    valuePlaceholder: 'e.g. 25',
    chartType: 'Chart type',
    chartLine: 'Line',
    chartBar: 'Bar',
    chartRadar: 'Radar',
    historicalCharts: 'Historical Data & Charts',
    dataTable: 'Data Table',
    footerCopyright: (opts: Record<string, unknown>) => `Weather Dashboard © ${opts.year}`,
    footerBuiltWith: 'Built with React, TypeScript, Recharts & TailwindCSS',
    invalidApiKey: 'Invalid API key',
    cityNotFound: 'City not found',
    failedToFetch: 'Failed to fetch',
    failedToFetchWeather: 'Failed to fetch weather data',
    clearSkyDemo: 'clear sky (demo mode)',
    historicalTable: 'Historical weather data table',
    tablePaginationNav: 'Table pagination',
    timePeriodFilter: 'Time period filter',
    citySearch: 'City search',
  },
};

function t(key: string, options?: Record<string, unknown>): string {
  const value = translations.en[key];
  if (!value) return key;
  if (typeof value === 'function') return value(options || {});
  return value;
}

const i18n = {
  language: 'en',
  changeLanguage: jest.fn().mockResolvedValue(undefined),
};

export function useTranslation() {
  return { t, i18n };
}

export default { useTranslation, i18n };
