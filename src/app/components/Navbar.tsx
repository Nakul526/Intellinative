import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openDemoModal } from './DemoModal';
import { useTheme } from '../context/ThemeContext';
import logoWhite from '../../assets/IntelliXbom-White.png';
import logoDark from '../../assets/IntelliXbom-Dark.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBOMDropdownOpen, setIsBOMDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setIsScrolled(scrollTop > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const bomTypes = [
    { color: '#4361EE', title: 'SBOM', desc: 'Software packages & dependencies', href: '/bom-types#sbom' },
    { color: '#00D4AA', title: 'CBOM', desc: 'Cryptographic assets & certs', href: '/bom-types#cbom' },
    { color: '#8B5CF6', title: 'QBOM', desc: 'Quantum-vulnerable crypto', href: '/bom-types#qbom' },
    { color: '#F59E0B', title: 'AIBOM', desc: 'AI/ML models & training data', href: '/bom-types#aibom' },
    { color: '#EF4444', title: 'HBOM', desc: 'Hardware & firmware inventory', href: '/bom-types#hbom' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500"
      style={{
        background: isScrolled ? 'var(--app-navbar-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--app-navbar-border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--app-navbar-shadow)' : 'none'
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-10 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, #4361EE, #00D4AA, #8B5CF6)'
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img
            src={isDark ? logoWhite : logoDark}
            alt="IntelliXBOM"
            className="h-8 w-auto transition-opacity duration-200"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/why" label="Why IxBOM" active={isActive('/why')} isDark={isDark} />

          {/* BOM Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsBOMDropdownOpen(true)}
            onMouseLeave={() => setIsBOMDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: isActive('/bom-types') ? 'var(--app-text-primary)' : 'var(--app-text-muted)' }}
            >
              BOM Types
              <motion.span
                animate={{ rotate: isBOMDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-flex' }}
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </motion.span>
            </button>

            <AnimatePresence>
              {isBOMDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[760px] p-6 rounded-2xl"
                  style={{
                    background: 'var(--app-dropdown-bg)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid var(--app-border)',
                    boxShadow: isDark
                      ? '0 24px 80px rgba(0,0,0,0.75), 0 0 40px rgba(67,97,238,0.08)'
                      : '0 24px 80px rgba(0,0,0,0.12), 0 0 40px rgba(67,97,238,0.06)'
                  }}
                >
                  <div className="grid grid-cols-5 gap-3">
                    {bomTypes.map((bom, i) => (
                      <motion.div
                        key={bom.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          to={bom.href}
                          className="flex flex-col items-center text-center gap-3 p-4 rounded-xl transition-all duration-200 group"
                          style={{ border: '1px solid transparent' }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = `${bom.color}10`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${bom.color}30`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                          }}
                        >
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-xs font-black transition-transform duration-200 group-hover:scale-110"
                            style={{ background: `${bom.color}18`, border: `1px solid ${bom.color}35`, color: bom.color }}
                          >
                            {bom.title}
                          </div>
                          <div className="text-[11px] leading-snug" style={{ color: 'var(--app-text-dim)' }}>{bom.desc}</div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: '1px solid var(--app-border-subtle)' }}>
                    <Link to="/compare" className="text-xs font-medium transition-colors" style={{ color: 'var(--app-text-dimmer)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)')}>
                      Compare all BOM types →
                    </Link>
                    <Link to="/bom-types" className="text-xs font-semibold text-[#4361EE] hover:text-[#6B8FFF] transition-colors">
                      View all →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink to="/platform" label="Platform" active={isActive('/platform')} isDark={isDark} />
          <NavLink to="/compliance" label="Compliance" active={isActive('/compliance')} isDark={isDark} />
          <NavLink to="/about" label="About" active={isActive('/about')} isDark={isDark} />
          <NavLink to="/blog" label="Blog" active={isActive('/blog')} isDark={isDark} />
        </div>

        {/* CTA + Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: 'var(--app-elevated)',
              border: '1px solid var(--app-border)',
              color: 'var(--app-text-muted)'
            }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Sun className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                  <Moon className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <button
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--app-text-dim)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dim)')}
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openDemoModal}
            className="px-5 py-2.5 text-sm font-bold text-white rounded-xl transition-shadow duration-200"
            style={{
              background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
              boxShadow: '0 0 20px rgba(67,97,238,0.4)'
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(67,97,238,0.65)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(67,97,238,0.4)')}
          >
            Request Demo →
          </motion.button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl"
            style={{ color: 'var(--app-text-muted)', background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            className="p-2 -mr-2"
            style={{ color: 'var(--app-text-primary)' }}
            onClick={() => setIsMenuOpen(v => !v)}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'var(--app-mobile-menu-bg)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--app-border)'
            }}
          >
            <div className="px-6 py-5 space-y-0.5">
              {[
                { to: '/why', label: 'Why IxBOM' },
                { to: '/bom-types', label: 'BOM Types' },
                { to: '/platform', label: 'Platform' },
                { to: '/compliance', label: 'Compliance' },
                { to: '/about', label: 'About' },
                { to: '/blog', label: 'Blog' },
              ].map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className="block py-3.5 text-sm font-medium transition-colors"
                    style={{ color: 'var(--app-text-muted)', borderBottom: '1px solid var(--app-border-subtle)' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-5 space-y-3">
                <button className="w-full py-3 text-sm font-medium text-left transition-colors" style={{ color: 'var(--app-text-dim)' }}>
                  Sign In
                </button>
                <button
                  onClick={() => { openDemoModal(); setIsMenuOpen(false); }}
                  className="w-full py-3.5 text-sm font-bold text-white rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
                    boxShadow: '0 0 24px rgba(67,97,238,0.4)'
                  }}
                >
                  Request Demo →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({ to, label, active, isDark }: { to: string; label: string; active: boolean; isDark: boolean }) {
  return (
    <Link
      to={to}
      className="relative text-sm font-medium transition-colors duration-200 group"
      style={{ color: active ? 'var(--app-text-primary)' : 'var(--app-text-muted)' }}
    >
      <span style={{ color: 'inherit' }}>{label}</span>
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)' }}
        />
      )}
    </Link>
  );
}
