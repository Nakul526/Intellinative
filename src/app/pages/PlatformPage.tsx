import { Link } from 'react-router';
import { Shield, Settings, Lock } from 'lucide-react';
import { openDemoModal } from '../components/DemoModal';
import platformImage from '../../assets/platform.png';


const integrations = [
  { name: 'GitHub', category: 'SCM' }, { name: 'GitLab', category: 'SCM' },
  { name: 'Jenkins', category: 'CI/CD' }, { name: 'ArgoCD', category: 'CI/CD' },
  { name: 'Jira', category: 'Issue Tracking' }, { name: 'Slack', category: 'Notifications' },
  { name: 'Splunk', category: 'SIEM' }, { name: 'ServiceNow', category: 'ITSM' },
  { name: 'Nexus', category: 'Artifact Repo' }, { name: 'JFrog', category: 'Artifact Repo' },
  { name: 'AWS ECR', category: 'Container Registry' }, { name: 'Azure CR', category: 'Container Registry' },
];

export default function PlatformPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Hero */}
      <section
        className="pt-24 pb-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(67,97,238,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 80% 30%, rgba(0,212,170,0.08) 0%, transparent 60%), var(--app-bg)` }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>THE PLATFORM</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: 'var(--app-text-primary)' }}>
            Enterprise-Grade.<br />
            <span style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Built for India.
            </span>
          </h1>
          <p className="text-xl leading-[1.75] max-w-[600px] mx-auto mb-10" style={{ color: 'var(--app-text-muted)' }}>
            A unified BOM governance platform designed for regulated infrastructuresecurity,
            compliance, and digital sovereignty at the core.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.45)' }}
            >
              Request Demo →
            </button>
            <Link to="/bom-types" className="px-7 py-3.5 text-base font-medium rounded-lg border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}>
              Explore BOM Types
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard Preview always dark */}
      <section className="px-6 pb-14">
        <div className="max-w-[1100px] mx-auto">
          <div className="relative">
            <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 70% 30% at 50% 100%, rgba(67,97,238,0.1), transparent)' }} />
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 48px 120px rgba(0,0,0,0.6), 0 0 80px rgba(67,97,238,0.08)' }}>
              <div className="bg-[#0D1117] p-8">
                <div className="grid md:grid-cols-4 gap-4 mb-6">
                  <StatCard label="Compliance Score" value="87%" trend="+12% this month" trendColor="#00D4AA" />
                  <StatCard label="Active Validations" value="1,247" trend="32 need attention" trendColor="#F59E0B" />
                  <StatCard label="Vendors Tracked" value="48" trend="4 new this week" trendColor="#4361EE" />
                  <StatCard label="Risk Level" value="Medium" trend="7 critical items" trendColor="#EF4444" />
                </div>
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'].map((type, i) => (
                    <button key={type} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                      i === 0 ? 'bg-[#4361EE]/20 text-[#4361EE] border border-[#4361EE]/30'
                      : 'bg-white/[0.03] text-[#94A3B8] border border-white/[0.06]'}`}>
                      {type}
                    </button>
                  ))}
                </div>
                <div className="bg-[#141A26] rounded-lg border border-white/[0.06] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left px-4 py-3 text-xs text-[#94A3B8] font-medium uppercase tracking-wide">Component</th>
                        <th className="text-left px-4 py-3 text-xs text-[#94A3B8] font-medium uppercase tracking-wide">Risk</th>
                        <th className="text-left px-4 py-3 text-xs text-[#94A3B8] font-medium uppercase tracking-wide">Status</th>
                        <th className="text-right px-4 py-3 text-xs text-[#94A3B8] font-medium uppercase tracking-wide">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { comp: 'spring-core', ver: '5.3.18', risk: 'HIGH', riskColor: '#EF4444', status: 'ACTION REQUIRED', score: 12 },
                        { comp: 'openssl', ver: '1.1.1', risk: 'MEDIUM', riskColor: '#F59E0B', status: 'MONITORING', score: 45 },
                        { comp: 'react', ver: '18.2.0', risk: 'LOW', riskColor: '#00D4AA', status: 'COMPLIANT', score: 92 },
                        { comp: 'tensorflow', ver: '2.13.0', risk: 'MEDIUM', riskColor: '#F59E0B', status: 'UNDER REVIEW', score: 67 },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                          <td className="px-4 py-3"><div className="font-medium text-white">{row.comp}</div><div className="text-xs text-[#4B5563]">{row.ver}</div></td>
                          <td className="px-4 py-3"><span className="inline-block px-2 py-0.5 rounded text-xs font-medium" style={{ background: `${row.riskColor}20`, color: row.riskColor }}>{row.risk}</span></td>
                          <td className="px-4 py-3 text-[#94A3B8]">{row.status}</td>
                          <td className="px-4 py-3 text-right font-medium text-white">{row.score}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform screenshot in monitor */}
      <section className="py-16 px-6" style={{ background: 'var(--app-bg-alt)', borderTop: '1px solid var(--app-border-subtle)' }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Badge */}
          <div className="mb-10 flex justify-center">
            <span
              className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{
                background: 'rgba(0,177,220,0.1)',
                color: 'var(--c5)',
                border: '1px solid rgba(0,177,220,0.25)',
                fontFamily: 'var(--f-m)',
              }}
            >
              Platform
            </span>
          </div>

          {/* Monitor / browser frame */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: '#0E1A2E',
              border: '1px solid #1A2030',
              boxShadow: '0 40px 120px rgba(0,0,0,0.45), 0 0 60px rgba(0,177,220,0.06)',
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{ background: '#060B14', borderBottom: '1px solid #1A2030' }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: '#E53935' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
              </div>
              <div
                className="flex-1 mx-4 px-3 flex items-center"
                style={{ background: '#0E1A2E', border: '1px solid #1A2030', borderRadius: 6, height: 26 }}
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
        </div>
      </section>

      {/* Security + Sovereignty */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Lock, color: '#4361EE', borderColor: 'rgba(67,97,238,0.2)', title: 'Data Sovereignty', text: 'Your BOM data never leaves your infrastructure. IntelliXBOM is deployable fully on-premise with no call-home requirements. Built for India\'s data sovereignty regulations.' },
              { icon: Shield, color: '#00D4AA', borderColor: 'rgba(0,212,170,0.2)', title: 'Security-First Architecture', text: 'Zero-trust architecture, end-to-end encryption, SOC 2 Type II certified. Role-based access control with full audit logging for every validation and export event.' },
              { icon: Settings, color: '#8B5CF6', borderColor: 'rgba(139,92,246,0.2)', title: 'Enterprise Integrations', text: 'Native integrations with your existing toolchain. LDAP/AD for identity, SIEM for alerting, and a full REST API for custom integrations with your procurement or risk systems.' },
            ].map((card, i) => (
              <div key={i} className="rounded-2xl p-8" style={{ background: 'var(--app-card)', border: `1px solid ${card.borderColor}` }}>
                <card.icon className="w-8 h-8 mb-5" style={{ color: card.color }} />
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>{card.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--app-text-muted)' }}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)', borderTop: '1px solid var(--app-border-subtle)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>INTEGRATIONS</p>
            <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>Works with your stack</h2>
            <p className="text-lg max-w-[460px] mx-auto" style={{ color: 'var(--app-text-muted)' }}>
              Plug IntelliXBOM into your existing pipeline without rearchitecting anything.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {integrations.map((item, i) => (
              <div
                key={i}
                className="rounded-xl p-4 text-center transition-all"
                style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border-dim)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)')}
              >
                <div className="text-sm font-semibold mb-1" style={{ color: 'var(--app-text-primary)' }}>{item.name}</div>
                <div className="text-[10px]" style={{ color: 'var(--app-text-dimmer)' }}>{item.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA  dark theme */}
      <section className="py-20 px-6" style={{ background: '#060B14', borderTop: '1px solid #1A2030' }}>
        <div className="max-w-[900px] mx-auto">
          {/* Headline block */}
          <div className="text-center mb-14">
            <p
              className="text-[11px] uppercase tracking-[0.12em] font-semibold mb-4"
              style={{ color: '#3DC7F6', fontFamily: 'var(--f-m)' }}
            >
              Platform
            </p>
            <h2
              className="text-4xl md:text-[52px] font-bold mb-5 leading-[1.05]"
              style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}
            >
              See everything.<br />Miss nothing.
            </h2>
            <p className="text-lg max-w-[520px] mx-auto mb-10 leading-[1.75]" style={{ color: '#C5CCD8' }}>
              IntelliXBOM gives your security, compliance, and engineering teams a single unified view across every BOM type  live, validated, and regulator-ready.
            </p>
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold rounded-lg transition-all hover:-translate-y-0.5"
              style={{
                background: '#3DC7F6',
                color: '#060B14',
                boxShadow: '0 0 28px rgba(61,199,246,0.35)',
              }}
            >
              Request Demo →
            </button>
          </div>

          {/* Dark stat cards row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '5', label: 'BOM Types', sub: 'SBOM · CBOM · QBOM · AIBOM · HBOM' },
              { value: '21', label: 'CERT-In Fields', sub: 'Auto-validated on every push' },
              { value: '10+', label: 'Regulators', sub: 'CERT-In · RBI · SEBI · MeitY' },
              { value: '100%', label: 'On-Premise', sub: 'Air-gap & data sovereignty ready' },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-5"
                style={{ background: '#0E1A2E', border: '1px solid #1A2030' }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: '#3DC7F6', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: '#FFFFFF' }}>{s.label}</div>
                <div className="text-[11px] leading-[1.5]" style={{ color: '#c5ccd8', fontFamily: 'var(--f-m)' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, trend, trendColor }: { label: string; value: string; trend: string; trendColor: string }) {
  return (
    <div className="bg-[#141A26] rounded-lg p-5 border border-white/[0.06]">
      <div className="text-xs text-[#94A3B8] mb-2 uppercase tracking-wide">{label}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs" style={{ color: trendColor }}>{trend}</div>
    </div>
  );
}
