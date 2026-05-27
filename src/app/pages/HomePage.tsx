import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import BreachStats from '../components/BreachStats';
import BOMTypes from '../components/BOMTypes';
import Capabilities from '../components/Capabilities';
import Dashboard from '../components/Dashboard';
// import Compliance from '../components/Compliance';
// import Testimonial from '../components/Testimonial';
import CTA from '../components/CTA';


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

    </>
  );
}
