import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Copy, Check, Lock } from 'lucide-react';

/* ─────────────────────────────────────────
   Animated aurora mesh background
───────────────────────────────────────── */
const AuroraBg = () => (
  <>
    {/* Base dark layer */}
    <div className="absolute inset-0" style={{ background: '#050810' }} />

    {/* Violet orb — top left */}
    <div
      className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(123,47,255,0.22) 0%, transparent 65%)',
        filter: 'blur(60px)',
        animation: 'auroraFloat1 12s ease-in-out infinite',
      }}
    />

    {/* Cyan orb — bottom right */}
    <div
      className="absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 65%)',
        filter: 'blur(70px)',
        animation: 'auroraFloat2 15s ease-in-out infinite',
      }}
    />

    {/* Emerald orb — center */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: 'auroraFloat3 18s ease-in-out infinite',
      }}
    />

    {/* Animated mesh gradient overlay */}
    <div
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{
        background:
          'linear-gradient(135deg, rgba(123,47,255,0.08) 0%, transparent 40%, rgba(0,212,255,0.06) 100%)',
        backgroundSize: '200% 200%',
        animation: 'meshShift 20s ease infinite',
      }}
    />

    {/* Very subtle grid */}
    <div
      className="absolute inset-0 pointer-events-none opacity-30"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    />

    <style>{`
      @keyframes auroraFloat1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33%       { transform: translate(40px, 30px) scale(1.08); }
        66%       { transform: translate(-20px, 50px) scale(0.96); }
      }
      @keyframes auroraFloat2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        40%       { transform: translate(-50px, -30px) scale(1.1); }
        70%       { transform: translate(30px, -50px) scale(0.95); }
      }
      @keyframes auroraFloat3 {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50%       { transform: translate(-50%, -50%) scale(1.15); }
      }
      @keyframes meshShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 24px rgba(0,255,136,0.3), 0 0 60px rgba(0,212,255,0.15); }
        50%       { box-shadow: 0 0 40px rgba(0,255,136,0.5), 0 0 90px rgba(0,212,255,0.25); }
      }
    `}</style>
  </>
);

/* ─────────────────────────────────────────
   Decorative divider line
───────────────────────────────────────── */
const GradientDivider = () => (
  <div className="flex items-center justify-center gap-4 my-8">
    <div className="h-[0.5px] w-20 bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.12)]" />
    <div className="w-1 h-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
    <div className="h-[0.5px] w-20 bg-gradient-to-l from-transparent to-[rgba(255,255,255,0.12)]" />
  </div>
);

/* ══════════════════════════════════════════════ */
export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const email = 'hello@intellinative.com';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // fallback — silently ignore
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-[500px] flex items-center justify-center overflow-hidden py-20"
    >
      {/* Aurora background layers */}
      <AuroraBg />

      {/* ── CONTENT ── */}
      <div className="relative z-10 max-w-[820px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 text-xs font-bold tracking-[0.22em] uppercase border border-[rgba(0,255,136,0.3)]"
            style={{
              background: 'rgba(0,255,136,0.08)',
              color: '#00FF88',
              fontFamily: 'var(--font-display)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: '#00FF88',
                boxShadow: '0 0 6px #00FF88',
                animation: 'pulseGlowDot 2s ease-in-out infinite',
              }}
            />
            Let's Build
          </motion.div>

          {/* Headline */}
          <h2
            className="mb-6 leading-[1.1] font-extrabold"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(38px, 6vw, 56px)',
              color: '#F0F4FF',
            }}
          >
            Ready to engineer{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7B2FFF 0%, #00D4FF 60%, #00FF88 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              the future?
            </span>
          </h2>

          {/* Sub-headline */}
          <p
            className="text-lg md:text-xl text-[#8A9BB5] mb-12 max-w-[500px] mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Enterprise AI infrastructure built for modern scale.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            {/* Primary — Start Building */}
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-bold text-[#050810] text-base transition-all duration-300 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
                  fontFamily: 'var(--font-display)',
                  animation: 'pulseGlow 3s ease-in-out infinite',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.animation = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    '0 0 50px rgba(0,255,136,0.5), 0 0 100px rgba(0,212,255,0.3)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.animation = 'pulseGlow 3s ease-in-out infinite';
                  (e.currentTarget as HTMLElement).style.boxShadow = '';
                }}
              >
                Start Building
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#050810" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </Link>

            {/* Secondary — Schedule a Demo */}
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-9 py-4 rounded-full font-semibold text-[#F0F4FF] text-base border transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  borderColor: 'rgba(255,255,255,0.15)',
                  fontFamily: 'var(--font-display)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.08)';
                  el.style.borderColor = 'rgba(255,255,255,0.3)';
                  el.style.boxShadow = '0 0 24px rgba(255,255,255,0.05)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(255,255,255,0.04)';
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.boxShadow = 'none';
                }}
              >
                Schedule a Demo
              </motion.div>
            </Link>
          </div>

          <GradientDivider />

          {/* Email line with copy button */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div
              className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.1)] flex items-center gap-3"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="3" width="12" height="9" rx="2" stroke="#8A9BB5" strokeWidth="1.1"/>
                <path d="M1 5l6 4 6-4" stroke="#8A9BB5" strokeWidth="1.1" strokeLinejoin="round"/>
              </svg>
              <span
                className="text-[#00D4FF]"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}
              >
                {email}
              </span>
            </div>

            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              className="p-3 rounded-full border border-[rgba(255,255,255,0.1)] transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.03)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(0,212,255,0.4)';
                el.style.background = 'rgba(0,212,255,0.06)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.background = 'rgba(255,255,255,0.03)';
              }}
              aria-label="Copy email address"
            >
              {copied ? (
                <Check size={16} color="#00FF88" />
              ) : (
                <Copy size={16} color="#8A9BB5" />
              )}
            </motion.button>
          </motion.div>

          {/* Copied micro-feedback */}
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: copied ? 1 : 0, y: copied ? 0 : -6 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-[#00FF88] mb-3 h-4"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            {copied && 'Copied to clipboard'}
          </motion.div>

          {/* Trust note */}
          <div className="flex items-center justify-center gap-2 text-sm text-[#4A5568]">
            <Lock size={13} strokeWidth={2} />
            <span style={{ fontFamily: 'var(--font-display)' }}>
              Confidential. Replied within 24h.
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulseGlowDot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00FF88; }
          50%       { opacity: 0.6; box-shadow: 0 0 12px #00FF88; }
        }
      `}</style>
    </section>
  );
}
