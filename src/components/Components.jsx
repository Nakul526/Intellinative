import { useState } from 'react'
import DependencyGraph from './DependencyGraph'

const assetsData = [
  { id: 1, name: 'prod-web-01',   ip: '192.168.0.1', os: 'Ubuntu 22.04',        apps: 9,  status: 'offline' },
  { id: 2, name: 'prod-db-02',    ip: '192.168.0.2', os: 'CentOS 8',            apps: 8,  status: 'online' },
  { id: 3, name: 'prod-api-03',   ip: '192.168.0.3', os: 'Windows Server 2022', apps: 19, status: 'online' },
  { id: 4, name: 'prod-cache-04', ip: '192.168.0.4', os: 'Debian 11',           apps: 12, status: 'online' },
]

const applicationsData = [
  { id: 1, name: 'nginx',      version: '3.11.3', status: 'active',  sboms: 3, port: 3000 },
  { id: 2, name: 'apache',     version: '2.4.2',  status: 'active',  sboms: 2, port: 3001 },
  { id: 3, name: 'postgresql', version: '5.10.6', status: 'active',  sboms: 1, port: 3002 },
  { id: 4, name: 'mysql',      version: '5.0.0',  status: 'warning', sboms: 2, port: 3003 },
  { id: 5, name: 'redis',      version: '1.17.4', status: 'active',  sboms: 2, port: 3004 },
  { id: 6, name: 'memcached',  version: '1.6.12', status: 'active',  sboms: 1, port: 3005 },
  { id: 7, name: 'rabbitmq',   version: '3.9.4',  status: 'active',  sboms: 1, port: 3006 },
]

const sbomsData = {
  'SBOM-1': {
    format: 'CycloneDX',
    components: [
      { name: 'libc.so.6',        version: '2.24.7', type: 'Library',    risk: 'NONE',   cves: 0,  secure: true,  loaded: true,  license: 'MIT',        size: '105KB', deps: [] },
      { name: 'libssl.so.3',      version: '1.6.0',  type: 'Framework',  risk: 'HIGH',   cves: 3,  secure: false, loaded: true,  license: 'OpenSSL',    size: '312KB', deps: ['libcrypto.so.3'] },
      { name: 'libcrypto.so.3',   version: '3.22.8', type: 'Runtime',    risk: 'NONE',   cves: 0,  secure: true,  loaded: true,  license: 'Apache-2.0', size: '3.2MB', deps: [] },
      { name: 'libz.so.1',        version: '3.18.8', type: 'Dependency', risk: 'MEDIUM', cves: 2,  secure: false, loaded: true,  license: 'LGPL-2.1',   size: '209KB', deps: ['dep-3-0', 'dep-3-1'] },
      { name: 'libpcre.so.3',     version: '3.3.2',  type: 'Library',    risk: 'LOW',    cves: 0,  secure: true,  loaded: false, license: 'BSD-2',      size: '187KB', deps: [] },
      { name: 'libpthread.so.0',  version: '1.25.0', type: 'Framework',  risk: 'MEDIUM', cves: 1,  secure: false, loaded: true,  license: 'LGPL-2.1',   size: '144KB', deps: ['dep-1-0'] },
      { name: 'libm.so.6',        version: '1.21.6', type: 'Runtime',    risk: 'NONE',   cves: 0,  secure: true,  loaded: true,  license: 'MIT',        size: '78KB',  deps: [] },
      { name: 'libdl.so.2',       version: '3.1.5',  type: 'Dependency', risk: 'LOW',    cves: 0,  secure: true,  loaded: true,  license: 'BSD-3',      size: '23KB',  deps: [] },
    ],
  },
  'SBOM-2': {
    format: 'SPDX',
    components: [
      { name: 'openssl',    version: '3.0.2',  type: 'Library',    risk: 'HIGH',   cves: 4, secure: false, loaded: true,  license: 'OpenSSL',    size: '1.1MB', deps: ['dep-2-0', 'dep-2-1'] },
      { name: 'zlib',       version: '1.2.13', type: 'Dependency', risk: 'LOW',    cves: 0, secure: true,  loaded: true,  license: 'zlib',       size: '148KB', deps: [] },
      { name: 'pcre2',      version: '10.42',  type: 'Library',    risk: 'NONE',   cves: 0, secure: true,  loaded: true,  license: 'BSD-3',      size: '223KB', deps: [] },
      { name: 'libgcc',     version: '12.2.0', type: 'Runtime',    risk: 'NONE',   cves: 0, secure: true,  loaded: true,  license: 'GPL-3',      size: '344KB', deps: [] },
    ],
  },
  'SBOM-3': {
    format: 'CycloneDX',
    components: [
      { name: 'glibc',      version: '2.35',   type: 'Library',    risk: 'LOW',    cves: 1, secure: false, loaded: true,  license: 'LGPL-2.1', size: '2.1MB', deps: ['dep-4-0'] },
      { name: 'libstdc++',  version: '12.2.0', type: 'Runtime',    risk: 'NONE',   cves: 0, secure: true,  loaded: true,  license: 'GPL-3',    size: '456KB', deps: [] },
    ],
  },
}

const riskColors = {
  NONE:   { bg: 'rgba(110,118,129,0.12)', color: '#6e7681', border: 'rgba(110,118,129,0.25)' },
  LOW:    { bg: 'rgba(63,185,80,0.1)',    color: '#3fb950',  border: 'rgba(63,185,80,0.25)' },
  MEDIUM: { bg: 'rgba(240,136,62,0.1)',   color: '#f0883e',  border: 'rgba(240,136,62,0.25)' },
  HIGH:   { bg: 'rgba(248,81,73,0.1)',    color: '#f85149',  border: 'rgba(248,81,73,0.25)' },
}

const appStatusColors = {
  active:  { bg: 'rgba(63,185,80,0.12)',  color: '#3fb950', border: 'rgba(63,185,80,0.25)' },
  warning: { bg: 'rgba(240,136,62,0.12)', color: '#f0883e', border: 'rgba(240,136,62,0.25)' },
}

export default function Components() {
  const [selectedAsset, setSelectedAsset]         = useState(assetsData[0])
  const [selectedApp, setSelectedApp]             = useState(applicationsData[0])
  const [selectedSbom, setSelectedSbom]           = useState('SBOM-1')
  const [assetSearch, setAssetSearch]             = useState('')
  const [appSearch, setAppSearch]                 = useState('')
  const [compSearch, setCompSearch]               = useState('')
  const [showDepGraph, setShowDepGraph]           = useState(false)
  const [selectedComponent, setSelectedComponent] = useState(null)
  const [assetPopup, setAssetPopup]               = useState(null)

  const sbom       = sbomsData[selectedSbom]
  const components = sbom.components.filter(c => c.name.toLowerCase().includes(compSearch.toLowerCase()))
  const filteredApps = applicationsData.filter(a => a.name.toLowerCase().includes(appSearch.toLowerCase()))
  const filteredAssets = assetsData.filter(a => a.name.toLowerCase().includes(assetSearch.toLowerCase()) || a.ip.includes(assetSearch))

  const totalVulns = sbom.components.reduce((s, c) => s + c.cves, 0)

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #3b82f6, #a855f7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Component Hierarchy</h1>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span>Asset</span><span style={{ color: 'var(--border-accent)' }}>→</span>
            <span>Application</span><span style={{ color: 'var(--border-accent)' }}>→</span>
            <span>Components</span>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 10, padding: '10px 16px', fontSize: 12 }}>
        <svg width="13" height="13" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
        <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{selectedAsset.name}</span>
        <span style={{ color: 'var(--text-muted)' }}>›</span>
        <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
        <span style={{ color: '#a855f7', fontWeight: 600 }}>{selectedApp.name}</span>
        <span style={{ color: 'var(--text-muted)' }}>›</span>
        <svg width="13" height="13" fill="none" stroke="#3fb950" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <span style={{ color: '#3fb950', fontWeight: 600 }}>{selectedSbom}</span>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10 }}>
        <KpiStrip icon={<svg width="14" height="14" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>} label="ASSETS" value={50} sub="45 online" color="#58a6ff" glow="rgba(88,166,255,0.06)" />
        <KpiStrip icon={<svg width="14" height="14" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>} label="APPLICATIONS" value={7}  color="#a855f7" glow="rgba(168,85,247,0.06)" />
        <KpiStrip icon={<svg width="14" height="14" fill="none" stroke="#3fb950" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} label="SBOMS" value={Object.keys(sbomsData).length} sub="available" color="#3fb950" glow="rgba(63,185,80,0.06)" />
        <KpiStrip icon={<svg width="14" height="14" fill="none" stroke="#00e5ff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>} label="COMPONENTS" value={sbom.components.length} sub="in SBOM" color="#00e5ff" glow="rgba(0,229,255,0.06)" />
        <KpiStrip icon={<svg width="14" height="14" fill="none" stroke="#f85149" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} label="VULNERABILITIES" value={totalVulns} sub="detected" color="#f85149" glow="rgba(248,81,73,0.06)" />
      </div>

      {/* Three-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 280px 1fr', gap: 12, flex: 1 }}>

        {/* Column 1 – Assets */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <svg width="14" height="14" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>Assets</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 2 }}>Machines &amp; Servers</span>
            </div>
            <SearchInput value={assetSearch} onChange={setAssetSearch} placeholder="Search by name or IP..." />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredAssets.map(asset => {
              const selected = selectedAsset.id === asset.id
              return (
                <div key={asset.id} onClick={() => setSelectedAsset(asset)} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selected ? 'rgba(88,166,255,0.07)' : 'transparent', borderLeft: selected ? '3px solid var(--accent-blue)' : '3px solid transparent', transition: 'all 0.15s', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: selected ? 'var(--accent-blue)' : 'var(--text-primary)' }}>{asset.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <button
                        onClick={e => { e.stopPropagation(); setAssetPopup(asset) }}
                        style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, border: '1px solid rgba(88,166,255,0.3)', background: 'rgba(88,166,255,0.08)', color: '#58a6ff', cursor: 'pointer', fontWeight: 600 }}
                      >Info</button>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: asset.status === 'online' ? '#3fb950' : '#6e7681', boxShadow: asset.status === 'online' ? '0 0 5px #3fb950' : 'none' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 3 }}>
                    <svg width="10" height="10" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{asset.ip}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
                    <svg width="10" height="10" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{asset.os}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{asset.apps} applications</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)' }}>
            Showing 50 of 50 assets
          </div>
        </div>

        {/* Column 2 – Applications */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <svg width="14" height="14" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>Applications</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 2 }}>Running Services</span>
            </div>
            <SearchInput value={appSearch} onChange={setAppSearch} placeholder="Search applications..." />
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredApps.map(app => {
              const selected = selectedApp.id === app.id
              const sc = appStatusColors[app.status] || appStatusColors.active
              return (
                <div key={app.id} onClick={() => setSelectedApp(app)} style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: selected ? 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(59,130,246,0.08))' : 'transparent', borderLeft: selected ? '3px solid #a855f7' : '3px solid transparent', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: selected ? '#fff' : 'var(--text-primary)' }}>{app.name}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, letterSpacing: '0.05em' }}>{app.status.toUpperCase()}</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Version {app.version}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{app.sboms} SBOMs</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Port {app.port}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', fontSize: 10, color: 'var(--text-muted)' }}>
            {filteredApps.length} applications
          </div>
        </div>

        {/* Column 3 – Components & Libraries */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Header */}
          <div style={{ padding: '14px 14px 10px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 26, height: 26, background: 'linear-gradient(135deg, #3fb950, #00e5ff)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="13" height="13" fill="none" stroke="#000" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>Components &amp; Libraries</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Software Bill of Materials</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={actionBtnStyle} onClick={() => setShowDepGraph(true)}>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="11.5" x2="17" y2="6.5"/><line x1="7" y1="12.5" x2="17" y2="17.5"/></svg>
                  View Dependency Graph
                </button>
                <button style={{ ...actionBtnStyle, background: 'rgba(63,185,80,0.1)', color: '#3fb950', border: '1px solid rgba(63,185,80,0.25)' }}>
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Export SBOM
                </button>
              </div>
            </div>

            {/* SBOM tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
              {Object.entries(sbomsData).map(([key, val]) => {
                const active = selectedSbom === key
                return (
                  <button key={key} onClick={() => setSelectedSbom(key)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 11px', borderRadius: 7, border: active ? '1px solid rgba(0,229,255,0.4)' : '1px solid var(--border)', background: active ? 'rgba(0,229,255,0.08)' : 'rgba(255,255,255,0.02)', color: active ? '#00e5ff' : 'var(--text-muted)', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    {key}
                    <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 3, background: active ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.06)', color: active ? '#00e5ff' : 'var(--text-muted)', fontWeight: 700 }}>{val.format}</span>
                  </button>
                )
              })}
            </div>

            <SearchInput value={compSearch} onChange={setCompSearch} placeholder="Search components..." />
          </div>

          {/* Table */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Component Name</th>
                  <th>Version</th>
                  <th>Type</th>
                  <th>Severity</th>
                  <th>Vulnerabilities</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {components.map((comp, i) => {
                  const rc = riskColors[comp.risk]
                  return (
                    <tr key={i}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 22, height: 22, background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.15)', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="11" height="11" fill="none" stroke="#00e5ff" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
                          </div>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--text-primary)' }}>{comp.name}</span>
                        </div>
                      </td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{comp.version}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{comp.type}</td>
                      <td>
                        <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 700, background: rc.bg, color: rc.color, border: `1px solid ${rc.border}` }}>{comp.risk}</span>
                      </td>
                      <td>
                        {comp.cves > 0 ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: comp.risk === 'HIGH' ? '#f85149' : '#f0883e', fontSize: 11 }}>
                            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                            {comp.cves} CVE{comp.cves > 1 ? 's' : ''}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>
                        )}
                      </td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: comp.secure ? '#3fb950' : '#f0883e', fontSize: 11 }}>
                          {comp.secure
                            ? <><svg width="11" height="11" fill="none" stroke="#3fb950" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Secure</>
                            : <><svg width="11" height="11" fill="none" stroke="#f0883e" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> At Risk</>
                          }
                        </span>
                      </td>
                      <td>
                        <button onClick={() => setSelectedComponent(comp)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(88,166,255,0.3)', background: 'rgba(88,166,255,0.08)', color: '#58a6ff', fontSize: 10, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
                          <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          Details
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: 'var(--text-muted)' }}>
            <span>Showing {components.length} of {sbom.components.length} components</span>
            <span>Generated: 2024-03-10 <span style={{ color: '#00e5ff', fontWeight: 600 }}>{sbom.format}</span></span>
          </div>
        </div>
      </div>

      {showDepGraph && (
        <DependencyGraph
          components={sbom.components}
          appName={`${selectedApp.name} / ${selectedSbom}`}
          onClose={() => setShowDepGraph(false)}
        />
      )}

      {selectedComponent && (
        <ComponentDetailModal
          comp={selectedComponent}
          sbomKey={selectedSbom}
          onClose={() => setSelectedComponent(null)}
        />
      )}

      {assetPopup && <AssetDetailPopup asset={assetPopup} onClose={() => setAssetPopup(null)} />}
    </div>
  )
}

function AssetDetailPopup({ asset, onClose }) {
  const apps = applicationsData
  const metrics = [
    { label: 'Applications', value: asset.apps, color: '#a855f7' },
    { label: 'Status', value: asset.status.toUpperCase(), color: asset.status === 'online' ? '#3fb950' : '#6e7681' },
    { label: 'SBOMs', value: apps.reduce((s, a) => s + a.sboms, 0), color: '#00e5ff' },
    { label: 'Ports', value: apps.length, color: '#58a6ff' },
  ]
  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#000000', border: '1px solid rgba(88,166,255,0.25)', borderRadius: 16, width: 520, maxWidth: '94vw', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 0 60px rgba(88,166,255,0.12), 0 24px 80px rgba(0,0,0,0.8)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid rgba(88,166,255,0.15)', background: 'linear-gradient(135deg, rgba(88,166,255,0.06), rgba(0,0,0,0))' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 44, height: 44, background: 'linear-gradient(135deg, rgba(88,166,255,0.2), rgba(88,166,255,0.05))', border: '1px solid rgba(88,166,255,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" fill="none" stroke="#58a6ff" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#e6edf3', fontFamily: 'JetBrains Mono' }}>{asset.name}</div>
                <div style={{ fontSize: 11, color: '#8b949e', marginTop: 3 }}>{asset.os}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8b949e', flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          {/* Status pill */}
          <div style={{ marginTop: 14, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: asset.status === 'online' ? 'rgba(63,185,80,0.12)' : 'rgba(110,118,129,0.12)', color: asset.status === 'online' ? '#3fb950' : '#6e7681', border: `1px solid ${asset.status === 'online' ? 'rgba(63,185,80,0.3)' : 'rgba(110,118,129,0.3)'}` }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: asset.status === 'online' ? '#3fb950' : '#6e7681', boxShadow: asset.status === 'online' ? '0 0 5px #3fb950' : 'none' }}/>
              {asset.status.toUpperCase()}
            </span>
            <span style={{ fontSize: 11, padding: '4px 12px', borderRadius: 20, background: 'rgba(88,166,255,0.08)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)', fontFamily: 'JetBrains Mono' }}>
              {asset.ip}
            </span>
          </div>
        </div>

        {/* Metrics grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {metrics.map((m, i) => (
            <div key={i} style={{ padding: '16px 14px', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <div style={{ fontSize: 9, color: '#4d5a6a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{m.label}</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: m.color, fontFamily: 'JetBrains Mono', lineHeight: 1 }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Body */}
        <div style={{ padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Connection info */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4d5a6a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Connection Details</div>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' }}>
              {[
                { label: 'IP Address', value: asset.ip },
                { label: 'Operating System', value: asset.os },
                { label: 'Machine Name', value: asset.name },
                { label: 'Last Seen', value: '2024-03-20 14:32 UTC' },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span style={{ fontSize: 11, color: '#4d5a6a' }}>{row.label}</span>
                  <span style={{ fontSize: 11, color: '#e6edf3', fontFamily: 'JetBrains Mono' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications list */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#4d5a6a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Running Applications</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {apps.slice(0, 4).map((app, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="12" height="12" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#e6edf3' }}>{app.name}</div>
                      <div style={{ fontSize: 9, color: '#4d5a6a', fontFamily: 'JetBrains Mono' }}>v{app.version} · port {app.port}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: app.status === 'active' ? 'rgba(63,185,80,0.1)' : 'rgba(240,136,62,0.1)', color: app.status === 'active' ? '#3fb950' : '#f0883e', border: `1px solid ${app.status === 'active' ? 'rgba(63,185,80,0.25)' : 'rgba(240,136,62,0.25)'}` }}>
                    {app.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KpiStrip({ icon, label, value, sub, color, glow }) {
  return (
    <div style={{ background: 'var(--bg-card)', border: `1px solid rgba(255,255,255,0.06)`, borderRadius: 10, padding: '14px 16px', boxShadow: `inset 0 0 30px ${glow}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 8 }}>
        {icon}
        <span style={{ fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>
    </div>
  )
}

function SearchInput({ value, onChange, placeholder }) {
  return (
    <div style={{ position: 'relative' }}>
      <svg width="11" height="11" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-accent)', borderRadius: 7, padding: '7px 10px 7px 27px', color: 'var(--text-primary)', fontSize: 11, outline: 'none' }} />
    </div>
  )
}

const actionBtnStyle = {
  display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 7,
  border: '1px solid rgba(88,166,255,0.25)', background: 'rgba(88,166,255,0.08)',
  color: '#58a6ff', fontSize: 10, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
}

const sevColors = {
  CRITICAL: { bg: 'rgba(248,81,73,0.12)',  color: '#f85149', border: 'rgba(248,81,73,0.3)' },
  HIGH:     { bg: 'rgba(240,136,62,0.12)', color: '#f0883e', border: 'rgba(240,136,62,0.3)' },
  MEDIUM:   { bg: 'rgba(240,208,96,0.12)', color: '#f0d060', border: 'rgba(240,208,96,0.3)' },
  LOW:      { bg: 'rgba(63,185,80,0.12)',  color: '#3fb950', border: 'rgba(63,185,80,0.3)' },
}

function buildCVEs(comp) {
  if (!comp.cves) return []
  const sevMap = {
    HIGH:   ['CRITICAL', 'HIGH', 'MEDIUM'],
    MEDIUM: ['HIGH', 'MEDIUM'],
    LOW:    ['MEDIUM'],
  }
  const cvssMap = { CRITICAL: 9.4, HIGH: 8.1, MEDIUM: 6.5, LOW: 3.5 }
  const severities = sevMap[comp.risk] || ['MEDIUM']
  return Array.from({ length: comp.cves }, (_, i) => {
    const sev = severities[i] || severities[severities.length - 1]
    return {
      id: `CVE-2024-${10000 + i}`,
      severity: sev,
      description: `Buffer overflow vulnerability detected in version ${comp.version}. Remote code execution possible.`,
      cvss: (cvssMap[sev] - i * 0.2).toFixed(1),
      published: `2024-03-0${i + 1}`,
    }
  })
}

function ComponentDetailModal({ comp, sbomKey, onClose }) {
  const rc   = riskColors[comp.risk]
  const cves = buildCVEs(comp)
  const filePath = `/lib/x86_64-linux-gnu/${comp.name}`
  const purl     = `pkg:generic/${comp.name}@${comp.version}`

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(5px)' }}
      onClick={onClose}
    >
      <div
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, width: 700, maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,0.6)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Modal header ── */}
        <div style={{ background: 'linear-gradient(135deg, rgba(10,32,18,0.98), rgba(8,16,30,0.98))', borderBottom: '1px solid rgba(63,185,80,0.2)', borderRadius: '16px 16px 0 0', padding: '22px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 46, height: 46, background: 'linear-gradient(135deg, #3fb950, #00e5ff)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="22" height="22" fill="none" stroke="#000" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#e6edf3', fontFamily: "'JetBrains Mono', monospace" }}>{comp.name}</div>
                <div style={{ fontSize: 12, color: '#8b949e', marginTop: 3 }}>Version {comp.version} &bull; {comp.type}</div>
              </div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#8b949e', flexShrink: 0 }}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          {/* Stats strip */}
          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            {[
              { label: 'Severity',      value: comp.risk,                         bg: rc.bg,                              color: rc.color,                          border: rc.border },
              { label: 'Vulnerabilities', value: comp.cves > 0 ? `${comp.cves} CVEs` : 'Secure', bg: comp.cves > 0 ? 'rgba(248,81,73,0.1)' : 'rgba(63,185,80,0.1)', color: comp.cves > 0 ? '#f85149' : '#3fb950', border: comp.cves > 0 ? 'rgba(248,81,73,0.25)' : 'rgba(63,185,80,0.25)' },
              { label: 'License',         value: comp.license || 'Unknown',          bg: 'rgba(255,255,255,0.04)',            color: '#e6edf3',                         border: 'rgba(255,255,255,0.08)' },
              { label: 'Size',            value: comp.size || '—',                   bg: 'rgba(168,85,247,0.08)',             color: '#a855f7',                         border: 'rgba(168,85,247,0.2)' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, minWidth: 0, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 8, padding: '8px 12px' }}>
                <div style={{ fontSize: 9, color: '#8b949e', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.07em' }}>{s.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: s.color }}>{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Modal body ── */}
        <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>

          {/* File Location */}
          <div>
            <ModalSectionLabel icon={<svg width="13" height="13" fill="none" stroke="#8b949e" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} label="File Location" />
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 14px', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#3fb950' }}>
              {filePath}
            </div>
          </div>

          {/* Dependencies */}
          <div>
            <ModalSectionLabel icon={<svg width="13" height="13" fill="none" stroke="#8b949e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="11.5" x2="17" y2="6.5"/><line x1="7" y1="12.5" x2="17" y2="17.5"/></svg>} label={`Dependencies (${comp.deps?.length || 0})`} />
            {comp.deps?.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {comp.deps.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 6, padding: '6px 12px' }}>
                    <svg width="10" height="10" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
                    <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#e6edf3' }}>{d}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px', textAlign: 'center', fontSize: 12, color: 'var(--text-muted)' }}>
                No dependencies found
              </div>
            )}
          </div>

          {/* Vulnerability Details */}
          {cves.length > 0 && (
            <div>
              <ModalSectionLabel icon={<svg width="13" height="13" fill="none" stroke="#f85149" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>} label="Vulnerability Details" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {cves.map((cve, i) => {
                  const sc = sevColors[cve.severity]
                  return (
                    <div key={i} style={{ background: sc.bg, border: `1px solid ${sc.border}`, borderRadius: 8, padding: '13px 15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7 }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 700, color: sc.color }}>{cve.id}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 4, background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{cve.severity}</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 9 }}>{cve.description}</div>
                      <div style={{ display: 'flex', gap: 20, fontSize: 10, color: 'var(--text-muted)' }}>
                        <span>CVSS Score: <span style={{ color: sc.color, fontWeight: 700 }}>{cve.cvss}</span></span>
                        <span>Published: {cve.published}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div>
            <ModalSectionLabel icon={<svg width="13" height="13" fill="none" stroke="#8b949e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>} label="Metadata" />
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
              {[
                { label: 'Package URL (PURL)', value: purl,                 valueColor: '#58a6ff' },
                { label: 'Component Type',      value: comp.type },
                { label: 'Architecture',        value: 'x86_64' },
                { label: 'SBOM Reference',      value: `${sbomKey} (CycloneDX)`, valueColor: '#58a6ff' },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 15px', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.label}</span>
                  <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: row.valueColor || 'var(--text-primary)' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ModalSectionLabel({ icon, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      {icon}
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  )
}
