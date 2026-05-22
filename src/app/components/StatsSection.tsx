import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

/* ─────────────────────────────────────────
   Count-up animation component
───────────────────────────────────────── */
function CountUpAnimation({
  end,
  suffix = '',
  prefix = '',
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const steps = 72;
          const increment = end / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '80px',
          fontWeight: 800,
          lineHeight: 1,
          background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'inline-block',
        }}
      >
        {prefix}{count}{suffix}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   Inline SVG icons for feature cards
───────────────────────────────────────── */

/* AWS + Azure + GCP logos combined */
const CloudLogosIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* AWS - orange cloud shape */}
    <path
      d="M8 22c-3.3 0-6 2.7-6 6s2.7 6 6 6h10c3.3 0 6-2.7 6-6s-2.7-6-6-6c0-3.9-3.1-7-7-7S5 18.1 5 22"
      stroke="#FF9900"
      strokeWidth="1.3"
      fill="rgba(255,153,0,0.1)"
    />
    <text x="8.5" y="32" fill="#FF9900" fontSize="6" fontWeight="700" fontFamily="sans-serif">AWS</text>

    {/* Azure - blue diamond */}
    <polygon
      points="30,14 38,20 34,30 26,30"
      stroke="#0078D4"
      strokeWidth="1.3"
      fill="rgba(0,120,212,0.1)"
    />
    <text x="27.5" y="39" fill="#0078D4" fontSize="5.5" fontWeight="700" fontFamily="sans-serif">Azure</text>

    {/* GCP - colourful orb */}
    <circle cx="44" cy="21" r="6" stroke="#4285F4" strokeWidth="1.3" fill="rgba(66,133,244,0.08)"/>
    <path d="M41 21h6" stroke="#EA4335" strokeWidth="1.3" strokeLinecap="round"/>
    <path d="M44 18v6" stroke="#34A853" strokeWidth="1.3" strokeLinecap="round"/>
    <text x="39.5" y="33" fill="#4285F4" fontSize="5" fontWeight="700" fontFamily="sans-serif">GCP</text>

    {/* Connecting arcs */}
    <path d="M18 25 Q26 20 26 25" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="2 2" fill="none"/>
    <path d="M38 25 Q38 25 38 25" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" strokeDasharray="2 2" fill="none"/>
  </svg>
);

/* Neural / brain SVG */
const BrainIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    {/* Nodes */}
    {[
      [26, 10], [14, 22], [38, 22], [10, 36], [26, 38], [42, 36],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill={i % 2 === 0 ? 'rgba(123,47,255,0.6)' : 'rgba(0,212,255,0.6)'} />
    ))}
    {/* Edges */}
    {[
      [26,10,14,22],[26,10,38,22],
      [14,22,10,36],[14,22,26,38],
      [38,22,26,38],[38,22,42,36],
    ].map(([x1,y1,x2,y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,212,255,0.25)" strokeWidth="1"/>
    ))}
    {/* Pulse ring on centre node */}
    <circle cx="26" cy="38" r="7" stroke="#00D4FF" strokeWidth="0.8" opacity="0.4">
      <animate attributeName="r" values="7;12;7" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="26" cy="38" r="4" fill="#00D4FF" opacity="0.9"/>
  </svg>
);

/* Shield SVG */
const ShieldIcon = () => (
  <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
    <path
      d="M26 6L8 13.5v14c0 11 8 21.5 18 24 10-2.5 18-13 18-24v-14L26 6z"
      stroke="#00FF88"
      strokeWidth="1.5"
      fill="rgba(0,255,136,0.06)"
    />
    <path
      d="M26 16L17 20v8c0 6 4 11.5 9 13 5-1.5 9-7 9-13v-8L26 16z"
      stroke="#00FF88"
      strokeWidth="1"
      fill="rgba(0,255,136,0.04)"
    />
    <path
      d="M21 28l3.5 3.5L31 23"
      stroke="#00FF88"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ─────────────────────────────────────────
   Feature card data
───────────────────────────────────────── */
const featureCards = [
  {
    Icon: CloudLogosIcon,
    accentColor: '#00D4FF',
    title: 'Multi-Cloud Ready',
    description:
      'Certified architects across AWS, Azure and GCP. Seamless workload portability, unified governance and cost-optimised multi-cloud deployments at enterprise scale.',
    tags: ['AWS', 'Azure', 'GCP'],
  },
  {
    Icon: BrainIcon,
    accentColor: '#7B2FFF',
    title: 'AI-Powered Ops',
    description:
      'ML-driven anomaly detection identifies incidents before they escalate. Auto-remediation playbooks resolve up to 80 % of routine alerts without human intervention.',
    tags: ['ML Ops', 'Auto-Heal', 'AIOps'],
  },
  {
    Icon: ShieldIcon,
    accentColor: '#00FF88',
    title: 'Security-First',
    description:
      'Zero-trust architecture by default. Shift-left SAST/DAST in every pipeline, runtime eBPF observability and cryptographic supply-chain attestation.',
    tags: ['Zero Trust', 'Shift-Left', 'eBPF'],
  },
];

/* ─────────────────────────────────────────
   Stats data
───────────────────────────────────────── */
const stats = [
  { value: 50, suffix: '+', label: 'Enterprise Deployments' },
  { value: 99, suffix: '.9%', label: 'Uptime SLA' },
  { value: 80, suffix: '%', label: 'Toil Reduction' },
  { value: 3, suffix: '×', label: 'Delivery Speed' },
];

/* ══════════════════════════════════════════════ */
export default function StatsSection() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: '#050810' }}>
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(123,47,255,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12">

        {/* ── STATS ROW ── */}
        <div
          className="relative rounded-3xl border border-[rgba(255,255,255,0.06)] mb-12 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          {/* Glass sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 60%)',
            }}
          />

          <div className="relative grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative flex flex-col items-center justify-center py-10 px-6 text-center"
              >
                {/* Vertical separator */}
                {i < stats.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/4 h-1/2 w-[0.5px] bg-[rgba(255,255,255,0.07)]" />
                )}

                <CountUpAnimation end={stat.value} suffix={stat.suffix} />

                <p
                  className="mt-3 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#4A5568]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FEATURE CARDS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative rounded-2xl border border-[rgba(255,255,255,0.06)] p-7 transition-all duration-300 cursor-default overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.025)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${card.accentColor}44`;
                el.style.background = `${card.accentColor}0a`;
                el.style.boxShadow = `0 0 40px ${card.accentColor}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.06)';
                el.style.background = 'rgba(255,255,255,0.025)';
                el.style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
                }}
              />

              {/* Card layout: icon left + text right */}
              <div className="flex items-start gap-5">
                {/* Icon box */}
                <div
                  className="flex-shrink-0 w-[64px] h-[64px] rounded-2xl flex items-center justify-center"
                  style={{
                    background: `${card.accentColor}12`,
                    border: `1px solid ${card.accentColor}28`,
                  }}
                >
                  <card.Icon />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base font-bold text-[#F0F4FF] mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#4A5568] leading-relaxed mb-4">{card.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {card.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide"
                        style={{
                          background: `${card.accentColor}12`,
                          color: card.accentColor,
                          border: `1px solid ${card.accentColor}28`,
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
