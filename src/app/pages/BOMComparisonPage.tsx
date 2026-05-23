import { Link } from 'react-router';
import { CheckCircle2, XCircle, Minus, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { openDemoModal } from '../components/DemoModal';

const bomTypes = [
  {
    id: 'sbom',
    name: 'SBOM',
    fullName: 'Software Bill of Materials',
    color: '#4361EE',
    purpose: 'Inventory all software packages, libraries, and dependencies in your application stack.',
    whoNeeds: 'All regulated software teams, procurement offices receiving third-party software.',
    updateTrigger: 'Every software build / release',
    formats: 'CycloneDX 1.4/1.5, SPDX 2.2/2.3',
    regulatoryMandate: ['CERT-In v2.0', 'RBI 11/2024', 'MeitY 2025', 'SEBI 2025'],
    coverageScore: 94,
    keyFields: ['Component name & version', 'PURL / Unique identifier', 'License expression', 'Hash / checksum', 'Supplier provenance', 'CVE status'],
    href: '/bom-types#sbom',
  },
  {
    id: 'cbom',
    name: 'CBOM',
    fullName: 'Cryptographic Bill of Materials',
    color: '#00D4AA',
    purpose: 'Inventory cryptographic assets certificates, keys, algorithms, and protocols across your infrastructure.',
    whoNeeds: 'Security teams, PKI owners, any organisation starting post-quantum migration.',
    updateTrigger: 'Certificate rotation, infrastructure changes',
    formats: 'CycloneDX 1.5+, JSON, custom',
    regulatoryMandate: ['CERT-In v2.0', 'NCIIPC', 'RBI Advisory', 'NIST PQC'],
    coverageScore: 91,
    keyFields: ['Algorithm & key size', 'Certificate expiry', 'Issuer chain', 'Protocol versions', 'Quantum vulnerability level', 'HSM binding'],
    href: '/bom-types#cbom',
  },
  {
    id: 'qbom',
    name: 'QBOM',
    fullName: 'Quantum Bill of Materials',
    color: '#8B5CF6',
    purpose: 'Identify quantum-vulnerable cryptography and track migration to post-quantum algorithms (CRYSTALS-Kyber, Dilithium, etc.).',
    whoNeeds: 'Critical infrastructure operators, defence, long-lived data custodians.',
    updateTrigger: 'Algorithm changes, PQC migration milestones',
    formats: 'CycloneDX 1.5+, NIST PQC registry format',
    regulatoryMandate: ['NCIIPC', 'NIST PQC', 'NCSC PQC', 'CERT-In v2.0'],
    coverageScore: 87,
    keyFields: ['Quantum risk level (Critical/High/Medium/Low)', 'Current algorithm', 'PQC replacement target', 'Migration deadline', 'Harvest-now risk flag', 'System dependency depth'],
    href: '/bom-types#qbom',
  },
  {
    id: 'aibom',
    name: 'AIBOM',
    fullName: 'AI Bill of Materials',
    color: '#F59E0B',
    purpose: 'Document AI/ML models, training datasets, inference frameworks, and data provenance for governance and regulatory reporting.',
    whoNeeds: 'Banks deploying ML for credit/fraud, healthcare AI, algorithmic trading systems.',
    updateTrigger: 'Model version update, retraining, dataset change',
    formats: 'CycloneDX 1.5+, model card JSON, MLMD',
    regulatoryMandate: ['CERT-In v2.0', 'MeitY AI Guidelines', 'RBI AI Guidance', 'SEBI Algo Rules'],
    coverageScore: 88,
    keyFields: ['Model architecture & version', 'Training dataset provenance', 'License / consent status', 'Bias assessment results', 'Inference framework', 'Third-party model risk'],
    href: '/bom-types#aibom',
  },
  {
    id: 'hbom',
    name: 'HBOM',
    fullName: 'Hardware Bill of Materials',
    color: '#EF4444',
    purpose: 'Inventory physical hardware components, firmware versions, TPM modules, and supply chain provenance for critical infrastructure.',
    whoNeeds: 'PSUs, data centres, defence procurement, NCIIPC-designated CII operators.',
    updateTrigger: 'Hardware refresh, firmware update, procurement',
    formats: 'CycloneDX 1.5+, IEEE 802.1AR, custom NCIIPC',
    regulatoryMandate: ['NCIIPC', 'CERT-In v2.0', 'DoD CMMC', 'MeitY 2025'],
    coverageScore: 86,
    keyFields: ['Component manufacturer & model', 'Firmware version', 'TPM state', 'Secure boot config', 'Supply chain certificate', 'End-of-life date'],
    href: '/bom-types#hbom',
  },
];

const featureMatrix = [
  {
    category: 'Coverage',
    features: [
      { name: 'Software packages & dependencies', sbom: true, cbom: false, qbom: false, aibom: 'partial', hbom: false },
      { name: 'Cryptographic assets & certificates', sbom: false, cbom: true, qbom: true, aibom: false, hbom: 'partial' },
      { name: 'AI/ML models & training data', sbom: false, cbom: false, qbom: false, aibom: true, hbom: false },
      { name: 'Physical hardware & firmware', sbom: false, cbom: false, qbom: false, aibom: false, hbom: true },
      { name: 'Dependency relationships', sbom: true, cbom: 'partial', qbom: false, aibom: true, hbom: 'partial' },
    ]
  },
  {
    category: 'Compliance',
    features: [
      { name: 'CERT-In v2.0 mandatory', sbom: true, cbom: true, qbom: true, aibom: true, hbom: true },
      { name: 'RBI Advisory 11/2024', sbom: true, cbom: 'partial', qbom: false, aibom: 'partial', hbom: false },
      { name: 'NCIIPC critical infrastructure', sbom: 'partial', cbom: true, qbom: true, aibom: false, hbom: true },
      { name: 'SEBI capital markets', sbom: true, cbom: false, qbom: false, aibom: 'partial', hbom: false },
      { name: 'MeitY 2025 government IT', sbom: true, cbom: true, qbom: false, aibom: true, hbom: 'partial' },
    ]
  },
  {
    category: 'Capabilities',
    features: [
      { name: 'CVE / vulnerability correlation', sbom: true, cbom: true, qbom: true, aibom: 'partial', hbom: true },
      { name: 'Continuous CI/CD integration', sbom: true, cbom: 'partial', qbom: false, aibom: true, hbom: false },
      { name: 'Post-quantum risk scoring', sbom: false, cbom: true, qbom: true, aibom: false, hbom: false },
      { name: 'Vendor SBOM collection workflow', sbom: true, cbom: false, qbom: false, aibom: true, hbom: true },
      { name: 'Air-gap / offline deployment', sbom: true, cbom: true, qbom: true, aibom: true, hbom: true },
      { name: 'One-click audit export', sbom: true, cbom: true, qbom: true, aibom: true, hbom: true },
    ]
  },
];

type CellValue = boolean | 'partial';

function Cell({ value }: { value: CellValue }) {
  if (value === true) return <CheckCircle2 className="w-4 h-4 text-[#00D4AA] mx-auto" />;
  if (value === false) return <XCircle className="w-4 h-4 mx-auto" style={{ color: 'var(--app-text-dimmer)' }} />;
  return <Minus className="w-4 h-4 mx-auto text-[#F59E0B]" />;
}

export default function BOMComparisonPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>

      {/* Hero */}
      <section
        className="pt-24 pb-12 px-6"
        style={{ background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(67,97,238,0.14) 0%, transparent 65%), var(--app-bg)` }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
            style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.25)' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#4361EE]" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#4361EE] font-bold">BOM Type Comparison</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-0.03em] mb-5" style={{ color: 'var(--app-text-primary)' }}>
            Which BOM types<br />
            <span style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              does your team need?
            </span>
          </h1>
          <p className="text-xl leading-[1.75] max-w-[600px] mx-auto mb-8" style={{ color: 'var(--app-text-muted)' }}>
            SBOM, CBOM, QBOM, AIBOM, HBOM each serves a distinct regulatory and operational purpose.
            Here's how they compare across coverage, compliance mandates, and capabilities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {bomTypes.map(b => (
              <span
                key={b.id}
                className="px-3 py-1 rounded-full text-xs font-bold"
                style={{ background: `${b.color}15`, border: `1px solid ${b.color}40`, color: b.color }}
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Overview Cards */}
      <section className="py-10 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-8">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-2" style={{ color: 'var(--app-text-dimmer)' }}>OVERVIEW</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--app-text-primary)' }}>At a glance</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {bomTypes.map((bom, i) => (
              <motion.div
                key={bom.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
              >
                <Link to={bom.href}>
                  <div
                    className="rounded-2xl p-5 h-full transition-all duration-200 hover:-translate-y-1 group"
                    style={{ background: 'var(--app-card)', border: `1px solid var(--app-border)` }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${bom.color}45`)}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)')}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black mb-4"
                      style={{ background: `${bom.color}18`, color: bom.color, border: `1px solid ${bom.color}30` }}
                    >
                      {bom.name}
                    </div>
                    <h3 className="text-xs font-bold mb-2" style={{ color: bom.color }}>{bom.fullName}</h3>
                    <p className="text-xs leading-[1.6] mb-4" style={{ color: 'var(--app-text-muted)' }}>{bom.purpose}</p>

                    {/* Coverage meter */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>IntelliXBOM coverage</span>
                        <span className="text-[10px] font-bold" style={{ color: bom.color }}>{bom.coverageScore}%</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--app-elevated)' }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${bom.coverageScore}%`, background: bom.color }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-12 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-2" style={{ color: 'var(--app-text-dimmer)' }}>FEATURE MATRIX</p>
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Detailed capability comparison</h2>
            <div className="flex items-center justify-center gap-5 text-xs" style={{ color: 'var(--app-text-dimmer)' }}>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#00D4AA]" /> Fully supported</span>
              <span className="flex items-center gap-1.5"><Minus className="w-3.5 h-3.5 text-[#F59E0B]" /> Partial / limited</span>
              <span className="flex items-center gap-1.5"><XCircle className="w-3.5 h-3.5" style={{ color: 'var(--app-text-dimmer)' }} /> Not applicable</span>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--app-border)' }}>
            {/* Table header */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: '2fr repeat(5, 1fr)',
                background: 'var(--app-elevated)',
                borderBottom: '1px solid var(--app-border)'
              }}
            >
              <div className="px-5 py-4 text-xs font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Feature</div>
              {bomTypes.map(b => (
                <div key={b.id} className="px-3 py-4 text-center">
                  <span className="text-xs font-black" style={{ color: b.color }}>{b.name}</span>
                </div>
              ))}
            </div>

            {/* Feature rows by category */}
            {featureMatrix.map((group, gi) => (
              <div key={gi}>
                {/* Category header */}
                <div
                  className="px-5 py-2.5"
                  style={{ background: 'var(--app-bg-alt)', borderBottom: '1px solid var(--app-border)', borderTop: gi > 0 ? '1px solid var(--app-border)' : 'none' }}
                >
                  <span className="text-[10px] uppercase tracking-[0.12em] font-bold" style={{ color: 'var(--app-text-dimmer)' }}>
                    {group.category}
                  </span>
                </div>
                {group.features.map((feat, fi) => (
                  <div
                    key={fi}
                    className="grid transition-colors"
                    style={{
                      gridTemplateColumns: '2fr repeat(5, 1fr)',
                      borderBottom: fi < group.features.length - 1 ? '1px solid var(--app-border-subtle)' : 'none',
                      background: 'var(--app-card)'
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-card)')}
                  >
                    <div className="px-5 py-3.5 text-sm" style={{ color: 'var(--app-text-muted)' }}>{feat.name}</div>
                    <div className="px-3 py-3.5 flex items-center justify-center"><Cell value={feat.sbom} /></div>
                    <div className="px-3 py-3.5 flex items-center justify-center"><Cell value={feat.cbom} /></div>
                    <div className="px-3 py-3.5 flex items-center justify-center"><Cell value={feat.qbom} /></div>
                    <div className="px-3 py-3.5 flex items-center justify-center"><Cell value={feat.aibom} /></div>
                    <div className="px-3 py-3.5 flex items-center justify-center"><Cell value={feat.hbom} /></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Requirements Grid */}
      <section className="py-12 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-2" style={{ color: 'var(--app-text-dimmer)' }}>REGULATORY DRIVERS</p>
            <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Which regulation mandates which BOM?</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { reg: 'CERT-In v2.0', color: '#22C55E', boms: ['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'], note: 'Mandates all five BOM types for regulated software.' },
              { reg: 'RBI Advisory 11/2024', color: '#4361EE', boms: ['SBOM', 'AIBOM'], note: 'Focuses on software and AI supply chain for financial entities.' },
              { reg: 'NCIIPC Guidelines', color: '#EF4444', boms: ['CBOM', 'QBOM', 'HBOM'], note: 'Critical infrastructure operators require crypto, quantum, and hardware BOMs.' },
              { reg: 'MeitY 2025', color: '#8B5CF6', boms: ['SBOM', 'CBOM', 'AIBOM'], note: 'Government IT procurement must include software, crypto, and AI BOMs.' },
              { reg: 'SEBI July 2025', color: '#F59E0B', boms: ['SBOM', 'AIBOM'], note: 'Trading systems and algorithmic platforms require SBOM and AIBOM.' },
              { reg: 'NIST PQC Standards', color: '#00D4AA', boms: ['CBOM', 'QBOM'], note: 'Post-quantum migration requires cryptographic and quantum BOMs.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="rounded-xl p-5"
                style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <h3 className="text-sm font-bold" style={{ color: 'var(--app-text-primary)' }}>{item.reg}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.boms.map(b => {
                    const bom = bomTypes.find(x => x.name === b)!;
                    return (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                        style={{ background: `${bom.color}15`, color: bom.color }}
                      >
                        {b}
                      </span>
                    );
                  })}
                </div>
                <p className="text-xs leading-[1.6]" style={{ color: 'var(--app-text-muted)' }}>{item.note}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed per-BOM breakdown */}
      <section className="py-12 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-2" style={{ color: 'var(--app-text-dimmer)' }}>DEEP DIVE</p>
            <h2 className="text-3xl font-bold" style={{ color: 'var(--app-text-primary)' }}>Per-BOM field requirements</h2>
          </div>
          <div className="space-y-5">
            {bomTypes.map((bom, i) => (
              <motion.div
                key={bom.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
                className="rounded-2xl overflow-hidden"
                style={{ border: '1px solid var(--app-border)' }}
              >
                <div className="h-1" style={{ background: bom.color }} />
                <div className="p-6 grid md:grid-cols-[1fr_auto] gap-6 items-start" style={{ background: 'var(--app-card)' }}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-black"
                        style={{ background: `${bom.color}18`, color: bom.color }}
                      >
                        {bom.name}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--app-text-primary)' }}>{bom.fullName}</span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.1em] font-bold mb-2" style={{ color: 'var(--app-text-dimmer)' }}>Who Needs It</p>
                        <p className="text-xs leading-[1.6]" style={{ color: 'var(--app-text-muted)' }}>{bom.whoNeeds}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.1em] font-bold mb-2" style={{ color: 'var(--app-text-dimmer)' }}>Update Trigger</p>
                        <p className="text-xs leading-[1.6]" style={{ color: 'var(--app-text-muted)' }}>{bom.updateTrigger}</p>
                        <p className="text-[10px] mt-2 font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Formats: {bom.formats}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.1em] font-bold mb-2" style={{ color: 'var(--app-text-dimmer)' }}>Key Fields</p>
                        <ul className="space-y-1">
                          {bom.keyFields.map((f, fi) => (
                            <li key={fi} className="flex items-start gap-1.5">
                              <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: bom.color }} />
                              <span className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={bom.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5"
                    style={{ background: `${bom.color}15`, color: bom.color, border: `1px solid ${bom.color}30` }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(67,97,238,0.1), transparent), var(--app-bg-alt)` }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>
            Need all five? We've got you.
          </h2>
          <p className="text-lg mb-10" style={{ color: 'var(--app-text-muted)' }}>
            IntelliXBOM is the only Indian platform that validates, governs, and cross-correlates
            SBOM, CBOM, QBOM, AIBOM, and HBOM in a single compliance workflow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.4)' }}
            >
              Get a Free Demo →
            </button>
            <Link
              to="/bom-types"
              className="px-7 py-3.5 text-base font-medium rounded-xl border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}
            >
              Explore Platform
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
