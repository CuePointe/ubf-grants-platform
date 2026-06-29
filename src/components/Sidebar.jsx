import React from 'react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard',    icon: '⊞' },
  { id: 'grants',    label: 'Grant Tracker', icon: '📋' },
  { id: 'agent',     label: 'AI Agent',      icon: '🤖' },
  { id: 'pipeline',  label: 'Pipeline',      icon: '📅' },
  { id: 'team',      label: 'Team View',     icon: '👥' },
  { id: 'guide',     label: 'User Guide',    icon: '📖' },
]

export default function Sidebar({ tab, onTab, user, onSwitch, urgentCount }) {
  return (
    <aside style={{
      width: 220,
      background: '#1a6b3c',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0, left: 0, bottom: 0,
      zIndex: 100,
    }}>
      {/* Logo / brand */}
      <div style={{ padding: '20px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.3 }}>🌿 UBF Grants</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>
          Intelligence Platform
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {NAV.map(({ id, label, icon }) => {
          const active = tab === id
          const showBadge = id === 'pipeline' && urgentCount > 0
          return (
            <button
              key={id}
              onClick={() => onTab(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '9px 12px',
                borderRadius: 8,
                border: 'none',
                background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.72)',
                fontWeight: active ? 600 : 400,
                fontSize: 13,
                cursor: 'pointer',
                marginBottom: 2,
                textAlign: 'left',
                transition: 'background 0.15s',
                position: 'relative',
              }}
            >
              <span style={{ fontSize: 15 }}>{icon}</span>
              <span style={{ flex: 1 }}>{label}</span>
              {showBadge && (
                <span style={{
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: 10,
                  fontWeight: 700,
                  padding: '1px 5px',
                  borderRadius: 10,
                  minWidth: 18,
                  textAlign: 'center',
                }}>{urgentCount}</span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User info */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        fontSize: 12,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 2 }}>{user?.name}</div>
        <div style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 8, fontSize: 11 }}>{user?.role}</div>
        <button
          onClick={onSwitch}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: 'rgba(255,255,255,0.8)',
            borderRadius: 6,
            padding: '5px 10px',
            fontSize: 11,
            cursor: 'pointer',
            width: '100%',
          }}
        >
          Switch User
        </button>
      </div>
    </aside>
  )
}
