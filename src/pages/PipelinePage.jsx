import React, { useState } from 'react'
import { daysLeft, formatDate, urgencyColor, statusColor, formatCurrency, sortByDeadline } from '../lib/helpers.js'

const BANDS = [
  { label: 'Overdue',     test: d => d !== null && d < 0,           color: '#94a3b8' },
  { label: 'This Week',   test: d => d !== null && d >= 0 && d <= 7,  color: '#ef4444' },
  { label: 'Next 2 Weeks',test: d => d !== null && d > 7 && d <= 21, color: '#f97316' },
  { label: 'This Month',  test: d => d !== null && d > 21 && d <= 60, color: '#eab308' },
  { label: 'Upcoming',    test: d => d !== null && d > 60,            color: '#22c55e' },
  { label: 'No Deadline', test: d => d === null,                      color: '#cbd5e1' },
]

function GrantCard({ grant, onClick }) {
  const d = daysLeft(grant.deadline)
  const color = urgencyColor(d)
  return (
    <div
      onClick={() => onClick(grant)}
      style={{
        background: '#fff', borderRadius: 8, padding: '12px 14px',
        border: `1.5px solid ${color}33`,
        borderLeft: `3px solid ${color}`,
        cursor: 'pointer', marginBottom: 8,
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4, lineHeight: 1.4 }}>{grant.name}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        {grant.donor && <span style={{ fontSize: 11, color: '#64748b' }}>{grant.donor}</span>}
        {grant.deadline && (
          <span style={{ fontSize: 11, fontWeight: 700, color }}>
            {d === null ? '' : d < 0 ? `${Math.abs(d)}d overdue` : d === 0 ? 'TODAY' : `${d}d · ${formatDate(grant.deadline)}`}
          </span>
        )}
        <span style={{
          fontSize: 10, padding: '1px 6px', borderRadius: 4,
          background: statusColor(grant.status) + '22', color: statusColor(grant.status),
          fontWeight: 600, marginLeft: 'auto',
        }}>{grant.status}</span>
      </div>
      {grant.assignee && (
        <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 3 }}>👤 {grant.assignee}</div>
      )}
    </div>
  )
}

export default function PipelinePage({ grants, onViewGrant }) {
  const [showAll, setShowAll] = useState(false)

  const sorted = sortByDeadline(grants)
  const active = sorted.filter(g => g.status !== 'Awarded' && g.status !== 'Rejected')

  const bandedGrants = BANDS.map(band => ({
    ...band,
    grants: active.filter(g => band.test(daysLeft(g.deadline))),
  })).filter(b => b.grants.length > 0 || b.label === 'This Week')

  const awarded = grants.filter(g => g.status === 'Awarded')
  const totalPipeline = active.filter(g => g.high_usd).reduce((s, g) => s + g.high_usd, 0)
  const totalAwarded = awarded.filter(g => g.high_usd).reduce((s, g) => s + g.high_usd, 0)

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>Pipeline Calendar</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
          Deadlines organised by urgency · {active.length} active grants
        </p>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12, marginBottom: 24 }}>
        {BANDS.slice(0, 4).map(band => {
          const count = active.filter(g => band.test(daysLeft(g.deadline))).length
          return (
            <div key={band.label} style={{
              background: '#fff', borderRadius: 10, padding: '14px 18px',
              borderLeft: `4px solid ${band.color}`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: band.color }}>{count}</div>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 500 }}>{band.label}</div>
            </div>
          )
        })}
      </div>

      {/* Value summary */}
      {(totalPipeline > 0 || totalAwarded > 0) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          {totalPipeline > 0 && (
            <div style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>Active Pipeline Value</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#3b82f6' }}>{formatCurrency(totalPipeline)}</div>
            </div>
          )}
          {totalAwarded > 0 && (
            <div style={{ background: '#fff', borderRadius: 10, padding: '14px 18px', boxShadow: '0 1px 3px rgba(0,0,0,0.07)' }}>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 2 }}>Total Awarded</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#22c55e' }}>{formatCurrency(totalAwarded)}</div>
            </div>
          )}
        </div>
      )}

      {/* Bands */}
      {active.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <p style={{ fontSize: 15 }}>No active grants in pipeline yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
          {bandedGrants.map(band => (
            <div key={band.label}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
              }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: band.color }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{band.label}</span>
                <span style={{
                  fontSize: 11, padding: '1px 7px', borderRadius: 10,
                  background: band.color + '22', color: band.color, fontWeight: 600,
                }}>{band.grants.length}</span>
              </div>
              {band.grants.length === 0 ? (
                <div style={{ padding: '14px', borderRadius: 8, border: '1.5px dashed #e2e8f0', color: '#94a3b8', fontSize: 12, textAlign: 'center' }}>
                  None
                </div>
              ) : (
                band.grants.map(g => <GrantCard key={g.id} grant={g} onClick={onViewGrant} />)
              )}
            </div>
          ))}
        </div>
      )}

      {/* Awarded section */}
      {awarded.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div
            onClick={() => setShowAll(s => !s)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: '#22c55e' }}>
              🏆 Awarded Grants ({awarded.length})
            </span>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{showAll ? '▲ hide' : '▼ show'}</span>
          </div>
          {showAll && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 10 }}>
              {awarded.map(g => (
                <div
                  key={g.id}
                  onClick={() => onViewGrant(g)}
                  style={{
                    background: '#f0fdf4', borderRadius: 8, padding: '12px 14px',
                    borderLeft: '3px solid #22c55e', cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                    {g.donor}{g.high_usd ? ` · ${formatCurrency(g.high_usd)}` : ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
