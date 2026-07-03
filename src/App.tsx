import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center" role="status">
          <p className="text-muted-foreground animate-pulse">Loading dashboard...</p>
        </div>
      }>
        <Dashboard />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;