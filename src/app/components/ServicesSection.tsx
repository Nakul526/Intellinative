import { motion } from 'motion/react';

// ─── Inline SVG Illustrations ────────────────────────────────────────────────

function CloudK8sSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="90" viewBox="0 0 110 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Central hexagon */}
      <polygon points="55,18 68,25.5 68,40.5 55,48 42,40.5 42,25.5"
        stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Outer hexagons */}
      <polygon points="22,36 31,41 31,51 22,56 13,51 13,41"
        stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <polygon points="88,36 97,41 97,51 88,56 79,51 79,41"
        stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      <polygon points="55,58 64,63 64,73 55,78 46,73 46,63"
        stroke={color} strokeWidth="1.2" fill="none" opacity="0.6" />
      {/* Connector lines */}
      <line x1="42" y1="33" x2="31" y2="44" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="68" y1="33" x2="79" y2="44" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="55" y1="48" x2="55" y2="63" stroke={color} strokeWidth="1" opacity="0.5" />
      {/* Center dot */}
      <circle cx="55" cy="33" r="3" fill={color} opacity="0.9" />
      {/* Outer dots */}
      <circle cx="22" cy="46" r="2" fill={color} opacity="0.6" />
      <circle cx="88" cy="46" r="2" fill={color} opacity="0.6" />
      <circle cx="55" cy="68" r="2" fill={color} opacity="0.6" />
      {/* Orbit ring */}
      <ellipse cx="55" cy="33" rx="28" ry="10" stroke={color} strokeWidth="0.8"
        fill="none" opacity="0.25" strokeDasharray="4 3" />
    </svg>
  );
}

function PipelineSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Gear outline */}
      <circle cx="50" cy="38" r="14" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <circle cx="50" cy="38" r="7" stroke={color} strokeWidth="1" fill="none" opacity="0.6" />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 50 + 14 * Math.cos(rad);
        const y1 = 38 + 14 * Math.sin(rad);
        const x2 = 50 + 19 * Math.cos(rad);
        const y2 = 38 + 19 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.8" />;
      })}
      {/* Pipeline lines */}
      <line x1="8" y1="20" x2="36" y2="30" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      <line x1="8" y1="56" x2="36" y2="46" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      <line x1="64" y1="30" x2="92" y2="20" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      <line x1="64" y1="46" x2="92" y2="56" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 2" />
      {/* Pipeline nodes */}
      <rect x="4" y="16" width="8" height="8" rx="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="4" y="52" width="8" height="8" rx="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="88" y="16" width="8" height="8" rx="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
      <rect x="88" y="52" width="8" height="8" rx="2" stroke={color} strokeWidth="1.2" fill="none" opacity="0.7" />
    </svg>
  );
}

function NeuralSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Neural wave path */}
      <path d="M5,40 C15,20 25,60 35,40 C45,20 55,60 65,40 C75,20 85,60 95,40"
        stroke={color} strokeWidth="2" fill="none" opacity="0.9" strokeLinecap="round" />
      {/* Wave nodes */}
      <circle cx="20" cy="30" r="3" fill={color} opacity="0.8" />
      <circle cx="50" cy="50" r="3" fill={color} opacity="0.8" />
      <circle cx="80" cy="30" r="3" fill={color} opacity="0.8" />
      {/* Secondary wave */}
      <path d="M5,52 C15,38 25,66 35,52 C45,38 55,66 65,52 C75,38 85,66 95,52"
        stroke={color} strokeWidth="1" fill="none" opacity="0.35" strokeLinecap="round" />
      {/* Synapse connections */}
      <line x1="20" y1="30" x2="50" y2="50" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="50" y1="50" x2="80" y2="30" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="20" y1="30" x2="35" y2="16" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="80" y1="30" x2="65" y2="16" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <circle cx="35" cy="16" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="65" cy="16" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
    </svg>
  );
}

function ShieldCircuitSVG({ color }: { color: string }) {
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Shield */}
      <path d="M45,8 L72,20 L72,46 C72,61 60,72 45,78 C30,72 18,61 18,46 L18,20 Z"
        stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Circuit lines inside */}
      <line x1="45" y1="30" x2="45" y2="58" stroke={color} strokeWidth="1" opacity="0.5" />
      <line x1="32" y1="44" x2="58" y2="44" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="45" cy="44" r="5" stroke={color} strokeWidth="1.2" fill="none" opacity="0.8" />
      <circle cx="45" cy="44" r="2" fill={color} opacity="0.7" />
      {/* Corner circuit nodes */}
      <circle cx="32" cy="30" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="58" cy="30" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="32" cy="58" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="58" cy="58" r="2" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="32" y1="30" x2="32" y2="44" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="58" y1="30" x2="58" y2="44" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="32" y1="58" x2="32" y2="44" stroke={color} strokeWidth="0.8" opacity="0.35" />
      <line x1="58" y1="58" x2="58" y2="44" stroke={color} strokeWidth="0.8" opacity="0.35" />
    </svg>
  );
}

function TransformSVG({ color }: { color: string }) {
  return (
    <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Source block */}
      <rect x="5" y="24" width="28" height="32" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
      <line x1="12" y1="34" x2="26" y2="34" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="40" x2="26" y2="40" stroke={color} strokeWidth="1" opacity="0.4" />
      <line x1="12" y1="46" x2="20" y2="46" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* Target block */}
      <rect x="67" y="24" width="28" height="32" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      <line x1="74" y1="34" x2="88" y2="34" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="74" y1="40" x2="88" y2="40" stroke={color} strokeWidth="1" opacity="0.7" />
      <line x1="74" y1="46" x2="82" y2="46" stroke={color} strokeWidth="1" opacity="0.7" />
      {/* Arrow shaft */}
      <line x1="34" y1="40" x2="62" y2="40" stroke={color} strokeWidth="1.5" opacity="0.8" />
      {/* Arrow head */}
      <polyline points="56,34 62,40 56,46" stroke={color} strokeWidth="1.5"
        fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
      {/* Transformation sparks */}
      <circle cx="48" cy="30" r="2" fill={color} opacity="0.5" />
      <circle cx="48" cy="50" r="2" fill={color} opacity="0.5" />
      <line x1="44" y1="26" x2="52" y2="34" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="44" y1="54" x2="52" y2="46" stroke={color} strokeWidth="0.8" opacity="0.3" />
    </svg>
  );
}

function DataPipelineSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Pipeline stages */}
      <rect x="4" y="28" width="18" height="24" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <rect x="34" y="20" width="18" height="40" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <rect x="64" y="28" width="18" height="24" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      <rect x="88" y="32" width="18" height="16" rx="3" stroke={color} strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Flow connectors */}
      <line x1="22" y1="40" x2="34" y2="40" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <line x1="52" y1="40" x2="64" y2="40" stroke={color} strokeWidth="1.2" opacity="0.6" />
      <line x1="82" y1="40" x2="88" y2="40" stroke={color} strokeWidth="1.2" opacity="0.6" />
      {/* Arrow heads */}
      <polyline points="30,37 34,40 30,43" stroke={color} strokeWidth="1.2"
        fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <polyline points="60,37 64,40 60,43" stroke={color} strokeWidth="1.2"
        fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      <polyline points="84,37 88,40 84,43" stroke={color} strokeWidth="1.2"
        fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      {/* Data particles */}
      <circle cx="13" cy="36" r="2" fill={color} opacity="0.6" />
      <circle cx="13" cy="44" r="2" fill={color} opacity="0.6" />
      <circle cx="43" cy="34" r="2" fill={color} opacity="0.6" />
      <circle cx="43" cy="40" r="2" fill={color} opacity="0.9" />
      <circle cx="43" cy="46" r="2" fill={color} opacity="0.6" />
      <circle cx="73" cy="36" r="2" fill={color} opacity="0.7" />
      <circle cx="73" cy="44" r="2" fill={color} opacity="0.7" />
      <circle cx="97" cy="40" r="3" fill={color} opacity="0.9" />
    </svg>
  );
}

function IndustrialSVG({ color }: { color: string }) {
  return (
    <svg width="110" height="80" viewBox="0 0 110 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color}88)` }}>
      {/* Monitor frame */}
      <rect x="20" y="12" width="70" height="46" rx="4" stroke={color} strokeWidth="1.5" fill="none" opacity="0.9" />
      {/* Screen inner */}
      <rect x="26" y="18" width="58" height="34" rx="2" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Signal waveform */}
      <polyline points="30,35 36,35 38,25 42,45 46,35 50,35 52,28 56,42 60,35 70,35 72,30 76,40 80,35"
        stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
      {/* Stand */}
      <line x1="55" y1="58" x2="55" y2="68" stroke={color} strokeWidth="1.5" opacity="0.7" />
      <line x1="42" y1="68" x2="68" y2="68" stroke={color} strokeWidth="1.5" opacity="0.7" />
      {/* Edge indicator dots */}
      <circle cx="25" cy="12" r="0" fill="none" />
      <circle cx="100" cy="35" r="3" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <circle cx="10" cy="35" r="3" stroke={color} strokeWidth="1" fill="none" opacity="0.5" />
      <line x1="13" y1="35" x2="20" y2="35" stroke={color} strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
      <line x1="90" y1="35" x2="97" y2="35" stroke={color} strokeWidth="0.8" opacity="0.4" strokeDasharray="2 2" />
      {/* Status indicators */}
      <circle cx="30" cy="25" r="2" fill={color} opacity="0.8" />
      <circle cx="36" cy="25" r="2" fill={color} opacity="0.4" />
      <circle cx="42" cy="25" r="2" fill={color} opacity="0.6" />
    </svg>
  );
}

// ─── Services Data ─────────────────────────────────────────────────────────────

const services = [
  {
    id: 1,
    title: 'Cloud Native Architecture',
    tagline: 'Kubernetes-native. Infinitely scalable.',
    color: '#00D4FF',
    colSpan: 'md:col-span-7',
    tall: true,
    Illustration: CloudK8sSVG,
  },
  {
    id: 2,
    title: 'Platform Engineering',
    tagline: 'Golden paths. Developer velocity.',
    color: '#7B2FFF',
    colSpan: 'md:col-span-5',
    tall: false,
    Illustration: PipelineSVG,
  },
  {
    id: 3,
    title: 'AI-Driven AIOps',
    tagline: 'Self-healing infrastructure.',
    color: '#FF2E88',
    colSpan: 'md:col-span-4',
    tall: false,
    Illustration: NeuralSVG,
  },
  {
    id: 4,
    title: 'Security & Observability',
    tagline: 'Zero-trust. Full visibility.',
    color: '#00FF88',
    colSpan: 'md:col-span-4',
    tall: false,
    Illustration: ShieldCircuitSVG,
  },
  {
    id: 5,
    title: 'App Modernization',
    tagline: 'Legacy becomes cloud-native.',
    color: '#FF9D00',
    colSpan: 'md:col-span-4',
    tall: false,
    Illustration: TransformSVG,
  },
  {
    id: 6,
    title: 'Data & AI/ML',
    tagline: 'Intelligence at every layer.',
    color: '#00FFD4',
    colSpan: 'md:col-span-6',
    tall: false,
    Illustration: DataPipelineSVG,
  },
  {
    id: 7,
    title: 'OT Observability',
    tagline: 'Industrial intelligence.',
    color: '#7B2FFF',
    colSpan: 'md:col-span-6',
    tall: false,
    Illustration: IndustrialSVG,
  },
];

// ─── Card Component ────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const { title, tagline, color, colSpan, tall, Illustration } = service;

  return (
    <motion.div
      className={`${colSpan} group relative rounded-2xl overflow-hidden cursor-default`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
        minHeight: tall ? '240px' : '200px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${color}66`;
        el.style.boxShadow = `0 0 32px ${color}18, 0 8px 40px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'rgba(255,255,255,0.07)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: color }}
      />

      <div className={`flex flex-col h-full p-7 pt-8 ${tall ? 'gap-6' : 'gap-4'}`}>
        {/* Illustration */}
        <div className="flex items-center justify-center flex-shrink-0"
          style={{ height: tall ? '100px' : '84px' }}>
          <Illustration color={color} />
        </div>

        {/* Text */}
        <div className="mt-auto">
          <h3
            className="font-bold mb-1.5 leading-tight"
            style={{
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
              fontSize: '20px',
              color: '#F0F4FF',
            }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-snug"
            style={{ color: 'rgba(138,155,181,0.85)' }}
          >
            {tagline}
          </p>
        </div>

        {/* Hover glow corner accent */}
        <div
          className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at bottom right, ${color}14, transparent 70%)` }}
        />
      </div>
    </motion.div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const row1 = services.slice(0, 2);
  const row2 = services.slice(2, 5);
  const row3 = services.slice(5, 7);

  return (
    <section id="services" className="relative pt-20 pb-10 overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 40% at 50% 0%, rgba(123,47,255,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center px-3 py-1 rounded-full mb-5 text-xs tracking-[0.15em] font-semibold"
            style={{
              color: '#7B2FFF',
              border: '1px solid rgba(123,47,255,0.45)',
              background: 'rgba(123,47,255,0.08)',
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
            }}
          >
            SERVICES
          </div>

          {/* Headline */}
          <h2
            className="mb-4"
            style={{
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 700,
              color: '#F0F4FF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            Intelligent Services.
          </h2>

          {/* Sub */}
          <p
            className="text-lg max-w-xl mx-auto"
            style={{ color: 'rgba(138,155,181,0.8)', lineHeight: 1.6 }}
          >
            End-to-end engineering for the AI-native enterprise.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="flex flex-col gap-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {row1.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {row2.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i + 2} />
            ))}
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {row3.map((svc, i) => (
              <ServiceCard key={svc.id} service={svc} index={i + 5} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
