import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import BomDependencyGraph from './BomDependencyGraph';

function useCounter(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

const riskRows = [
  { component: 'spring-core', version: '5.3.18', risk: 'HIGH',   color: '#EF6C00', bg: '#FFF3E0', status: 'ACTION REQUIRED', score: 12 },
  { component: 'openssl',     version: '1.1.1',  risk: 'MEDIUM', color: '#F59E0B', bg: '#FEF4E0', status: 'MONITORING',      score: 45 },
  { component: 'react',       version: '18.2.0', risk: 'LOW',    color: '#00B1DC', bg: '#E6F7FC', status: 'COMPLIANT',       score: 92 },
  { component: 'tensorflow',  version: '2.13.0', risk: 'MEDIUM', color: '#F59E0B', bg: '#FEF4E0', status: 'UNDER REVIEW',    score: 67 },
];

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const score       = useCounter(98,   1400, inView);
  const validations = useCounter(1247, 1600, inView);

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p2)' }}
    >
      <div className="max-w-[1440px] mx-auto">

        {/* ── Section header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c5)', animation: 'pulse-dot 2s infinite' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}
            >
              Platform
            </span>
          </div>

          <h2
            className="text-4xl md:text-[52px] font-bold tracking-tight leading-[1.05] mb-4"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.025em' }}
          >
            See everything.{' '}
            <span style={{ color: 'var(--c5)' }}>Miss nothing.</span>
          </h2>
          <p
            className="text-lg max-w-[520px] leading-relaxed"
            style={{ color: 'var(--ink-600)' }}
          >
            A unified command center for BOM governance real-time risk scoring,
            dependency graph, and one-click audit exports.
          </p>
        </motion.div>

        {/* ── Top stat row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'CERT-In Coverage', value: score, unit: '%',  color: 'var(--sem-success)' },
            { label: 'Active Validations', value: validations, unit: '', color: 'var(--c5)' },
            { label: 'BOM Types Covered', value: 5, unit: '', color: 'var(--m-qbom)' },
            { label: 'Critical Items', value: 3, unit: '', color: 'var(--sem-critical)' },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="rounded-xl p-5"
              style={{
                background: 'var(--p0)',
                border: '1px solid var(--p3)',
                boxShadow: 'var(--sh-sm)',
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.1em] font-semibold mb-2 select-none"
                style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
              >
                {card.label}
              </div>
              <div
                className="text-3xl font-bold tabular-nums"
                style={{ color: card.color, letterSpacing: '-0.04em', fontFamily: 'var(--f-d)' }}
              >
                {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                <span className="text-xl">{card.unit}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Dependency Graph ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                className="text-xl font-bold mb-1"
                style={{ color: 'var(--ink-950)', letterSpacing: '-0.02em' }}
              >
                Dependency Graph
              </h3>
              <p className="text-[13px]" style={{ color: 'var(--ink-500)' }}>
                Interactive vulnerability cluster view.{' '}
                <span style={{ fontFamily: 'var(--f-m)' }}>acme-db-01</span> · 2,184 components
              </p>
            </div>
          </div>
          <BomDependencyGraph />
        </motion.div>

        {/* ── Risk table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3
              className="text-xl font-bold"
              style={{ color: 'var(--ink-950)', letterSpacing: '-0.02em' }}
            >
              Component Risk Table
            </h3>
            <div className="flex gap-2 overflow-x-auto">
              {(['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'] as const).map((type, i) => {
                const colors = ['var(--m-sbom)', 'var(--m-cbom)', 'var(--m-qbom)', 'var(--m-aibom)', 'var(--m-hbom)'];
                return (
                  <button
                    key={type}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200"
                    style={
                      i === 0
                        ? { background: 'var(--c1)', color: 'var(--c6)', border: '1px solid var(--c2)' }
                        : { background: 'var(--p0)', color: 'var(--ink-500)', border: '1px solid var(--p3)' }
                    }
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="rounded-xl overflow-hidden"
            style={{ background: 'var(--p0)', border: '1px solid var(--p3)', boxShadow: 'var(--sh-sm)' }}
          >
            {/* Table header */}
            <div
              className="grid px-5 py-3"
              style={{
                gridTemplateColumns: '1fr 80px 160px 120px 60px',
                borderBottom: '1px solid var(--p3)',
                background: 'var(--p1)',
              }}
            >
              {['Component', 'Risk', 'Status', 'Score', ''].map((h, i) => (
                <div
                  key={i}
                  className="text-[10px] uppercase tracking-[0.08em] font-semibold select-none"
                  style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
                >
                  {h}
                </div>
              ))}
            </div>

            {riskRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                className="grid px-5 py-3.5 transition-colors"
                style={{
                  gridTemplateColumns: '1fr 80px 160px 120px 60px',
                  borderBottom: i < riskRows.length - 1 ? '1px solid var(--p3)' : 'none',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--p1)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
              >
                <div>
                  <div
                    className="text-sm font-semibold leading-tight"
                    style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}
                  >
                    {row.component}
                  </div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                    {row.version}
                  </div>
                </div>

                <div className="flex items-center">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold"
                    style={{ background: row.bg, color: row.color, fontFamily: 'var(--f-m)' }}
                  >
                    {row.risk}
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="text-xs font-medium" style={{ color: 'var(--ink-600)' }}>
                    {row.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className="h-1.5 w-14 rounded-full overflow-hidden"
                    style={{ background: 'var(--p3)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: row.color }}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${row.score}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.55 + i * 0.08 }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold tabular-nums"
                    style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}
                  >
                    {row.score}
                  </span>
                </div>

                <div className="flex items-center">
                  <button
                    className="text-[11px] font-medium transition-colors"
                    style={{ color: 'var(--c5)' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
                  >
                    View →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
