import { render, screen, act } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import type { SummaryData } from '../types';

const mockData: SummaryData = {
  city: 'London',
  country: 'GB',
  temperature: 22,
  feelsLike: 20,
  humidity: 65,
  windSpeed: 4.2,
  pressure: 1013,
  visibility: '10.0',
  weatherMain: 'Clouds',
  weatherDescription: 'scattered clouds',
  dt: 1700000000,
};

describe('WeatherCard', () => {
  it('renders city and country', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('London, GB')).toBeInTheDocument();
  });

  it('renders temperature', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('22°C')).toBeInTheDocument();
  });

  it('renders weather description', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('scattered clouds')).toBeInTheDocument();
  });

  it('renders feels like temperature', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByText('Feels like 20°C')).toBeInTheDocument();
  });

  it('has correct aria-label on region', () => {
    render(<WeatherCard data={mockData} />);
    expect(screen.getByRole('region')).toHaveAttribute('aria-label', 'Weather summary for London');
  });

  it('toggles details on button click', () => {
    render(<WeatherCard data={mockData} />);
    const details = screen.getByRole('group', { name: 'Detailed weather metrics' });
    expect(details.className).toContain('max-h-0');

    act(() => { screen.getByText('Show more').click(); });
    expect(details.className).toContain('max-h-96');
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('shows all metric values when expanded', () => {
    render(<WeatherCard data={mockData} />);
    act(() => { screen.getByText('Show more').click(); });

    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('4.2 m/s')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
    expect(screen.getByText('10.0 km')).toBeInTheDocument();
  });
});