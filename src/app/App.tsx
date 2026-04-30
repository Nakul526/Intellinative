import { BrowserRouter, Routes, Route } from 'react-router';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import WhyPage from './pages/WhyPage';
import BOMTypesPage from './pages/BOMTypesPage';
import PlatformPage from './pages/PlatformPage';
import CompliancePage from './pages/CompliancePage';
import AboutPage from './pages/AboutPage';
import BOMComparisonPage from './pages/BOMComparisonPage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen antialiased" style={{ background: 'var(--app-bg)', color: 'var(--app-text-primary)' }}>
          <Navbar />
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
          </Routes>
          <Footer />
          <DemoModal />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
