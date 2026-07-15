import { Suspense, lazy } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useTranslation } from 'react-i18next';

const Dashboard = lazy(() => import('./pages/Dashboard'));

function AppContent() {
  const { t } = useTranslation();
  return (
    <ThemeProvider>
      <Suspense fallback={
        <div className="min-h-screen bg-background flex items-center justify-center" role="status">
          <p className="text-muted-foreground animate-pulse">{t('loadingDashboard')}</p>
        </div>
      }>
        <Dashboard />
      </Suspense>
    </ThemeProvider>
  );
}

function App() {
  return <AppContent />;
}

export default App;
