import { render, screen, fireEvent } from '@testing-library/react';
import PeriodFilter from './PeriodFilter';
import type { Period } from './PeriodFilter';

describe('PeriodFilter', () => {
  const defaultProps = {
    selected: '7d' as Period,
    onChange: jest.fn(),
    customStart: '',
    customEnd: '',
    onCustomStartChange: jest.fn(),
    onCustomEndChange: jest.fn(),
  };

  it('renders all period buttons', () => {
    render(<PeriodFilter {...defaultProps} />);
    expect(screen.getByText('24 hours')).toBeInTheDocument();
    expect(screen.getByText('7 days')).toBeInTheDocument();
    expect(screen.getByText('30 days')).toBeInTheDocument();
    expect(screen.getByText('Custom')).toBeInTheDocument();
  });

  it('highlights selected period', () => {
    render(<PeriodFilter {...defaultProps} selected="7d" />);
    const btn = screen.getByText('7 days');
    expect(btn).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls onChange when a period button is clicked', () => {
    const onChange = jest.fn();
    render(<PeriodFilter {...defaultProps} onChange={onChange} />);
    fireEvent.click(screen.getByText('30 days'));
    expect(onChange).toHaveBeenCalledWith('30d');
  });

  it('shows date inputs when custom is selected', () => {
    render(<PeriodFilter {...defaultProps} selected="custom" />);
    expect(screen.getByLabelText('Start date')).toBeInTheDocument();
    expect(screen.getByLabelText('End date')).toBeInTheDocument();
  });

  it('calls onCustomStartChange when start date changes', () => {
    const onCustomStartChange = jest.fn();
    render(<PeriodFilter {...defaultProps} selected="custom" onCustomStartChange={onCustomStartChange} />);
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2024-01-01' } });
    expect(onCustomStartChange).toHaveBeenCalledWith('2024-01-01');
  });

  it('hides date inputs when custom is not selected', () => {
    render(<PeriodFilter {...defaultProps} selected="7d" />);
    expect(screen.queryByLabelText('Start date')).not.toBeInTheDocument();
  });
});