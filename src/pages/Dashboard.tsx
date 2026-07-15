import { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { CloudOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import PeriodFilter, { type Period } from '../components/PeriodFilter';
import AdvancedFilters from '../components/AdvancedFilters';
import type { FilterState } from '../utils/filters';
import type { SummaryData } from '../types';
import { generateMockHistorical } from '../utils/mockData';
import { filterDataByPeriod, filterHistoricalData } from '../utils/filters';

const WeatherCard = lazy(() => import('../components/WeatherCard'));
const WeatherCharts = lazy(() => import('../components/WeatherCharts'));
const WeatherTable = lazy(() => import('../components/WeatherTable'));

const initialFilters: FilterState = {
  metric: 'temperature',
  comparison: 'gt',
  threshold: '',
  chartType: 'line',
};

function LoadingFallback() {
  return (
    <div className="animate-pulse bg-card rounded-xl h-64 border border-border flex items-center justify-center" role="status">
      <span className="text-muted-foreground">Carregando...</span>
    </div>
  );
}

function Dashboard() {
  const { t } = useTranslation();
  const [cityQuery, setCityQuery] = useState('');
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('7d');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const allHistorical = useMemo(() => generateMockHistorical(30), []);

  const handleSearch = useCallback(async () => {
    if (!cityQuery.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      if (!apiKey) {
        setSummaryData({
          city: cityQuery.trim(),
          country: '',
          temperature: 22,
          feelsLike: 20,
          humidity: 55,
          windSpeed: 3.5,
          pressure: 1015,
          visibility: '10.0',
          weatherMain: 'Clear',
          weatherDescription: t('clearSkyDemo'),
          dt: Math.floor(Date.now() / 1000),
        });
        return;
      }

      const url = new URL('https://api.openweathermap.org/data/2.5/weather');
      url.searchParams.set('q', cityQuery.trim());
      url.searchParams.set('appid', apiKey);
      url.searchParams.set('units', 'metric');

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error(res.status === 401 ? t('invalidApiKey') : t('cityNotFound'));
      const json = await res.json();

      setSummaryData({
        city: json.name,
        country: json.sys?.country || '',
        temperature: Math.round(json.main.temp),
        feelsLike: Math.round(json.main.feels_like),
        humidity: json.main.humidity,
        windSpeed: json.wind.speed,
        pressure: json.main.pressure,
        visibility: (json.visibility / 1000).toFixed(1),
        weatherMain: json.weather[0].main,
        weatherDescription: json.weather[0].description,
        dt: json.dt,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : t('failedToFetch'));
    } finally {
      setLoading(false);
    }
  }, [cityQuery, t]);

  const filteredByPeriod = useMemo(
    () => filterDataByPeriod(allHistorical, period, customStart, customEnd),
    [allHistorical, period, customStart, customEnd]
  );

  const chartData = useMemo(
    () => filterHistoricalData(filteredByPeriod, filters),
    [filteredByPeriod, filters]
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        cityQuery={cityQuery}
        onCityQueryChange={setCityQuery}
        onSearch={handleSearch}
        loading={loading}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="main-content" role="main">
        {error && (
          <div className="flex items-center gap-3 p-4 bg-danger/10 text-danger rounded-xl border border-danger/20" role="alert">
            <CloudOff className="w-5 h-5 shrink-0" aria-hidden="true" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {summaryData && cityQuery.trim() && (
          <Suspense fallback={<LoadingFallback />}>
            <WeatherCard data={summaryData} />
          </Suspense>
        )}

        <section aria-labelledby="charts-heading">
          <h2 id="charts-heading" className="text-lg font-semibold mb-4">{t('historicalCharts')}</h2>

          <div className="space-y-4">
            <PeriodFilter
              selected={period}
              onChange={setPeriod}
              customStart={customStart}
              customEnd={customEnd}
              onCustomStartChange={setCustomStart}
              onCustomEndChange={setCustomEnd}
            />

            <AdvancedFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </div>

          <div className="mt-6">
            <Suspense fallback={<LoadingFallback />}>
              <WeatherCharts data={chartData} chartType={filters.chartType} />
            </Suspense>
          </div>
        </section>

        <section aria-labelledby="table-heading">
          <h2 id="table-heading" className="text-lg font-semibold mb-4">{t('dataTable')}</h2>
          <Suspense fallback={<LoadingFallback />}>
            <WeatherTable data={chartData} />
          </Suspense>
        </section>

        <footer className="text-center text-xs text-muted-foreground py-8 border-t border-border">
          <p dangerouslySetInnerHTML={{ __html: t('footerCopyright', { year: new Date().getFullYear() }) }} />
          <p className="mt-1">{t('footerBuiltWith')}</p>
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;
