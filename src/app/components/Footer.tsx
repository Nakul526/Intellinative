import { Linkedin, Github, Twitter, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';

function BrandLockup({ size = 17 }: { size?: number }) {
  const xW = size * 0.9;
  return (
    <span className="inline-flex items-center gap-0 select-none" style={{ lineHeight: 1 }}>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700,
        fontSize: size, letterSpacing: '-0.03em', color: 'var(--ink-950)',
      }}>Intelli</span>
      <svg
        viewBox="0 0 200 200" width={xW} height={xW}
        style={{ margin: '0 -1px', transform: 'translateY(-1px)', flexShrink: 0 }}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ft-xbase" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%"   stopColor="#0B5478" />
            <stop offset="55%"  stopColor="#00B1DC" />
            <stop offset="100%" stopColor="#3DE0DC" />
          </linearGradient>
          <linearGradient id="ft-xshine" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%"   stopColor="#0B5478" />
            <stop offset="38%"  stopColor="#0B5478" />
            <stop offset="48%"  stopColor="#FFFFFF" />
            <stop offset="58%"  stopColor="#A8E5F0" />
            <stop offset="75%"  stopColor="#00B1DC" />
            <stop offset="100%" stopColor="#3DE0DC" />
          </linearGradient>
        </defs>
        <path d="M 38 28 L 78 28 L 162 172 L 122 172 Z" fill="url(#ft-xbase)" />
        <path d="M 122 28 L 162 28 L 78 172 L 38 172 Z" fill="url(#ft-xshine)" />
      </svg>
      <span style={{
        fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700,
        fontSize: size, letterSpacing: '-0.03em', color: 'var(--c5)',
      }}>bom</span>
    </span>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,177,220,0.5) 35%, rgba(61,224,220,0.3) 65%, transparent 100%)' }} />

      <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center mb-5">
              <BrandLockup size={20} />
            </Link>
            <p className="text-[13px] mb-6 max-w-[240px] leading-relaxed"
              style={{ color: 'var(--ink-500)' }}>
              Complete Digital Trust for India's most regulated environments — field by field.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5 mb-6">
              {[
                { href: 'https://linkedin.com', Icon: Linkedin, label: 'LinkedIn' },
                { href: 'https://github.com',   Icon: Github,   label: 'GitHub'   },
                { href: 'https://twitter.com',  Icon: Twitter,  label: 'X / Twitter' },
              ].map(({ href, Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.94 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ color: 'var(--ink-500)', background: 'var(--p1)', border: '1px solid var(--p3)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--c5)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,177,220,0.4)';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,177,220,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = 'var(--ink-500)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                    (e.currentTarget as HTMLElement).style.background = 'var(--p1)';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex flex-wrap gap-2">
              {['CERT-In', 'RBI', 'MeitY', 'NCIIPC'].map(f => (
                <span key={f}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold"
                  style={{
                    background: 'rgba(200,148,31,0.08)',
                    border: '1px solid rgba(200,148,31,0.22)',
                    color: '#C8941F',
                    fontFamily: 'var(--f-m)',
                    letterSpacing: '0.04em',
                  }}>
                  {f}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn title="Platform" links={[
            { label: 'SBOM', href: '/bom-types#sbom' },
            { label: 'CBOM', href: '/bom-types#cbom' },
            { label: 'QBOM', href: '/bom-types#qbom' },
            { label: 'AIBOM', href: '/bom-types#aibom' },
            { label: 'HBOM', href: '/bom-types#hbom' },
            { label: 'Platform Overview', href: '/platform' },
          ]} />

          <FooterColumn title="Compliance" links={[
            { label: 'CERT-In v2.0', href: '/compliance#cert-in' },
            { label: 'RBI Advisory', href: '/compliance#rbi' },
            { label: 'MeitY 2025', href: '/compliance#meity' },
            { label: 'NCIIPC', href: '/compliance#nciipc' },
            { label: 'SEBI', href: '/compliance#sebi' },
          ]} />

          <FooterColumn title="Company" links={[
            { label: 'About Us', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Why IxBOM', href: '/why' },
            { label: 'BOM Comparison', href: '/compare' },
            { label: 'Contact Us', href: '#contact' },
          ]} />
        </div>

        {/* Contact strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-5 py-4 rounded-xl mb-8"
          style={{ background: 'var(--p1)', border: '1px solid var(--p3)' }}>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'rgba(0,177,220,0.1)', border: '1px solid rgba(0,177,220,0.2)' }}>
              <Shield className="w-3.5 h-3.5" style={{ color: 'var(--c5)' }} />
            </div>
            <span className="text-[12px] font-semibold" style={{ color: 'var(--ink-950)' }}>
              Enterprise Enquiries
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" style={{ color: 'var(--c5)' }} />
            <a href="mailto:sales@intellixbom.com"
              className="text-[13px] font-medium transition-colors"
              style={{ color: 'var(--c5)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}>
              sales@intellixbom.com
            </a>
          </div>
          <div className="sm:ml-auto text-[11px]" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
            Response within 24 hrs
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid var(--p3)' }}>
          <p className="text-[12px] select-none" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
            © 2026 IntelliXBOM · Built for India's Digital Sovereignty
          </p>
          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Security'].map(item => (
              <Link key={item}
                to={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[12px] transition-colors duration-200"
                style={{ color: 'var(--ink-400)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-400)')}>
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
      <h4 className="text-[10px] uppercase tracking-[0.14em] font-bold mb-5 select-none"
        style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map(link => (
          <li key={link.label}>
            <Link to={link.href}
              className="text-[13px] transition-colors duration-150"
              style={{ color: 'var(--ink-600)' }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--ink-600)')}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
