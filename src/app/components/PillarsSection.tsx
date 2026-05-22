'use client';

import { motion } from 'motion/react';

/* ─── Security SVG: Shield with circuit board + concentric rings ─── */
function SecuritySVG() {
  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="sec-bloom" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="sec-glow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="shield-clip">
          {/* Shield path clip for circuit lines */}
          <path d="M140 20 L200 46 L200 110 Q200 160 140 185 Q80 160 80 110 L80 46 Z" />
        </clipPath>
      </defs>

      {/* Bloom */}
      <ellipse cx="140" cy="110" rx="90" ry="80" fill="url(#sec-bloom)" />

      {/* Concentric rings — pulsing */}
      {[60, 78, 96].map((r, i) => (
        <circle
          key={r}
          cx="140"
          cy="108"
          r={r}
          fill="none"
          stroke="#00D4FF"
          strokeWidth="0.75"
          strokeOpacity="0.18"
        >
          <animate
            attributeName="r"
            values={`${r};${r + 8};${r}`}
            dur={`${3 + i * 0.7}s`}
            begin={`${i * 0.6}s`}
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            values="0.18;0.06;0.18"
            dur={`${3 + i * 0.7}s`}
            begin={`${i * 0.6}s`}
            repeatCount="indefinite"
          />
        </circle>
      ))}

      {/* Shield body */}
      <path
        d="M140 24 L196 48 L196 112 Q196 158 140 182 Q84 158 84 112 L84 48 Z"
        fill="rgba(0,212,255,0.06)"
        stroke="#00D4FF"
        strokeWidth="1.5"
        strokeOpacity="0.5"
        filter="url(#sec-glow)"
      />

      {/* Circuit lines inside shield */}
      <g clipPath="url(#shield-clip)" stroke="#00D4FF" strokeWidth="1" strokeOpacity="0.3" fill="none">
        {/* Horizontal grid */}
        {[72, 88, 104, 120, 136].map((yy) => (
          <line key={yy} x1="85" y1={yy} x2="195" y2={yy} strokeDasharray="4 6" />
        ))}
        {/* Vertical grid */}
        {[105, 122, 140, 158, 175].map((xx) => (
          <line key={xx} x1={xx} y1="48" x2={xx} y2="170" strokeDasharray="4 6" />
        ))}
        {/* Circuit nodes */}
        {[
          [105, 72], [140, 72], [175, 88],
          [122, 104], [158, 104],
          [105, 120], [175, 120],
          [140, 136],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#00D4FF" fillOpacity="0.6" stroke="none" />
        ))}
      </g>

      {/* Center shield lock icon */}
      <g filter="url(#sec-glow)">
        <rect x="127" y="105" width="26" height="22" rx="4" fill="rgba(0,212,255,0.15)" stroke="#00D4FF" strokeWidth="1.5" />
        <path d="M133 105 Q133 96 140 96 Q147 96 147 105" fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="140" cy="116" r="3" fill="#00D4FF">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

/* ─── Compliance SVG: Document stack + certification badges ─── */
function ComplianceSVG() {
  const badges = [
    { label: 'ISO', x: 88, y: 52 },
    { label: 'SOC2', x: 148, y: 52 },
    { label: 'GDPR', x: 208, y: 52 },
    { label: 'NIST', x: 88, y: 110 },
    { label: 'DPDP', x: 148, y: 110 },
    { label: 'HIPAA', x: 208, y: 110 },
  ];

  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="comp-badge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="comp-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B2FFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <radialGradient id="comp-bloom" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="comp-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="150" cy="110" rx="100" ry="75" fill="url(#comp-bloom)" />

      {/* Layered document stack (back to front) */}
      {[
        { x: 110, y: 145, op: 0.15 },
        { x: 107, y: 140, op: 0.25 },
        { x: 104, y: 135, op: 0.4 },
      ].map((d, i) => (
        <rect
          key={i}
          x={d.x}
          y={d.y}
          width={80}
          height={46}
          rx="5"
          fill={`rgba(123,47,255,${d.op})`}
          stroke="rgba(123,47,255,0.3)"
          strokeWidth="0.75"
        />
      ))}

      {/* Certification badges grid */}
      {badges.map((b, i) => (
        <g key={b.label} opacity="0">
          <animate
            attributeName="opacity"
            from={0}
            to={1}
            dur="0.4s"
            begin={`${0.2 + i * 0.12}s`}
            fill="freeze"
          />
          {/* Badge hex shape */}
          <path
            d={`M${b.x} ${b.y - 20} L${b.x + 18} ${b.y - 10} L${b.x + 18} ${b.y + 10} L${b.x} ${b.y + 20} L${b.x - 18} ${b.y + 10} L${b.x - 18} ${b.y - 10} Z`}
            fill="url(#comp-badge-grad)"
            stroke="url(#comp-stroke)"
            strokeWidth="1"
            filter="url(#comp-glow)"
          />
          {/* Checkmark */}
          <text
            x={b.x}
            y={b.y - 4}
            textAnchor="middle"
            fill="#00FF88"
            fontSize="9"
            fontFamily="sans-serif"
          >
            ✓
          </text>
          <text
            x={b.x}
            y={b.y + 8}
            textAnchor="middle"
            fill="#F0F4FF"
            fontSize="7"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
            letterSpacing="0.5"
          >
            {b.label}
          </text>
        </g>
      ))}

      {/* Animated scan line */}
      <rect x="70" y="50" width="160" height="2" fill="url(#comp-stroke)" opacity="0.4">
        <animate
          attributeName="y"
          values="50;130;50"
          dur="3s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="0.4;0.15;0.4"
          dur="3s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}

/* ─── Observability SVG: Waveform + bar chart dashboard ─── */
function ObservabilitySVG() {
  // Sine wave path
  const points: string[] = [];
  for (let x = 0; x <= 220; x += 4) {
    const y = 70 + Math.sin((x / 220) * Math.PI * 3.5) * 28;
    points.push(`${x + 30},${y}`);
  }
  const wavePath = `M ${points.join(' L ')}`;

  const bars = [22, 38, 54, 30, 46, 62, 40, 28, 52];

  return (
    <svg viewBox="0 0 280 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <radialGradient id="obs-bloom" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#00FF88" stopOpacity="1" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="bar-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00FF88" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.2" />
        </linearGradient>
        <filter id="obs-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="chart-clip">
          <rect x="30" y="30" width="220" height="100" />
        </clipPath>
      </defs>

      <ellipse cx="140" cy="80" rx="110" ry="70" fill="url(#obs-bloom)" />

      {/* Dashboard card background */}
      <rect x="18" y="18" width="244" height="120" rx="10" fill="rgba(0,255,136,0.03)" stroke="rgba(0,255,136,0.12)" strokeWidth="1" />

      {/* Axis lines */}
      <line x1="30" y1="118" x2="250" y2="118" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
      <line x1="30" y1="30" x2="30" y2="118" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />

      {/* Bar chart */}
      {bars.map((h, i) => (
        <g key={i}>
          <rect
            x={35 + i * 24}
            y={118 - h}
            width="14"
            height={h}
            rx="2"
            fill="url(#bar-grad)"
            opacity="0.55"
          >
            <animate
              attributeName="height"
              values={`0;${h};${h}`}
              dur="1s"
              begin={`${0.1 + i * 0.08}s`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0 0 1 1"
            />
            <animate
              attributeName="y"
              values={`118;${118 - h};${118 - h}`}
              dur="1s"
              begin={`${0.1 + i * 0.08}s`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1; 0 0 1 1"
            />
          </rect>
        </g>
      ))}

      {/* Sine wave overlay */}
      <path
        d={wavePath}
        fill="none"
        stroke="url(#wave-grad)"
        strokeWidth="2"
        filter="url(#obs-glow)"
        clipPath="url(#chart-clip)"
        strokeDasharray="600"
        strokeDashoffset="600"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="600"
          to="0"
          dur="1.5s"
          begin="0.3s"
          fill="freeze"
          calcMode="spline"
          keySplines="0.4 0 0.2 1"
        />
      </path>

      {/* Live dot on wave end */}
      <circle cx="250" cy="68" r="5" fill="#00FF88" filter="url(#obs-glow)">
        <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
      </circle>

      {/* Metric labels */}
      <g fill="#8A9BB5" fontSize="8" fontFamily="'Space Grotesk', sans-serif">
        <text x="30" y="148">P50</text>
        <text x="82" y="148">P95</text>
        <text x="134" y="148">P99</text>
        <text x="190" y="148">ERR%</text>
        <text x="230" y="148" fill="#00FF88">LIVE</text>
      </g>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function PillarsSection() {
  const pillars = [
    {
      id: 'security',
      title: 'Security',
      description:
        'Zero-trust architecture with shift-left principles and continuous threat detection across your entire stack.',
      tags: ['Zero Trust', 'DevSecOps', 'SAST/DAST', 'eBPF Security'],
      accent: '#00D4FF',
      SVG: SecuritySVG,
      featured: false,
    },
    {
      id: 'compliance',
      title: 'Compliance',
      description:
        'Enterprise-grade compliance automation for ISO 27001, SOC 2, NIST, GDPR, and industry-specific regulations.',
      tags: ['ISO 27001', 'SOC 2', 'GDPR', 'DPDP Act', 'Audit Ready'],
      accent: 'gradient' as const,
      SVG: ComplianceSVG,
      featured: true,
    },
    {
      id: 'observability',
      title: 'Observability',
      description:
        'Full-stack visibility with AI-powered insights, real-time monitoring, and predictive anomaly detection.',
      tags: ['Prometheus', 'Grafana', 'OpenTelemetry', 'AIOps'],
      accent: '#00FF88',
      SVG: ObservabilitySVG,
      featured: false,
    },
  ] as const;

  return (
    <section id="pillars" className="relative py-20 overflow-hidden" style={{ background: '#050810' }}>
      {/* Hex texture */}
      <div
        className="absolute inset-0 opacity-[0.018] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 2L56 17L56 47L30 58L4 47L4 17Z' fill='none' stroke='%2300D4FF' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest font-medium mb-6"
            style={{
              background: 'rgba(123,47,255,0.08)',
              border: '1px solid rgba(123,47,255,0.28)',
              color: '#7B2FFF',
              fontFamily: 'var(--font-display)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block"
              style={{ background: '#7B2FFF' }}
            />
            FOUNDATION
          </div>

          <h2
            className="text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            style={{ color: '#F0F4FF', fontFamily: 'var(--font-display)' }}
          >
            Secure. Compliant. Observable.
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#8A9BB5' }}>
            The three principles behind every platform we build.
          </p>
        </motion.div>

        {/* ── 3-Column Card Grid ── */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 items-start">
          {pillars.map((pillar, i) => {
            const isFeatured = pillar.featured;
            const accentColor = pillar.accent === 'gradient' ? '#7B2FFF' : pillar.accent;

            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="relative rounded-2xl overflow-hidden group"
                style={{
                  minHeight: 420,
                  background: isFeatured
                    ? 'linear-gradient(160deg, rgba(123,47,255,0.1) 0%, rgba(0,212,255,0.07) 100%)'
                    : 'rgba(255,255,255,0.025)',
                  border: isFeatured
                    ? '1px solid transparent'
                    : `1px solid rgba(255,255,255,0.07)`,
                  ...(isFeatured && {
                    backgroundClip: 'padding-box',
                    boxShadow: '0 0 60px rgba(123,47,255,0.2), 0 0 0 1px rgba(123,47,255,0.25), inset 0 0 0 1px rgba(0,212,255,0.12)',
                  }),
                  ...(pillar.id === 'security' && {
                    boxShadow: '0 0 30px rgba(0,212,255,0.06)',
                  }),
                  ...(pillar.id === 'observability' && {
                    boxShadow: '0 0 30px rgba(0,255,136,0.06)',
                  }),
                }}
              >
                {/* Gradient border wrapper for featured */}
                {isFeatured && (
                  <div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{
                      padding: '1px',
                      background: 'linear-gradient(135deg, #7B2FFF, #00D4FF)',
                      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                )}

                {/* Top accent line for non-featured */}
                {!isFeatured && (
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background: accentColor }}
                  />
                )}

                {/* SVG Illustration — ~40% of card height */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 170 }}
                >
                  {/* Subtle bg tint behind SVG */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isFeatured
                        ? 'linear-gradient(180deg, rgba(123,47,255,0.08) 0%, transparent 100%)'
                        : `linear-gradient(180deg, ${accentColor}08 0%, transparent 100%)`,
                    }}
                  />
                  <pillar.SVG />
                </div>

                {/* Divider */}
                <div
                  className="mx-6 h-[1px]"
                  style={{
                    background: isFeatured
                      ? 'linear-gradient(90deg, transparent, rgba(123,47,255,0.4), rgba(0,212,255,0.4), transparent)'
                      : `linear-gradient(90deg, transparent, ${accentColor}30, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="p-6 pt-5">
                  <h3
                    className="text-2xl font-semibold mb-3"
                    style={{
                      fontFamily: 'var(--font-display)',
                      background: isFeatured
                        ? 'linear-gradient(90deg, #7B2FFF, #00D4FF)'
                        : 'none',
                      WebkitBackgroundClip: isFeatured ? 'text' : undefined,
                      WebkitTextFillColor: isFeatured ? 'transparent' : accentColor,
                      color: isFeatured ? undefined : accentColor,
                    }}
                  >
                    {pillar.title}
                  </h3>

                  <p
                    className="text-sm leading-relaxed mb-5 line-clamp-2"
                    style={{ color: '#8A9BB5' }}
                  >
                    {pillar.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs"
                        style={{
                          background: isFeatured
                            ? 'rgba(123,47,255,0.12)'
                            : `${accentColor}10`,
                          border: `1px solid ${isFeatured ? 'rgba(123,47,255,0.25)' : `${accentColor}28`}`,
                          color: isFeatured ? '#A78BFA' : accentColor,
                          fontFamily: 'var(--font-display)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${accentColor}08, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Animated SVG Connector ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative py-8"
        >
          <svg
            viewBox="0 0 1000 40"
            className="w-full"
            style={{ height: 40 }}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="connector-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0" />
                <stop offset="15%" stopColor="#00D4FF" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#7B2FFF" stopOpacity="0.8" />
                <stop offset="85%" stopColor="#00FF88" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
              </linearGradient>
              <filter id="dot-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Dashed rail */}
            <line
              x1="60"
              y1="20"
              x2="940"
              y2="20"
              stroke="url(#connector-grad)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />

            {/* Three node markers */}
            {[167, 500, 833].map((x, i) => (
              <g key={x}>
                <circle cx={x} cy={20} r={5} fill="#050810" stroke={['#00D4FF', '#7B2FFF', '#00FF88'][i]} strokeWidth="1.5" />
                <circle cx={x} cy={20} r={2} fill={['#00D4FF', '#7B2FFF', '#00FF88'][i]} />
              </g>
            ))}

            {/* Traveling dot */}
            <circle r="5" fill="#00D4FF" filter="url(#dot-glow)">
              <animateMotion
                dur="5s"
                repeatCount="indefinite"
                path="M 60 20 L 940 20"
                calcMode="linear"
              />
              <animate
                attributeName="fill"
                values="#00D4FF;#7B2FFF;#00FF88;#00D4FF"
                keyTimes="0;0.4;0.7;1"
                dur="5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0;1;1;1;0"
                keyTimes="0;0.04;0.5;0.96;1"
                dur="5s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Second trailing dot */}
            <circle r="3" fill="#7B2FFF" filter="url(#dot-glow)" opacity="0.7">
              <animateMotion
                dur="5s"
                begin="2.5s"
                repeatCount="indefinite"
                path="M 60 20 L 940 20"
                calcMode="linear"
              />
              <animate
                attributeName="opacity"
                values="0;0.7;0.7;0.7;0"
                keyTimes="0;0.04;0.5;0.96;1"
                dur="5s"
                begin="2.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          <p
            className="text-center text-xs tracking-widest uppercase mt-4"
            style={{
              color: '#4A5568',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.2em',
            }}
          >
            Shift Left &middot; Shield Right &middot; Automate &middot; See Everything
          </p>
        </motion.div>
      </div>
    </section>
  );
}
