import React, { useState } from 'react'
import { ThemeProvider } from './ThemeContext'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './components/Dashboard'
import Assets from './components/Assets'
import Components from './components/Components'
import License from './components/License'
import Notifications from './components/Notifications'

export default function App() {
  const [activePage, setActivePage] = useState('dashboard')

  return (
    <ThemeProvider>
      <div className="dashboard-layout">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar />
          {activePage === 'dashboard'     && <Dashboard />}
          {activePage === 'assets'        && <Assets />}
          {activePage === 'components'    && <Components />}
          {activePage === 'license'       && <License />}
          {activePage === 'notifications' && <Notifications />}
        </div>
      </div>
    </ThemeProvider>
  )
}
