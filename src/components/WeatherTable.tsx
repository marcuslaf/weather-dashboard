import React, { useMemo } from 'react';
import type { HistoricalData } from '../types';

interface WeatherTableProps {
  data: HistoricalData[];
  pageSize?: number;
}

const WeatherTable: React.FC<WeatherTableProps> = ({ data, pageSize = 15 }) => {
  const [page, setPage] = React.useState(0);

  const totalPages = Math.ceil(data.length / pageSize);
  const pageData = useMemo(
    () => data.slice(page * pageSize, (page + 1) * pageSize),
    [data, page, pageSize]
  );

  const goNext = () => setPage((p) => Math.min(p + 1, totalPages - 1));
  const goPrev = () => setPage((p) => Math.max(p - 1, 0));

  if (!data.length) {
    return (
      <div className="text-center py-12 text-muted-foreground" role="status">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden" role="region" aria-label="Historical weather data table">
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm" role="table">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              <th scope="col" className="px-4 py-3 text-left font-medium text-muted-foreground">Date</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-muted-foreground">Temp (°C)</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-muted-foreground">Humidity (%)</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-muted-foreground">Wind (m/s)</th>
              <th scope="col" className="px-4 py-3 text-left font-medium text-muted-foreground">Pressure (hPa)</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, idx) => (
              <tr
                key={row.dt}
                className={`border-b border-border transition-colors hover:bg-muted/30
                  ${idx % 2 === 0 ? 'bg-card' : 'bg-muted/10'}`}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  {new Date(row.dt * 1000).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">{row.temp.toFixed(1)}</td>
                <td className="px-4 py-3">{row.humidity}</td>
                <td className="px-4 py-3">{row.windSpeed.toFixed(1)}</td>
                <td className="px-4 py-3">{row.pressure}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-border" role="navigation" aria-label="Table pagination">
        <span className="text-sm text-muted-foreground">
          Page {page + 1} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={page === 0}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-card border border-border
              hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Previous page"
          >
            Previous
          </button>
          <button
            onClick={goNext}
            disabled={page >= totalPages - 1}
            className="px-3 py-1.5 rounded-lg text-sm font-medium bg-card border border-border
              hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(WeatherTable);