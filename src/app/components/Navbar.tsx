import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openDemoModal } from './DemoModal';

/* ── IntelliXBOM wordmark lockup (inline SVG X mark) ─────────── */
function BrandLockup({ size = 20 }: { size?: number }) {
  const xW = size * 0.9;
  return (
    <span className="inline-flex items-center gap-0 select-none" style={{ lineHeight: 1 }}>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.03em',
        color: 'var(--ink-950)',
      }}>Intelli</span>
      <svg
        viewBox="0 0 200 200"
        width={xW}
        height={xW}
        style={{ margin: '0 -1px', transform: 'translateY(-1px)', flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nb-xbase" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#0B5478" />
            <stop offset="55%" stopColor="#00B1DC" />
            <stop offset="100%" stopColor="#3DE0DC" />
          </linearGradient>
          <linearGradient id="nb-xshine" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#0B5478" />
            <stop offset="38%" stopColor="#0B5478" />
            <stop offset="48%" stopColor="#FFFFFF" />
            <stop offset="58%" stopColor="#A8E5F0" />
            <stop offset="75%" stopColor="#00B1DC" />
            <stop offset="100%" stopColor="#3DE0DC" />
          </linearGradient>
        </defs>
        <path d="M 38 28 L 78 28 L 162 172 L 122 172 Z" fill="url(#nb-xbase)" />
        <path d="M 122 28 L 162 28 L 78 172 L 38 172 Z" fill="url(#nb-xshine)" />
      </svg>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.03em',
        color: 'var(--c5)',
      }}>bom</span>
    </span>
  );
}

const BOM_TYPES = [
  { color: 'var(--m-sbom)', title: 'SBOM', desc: 'Software packages & dependencies', href: '/bom-types#sbom' },
  { color: 'var(--m-cbom)', title: 'CBOM', desc: 'Cryptographic assets & certs',     href: '/bom-types#cbom' },
  { color: 'var(--m-qbom)', title: 'QBOM', desc: 'Quantum-vulnerable crypto',         href: '/bom-types#qbom' },
  { color: 'var(--m-aibom)', title: 'AIBOM', desc: 'AI/ML models & training data',   href: '/bom-types#aibom' },
  { color: 'var(--m-hbom)', title: 'HBOM', desc: 'Hardware & firmware inventory',    href: '/bom-types#hbom' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBOMDropdownOpen, setIsBOMDropdownOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

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

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-500"
      style={{
        background: isScrolled ? 'var(--app-navbar-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(24px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--app-navbar-border)' : '1px solid transparent',
        boxShadow: isScrolled ? 'var(--app-navbar-shadow)' : 'none',
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-10 transition-all duration-100"
        style={{ width: `${scrollProgress}%`, background: 'var(--c5)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <BrandLockup size={19} />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          <NavLink to="/why"        label="Why IxBOM"  active={isActive('/why')} />
          <NavLink to="/platform"   label="Platform"   active={isActive('/platform')} />
          <NavLink to="/compliance" label="Compliance" active={isActive('/compliance')} />
          <NavLink to="/about"      label="About"      active={isActive('/about')} />
          <NavLink to="/blog"       label="Blog"       active={isActive('/blog')} />

          {/* BOM dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsBOMDropdownOpen(true)}
            onMouseLeave={() => setIsBOMDropdownOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
              style={{ color: isActive('/bom-types') ? 'var(--ink-950)' : 'var(--ink-600)' }}
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
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] p-5 rounded-2xl"
                  style={{
                    background: 'var(--app-dropdown-bg)',
                    backdropFilter: 'blur(24px)',
                    border: '1px solid var(--p3)',
                    boxShadow: '0 16px 56px rgba(14,26,46,.12)',
                  }}
                >
                  <div className="grid grid-cols-5 gap-3">
                    {BOM_TYPES.map((bom, i) => (
                      <motion.div
                        key={bom.title}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                      >
                        <Link
                          to={bom.href}
                          className="flex flex-col items-center text-center gap-3 p-3.5 rounded-xl transition-all duration-200"
                          style={{ border: '1px solid transparent' }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.background = `color-mix(in srgb, ${bom.color} 8%, transparent)`;
                            (e.currentTarget as HTMLElement).style.borderColor = `color-mix(in srgb, ${bom.color} 30%, transparent)`;
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.background = 'transparent';
                            (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                          }}
                        >
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-[10px] font-black transition-transform duration-200"
                            style={{
                              background: `color-mix(in srgb, ${bom.color} 12%, white)`,
                              border: `1px solid color-mix(in srgb, ${bom.color} 25%, transparent)`,
                              color: bom.color,
                            }}
                          >
                            {bom.title}
                          </div>
                          <div className="text-[11px] leading-snug" style={{ color: 'var(--ink-500)' }}>
                            {bom.desc}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <div
                    className="mt-4 pt-4 flex items-center justify-between"
                    style={{ borderTop: '1px solid var(--p3)' }}
                  >
                    <Link
                      to="/compare"
                      className="text-xs font-medium transition-colors"
                      style={{ color: 'var(--ink-500)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-700)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-500)')}
                    >
                      Compare all BOM types →
                    </Link>
                    <Link
                      to="/bom-types"
                      className="text-xs font-semibold transition-colors"
                      style={{ color: 'var(--c5)' }}
                      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
                    >
                      View all →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: 'var(--ink-500)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-950)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-500)')}
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03, translateY: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={openDemoModal}
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-shadow duration-200"
            style={{
              background: 'var(--c5)',
              boxShadow: '0 2px 8px rgba(0,177,220,0.35)',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,177,220,0.5)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,177,220,0.35)')}
          >
            Request Demo →
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            className="p-2 -mr-2"
            style={{ color: 'var(--ink-700)' }}
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

      {/* Mobile menu */}
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
              borderBottom: '1px solid var(--p3)',
            }}
          >
            <div className="px-6 py-5 space-y-0.5">
              {[
                { to: '/why',        label: 'Why IxBOM' },
                { to: '/bom-types',  label: 'BOM Types' },
                { to: '/platform',   label: 'Platform' },
                { to: '/compliance', label: 'Compliance' },
                { to: '/about',      label: 'About' },
                { to: '/blog',       label: 'Blog' },
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
                    style={{ color: 'var(--ink-600)', borderBottom: '1px solid var(--p3)' }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-5 space-y-3">
                <button className="w-full py-3 text-sm font-medium text-left" style={{ color: 'var(--ink-500)' }}>
                  Sign In
                </button>
                <button
                  onClick={() => { openDemoModal(); setIsMenuOpen(false); }}
                  className="w-full py-3.5 text-sm font-semibold text-white rounded-lg"
                  style={{ background: 'var(--c5)' }}
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

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className="relative text-sm font-medium transition-colors duration-200"
      style={{ color: active ? 'var(--ink-950)' : 'var(--ink-600)' }}
      onMouseEnter={e => !active && ((e.currentTarget as HTMLElement).style.color = 'var(--ink-950)')}
      onMouseLeave={e => !active && ((e.currentTarget as HTMLElement).style.color = 'var(--ink-600)')}
    >
      {label}
      {active && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
          style={{ background: 'var(--c5)' }}
        />
      )}
    </Link>
  );
}
