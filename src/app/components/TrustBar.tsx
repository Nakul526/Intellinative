import { motion } from 'motion/react';
import type { FC } from 'react';

/* ─── Inline SVG icons for compliance badges ─── */
const IsoIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="1" y="1" width="20" height="20" rx="4" stroke="#00D4FF" strokeWidth="1.5"/>
    <text x="11" y="15" textAnchor="middle" fill="#00D4FF" fontSize="9" fontWeight="700" fontFamily="sans-serif">ISO</text>
  </svg>
);
const Soc2Icon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="11" r="9" stroke="#7B2FFF" strokeWidth="1.5"/>
    <path d="M7 11l3 3 5-5" stroke="#7B2FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const NistIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <polygon points="11,2 20,7 20,15 11,20 2,15 2,7" stroke="#00FF88" strokeWidth="1.5" fill="none"/>
    <text x="11" y="14" textAnchor="middle" fill="#00FF88" fontSize="7" fontWeight="700" fontFamily="sans-serif">NIST</text>
  </svg>
);
const ZeroTrustIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2L3 6v6c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6L11 2z" stroke="#00D4FF" strokeWidth="1.5" fill="none"/>
    <circle cx="11" cy="11" r="2.5" fill="#00D4FF"/>
  </svg>
);
const GdprIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="1" y="1" width="20" height="20" rx="10" stroke="#7B2FFF" strokeWidth="1.5"/>
    <path d="M8 11h4m0 0l-2-2m2 2l-2 2" stroke="#7B2FFF" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="11" cy="11" r="3.5" stroke="#7B2FFF" strokeWidth="1"/>
  </svg>
);
const CisIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M11 2l2.5 7.5H21l-6.2 4.5 2.4 7.5L11 17l-6.2 4.5 2.4-7.5L1 9.5h7.5L11 2z" stroke="#00FF88" strokeWidth="1.5" fill="none"/>
  </svg>
);

/* Marquee badge icon set (lucide-like inline SVGs) */
const MarqueeIcons: Record<string, FC> = {
  'ISO 27001': IsoIcon,
  'SOC 2 Type II': Soc2Icon,
  'NIST CSF': NistIcon,
  'Zero Trust': ZeroTrustIcon,
  'GDPR': GdprIcon,
  'CIS Controls': CisIcon,
  'eBPF Security': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#00D4FF" strokeWidth="1.2"/>
      <path d="M5 8h6M8 5v6" stroke="#00D4FF" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  'DPDP Act': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="2" width="12" height="12" rx="3" stroke="#7B2FFF" strokeWidth="1.2"/>
      <path d="M5 8l2 2 4-4" stroke="#7B2FFF" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
  'SEBI': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <polygon points="8,1 15,5 15,11 8,15 1,11 1,5" stroke="#00FF88" strokeWidth="1.2" fill="none"/>
    </svg>
  ),
  'RBI Guidelines': () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="#00FF88" strokeWidth="1.2"/>
      <path d="M8 4v4l2.5 2.5" stroke="#00FF88" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  ),
};

const marqueeItems = [
  'ISO 27001', 'SOC 2 Type II', 'NIST CSF', 'Zero Trust',
  'GDPR', 'CIS Controls', 'eBPF Security', 'DPDP Act', 'SEBI', 'RBI Guidelines',
];

/* ─── Compliance card data for enterprise grid ─── */
const complianceCards = [
  {
    icon: IsoIcon,
    title: 'ISO 27001',
    desc: 'Internationally recognised information security management framework.',
    color: '#00D4FF',
  },
  {
    icon: Soc2Icon,
    title: 'SOC 2 Type II',
    desc: 'Audited security, availability & confidentiality controls.',
    color: '#7B2FFF',
  },
  {
    icon: NistIcon,
    title: 'NIST CSF',
    desc: 'Risk-based cybersecurity framework aligned to national standards.',
    color: '#00FF88',
  },
  {
    icon: ZeroTrustIcon,
    title: 'Zero Trust',
    desc: 'Never trust, always verify — identity-centric access control.',
    color: '#00D4FF',
  },
  {
    icon: GdprIcon,
    title: 'GDPR',
    desc: 'European data protection & privacy regulation compliance.',
    color: '#7B2FFF',
  },
  {
    icon: CisIcon,
    title: 'CIS Controls',
    desc: 'Prioritised actions to defend against pervasive cyber attacks.',
    color: '#00FF88',
  },
];

/* ─── Trust metric items (right column) ─── */
const trustMetrics = [
  {
    dotColor: '#00D4FF',
    title: 'Enterprise Architecture',
    desc: 'Multi-region active-active deployments with 99.9 % uptime SLA and automated disaster recovery built in from day one.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="1" y="1" width="18" height="18" rx="4" stroke="#00D4FF" strokeWidth="1.5"/>
        <path d="M5 10h4m0 0V6m0 4v4m0-4h4" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    dotColor: '#7B2FFF',
    title: 'AI Governance',
    desc: 'Explainable AI pipelines, model drift detection, bias auditing and full audit trails for every automated decision.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#7B2FFF" strokeWidth="1.5"/>
        <path d="M7 10c0-1.7 1.3-3 3-3s3 1.3 3 3-1.3 3-3 3" stroke="#7B2FFF" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="10" cy="10" r="1.5" fill="#7B2FFF"/>
      </svg>
    ),
  },
  {
    dotColor: '#00FF88',
    title: 'Cloud Security',
    desc: 'Shift-left SAST/DAST, runtime eBPF observability, secrets management and immutable infrastructure by default.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2L3 5.5v5c0 4 3 7.5 7 8.5 4-1 7-4.5 7-8.5v-5L10 2z" stroke="#00FF88" strokeWidth="1.5" fill="none"/>
        <path d="M7 10l2 2 4-4" stroke="#00FF88" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

/* ─── Security shield visualisation ─── */
const ShieldDiagram = () => (
  <div className="relative flex items-center justify-center w-full h-full min-h-[200px]">
    <svg
      width="220"
      height="220"
      viewBox="0 0 220 220"
      fill="none"
      className="opacity-80"
      style={{ filter: 'drop-shadow(0 0 24px rgba(0,212,255,0.25))' }}
    >
      {/* Radiating rings */}
      {[90, 75, 60, 46].map((r, i) => (
        <circle
          key={i}
          cx="110"
          cy="110"
          r={r}
          stroke={i % 2 === 0 ? '#00D4FF' : '#7B2FFF'}
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity={0.3 + i * 0.1}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`${i % 2 === 0 ? 0 : 360} 110 110`}
            to={`${i % 2 === 0 ? 360 : 0} 110 110`}
            dur={`${14 + i * 4}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}
      {/* Shield body */}
      <path
        d="M110 28L48 55v38c0 34 26 65 62 74 36-9 62-40 62-74V55L110 28z"
        stroke="#00D4FF"
        strokeWidth="1.5"
        fill="rgba(0,212,255,0.04)"
      />
      {/* Inner shield */}
      <path
        d="M110 50L72 67v24c0 21 16 40 38 46 22-6 38-25 38-46V67L110 50z"
        stroke="#7B2FFF"
        strokeWidth="1"
        fill="rgba(123,47,255,0.06)"
      />
      {/* Checkmark */}
      <path
        d="M96 100l10 10 18-18"
        stroke="#00FF88"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Pulse dot */}
      <circle cx="110" cy="110" r="4" fill="#00FF88">
        <animate attributeName="r" values="4;8;4" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="1;0.2;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  </div>
);

/* ══════════════════════════════════════════════ */
export default function TrustBar() {
  const doubled = [...marqueeItems, ...marqueeItems];

  return (
    <>
      {/* ── 1. COMPLIANCE MARQUEE STRIP ── */}
      <div
        className="relative w-full overflow-hidden border-t border-b border-[rgba(255,255,255,0.05)]"
        style={{ background: 'rgba(255,255,255,0.015)' }}
      >
        <div
          className="flex whitespace-nowrap py-5"
          style={{ animation: 'marquee 30s linear infinite' }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
        >
          {doubled.map((label, i) => {
            const Icon = MarqueeIcons[label] ?? (() => <span />);
            return (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-2 mx-3 rounded-full border border-[rgba(255,255,255,0.08)] cursor-default select-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.07)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.25)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                <Icon />
                <span
                  className="text-sm font-medium text-[#8A9BB5] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ── 2. ENTERPRISE TRUST SECTION ── */}
      <section className="relative py-20 overflow-hidden" style={{ background: '#050810' }}>
        {/* Ambient background glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(123,47,255,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">
          {/* Section header */}
          <div className="text-center mb-12">
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-6 border border-[rgba(0,212,255,0.3)]"
              style={{
                background: 'rgba(0,212,255,0.08)',
                color: '#00D4FF',
                fontFamily: 'var(--font-display)',
              }}
            >
              Enterprise Grade
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#F0F4FF]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Trusted.&nbsp;
              <span
                style={{
                  background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Certified.
              </span>
              &nbsp;Secure.
            </h2>
          </div>

          {/* Two-column layout */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left col — 60% — Compliance badge grid */}
            <div className="w-full lg:w-[60%]">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {complianceCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    className="relative group p-5 rounded-2xl border border-[rgba(255,255,255,0.06)] cursor-default transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.025)' }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = `${card.color}44`;
                      el.style.background = `${card.color}0d`;
                      el.style.boxShadow = `0 0 28px ${card.color}22`;
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = 'rgba(255,255,255,0.06)';
                      el.style.background = 'rgba(255,255,255,0.025)';
                      el.style.boxShadow = 'none';
                    }}
                  >
                    <div className="mb-3">
                      <card.icon />
                    </div>
                    <p
                      className="text-sm font-semibold text-[#F0F4FF] mb-1"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {card.title}
                    </p>
                    <p className="text-xs text-[#4A5568] leading-relaxed">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right col — 40% — Trust metrics + shield diagram */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
              {/* Shield diagram */}
              <div
                className="rounded-2xl border border-[rgba(255,255,255,0.06)] p-4 flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.02)', minHeight: '220px' }}
              >
                <ShieldDiagram />
              </div>

              {/* Metrics list */}
              <div className="space-y-5">
                {trustMetrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    {/* Colored dot + icon */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                      style={{ background: `${m.dotColor}15`, border: `1px solid ${m.dotColor}30` }}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <p
                        className="text-sm font-semibold text-[#F0F4FF] mb-1"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {m.title}
                      </p>
                      <p className="text-xs text-[#4A5568] leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
