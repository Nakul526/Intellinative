import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import WhyPage from './pages/WhyPage';
import BOMTypesPage from './pages/BOMTypesPage';
import PlatformPage from './pages/PlatformPage';
import CompliancePage from './pages/CompliancePage';
import AboutPage from './pages/AboutPage';
import BOMComparisonPage from './pages/BOMComparisonPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
      style={{
        background: 'var(--c5)',
        boxShadow: '0 4px 20px rgba(0,177,220,0.45)',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(0,177,220,0.65)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,177,220,0.45)')}
    >
      {/* Up chevron */}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
        <path d="M3 10.5L8 5.5L13 10.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen antialiased" style={{ background: 'var(--app-bg)', color: 'var(--app-text-primary)' }}>
          <Navbar />
          <div style={{ paddingTop: 64 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/why" element={<WhyPage />} />
            <Route path="/bom-types" element={<BOMTypesPage />} />
            <Route path="/compare" element={<BOMComparisonPage />} />
            <Route path="/platform" element={<PlatformPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
          </Routes>
          </div>
          <Footer />
          <DemoModal />
          <CookieConsent />
          <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
