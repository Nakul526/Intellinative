import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const regulations = [
  {
    key: 'CERT-In',
    fullName: 'CERT-In',
    description: 'Technical Guidelines v2.0',
    sector: 'All Sectors',
    percentage: 98,
    color: '#10B981',
    border: 'rgba(16,185,129,0.3)',
    bg: '#E6F8F2',
    badge: 'All 5 BOMs Covered',
    requirements: [
      'All 5 BOMs covered',
      'Automated SBOM generation',
      'Real-time compliance monitoring',
    ],
  },
  {
    key: 'RBI',
    fullName: 'RBI',
    description: 'Advisory No. 11/2024',
    sector: 'Banking',
    percentage: 100,
    color: '#00B1DC',
    border: 'rgba(0,177,220,0.3)',
    bg: '#E6F7FC',
    badge: 'Data Sovereignty',
    requirements: [
      'Data sovereignty enforced',
      'Vendor compliance tracking',
      'Audit trail maintenance',
    ],
  },
  {
    key: 'MeitY',
    fullName: 'MeitY',
    description: 'SBOM Guidelines — Oct 2025',
    sector: 'Government IT',
    percentage: 95,
    color: '#C8941F',
    border: 'rgba(200,148,31,0.3)',
    bg: '#FBF5E5',
    badge: 'CycloneDX/SPDX Compliant',
    requirements: [
      'CycloneDX/SPDX compliant',
      'Software supply chain security',
      'Cryptographic inventory',
    ],
  },
];


export default function Compliance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          {/* Eyebrow with dashes */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: 'var(--c5)' }} />
            <span className="text-[11px] uppercase tracking-[0.18em] font-bold"
              style={{ color: 'var(--c5)', fontFamily: 'var(--f-m)' }}>
              Regulatory
            </span>
            <div className="h-px w-8" style={{ background: 'var(--c5)' }} />
          </div>

          <h2
            className="text-4xl md:text-[52px] font-bold leading-[1.05] mb-4"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.025em' }}
          >
            Compliance <span style={{ color: 'var(--c5)' }}>Built-In,</span>
            <br />Not Bolted-On
          </h2>
          <p
            className="text-lg max-w-[560px] leading-relaxed"
            style={{ color: 'var(--ink-600)' }}
          >
            IntelliXBOM is architected around India's regulatory mandates — not adapted to them after the fact.
          </p>
        </motion.div>

        {/* Regulation cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {regulations.map((reg, i) => (
            <MeterCard key={reg.key} {...reg} inView={inView} delay={0.12 + i * 0.14} />
          ))}
        </div>

      </div>
    </section>
  );
}

function MeterCard({
  fullName, description, sector, percentage, color, border, bg, requirements, badge, inView, delay,
}: {
  fullName: string; description: string; sector: string; percentage: number;
  color: string; border: string; bg: string; requirements: string[]; badge: string;
  inView: boolean; delay: number;
}) {
  const r = 56, sw = 9;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - percentage / 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative rounded-2xl p-7 overflow-hidden"
      style={{
        background: 'var(--p0)',
        border: '1px solid var(--p3)',
        boxShadow: 'var(--sh-sm)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = border;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${border.replace('0.3', '0.15')}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-sm)';
      }}
    >
      {/* Gold left stripe (compliance badge style) */}
      <div
        className="absolute top-0 left-0 bottom-0 w-[3px]"
        style={{ background: 'var(--gold-5)' }}
      />

      <div className="flex items-center justify-between mb-5 pl-3">
        <span
          className="text-[10px] font-bold px-2.5 py-1 rounded select-none"
          style={{
            background: bg, color, border: `1px solid ${border}`,
            fontFamily: 'var(--f-m)', letterSpacing: '0.04em',
          }}
        >
          {fullName}
        </span>
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded select-none"
          style={{ background: 'var(--p1)', color: 'var(--ink-500)', border: '1px solid var(--p3)' }}
        >
          {sector}
        </span>
      </div>

      <div className="text-[12px] mb-5 pl-3" style={{ color: 'var(--ink-500)' }}>{description}</div>

      {/* Donut meter */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <svg width="132" height="132" className="-rotate-90">
            <circle cx="66" cy="66" r={r} fill="none" stroke="var(--p3)" strokeWidth={sw} />
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
              className="text-[32px] font-bold leading-none tabular-nums"
              style={{ color, letterSpacing: '-0.04em' }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: delay + 0.9 }}
            >
              {percentage}%
            </motion.span>
            <span
              className="text-[9px] uppercase tracking-wide mt-1 select-none"
              style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
            >
              Compliance
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 pl-3">
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
              style={{ background: bg }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
            </div>
            <span className="text-[12px] leading-tight" style={{ color: 'var(--ink-600)' }}>{req}</span>
          </motion.div>
        ))}
      </div>

      <div
        className="inline-flex items-center gap-1.5 mt-5 px-2.5 py-1 rounded text-[10px] font-semibold ml-3"
        style={{
          background: 'var(--sem-success-bg)',
          color: 'var(--sem-success)',
          border: '1px solid rgba(16,185,129,0.2)',
          fontFamily: 'var(--f-m)',
        }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: 'var(--sem-success)', animation: 'pulse-dot 2s infinite' }}
        />
        {badge}
      </div>
    </motion.div>
  );
}
