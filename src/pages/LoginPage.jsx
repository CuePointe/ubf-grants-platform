import React, { useState } from 'react'
import { TEAM } from '../lib/constants.js'

export default function LoginPage({ onLogin }) {
  const [selected, setSelected] = useState('')
  const [error, setError] = useState('')

  const handleLogin = () => {
    const member = TEAM.find(m => m.id === selected)
    if (!member) { setError('Please select your name'); return }
    onLogin(member)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a6b3c 0%, #2d9b5e 50%, #1a6b3c 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '48px 40px',
        width: '100%',
        maxWidth: 420,
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        textAlign: 'center',
        animation: 'fadeIn 0.3s ease',
      }}>
        {/* Logo area */}
        <div style={{
          width: 72, height: 72,
          background: '#1a6b3c',
          borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, margin: '0 auto 20px',
        }}>🌿</div>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c', marginBottom: 4 }}>
          UBF Grants Platform
        </h1>
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 32 }}>
          Uganda Biodiversity Fund — Grants Intelligence System
        </p>

        <div style={{ textAlign: 'left', marginBottom: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6, display: 'block' }}>
            Select your name
          </label>
          <select
            value={selected}
            onChange={e => { setSelected(e.target.value); setError('') }}
            style={{
              width: '100%', padding: '11px 14px',
              border: `1.5px solid ${error ? '#ef4444' : '#e2e8f0'}`,
              borderRadius: 8, fontSize: 14, background: '#fff',
              outline: 'none', cursor: 'pointer',
            }}
          >
            <option value=''>— Select team member —</option>
            {TEAM.map(m => (
              <option key={m.id} value={m.id}>{m.name} — {m.role}</option>
            ))}
          </select>
          {error && <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{error}</p>}
        </div>

        <button
          onClick={handleLogin}
          style={{
            width: '100%', padding: '12px',
            background: '#1a6b3c', color: '#fff',
            border: 'none', borderRadius: 8,
            fontSize: 14, fontWeight: 600,
            cursor: 'pointer', marginTop: 8,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.target.style.background = '#15583201' || (e.target.style.background = '#155832')}
          onMouseLeave={e => e.target.style.background = '#1a6b3c'}
        >
          Sign In
        </button>

        <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 24 }}>
          For now and the future · Uganda Biodiversity Fund
        </p>
      </div>
    </div>
  )
}
