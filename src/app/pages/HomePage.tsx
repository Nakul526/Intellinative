import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import BreachStats from '../components/BreachStats';
import BOMTypes from '../components/BOMTypes';
import Capabilities from '../components/Capabilities';
import Dashboard from '../components/Dashboard';
// import Compliance from '../components/Compliance';
// import Testimonial from '../components/Testimonial';
import CTA from '../components/CTA';

const COLOR_A = 'var(--ink-700)'; // #2D3447
const COLOR_B = '#0E1A2E';

/* ── Temporary colour toggle — remove when done testing ── */
function DarkToggle() {
  const [isB, setIsB] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--dash-dark', isB ? COLOR_B : COLOR_A);
  }, [isB]);

  // seed on mount
  useEffect(() => {
    document.documentElement.style.setProperty('--dash-dark', COLOR_A);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 88,
        right: 24,
        zIndex: 400,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--p0)',
        border: '1px solid var(--p3)',
        borderRadius: 999,
        padding: '6px 10px 6px 8px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        fontSize: 11,
        fontFamily: 'var(--f-m)',
        color: 'var(--ink-600)',
        userSelect: 'none',
        cursor: 'default',
      }}
    >
      {/* Colour swatch */}
      <div style={{ width: 12, height: 12, borderRadius: 4, background: isB ? COLOR_B : 'var(--ink-700)', border: '1px solid var(--p3)', flexShrink: 0 }} />
      <span>{isB ? '#0E1A2E' : 'ink-700'}</span>
      {/* Toggle */}
      <button
        onClick={() => setIsB(v => !v)}
        style={{
          marginLeft: 4,
          padding: '2px 10px',
          borderRadius: 999,
          border: '1px solid var(--p3)',
          background: 'var(--c5)',
          color: '#fff',
          fontSize: 10,
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.04em',
        }}
      >
        SWAP
      </button>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section id="hero">
        <Hero />
      </section>

      {/* 2. "Trusted by teams operating under" + logo marquee */}
      <section id="social-proof">
        <SocialProof />
      </section>

      {/* 3. Breach Stats editorial headline + 78% + regulatory clock */}
      <section id="breach-stats">
        <BreachStats />
      </section>

      {/* 5. BOM Types 5-tab interactive showcase */}
      <section id="bom-types">
        <BOMTypes />
      </section>

      {/* 5. Platform Capabilities bento grid */}
      <section id="platform">
        <Capabilities />
      </section>

      {/* 6. Dashboard unified security intelligence */}
      <section id="dashboard">
        <Dashboard />
      </section>

      {/* 7. Compliance regulation coverage meters */}
      {/* <section id="compliance">
        <Compliance />
      </section> */}

      {/* 9. Testimonial at the bottom before CTA */}
      {/* <section id="testimonial">
        <Testimonial />
      </section> */}

      {/* 11. CTA final conversion */}
      <CTA />

      {/* ── Temp: dark-shade colour toggle ── */}
      <DarkToggle />
    </>
  );
}
