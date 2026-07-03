import React from 'react';
import { Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  cityQuery: string;
  onCityQueryChange: (query: string) => void;
  onSearch: () => void;
  loading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ cityQuery, onCityQueryChange, onSearch, loading }) => {
  const { theme, toggleTheme } = useTheme();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold tracking-tight" id="app-title">
              Weather Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 flex-1 max-w-md mx-4" role="search" aria-label="City search">
            <div className="relative w-full">
              <input
                type="text"
                value={cityQuery}
                onChange={(e) => onCityQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search city... (e.g. London, New York, Tokyo)"
                className="w-full bg-input text-foreground rounded-lg pl-10 pr-4 py-2 text-sm
                  border border-border focus:outline-none focus:ring-2 focus:ring-ring
                  placeholder:text-muted-foreground transition-all duration-200"
                aria-label="Search for a city"
                disabled={loading}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <button
              onClick={onSearch}
              disabled={loading || !cityQuery.trim()}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium
                hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Search weather"
            >
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            ) : (
              <Moon className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);