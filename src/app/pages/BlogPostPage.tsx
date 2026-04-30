import { useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { ArrowLeft, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { blogPosts } from './BlogPage';

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el); }
  el.setAttribute('content', content);
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (!post) return;
    const title = `${post.title} — IntelliXBOM Blog`;
    document.title = title;
    setMeta('og:title', title);
    setMeta('og:description', post.excerpt);
    setMeta('og:type', 'article');
    setMeta('og:url', `https://intellixbom.in/blog/${post.slug}`);
    setMetaName('twitter:title', title);
    setMetaName('twitter:description', post.excerpt);
    setMetaName('description', post.excerpt);
    return () => {
      document.title = 'IntelliXBOM — Complete BOM Governance for India\'s Regulated Infrastructure';
    };
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--app-bg)' }}>
        <div className="text-center">
          <div className="text-6xl font-bold text-[#4361EE] mb-4">404</div>
          <div className="text-xl mb-6" style={{ color: 'var(--app-text-primary)' }}>Post not found</div>
          <Link to="/blog" className="text-[#4361EE] hover:underline">← Back to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Article Header */}
      <section
        className="pt-24 pb-12 px-6"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, rgba(67,97,238,0.18) 0%, transparent 65%), var(--app-bg)`
        }}
      >
        <div className="max-w-[900px] mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm transition-colors mb-10" style={{ color: 'var(--app-text-dimmer)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--app-text-dimmer)')}>
            <ArrowLeft className="w-4 h-4" />
            All posts
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span
              className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
              style={{ background: `${post.categoryColor}18`, color: post.categoryColor }}
            >
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6" style={{ color: 'var(--app-text-primary)' }}>
            {post.title}
          </h1>
          <p className="text-lg leading-[1.7] mb-8" style={{ color: 'var(--app-text-muted)' }}>
            {post.excerpt}
          </p>

          <div className="flex items-center gap-4 text-sm pb-8" style={{ color: 'var(--app-text-dimmer)', borderBottom: '1px solid var(--app-border)' }}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#4361EE] flex items-center justify-center text-xs font-bold text-white">IX</div>
              <span className="font-medium" style={{ color: 'var(--app-text-muted)' }}>{post.author}</span>
            </div>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="px-6 pb-14">
        <div className="max-w-[900px] mx-auto">
          <ArticleContent slug={slug || ''} />
        </div>
      </section>

      {/* More Posts */}
      <section className="px-6 pb-14" style={{ borderTop: '1px solid var(--app-border)' }}>
        <div className="max-w-[1440px] mx-auto pt-12">
          <h3 className="text-[11px] uppercase tracking-[0.1em] font-medium mb-8" style={{ color: 'var(--app-text-dimmer)' }}>MORE POSTS</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 3).map(related => (
              <Link key={related.slug} to={`/blog/${related.slug}`}>
                <div
                  className="rounded-xl p-6 group transition-all duration-200"
                  style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border-dim)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)')}
                >
                  <span
                    className="inline-block px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-wide mb-3"
                    style={{ background: `${related.categoryColor}18`, color: related.categoryColor }}
                  >
                    {related.category}
                  </span>
                  <h4 className="text-sm font-semibold transition-colors leading-snug mb-2" style={{ color: 'var(--app-text-primary)' }}>
                    {related.title}
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--app-text-dimmer)' }}>{related.date} · {related.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleContent({ slug }: { slug: string }) {
  if (slug === 'dont-trust-the-sbom-your-vendor-gave-you') return <DontTrustSBOMArticle />;
  if (slug === 'understanding-cert-in-sbom-requirements') return <CertInFieldsArticle />;
  if (slug === 'quantum-readiness-cbom-guide') return <QuantumReadinessArticle />;
  if (slug === 'hbom-hardware-supply-chain') return <HBOMArticle />;
  if (slug === 'aibom-ai-governance') return <AIBOMArticle />;
  if (slug === 'rbi-sbom-advisory-breakdown') return <RBIArticle />;
  return <GenericArticle />;
}

// ── Article: Understanding CERT-In 21 Fields ──────────────────────────────────
function CertInFieldsArticle() {
  const fields = [
    { num: 1, name: 'Component Name', desc: 'Official package/library name', gap: 'Rarely missing' },
    { num: 2, name: 'Component Version', desc: 'Exact version string (semver)', gap: 'Rarely missing' },
    { num: 3, name: 'Supplier Name', desc: 'Organisation that produced the component', gap: 'Often generic' },
    { num: 4, name: 'Unique Identifier (PURL)', desc: 'Package URL in standard format', gap: 'Format often incorrect' },
    { num: 5, name: 'Dependency Relationships', desc: 'Direct vs transitive dependency graph', gap: 'Frequently incomplete' },
    { num: 6, name: 'License Expression', desc: 'SPDX license identifier', gap: 'Missing in ~40% of BOMs' },
    { num: 7, name: 'Author / Creator', desc: 'Person or team that created the component', gap: 'Rarely populated' },
    { num: 8, name: 'Timestamp', desc: 'When the BOM was generated (ISO 8601)', gap: 'Often absent' },
    { num: 9, name: 'Hash / Checksum', desc: 'SHA-256 or equivalent integrity hash', gap: 'Missing in most auto-generated BOMs' },
    { num: 10, name: 'Download Location', desc: 'Verifiable URL to fetch the component', gap: 'Usually absent' },
    { num: 11, name: 'External References', desc: 'CVE database, advisories, NVD links', gap: 'Rarely included' },
    { num: 12, name: 'Cryptographic Info', desc: 'Algorithms used in component', gap: 'Almost always missing' },
    { num: 13, name: 'Criticality Score', desc: 'OpenSSF criticality or custom risk score', gap: 'Always missing in tools' },
    { num: 14, name: 'End-of-Life Date', desc: 'Vendor-declared EOL date', gap: 'Rarely tracked' },
    { num: 15, name: 'Vulnerability Status', desc: 'Known CVEs and their remediation status', gap: 'Requires live CVE feed' },
    { num: 16, name: 'Component Type', desc: 'library, framework, OS, firmware, etc.', gap: 'Inconsistently populated' },
    { num: 17, name: 'Scope', desc: 'Required, optional, excluded', gap: 'Often absent' },
    { num: 18, name: 'BOM Serial Number', desc: 'Unique BOM document identifier', gap: 'CycloneDX includes; SPDX varies' },
    { num: 19, name: 'BOM Format Version', desc: 'Schema version (CycloneDX 1.5, SPDX 2.3)', gap: 'Usually present' },
    { num: 20, name: 'Tool Used', desc: 'Tool that generated the SBOM', gap: 'Included by most tools' },
    { num: 21, name: 'Provenance / Originator', desc: 'Original upstream source of the component', gap: 'Often confused with supplier' },
  ];

  return (
    <div className="space-y-8 pt-10">
      <ArticleParagraph>
        India's CERT-In SBOM Technical Guidelines v2.0 (July 2025) define <strong style={{ color: 'var(--app-text-primary)' }}>21 mandatory fields</strong> that
        every BOM component must carry. These aren't suggestions — they're the minimum bar for compliance across
        regulated sectors including banking, critical infrastructure, government IT, and capital markets.
      </ArticleParagraph>

      <ArticleParagraph>
        Most automatically generated SBOMs cover fields 1–4 reliably. Fields 5–12 are hit-or-miss depending on
        the tool and ecosystem. Fields 13–21 are almost universally absent because they require human input or
        live data enrichment that no static generation tool provides.
      </ArticleParagraph>

      <ArticleCallout>
        Our analysis of 200+ vendor-supplied CycloneDX SBOMs found average compliance of 34% against
        CERT-In's 21-field checklist. The gap is not a tool problem — it's a process problem.
      </ArticleCallout>

      <ArticleH2>The 21 Fields: What They Require and Where Teams Fail</ArticleH2>

      <div
        className="rounded-xl overflow-x-auto my-8"
        style={{ border: '1px solid var(--app-border)' }}
      >
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr style={{ background: 'var(--app-elevated)', borderBottom: '1px solid var(--app-border)' }}>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wide font-medium w-8" style={{ color: 'var(--app-text-dimmer)' }}>#</th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wide font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Field</th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wide font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Description</th>
              <th className="text-left px-4 py-3 text-[11px] uppercase tracking-wide font-medium" style={{ color: 'var(--app-text-dimmer)' }}>Common Gap</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(f => (
              <tr key={f.num} style={{ borderBottom: '1px solid var(--app-border-subtle)' }}>
                <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--app-text-dimmer)' }}>{f.num}</td>
                <td className="px-4 py-3 font-medium text-xs" style={{ color: 'var(--app-text-primary)' }}>{f.name}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--app-text-muted)' }}>{f.desc}</td>
                <td className="px-4 py-3 text-xs" style={{ color: 'var(--app-text-muted)' }}>
                  <span
                    className="px-2 py-0.5 rounded text-[10px] font-medium"
                    style={
                      f.gap.startsWith('Rarely') || f.gap.startsWith('Usually')
                        ? { background: 'rgba(0,212,170,0.12)', color: '#00D4AA' }
                        : f.gap.startsWith('Always') || f.gap.startsWith('Missing in most')
                        ? { background: 'rgba(239,68,68,0.12)', color: '#EF4444' }
                        : { background: 'rgba(245,158,11,0.12)', color: '#F59E0B' }
                    }
                  >
                    {f.gap}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ArticleH2>Why Static Generation Falls Short</ArticleH2>

      <ArticleParagraph>
        Tools like Syft, cdxgen, and the CycloneDX Maven Plugin are excellent at extracting what's in your
        codebase. But CERT-In's requirements go beyond static introspection. Fields like criticality scores,
        EOL dates, vulnerability status, and cryptographic algorithms require live data enrichment that no
        static analysis tool provides out of the box.
      </ArticleParagraph>

      <ArticleParagraph>
        The result: a technically valid SBOM that passes format validation but fails a CERT-In field audit.
        This is why teams hand over SBOMs to procurement with confidence — until a regulator actually checks.
      </ArticleParagraph>

      <ArticleH2>How IntelliXBOM Closes the Gap</ArticleH2>

      <div className="space-y-3 my-6">
        {[
          { step: '1', title: 'Import any format', desc: 'Ingest CycloneDX 1.4/1.5 or SPDX 2.2/2.3 — IntelliXBOM parses and normalises both.' },
          { step: '2', title: 'Field-level validation', desc: 'Every component is checked against all 21 mandatory fields with explicit pass/fail/warn per field.' },
          { step: '3', title: 'Automatic enrichment', desc: 'CVE correlation, EOL lookups, and PURL normalisation are applied automatically from live feeds.' },
          { step: '4', title: 'Compliance ceiling report', desc: 'A single score showing your current compliance ceiling and the exact fields blocking 100%.' },
        ].map(item => (
          <div key={item.step} className="flex gap-4 p-4 rounded-lg" style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: 'rgba(67,97,238,0.2)', border: '1px solid rgba(67,97,238,0.4)' }}>
              {item.step}
            </div>
            <div>
              <div className="text-sm font-semibold mb-1" style={{ color: 'var(--app-text-primary)' }}>{item.title}</div>
              <div className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <ArticleParagraph>
        The goal isn't to replace your existing SBOM tooling — it's to add the validation and enrichment
        layer that turns a technically valid BOM into a regulatorily compliant one.
      </ArticleParagraph>

      <div className="rounded-2xl p-8 mt-12 text-center" style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.25)' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Run a Field-Level Audit on Your SBOM</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>Upload a BOM and see exactly which of the 21 fields pass, fail, or need enrichment.</p>
        <button onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 24px rgba(67,97,238,0.4)' }}>
          Validate My SBOM →
        </button>
      </div>
    </div>
  );
}

// ── Article: Quantum Readiness / CBOM ─────────────────────────────────────────
function QuantumReadinessArticle() {
  return (
    <div className="space-y-8 pt-10">
      <ArticleParagraph>
        The cryptographic infrastructure protecting your organisation's data was built for a classical computing
        world. Quantum computers — when they arrive at sufficient scale — will break RSA, ECDSA, and Diffie-Hellman
        in hours, not years. The National Institute of Standards and Technology finalised its first three
        post-quantum cryptography (PQC) standards in August 2024. The migration clock is running.
      </ArticleParagraph>

      <ArticleParagraph>
        But you can't migrate what you can't find. Before your organisation can move to CRYSTALS-Kyber,
        CRYSTALS-Dilithium, or SPHINCS+, you need a complete inventory of every cryptographic asset in your
        infrastructure. That inventory is a <strong style={{ color: 'var(--app-text-primary)' }}>Cryptographic Bill of Materials (CBOM)</strong>.
      </ArticleParagraph>

      <ArticleCallout>
        Most organisations don't know how many certificates they have, where they're deployed, or what
        algorithms they use. A CBOM is the prerequisite for every quantum-readiness initiative.
      </ArticleCallout>

      <ArticleH2>What a CBOM Captures</ArticleH2>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          { title: 'Certificates', items: ['TLS/SSL certificates', 'Code signing certs', 'S/MIME email certs', 'Root & intermediate CAs'] },
          { title: 'Keys & Secrets', items: ['RSA/ECDSA private keys', 'Symmetric encryption keys', 'Key management system inventory', 'HSM-held key references'] },
          { title: 'Algorithms in Use', items: ['Cipher suites per service', 'Hash functions (MD5, SHA-1, SHA-256)', 'Asymmetric algorithms (RSA-2048, P-256)', 'Digital signature schemes'] },
          { title: 'Protocols', items: ['TLS 1.0/1.1/1.2/1.3 usage by service', 'SSH cipher configurations', 'IPSec/IKE algorithm profiles', 'PKCS standards in use'] },
        ].map(cat => (
          <div key={cat.title} className="rounded-xl p-5" style={{ background: '#0D1117', border: '1px solid rgba(0,212,170,0.15)' }}>
            <h4 className="text-sm font-bold text-[#00D4AA] mb-3">{cat.title}</h4>
            <ul className="space-y-1.5">
              {cat.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] mt-1.5 flex-shrink-0" />
                  <span className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ArticleH2>The Quantum Vulnerability Audit</ArticleH2>

      <ArticleParagraph>
        Not all cryptography is equally vulnerable. A CBOM enables a structured quantum risk assessment:
      </ArticleParagraph>

      <div className="space-y-3 my-6">
        {[
          { risk: 'CRITICAL', color: '#EF4444', algos: 'RSA-1024, DH-1024, ECDSA P-192', note: 'Already weak against classical attacks. Migrate immediately.' },
          { risk: 'HIGH', color: '#F59E0B', algos: 'RSA-2048, ECDSA P-256, Ed25519', note: 'Safe today, vulnerable to Shor\'s algorithm. Plan migration.' },
          { risk: 'MEDIUM', color: '#8B5CF6', algos: 'AES-128, SHA-256', note: 'Grover\'s algorithm halves effective key size. AES-256 preferred.' },
          { risk: 'LOW', color: '#00D4AA', algos: 'AES-256, SHA-384/512, ChaCha20', note: 'Quantum-resistant with appropriate key sizes.' },
        ].map(row => (
          <div key={row.risk} className="flex gap-4 p-4 rounded-lg items-start" style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}>
            <span className="px-2 py-1 rounded text-[10px] font-bold flex-shrink-0" style={{ background: `${row.color}18`, color: row.color }}>
              {row.risk}
            </span>
            <div>
              <div className="text-xs font-mono mb-1" style={{ color: 'var(--app-text-primary)' }}>{row.algos}</div>
              <div className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{row.note}</div>
            </div>
          </div>
        ))}
      </div>

      <ArticleH2>CERT-In v2.0 and NCIIPC Requirements</ArticleH2>

      <ArticleParagraph>
        India's CERT-In v2.0 explicitly requires cryptographic inventory as part of the broader BOM ecosystem.
        NCIIPC guidelines for critical infrastructure additionally mandate post-quantum readiness assessments for
        operators in power, telecom, and defence sectors. Organisations that haven't started their CBOM journey
        are already behind on these requirements.
      </ArticleParagraph>

      <ArticleParagraph>
        NIST's PQC timeline projects widespread quantum threat capability between 2030 and 2035. That sounds
        distant — until you account for the 3–5 year average migration time for critical infrastructure and the
        "harvest now, decrypt later" attacks already underway today.
      </ArticleParagraph>

      <ArticleCallout>
        Harvest now, decrypt later: adversaries are recording encrypted traffic today to decrypt it once
        quantum computers are available. The threat is not future — the data exposure starts now.
      </ArticleCallout>

      <ArticleParagraph>
        IntelliXBOM's CBOM module generates a complete cryptographic inventory from your infrastructure,
        scores each asset for quantum vulnerability, and tracks your migration to NIST PQC algorithms over
        time — integrated with your CI/CD pipeline so new cryptographic assets are discovered automatically.
      </ArticleParagraph>

      <div className="rounded-2xl p-8 mt-12 text-center" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.25)' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Get Your Quantum Readiness Score</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>Generate a CBOM of your infrastructure and see your post-quantum migration baseline in minutes.</p>
        <button onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)', boxShadow: '0 0 24px rgba(139,92,246,0.4)' }}>
          Request CBOM Demo →
        </button>
      </div>
    </div>
  );
}

// ── Article: HBOM Hardware Supply Chain ───────────────────────────────────────
function HBOMArticle() {
  return (
    <div className="space-y-8 pt-10">
      <ArticleParagraph>
        Software supply chain security has dominated the conversation since the SolarWinds incident. But the
        physical layer — the chips, firmware, and hardware components that software runs on — is equally
        exposed, and far less scrutinised.
      </ArticleParagraph>

      <ArticleParagraph>
        For India's Public Sector Undertakings (PSUs) — NTPC, ONGC, ISRO, Indian Railways, state-owned banks —
        hardware procurement spans thousands of vendors across multiple countries. The risk isn't hypothetical.
        State-sponsored hardware implants, counterfeit components, and firmware backdoors have been documented
        in military and industrial contexts globally.
      </ArticleParagraph>

      <ArticleCallout>
        A Hardware Bill of Materials (HBOM) is the inventory layer that makes hardware supply chain risk
        visible, auditable, and manageable — before deployment, not after incident.
      </ArticleCallout>

      <ArticleH2>What an HBOM Contains</ArticleH2>

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {[
          {
            color: '#EF4444', title: 'Physical Components',
            items: ['Processor (make, model, stepping)', 'Memory modules (manufacturer, lot)', 'Network interface controllers', 'Storage controllers & SSDs', 'Power supply units']
          },
          {
            color: '#F59E0B', title: 'Firmware & Firmware',
            items: ['BIOS/UEFI version & vendor', 'BMC/IPMI firmware versions', 'NIC firmware & option ROMs', 'SSD firmware versions', 'Secure boot configuration state']
          },
          {
            color: '#8B5CF6', title: 'Trust & Identity',
            items: ['TPM 2.0 module presence & state', 'Measured boot log hashes', 'Platform certificate (IEEE 802.1AR)', 'Supply chain provenance certificates', 'Component authenticity attestations']
          },
        ].map(cat => (
          <div key={cat.title} className="rounded-xl p-5" style={{ background: 'var(--app-card)', border: `1px solid ${cat.color}25` }}>
            <h4 className="text-sm font-bold mb-3" style={{ color: cat.color }}>{cat.title}</h4>
            <ul className="space-y-1.5">
              {cat.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ArticleH2>The NCIIPC Mandate</ArticleH2>

      <ArticleParagraph>
        India's National Critical Information Infrastructure Protection Centre (NCIIPC) classifies operators
        across power, telecom, transport, banking, and defence as Critical Information Infrastructure (CII).
        NCIIPC guidelines require:
      </ArticleParagraph>

      <div className="space-y-3 my-6">
        {[
          'Documentation of all hardware and firmware in critical systems',
          'Verification of hardware provenance before deployment in CII environments',
          'Continuous monitoring of firmware versions against known vulnerability databases',
          'Incident reporting when hardware supply chain anomalies are detected',
          'Air-gapped capabilities for classified and sensitive infrastructure',
        ].map((req, i) => (
          <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: '#0D1117', border: '1px solid rgba(239,68,68,0.12)' }}>
            <div className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold text-[#EF4444] flex-shrink-0"
              style={{ background: 'rgba(239,68,68,0.12)' }}>
              {i + 1}
            </div>
            <span className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{req}</span>
          </div>
        ))}
      </div>

      <ArticleH2>Starting Your HBOM Programme</ArticleH2>

      <ArticleParagraph>
        Most organisations try to build an HBOM from procurement records — and fail. Purchase orders don't
        track firmware versions, lot numbers, or TPM states. A true HBOM requires either agent-based discovery
        (running on each host) or API integration with your hardware management layer (iDRAC, iLO, IPMI).
      </ArticleParagraph>

      <ArticleParagraph>
        IntelliXBOM's HBOM module integrates with your BMC APIs and infrastructure management tools to
        automatically discover and inventory hardware components, correlate firmware versions against
        vulnerability feeds, and generate NCIIPC-formatted compliance reports — without requiring agents
        on air-gapped systems.
      </ArticleParagraph>

      <div className="rounded-2xl p-8 mt-12 text-center" style={{ background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.22)' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Start Your Hardware BOM Programme</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>See how IntelliXBOM discovers and tracks hardware inventory for NCIIPC compliance.</p>
        <button onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)', boxShadow: '0 0 24px rgba(239,68,68,0.35)' }}>
          Request HBOM Demo →
        </button>
      </div>
    </div>
  );
}

// ── Article: AIBOM AI Governance ──────────────────────────────────────────────
function AIBOMArticle() {
  return (
    <div className="space-y-8 pt-10">
      <ArticleParagraph>
        AI adoption in India's regulated sectors is accelerating. RBI-regulated banks are deploying machine
        learning models for fraud detection, credit scoring, and customer service. SEBI-regulated brokerages
        are using algorithmic trading systems. Hospitals are adopting diagnostic AI. And regulators are asking
        a question nobody has a clean answer to: <strong style={{ color: 'var(--app-text-primary)' }}>exactly what is in your AI system?</strong>
      </ArticleParagraph>

      <ArticleParagraph>
        The answer requires an <strong style={{ color: 'var(--app-text-primary)' }}>AI Bill of Materials (AIBOM)</strong> — a structured
        inventory of every AI/ML model, training dataset, inference framework, and third-party AI service in
        your stack. Without it, you can't answer a regulator's questions, you can't assess risk, and you can't
        respond to an incident.
      </ArticleParagraph>

      <ArticleCallout>
        The EU AI Act, MeitY's draft AI Guidelines, and SEBI's operational risk framework all converge on
        a single requirement: you must know what AI systems you operate and what they're built from.
      </ArticleCallout>

      <ArticleH2>What Belongs in an AIBOM</ArticleH2>

      <div className="grid md:grid-cols-2 gap-4 my-6">
        {[
          {
            title: 'Model Components', color: '#F59E0B',
            items: [
              'Model architecture (transformer, CNN, GBM, etc.)',
              'Model version and training date',
              'Training framework (TensorFlow, PyTorch, scikit-learn)',
              'Pre-trained base model (if fine-tuned)',
              'Inference engine and serving framework',
              'Model card / documentation reference',
            ]
          },
          {
            title: 'Data Provenance', color: '#4361EE',
            items: [
              'Training dataset names and versions',
              'Data sources and collection methods',
              'Data cleaning and preprocessing pipeline',
              'Licence / consent status of training data',
              'Bias assessment results and methodology',
              'Validation and holdout set composition',
            ]
          },
        ].map(cat => (
          <div key={cat.title} className="rounded-xl p-6" style={{ background: 'var(--app-card)', border: `1px solid ${cat.color}22` }}>
            <h4 className="text-sm font-bold mb-4" style={{ color: cat.color }}>{cat.title}</h4>
            <ul className="space-y-2">
              {cat.items.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ArticleH2>Regulatory Drivers in India</ArticleH2>

      <div className="space-y-3 my-6">
        {[
          { org: 'MeitY', detail: 'Draft AI Guidelines (2024) require documentation of AI model provenance, training data lineage, and bias assessment for software deployed in government contexts.' },
          { org: 'RBI', detail: 'Guidance on use of AI/ML in financial services requires explainability and auditability of models used in credit, fraud, and customer-facing decisions.' },
          { org: 'SEBI', detail: 'Algorithmic trading regulations require complete documentation of algorithmic trading systems, which increasingly include ML components.' },
          { org: 'CERT-In v2.0', detail: 'Explicitly extends BOM requirements to AI/ML systems — an AIBOM is not optional for regulated AI deployments.' },
        ].map(item => (
          <div key={item.org} className="flex gap-4 p-4 rounded-lg" style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}>
            <div className="text-sm font-bold text-[#F59E0B] whitespace-nowrap w-16 flex-shrink-0">{item.org}</div>
            <div className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <ArticleH2>Third-Party AI Risk</ArticleH2>

      <ArticleParagraph>
        The hardest AIBOM challenge is third-party AI. When a bank uses a vendor's fraud detection API,
        it rarely knows what model is behind it, what data it was trained on, or what biases it may carry.
        Yet regulators hold the bank — not the vendor — accountable for discriminatory or erroneous decisions.
      </ArticleParagraph>

      <ArticleParagraph>
        IntelliXBOM's vendor AIBOM collection workflow automates the process of requesting, receiving, and
        validating AIBOMs from your AI vendors — the same way it handles software SBOMs. Procurement teams
        can enforce AIBOM submission as a contract condition, with automated validation at every model update.
      </ArticleParagraph>

      <div className="rounded-2xl p-8 mt-12 text-center" style={{ background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.22)' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Build Your AI Inventory</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>See how IntelliXBOM tracks AI models, datasets, and third-party AI risk across your organisation.</p>
        <button onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', boxShadow: '0 0 24px rgba(245,158,11,0.35)' }}>
          Request AIBOM Demo →
        </button>
      </div>
    </div>
  );
}

// ── Article: RBI SBOM Advisory ────────────────────────────────────────────────
function RBIArticle() {
  return (
    <div className="space-y-8 pt-10">
      <ArticleParagraph>
        In November 2024, the Reserve Bank of India issued Advisory 11/2024 on software supply chain security
        for regulated financial entities. The advisory applies to all scheduled commercial banks, payment banks,
        NBFCs, payment system operators, and credit information companies under RBI's regulatory jurisdiction.
      </ArticleParagraph>

      <ArticleParagraph>
        The advisory doesn't make SBOM optional. It establishes a clear expectation: regulated entities must
        maintain verified software bills of materials for all critical and third-party software, with
        specific requirements for vendor risk assessment and continuous monitoring.
      </ArticleParagraph>

      <ArticleCallout>
        RBI's message is clear: banks are responsible for the security of software they didn't write.
        "We sourced it from a trusted vendor" is no longer a sufficient answer in an audit.
      </ArticleCallout>

      <ArticleH2>What RBI Advisory 11/2024 Actually Requires</ArticleH2>

      <div className="space-y-3 my-6">
        {[
          {
            req: 'Maintain SBOMs for critical software',
            detail: 'All software classified as critical under your IT risk framework must have an SBOM. This includes core banking systems, payment infrastructure, and customer-facing digital channels.',
            urgency: 'MANDATORY'
          },
          {
            req: 'Collect SBOMs from third-party vendors',
            detail: 'Procurement processes must include SBOM submission as a requirement. Existing vendor contracts should be renegotiated to include SBOM obligations at every major release.',
            urgency: 'MANDATORY'
          },
          {
            req: 'Validate vendor-supplied SBOMs',
            detail: 'Receiving an SBOM is not the same as validating it. Banks must verify field completeness, format compliance, and component accuracy — not just store the file.',
            urgency: 'MANDATORY'
          },
          {
            req: 'Continuous monitoring of critical components',
            detail: 'Once an SBOM is ingested, the bank must monitor its components for newly discovered vulnerabilities. A compliant SBOM today may be a risk vector tomorrow.',
            urgency: 'MANDATORY'
          },
          {
            req: 'Board-level reporting on supply chain risk',
            detail: 'RBI expects supply chain security metrics to be reportable to the Board Risk Committee — not just the CISO. This requires dashboards that translate technical compliance into risk language.',
            urgency: 'REPORTING'
          },
          {
            req: 'Incident response for supply chain events',
            detail: 'Banks must have documented procedures for responding to software supply chain incidents — including Log4Shell-class events where a single component affects thousands of applications.',
            urgency: 'PROCESS'
          },
        ].map((item, i) => (
          <div key={i} className="rounded-xl p-5" style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}>
            <div className="flex items-start gap-3 mb-2">
              <span className="px-2 py-0.5 rounded text-[9px] font-bold flex-shrink-0 mt-0.5"
                style={item.urgency === 'MANDATORY'
                  ? { background: 'rgba(239,68,68,0.15)', color: '#EF4444' }
                  : item.urgency === 'REPORTING'
                  ? { background: 'rgba(67,97,238,0.15)', color: '#4361EE' }
                  : { background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }
                }>
                {item.urgency}
              </span>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--app-text-primary)' }}>{item.req}</h4>
            </div>
            <p className="text-sm leading-[1.7] ml-12" style={{ color: 'var(--app-text-muted)' }}>{item.detail}</p>
          </div>
        ))}
      </div>

      <ArticleH2>Implementation Checklist for Banks</ArticleH2>

      <div className="rounded-xl overflow-hidden my-6" style={{ border: '1px solid var(--app-border)' }}>
        <div className="px-5 py-3" style={{ background: 'var(--app-elevated)', borderBottom: '1px solid var(--app-border)' }}>
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--app-text-muted)' }}>RBI 11/2024 Compliance Checklist</span>
        </div>
        {[
          { task: 'Classify software assets by criticality tier', done: true },
          { task: 'Identify critical software requiring SBOM coverage', done: true },
          { task: 'Update vendor contracts to include SBOM obligations', done: false },
          { task: 'Implement SBOM collection workflow for new procurements', done: false },
          { task: 'Automate CERT-In field validation for ingested SBOMs', done: false },
          { task: 'Set up continuous CVE monitoring on critical components', done: false },
          { task: 'Build Board Risk Committee reporting dashboard', done: false },
          { task: 'Document supply chain incident response procedures', done: false },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.04] last:border-0">
            <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${item.done ? '' : ''}`}
              style={{ background: item.done ? 'rgba(0,212,170,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${item.done ? 'rgba(0,212,170,0.4)' : 'rgba(255,255,255,0.1)'}` }}>
              {item.done && <svg className="w-2.5 h-2.5 text-[#00D4AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className="text-sm" style={{ color: item.done ? 'var(--app-text-dimmer)' : 'var(--app-text-muted)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.task}</span>
          </div>
        ))}
      </div>

      <ArticleParagraph>
        Steps 1–2 are typically complete for most banks — IT asset inventories exist. The gap is always
        steps 3–8: the processes and tooling to make SBOM collection, validation, and monitoring systematic
        rather than one-time manual exercises.
      </ArticleParagraph>

      <ArticleH2>How IntelliXBOM Automates RBI Compliance</ArticleH2>

      <ArticleParagraph>
        IntelliXBOM is purpose-built for exactly this workflow. Vendor onboarding workflows automatically
        request and receive SBOMs at each release. The validation engine checks against CERT-In's 21 fields
        (which is a superset of RBI's requirements). Continuous CVE monitoring fires alerts when new
        vulnerabilities appear in ingested components. And the Board Risk dashboard translates compliance
        scores into the risk language executives understand.
      </ArticleParagraph>

      <div className="rounded-2xl p-8 mt-12 text-center" style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.25)' }}>
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Automate Your RBI SBOM Compliance</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>
          See the vendor SBOM collection and RBI compliance reporting workflow in a live demo.
        </p>
        <button onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
          className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 24px rgba(67,97,238,0.4)' }}>
          Request Banking Demo →
        </button>
      </div>
    </div>
  );
}

function GenericArticle() {
  return (
    <div className="space-y-6 pt-10">
      <ArticleParagraph>
        This article is coming soon. Check back for more detailed coverage on this topic.
      </ArticleParagraph>
      <Link to="/blog" className="inline-flex items-center gap-2 text-[#4361EE] hover:underline text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to all posts
      </Link>
    </div>
  );
}

function DontTrustSBOMArticle() {
  return (
    <div className="prose-dark space-y-8 pt-10">
      <ArticleParagraph>
        Regulators across the world are finally getting serious about the software supply chain.
        India's CERT-In SBOM Technical Guidelines (v2.0, July 2025) go beyond just SBOMs—they
        extend to a broader BOM ecosystem, including CBOM, QBOM, AIBOM, and HBOM. This makes
        the question not just about software components, but about documenting the full composition
        of information systems.
      </ArticleParagraph>

      <ArticleParagraph>
        The question is the same whether it is the US Executive Order 14028, the EU Cyber Resilience Act,
        RBI Advisory 11/2024, or SEBI's July 2025 guidelines: <strong style={{ color: 'var(--app-text-primary)' }}>Is the SBOM you received actually compliant and usable?</strong>
      </ArticleParagraph>

      <ArticleCallout>
        They asked vendors for SBOMs. Vendors generated and shared them. Procurement teams stored them
        somewhere. But at the moment it is delivered and every time your software is updated, your BOM changes too.
      </ArticleCallout>

      <ArticleH2>What we actually tested</ArticleH2>

      <ArticleParagraph>
        We ran SBOMs generated by widely used tools against these 21 fields. The results were sobering.
        Even SBOMs produced by industry-standard tools like the CycloneDX Maven Plugin—complete with hundreds
        of components, accurate dependency graphs, and valid formats—scored around{' '}
        <strong style={{ color: 'var(--app-text-primary)' }}>35% compliance</strong> with CERT-In requirements.
      </ArticleParagraph>

      {/* Compliance Visual */}
      <div
        className="rounded-xl p-8 my-10"
        style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
      >
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest mb-1" style={{ color: 'var(--app-text-dimmer)' }}>CERT-In Compliance Score</p>
          <p className="text-sm" style={{ color: 'var(--app-text-muted)' }}>Typical vendor-supplied SBOM (CycloneDX Maven)</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-2">
            {[
              { name: 'Supplier Name', pass: true },
              { name: 'Component Name', pass: true },
              { name: 'Version String', pass: true },
              { name: 'Unique Identifier', pass: true },
              { name: 'Dependencies', pass: false },
              { name: 'License Expression', pass: false },
              { name: 'Author / Creator', pass: true },
              { name: 'Timestamp', pass: false },
              { name: 'Hash / Checksum', pass: false },
              { name: 'Download Location', pass: false },
              { name: 'External References', pass: false },
              { name: 'Cryptography Info', pass: false },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-1 px-2 rounded hover:bg-white/[0.02]">
                <span className="font-mono text-xs" style={{ color: 'var(--app-text-muted)' }}>{f.name}</span>
                <span
                  className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded"
                  style={f.pass
                    ? { background: 'rgba(0,212,170,0.15)', color: '#00D4AA' }
                    : { background: 'rgba(239,68,68,0.15)', color: '#EF4444' }
                  }
                >
                  {f.pass ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                  {f.pass ? 'PASS' : 'FAIL'}
                </span>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <DonutChart passPercent={33.3} />
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <div className="text-xl font-bold text-white">10</div>
                <div className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>Components</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#EF4444]">7</div>
                <div className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>Failing</div>
              </div>
              <div>
                <div className="text-xl font-bold text-[#00D4AA]">3</div>
                <div className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>Passing</div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs mt-6 italic" style={{ color: 'var(--app-text-dimmer)' }}>
          * Typical scores against CERT-In's 21 fields. Coverage varies significantly by category (average &lt;80%).
        </p>
      </div>

      <ArticleParagraph>
        Not because the tools are inadequate. But because the compliance bar is significantly higher than
        what automated generation alone can achieve.
      </ArticleParagraph>

      <ArticleH2>The calling nobody talks about</ArticleH2>

      <ArticleParagraph>
        This is the most important thing we discovered while building this validator. And it's something
        neither vendors nor regulators clearly articulate.
      </ArticleParagraph>

      <ArticleParagraph>
        There are specific fields that no automated tool fills in today:
      </ArticleParagraph>

      <ul className="space-y-3 pl-0">
        {[
          'Criticality isn\'t assessed',
          'End-of-life dates missing for 12 validated components',
          'PURL format is incomplete, preventing CVE correlation',
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 flex-shrink-0" />
            <span className="text-base" style={{ color: 'var(--app-text-muted)' }}>{item}</span>
          </li>
        ))}
      </ul>

      <ArticleParagraph>
        None of this is visible in a text editor or via a formal validator.{' '}
        <strong style={{ color: 'var(--app-text-primary)' }}>You need a compliance auditor.</strong>
      </ArticleParagraph>

      <ArticleCallout>
        Upload the vendor's SBOM, read the compliance report, and you instantly see actionable questions
        to ask before signing a contract.
      </ArticleCallout>

      <ArticleH2>The broader regulatory picture</ArticleH2>

      <ArticleParagraph>
        India isn't alone in demanding SBOM quality—it's just the most prescriptive so far:
      </ArticleParagraph>

      <div className="space-y-3">
        {[
          { reg: 'EO 14028', detail: 'mandates SBOMs for software sold to US federal agencies' },
          { reg: 'EU Cyber Resilience Act', detail: 'extends SBOM to product conformity assessments' },
          { reg: 'FDA cybersecurity guidance', detail: 'makes SBOMs a pre-market submission requirement for medical devices' },
          { reg: 'RBI Advisory 11/2024', detail: 'extends SBOM requirements into the banking sector' },
        ].map((item, i) => (
          <div key={i} className="flex gap-3 p-4 rounded-lg" style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}>
            <div className="font-semibold text-[#4361EE] text-sm whitespace-nowrap">{item.reg}</div>
            <div className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{item.detail}</div>
          </div>
        ))}
      </div>

      <ArticleParagraph>
        All these frameworks share a belief: an SBOM is only as valuable as the information it contains.
        A list of names without versions, hashes, or vulnerabilities is not a true software bill of
        materials—it's just a list.
      </ArticleParagraph>

      <ArticleParagraph>
        CERT-In v2.0 helps encode the difference. Organizations ignoring this will face increasingly heavy
        scrutiny. The question isn't whether SBOM auditing becomes standard: it's whether you adopt it
        before a supply-chain incident forces the issue.
      </ArticleParagraph>

      {/* CTA */}
      <div
        className="rounded-2xl p-8 mt-12 text-center"
        style={{
          background: 'rgba(67,97,238,0.08)',
          border: '1px solid rgba(67,97,238,0.25)'
        }}
      >
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Try the SBOM Compliance Validator</h3>
        <p className="mb-6 text-sm" style={{ color: 'var(--app-text-muted)' }}>
          Upload your vendor's SBOM and get a full CERT-In compliance report in under 60 seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.dispatchEvent(new Event('openDemoModal'))}
            className="px-6 py-3 text-sm font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
              boxShadow: '0 0 24px rgba(67,97,238,0.4)'
            }}
          >
            Validate Your SBOM →
          </button>
          <Link to="/blog" className="px-6 py-3 text-sm font-medium text-white rounded-lg border border-white/20 hover:border-white/40 transition-all inline-flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArticleH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold mt-12 mb-4" style={{ color: 'var(--app-text-primary)' }}>{children}</h2>;
}

function ArticleParagraph({ children }: { children: React.ReactNode }) {
  return <p className="text-base leading-[1.8]" style={{ color: 'var(--app-text-muted)' }}>{children}</p>;
}

function ArticleCallout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote
      className="pl-5 py-1 text-lg italic leading-[1.7]"
      style={{ borderLeft: '3px solid #4361EE', color: 'var(--app-text-secondary)' }}
    >
      {children}
    </blockquote>
  );
}

function DonutChart({ passPercent }: { passPercent: number }) {
  const radius = 55;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const passOffset = circumference * (1 - passPercent / 100);
  const failPercent = 100 - passPercent;

  return (
    <div className="relative">
      <svg width="130" height="130" className="-rotate-90">
        <circle cx="65" cy="65" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={strokeWidth} />
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#EF4444" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={0} strokeLinecap="round" />
        <circle cx="65" cy="65" r={radius} fill="none" stroke="#00D4AA" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={passOffset} strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-lg font-bold text-white">~{failPercent.toFixed(1)}%</div>
        <div className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>Non-Compliant</div>
      </div>
    </div>
  );
}
