import React, { useState, useRef, useEffect } from 'react'

const ORGS = [
  { id: 'acme', name: 'Acme Corp', initials: 'AC', color: '#3b82f6,#a855f7' },
  { id: 'globex', name: 'Globex Inc', initials: 'GI', color: '#10b981,#3b82f6' },
  { id: 'initech', name: 'Initech LLC', initials: 'IL', color: '#f0883e,#f85149' },
  { id: 'umbrella', name: 'Umbrella Corp', initials: 'UC', color: '#a855f7,#ec4899' },
]

export default function Sidebar({ activePage, onNavigate, activeOrg, setActiveOrg }) {
  const nav = (page) => () => onNavigate(page)
  const [orgOpen, setOrgOpen] = useState(false)
  const dropRef = useRef(null)
  const org = ORGS.find(o => o.id === activeOrg) || ORGS[0]

  useEffect(() => {
    function handler(e) { if (dropRef.current && !dropRef.current.contains(e.target)) setOrgOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">IB</div>
        <span className="logo-text">IntelliBOM</span>
      </div>

      {/* Org switcher */}
      <div className="sidebar-section" style={{ padding: '10px 16px 8px', position: 'relative' }} ref={dropRef}>
        <div
          onClick={() => setOrgOpen(o => !o)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', cursor: 'pointer', background: orgOpen ? 'rgba(88,166,255,0.08)' : 'rgba(255,255,255,0.03)', border: `1px solid ${orgOpen ? 'rgba(88,166,255,0.3)' : 'rgba(255,255,255,0.06)'}`, borderRadius: 8, transition: 'all 0.2s' }}
        >
          <div style={{ width: 24, height: 24, background: `linear-gradient(135deg, ${org.color})`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: '#fff', boxShadow: '0 0 8px rgba(168,85,247,0.4)', flexShrink: 0 }}>{org.initials}</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', flex: 1 }}>{org.name}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 10, transition: 'transform 0.2s', display: 'inline-block', transform: orgOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
        </div>

        {orgOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 10, right: 10, background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 200, overflow: 'hidden', marginTop: 4 }}>
            {ORGS.map(o => (
              <div
                key={o.id}
                onClick={() => { setActiveOrg(o.id); setOrgOpen(false) }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', cursor: 'pointer', background: o.id === activeOrg ? 'rgba(88,166,255,0.08)' : 'transparent', transition: 'background 0.15s' }}
                onMouseEnter={e => { if (o.id !== activeOrg) e.currentTarget.style.background = 'rgba(255,255,255,0.03)' }}
                onMouseLeave={e => { if (o.id !== activeOrg) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ width: 22, height: 22, background: `linear-gradient(135deg, ${o.color})`, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 800, color: '#fff', flexShrink: 0 }}>{o.initials}</div>
                <span style={{ fontSize: 11, fontWeight: o.id === activeOrg ? 700 : 500, color: o.id === activeOrg ? 'var(--accent-blue)' : 'var(--text-secondary)' }}>{o.name}</span>
                {o.id === activeOrg && <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--accent-blue)' }}>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">MAIN</div>
        <div className={`sidebar-item${activePage === 'dashboard' ? ' active' : ''}`} onClick={nav('dashboard')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Dashboard
        </div>
        <div className={`sidebar-item${activePage === 'assets' ? ' active' : ''}`} onClick={nav('assets')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
          Assets
        </div>
        {/* <div className={`sidebar-item${activePage === 'compare' ? ' active' : ''}`} onClick={nav('compare')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          Compare
        </div> */}
        <div className={`sidebar-item${activePage === 'components' ? ' active' : ''}`} onClick={nav('components')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
          Components
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">SECURITY</div>
        <div className={`sidebar-item${activePage === 'license' ? ' active' : ''}`} onClick={nav('license')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="14" r="2"/><path d="M20 20a2 2 0 1 0-4 0"/></svg>
          License
        </div>
        <div className={`sidebar-item${activePage === 'vulnerabilities' ? ' active' : ''}`} onClick={nav('vulnerabilities')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Vulnerabilities
        </div>
        <div className={`sidebar-item${activePage === 'reports' ? ' active' : ''}`} onClick={nav('reports')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          Reports
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-label">MANAGEMENT</div>
        <div className={`sidebar-item${activePage === 'notifications' ? ' active' : ''}`} onClick={nav('notifications')} style={{ position: 'relative' }}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          Notifications
          <span style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', width: 7, height: 7, borderRadius: '50%', background: '#f85149', boxShadow: '0 0 6px #f85149' }}/>
        </div>
      </div>

      <div style={{ marginTop: 'auto', padding: '12px 0', borderTop: '1px solid var(--border)' }}>
        <div className="sidebar-item">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          Help
        </div>
        <div className="sidebar-item">
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Logout
        </div>
      </div>
    </div>
  )
}
