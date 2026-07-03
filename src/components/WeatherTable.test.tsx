import { render, screen, fireEvent } from '@testing-library/react';
import WeatherTable from './WeatherTable';
import type { HistoricalData } from '../types';

const mockData: HistoricalData[] = Array.from({ length: 20 }, (_, i) => ({
  dt: 1700000000 + i * 86400,
  temp: 20 + i,
  humidity: 50 + i,
  windSpeed: 3 + (i % 5),
  pressure: 1010 + i,
  pop: 0.1 + (i * 0.04),
}));

describe('WeatherTable', () => {
  it('renders table headers', () => {
    render(<WeatherTable data={mockData} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Temp (°C)')).toBeInTheDocument();
    expect(screen.getByText('Humidity (%)')).toBeInTheDocument();
    expect(screen.getByText('Wind (m/s)')).toBeInTheDocument();
    expect(screen.getByText('Pressure (hPa)')).toBeInTheDocument();
  });

  it('renders pagination info', () => {
    render(<WeatherTable data={mockData} pageSize={15} />);
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
  });

  it('navigates to next page', () => {
    render(<WeatherTable data={mockData} pageSize={5} />);
    expect(screen.getByText(/Page 1 of 4/)).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(screen.getByText(/Page 2 of 4/)).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(<WeatherTable data={mockData} pageSize={5} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<WeatherTable data={mockData} pageSize={5} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    fireEvent.click(screen.getByLabelText('Next page'));
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(screen.getByLabelText('Next page')).toBeDisabled();
  });

  it('shows no data message when empty', () => {
    render(<WeatherTable data={[]} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });
});