import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeContext';
import Header from './Header';

function renderHeader(props: Partial<Parameters<typeof Header>[0]> = {}) {
  return render(
    <ThemeProvider>
      <Header
        cityQuery=""
        onCityQueryChange={jest.fn()}
        onSearch={jest.fn()}
        loading={false}
        {...props}
      />
    </ThemeProvider>
  );
}

describe('Header', () => {
  it('renders the title', () => {
    renderHeader();
    expect(screen.getByText('Weather Dashboard')).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderHeader();
    expect(screen.getByLabelText('Search for a city')).toBeInTheDocument();
  });

  it('renders search button', () => {
    renderHeader();
    expect(screen.getByLabelText('Search weather')).toBeInTheDocument();
  });

  it('disables search button when query is empty', () => {
    renderHeader({ cityQuery: '' });
    expect(screen.getByLabelText('Search weather')).toBeDisabled();
  });

  it('enables search button when query is not empty', () => {
    renderHeader({ cityQuery: 'London' });
    expect(screen.getByLabelText('Search weather')).not.toBeDisabled();
  });

  it('shows loading text when loading', () => {
    renderHeader({ cityQuery: 'London', loading: true });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('disables search and input when loading', () => {
    renderHeader({ cityQuery: 'London', loading: true });
    expect(screen.getByLabelText('Search weather')).toBeDisabled();
    expect(screen.getByLabelText('Search for a city')).toBeDisabled();
  });

  it('calls onSearch when button is clicked', () => {
    const onSearch = jest.fn();
    renderHeader({ cityQuery: 'London', onSearch });
    fireEvent.click(screen.getByLabelText('Search weather'));
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = jest.fn();
    renderHeader({ cityQuery: 'London', onSearch });
    const input = screen.getByLabelText('Search for a city');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('has theme toggle button', () => {
    renderHeader();
    expect(screen.getByLabelText(/Switch to/)).toBeInTheDocument();
  });
});