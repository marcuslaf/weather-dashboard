import React from 'react';
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

type ChartType = 'line' | 'bar' | 'radar';

interface WeatherChartsProps {
  data: HistoricalData[];
  chartType: ChartType;
}

const WeatherCharts: React.FC<WeatherChartsProps> = ({ data, chartType }) => {
  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      time: new Date(item.dt * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      }),
      temperature: item.temp,
      humidity: item.humidity,
      windSpeed: item.windSpeed,
      pressure: item.pressure,
      precipitation: item.pop * 100,
    }));
  }, [data]);

  const commonProps = {
    width: 500,
    height: 300,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  if (chartType === 'line') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart {...commonProps} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
            name="Temperature (°C)"
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="hsl(var(--secondary))"
            strokeWidth={2}
            dot={false}
            name="Humidity (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  if (chartType === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart {...commonProps} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="windSpeed" fill="hsl(var(--primary))" name="Wind Speed (m/s)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="precipitation" fill="hsl(var(--secondary))" name="Precipitation (%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  // Radar chart
  const radarData = chartData.map((item) => ({
    time: item.time,
    temperature: Math.max(0, Math.min(100, item.temperature)),
    humidity: item.humidity,
    windSpeed: Math.min(100, item.windSpeed * 5),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid stroke="hsl(var(--border))" />
        <PolarAngleAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} />
        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
        <Radar
          name="Temperature"
          dataKey="temperature"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
        />
        <Radar
          name="Humidity"
          dataKey="humidity"
          stroke="hsl(var(--secondary))"
          fill="hsl(var(--secondary))"
          fillOpacity={0.3}
        />
        <Legend />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '8px',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(WeatherCharts);
