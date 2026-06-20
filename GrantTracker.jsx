import React, { useState } from 'react'
import { TEAM, STATUSES, UBF_THEMES, BATCHES } from '../lib/constants.js'
import { daysLeft, urgencyStyle, batchStyle, statusStyle, formatDate, classifyBatch } from '../lib/helpers.js'

export default function GrantTracker({ grants, onAdd, onUpdate, onDelete, user }) {
  const [view, setView] = useState('list') // list | detail | add
  const [selected, setSelected] = useState(null)
  const [filterBatch, setFilterBatch]   = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(defaultForm())
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  function defaultForm() {
    return {
      name: '', donor: '', deadline: '', size: '',
      highUsd: '', lowUsd: '', geo: '', themes: [],
      link: '', notes: '', priority: 'medium', assignee: '',
    }
  }

  const filtered = grants.filter(g => {
    if (filterBatch !== 'all' && g.batch !== parseInt(filterBatch)) return false
    if (filterStatus !== 'all' && g.status !== filterStatus) return false
    if (search && !g.name.toLowerCase().includes(search.toLowerCase()) &&
        !g.donor?.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const handleAdd = () => {
    if (!form.name.trim() || !form.donor.trim()) return alert('Grant name and donor are required.')
    const data = {
      ...form,
      highUsd: parseFloat(form.highUsd) || 0,
      lowUsd:  parseFloat(form.lowUsd)  || 0,
      batch:   classifyBatch(parseFloat(form.highUsd) || 0),
    }
    onAdd(data)
    setForm(defaultForm())
    setView('list')
  }

  const handleUpdate = (id, patch) => {
    onUpdate(id, patch)
    if (selected?.id === id) setSelected(prev => ({ ...prev, ...patch }))
  }

  const handleDelete = (id) => {
    onDelete(id)
    setDeleteConfirm(null)
    setView('list')
    setSelected(null)
  }

  const openDetail = (g) => { setSelected(g); setView('detail') }

  // ── ADD FORM ──────────────────────────────────────────────────────────────
  if (view === 'add') return (
    <div className="animate-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <button onClick={() => setView('list')} style={backBtn}>← Back</button>
        <h1 style={pageTitle}>Add New Grant</h1>
      </div>
      <div style={{ background: 'white', borderRadius: 14, padding: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Grant / Program Name *">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. EU/AICS Sustainable Forests Uganda" />
          </Field>
          <Field label="Donor / Funder *">
            <input value={form.donor} onChange={e => setForm(p => ({ ...p, donor: e.target.value }))} placeholder="e.g. Italian Agency Dev. Cooperation" />
          </Field>
          <Field label="Deadline (Date)">
            <input type="date" value={form.deadline} onChange={e => setForm(p => ({ ...p, deadline: e.target.value }))} />
          </Field>
          <Field label="Grant Size (Display text)">
            <input value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))} placeholder="e.g. €3,000,000–€4,000,000" />
          </Field>
          <Field label="Maximum Value in USD (for Batch classification)">
            <input type="number" value={form.highUsd} onChange={e => setForm(p => ({ ...p, highUsd: e.target.value }))} placeholder="e.g. 4400000" />
            {form.highUsd && (
              <div style={{ fontSize: 11, color: batchStyle(classifyBatch(parseFloat(form.highUsd))).color, marginTop: 4 }}>
                → Will be classified as: {BATCHES[classifyBatch(parseFloat(form.highUsd))]?.label}
              </div>
            )}
          </Field>
          <Field label="Minimum Value in USD">
            <input type="number" value={form.lowUsd} onChange={e => setForm(p => ({ ...p, lowUsd: e.target.value }))} placeholder="e.g. 3300000" />
          </Field>
          <Field label="Geographic Coverage">
            <input value={form.geo} onChange={e => setForm(p => ({ ...p, geo: e.target.value }))} placeholder="e.g. Uganda only (Eastern Uganda / Karamoja)" />
          </Field>
          <Field label="Link to the Call (URL)">
            <input value={form.link} onChange={e => setForm(p => ({ ...p, link: e.target.value }))} placeholder="https://..." />
          </Field>
          <Field label="Priority">
            <select value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}>
              <option value="high">🔴 High</option>
              <option value="medium">🟡 Medium</option>
              <option value="low">🟢 Low</option>
            </select>
          </Field>
          <Field label="Assign Lead Person">
            <select value={form.assignee} onChange={e => setForm(p => ({ ...p, assignee: e.target.value }))}>
              <option value="">Unassigned</option>
              {TEAM.map(t => <option key={t.id} value={t.email}>{t.name} — {t.role}</option>)}
            </select>
          </Field>
        </div>
        <Field label="Thematic Areas (select all that apply)" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
            {UBF_THEMES.map(t => {
              const checked = form.themes.includes(t)
              return (
                <button key={t} onClick={() => setForm(p => ({ ...p, themes: checked ? p.themes.filter(x => x !== t) : [...p.themes, t] }))}
                  style={{ padding: '4px 10px', borderRadius: 20, fontSize: 11, border: `1.5px solid ${checked ? '#2E7D32' : '#E0E0E0'}`, background: checked ? '#E8F5E9' : 'white', color: checked ? '#2E7D32' : '#666', cursor: 'pointer', fontWeight: checked ? 500 : 400 }}>
                  {t}
                </button>
              )
            })}
          </div>
        </Field>
        <Field label="Notes / Action Items" style={{ marginTop: 16 }}>
          <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} rows={3} placeholder="Key watch-outs, next steps, eligibility notes..." />
        </Field>
        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button onClick={handleAdd} style={primaryBtn}>✅ Add Grant</button>
          <button onClick={() => { setForm(defaultForm()); setView('list') }} style={ghostBtn}>Cancel</button>
        </div>
      </div>
    </div>
  )

  // ── GRANT DETAIL ──────────────────────────────────────────────────────────
  if (view === 'detail' && selected) {
    const grant = grants.find(g => g.id === selected.id) || selected
    const days = daysLeft(grant.deadline)
    const us = urgencyStyle(days)
    const bs = batchStyle(grant.batch)
    const ss = statusStyle(grant.status)
    const assignee = TEAM.find(t => t.email === grant.assignee)

    return (
      <div className="animate-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
          <button onClick={() => setView('list')} style={backBtn}>← Back to Tracker</button>
        </div>
        <div style={{ background: 'white', borderRadius: 14, padding: 28, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          {/* Header badges */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <span style={{ padding: '3px 10px', borderRadius: 20, background: bs.bg, color: bs.color, fontSize: 11, fontWeight: 600 }}>{bs.label}</span>
            <span style={{ padding: '3px 10px', borderRadius: 20, background: us.bg, color: us.color, fontSize: 11, fontWeight: 600 }}>{us.label}</span>
            <span style={{ padding: '3px 10px', borderRadius: 20, background: ss.bg, color: ss.color, fontSize: 11, fontWeight: 600 }}>{grant.status}</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1B2E1B', marginBottom: 4 }}>{grant.name}</h2>
          <div style={{ fontSize: 13, color: '#666', marginBottom: 22 }}>{grant.donor}</div>

          {/* Info grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 22 }}>
            {[
              { label: 'Deadline', value: formatDate(grant.deadline) },
              { label: 'Grant Size', value: grant.size || '—' },
              { label: 'Geography', value: grant.geo || '—' },
            ].map((f, i) => (
              <div key={i} style={{ padding: 14, background: '#F8F9F8', borderRadius: 10 }}>
                <div style={{ fontSize: 10, color: '#888', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 4 }}>{f.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#1B2E1B' }}>{f.value}</div>
              </div>
            ))}
          </div>

          {/* Themes */}
          {grant.themes?.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={fieldLabel}>Thematic Areas</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                {grant.themes.map(t => (
                  <span key={t} style={{ padding: '4px 10px', borderRadius: 20, background: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          {/* Editable fields */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 18 }}>
            <div>
              <div style={fieldLabel}>Status</div>
              <select value={grant.status} onChange={e => handleUpdate(grant.id, { status: e.target.value })} style={{ marginTop: 6 }}>
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={fieldLabel}>Lead Person</div>
              <select value={grant.assignee || ''} onChange={e => handleUpdate(grant.id, { assignee: e.target.value })} style={{ marginTop: 6 }}>
                <option value="">Unassigned</option>
                {TEAM.map(t => <option key={t.id} value={t.email}>{t.name} — {t.role}</option>)}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <div style={fieldLabel}>Notes / Action Items</div>
            <textarea
              defaultValue={grant.notes}
              onBlur={e => handleUpdate(grant.id, { notes: e.target.value })}
              rows={3}
              placeholder="Add notes, action items, watch-outs..."
              style={{ marginTop: 6 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {grant.link && (
              <a href={grant.link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: '#1B5E20', color: 'white', borderRadius: 9, textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
                🔗 Open Official Grant Page
              </a>
            )}
            {deleteConfirm === grant.id ? (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#C62828' }}>Are you sure?</span>
                <button onClick={() => handleDelete(grant.id)} style={{ ...primaryBtn, background: '#C62828' }}>Yes, Delete</button>
                <button onClick={() => setDeleteConfirm(null)} style={ghostBtn}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setDeleteConfirm(grant.id)} style={{ ...ghostBtn, color: '#C62828', borderColor: '#FFCDD2' }}>🗑 Delete Grant</button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── GRANTS LIST ──────────────────────────────────────────────────────────
  return (
    <div className="animate-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h1 style={pageTitle}>📋 Grant Tracker</h1>
        <button onClick={() => setView('add')} style={primaryBtn}>+ Add Grant</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search grants..." style={{ width: 220 }} />
        <select value={filterBatch} onChange={e => setFilterBatch(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Batches</option>
          <option value="1">Batch 1 ($1K–$100K)</option>
          <option value="2">Batch 2 ($100K–$1M)</option>
          <option value="3">Batch 3 ($1M+)</option>
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 'auto' }}>
          <option value="all">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 12, color: '#888', alignSelf: 'center' }}>
          {filtered.length} of {grants.length} grants
        </span>
      </div>

      {grants.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 14, padding: '56px 24px', textAlign: 'center', boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 40, marginBottom: 14 }}>📭</div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#1B2E1B', marginBottom: 8 }}>No grants yet</div>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>Add your first grant opportunity to start tracking.</div>
          <button onClick={() => setView('add')} style={primaryBtn}>+ Add First Grant</button>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 100px 100px 120px 100px 70px', gap: 8, padding: '11px 18px', borderBottom: '1px solid #F0F0F0', fontSize: 10, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Grant</span><span>Deadline</span><span>Batch</span><span>Status</span><span>Lead</span><span></span>
          </div>
          {filtered.map(g => {
            const days = daysLeft(g.deadline)
            const us = urgencyStyle(days)
            const bs = batchStyle(g.batch)
            const ss = statusStyle(g.status)
            const assignee = TEAM.find(t => t.email === g.assignee)
            return (
              <div key={g.id}
                style={{ display: 'grid', gridTemplateColumns: '2fr 100px 100px 120px 100px 70px', gap: 8, padding: '11px 18px', borderBottom: '1px solid #FAFAFA', alignItems: 'center', cursor: 'pointer', transition: 'background 0.1s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                onMouseLeave={e => e.currentTarget.style.background = 'white'}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#1B2E1B', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{g.donor}</div>
                </div>
                <span style={{ padding: '2px 7px', borderRadius: 20, background: us.bg, color: us.color, fontSize: 10, fontWeight: 600, display: 'inline-block' }}>{us.label}</span>
                <span style={{ padding: '2px 7px', borderRadius: 20, background: bs.bg, color: bs.color, fontSize: 10, fontWeight: 600, display: 'inline-block' }}>B{g.batch}</span>
                <span style={{ padding: '2px 7px', borderRadius: 6, background: ss.bg, color: ss.color, fontSize: 10, fontWeight: 500, display: 'inline-block' }}>{g.status}</span>
                <div>
                  {assignee ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 6, background: assignee.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 9, fontWeight: 700 }}>{assignee.avatar}</div>
                      <span style={{ fontSize: 10, color: '#555' }}>{assignee.name}</span>
                    </div>
                  ) : <span style={{ fontSize: 10, color: '#CCC' }}>—</span>}
                </div>
                <button onClick={() => openDetail(g)} style={{ fontSize: 11, padding: '5px 10px', background: '#E8F5E9', border: 'none', borderRadius: 7, color: '#2E7D32', cursor: 'pointer', fontWeight: 500 }}>View →</button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function Field({ label, children, style = {} }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>{label}</label>
      {children}
    </div>
  )
}

const fieldLabel = { fontSize: 11, fontWeight: 600, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }
const pageTitle  = { fontSize: 20, fontWeight: 700, color: '#1B2E1B', margin: 0 }
const backBtn    = { fontSize: 12, padding: '7px 14px', background: 'white', border: '1.5px solid #E0E0E0', borderRadius: 8, cursor: 'pointer', color: '#555' }
const primaryBtn = { padding: '9px 20px', background: '#1B5E20', color: 'white', border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 500, cursor: 'pointer' }
const ghostBtn   = { padding: '9px 18px', background: 'white', color: '#555', border: '1.5px solid #E0E0E0', borderRadius: 9, fontSize: 13, cursor: 'pointer' }
