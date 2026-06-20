import React from 'react'
import { daysLeft, urgencyStyle, batchStyle, formatCurrency } from '../lib/helpers.js'
import { UBF_THEMES, BATCHES } from '../lib/constants.js'

export default function Dashboard({ grants, user, onViewGrant, onNavigate }) {
  const urgent  = grants.filter(g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 && d <= 21 })
  const totalMax = grants.reduce((s, g) => s + (g.highUsd || 0), 0)
  const b3       = grants.filter(g => g.batch === 3)
  const awarded  = grants.filter(g => g.status === 'Awarded')

  return (
    <div className="animate-in">
      {/* Welcome */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#1B2E1B', letterSpacing: -0.3 }}>
          Welcome, {user.name.split('.')[1]?.trim() || user.name} 👋
        </h1>
        <p style={{ color: '#666', marginTop: 4 }}>
          Uganda Biodiversity Fund — Grants Intelligence Overview
        </p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Grants',       value: grants.length,               icon: '📋', color: '#1B5E20', bg: '#E8F5E9' },
          { label: 'Funding Potential',  value: `${formatCurrency(totalMax)}+`, icon: '💰', color: '#0D47A1', bg: '#E3F2FD' },
          { label: 'Urgent (≤21 days)',  value: urgent.length,               icon: '🔴', color: '#C62828', bg: '#FFEBEE' },
          { label: 'Awarded',            value: awarded.length,              icon: '✅', color: '#2E7D32', bg: '#E8F5E9' },
        ].map((k, i) => (
          <div key={i} style={{
            background: 'white', borderRadius: 14, padding: '18px 20px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 6 }}>
                  {k.label}
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: k.color }}>
                  {k.value}
                </div>
              </div>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>
                {k.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* Urgent Deadlines */}
        <div style={{ background: 'white', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B' }}>⚠️ Urgent Deadlines</h2>
            <span style={{ fontSize: 11, color: '#888' }}>Next 21 days</span>
          </div>
          {grants.length === 0 ? (
            <Empty text="No grants yet. Add your first grant to get started." />
          ) : urgent.length === 0 ? (
            <div style={{ color: '#888', fontSize: 12, textAlign: 'center', padding: '28px 0' }}>
              🎉 No urgent deadlines right now
            </div>
          ) : (
            urgent
              .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
              .map(g => {
                const days = daysLeft(g.deadline)
                const us = urgencyStyle(days)
                const bs = batchStyle(g.batch)
                return (
                  <div
                    key={g.id}
                    onClick={() => onViewGrant(g)}
                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '1px solid #F5F5F5', cursor: 'pointer' }}
                  >
                    <span style={{ padding: '2px 8px', borderRadius: 20, background: us.bg, color: us.color, fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {us.label}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: '#1B2E1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {g.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#888' }}>{g.donor}</div>
                    </div>
                    <span style={{ fontSize: 10, color: bs.color, fontWeight: 600, background: bs.bg, padding: '2px 7px', borderRadius: 10, whiteSpace: 'nowrap' }}>
                      B{g.batch}
                    </span>
                  </div>
                )
              })
          )}
        </div>

        {/* Funding by Batch */}
        <div style={{ background: 'white', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B', marginBottom: 16 }}>💰 Funding by Batch</h2>
          {[1, 2, 3].map(b => {
            const bg = grants.filter(g => g.batch === b)
            const max = bg.reduce((s, g) => s + (g.highUsd || 0), 0)
            const pct = totalMax > 0 ? Math.round(max / totalMax * 100) : 0
            const bs = batchStyle(b)
            return (
              <div key={b} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, color: bs.color, fontWeight: 500 }}>{bs.label}</span>
                  <span style={{ fontSize: 11, color: '#666' }}>{bg.length} · {formatCurrency(max)}</span>
                </div>
                <div style={{ height: 7, background: '#F0F0F0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: bs.color, borderRadius: 4, transition: 'width 0.8s ease' }} />
                </div>
              </div>
            )
          })}
          <div style={{ marginTop: 16, padding: '12px 14px', background: '#E8F5E9', borderRadius: 10 }}>
            <div style={{ fontSize: 10, color: '#2E7D32', fontWeight: 500, marginBottom: 2 }}>Total Maximum Potential</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#1B5E20' }}>{formatCurrency(totalMax)}+</div>
          </div>
        </div>
      </div>

      {/* Themes Coverage */}
      {grants.length > 0 && (
        <div style={{ background: 'white', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B', marginBottom: 14 }}>🎯 UBF Strategic Theme Coverage</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {UBF_THEMES.map(theme => {
              const count = grants.filter(g => g.themes?.includes(theme)).length
              return (
                <div key={theme} style={{
                  padding: '4px 11px', borderRadius: 20, fontSize: 11,
                  background: count > 0 ? '#E8F5E9' : '#F5F5F5',
                  border: `1px solid ${count > 0 ? '#81C784' : '#E0E0E0'}`,
                  color: count > 0 ? '#2E7D32' : '#9E9E9E',
                  fontWeight: count > 0 ? 500 : 400,
                }}>
                  {theme} {count > 0 && <strong>({count})</strong>}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Empty state */}
      {grants.length === 0 && (
        <div style={{ background: 'white', borderRadius: 14, padding: '48px 24px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#1B2E1B', marginBottom: 8 }}>
            Your grants tracker is empty
          </div>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 20, maxWidth: 380, margin: '0 auto 20px' }}>
            Start by adding your first grant opportunity. Use the AI Agent to help search for grants aligned with UBF's priorities.
          </div>
          <button
            onClick={() => onNavigate('grants')}
            style={{ padding: '10px 24px', background: '#1B5E20', color: 'white', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 500, cursor: 'pointer' }}
          >
            + Add First Grant
          </button>
        </div>
      )}
    </div>
  )
}

function Empty({ text }) {
  return (
    <div style={{ color: '#888', fontSize: 12, textAlign: 'center', padding: '20px 0' }}>
      {text}
    </div>
  )
}
