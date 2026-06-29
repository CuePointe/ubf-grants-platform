import React, { useState, useEffect } from 'react'
import { TEAM, THEMES, PROGRAM_WINDOWS, STATUSES, PRIORITIES, GEO_OPTIONS } from '../lib/constants.js'
import { daysLeft, formatDate, urgencyColor, statusColor, priorityColor, formatCurrency, sortByDeadline } from '../lib/helpers.js'

const EMPTY_FORM = {
  name: '', donor: '', deadline: '', size: '', high_usd: '', low_usd: '',
  status: 'Not Started', priority: 'medium', geo: '', themes: [],
  assignee: '', link: '', notes: '', batch: '',
}

function Badge({ text, color }) {
  return (
    <span style={{
      display: 'inline-block', padding: '2px 8px', borderRadius: 4,
      fontSize: 11, fontWeight: 600,
      background: color + '22', color,
    }}>{text}</span>
  )
}

function GrantForm({ initial = EMPTY_FORM, onSave, onCancel, title }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, ...initial })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const toggleTheme = (t) => {
    set('themes', form.themes.includes(t) ? form.themes.filter(x => x !== t) : [...form.themes, t])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onSave({
      ...form,
      high_usd: form.high_usd ? Number(form.high_usd) : null,
      low_usd: form.low_usd ? Number(form.low_usd) : null,
      batch: form.batch ? Number(form.batch) : null,
    })
  }

  const field = (label, key, type = 'text', opts = {}) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 5 }}>
        {label}{opts.required && ' *'}
      </label>
      {type === 'select' ? (
        <select value={form[key]} onChange={e => set(key, e.target.value)}>
          {opts.options?.map(o => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
              {typeof o === 'string' ? o : o.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          value={form[key]}
          onChange={e => set(key, e.target.value)}
          rows={3}
          style={{ resize: 'vertical' }}
          placeholder={opts.placeholder}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={e => set(key, e.target.value)}
          placeholder={opts.placeholder}
          required={opts.required}
        />
      )}
    </div>
  )

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: '#1a6b3c' }}>{title}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 20px' }}>
        <div style={{ gridColumn: '1 / -1' }}>
          {field('Grant / Opportunity Name', 'name', 'text', { required: true, placeholder: 'e.g. GEF Small Grants Programme' })}
        </div>
        {field('Donor / Funder', 'donor', 'text', { placeholder: 'e.g. GEF, USAID, EU' })}
        {field('Application Deadline', 'deadline', 'date')}
        {field('Grant Size', 'size', 'text', { placeholder: 'e.g. $50K–$200K' })}
        {field('Status', 'status', 'select', { options: STATUSES })}
        {field('Priority', 'priority', 'select', { options: PRIORITIES })}
        {field('Max Value (USD)', 'high_usd', 'number', { placeholder: '200000' })}
        {field('Min Value (USD)', 'low_usd', 'number', { placeholder: '50000' })}
        {field('Geography', 'geo', 'select', { options: ['', ...GEO_OPTIONS].map(g => ({ value: g, label: g || '— Select —' })) })}
        {field('Lead Assignee', 'assignee', 'select', {
          options: [{ value: '', label: '— Unassigned —' }, ...TEAM.map(m => ({ value: m.name, label: m.name + ' — ' + m.role }))]
        })}
        {field('Grant Link / URL', 'link', 'url', { placeholder: 'https://...' })}
        {field('Batch / Round', 'batch', 'number', { placeholder: 'e.g. 3' })}
      </div>

      {/* Themes */}
      <div style={{ marginBottom: 14 }}>
        <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>Themes</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {THEMES.map(t => (
            <label key={t} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '4px 10px', borderRadius: 6,
              background: form.themes.includes(t) ? '#1a6b3c' : '#f1f5f9',
              color: form.themes.includes(t) ? '#fff' : '#475569',
              cursor: 'pointer', fontSize: 12, fontWeight: 500,
              userSelect: 'none',
            }}>
              <input
                type="checkbox"
                style={{ display: 'none' }}
                checked={form.themes.includes(t)}
                onChange={() => toggleTheme(t)}
              />
              {form.themes.includes(t) ? '✓ ' : ''}{t}
            </label>
          ))}
        </div>
      </div>

      {field('Notes / Comments', 'notes', 'textarea', { placeholder: 'Key requirements, contacts, strategic notes...' })}

      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
        <button type="button" onClick={onCancel} style={{
          padding: '9px 18px', borderRadius: 7, border: '1.5px solid #e2e8f0',
          background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Cancel</button>
        <button type="submit" style={{
          padding: '9px 20px', borderRadius: 7, border: 'none',
          background: '#1a6b3c', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Save Grant</button>
      </div>
    </form>
  )
}

function GrantDetail({ grant, onEdit, onDelete, onClose }) {
  const d = daysLeft(grant.deadline)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a6b3c', marginBottom: 6 }}>{grant.name}</h2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Badge text={grant.status} color={statusColor(grant.status)} />
            <Badge text={grant.priority + ' priority'} color={priorityColor(grant.priority)} />
            {d !== null && d >= 0 && <Badge text={d === 0 ? 'Due TODAY' : `${d} days left`} color={urgencyColor(d)} />}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onEdit} style={{
            padding: '7px 14px', borderRadius: 7, border: '1.5px solid #e2e8f0',
            background: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Edit</button>
          <button onClick={onClose} style={{
            padding: '7px 14px', borderRadius: 7, border: 'none',
            background: '#f1f5f9', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}>Close</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px', marginBottom: 16 }}>
        {[
          ['Donor', grant.donor],
          ['Deadline', formatDate(grant.deadline)],
          ['Grant Size', grant.size],
          ['Max Value', grant.high_usd ? formatCurrency(grant.high_usd) : null],
          ['Geography', grant.geo],
          ['Assignee', grant.assignee],
          ['Batch / Round', grant.batch],
        ].filter(([, v]) => v).map(([k, v]) => (
          <div key={k}>
            <span style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600 }}>{k}</span>
            <div style={{ fontSize: 13, color: '#1e293b', fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>

      {grant.themes?.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 5 }}>THEMES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {grant.themes.map(t => (
              <span key={t} style={{
                padding: '3px 8px', borderRadius: 4, fontSize: 11,
                background: '#dcfce7', color: '#166534', fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </div>
      )}

      {grant.notes && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: '#94a3b8', fontWeight: 600, marginBottom: 5 }}>NOTES</div>
          <div style={{ fontSize: 13, color: '#334155', background: '#f8fafc', padding: '10px 14px', borderRadius: 8, lineHeight: 1.6 }}>
            {grant.notes}
          </div>
        </div>
      )}

      {grant.link && (
        <a href={grant.link} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          color: '#1a6b3c', fontSize: 13, fontWeight: 600,
        }}>
          🔗 Open Grant Link →
        </a>
      )}

      <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
        <button
          onClick={() => { if (window.confirm(`Delete "${grant.name}"?`)) onDelete(grant.id) }}
          style={{
            padding: '7px 14px', borderRadius: 7, border: '1.5px solid #fee2e2',
            background: '#fff', color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          }}
        >Delete Grant</button>
      </div>
    </div>
  )
}

export default function GrantTracker({ grants, onAdd, onUpdate, onDelete, user, initialDetail }) {
  const [view, setView] = useState('list')
  const [selected, setSelected] = useState(initialDetail || null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [sort, setSort] = useState('deadline')

  useEffect(() => {
    if (initialDetail) { setSelected(initialDetail); setView('detail') }
  }, [initialDetail])

  const filtered = grants
    .filter(g => {
      if (search) {
        const q = search.toLowerCase()
        return g.name?.toLowerCase().includes(q) || g.donor?.toLowerCase().includes(q) || g.notes?.toLowerCase().includes(q)
      }
      return true
    })
    .filter(g => !filterStatus || g.status === filterStatus)
    .filter(g => !filterPriority || g.priority === filterPriority)
    .sort((a, b) => {
      if (sort === 'deadline') {
        if (!a.deadline && !b.deadline) return 0
        if (!a.deadline) return 1
        if (!b.deadline) return -1
        return new Date(a.deadline) - new Date(b.deadline)
      }
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'priority') {
        const order = { high: 0, medium: 1, low: 2 }
        return (order[a.priority] ?? 1) - (order[b.priority] ?? 1)
      }
      return 0
    })

  const handleSaveNew = (data) => { onAdd(data); setView('list') }
  const handleSaveEdit = (data) => {
    onUpdate(selected.id, data)
    setSelected({ ...selected, ...data })
    setView('detail')
  }

  if (view === 'add') {
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 720, animation: 'fadeIn 0.2s ease' }}>
        <GrantForm title="Add New Grant" onSave={handleSaveNew} onCancel={() => setView('list')} />
      </div>
    )
  }

  if (view === 'edit' && selected) {
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 720, animation: 'fadeIn 0.2s ease' }}>
        <GrantForm title={`Edit: ${selected.name}`} initial={selected} onSave={handleSaveEdit} onCancel={() => setView('detail')} />
      </div>
    )
  }

  if (view === 'detail' && selected) {
    const live = grants.find(g => g.id === selected.id) || selected
    return (
      <div style={{ background: '#fff', borderRadius: 12, padding: 28, maxWidth: 720, animation: 'fadeIn 0.2s ease' }}>
        <GrantDetail
          grant={live}
          onEdit={() => setView('edit')}
          onDelete={(id) => { onDelete(id); setView('list'); setSelected(null) }}
          onClose={() => { setView('list'); setSelected(null) }}
        />
      </div>
    )
  }

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>Grant Tracker</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>{grants.length} grants in pipeline</p>
        </div>
        <button
          onClick={() => setView('add')}
          style={{
            background: '#1a6b3c', color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 18px', fontSize: 13,
            fontWeight: 600, cursor: 'pointer',
          }}
        >+ Add Grant</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search grants..."
          style={{ width: 220 }}
        />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 160 }}>
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)} style={{ width: 140 }}>
          <option value="">All Priorities</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 140 }}>
          <option value="deadline">Sort: Deadline</option>
          <option value="name">Sort: Name</option>
          <option value="priority">Sort: Priority</option>
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px 20px', color: '#94a3b8' }}>
          {grants.length === 0
            ? <p>No grants yet. Click <strong>+ Add Grant</strong> to get started.</p>
            : <p>No grants match your filters.</p>
          }
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                {['Grant Name', 'Donor', 'Deadline', 'Status', 'Priority', 'Assignee', 'Value'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontSize: 11, fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, i) => {
                const d = daysLeft(g.deadline)
                return (
                  <tr
                    key={g.id}
                    onClick={() => { setSelected(g); setView('detail') }}
                    style={{
                      borderBottom: '1px solid #f8fafc',
                      cursor: 'pointer',
                      background: i % 2 === 0 ? '#fff' : '#fafafa',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#fff' : '#fafafa'}
                  >
                    <td style={{ padding: '10px 14px', fontWeight: 600, fontSize: 13, maxWidth: 220 }}>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: '#475569' }}>{g.donor || '—'}</td>
                    <td style={{ padding: '10px 14px', fontSize: 12, whiteSpace: 'nowrap' }}>
                      {g.deadline ? (
                        <div>
                          <div style={{ color: urgencyColor(d), fontWeight: 600 }}>{formatDate(g.deadline)}</div>
                          {d !== null && d >= 0 && <div style={{ fontSize: 10, color: urgencyColor(d) }}>{d === 0 ? 'TODAY' : `${d}d`}</div>}
                        </div>
                      ) : '—'}
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge text={g.status} color={statusColor(g.status)} />
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <Badge text={g.priority} color={priorityColor(g.priority)} />
                    </td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: '#475569' }}>{g.assignee || '—'}</td>
                    <td style={{ padding: '10px 14px', fontSize: 12, color: '#1a6b3c', fontWeight: 600 }}>
                      {g.high_usd ? formatCurrency(g.high_usd) : g.size || '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
