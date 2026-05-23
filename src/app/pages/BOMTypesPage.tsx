import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { openDemoModal } from '../components/DemoModal';

type BOMType = 'SBOM' | 'CBOM' | 'QBOM' | 'AIBOM' | 'HBOM';

const bomDetails = {
  SBOM: {
    id: 'sbom',
    color: '#4361EE',
    label: 'Software Bill of Materials',
    headline: 'Complete Software Transparency',
    description: 'Track every package, dependency, and library in your software supply chain. Auto-verify against CERT-In mandatory fields with real-time CVE monitoring.',
    features: ['Automatic dependency graph generation', 'CERT-In 21-field compliance validation', 'Real-time CVE & license risk alerts', 'CycloneDX & SPDX format support', 'Version pinning and lock file analysis', 'Transitive dependency mapping'],
    regulatory: ['CERT-In v2.0', 'RBI Advisory', 'MeitY 2025', 'EO 14028', 'EU CRA'],
    tags: ['NPM', 'Maven', 'PyPI', 'Go Modules', 'Cargo', 'NuGet'],
    stats: [{ label: 'Fields Validated', value: '21' }, { label: 'Formats Supported', value: '4' }, { label: 'Ecosystems', value: '12+' }]
  },
  CBOM: {
    id: 'cbom',
    color: '#00D4AA',
    label: 'Cryptographic Bill of Materials',
    headline: 'Crypto Asset Visibility',
    description: 'Inventory every cryptographic asset, certificate, and key across your infrastructure. Detect weak algorithms and expiring certificates before they fail.',
    features: ['Certificate expiry monitoring & alerts', 'Weak algorithm detection (MD5, SHA1, DES)', 'Key rotation compliance tracking', 'Post-quantum readiness assessment', 'PKI hierarchy mapping', 'TLS configuration auditing'],
    regulatory: ['CERT-In v2.0', 'NCIIPC', 'RBI Advisory', 'NIST PQC'],
    tags: ['TLS 1.3', 'RSA', 'ECC', 'Certificates', 'HSM', 'PKCS#11'],
    stats: [{ label: 'Algorithm Checks', value: '40+' }, { label: 'Cert Formats', value: '8' }, { label: 'Days Early Alert', value: '90' }]
  },
  QBOM: {
    id: 'qbom',
    color: '#8B5CF6',
    label: 'Quantum Bill of Materials',
    headline: 'Quantum-Safe Migration',
    description: 'Identify quantum-vulnerable cryptography in your systems and track migration to post-quantum algorithms. Stay ahead of Y2Q before it arrives.',
    features: ['Quantum vulnerability scanning', 'NIST PQC algorithm mapping', 'Migration priority scoring', 'Hybrid crypto deployment tracking', 'Y2Q readiness timeline estimation', 'CRYSTALS-Kyber readiness assessment'],
    regulatory: ['NIST PQC', 'NCSC PQC', 'NCIIPC', 'CERT-In v2.0'],
    tags: ['CRYSTALS-Kyber', 'Dilithium', 'SPHINCS+', 'FALCON', 'Hybrid'],
    stats: [{ label: 'Vulnerable Algos Tracked', value: '30+' }, { label: 'PQC Candidates', value: '4' }, { label: 'Migration Score', value: '0-100' }]
  },
  AIBOM: {
    id: 'aibom',
    color: '#F59E0B',
    label: 'AI Bill of Materials',
    headline: 'AI Model Governance',
    description: 'Track AI/ML models, training datasets, and inference pipelines. Ensure compliance with emerging AI regulations and detect bias or data provenance risks.',
    features: ['Model lineage & version tracking', 'Training data provenance mapping', 'Bias & fairness scoring', 'Responsible AI compliance reporting', 'Third-party model risk assessment', 'Inference pipeline dependency mapping'],
    regulatory: ['EU AI Act', 'MeitY AI Guidelines', 'FDA AI/ML Guidance', 'CERT-In v2.0'],
    tags: ['TensorFlow', 'PyTorch', 'ONNX', 'Hugging Face', 'OpenAI', 'Scikit-learn'],
    stats: [{ label: 'Model Frameworks', value: '10+' }, { label: 'Bias Metrics', value: '15' }, { label: 'Data Lineage Depth', value: 'Full' }]
  },
  HBOM: {
    id: 'hbom',
    color: '#EF4444',
    label: 'Hardware Bill of Materials',
    headline: 'Hardware Supply Chain Security',
    description: 'Inventory physical components, firmware versions, and TPM modules. Track hardware supply chain risks and enforce firmware update policies.',
    features: ['Firmware version tracking & alerts', 'TPM & secure boot verification', 'Hardware supply chain risk scoring', 'BIOS/UEFI update compliance', 'Component authenticity verification', 'End-of-life hardware tracking'],
    regulatory: ['CERT-In v2.0', 'NCIIPC', 'DoD CMMC', 'MeitY 2025'],
    tags: ['Intel', 'AMD', 'ARM', 'TPM 2.0', 'UEFI', 'IPMI'],
    stats: [{ label: 'Component Types', value: '50+' }, { label: 'Risk Categories', value: '8' }, { label: 'Firmware Checks', value: 'Continuous' }]
  }
};

const hashToTab: Record<string, BOMType> = {
  sbom: 'SBOM', cbom: 'CBOM', qbom: 'QBOM', aibom: 'AIBOM', hbom: 'HBOM'
};

export default function BOMTypesPage() {
  const [activeTab, setActiveTab] = useState<BOMType>('SBOM');
  const location = useLocation();
  const active = bomDetails[activeTab];

  useEffect(() => {
    const hash = location.hash.replace('#', '').toLowerCase();
    if (hashToTab[hash]) {
      setActiveTab(hashToTab[hash]);
      setTimeout(() => {
        document.getElementById('bom-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location.hash]);

  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Hero */}
      <section
        className="pt-24 pb-12 px-6"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(67,97,238,0.15) 0%, transparent 65%), var(--app-bg)`
        }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>FIVE BOM TYPES. ONE PLATFORM.</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: 'var(--app-text-primary)' }}>
            Complete Visibility<br />
            <span style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Across Every Layer
            </span>
          </h1>
          <p className="text-xl leading-[1.75] max-w-[580px] mx-auto" style={{ color: 'var(--app-text-muted)' }}>
            From software packages to quantum cryptography, AI models to hardware firmware—governed, validated, and compliant.
          </p>
        </div>
      </section>

      {/* Tabs + Detail */}
      <section className="px-6 pb-16">
        <div className="max-w-[1440px] mx-auto">
          {/* Tab Row */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {(Object.keys(bomDetails) as BOMType[]).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200"
                style={activeTab === type ? {
                  background: `rgba(${hexToRgb(bomDetails[type].color)}, 0.15)`,
                  border: `1px solid rgba(${hexToRgb(bomDetails[type].color)}, 0.5)`,
                  boxShadow: `0 0 16px rgba(${hexToRgb(bomDetails[type].color)}, 0.25)`,
                  color: bomDetails[type].color
                } : {
                  color: 'var(--app-text-muted)',
                  background: 'var(--app-elevated)',
                  border: '1px solid var(--app-border)'
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bomDetails[type].color }} />
                {type}
              </button>
            ))}
          </div>

          {/* Detail Panel */}
          <div
            id="bom-detail"
            className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid var(--app-border)', scrollMarginTop: '88px' }}
          >
            <div className="h-1" style={{ background: `linear-gradient(90deg, ${active.color}, ${active.color}80)` }} />

            <div className="p-8 grid md:grid-cols-2 gap-10 items-start" style={{ background: 'var(--app-card)' }}>
              {/* Left */}
              <div>
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
                  style={{ background: `${active.color}18`, color: active.color }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: active.color }} />
                  {activeTab}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--app-text-primary)' }}>{active.headline}</h2>
                <p className="text-[11px] uppercase tracking-[0.08em] font-medium mb-5" style={{ color: active.color }}>
                  {active.label}
                </p>
                <p className="text-lg leading-[1.75] mb-8" style={{ color: 'var(--app-text-muted)' }}>{active.description}</p>

                <div className="space-y-3 mb-8">
                  {active.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: active.color }} />
                      <span className="text-[15px]" style={{ color: 'var(--app-text-primary)' }}>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {active.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-[11px] font-medium"
                      style={{ background: `${active.color}12`, color: active.color }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.08em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>REGULATORY COVERAGE</p>
                  <div className="flex flex-wrap gap-2">
                    {active.regulatory.map(reg => (
                      <span key={reg} className="px-3 py-1 rounded text-[11px] font-medium" style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)', color: 'var(--app-text-muted)' }}>
                        {reg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Stats + Terminal */}
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {active.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl p-5 text-center"
                      style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
                    >
                      <div className="text-2xl font-bold mb-1" style={{ color: active.color }}>{stat.value}</div>
                      <div className="text-[11px]" style={{ color: 'var(--app-text-dimmer)' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Terminal always dark */}
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ background: '#080C14', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="h-7 bg-[#0D1117] flex items-center justify-between px-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
                    </div>
                    <span className="font-mono text-[10px] text-[#4B5563]">
                      ixbom://{activeTab.toLowerCase()}/validate
                    </span>
                  </div>
                  <div className="p-5 font-mono text-xs text-[#94A3B8] space-y-1.5">
                    <div><span style={{ color: active.color }}>$</span> ixbom validate --type {activeTab.toLowerCase()} --standard cert-in-v2</div>
                    <div className="text-[#4B5563]">→ Scanning {activeTab.toLowerCase()} inventory...</div>
                    <div className="text-[#4B5563]">→ Validating against 21 mandatory fields...</div>
                    <div style={{ color: active.color }}>→ Compliance report ready</div>
                    <div className="pt-2 border-t border-white/[0.05]">
                      <span className="text-[#4B5563]">Status: </span>
                      <span style={{ color: active.color }}>validated</span>
                      <span className="text-[#4B5563]"> · Fields: </span>
                      <span className="text-[#00D4AA]">21/21</span>
                      <span className="text-[#4B5563]"> checked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Teaser */}
          <div
            className="mt-8 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ background: 'rgba(67,97,238,0.07)', border: '1px solid rgba(67,97,238,0.2)' }}
          >
            <p className="text-sm md:text-base" style={{ color: 'var(--app-text-primary)' }}>
              Need to compare BOM types for your compliance team?
            </p>
            <Link
              to="/compare"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5"
              style={{ color: '#4361EE' }}
            >
              View Full Comparison <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Full Comparison Table */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>FULL COMPARISON</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>BOM Types at a Glance</h2>
          </div>
          <div
            className="rounded-2xl overflow-x-auto"
            style={{ border: '1px solid var(--app-border)' }}
          >
            <table className="w-full min-w-[700px]">
              <thead>
                <tr style={{ background: 'var(--app-elevated)', borderBottom: '1px solid var(--app-border)' }}>
                  <th className="text-left px-6 py-4 text-sm font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Capability</th>
                  {(Object.keys(bomDetails) as BOMType[]).map(type => (
                    <th key={type} className="px-4 py-4 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: bomDetails[type].color }} />
                        <span className="text-sm font-semibold" style={{ color: 'var(--app-text-primary)' }}>{type}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: 'CERT-In v2.0 aligned', values: [true, true, true, true, true] },
                  { label: 'Real-time monitoring', values: [true, true, false, true, true] },
                  { label: 'CVE correlation', values: [true, false, false, false, true] },
                  { label: 'Regulatory export', values: [true, true, true, true, true] },
                  { label: 'Air-gap support', values: [true, true, true, true, true] },
                  { label: 'CI/CD integration', values: [true, true, false, true, false] },
                  { label: 'Vendor scoring', values: [true, true, false, false, true] },
                ].map((row, i) => (
                  <tr key={i} className="border-b hover:opacity-90 transition-opacity" style={{ borderColor: 'var(--app-border-subtle)' }}>
                    <td className="px-6 py-4 text-sm" style={{ color: 'var(--app-text-muted)' }}>{row.label}</td>
                    {row.values.map((v, j) => {
                      const type = (Object.keys(bomDetails) as BOMType[])[j];
                      return (
                        <td key={j} className="px-4 py-4 text-center">
                          {v
                            ? <CheckCircle2 className="w-4 h-4 mx-auto" style={{ color: bomDetails[type].color }} />
                            : <span className="text-lg" style={{ color: 'var(--app-text-dimmer)' }}>—</span>
                          }
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '67, 97, 238';
}
