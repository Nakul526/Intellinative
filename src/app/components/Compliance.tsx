import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '67, 97, 238';
}

function useCounter(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

const regulations = [
  {
    key: 'CERT-In',
    fullName: 'CERT-In v2.0',
    description: 'SBOM Technical Guidelines',
    sector: 'All Sectors',
    percentage: 94,
    color: '#22C55E',
    requirements: ['21 mandatory fields validated', 'Automated SBOM generation', 'Real-time compliance monitoring'],
  },
  {
    key: 'RBI',
    fullName: 'RBI Advisory 11/2024',
    description: 'Banking & Finance Compliance',
    sector: 'Banking',
    percentage: 89,
    color: '#4361EE',
    requirements: ['Third-party risk assessment', 'Vendor compliance tracking', 'Audit trail maintenance'],
  },
  {
    key: 'MeitY',
    fullName: 'MeitY 2025',
    description: 'Software Security Guidelines',
    sector: 'Government IT',
    percentage: 92,
    color: '#8B5CF6',
    requirements: ['Software supply chain security', 'Vulnerability disclosure', 'Cryptographic inventory'],
  },
];

const stats = [
  { display: '162',  label: 'Regulated entities protected', target: 162 },
  { display: '55+',  label: 'PSU clients onboarded',        target: 55  },
  { display: '21K+', label: 'BOM fields validated daily',   target: 21  },
  { display: '99%',  label: 'Audit pass rate post-IntelliXBOM', target: 99 },
];

export default function Compliance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-14 md:py-20 px-6 overflow-hidden"
      style={{ background: 'var(--app-bg)', borderTop: '1px solid var(--app-border-subtle)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--app-dot-grid) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.05), transparent 70%)' }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.22)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#22C55E] font-bold select-none">
              Compliance Coverage
            </span>
          </div>
          <h2 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.05] mb-4" style={{ color: 'var(--app-text-primary)' }}>
            Every Regulation.
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #22C55E 0%, #4361EE 55%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Every Requirement.
            </span>
          </h2>
          <p className="text-lg max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--app-text-dim)' }}>
            Comprehensive coverage of India's regulatory frameworks with continuous monitoring.
          </p>
        </motion.div>

        {/* Regulation cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {regulations.map((reg, i) => (
            <MeterCard key={reg.key} {...reg} inView={inView} delay={0.12 + i * 0.14} />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'var(--app-border)' }}
        >
          {stats.map((s, i) => (
            <StatTile key={i} {...s} inView={inView} delay={0.6 + i * 0.08} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function MeterCard({
  key: _key,
  fullName,
  description,
  sector,
  percentage,
  color,
  requirements,
  inView,
  delay,
}: {
  key: string;
  fullName: string;
  description: string;
  sector: string;
  percentage: number;
  color: string;
  requirements: string[];
  inView: boolean;
  delay: number;
}) {
  const r = 56, sw = 10;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - percentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-8 overflow-hidden"
      style={{
        background: `linear-gradient(145deg, rgba(${hexToRgb(color)},0.07) 0%, var(--app-card-semi) 100%)`,
        border: `1px solid rgba(${hexToRgb(color)},0.16)`
      }}
    >
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent, ${color}80, transparent)` }}
      />

      <div className="flex items-center justify-between mb-5">
        <span
          className="text-[10px] font-black px-2.5 py-1 rounded-full select-none"
          style={{ background: `rgba(${hexToRgb(color)},0.12)`, color, border: `1px solid rgba(${hexToRgb(color)},0.28)` }}
        >
          {fullName}
        </span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full select-none"
          style={{ background: 'var(--app-elevated)', color: 'var(--app-text-dimmer)', border: '1px solid var(--app-border)' }}
        >
          {sector}
        </span>
      </div>

      <div className="text-[12px] mb-6" style={{ color: 'var(--app-text-dim)' }}>{description}</div>

      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg width="132" height="132" className="-rotate-90">
            <circle cx="66" cy="66" r={r} fill="none" stroke="var(--app-border)" strokeWidth={sw} />
            <motion.circle
              cx="66" cy="66" r={r}
              fill="none"
              stroke={color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: circ }}
              transition={{ duration: 1.5, delay: delay + 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className="text-[32px] font-black leading-none"
              style={{ color }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.9 }}
            >
              {percentage}%
            </motion.span>
            <span className="text-[10px] uppercase tracking-wide mt-1 select-none" style={{ color: 'var(--app-text-dimmer)' }}>Compliance</span>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {requirements.map((req, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.45 + i * 0.07 }}
            className="flex items-center gap-2.5"
          >
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `rgba(${hexToRgb(color)},0.12)` }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            </div>
            <span className="text-[12px] leading-tight" style={{ color: 'var(--app-text-dim)' }}>{req}</span>
          </motion.div>
        ))}
      </div>

      <div
        className="inline-flex items-center gap-1.5 mt-5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
        style={{ background: 'rgba(34,197,94,0.08)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.18)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
        Actively monitored
      </div>
    </motion.div>
  );
}

function StatTile({
  display,
  label,
  target,
  inView,
  delay,
}: {
  display: string;
  label: string;
  target: number;
  inView: boolean;
  delay: number;
}) {
  const val = useCounter(target, 1400, inView);
  const isK = display.includes('K');
  const isPercent = display.includes('%');
  const formatted = isK ? `${val}K+` : isPercent ? `${val}%` : val > 55 ? String(val) : `${val}+`;

  return (
    <div className="px-8 py-8 text-center" style={{ background: 'var(--app-card)' }}>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay }}
        className="text-[44px] md:text-[52px] font-black leading-none mb-2"
        style={{ color: '#4361EE' }}
      >
        {formatted}
      </motion.div>
      <div className="text-[12px] leading-snug max-w-[140px] mx-auto" style={{ color: 'var(--app-text-dimmer)' }}>{label}</div>
    </div>
  );
}
