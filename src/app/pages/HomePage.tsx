import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import BOMTypes from '../components/BOMTypes';
import Capabilities from '../components/Capabilities';
import Dashboard from '../components/Dashboard';
import Compliance from '../components/Compliance';
import CTA from '../components/CTA';

export default function HomePage() {
  return (
    <>
      <section id="hero">
        <Hero />
      </section>
      <section id="social-proof">
        <SocialProof />
      </section>
      <section id="bom-types">
        <BOMTypes />
      </section>
      <section id="platform">
        <Capabilities />
      </section>
      <section id="dashboard">
        <Dashboard />
      </section>
      <section id="compliance">
        <Compliance />
      </section>
      <CTA />
    </>
  );
}
