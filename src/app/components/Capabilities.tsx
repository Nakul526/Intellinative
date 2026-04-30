import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Code, Shield, BarChart3, Server, FileText, Settings, ArrowUpRight } from 'lucide-react';

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '67, 97, 238';
}

const capabilities = [
  {
    icon: Code,
    color: '#4361EE',
    title: 'Automatic BOM Generation',
    description: 'Generate comprehensive BOMs automatically from your build pipeline, repositories, and infrastructure — no manual work required. Supports SPDX, CycloneDX, SWID.',
    featured: true,
  },
  {
    icon: Shield,
    color: '#00D4AA',
    title: 'Continuous Field Validation',
    description: 'Real-time validation against CERT-In 21 mandatory fields with instant alerts on non-compliance or missing data.',
  },
  {
    icon: BarChart3,
    color: '#8B5CF6',
    title: 'Vendor Compliance Scoring',
    description: 'Automated scoring for vendor BOMs with executive dashboards showing compliance trends and risks.',
  },
  {
    icon: Server,
    color: '#F59E0B',
    title: 'Air-Gapped Deployment',
    description: 'Deploy in fully air-gapped environments with on-premise validation and zero external dependencies.',
  },
  {
    icon: FileText,
    color: '#EF4444',
    title: 'Regulator-Ready Reports',
    description: 'One-click audit exports in formats required by CERT-In, RBI, SEBI, and other Indian regulators.',
  },
  {
    icon: Settings,
    color: '#00D4AA',
    title: 'Project-Level BOM Controls',
    description: 'Granular policies per project, team, or vendor with custom validation rules and approval workflows.',
  },
];

export default function Capabilities() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });
  const featured = capabilities[0];
  const FeaturedIcon = featured.icon;

  return (
    <section
      className="relative py-14 md:py-20 px-6 overflow-hidden"
      style={{ background: 'var(--app-bg)' }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(67,97,238,0.07), transparent 70%)' }}
      />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.22)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4361EE]" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#4361EE] font-bold select-none">
              Platform Capabilities
            </span>
          </div>
          <h2 className="text-4xl md:text-[52px] font-black tracking-tight leading-[1.05] mb-4" style={{ color: 'var(--app-text-primary)' }}>
            Enterprise-Grade.
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #4361EE 0%, #00D4AA 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Built for India.
            </span>
          </h2>
          <p className="text-lg max-w-[460px] leading-relaxed" style={{ color: 'var(--app-text-dim)' }}>
            Designed for regulated infrastructure with security, compliance, and sovereignty at the core.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-3.5"
          style={{ gridAutoRows: '190px' }}
        >
          {/* Featured card — spans 2 cols × 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={gridInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden cursor-default"
            style={{
              background: `linear-gradient(145deg, rgba(${hexToRgb(capabilities[0].color)},0.09) 0%, var(--app-card-semi) 100%)`,
              border: `1px solid rgba(${hexToRgb(capabilities[0].color)},0.16)`
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 70% 60% at 30% 30%, rgba(${hexToRgb(capabilities[0].color)},0.08), transparent 60%)` }}
            />
            <div
              className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: `linear-gradient(90deg, transparent, ${capabilities[0].color}, transparent)` }}
            />

            <div className="relative z-10 p-9 h-full flex flex-col">
              <motion.div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: `rgba(${hexToRgb(capabilities[0].color)},0.14)`,
                  border: `1px solid rgba(${hexToRgb(capabilities[0].color)},0.3)`
                }}
              >
                <FeaturedIcon className="w-7 h-7" style={{ color: featured.color }} />
              </motion.div>

              <h3 className="text-xl font-black mb-3 tracking-tight" style={{ color: 'var(--app-text-primary)' }}>{capabilities[0].title}</h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: 'var(--app-text-dim)' }}>{capabilities[0].description}</p>

              <div className="flex gap-2 mt-5">
                {['SPDX 2.3', 'CycloneDX', 'SWID'].map(fmt => (
                  <span
                    key={fmt}
                    className="text-[10px] font-bold px-2.5 py-1 rounded-lg select-none"
                    style={{ background: `rgba(${hexToRgb(capabilities[0].color)},0.1)`, color: capabilities[0].color, border: `1px solid rgba(${hexToRgb(capabilities[0].color)},0.2)` }}
                  >
                    {fmt}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-250">
                <span className="text-sm font-bold" style={{ color: capabilities[0].color }}>Learn more</span>
                <ArrowUpRight className="w-4 h-4" style={{ color: capabilities[0].color }} />
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {capabilities.slice(1).map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 22 }}
              animate={gridInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.14 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-2xl overflow-hidden cursor-default"
              style={{
                background: `linear-gradient(145deg, rgba(${hexToRgb(cap.color)},0.07) 0%, var(--app-card-semi) 100%)`,
                border: `1px solid rgba(${hexToRgb(cap.color)},0.12)`
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                style={{ background: `rgba(${hexToRgb(cap.color)},0.05)` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                style={{ background: `linear-gradient(90deg, transparent, ${cap.color}80, transparent)` }}
              />

              <div className="relative z-10 p-6 h-full flex flex-col">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{
                    background: `rgba(${hexToRgb(cap.color)},0.12)`,
                    border: `1px solid rgba(${hexToRgb(cap.color)},0.25)`
                  }}
                >
                  <cap.icon className="w-5 h-5" style={{ color: cap.color }} />
                </div>
                <h3 className="text-[13px] font-black mb-1.5 leading-tight" style={{ color: 'var(--app-text-primary)' }}>{cap.title}</h3>
                <p className="text-[11px] leading-[1.6] line-clamp-3 flex-1" style={{ color: 'var(--app-text-dim)' }}>{cap.description}</p>

                <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                  <span className="text-[11px] font-bold" style={{ color: cap.color }}>Explore</span>
                  <ArrowUpRight className="w-3 h-3" style={{ color: cap.color }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
