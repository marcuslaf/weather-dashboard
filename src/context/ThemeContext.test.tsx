import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

function TestConsumer() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme-value">{theme}</span>
      <button data-testid="toggle-btn" onClick={toggleTheme}>Toggle</button>
    </div>
  );
}

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>
  );
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('provides default theme (dark)', () => {
    renderWithTheme();
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  it('toggles theme on button click', () => {
    renderWithTheme();
    const btn = screen.getByTestId('toggle-btn');

    act(() => { btn.click(); });
    expect(screen.getByTestId('theme-value').textContent).toBe('light');

    act(() => { btn.click(); });
    expect(screen.getByTestId('theme-value').textContent).toBe('dark');
  });

  it('persists theme in localStorage', () => {
    renderWithTheme();
    const btn = screen.getByTestId('toggle-btn');

    act(() => { btn.click(); });
    expect(localStorage.getItem('dashboard-theme')).toBe('light');

    act(() => { btn.click(); });
    expect(localStorage.getItem('dashboard-theme')).toBe('dark');
  });

  it('adds/removes dark class on html element', () => {
    renderWithTheme();
    const btn = screen.getByTestId('toggle-btn');

    expect(document.documentElement.classList.contains('dark')).toBe(true);

    act(() => { btn.click(); });
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});