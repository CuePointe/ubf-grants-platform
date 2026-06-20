import React, { useState, useCallback } from 'react'
import LoginPage    from './pages/LoginPage.jsx'
import Dashboard    from './pages/Dashboard.jsx'
import GrantTracker from './pages/GrantTracker.jsx'
import AgentPage    from './pages/AgentPage.jsx'
import PipelinePage from './pages/PipelinePage.jsx'
import TeamPage     from './pages/TeamPage.jsx'
import UserGuide    from './pages/UserGuide.jsx'
import Sidebar      from './components/Sidebar.jsx'
import Notification from './components/Notification.jsx'
import { useGrants } from './hooks/useGrants.js'
import { useAgent }  from './hooks/useAgent.js'
import { daysLeft }  from './lib/helpers.js'

export default function App() {
  const [user, setUser]       = useState(null)
  const [tab, setTab]         = useState('dashboard')
  const [notif, setNotif]     = useState(null)
  const [detailGrant, setDetailGrant] = useState(null)

  const { grants, addGrant, updateGrant, deleteGrant } = useGrants()
  const agent = useAgent(grants)

  const notify = useCallback((message, type = 'success') => {
    setNotif({ message, type, key: Date.now() })
  }, [])

  const handleAddGrant = useCallback((data) => {
    addGrant(data)
    notify('Grant added successfully!')
  }, [addGrant, notify])

  const handleUpdateGrant = useCallback((id, patch) => {
    updateGrant(id, patch)
    notify('Saved')
  }, [updateGrant, notify])

  const handleDeleteGrant = useCallback((id) => {
    deleteGrant(id)
    notify('Grant deleted', 'warn')
  }, [deleteGrant, notify])

  const handleViewGrant = useCallback((grant) => {
    setDetailGrant(grant)
    setTab('grants')
  }, [])

  const urgentCount = grants.filter(g => {
    const d = daysLeft(g.deadline)
    return d !== null && d >= 0 && d <= 21
  }).length

  // Login screen
  if (!user) {
    return (
      <>
        <LoginPage onLogin={(u) => {
          setUser(u)
          notify(`Welcome, ${u.name.split('.')[1]?.trim() || u.name}! 👋`)
        }} />
        {notif && (
          <Notification
            key={notif.key}
            message={notif.message}
            type={notif.type}
            onDone={() => setNotif(null)}
          />
        )}
      </>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        tab={tab}
        onTab={(t) => { setTab(t); setDetailGrant(null) }}
        user={user}
        onSwitch={() => { setUser(null); setTab('dashboard') }}
        urgentCount={urgentCount}
      />

      {/* Main content */}
      <main style={{ marginLeft: 220, flex: 1, padding: '28px 32px', minHeight: '100vh', background: '#F0F4F0' }}>
        {tab === 'dashboard' && (
          <Dashboard
            grants={grants}
            user={user}
            onViewGrant={handleViewGrant}
            onNavigate={setTab}
          />
        )}
        {tab === 'grants' && (
          <GrantTracker
            grants={grants}
            onAdd={handleAddGrant}
            onUpdate={handleUpdateGrant}
            onDelete={handleDeleteGrant}
            user={user}
            initialDetail={detailGrant}
          />
        )}
        {tab === 'agent' && (
          <AgentPage
            grants={grants}
            user={user}
            agent={agent}
          />
        )}
        {tab === 'pipeline' && (
          <PipelinePage
            grants={grants}
            onViewGrant={handleViewGrant}
          />
        )}
        {tab === 'team' && (
          <TeamPage grants={grants} />
        )}
        {tab === 'guide' && (
          <UserGuide />
        )}
      </main>

      {/* Notifications */}
      {notif && (
        <Notification
          key={notif.key}
          message={notif.message}
          type={notif.type}
          onDone={() => setNotif(null)}
        />
      )}
    </div>
  )
}
