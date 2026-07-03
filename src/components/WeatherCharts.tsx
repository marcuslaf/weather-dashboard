import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import type { HistoricalData } from '../types';
import { useTheme } from '../context/ThemeContext';

type ChartType = 'line' | 'bar' | 'radar';

interface WeatherChartsProps {
  data: HistoricalData[];
  chartType: ChartType;
}

function WeatherChartsInner({ data, chartType }: WeatherChartsProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const chartData = useMemo(() => {
    return data.map((item) => ({
      time: new Date(item.dt * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      temperature: Math.round(item.temp * 10) / 10,
      humidity: item.humidity,
      windSpeed: Math.round(item.windSpeed * 10) / 10,
      pressure: item.pressure,
      precipitation: Math.round(item.pop * 100),
    }));
  }, [data]);

  const primary = '#3b82f6';
  const secondary = '#22c55e';
  const gridColor = isDark ? '#334155' : '#e2e8f0';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const tooltipBg = isDark ? '#1e293b' : '#ffffff';
  const tooltipBorder = isDark ? '#334155' : '#e2e8f0';

  const tooltipStyle = {
    backgroundColor: tooltipBg,
    border: `1px solid ${tooltipBorder}`,
    borderRadius: '8px',
    color: textColor,
    fontSize: '13px',
  };

  if (!data.length) {
    return (
      <div
        className="flex items-center justify-center h-64 bg-card rounded-xl border border-border"
        role="status"
      >
        <p className="text-muted-foreground">No data to display</p>
      </div>
    );
  }

  if (chartType === 'line') {
    return (
      <div className="bg-card rounded-xl border border-border p-4" role="img" aria-label="Line chart of temperature and humidity over time">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="time" stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
            <YAxis stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: textColor }} />
            <Line type="monotone" dataKey="temperature" stroke={primary} strokeWidth={2} dot={false} activeDot={{ r: 6, fill: primary }} name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke={secondary} strokeWidth={2} dot={false} name="Humidity (%)" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (chartType === 'bar') {
    return (
      <div className="bg-card rounded-xl border border-border p-4" role="img" aria-label="Bar chart of wind speed and precipitation">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="time" stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
            <YAxis stroke={textColor} tick={{ fill: textColor, fontSize: 12 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend wrapperStyle={{ color: textColor }} />
            <Bar dataKey="windSpeed" fill={primary} name="Wind Speed (m/s)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="precipitation" fill={secondary} name="Precipitation (%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const radarData = chartData.slice(0, 12).map((item) => ({
    time: item.time,
    temperature: Math.max(0, Math.min(100, item.temperature)),
    humidity: item.humidity,
    windSpeed: Math.min(100, item.windSpeed * 10),
  }));

  return (
    <div className="bg-card rounded-xl border border-border p-4" role="img" aria-label="Radar chart comparing weather metrics">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey="time" tick={{ fill: textColor, fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: textColor, fontSize: 10 }} />
          <Radar name="Temperature" dataKey="temperature" stroke={primary} fill={primary} fillOpacity={0.3} />
          <Radar name="Humidity" dataKey="humidity" stroke={secondary} fill={secondary} fillOpacity={0.3} />
          <Legend wrapperStyle={{ color: textColor }} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

const WeatherCharts = React.memo(WeatherChartsInner);
export default WeatherCharts;