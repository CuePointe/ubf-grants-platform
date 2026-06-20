import React from 'react'
import { daysLeft, urgencyStyle, batchStyle, formatDate } from '../lib/helpers.js'

const MONTH_GROUPS = [
  { label: 'This Week',    filter: g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 && d <= 7 } },
  { label: 'This Month',   filter: g => { const d = daysLeft(g.deadline); return d !== null && d > 7 && d <= 30 } },
  { label: 'Next 3 Months',filter: g => { const d = daysLeft(g.deadline); return d !== null && d > 30 && d <= 90 } },
  { label: 'Later',        filter: g => { const d = daysLeft(g.deadline); return d !== null && d > 90 } },
  { label: 'Rolling / No Deadline', filter: g => daysLeft(g.deadline) === null },
]

export default function PipelinePage({ grants, onViewGrant }) {
  return (
    <div className="animate-in">
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1B2E1B', margin: 0 }}>📅 Grant Pipeline Calendar</h1>
        <p style={{ color: '#666', marginTop: 4, fontSize: 12 }}>All {grants.length} grants organised by deadline urgency</p>
      </div>

      {grants.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 14, padding: '56px 24px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>📅</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1B2E1B' }}>No grants in pipeline yet</div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>Add grants to see them organised by deadline here.</div>
        </div>
      ) : (
        MONTH_GROUPS.map(group => {
          const grouped = grants.filter(group.filter)
          if (grouped.length === 0) return null
          return (
            <div key={group.label} style={{ marginBottom: 26 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap' }}>
                  {group.label}
                </span>
                <div style={{ flex: 1, height: '1px', background: '#E8E8E8' }} />
                <span style={{ fontSize: 11, color: '#888', whiteSpace: 'nowrap' }}>
                  {grouped.length} grant{grouped.length > 1 ? 's' : ''}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
                {grouped
                  .sort((a, b) => {
                    const da = daysLeft(a.deadline)
                    const db = daysLeft(b.deadline)
                    if (da === null && db === null) return 0
                    if (da === null) return 1
                    if (db === null) return -1
                    return da - db
                  })
                  .map(g => {
                    const days = daysLeft(g.deadline)
                    const us = urgencyStyle(days)
                    const bs = batchStyle(g.batch)
                    return (
                      <div
                        key={g.id}
                        onClick={() => onViewGrant(g)}
                        style={{
                          background: 'white', borderRadius: 12, padding: '16px 18px',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                          borderLeft: `4px solid ${bs.color}`,
                          cursor: 'pointer', transition: 'box-shadow 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.1)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <span style={{ padding: '2px 8px', borderRadius: 20, background: us.bg, color: us.color, fontSize: 10, fontWeight: 600 }}>
                            {us.label}
                          </span>
                          <span style={{ padding: '2px 8px', borderRadius: 10, background: bs.bg, color: bs.color, fontSize: 10, fontWeight: 600 }}>
                            B{g.batch}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1B2E1B', lineHeight: 1.35, marginBottom: 5 }}>
                          {g.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{g.donor}</div>
                        <div style={{ fontSize: 11, color: '#555', fontWeight: 500 }}>{g.size}</div>
                        {g.deadline && (
                          <div style={{ fontSize: 10, color: '#AAA', marginTop: 6 }}>
                            📅 {formatDate(g.deadline)}
                          </div>
                        )}
                      </div>
                    )
                  })
                }
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}
