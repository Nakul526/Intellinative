import { Linkedin, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import logoWhite from '../../assets/IntelliXbom-White.png';
import logoDark from '../../assets/IntelliXbom-Dark.png';

export default function Footer() {
  const { isDark } = useTheme();
  return (
    <footer
      className="relative pt-12 pb-8 px-6 overflow-hidden"
      style={{ background: 'var(--app-bg)', borderTop: '1px solid var(--app-border-subtle)' }}
    >
      {/* Ghost watermark */}
      <div
        className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap font-black tracking-tighter leading-none"
        style={{
          fontSize: 'clamp(80px, 14vw, 180px)',
          color: 'var(--app-border)',
          fontFamily: 'Inter, system-ui, sans-serif'
        }}
      >
        INTELLIXBOM
      </div>

      {/* Top gradient line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(67,97,238,0.45) 35%, rgba(0,212,170,0.3) 65%, transparent 100%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-4">
              <img
                src={isDark ? logoWhite : logoDark}
                alt="IntelliXBOM"
                className="h-7 w-auto"
              />
            </Link>
            <p className="text-[13px] mb-7 max-w-[240px] leading-relaxed" style={{ color: 'var(--app-text-dimmer)' }}>
              Complete Digital Trust for India's Regulated Infrastructure — field by field.
            </p>
            <div className="flex items-center gap-2.5">
              {[
                { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com',   Icon: Github,   label: 'GitHub' },
                { href: 'https://twitter.com',  Icon: Twitter,  label: 'X / Twitter' },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.94 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200"
                  style={{ color: 'var(--app-text-dimmer)', background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(67,97,238,0.45)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <FooterColumn
            title="Platform"
            links={[
              { label: 'SBOM', href: '/bom-types#sbom' },
              { label: 'CBOM', href: '/bom-types#cbom' },
              { label: 'QBOM', href: '/bom-types#qbom' },
              { label: 'AIBOM', href: '/bom-types#aibom' },
              { label: 'HBOM', href: '/bom-types#hbom' },
              { label: 'Platform Overview', href: '/platform' },
            ]}
          />
          <FooterColumn
            title="Compliance"
            links={[
              { label: 'CERT-In v2.0', href: '/compliance#cert-in' },
              { label: 'RBI Advisory', href: '/compliance#rbi' },
              { label: 'MeitY 2025', href: '/compliance#meity' },
              { label: 'NCIIPC', href: '/compliance#nciipc' },
              { label: 'SEBI', href: '/compliance#sebi' },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: 'About Us', href: '/about' },
              { label: 'Blog', href: '/blog' },
              { label: 'Why IxBOM', href: '/why' },
              { label: 'BOM Comparison', href: '/compare' },
              { label: 'Compliance', href: '/compliance' },
              { label: 'Contact Us', href: '#contact' },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--app-border-subtle)' }}
        >
          <p className="text-[12px] select-none" style={{ color: 'var(--app-text-dimmer)' }}>
            © 2026 IntelliXBOM · Built for India's Digital Sovereignty
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Security'].map(item => (
              <Link
                key={item}
                to={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[12px] transition-colors duration-200"
                style={{ color: 'var(--app-text-dimmer)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)')}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="text-[10px] uppercase tracking-[0.14em] font-black mb-5 select-none" style={{ color: 'var(--app-text-dimmer)' }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link
              to={link.href}
              className="text-[13px] transition-colors duration-150"
              style={{ color: 'var(--app-text-dimmer)' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)')}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
