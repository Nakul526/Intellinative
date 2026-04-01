import React from 'react'
import { useTheme } from '../ThemeContext'

export default function Topbar({ osFilter, setOsFilter }) {
  const { isDark, toggle } = useTheme()
  const OS_OPTIONS = ['Linux', 'Windows', 'Mac']

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <svg width="13" height="13" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="search-bar" type="text" placeholder="Search components, files, applications..." style={{ paddingLeft: 30 }} />
        </div>
        {/* Machine OS filter pills */}
        <div style={{ display: 'flex', gap: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 8, padding: 3 }}>
          {OS_OPTIONS.map(os => {
            const active = osFilter === os
            return (
              <button
                key={os}
                onClick={() => setOsFilter(active ? null : os)}
                style={{
                  padding: '3px 10px', borderRadius: 6, border: 'none', fontSize: 10, fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.18s',
                  background: active ? 'var(--accent-blue)' : 'transparent',
                  color: active ? '#fff' : 'var(--text-muted)',
                  boxShadow: active ? '0 0 8px rgba(88,166,255,0.4)' : 'none',
                }}
              >
                {os}
              </button>
            )
          })}
        </div>
      </div>

      <div className="topbar-right">
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 2px' }} />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ width: 30, height: 30, borderRadius: 8, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: isDark ? '#f0d060' : '#3b82f6' }}
        >
          {isDark ? (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>

        {/* Notification bell */}
        <div style={{ position: 'relative', width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
          <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span style={{ position: 'absolute', top: 5, right: 5, width: 6, height: 6, borderRadius: '50%', background: '#f85149', border: '1.5px solid var(--bg-secondary)', boxShadow: '0 0 5px #f85149' }} />
        </div>

        {/* Settings */}
        <div style={{ width: 30, height: 30, borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s' }}>
          <svg width="14" height="14" fill="none" stroke="var(--text-secondary)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>
        </div>

        <div className="avatar" style={{ background: 'linear-gradient(135deg, #a855f7, #3b82f6)', boxShadow: '0 0 10px rgba(168,85,247,0.5)' }}>AD</div>
      </div>
    </div>
  )
}
