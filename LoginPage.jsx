import React from 'react'
import { TEAM } from '../lib/constants.js'
import { UBF_LOGO } from '../lib/logo_b64.js'

export default function LoginPage({ onLogin }) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #1B5E20 0%, #2E7D32 45%, #1565C0 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        background: 'white', borderRadius: 20, padding: '40px 36px',
        width: '100%', maxWidth: 440,
        boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img
            src={UBF_LOGO}
            alt="Uganda Biodiversity Fund Logo"
            style={{ height: 120, objectFit: 'contain', marginBottom: 4 }}
          />
          <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
            Grants Intelligence Platform
          </div>
        </div>

        <div style={{
          fontSize: 11, fontWeight: 600, color: '#888',
          textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12,
        }}>
          Sign in — select your name
        </div>

        {TEAM.map(user => (
          <button
            key={user.id}
            onClick={() => onLogin(user)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 14px', border: '1.5px solid #E8E8E8',
              borderRadius: 12, background: 'white', cursor: 'pointer',
              marginBottom: 8, transition: 'all 0.15s', textAlign: 'left',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = user.color
              e.currentTarget.style.background = '#F8FFF8'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#E8E8E8'
              e.currentTarget.style.background = 'white'
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: user.color, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: 13,
            }}>
              {user.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B' }}>
                {user.name}
              </div>
              <div style={{ fontSize: 11, color: '#888' }}>{user.role}</div>
            </div>
            <div style={{ fontSize: 18, color: '#CCC' }}>→</div>
          </button>
        ))}

        <div style={{
          marginTop: 20, padding: '12px 16px',
          background: '#F0F8F0', borderRadius: 10,
          fontSize: 11, color: '#558B55', lineHeight: 1.6,
        }}>
          🔒 This platform is for authorised UBF staff only.
          Your name and role determine what you can see and do.
          If you have any trouble, contact T. Otieno.
        </div>
      </div>
    </div>
  )
}
