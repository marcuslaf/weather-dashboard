# Weather Dashboard

An interactive, modular, and high-quality frontend dashboard that consumes the OpenWeatherMap API and displays weather data through interactive charts and advanced filters.

## Features

- **Dark / Light Mode** — Toggle with persistence in `localStorage`
- **Interactive Charts** — Line, Bar, and Radar charts via Recharts with tooltips
- **Period Filters** — 24 hours, 7 days, 30 days, or custom date range
- **Advanced Filters** — Combine metric, comparison operator, and threshold
- **Responsive Design** — Mobile-first, fluid adaptation across all screen sizes
- **Accessibility** — ARIA attributes, keyboard navigation, screen reader support
- **Performance** — Lazy loading, `React.memo`, `useMemo`, `useCallback`, paginated table
- **Real API Integration** — OpenWeatherMap (optional; works in demo mode without API key)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Charts | Recharts |
| Styling | TailwindCSS v4 |
| Testing | Jest + React Testing Library |
| Build | Vite |
| Deploy | Vercel / Netlify |

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
git clone <repo-url>
cd weather-dashboard
npm install
```

### Environment Variables (optional)

```bash
cp .env.example .env
```

Get a free API key at [OpenWeatherMap](https://openweathermap.org/api) and add it to `.env`:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

The app works without an API key — it falls back to demo data automatically.

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Testing

### Run Tests

```bash
npm test
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Current Coverage

| Metric | Coverage |
|--------|----------|
| Statements | 90%+ |
| Branches | 87%+ |
| Functions | 81%+ |
| Lines | 92%+ |

## Project Structure

```
src/
├── components/
│   ├── AdvancedFilters.tsx   # Combined metric/comparison/threshold filters
│   ├── Header.tsx            # App header with search + theme toggle
│   ├── PeriodFilter.tsx      # Time period selector (24h/7d/30d/custom)
│   ├── WeatherCard.tsx       # Current weather summary card
│   ├── WeatherCharts.tsx     # Line, Bar, Radar charts
│   └── WeatherTable.tsx      # Paginated data table
├── context/
│   └── ThemeContext.tsx       # Dark/light theme provider
├── utils/
│   ├── filters.ts            # Data filtering utilities
│   └── mockData.ts           # Demo data generator
├── types.ts                  # TypeScript type definitions
├── App.tsx                   # Root component with providers
├── main.tsx                  # Entry point
└── index.css                 # Tailwind imports + theme tokens
```

## API

This project uses the **OpenWeatherMap Current Weather API**:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/current)

When no API key is configured, the app falls back to mock data for charts and table while still allowing city search with simulated results.

## Accessibility

- All interactive elements have ARIA labels and roles
- Keyboard navigation is fully supported (Tab, Enter, Escape)
- Screen reader tested patterns (aria-expanded, aria-controls, role="region")
- Color contrast meets WCAG AA standards in both themes
- Focus indicators are visible and consistent

## Performance

- **Lazy loading**: Charts, table, and weather card are code-split via `React.lazy`
- **Memoization**: `React.memo`, `useMemo`, `useCallback` prevent unnecessary re-renders
- **Virtualized table**: Pagination limits DOM nodes to a fixed page size
- **Bundle size**: ~410kB total, 105kB gzipped (Recharts is the largest dependency)

## Deploy

### Vercel

```bash
npx vercel --prod
```

### Netlify

```bash
npx netlify deploy --prod
```

Both platforms auto-detect the Vite configuration. Set `VITE_OPENWEATHER_API_KEY` as an environment variable in the dashboard.

## License

MIT