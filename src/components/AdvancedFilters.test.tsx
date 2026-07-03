import { render, screen, fireEvent } from '@testing-library/react';
import AdvancedFilters from './AdvancedFilters';
import type { FilterState } from '../utils/filters';

describe('AdvancedFilters', () => {
  const defaultFilters: FilterState = {
    metric: 'temperature',
    comparison: 'gt',
    threshold: '',
    chartType: 'line',
  };

  const onFiltersChange = jest.fn();

  it('renders all filter controls', () => {
    render(<AdvancedFilters filters={defaultFilters} onFiltersChange={onFiltersChange} />);
    expect(screen.getByLabelText('Metric')).toBeInTheDocument();
    expect(screen.getByLabelText('Condition')).toBeInTheDocument();
    expect(screen.getByLabelText('Value')).toBeInTheDocument();
    expect(screen.getByLabelText('Chart type')).toBeInTheDocument();
  });

  it('calls onFiltersChange when metric changes', () => {
    render(<AdvancedFilters filters={defaultFilters} onFiltersChange={onFiltersChange} />);
    fireEvent.change(screen.getByLabelText('Metric'), { target: { value: 'humidity' } });
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      metric: 'humidity',
    });
  });

  it('calls onFiltersChange when chart type changes', () => {
    render(<AdvancedFilters filters={defaultFilters} onFiltersChange={onFiltersChange} />);
    fireEvent.change(screen.getByLabelText('Chart type'), { target: { value: 'bar' } });
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      chartType: 'bar',
    });
  });

  it('calls onFiltersChange when threshold changes', () => {
    render(<AdvancedFilters filters={defaultFilters} onFiltersChange={onFiltersChange} />);
    fireEvent.change(screen.getByLabelText('Value'), { target: { value: '25' } });
    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      threshold: '25',
    });
  });
});