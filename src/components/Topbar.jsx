import React from 'react'

export default function Topbar() {
  return (
    <div className="topbar">
      <input className="search-bar" type="text" placeholder="🔍 Search components, CVEs, applications..." />
      <div className="topbar-right">
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Hello,</span>
        <span className="badge badge-blue">PRO</span>
        <span className="badge badge-green">ADMIN</span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>M1.1</span>
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />
        {[
          <path key="bell" d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>,
          <><circle key="gc" cx="12" cy="12" r="3"/><path key="gp" d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></>,
        ].map((paths, i) => (
          <div key={i} style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
            <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24">{paths}</svg>
          </div>
        ))}
        <div className="avatar" style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 8px rgba(34,197,94,0.4)' }}>A</div>
      </div>
    </div>
  )
}
