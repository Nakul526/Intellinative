import React, { useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import Assets from './components/Assets'
import Components from './components/Components'
import License from './components/License'
import Notifications from './components/Notifications'
import Vulnerabilities from './components/Vulnerabilities'
import Reports from './components/Reports'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [osFilter, setOsFilter] = useState('Linux')
  const [activeOrg, setActiveOrg] = useState('acme')

  return (
    <ThemeProvider>
      <div className="dashboard-layout">
        <Sidebar activePage={activePage} onNavigate={setActivePage} activeOrg={activeOrg} setActiveOrg={setActiveOrg} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar osFilter={osFilter} setOsFilter={setOsFilter} />
          {activePage === 'dashboard'       && <Dashboard osFilter={osFilter} activeOrg={activeOrg} />}
          {activePage === 'assets'          && <Assets osFilter={osFilter} />}
          {activePage === 'components'      && <Components osFilter={osFilter} />}
          {activePage === 'license'         && <License />}
          {activePage === 'notifications'   && <Notifications />}
          {activePage === 'vulnerabilities' && <Vulnerabilities osFilter={osFilter} activeOrg={activeOrg} />}
          {activePage === 'reports'         && <Reports osFilter={osFilter} activeOrg={activeOrg} />}
        </div>
      </div>
    </ThemeProvider>
  )
}
