import React from 'react';
import type { FilterState, Metric, Comparison } from '../utils/filters';

type ChartType = FilterState['chartType'];

interface AdvancedFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const METRICS: { value: Metric; label: string }[] = [
  { value: 'temperature', label: 'Temperature (°C)' },
  { value: 'humidity', label: 'Humidity (%)' },
  { value: 'windSpeed', label: 'Wind Speed (m/s)' },
  { value: 'pressure', label: 'Pressure (hPa)' },
];

const COMPARISONS: { value: Comparison; label: string }[] = [
  { value: 'gt', label: '>' },
  { value: 'lt', label: '<' },
  { value: 'eq', label: '=' },
];

const CHART_TYPES: { value: ChartType; label: string }[] = [
  { value: 'line', label: 'Line' },
  { value: 'bar', label: 'Bar' },
  { value: 'radar', label: 'Radar' },
];

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ filters, onFiltersChange }) => {
  const update = (partial: Partial<FilterState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  return (
    <div
      className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-xl border border-border"
      role="group"
      aria-label="Advanced filters"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="metric-filter" className="text-xs uppercase tracking-wider text-muted-foreground">Metric</label>
        <select
          id="metric-filter"
          value={filters.metric}
          onChange={(e) => update({ metric: e.target.value as Metric })}
          className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border
            focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {METRICS.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="comparison-filter" className="text-xs uppercase tracking-wider text-muted-foreground">Condition</label>
        <select
          id="comparison-filter"
          value={filters.comparison}
          onChange={(e) => update({ comparison: e.target.value as Comparison })}
          className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border
            focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {COMPARISONS.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="threshold-filter" className="text-xs uppercase tracking-wider text-muted-foreground">Value</label>
        <input
          id="threshold-filter"
          type="number"
          value={filters.threshold}
          onChange={(e) => update({ threshold: e.target.value })}
          placeholder="e.g. 25"
          className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border w-24
            focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="chart-type" className="text-xs uppercase tracking-wider text-muted-foreground">Chart type</label>
        <select
          id="chart-type"
          value={filters.chartType}
          onChange={(e) => update({ chartType: e.target.value as ChartType })}
          className="bg-input text-foreground rounded-lg px-3 py-2 text-sm border border-border
            focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {CHART_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default React.memo(AdvancedFilters);