import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import platformImage from '../../assets/platform.png';

export default function Capabilities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,177,220,0.05), transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto">

        {/* ── Top meta row: badge left + section label right ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
          className="flex items-center justify-between mb-10"
        >
          {/* Platform badge */}




        </motion.div>

        {/* ── Display heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-8"
        >
          <h2
            className="leading-[0.95] mb-6"
            style={{ letterSpacing: '-0.03em' }}
          >
            {/* Line 1: "Enterprise grade" */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <span
                className="text-[36px] md:text-[52px] font-black"
                style={{ color: 'var(--ink-700)', lineHeight: 1.05 }}
              >
                Enterprise Grade
              </span>
                <span
                className="text-[36px] md:text-[52px] font-black"
                style={{ color: 'var(--c5)', lineHeight: 1.05 }}
              >
                Capabilities.
              </span>
            </div>


          </h2>

          {/* Blockquote description */}
          <div
            className="pl-5 "
            style={{ borderLeft: '3px solid var(--c5)' }}
          >
            <p
              className="text-[15px] leading-[1.75]"
              style={{ color: 'var(--ink-600)' }}
            >
              Zero tolerance for blind spots. Every feature is{' '}
                purpose-built for mission-critical, regulated environments
               and shipped on-prem the day you sign.
            </p>
          </div>
        </motion.div>

        {/* ── Monitor / browser frame with platform image ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Monitor frame */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'var(--ink-700)',
              border: '1px solid #1A2030',
              boxShadow: '0 48px 120px rgba(0,0,0,0.28), 0 0 80px rgba(0,177,220,0.06)',
            }}
          >
            {/* Browser chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: 'var(--ink-700)', borderBottom: '1px solid #1A2030' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#E53935' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
              </div>
              <div
                className="flex-1 mx-4 px-3 flex items-center"
                style={{
                  background: 'var(--ink-700)',
                  border: '1px solid #1A2030',
                  borderRadius: 6,
                  height: 26,
                }}
              >
                <span style={{ fontSize: 11, color: '#c5ccd8', fontFamily: 'var(--f-m)' }}>
                  app.intellixbom.com/dashboard
                </span>
              </div>
            </div>

            {/* Screenshot */}
            <div style={{ lineHeight: 0 }}>
              <img
                src={platformImage}
                alt="IntelliXBOM Platform Dashboard"
                className="w-full"
                style={{ display: 'block' }}
              />
            </div>
          </div>

          {/* ── Floating attestation card (top-right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16, x: 8 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="absolute hidden md:block"
            style={{ top: -24, right: -24, zIndex: 10 }}
          >
            <div
              className="rounded-xl p-4 min-w-[200px]"
              style={{
                background: '#FFFDF4',
                border: '1px solid #E8D98A',
                boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
              }}
            >
              <div
                className="text-[9px] uppercase tracking-[0.12em] font-bold mb-2"
                style={{ color: '#B08A14', fontFamily: 'var(--f-m)' }}
              >
                Attestation · FY 25–26
              </div>
              <div className="text-[15px] font-bold mb-1" style={{ color: '#1A1A1A' }}>
                CERT-In<br />empanelled
              </div>
              <div className="text-[11px] mb-3" style={{ color: '#6B7280' }}>
                21-field SBOM · validated
              </div>
              {[
                { label: 'SOC 2 Type II', status: 'passed' },
                { label: 'ISO 27001 : 2022', status: 'passed' },
                { label: 'FIPS 140-3', status: 'passed' },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between mb-1">
                  <span className="text-[11px]" style={{ color: '#374151' }}>{label}</span>
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: '#10B981', fontFamily: 'var(--f-m)' }}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Floating mobile alert card (bottom-left) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16, x: -8 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="absolute hidden md:block"
            style={{ bottom: 32, left: -28, zIndex: 10 }}
          >
            <div
              className="rounded-2xl p-4 w-[180px]"
              style={{
                background: 'var(--ink-700)',
                border: '1px solid #1A2030',
                boxShadow: '0 16px 48px rgba(0,0,0,0.4)',
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold mb-2"
                style={{ background: 'rgba(229,57,53,0.15)', color: '#E53935', fontFamily: 'var(--f-m)' }}
              >
                ● CRITICAL
              </div>
              <div className="text-[13px] font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                24 CVEs need triage
              </div>
              <div className="text-[10px] mb-3" style={{ color: '#c5ccd8', fontFamily: 'var(--f-m)', lineHeight: 1.5 }}>
                Severity score<br />
                crossed 53%. Top<br />
                items: openssl<br />
                3.0.8, log4j-core<br />
                2.20.0.
              </div>
              <div className="text-[12px] font-bold tabular-nums" style={{ color: '#3DC7F6' }}>
                SCANNED 97,502 ↑
              </div>
              <div
                className="mt-2 text-[10px] font-semibold"
                style={{ color: '#10B981', fontFamily: 'var(--f-m)' }}
              >
                COMPLIANT 94%
              </div>
            </div>
          </motion.div>

          {/* ── Floating terminal card (bottom-right) ── */}
          <motion.div
            initial={{ opacity: 0, y: 16, x: 8 }}
            animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="absolute hidden lg:block"
            style={{ bottom: 24, right: -20, zIndex: 10 }}
          >
            <div
              className="rounded-xl overflow-hidden w-[280px]"
              style={{
                background: 'var(--ink-700)',
                border: '1px solid #1A2030',
                boxShadow: '0 12px 40px rgba(0,0,0,0.45)',
              }}
            >
              {/* Terminal title bar */}
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ background: 'var(--ink-700)', borderBottom: '1px solid #1A2030' }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full" style={{ background: '#E53935' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#F59E0B' }} />
                  <div className="w-2 h-2 rounded-full" style={{ background: '#10B981' }} />
                </div>
                <span style={{ fontSize: 10, color: '#e4dcdc', fontFamily: 'var(--f-m)' }}>
                  ixbom · scan.log
                </span>
              </div>
              {/* Terminal lines */}
              <div className="p-3 space-y-1" style={{ fontFamily: 'var(--f-m)', fontSize: 10, lineHeight: 1.6 }}>
                {[
                  { text: '$ ixbom scan --target prod', color: '#3DC7F6' },
                  { text: '  → resolving 247 components in 3.8s', color: '#c5ccd8' },
                  { text: '  ✓ CERT-In schema PASS', color: '#10B981' },
                  { text: '  ✓ CycloneDX 1.5 PASS ', color: '#10B981' },
                  { text: '  ✓ in-toto sign PASS ', color: '#10B981' },
                  { text: '  ⚠ risk threshold REVIEW ', color: '#F59E0B' },
                  { text: '  ✓ 24 high · build artefact published ', color: '#C5CCD8' },
                ].map((line, i) => (
                  <div key={i} style={{ color: line.color }}>{line.text}</div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
