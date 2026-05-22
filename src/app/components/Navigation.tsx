import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import LogoImage from './LogoImage';

const navLinks = [
  { label: 'About',    path: '/about' },
  { label: 'Pillars',  path: '/pillars' },
  { label: 'Services', path: '/services' },
  { label: 'Contact',  path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrolledNavBg = isDark
    ? 'rgba(5,8,16,0.85)'
    : 'rgba(238,242,248,0.90)';

  return (
    <>
      <nav
        style={
          scrolled
            ? {
                background: scrolledNavBg,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                borderBottom: '1px solid transparent',
                backgroundClip: 'padding-box',
              }
            : { background: 'transparent' }
        }
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        {/* Gradient bottom border — only visible when scrolled */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #7B2FFF 30%, #00D4FF 70%, transparent 100%)',
            opacity: scrolled ? 1 : 0,
          }}
        />

        <div
          className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between"
          style={{ height: scrolled ? '60px' : '72px', transition: 'height 0.4s ease' }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            className="flex items-center select-none"
            aria-label="Intellinative home"
          >
            <LogoImage height={44} />
          </Link>

          {/* ── Desktop links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-[15px] font-medium transition-colors duration-200 group ${
                    active ? '' : 'hover:text-[color:var(--text-primary)]'
                  }`}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {link.label}
                  {/* Animated underline */}
                  <span
                    className="absolute -bottom-0.5 left-0 h-[1.5px] rounded-full transition-all duration-300"
                    style={{
                      width: active ? '100%' : '0%',
                      background: 'linear-gradient(90deg, #7B2FFF, #00D4FF)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Hover underline (separate layer so it doesn't conflict with active) */}
                  {!active && (
                    <span
                      className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 rounded-full group-hover:w-full transition-all duration-300"
                      style={{ background: 'rgba(0,212,255,0.55)' }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            })}

            {/* ── Theme toggle ── */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border-bright)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--glass-border)';
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* CTA */}
            <Link
              to="/contact"
              className="relative px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group transition-all duration-300"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {/* Default border (gradient via pseudo-element workaround using box-shadow) */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 group-hover:opacity-0"
                style={{
                  border: '1.5px solid transparent',
                  background:
                    'linear-gradient(var(--bg-primary), var(--bg-primary)) padding-box, linear-gradient(135deg, rgba(123,47,255,0.55), rgba(0,212,255,0.55)) border-box',
                }}
              />
              {/* Hover filled gradient */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
                }}
              />
              <span className="relative z-10 text-[#00D4FF] group-hover:text-white transition-colors duration-300">
                Start Building
              </span>
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden flex items-center justify-center w-10 h-10 transition-colors hover:text-[#00D4FF]"
            style={{ color: 'var(--text-primary)' }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col pointer-events-none"
        style={{
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          background: isDark ? 'rgba(5,8,16,0.97)' : 'rgba(238,242,248,0.97)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        }}
      >
        {/* Top gradient accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #7B2FFF 30%, #00D4FF 70%, transparent)',
          }}
        />

        <div className="flex flex-col items-center justify-center flex-1 gap-10 px-8">
          {navLinks.map((link, i) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="text-3xl font-bold tracking-tight transition-all duration-200"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transitionDelay: mobileOpen ? `${i * 55}ms` : '0ms',
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
                  opacity: mobileOpen ? 1 : 0,
                }}
              >
                {link.label}
                {active && (
                  <span
                    className="block h-[2px] w-full mt-1 rounded-full"
                    style={{ background: 'linear-gradient(90deg, #7B2FFF, #00D4FF)' }}
                  />
                )}
              </Link>
            );
          })}

          {/* Mobile theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-secondary)',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
              transitionDelay: mobileOpen ? `${navLinks.length * 55}ms` : '0ms',
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-10 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 0 24px rgba(0,212,255,0.25), 0 0 48px rgba(123,47,255,0.2)',
              transitionDelay: mobileOpen ? `${(navLinks.length + 1) * 55}ms` : '0ms',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            Start Building
          </Link>
        </div>

        {/* Bottom branding */}
        <div className="pb-10 flex items-center justify-center opacity-40">
          <LogoImage height={28} />
        </div>
      </div>
    </>
  );
}
