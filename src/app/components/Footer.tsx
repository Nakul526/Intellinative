import { Link } from 'react-router';
import { Linkedin, Github, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import LogoImage from './LogoImage';

function GlassIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,212,255,0.35)] transition-all duration-300"
      style={{ background: 'rgba(255,255,255,0.03)' }}
    >
      <span className="text-[#8A9BB5] group-hover:text-[#00D4FF] transition-colors duration-300">
        {children}
      </span>
    </a>
  );
}

const companyLinks = [
  { label: 'About',    path: '/about' },
  { label: 'Pillars',  path: '/pillars' },
  { label: 'Services', path: '/services' },
  { label: 'Contact',  path: '/contact' },
];

const capabilityLinks = [
  { label: 'Cloud Native',        path: '/services#cloud-native' },
  { label: 'Platform Engineering', path: '/services#platform-eng' },
  { label: 'AIOps',               path: '/services#aiops' },
  { label: 'Security',            path: '/services#security' },
  { label: 'App Modernization',   path: '/services#app-modernization' },
  { label: 'Data & AI',           path: '/services#data-ai' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050810] text-[#F0F4FF]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      {/* ── Top gradient accent line ── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #7B2FFF 20%, #00D4FF 50%, #7B2FFF 80%, transparent 100%)',
        }}
      />

      {/* ── Subtle radial ambient glow behind content ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-[0.07]"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, #7B2FFF 0%, #00D4FF 50%, transparent 75%)',
          filter: 'blur(48px)',
        }}
      />

      {/* ── Main grid ── */}
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

          {/* ── Col 1: Brand (wider) ── */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <Link to="/" className="flex items-center select-none w-fit">
              <LogoImage height={44} />
            </Link>

            <div className="space-y-1">
              <p className="text-base font-semibold text-[#F0F4FF]">
                Engineering Intelligence. Built Native.
              </p>
              <p className="text-sm text-[#8A9BB5] leading-relaxed">
                Platform engineering for the AI-native enterprise.
              </p>
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-3 mt-1">
              <GlassIconButton href="https://linkedin.com/company/intellinative" label="LinkedIn">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Linkedin size={16} />
                  LinkedIn
                </span>
              </GlassIconButton>
              <GlassIconButton href="https://github.com/intellinative" label="GitHub">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Github size={16} />
                  GitHub
                </span>
              </GlassIconButton>
            </div>
          </div>

          {/* ── Col 2: Company ── */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB5] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#8A9BB5] hover:text-[#F0F4FF] transition-colors duration-200 group flex items-center gap-1"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute -bottom-px left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #7B2FFF, #00D4FF)' }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Capabilities ── */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB5] mb-5">
              Capabilities
            </h4>
            <ul className="space-y-3">
              {capabilityLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-[#8A9BB5] hover:text-[#F0F4FF] transition-colors duration-200 group flex items-center gap-1"
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className="absolute -bottom-px left-0 h-[1px] w-0 group-hover:w-full transition-all duration-300 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #7B2FFF, #00D4FF)' }}
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Connect ── */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#8A9BB5] mb-5">
              Connect
            </h4>

            <div className="space-y-4 mb-6">
              <a
                href="mailto:hello@intellinative.com"
                className="flex items-center gap-3 group"
              >
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.08)] group-hover:border-[rgba(0,212,255,0.35)] transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <Mail size={14} className="text-[#8A9BB5] group-hover:text-[#00D4FF] transition-colors duration-300" />
                </span>
                <span className="text-sm text-[#8A9BB5] group-hover:text-[#F0F4FF] transition-colors duration-200">
                  hello@intellinative.com
                </span>
              </a>

              <div className="flex items-center gap-3">
                <span
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-[rgba(255,255,255,0.08)]"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  <MapPin size={14} className="text-[#8A9BB5]" />
                </span>
                <span className="text-sm text-[#8A9BB5]">India · Global Delivery</span>
              </div>
            </div>

            {/* Get in Touch glass button */}
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(255,255,255,0.1)] hover:border-[rgba(0,212,255,0.4)] transition-all duration-300 text-sm font-medium text-[#F0F4FF]"
              style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)' }}
            >
              Get in Touch
              <ArrowUpRight
                size={15}
                className="text-[#8A9BB5] group-hover:text-[#00D4FF] transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform"
              />
            </Link>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs text-[#8A9BB5] opacity-70">
            © 2025 Intellinative. All rights reserved.
          </p>
          <p
            className="text-xs font-medium opacity-70"
            style={{
              background: 'linear-gradient(90deg, #7B2FFF, #00D4FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Built with intelligence.
          </p>
        </div>
      </div>
    </footer>
  );
}
