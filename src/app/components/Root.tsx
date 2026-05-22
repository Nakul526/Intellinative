import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navigation from './Navigation';
import Footer from './Footer';
import { ThemeProvider } from '../../context/ThemeContext';

export default function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div
        className="min-h-screen antialiased"
        style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <Navigation />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
