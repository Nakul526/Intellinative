import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

/* ─── Animated SVG: Hexagonal Node Diagram ─── */
function HexNodeDiagram() {
  // 7 nodes: 1 center + 6 hex ring
  const cx = 200;
  const cy = 160;
  const r = 80;
  const nodeR = 10;

  const angles = Array.from({ length: 6 }, (_, i) => (i * 60 * Math.PI) / 180);
  const ringNodes = angles.map((a) => ({
    x: cx + r * Math.cos(a - Math.PI / 2),
    y: cy + r * Math.sin(a - Math.PI / 2),
  }));

  // Pairs to connect: center→each ring, and ring adjacents
  const edges: [number, number][] = [
    [-1, 0], [-1, 1], [-1, 2], [-1, 3], [-1, 4], [-1, 5],
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  ];

  const getXY = (i: number) =>
    i === -1 ? { x: cx, y: cy } : ringNodes[i];

  const totalLen = 160; // approximate, each line gets staggered dashoffset

  return (
    <svg
      viewBox="0 0 400 320"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="glow-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
        </radialGradient>
        <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#7B2FFF" />
        </linearGradient>
      </defs>

      {/* Background bloom */}
      <circle cx={cx} cy={cy} r={120} fill="url(#glow-center)" />

      {/* Edges with draw-on animation */}
      {edges.map(([a, b], i) => {
        const p1 = getXY(a);
        const p2 = getXY(b);
        const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
        return (
          <line
            key={i}
            x1={p1.x}
            y1={p1.y}
            x2={p2.x}
            y2={p2.y}
            stroke="url(#edge-grad)"
            strokeWidth="1.5"
            strokeOpacity="0.7"
            strokeDasharray={len}
            strokeDashoffset={len}
          >
            <animate
              attributeName="stroke-dashoffset"
              from={len}
              to={0}
              dur="1.2s"
              begin={`${0.3 + i * 0.12}s`}
              fill="freeze"
              calcMode="spline"
              keySplines="0.4 0 0.2 1"
            />
          </line>
        );
      })}

      {/* Ring nodes */}
      {ringNodes.map((n, i) => (
        <g key={i} filter="url(#node-glow)">
          <circle cx={n.x} cy={n.y} r={nodeR + 4} fill="#00D4FF" fillOpacity="0.12">
            <animate
              attributeName="r"
              values={`${nodeR + 4};${nodeR + 8};${nodeR + 4}`}
              dur="3s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              values="0.12;0.24;0.12"
              dur="3s"
              begin={`${i * 0.5}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={n.x} cy={n.y} r={nodeR} fill="#050810" stroke="#00D4FF" strokeWidth="1.5">
            <animate
              attributeName="opacity"
              from={0}
              to={1}
              dur="0.4s"
              begin={`${0.3 + i * 0.12}s`}
              fill="freeze"
            />
          </circle>
          {/* Inner dot */}
          <circle cx={n.x} cy={n.y} r={3} fill="#00D4FF">
            <animate
              attributeName="opacity"
              from={0}
              to={1}
              dur="0.4s"
              begin={`${0.6 + i * 0.12}s`}
              fill="freeze"
            />
          </circle>
        </g>
      ))}

      {/* Center node — pulsing */}
      <g filter="url(#node-glow)">
        <circle cx={cx} cy={cy} r={22} fill="#00D4FF" fillOpacity="0.15">
          <animate
            attributeName="r"
            values="22;30;22"
            dur="2.5s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="fill-opacity"
            values="0.15;0.28;0.15"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={cx} cy={cy} r={14} fill="#050810" stroke="#00D4FF" strokeWidth="2" />
        <circle cx={cx} cy={cy} r={5} fill="#00D4FF" />
      </g>

      {/* Corner labels */}
      {(['AI', 'ML', 'DB', 'K8S', 'CDN', 'API'] as const).map((label, i) => {
        const n = ringNodes[i];
        const offset = 22;
        const ax = angles[i] - Math.PI / 2;
        return (
          <text
            key={label}
            x={n.x + offset * Math.cos(ax)}
            y={n.y + offset * Math.sin(ax)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#8A9BB5"
            fontSize="10"
            fontFamily="'Space Grotesk', sans-serif"
            opacity="0"
          >
            {label}
            <animate
              attributeName="opacity"
              from={0}
              to={0.8}
              dur="0.5s"
              begin={`${0.9 + i * 0.12}s`}
              fill="freeze"
            />
          </text>
        );
      })}
    </svg>
  );
}

/* ─── Animated SVG: CI/CD Pipeline ─── */
function PipelineDiagram() {
  const stages = [
    { label: 'CODE', x: 50 },
    { label: 'BUILD', x: 160 },
    { label: 'TEST', x: 270 },
    { label: 'DEPLOY', x: 380 },
  ];
  const y = 100;
  const boxW = 70;
  const boxH = 34;

  return (
    <svg viewBox="0 0 440 200" className="w-full h-full" aria-hidden="true">
      <defs>
        <linearGradient id="pipe-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7B2FFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
        <filter id="pipe-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Data packet clip */}
        <clipPath id="pipe-clip">
          <rect x="50" y={y - 4} width="400" height="8" />
        </clipPath>
      </defs>

      {/* Connecting pipeline rail */}
      <line
        x1="85"
        y1={y}
        x2="355"
        y2={y}
        stroke="rgba(255,255,255,0.07)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="85"
        y1={y}
        x2="355"
        y2={y}
        stroke="url(#pipe-grad)"
        strokeWidth="2"
        strokeOpacity="0.5"
        strokeDasharray="6 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-20"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>

      {/* Stage boxes */}
      {stages.map((s, i) => (
        <g key={s.label} opacity="0">
          <animate
            attributeName="opacity"
            from={0}
            to={1}
            dur="0.5s"
            begin={`${0.2 + i * 0.25}s`}
            fill="freeze"
          />
          <rect
            x={s.x}
            y={y - boxH / 2}
            width={boxW}
            height={boxH}
            rx="6"
            fill="rgba(255,255,255,0.04)"
            stroke={i === 3 ? '#00D4FF' : 'rgba(255,255,255,0.12)'}
            strokeWidth="1"
          />
          {/* Accent top bar */}
          <rect
            x={s.x}
            y={y - boxH / 2}
            width={boxW}
            height={2}
            rx="1"
            fill={i === 3 ? '#00D4FF' : i === 0 ? '#7B2FFF' : 'rgba(255,255,255,0.2)'}
          />
          <text
            x={s.x + boxW / 2}
            y={y + 1}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={i === 3 ? '#00D4FF' : '#8A9BB5'}
            fontSize="9"
            fontFamily="'Space Grotesk', sans-serif"
            letterSpacing="1"
          >
            {s.label}
          </text>

          {/* Checkmark for first three */}
          {i < 3 && (
            <text
              x={s.x + boxW - 12}
              y={y - boxH / 2 + 12}
              fill="#00FF88"
              fontSize="9"
              fontFamily="sans-serif"
            >
              ✓
            </text>
          )}
        </g>
      ))}

      {/* Traveling data packet */}
      <circle r="5" fill="#00D4FF" filter="url(#pipe-glow)" clipPath="url(#pipe-clip)">
        <animateMotion
          dur="2.8s"
          repeatCount="indefinite"
          path={`M 85 ${y} L 355 ${y}`}
          calcMode="spline"
          keySplines="0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.92;1"
          dur="2.8s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Second packet offset */}
      <circle r="3.5" fill="#7B2FFF" filter="url(#pipe-glow)" clipPath="url(#pipe-clip)">
        <animateMotion
          dur="2.8s"
          begin="1.4s"
          repeatCount="indefinite"
          path={`M 85 ${y} L 355 ${y}`}
          calcMode="spline"
          keySplines="0.4 0 0.6 1"
        />
        <animate
          attributeName="opacity"
          values="0;1;1;0"
          keyTimes="0;0.05;0.92;1"
          dur="2.8s"
          begin="1.4s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Time metric */}
      <text x="220" y="160" textAnchor="middle" fill="#8A9BB5" fontSize="10" fontFamily="'Space Grotesk', sans-serif">
        avg. pipeline
      </text>
      <text x="220" y="178" textAnchor="middle" fill="#00D4FF" fontSize="13" fontFamily="'Space Grotesk', sans-serif" fontWeight="600">
        4 min 22 sec
      </text>
    </svg>
  );
}

/* ─── Main Component ─── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#050810' }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="pt-20 pb-10 flex justify-center"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-widest font-medium"
            style={{
              background: 'rgba(0,212,255,0.08)',
              border: '1px solid rgba(0,212,255,0.25)',
              color: '#00D4FF',
              fontFamily: 'var(--font-display)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-pulse"
              style={{ background: '#00D4FF' }}
            />
            WHY INTELLINATIVE
          </div>
        </motion.div>

        {/* ──────────────────────────────────────────────────────────
            BLOCK 1 — Left text / Right SVG
        ────────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-center pb-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h2
              className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight"
              style={{
                color: '#F0F4FF',
                fontFamily: 'var(--font-display)',
              }}
            >
              Architecture meets
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00D4FF 0%, #7B2FFF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Intelligence.
              </span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: '#8A9BB5' }}
            >
              AI-driven insights transform complex systems into infrastructure
              that thinks ahead — predicting failure before it happens and
              scaling before demand arrives.
            </p>
            {/* Divider rule */}
            <div
              className="w-16 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, #00D4FF, transparent)' }}
            />
          </motion.div>

          {/* SVG visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            style={{ height: 320 }}
          >
            {/* Card backdrop */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'rgba(0,212,255,0.03)',
                border: '1px solid rgba(0,212,255,0.1)',
              }}
            />
            <HexNodeDiagram />
          </motion.div>
        </div>

        {/* Horizontal rule */}
        <div
          className="w-full h-[1px] mb-10"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        {/* ──────────────────────────────────────────────────────────
            BLOCK 2 — Right text / Left SVG (reversed)
        ────────────────────────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-16 items-center pb-16">
          {/* SVG visual — left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 md:order-1"
            style={{ height: 280 }}
          >
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'rgba(123,47,255,0.03)',
                border: '1px solid rgba(123,47,255,0.1)',
              }}
            />
            <PipelineDiagram />
          </motion.div>

          {/* Text — right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5 order-1 md:order-2"
          >
            {/* Big number */}
            <div className="flex items-end gap-4">
              <span
                className="text-7xl md:text-8xl font-bold leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                3×
              </span>
              <span
                className="text-xl md:text-2xl font-semibold leading-snug mb-2"
                style={{ color: '#F0F4FF', fontFamily: 'var(--font-display)' }}
              >
                faster deployment
                <br />
                velocity
              </span>
            </div>
            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: '#8A9BB5' }}
            >
              From design to production in weeks, not months. Enterprise-grade
              without enterprise-grade delays — our opinionated platform
              accelerator removes friction at every stage.
            </p>
            <div
              className="w-16 h-[2px] rounded-full"
              style={{ background: 'linear-gradient(90deg, #7B2FFF, transparent)' }}
            />
          </motion.div>
        </div>

        {/* Horizontal rule */}
        <div
          className="w-full h-[1px] mb-10"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        />

        {/* ──────────────────────────────────────────────────────────
            BLOCK 3 — Full-width cinematic statement
        ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative pb-16 text-center"
        >
          {/* Radial gradient bloom */}
          <div
            className="pointer-events-none absolute inset-0 -top-24 -bottom-24"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(123,47,255,0.13) 0%, rgba(0,212,255,0.07) 40%, transparent 70%)',
            }}
          />

          {/* Massive text */}
          <p
            className="relative text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight tracking-tight mb-6"
            style={{
              fontFamily: 'var(--font-display)',
              color: '#F0F4FF',
            }}
          >
            Where infrastructure
            <br />
            becomes{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #7B2FFF 0%, #00D4FF 60%, #00FF88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              autonomous.
            </span>
          </p>

          <p
            className="relative text-base tracking-widest uppercase"
            style={{
              color: '#8A9BB5',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.2em',
            }}
          >
            Built for intelligent scale.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
