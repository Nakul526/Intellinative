import { Link } from 'react-router';
import { CheckCircle2, XCircle, AlertTriangle, ArrowRight, Shield, Zap, Lock, BarChart3 } from 'lucide-react';
import { openDemoModal } from '../components/DemoModal';

const problems = [
  { title: 'Vendors hand you unverified SBOMs', description: 'Procurement teams accept SBOMs at face value. Without automated validation, critical CERT-In fields are missing and nobody knows until an audit fails.', icon: AlertTriangle, color: '#F59E0B' },
  { title: 'Manual audits don\'t scale', description: '21 mandatory fields × hundreds of components × dozens of vendors. Manual review is impossible. You need automated field-level validation at every release.', icon: XCircle, color: '#EF4444' },
  { title: 'Compliance changes with every update', description: 'Every software update generates a new BOM. A compliant SBOM today may fail tomorrow. You need continuous monitoring, not point-in-time audits.', icon: AlertTriangle, color: '#F59E0B' },
  { title: 'Regulators are watching', description: 'CERT-In, RBI, MeitY, SEBI, and NCIIPC are converging on SBOM requirements. Non-compliance carries real penalties for regulated sectors in India.', icon: Shield, color: '#EF4444' }
];

const differentiators = [
  { icon: Zap, color: '#4361EE', title: 'Field-by-Field Validation', description: 'Not just format checking we validate every one of CERT-In\'s 21 mandatory fields for content completeness and accuracy, component by component.' },
  { icon: Shield, color: '#00D4AA', title: 'Continuous, Not Point-in-Time', description: 'Integrated into your CI/CD pipeline. Every build triggers a fresh compliance check so you catch regressions before they reach production or procurement.' },
  { icon: BarChart3, color: '#8B5CF6', title: 'Vendor Scorecards', description: 'Automated compliance scoring for every vendor SBOM. Know which suppliers consistently deliver quality BOMs vs. those who need improvement.' },
  { icon: Lock, color: '#F59E0B', title: 'Air-Gap Ready', description: 'Fully deployable in air-gapped environments. No data leaves your network. Critical for defence, government, and classified infrastructure.' },
  { icon: CheckCircle2, color: '#22C55E', title: 'Regulator-Ready Reports', description: 'One-click audit exports formatted exactly as CERT-In, RBI, SEBI, and NCIIPC require. Walk into any audit confident and prepared.' },
  { icon: ArrowRight, color: '#4361EE', title: 'Five BOM Types. One Platform.', description: 'SBOM, CBOM, QBOM, AIBOM, HBOM governed, validated, and cross-correlated in a single platform. No more tool sprawl.' }
];

const comparisonRows = [
  { feature: 'CERT-In 21-field validation', intellixbom: true, manual: false, generic: false },
  { feature: 'Continuous monitoring (CI/CD)', intellixbom: true, manual: false, generic: 'partial' },
  { feature: 'Vendor compliance scoring', intellixbom: true, manual: false, generic: false },
  { feature: 'All 5 BOM types (SBOM, CBOM, QBOM, AIBOM, HBOM)', intellixbom: true, manual: false, generic: false },
  { feature: 'Air-gapped deployment', intellixbom: true, manual: true, generic: false },
  { feature: 'Regulator-ready audit exports', intellixbom: true, manual: 'partial', generic: false },
  { feature: 'Real-time CVE correlation', intellixbom: true, manual: false, generic: 'partial' },
  { feature: 'India-specific regulatory coverage', intellixbom: true, manual: 'partial', generic: false },
];

export default function WhyPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Hero */}
      <section
        className="pt-24 pb-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(67,97,238,0.18) 0%, transparent 70%), var(--app-bg)` }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
            style={{ background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.3)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#4361EE]" />
            <span className="text-xs font-medium tracking-wide" style={{ color: 'var(--app-text-muted)' }}>WHY INTELLIXBOM</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: 'var(--app-text-primary)' }}>
            The SBOM problem<br />
            <span style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              nobody talks about.
            </span>
          </h1>
          <p className="text-xl leading-[1.75] max-w-[600px] mx-auto mb-10" style={{ color: 'var(--app-text-muted)' }}>
            Most teams have SBOMs. Almost none of them meet India's CERT-In mandatory field requirements.
            IntelliXBOM closes that gap automatically, at every release.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.45)' }}
            >
              Get a Free Demo →
            </button>
            <Link
              to="/blog/dont-trust-the-sbom-your-vendor-gave-you"
              className="px-7 py-3.5 text-base font-medium rounded-lg border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}
            >
              Read the Research
            </Link>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>THE PROBLEM</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>Why existing approaches fail</h2>
            <p className="text-lg max-w-[500px] mx-auto" style={{ color: 'var(--app-text-muted)' }}>
              Teams are generating SBOMs but not validating them. The gap between "having" and "complying" is enormous.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="rounded-xl p-7"
                style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${problem.color}15` }}
                >
                  <problem.icon className="w-6 h-6" style={{ color: problem.color }} />
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--app-text-primary)' }}>{problem.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--app-text-muted)' }}>{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>HOW WE'RE DIFFERENT</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>Built for India's compliance reality</h2>
            <p className="text-lg max-w-[500px]" style={{ color: 'var(--app-text-muted)' }}>
              Not a generic SBOM tool. Purpose-built for CERT-In, RBI, MeitY, and India's regulated infrastructure.
            </p>
          </div>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--app-border)' }}
          >
            {differentiators.map((item, i) => (
              <div key={i} className="p-9 group transition-colors" style={{ background: 'var(--app-bg)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-card)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-bg)')}>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.color}15` }}
                >
                  <item.icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--app-text-primary)' }}>{item.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--app-text-muted)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>COMPARISON</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>IntelliXBOM vs. the alternatives</h2>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--app-border)' }}>
            <table className="w-full">
              <thead>
                <tr style={{ background: 'var(--app-elevated)', borderBottom: '1px solid var(--app-border)' }}>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>Feature</th>
                  <th className="px-6 py-4 text-center"><span className="text-sm font-bold" style={{ color: 'var(--app-text-primary)' }}>IntelliXBOM</span></th>
                  <th className="px-6 py-4 text-center"><span className="text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>Manual Audit</span></th>
                  <th className="px-6 py-4 text-center"><span className="text-sm font-medium" style={{ color: 'var(--app-text-muted)' }}>Generic SBOM Tools</span></th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="border-b" style={{ borderColor: 'var(--app-border-subtle)' }}>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--app-text-muted)' }}>{row.feature}</td>
                    <td className="px-6 py-4 text-center"><ComparisonCell value={row.intellixbom} /></td>
                    <td className="px-6 py-4 text-center"><ComparisonCell value={row.manual} /></td>
                    <td className="px-6 py-4 text-center"><ComparisonCell value={row.generic} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(67,97,238,0.12), transparent), var(--app-bg)` }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>Start with one SBOM audit. Free.</h2>
          <p className="text-lg mb-10" style={{ color: 'var(--app-text-muted)' }}>
            Upload a vendor SBOM and see exactly which CERT-In fields pass, fail, or need attention. Results in 60 seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.45)' }}
            >
              Validate My SBOM →
            </button>
            <Link to="/platform" className="px-7 py-3.5 text-base font-medium rounded-lg border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}>
              Explore Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ComparisonCell({ value }: { value: boolean | string }) {
  if (value === true) return <CheckCircle2 className="w-5 h-5 text-[#00D4AA] mx-auto" />;
  if (value === false) return <XCircle className="w-5 h-5 mx-auto" style={{ color: 'var(--app-text-dimmer)' }} />;
  return <span className="text-[#F59E0B] text-xs font-medium">Partial</span>;
}
