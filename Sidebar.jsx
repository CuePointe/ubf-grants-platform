import React from 'react'
import { UBF_LOGO } from '../lib/logo_b64.js'

const NAV = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'grants',    icon: '📋', label: 'Grant Tracker' },
  { id: 'agent',     icon: '🤖', label: 'AI Agent' },
  { id: 'pipeline',  icon: '📅', label: 'Pipeline' },
  { id: 'team',      icon: '👥', label: 'Team' },
  { id: 'guide',     icon: '📖', label: 'User Guide' },
]

export default function Sidebar({ tab, onTab, user, onSwitch, urgentCount }) {
  return (
    <div style={{
      position: 'fixed', left: 0, top: 0, bottom: 0, width: 220,
      background: '#0F1F10', display: 'flex', flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <img src={UBF_LOGO} alt="UBF Logo" style={{ width: '100%', maxHeight: 80, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {NAV.map(item => {
          const isActive = tab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 18px',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                border: 'none',
                borderLeft: isActive ? '3px solid #66BB6A' : '3px solid transparent',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer', fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                textAlign: 'left', position: 'relative',
              }}
            >
              <span style={{ fontSize: 15 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.id === 'dashboard' && urgentCount > 0 && (
                <span style={{
                  marginLeft: 'auto', background: '#C62828', color: 'white',
                  borderRadius: 10, fontSize: 10, fontWeight: 700,
                  padding: '1px 6px', minWidth: 18, textAlign: 'center',
                }}>
                  {urgentCount}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: user.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 12, flexShrink: 0 }}>
            {user.avatar}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ color: 'white', fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.role}</div>
          </div>
        </div>
        <button
          onClick={onSwitch}
          style={{ width: '100%', padding: '7px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: 11 }}
        >
          Switch User
        </button>
      </div>
    </div>
  )
}
