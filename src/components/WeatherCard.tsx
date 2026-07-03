import { useState, useCallback } from 'react';
import type { SummaryData } from '../types';

interface WeatherCardProps {
  data: SummaryData;
}

function WeatherCard({ data }: WeatherCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <div
      className="bg-card text-card-foreground p-6 rounded-xl shadow-lg border border-border transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring"
      role="region"
      aria-label={`Weather summary for ${data.city}`}
      tabIndex={0}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            {data.city}, {data.country}
          </h2>
          <p className="text-muted-foreground text-sm mt-1 capitalize">
            {data.weatherDescription}
          </p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-bold text-primary">
            {data.temperature}°C
          </span>
          <p className="text-sm text-muted-foreground">
            Feels like {data.feelsLike}°C
          </p>
        </div>
      </div>

      <button
        onClick={handleToggle}
        className="text-sm text-primary hover:underline mb-2"
        aria-expanded={isExpanded}
        aria-controls="weather-details"
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>

      <div
        id="weather-details"
        className={`grid grid-cols-2 gap-4 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        role="group"
        aria-label="Detailed weather metrics"
      >
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs uppercase tracking-wider">Humidity</span>
          <span className="font-medium text-lg">{data.humidity}%</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs uppercase tracking-wider">Wind Speed</span>
          <span className="font-medium text-lg">{data.windSpeed} m/s</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs uppercase tracking-wider">Pressure</span>
          <span className="font-medium text-lg">{data.pressure} hPa</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground text-xs uppercase tracking-wider">Visibility</span>
          <span className="font-medium text-lg">{data.visibility} km</span>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;