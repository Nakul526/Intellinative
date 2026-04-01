import React, { useState, useMemo } from 'react'
import { jsPDF } from 'jspdf'

// ── Data ──────────────────────────────────────────────────────────────────────
const SEVERITY_COLORS = {
  critical: '#f85149', high: '#f0883e', medium: '#d29922', low: '#58a6ff', info: '#8b949e'
}

const CVES = [
  { id: 'CVE-2024-2341', component: 'log4j', version: '2.14.0', severity: 'critical', cvss: 10.0, published: '2024-01-15', fixAvailable: true, machines: 45, desc: 'Remote code execution via JNDI lookup injection' },
  { id: 'CVE-2024-1234', component: 'lodash', version: '4.17.11', severity: 'critical', cvss: 9.8, published: '2024-03-15', fixAvailable: true, machines: 23, desc: 'Prototype pollution via merge/set operations' },
  { id: 'CVE-2024-4567', component: 'spring-core', version: '5.3.0', severity: 'critical', cvss: 9.1, published: '2024-01-28', fixAvailable: false, machines: 7, desc: 'Spring4Shell RCE via ClassLoader manipulation' },
  { id: 'CVE-2024-8765', component: 'openssl', version: '1.1.1', severity: 'high', cvss: 8.1, published: '2024-02-05', fixAvailable: true, machines: 19, desc: 'Buffer overflow in TLS handshake processing' },
  { id: 'CVE-2024-5678', component: 'express', version: '4.18.0', severity: 'high', cvss: 7.5, published: '2024-03-10', fixAvailable: true, machines: 12, desc: 'XSS in template engine via malformed headers' },
  { id: 'CVE-2024-9012', component: 'webpack', version: '5.91.0', severity: 'high', cvss: 7.2, published: '2024-03-08', fixAvailable: false, machines: 8, desc: 'Path traversal in file loader module' },
  { id: 'CVE-2024-3456', component: 'moment', version: '2.29.1', severity: 'medium', cvss: 5.3, published: '2024-02-28', fixAvailable: true, machines: 34, desc: 'ReDoS via crafted timezone string input' },
  { id: 'CVE-2024-6543', component: 'axios', version: '0.21.1', severity: 'medium', cvss: 4.8, published: '2024-02-12', fixAvailable: true, machines: 15, desc: 'SSRF via redirects in HTTP client' },
  { id: 'CVE-2024-7890', component: 'axios', version: '0.9.11', severity: 'low', cvss: 3.7, published: '2024-02-20', fixAvailable: true, machines: 5, desc: 'Information disclosure in error stack traces' },
  { id: 'CVE-2024-1122', component: 'minimist', version: '1.2.5', severity: 'low', cvss: 3.1, published: '2024-01-10', fixAvailable: true, machines: 3, desc: 'Prototype pollution via command-line args' },
]

const SEVERITY_DIST = { critical: 28, high: 88, medium: 116, low: 214, info: 342 }
const TOTAL_VULNS = Object.values(SEVERITY_DIST).reduce((a, b) => a + b, 0)

const TOP_COMPONENTS = [
  { rank: 1, name: 'lodash', vulns: 23, severity: 'critical' },
  { rank: 2, name: 'express', vulns: 18, severity: 'high' },
  { rank: 3, name: 'webpack', vulns: 15, severity: 'high' },
  { rank: 4, name: 'moment', vulns: 12, severity: 'medium' },
  { rank: 5, name: 'react-scripts', vulns: 9, severity: 'medium' },
  { rank: 6, name: 'axios', vulns: 8, severity: 'medium' },
  { rank: 7, name: 'minimist', vulns: 7, severity: 'low' },
  { rank: 8, name: 'node-fetch', vulns: 6, severity: 'low' },
  { rank: 9, name: 'log4j', vulns: 5, severity: 'critical' },
  { rank: 10, name: 'openssl', vulns: 4, severity: 'high' },
]

const TREND_POINTS = [
  { label: 'Jan', v: 42 }, { label: 'Feb', v: 38 }, { label: 'Mar', v: 45 },
  { label: 'Apr', v: 35 }, { label: 'May', v: 30 }, { label: 'Jun', v: 28 },
  { label: 'Jul', v: 33 }, { label: 'Aug', v: 25 }, { label: 'Sep', v: 20 },
  { label: 'Oct', v: 18 }, { label: 'Nov', v: 15 }, { label: 'Mar', v: 12 },
]

const REMEDIATION = [
  { name: 'Update lodash', effort: 20, impact: 85, cves: 22 },
  { name: 'Patch express', effort: 35, impact: 85, cves: 18 },
  { name: 'Replace moment', effort: 65, impact: 75, cves: 12 },
  { name: 'Update webpack', effort: 50, impact: 70, cves: 15 },
]

const MACHINES = ['All Machines', 'WEB-SERVER-01', 'API-GATEWAY-03', 'BUILD-SERVER-02', 'DB-SERVER-01']
const APPS = ['All Applications', 'nginx-proxy', 'api-service', 'data-pipeline', 'frontend']
const BOM_TYPES = ['All Types', 'SBOM', 'CBOM', 'AI BOM', 'HBOM']
const LIBRARIES = ['All Libraries', 'lodash', 'express', 'webpack', 'moment', 'axios']
const SEVERITIES = ['All Severities', 'Critical', 'High', 'Medium', 'Low', 'Info']

// ── Sub-components ────────────────────────────────────────────────────────────

function FilterSelect({ label, options, value, onChange, icon, color = '#58a6ff' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1, minWidth: 120 }}>
      <label style={{ fontSize: 9, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 4 }}>
        {icon && <span>{icon}</span>}
        {label}
      </label>
      <select
        value={value} onChange={e => onChange(e.target.value)}
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 7, padding: '6px 10px', color: 'var(--text-primary)', fontSize: 11, outline: 'none', cursor: 'pointer', appearance: 'none', backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%238b949e' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', paddingRight: 24 }}
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function SeverityBar({ label, count, color, max }) {
  const pct = (count / max) * 100
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 50px', alignItems: 'center', gap: 12 }}>
      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'right', textTransform: 'capitalize' }}>{label}</span>
      <div style={{ height: 22, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)', display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
          {pct > 15 && <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>{count}</span>}
        </div>
        {pct <= 15 && <span style={{ position: 'absolute', left: `${pct}%`, top: '50%', transform: 'translateY(-50%)', paddingLeft: 8, fontSize: 10, fontWeight: 700, color: 'var(--text-secondary)' }}>{count}</span>}
      </div>
      <div style={{ height: 22, display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{((count / TOTAL_VULNS) * 100).toFixed(1)}%</span>
      </div>
    </div>
  )
}

function TrendChart({ data }) {
  const W = 420, H = 120, PAD = { t: 15, r: 20, b: 30, l: 40 }
  const iW = W - PAD.l - PAD.r, iH = H - PAD.t - PAD.b
  const max = Math.max(...data.map(d => d.v)) * 1.15
  const pts = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * iW,
    y: PAD.t + (1 - d.v / max) * iH,
    v: d.v, label: d.label
  }))
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${path} L ${pts[pts.length-1].x} ${H - PAD.b} L ${pts[0].x} ${H - PAD.b} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="vuln-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#58a6ff" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#58a6ff" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const y = PAD.t + f * iH
        return <line key={i} x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      })}
      <path d={area} fill="url(#vuln-grad)"/>
      <path d={path} fill="none" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.filter((_, i) => i % 2 === 0).map((p, i) => (
        <text key={i} x={p.x} y={H - PAD.b + 12} textAnchor="middle" fontSize="8" fill="var(--text-muted)" fontFamily="JetBrains Mono">{p.label}</text>
      ))}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#58a6ff" stroke="var(--bg-card)" strokeWidth="1.5"/>
      ))}
      <text x={PAD.l - 6} y={PAD.t + 4} textAnchor="end" fontSize="8" fill="var(--text-muted)">{Math.round(max)}</text>
      <text x={PAD.l - 6} y={H - PAD.b} textAnchor="end" fontSize="8" fill="var(--text-muted)">0</text>
    </svg>
  )
}

function ScatterPlot({ data }) {
  const W = 500, H = 220, PAD = { t: 20, r: 20, b: 50, l: 60 }
  const iW = W - PAD.l - PAD.r, iH = H - PAD.t - PAD.b
  const maxEffort = 90, maxImpact = 100

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="scatter-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(63,185,80,0.04)"/>
          <stop offset="100%" stopColor="rgba(248,81,73,0.04)"/>
        </linearGradient>
      </defs>
      <rect x={PAD.l} y={PAD.t} width={iW} height={iH} fill="url(#scatter-bg)" rx="4"/>
      {/* Grid */}
      {[0, 25, 50, 75, 100].map((v, i) => {
        const y = PAD.t + (1 - v / maxImpact) * iH
        return (
          <g key={i}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 5"/>
            <text x={PAD.l - 6} y={y + 4} textAnchor="end" fontSize="8" fill="var(--text-muted)">{v}</text>
          </g>
        )
      })}
      {[0, 20, 40, 60, 80].map((v, i) => {
        const x = PAD.l + (v / maxEffort) * iW
        return (
          <g key={i}>
            <line x1={x} y1={PAD.t} x2={x} y2={H - PAD.b} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3 5"/>
            <text x={x} y={H - PAD.b + 12} textAnchor="middle" fontSize="8" fill="var(--text-muted)">{v}h</text>
          </g>
        )
      })}
      {/* Quadrant labels */}
      <text x={PAD.l + iW * 0.15} y={PAD.t + 12} fontSize="7" fill="rgba(63,185,80,0.5)" fontWeight="600">HIGH PRIORITY</text>
      <text x={PAD.l + iW * 0.65} y={PAD.t + 12} fontSize="7" fill="rgba(210,153,34,0.5)" fontWeight="600">PLAN CAREFULLY</text>
      {/* Axis labels */}
      <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontWeight="600">Effort (hours)</text>
      <text x={14} y={H / 2} textAnchor="middle" fontSize="9" fill="var(--text-muted)" fontWeight="600" transform={`rotate(-90, 14, ${H / 2})`}>Impact Score</text>
      {/* Data points */}
      {data.map((d, i) => {
        const cx = PAD.l + (d.effort / maxEffort) * iW
        const cy = PAD.t + (1 - d.impact / maxImpact) * iH
        const r = Math.sqrt(d.cves) * 3 + 8
        const hue = d.effort < 40 ? '#58a6ff' : '#a855f7'
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={`${hue}30`} stroke={hue} strokeWidth="1.5" style={{ filter: `drop-shadow(0 0 6px ${hue}60)` }}/>
            <text x={cx} y={cy - r - 4} textAnchor="middle" fontSize="8" fill="var(--text-secondary)" fontWeight="600">{d.name.split(' ').slice(0,2).join(' ')}</text>
            <text x={cx} y={cy + 4} textAnchor="middle" fontSize="8" fill={hue} fontWeight="700">{d.cves} CVEs</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Export PDF ─────────────────────────────────────────────────────────────────
function exportVulnPDF(cves, org) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, colW = W - 30
  let margin = 15

  // Header band
  doc.setFillColor(8, 12, 20)
  doc.rect(0, 0, W, 38, 'F')
  doc.setFillColor(88, 166, 255)
  doc.rect(0, 0, 4, 38, 'F')
  doc.setTextColor(88, 166, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Vulnerability Audit Report', margin, 15)
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text(`Organization: ${org}  |  Generated: ${new Date().toLocaleString()}  |  Total CVEs: ${cves.length}`, margin, 25)
  doc.text('IntelliBOM Security Platform', margin, 32)

  let y = 50

  // Severity summary
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('SEVERITY DISTRIBUTION', margin, y)
  y += 6

  const severityCounts = {}
  cves.forEach(c => { severityCounts[c.severity] = (severityCounts[c.severity] || 0) + 1 })
  const sevColors = { critical: [248, 81, 73], high: [240, 136, 62], medium: [210, 153, 34], low: [88, 166, 255] }

  Object.entries(sevColors).forEach(([sev, rgb]) => {
    const count = severityCounts[sev] || 0
    doc.setFillColor(...rgb)
    doc.roundedRect(margin, y, 8, 5, 1, 1, 'F')
    doc.setTextColor(...rgb)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text(`${sev.toUpperCase()}: ${count}`, margin + 10, y + 4)
    margin + 50 < W - margin && (margin += 42)
  })
  y += 12
  margin = 15 // reset

  // CVE table
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('CVE INVENTORY', margin, y)
  y += 6

  // Table header
  doc.setFillColor(17, 24, 39)
  doc.rect(margin, y, colW, 7, 'F')
  doc.setTextColor(88, 166, 255)
  doc.setFontSize(7.5)
  const cols = [
    { label: 'CVE ID', x: margin + 2, w: 38 },
    { label: 'Component', x: margin + 40, w: 32 },
    { label: 'Severity', x: margin + 72, w: 22 },
    { label: 'CVSS', x: margin + 94, w: 14 },
    { label: 'Fix', x: margin + 108, w: 14 },
    { label: 'Machines', x: margin + 122, w: 18 },
    { label: 'Published', x: margin + 140, w: 40 },
  ]
  cols.forEach(c => doc.text(c.label, c.x, y + 5))
  y += 7

  // Table rows
  cves.forEach((cve, i) => {
    if (y > 270) { doc.addPage(); y = 20 }
    const rowBg = i % 2 === 0 ? [15, 21, 32] : [13, 18, 32]
    doc.setFillColor(...rowBg)
    doc.rect(margin, y, colW, 7, 'F')

    const sevRgb = sevColors[cve.severity] || [139, 148, 158]
    doc.setTextColor(...sevRgb)
    doc.setFontSize(6.5)
    doc.setFont('helvetica', 'bold')
    doc.text(cve.id, cols[0].x, y + 5)

    doc.setTextColor(230, 237, 243)
    doc.setFont('helvetica', 'normal')
    doc.text(`${cve.component} v${cve.version}`, cols[1].x, y + 5)
    doc.setTextColor(...sevRgb)
    doc.text(cve.severity.toUpperCase(), cols[2].x, y + 5)
    doc.setTextColor(230, 237, 243)
    doc.text(String(cve.cvss), cols[3].x, y + 5)
    doc.setTextColor(cve.fixAvailable ? 63 : 248, cve.fixAvailable ? 185 : 81, cve.fixAvailable ? 80 : 73)
    doc.text(cve.fixAvailable ? 'Yes' : 'No', cols[4].x, y + 5)
    doc.setTextColor(230, 237, 243)
    doc.text(String(cve.machines), cols[5].x, y + 5)
    doc.text(cve.published, cols[6].x, y + 5)
    y += 7
  })

  // Footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFillColor(13, 18, 32)
    doc.rect(0, 284, W, 13, 'F')
    doc.setTextColor(77, 90, 106)
    doc.setFontSize(7)
    doc.text('IntelliBOM — Confidential Security Report', margin, 291)
    doc.text(`Page ${i} of ${pageCount}`, W - margin, 291, { align: 'right' })
  }

  doc.save(`vulnerability-audit-${new Date().toISOString().slice(0,10)}.pdf`)
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Vulnerabilities({ osFilter, activeOrg }) {
  const [search, setSearch] = useState('')
  const [machine, setMachine] = useState('All Machines')
  const [app, setApp] = useState('All Applications')
  const [bomType, setBomType] = useState('All Types')
  const [library, setLibrary] = useState('All Libraries')
  const [severity, setSeverity] = useState('All Severities')
  const [expanded, setExpanded] = useState(null)
  const [sortCol, setSortCol] = useState('cvss')
  const [sortDir, setSortDir] = useState('desc')

  const orgName = { acme: 'Acme Corp', globex: 'Globex Inc', initech: 'Initech LLC', umbrella: 'Umbrella Corp' }[activeOrg] || 'Acme Corp'

  const filtered = useMemo(() => {
    let rows = [...CVES]
    if (search) rows = rows.filter(c => c.id.toLowerCase().includes(search.toLowerCase()) || c.component.toLowerCase().includes(search.toLowerCase()))
    if (severity !== 'All Severities') rows = rows.filter(c => c.severity === severity.toLowerCase())
    if (library !== 'All Libraries') rows = rows.filter(c => c.component === library.toLowerCase())
    rows.sort((a, b) => {
      const av = a[sortCol], bv = b[sortCol]
      if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av)
      return sortDir === 'asc' ? av - bv : bv - av
    })
    return rows
  }, [search, severity, library, sortCol, sortDir])

  const handleSort = col => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortCol(col); setSortDir('desc') }
  }

  const maxSev = Math.max(...Object.values(SEVERITY_DIST))
  const critCount = filtered.filter(c => c.severity === 'critical').length

  return (
    <div className="main-content">

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #f85149, #f0883e)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(248,81,73,0.35)', flexShrink: 0 }}>
            <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Vulnerability Audit</h1>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              <span style={{ color: '#f85149', fontWeight: 700 }}>{critCount} critical</span> · {filtered.length} of {CVES.length} vulnerabilities
              {osFilter && <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}> · {osFilter}</span>}
            </div>
          </div>
        </div>
        <button
          onClick={() => exportVulnPDF(filtered, orgName)}
          style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: 'linear-gradient(135deg, #58a6ff, #a855f7)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer', boxShadow: '0 0 16px rgba(88,166,255,0.3)', transition: 'all 0.2s' }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Export Report
        </button>
      </div>

      {/* ── Advanced Filters ── */}
      <div style={{ background: 'linear-gradient(135deg, rgba(88,166,255,0.08), rgba(168,85,247,0.06))', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 12, padding: '14px 18px', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <svg width="13" height="13" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff' }}>Advanced Filters</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Filter vulnerabilities by hierarchy and attributes</span>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <FilterSelect label="Machine" options={MACHINES} value={machine} onChange={setMachine} color="#58a6ff"
            icon={<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/></svg>}/>
          <FilterSelect label="Application" options={APPS} value={app} onChange={setApp} color="#a855f7"
            icon={<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}/>
          <FilterSelect label="BOM Type" options={BOM_TYPES} value={bomType} onChange={setBomType} color="#3fb950"
            icon={<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16"/><polyline points="14 2 14 8 20 8"/></svg>}/>
          <FilterSelect label="Library" options={LIBRARIES} value={library} onChange={setLibrary} color="#f0883e"
            icon={<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4-7 4A2 2 0 0 0 3 8v8"/></svg>}/>
          <FilterSelect label="Severity" options={SEVERITIES} value={severity} onChange={setSeverity} color="#f85149"
            icon={<svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}/>
        </div>
      </div>

      <div className="grid-2 section" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* ── Severity Distribution ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 3, height: 14, background: 'linear-gradient(180deg, #f85149, #f0883e)', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Severity Distribution</span>
            <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)' }}>{TOTAL_VULNS} total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(SEVERITY_DIST).map(([sev, count]) => (
              <SeverityBar key={sev} label={sev} count={count} color={SEVERITY_COLORS[sev]} max={maxSev}/>
            ))}
          </div>
        </div>

        {/* ── Vulnerability Trends ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 14, background: '#58a6ff', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Vulnerability Trends</span>
            <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 10 }}>
              <span style={{ color: '#3fb950', fontWeight: 700 }}>▼ -12%</span>
              <span style={{ color: 'var(--text-muted)' }}>this month</span>
            </span>
          </div>
          <TrendChart data={TREND_POINTS}/>
        </div>
      </div>

      {/* ── CVE Inventory ── */}
      <div className="card section" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, background: 'linear-gradient(180deg, #f85149, #58a6ff)', borderRadius: 2 }}/>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>CVE Inventory</span>
          <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 4 }}>{filtered.length} entries</span>
          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <svg width="12" height="12" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search CVEs..." className="search-bar"
              style={{ paddingLeft: 26, width: 200, fontSize: 11 }}/>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: 30 }}></th>
                {[['id','CVE ID'],['component','Component'],['severity','Severity'],['cvss','CVSS Score'],['published','Published'],['fixAvailable','Fix Available'],['machines','Affected Machines']].map(([col, label]) => (
                  <th key={col} onClick={() => handleSort(col)} style={{ cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      {label}
                      <span style={{ opacity: sortCol === col ? 1 : 0.3, fontSize: 9 }}>{sortCol === col ? (sortDir === 'asc' ? '▲' : '▼') : '▲'}</span>
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(cve => (
                <React.Fragment key={cve.id}>
                  <tr onClick={() => setExpanded(expanded === cve.id ? null : cve.id)} style={{ cursor: 'pointer' }}>
                    <td>
                      <span style={{ fontSize: 10, color: 'var(--text-muted)', display: 'inline-block', transition: 'transform 0.2s', transform: expanded === cve.id ? 'rotate(90deg)' : 'none' }}>▶</span>
                    </td>
                    <td style={{ color: '#58a6ff', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>{cve.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 22, height: 22, background: 'rgba(88,166,255,0.1)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width="11" height="11" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4-7 4A2 2 0 0 0 3 8v8"/></svg>
                        </div>
                        <div>
                          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>{cve.component}</div>
                          <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>v{cve.version}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ background: `${SEVERITY_COLORS[cve.severity]}22`, color: SEVERITY_COLORS[cve.severity], border: `1px solid ${SEVERITY_COLORS[cve.severity]}44`, padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700, textTransform: 'capitalize' }}>
                        {cve.severity}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: 800, color: cve.cvss >= 9 ? '#f85149' : cve.cvss >= 7 ? '#f0883e' : cve.cvss >= 4 ? '#d29922' : '#58a6ff' }}>{cve.cvss.toFixed(1)}</span>
                    </td>
                    <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>{cve.published}</td>
                    <td>
                      <span style={{ background: cve.fixAvailable ? 'rgba(63,185,80,0.12)' : 'rgba(248,81,73,0.12)', color: cve.fixAvailable ? '#3fb950' : '#f85149', border: `1px solid ${cve.fixAvailable ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)'}`, padding: '3px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>
                        {cve.fixAvailable ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 13, color: cve.machines > 20 ? '#f85149' : cve.machines > 10 ? '#f0883e' : '#58a6ff' }}>{cve.machines}</span>
                    </td>
                  </tr>
                  {expanded === cve.id && (
                    <tr>
                      <td colSpan="8" style={{ background: 'rgba(88,166,255,0.04)', borderTop: 'none', padding: '10px 20px' }}>
                        <div style={{ display: 'flex', gap: 24 }}>
                          <div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Description</div>
                            <div style={{ fontSize: 11, color: 'var(--text-secondary)', maxWidth: 420 }}>{cve.desc}</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>CVSS Vector</div>
                            <div style={{ fontSize: 10, color: '#58a6ff', fontFamily: 'JetBrains Mono' }}>CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U</div>
                          </div>
                          <div>
                            <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Recommended Action</div>
                            <div style={{ fontSize: 11, color: cve.fixAvailable ? '#3fb950' : '#f0883e' }}>
                              {cve.fixAvailable ? `Update ${cve.component} to latest stable version` : 'No fix available — apply compensating controls'}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid-2 section" style={{ gridTemplateColumns: '5fr 4fr' }}>
        {/* ── Remediation Matrix ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ width: 3, height: 14, background: '#a855f7', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Remediation Priority Matrix (Effort vs Impact)</span>
          </div>
          <ScatterPlot data={REMEDIATION}/>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
            {REMEDIATION.map(d => (
              <div key={d.name} style={{ flex: '1 0 calc(50% - 5px)', background: 'rgba(88,166,255,0.05)', border: '1px solid rgba(88,166,255,0.15)', borderRadius: 8, padding: '10px 12px' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{d.name}</div>
                <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--text-muted)' }}>
                  <span>Effort: <strong style={{ color: '#58a6ff' }}>{d.effort}h</strong></span>
                  <span>Impact: <strong style={{ color: '#3fb950' }}>{d.impact}</strong></span>
                  <span>CVEs: <strong style={{ color: '#f85149' }}>{d.cves}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Top 10 Vulnerable Components ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, background: '#f0883e', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Top 10 Most Vulnerable Components</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TOP_COMPONENTS.map(c => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 8, transition: 'all 0.2s' }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: `${SEVERITY_COLORS[c.severity]}20`, border: `1px solid ${SEVERITY_COLORS[c.severity]}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: SEVERITY_COLORS[c.severity], flexShrink: 0 }}>#{c.rank}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{c.name}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: 1 }}>{c.vulns} vulnerabilities</div>
                </div>
                <div style={{ height: 4, width: 70, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${(c.vulns / 23) * 100}%`, height: '100%', background: SEVERITY_COLORS[c.severity], borderRadius: 2, boxShadow: `0 0 6px ${SEVERITY_COLORS[c.severity]}` }}/>
                </div>
                <span style={{ background: `${SEVERITY_COLORS[c.severity]}20`, color: SEVERITY_COLORS[c.severity], border: `1px solid ${SEVERITY_COLORS[c.severity]}40`, padding: '2px 8px', borderRadius: 20, fontSize: 9, fontWeight: 700, textTransform: 'capitalize', flexShrink: 0 }}>{c.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
