import React, { useState } from 'react'

const assetsData = [
  { id: 1, name: 'prod-web-01',   ip: '192.168.0.1', os: 'Ubuntu 22.04',        status: 'online',  apps: 9  },
  { id: 2, name: 'prod-db-02',    ip: '192.168.0.2', os: 'CentOS 8',            status: 'online',  apps: 8  },
  { id: 3, name: 'prod-api-03',   ip: '192.168.0.3', os: 'Windows Server 2022', status: 'online',  apps: 19 },
  { id: 4, name: 'prod-cache-04', ip: '192.168.0.4', os: 'Debian 11',           status: 'offline', apps: 12 },
]

const MACHINE_COMPONENTS = {
  1: [
    { name: 'libc.so.6',       version: '2.27.5', type: 'Library',    risk: 'NONE'   },
    { name: 'libssl.so.3',     version: '1.6.0',  type: 'Framework',  risk: 'HIGH'   },
    { name: 'libcrypto.so.3',  version: '3.22.8', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libz.so.1',       version: '2.6.2',  type: 'Dependency', risk: 'MEDIUM' },
    { name: 'libpcre.so.3',    version: '3.3.2',  type: 'Library',    risk: 'LOW'    },
    { name: 'libpthread.so.0', version: '1.25.0', type: 'Framework',  risk: 'MEDIUM' },
    { name: 'openssl',         version: '3.0.2',  type: 'Library',    risk: 'HIGH'   },
    { name: 'zlib',            version: '1.2.13', type: 'Dependency', risk: 'LOW'    },
  ],
  2: [
    { name: 'libcrypto.so.3',  version: '3.22.8', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libz.so.1',       version: '2.6.2',  type: 'Dependency', risk: 'MEDIUM' },
    { name: 'libpthread.so.0', version: '1.25.0', type: 'Framework',  risk: 'MEDIUM' },
    { name: 'libm.so.6',       version: '1.21.6', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libdl.so.2',      version: '3.1.5',  type: 'Dependency', risk: 'LOW'    },
    { name: 'openssl',         version: '3.0.2',  type: 'Library',    risk: 'HIGH'   },
    { name: 'pcre2',           version: '10.42',  type: 'Library',    risk: 'NONE'   },
    { name: 'libgcc',          version: '12.2.0', type: 'Runtime',    risk: 'NONE'   },
  ],
  3: [
    { name: 'libc.so.6',       version: '2.27.5', type: 'Library',    risk: 'NONE'   },
    { name: 'libssl.so.3',     version: '1.6.0',  type: 'Framework',  risk: 'HIGH'   },
    { name: 'libcrypto.so.3',  version: '3.22.8', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libz.so.1',       version: '2.6.2',  type: 'Dependency', risk: 'MEDIUM' },
    { name: 'libpcre.so.3',    version: '3.3.2',  type: 'Library',    risk: 'LOW'    },
    { name: 'libm.so.6',       version: '1.21.6', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libdl.so.2',      version: '3.1.5',  type: 'Dependency', risk: 'LOW'    },
    { name: 'openssl',         version: '3.0.2',  type: 'Library',    risk: 'HIGH'   },
    { name: 'zlib',            version: '1.2.13', type: 'Dependency', risk: 'LOW'    },
    { name: 'pcre2',           version: '10.42',  type: 'Library',    risk: 'NONE'   },
    { name: 'glibc',           version: '2.35',   type: 'Library',    risk: 'LOW'    },
    { name: 'libstdc++',       version: '12.2.0', type: 'Runtime',    risk: 'NONE'   },
  ],
  4: [
    { name: 'libpcre.so.3',    version: '3.3.2',  type: 'Library',    risk: 'LOW'    },
    { name: 'libpthread.so.0', version: '1.25.0', type: 'Framework',  risk: 'MEDIUM' },
    { name: 'libm.so.6',       version: '1.21.6', type: 'Runtime',    risk: 'NONE'   },
    { name: 'libdl.so.2',      version: '3.1.5',  type: 'Dependency', risk: 'LOW'    },
    { name: 'pcre2',           version: '10.42',  type: 'Library',    risk: 'NONE'   },
    { name: 'libgcc',          version: '12.2.0', type: 'Runtime',    risk: 'NONE'   },
    { name: 'glibc',           version: '2.35',   type: 'Library',    risk: 'LOW'    },
    { name: 'libstdc++',       version: '12.2.0', type: 'Runtime',    risk: 'NONE'   },
  ],
}

const LICENSE_DB = {
  'libc.so.6':       { spdx: 'LGPL-2.1',    category: 'Free', type: 'Copyleft',    compat: 'High',   cost: '$0',       source: 'GNU Project' },
  'libssl.so.3':     { spdx: 'Apache-2.0',  category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'OpenSSL Project' },
  'libcrypto.so.3':  { spdx: 'OpenSSL',     category: 'Free', type: 'Permissive',  compat: 'Medium', cost: '$0',       source: 'OpenSSL Project' },
  'libz.so.1':       { spdx: 'Zlib',        category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'Jean-loup Gailly' },
  'libpcre.so.3':    { spdx: 'BSD-3-Clause',category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'PCRE Project' },
  'libpthread.so.0': { spdx: 'LGPL-2.1',    category: 'Free', type: 'Copyleft',    compat: 'High',   cost: '$0',       source: 'GNU Project' },
  'libm.so.6':       { spdx: 'LGPL-2.1',    category: 'Free', type: 'Copyleft',    compat: 'High',   cost: '$0',       source: 'GNU Project' },
  'libdl.so.2':      { spdx: 'LGPL-2.1',    category: 'Free', type: 'Copyleft',    compat: 'High',   cost: '$0',       source: 'GNU Project' },
  'openssl':         { spdx: 'Apache-2.0',  category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'OpenSSL Project' },
  'zlib':            { spdx: 'Zlib',        category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'Jean-loup Gailly' },
  'pcre2':           { spdx: 'BSD-3-Clause',category: 'Free', type: 'Permissive',  compat: 'High',   cost: '$0',       source: 'PCRE Project' },
  'libgcc':          { spdx: 'GPL-3.0',     category: 'Free', type: 'Copyleft',    compat: 'Medium', cost: '$0',       source: 'GNU Project' },
  'glibc':           { spdx: 'LGPL-2.1',    category: 'Free', type: 'Copyleft',    compat: 'High',   cost: '$0',       source: 'GNU Project' },
  'libstdc++':       { spdx: 'GPL-3.0',     category: 'Free', type: 'Copyleft',    compat: 'Medium', cost: '$0',       source: 'GNU Project' },
}
const DEFAULT_LIC = { spdx: 'Commercial', category: 'Paid', type: 'Proprietary', compat: 'Low', cost: 'Varies', source: 'Vendor' }
const getLic = (name) => LICENSE_DB[name] || DEFAULT_LIC

const typeColors = { Permissive: '#3fb950', Copyleft: '#58a6ff', Proprietary: '#f85149', Commercial: '#f0883e' }

// ── Donut chart ───────────────────────────────────────────────────────────────

function polarXY(cx, cy, r, deg) {
  const rad = (deg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}
function arcPath(cx, cy, or, ir, sa, ea) {
  const s1 = polarXY(cx, cy, or, ea), e1 = polarXY(cx, cy, or, sa)
  const s2 = polarXY(cx, cy, ir, sa), e2 = polarXY(cx, cy, ir, ea)
  const lg = ea - sa > 180 ? 1 : 0
  return `M ${s1.x} ${s1.y} A ${or} ${or} 0 ${lg} 0 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${ir} ${ir} 0 ${lg} 1 ${e2.x} ${e2.y} Z`
}

function DonutChart({ data, cx = 70, cy = 70, size = 140 }) {
  let angle = 0
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const sweep = (d.value / total) * 359.9
        const start = angle, end = angle + sweep
        angle = end
        const path = arcPath(cx, cy, 52, 32, start, end)
        return <path key={i} d={path} fill={`${d.color}45`} stroke={d.color} strokeWidth="1.5"/>
      })}
      <text x={cx} y={cy - 5} textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="JetBrains Mono">{total}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text-muted)" fontSize="8">total</text>
    </svg>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function License() {
  const [selectedAsset, setSelectedAsset] = useState(assetsData[0])
  const [search, setSearch] = useState('')
  const [filterCat, setFilterCat] = useState('All')

  const components = MACHINE_COMPONENTS[selectedAsset.id] || []
  const licData = components.map(c => ({ ...c, lic: getLic(c.name) }))

  const free = licData.filter(c => c.lic.category === 'Free').length
  const paid = licData.filter(c => c.lic.category === 'Paid').length
  const total = licData.length

  const typeCounts = {}
  licData.forEach(c => { typeCounts[c.lic.type] = (typeCounts[c.lic.type] || 0) + 1 })

  const spdxCounts = {}
  licData.forEach(c => { spdxCounts[c.lic.spdx] = (spdxCounts[c.lic.spdx] || 0) + 1 })
  const spdxEntries = Object.entries(spdxCounts).sort((a, b) => b[1] - a[1])
  const maxSpdx = Math.max(...spdxEntries.map(e => e[1]), 1)

  const filtered = licData.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = filterCat === 'All' || c.lic.category === filterCat || c.lic.type === filterCat
    return matchSearch && matchCat
  })

  const compatColor = { High: '#3fb950', Medium: '#f0883e', Low: '#f85149' }

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%', overflow: 'hidden' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 0 16px' }}>
        <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #a855f7, #3b82f6)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>License Management</h1>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Software license compliance per machine</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flex: 1, overflow: 'hidden' }}>
        {/* Left: Machine list */}
        <div style={{ width: 240, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Machines</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {assetsData.map(asset => {
              const sel = selectedAsset.id === asset.id
              const comps = MACHINE_COMPONENTS[asset.id] || []
              const paidCount = comps.filter(c => getLic(c.name).category === 'Paid').length
              return (
                <div key={asset.id} onClick={() => setSelectedAsset(asset)}
                  style={{ padding: '11px 14px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: sel ? 'rgba(168,85,247,0.07)' : 'transparent', borderLeft: sel ? '3px solid #a855f7' : '3px solid transparent', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: sel ? '#a855f7' : 'var(--text-primary)' }}>{asset.name}</span>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: asset.status === 'online' ? '#3fb950' : '#6e7681', boxShadow: asset.status === 'online' ? '0 0 5px #3fb950' : 'none', display: 'block' }}/>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 5 }}>{asset.os}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 3, background: 'rgba(63,185,80,0.1)', color: '#3fb950', border: '1px solid rgba(63,185,80,0.25)', fontWeight: 700 }}>
                      {comps.length - paidCount} free
                    </span>
                    {paidCount > 0 && (
                      <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 3, background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid rgba(248,81,73,0.25)', fontWeight: 700 }}>
                        {paidCount} paid
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: License details */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>

          {/* KPI row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, flexShrink: 0 }}>
            {[
              { label: 'Total Licenses', value: total, color: '#58a6ff', sub: `on ${selectedAsset.name}` },
              { label: 'Free / OSS',     value: free,  color: '#3fb950', sub: `${total ? Math.round(free/total*100) : 0}% of components` },
              { label: 'Paid / Proprietary', value: paid, color: '#f85149', sub: paid > 0 ? 'Review required' : 'None detected' },
              { label: 'License Types', value: Object.keys(typeCounts).length, color: '#a855f7', sub: 'distinct categories' },
            ].map(card => (
              <div key={card.label} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '13px 16px', borderTop: `2px solid ${card.color}` }}>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>{card.label}</div>
                <div style={{ fontSize: 28, fontWeight: 700, color: card.color, fontFamily: 'JetBrains Mono', lineHeight: 1 }}>{card.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{card.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, flexShrink: 0 }}>
            {/* Free vs Paid donut */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Free vs Paid</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <DonutChart data={[
                  { value: free, color: '#3fb950', label: 'Free' },
                  { value: Math.max(paid, 0.001), color: '#f85149', label: 'Paid' },
                ]}/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[{ label: 'Free / OSS', count: free, color: '#3fb950' }, { label: 'Paid', count: paid, color: '#f85149' }].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: item.color, flexShrink: 0 }}/>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 14, color: item.color, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{item.count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* License type donut */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>License Types</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <DonutChart data={Object.entries(typeCounts).map(([type, value]) => ({ value, color: typeColors[type] || '#8b949e', label: type }))}/>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {Object.entries(typeCounts).map(([type, count]) => (
                    <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: typeColors[type] || '#8b949e', flexShrink: 0 }}/>
                      <div>
                        <div style={{ fontSize: 9, color: 'var(--text-secondary)' }}>{type}</div>
                        <div style={{ fontSize: 12, color: typeColors[type] || '#8b949e', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{count}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SPDX bar chart */}
            <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>By SPDX Identifier</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {spdxEntries.slice(0, 6).map(([spdx, count]) => {
                  const col = typeColors[licData.find(c => c.lic.spdx === spdx)?.lic.type] || '#58a6ff'
                  return (
                    <div key={spdx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <span style={{ fontSize: 9, color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono' }}>{spdx}</span>
                        <span style={{ fontSize: 9, color: col, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{count}</span>
                      </div>
                      <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{ width: `${(count / maxSpdx) * 100}%`, height: '100%', background: col, borderRadius: 3, transition: 'width 0.4s ease' }}/>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Table header */}
            <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>Component License Details</span>
              {/* Filters */}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                {['All', 'Free', 'Paid', 'Permissive', 'Copyleft', 'Proprietary'].map(f => (
                  <button key={f} onClick={() => setFilterCat(f)}
                    style={{ fontSize: 9, padding: '3px 9px', borderRadius: 5, border: filterCat === f ? '1px solid var(--accent-blue)' : '1px solid var(--border)', background: filterCat === f ? 'rgba(88,166,255,0.12)' : 'transparent', color: filterCat === f ? 'var(--accent-blue)' : 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
                    {f}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div style={{ position: 'relative' }}>
                <svg width="10" height="10" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search component…"
                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid var(--border-accent)', borderRadius: 6, padding: '5px 10px 5px 25px', color: 'var(--text-primary)', fontSize: 10, outline: 'none', width: 160 }}/>
              </div>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
                <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                  <tr style={{ background: 'var(--bg-card2)' }}>
                    {['Component', 'Version', 'Type', 'SPDX License', 'Category', 'License Type', 'Source'].map(h => (
                      <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((comp, i) => {
                    const isFree = comp.lic.category === 'Free'
                    const typeCol = typeColors[comp.lic.type] || '#8b949e'
                    const compatCol = compatColor[comp.lic.compat] || '#8b949e'
                    return (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono', color: 'var(--text-primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{comp.name}</td>
                        <td style={{ padding: '9px 14px', fontFamily: 'JetBrains Mono', color: 'var(--text-muted)', fontSize: 10 }}>{comp.version}</td>
                        <td style={{ padding: '9px 14px', color: 'var(--text-secondary)', fontSize: 10 }}>{comp.type}</td>
                        <td style={{ padding: '9px 14px' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: `${typeCol}18`, color: typeCol, border: `1px solid ${typeCol}40`, fontFamily: 'JetBrains Mono' }}>{comp.lic.spdx}</span>
                        </td>
                        <td style={{ padding: '9px 14px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: isFree ? '#3fb950' : '#f85149', fontWeight: 700 }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isFree ? '#3fb950' : '#f85149' }}/>
                            {comp.lic.category}
                          </span>
                        </td>
                        <td style={{ padding: '9px 14px', color: typeCol, fontSize: 10, fontWeight: 600 }}>{comp.lic.type}</td>
                        
                        <td style={{ padding: '9px 14px', color: 'var(--text-muted)', fontSize: 10 }}>{comp.lic.source}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ padding: '7px 16px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', flexShrink: 0 }}>
              <span>Showing {filtered.length} of {licData.length} components</span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{selectedAsset.name} · {selectedAsset.os}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
