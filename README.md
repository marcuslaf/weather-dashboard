# Weather Dashboard

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/marcuslaf/weather-dashboard)
[![Coverage](https://img.shields.io/badge/coverage-90%25-brightgreen)]()
[![Deploy](https://img.shields.io/badge/deploy-Vercel-blueviolet)](https://weather-dashboard-theta-steel.vercel.app/)

> **Live Demo:** [https://weather-dashboard-theta-steel.vercel.app/](https://weather-dashboard-theta-steel.vercel.app/)

---

## 🇧🇷 Português

Um dashboard frontend interativo, modular e de alta qualidade, que consome a API OpenWeatherMap e exibe dados climáticos através de gráficos interativos e filtros avançados.

### Funcionalidades

- **Tema escuro / claro** — Alternância com toggle e persistência da preferência em `localStorage`
- **Gráficos interativos** — Gráficos de Linha, Barra e Radar via Recharts com tooltips informativos
- **Filtros por período** — Últimas 24 horas, 7 dias, 30 dias ou intervalo customizado
- **Filtros avançados** — Combine métrica (temperatura, umidade, vento, pressão) com operador de comparação e valor limite
- **Design responsivo** — Mobile-first, adaptação fluida para mobile, tablet e desktop
- **Acessibilidade** — Atributos ARIA, navegação por teclado, suporte a leitores de tela
- **Performance** — Lazy loading, `React.memo`, `useMemo`, `useCallback`, tabela paginada
- **API real** — OpenWeatherMap (funciona sem chave em modo demonstrativo)

### Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Gráficos | Recharts |
| Estilização | TailwindCSS v4 |
| Testes | Jest + React Testing Library |
| Build | Vite |
| Deploy | Vercel |

### Começando

#### Pré-requisitos

- Node.js >= 18
- npm >= 9

#### Instalação

```bash
git clone https://github.com/marcuslaf/weather-dashboard.git
cd weather-dashboard
npm install
```

#### Variáveis de Ambiente (opcional)

```bash
cp .env.example .env
```

Obtenha uma chave gratuita em [OpenWeatherMap](https://openweathermap.org/api) e adicione ao `.env`:

```
VITE_OPENWEATHER_API_KEY=sua_chave_aqui
```

O app funciona sem chave — entra em modo demonstrativo automaticamente.

#### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

#### Build de Produção

```bash
npm run build
npm run preview
```

### Testes

#### Executar testes

```bash
npm test
```

#### Testes com cobertura

```bash
npm run test:coverage
```

#### Cobertura atual

| Métrica | Cobertura |
|---------|-----------|
| Statements | 90%+ |
| Branches | 87%+ |
| Funções | 81%+ |
| Linhas | 92%+ |

### Estrutura do Projeto

```
src/
├── components/
│   ├── AdvancedFilters.tsx   # Filtros combinados (métrica + operador + valor)
│   ├── Header.tsx            # Header com busca + toggle de tema
│   ├── PeriodFilter.tsx      # Seletor de período (24h/7d/30d/custom)
│   ├── WeatherCard.tsx       # Card de resumo do clima atual
│   ├── WeatherCharts.tsx     # Gráficos Linha, Barra e Radar
│   └── WeatherTable.tsx      # Tabela de dados paginada
├── context/
│   └── ThemeContext.tsx       # Provider de tema escuro/claro
├── utils/
│   ├── filters.ts            # Utilitários de filtragem de dados
│   └── mockData.ts           # Gerador de dados demonstrativos
├── types.ts                  # Definições TypeScript
├── App.tsx                   # Componente raiz com providers
├── main.tsx                  # Ponto de entrada
└── index.css                 # Import Tailwind + variáveis de tema
```

### API

Este projeto utiliza a **OpenWeatherMap Current Weather API**:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Documentação**: [OpenWeatherMap API Docs](https://openweathermap.org/current)

Sem chave configurada, o app utiliza dados mock para gráficos e tabela, e simula resultados na busca por cidade.

### Acessibilidade

- Todos os elementos interativos possuem labels e roles ARIA
- Navegação completa por teclado (Tab, Enter)
- Padrões testados para leitores de tela (`aria-expanded`, `aria-controls`, `role="region"`)
- Contraste de cores atende WCAG AA em ambos os temas
- Indicadores de foco visíveis e consistentes

### Performance

- **Lazy loading**: Gráficos, tabela e card climático são code-split via `React.lazy`
- **Memoização**: `React.memo`, `useMemo`, `useCallback` previnem re-renderizações desnecessárias
- **Tabela paginada**: Paginação limita nós DOM a um número fixo por página
- **Bundle**: ~410kB total, 105kB gzip (Recharts é a maior dependência)

### Deploy

Projeto implantado na Vercel: [https://weather-dashboard-theta-steel.vercel.app/](https://weather-dashboard-theta-steel.vercel.app/)

```bash
npx vercel --prod
```

---

## 🇺🇸 English

An interactive, modular, and high-quality frontend dashboard that consumes the OpenWeatherMap API and displays weather data through interactive charts and advanced filters.

### Features

- **Dark / Light Mode** — Toggle with persistence in `localStorage`
- **Interactive Charts** — Line, Bar, and Radar charts via Recharts with tooltips
- **Period Filters** — 24 hours, 7 days, 30 days, or custom date range
- **Advanced Filters** — Combine metric (temperature, humidity, wind, pressure) with comparison operator and threshold value
- **Responsive Design** — Mobile-first, fluid adaptation across all screen sizes
- **Accessibility** — ARIA attributes, keyboard navigation, screen reader support
- **Performance** — Lazy loading, `React.memo`, `useMemo`, `useCallback`, paginated table
- **Real API Integration** — OpenWeatherMap (works without API key in demo mode)

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Charts | Recharts |
| Styling | TailwindCSS v4 |
| Testing | Jest + React Testing Library |
| Build | Vite |
| Deploy | Vercel |

### Getting Started

#### Prerequisites

- Node.js >= 18
- npm >= 9

#### Installation

```bash
git clone https://github.com/marcuslaf/weather-dashboard.git
cd weather-dashboard
npm install
```

#### Environment Variables (optional)

```bash
cp .env.example .env
```

Get a free API key at [OpenWeatherMap](https://openweathermap.org/api) and add it to `.env`:

```
VITE_OPENWEATHER_API_KEY=your_api_key_here
```

The app works without an API key — it falls back to demo mode automatically.

#### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

#### Production Build

```bash
npm run build
npm run preview
```

### Testing

#### Run Tests

```bash
npm test
```

#### Run Tests with Coverage

```bash
npm run test:coverage
```

#### Current Coverage

| Metric | Coverage |
|--------|----------|
| Statements | 90%+ |
| Branches | 87%+ |
| Functions | 81%+ |
| Lines | 92%+ |

### Project Structure

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
└── index.css                 # Tailwind imports + theme variables
```

### API

This project uses the **OpenWeatherMap Current Weather API**:

- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Documentation**: [OpenWeatherMap API Docs](https://openweathermap.org/current)

When no API key is configured, the app falls back to mock data for charts and table while still allowing city search with simulated results.

### Accessibility

- All interactive elements have ARIA labels and roles
- Keyboard navigation is fully supported (Tab, Enter)
- Screen reader tested patterns (`aria-expanded`, `aria-controls`, `role="region"`)
- Color contrast meets WCAG AA standards in both themes
- Focus indicators are visible and consistent

### Performance

- **Lazy loading**: Charts, table, and weather card are code-split via `React.lazy`
- **Memoization**: `React.memo`, `useMemo`, `useCallback` prevent unnecessary re-renders
- **Paginated table**: Pagination limits DOM nodes to a fixed page size
- **Bundle size**: ~410kB total, 105kB gzipped (Recharts is the largest dependency)

### Deploy

Live demo deployed on Vercel: [https://weather-dashboard-theta-steel.vercel.app/](https://weather-dashboard-theta-steel.vercel.app/)

```bash
npx vercel --prod
```

---

## Licença / License

MIT
