import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

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

const riskRows = [
  { component: 'spring-core', version: '5.3.18', risk: 'HIGH',   color: '#EF4444', status: 'ACTION REQUIRED', score: 12 },
  { component: 'openssl',     version: '1.1.1',  risk: 'MEDIUM', color: '#F59E0B', status: 'MONITORING',      score: 45 },
  { component: 'react',       version: '18.2.0', risk: 'LOW',    color: '#00D4AA', status: 'COMPLIANT',       score: 92 },
  { component: 'tensorflow',  version: '2.13.0', risk: 'MEDIUM', color: '#F59E0B', status: 'UNDER REVIEW',    score: 67 },
];

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const score = useCounter(87, 1400, inView);
  const validations = useCounter(1247, 1600, inView);

  return (
    <section
      className="relative py-10 md:py-14 px-6 overflow-hidden"
      style={{ background: 'var(--app-bg-alt)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 85%, rgba(67,97,238,0.06), transparent)' }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(0,212,170,0.08)', border: '1px solid rgba(0,212,170,0.2)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#00D4AA] font-bold select-none">
              Live Dashboard
            </span>
          </div>
          <h2 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.05] mb-4" style={{ color: 'var(--app-text-primary)' }}>
            See Everything.{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #4361EE 0%, #00D4AA 65%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Miss Nothing.
            </span>
          </h2>
          <p className="text-lg max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--app-text-dim)' }}>
            A unified command center for BOM governance, real-time risk scoring, and one-click audit exports.
          </p>
        </motion.div>

        {/* Dashboard window — always dark (it's a UI preview) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #0D1117 0%, #090C12 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 48px 120px rgba(0,0,0,0.82), 0 0 80px rgba(67,97,238,0.09)'
          }}
        >
          {/* Title bar */}
          <div
            className="h-10 border-b border-white/[0.06] flex items-center justify-between px-5"
            style={{ background: '#141A26' }}
          >
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28CA41' }} />
              </div>
              <span className="font-mono text-[11px] text-[#3D4A5C] select-none">
                IntelliXBOM Dashboard · Enterprise
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00D4AA]">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
              Live
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Stat cards */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  label: 'Compliance Score',
                  value: `${score}%`,
                  sub: '+12% this month',
                  subColor: '#00D4AA',
                  progress: score,
                  progressColor: 'linear-gradient(90deg, #4361EE, #00D4AA)',
                },
                {
                  label: 'Active Validations',
                  value: validations.toLocaleString(),
                  sub: '32 require attention',
                  subColor: '#F59E0B',
                  progress: null,
                  progressColor: '',
                },
                {
                  label: 'Risk Level',
                  value: 'Medium',
                  sub: '7 critical items',
                  subColor: '#4361EE',
                  progress: null,
                  progressColor: '',
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.28 + i * 0.09 }}
                  className="relative rounded-xl p-5 overflow-hidden"
                  style={{ background: '#141A26', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <div className="text-[10px] text-[#4B5563] uppercase tracking-[0.1em] font-bold mb-2 select-none">
                    {card.label}
                  </div>
                  <div className="text-3xl font-black text-white mb-1">{card.value}</div>
                  <div className="text-[11px] font-semibold" style={{ color: card.subColor }}>{card.sub}</div>

                  {card.progress !== null && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]">
                      <motion.div
                        className="h-full"
                        style={{ background: card.progressColor }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${card.progress}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* BOM type tabs */}
            <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
              {['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'].map((type, i) => (
                <button
                  key={type}
                  className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200"
                  style={
                    i === 0
                      ? { background: 'rgba(67,97,238,0.15)', color: '#4361EE', border: '1px solid rgba(67,97,238,0.3)' }
                      : { background: 'rgba(255,255,255,0.03)', color: '#4B5563', border: '1px solid rgba(255,255,255,0.05)' }
                  }
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Risk table */}
            <div className="rounded-xl overflow-hidden" style={{ background: '#141A26', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="grid px-5 py-3 border-b border-white/[0.05]" style={{ gridTemplateColumns: '1fr 80px 140px 120px 60px' }}>
                {['Component', 'Risk', 'Status', 'Score', ''].map((h, i) => (
                  <div key={i} className="text-[10px] text-[#3D4A5C] uppercase tracking-[0.1em] font-bold select-none">{h}</div>
                ))}
              </div>

              {riskRows.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.07 }}
                  className="grid px-5 py-3.5 border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  style={{ gridTemplateColumns: '1fr 80px 140px 120px 60px' }}
                >
                  <div>
                    <div className="text-sm font-bold text-white leading-tight">{row.component}</div>
                    <div className="text-[10px] text-[#3D4A5C] font-mono mt-0.5">{row.version}</div>
                  </div>

                  <div className="flex items-center">
                    <span
                      className="inline-block px-2 py-0.5 rounded-md text-[10px] font-black"
                      style={{ background: `${row.color}18`, color: row.color }}
                    >
                      {row.risk}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <span className="text-xs text-[#64748B] font-medium">{row.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-14 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: row.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${row.score}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.55 + i * 0.08 }}
                      />
                    </div>
                    <span className="text-xs font-black text-white">{row.score}</span>
                  </div>

                  <div className="flex items-center">
                    <button className="text-[10px] font-semibold text-[#3D4A5C] hover:text-[#4361EE] transition-colors">
                      View →
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
