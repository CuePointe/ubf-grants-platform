export function daysLeft(dateStr) {
  if (!dateStr) return null
  const deadline = new Date(dateStr)
  if (isNaN(deadline)) return null
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  deadline.setHours(0, 0, 0, 0)
  return Math.round((deadline - now) / (1000 * 60 * 60 * 24))
}

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr)
  if (isNaN(d)) return dateStr
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function urgencyColor(days) {
  if (days === null) return '#94a3b8'
  if (days < 0)  return '#94a3b8'
  if (days <= 7)  return '#ef4444'
  if (days <= 21) return '#f97316'
  if (days <= 60) return '#eab308'
  return '#22c55e'
}

export function urgencyLabel(days) {
  if (days === null) return 'No deadline'
  if (days < 0)   return 'Overdue'
  if (days === 0) return 'Today!'
  if (days === 1) return '1 day left'
  if (days <= 7)  return `${days} days left`
  if (days <= 21) return `${days} days left`
  return `${days} days`
}

export function statusColor(status) {
  const map = {
    'Not Started':  '#94a3b8',
    'In Progress':  '#3b82f6',
    'Submitted':    '#8b5cf6',
    'Under Review': '#f59e0b',
    'Awarded':      '#22c55e',
    'Rejected':     '#ef4444',
    'On Hold':      '#6b7280',
  }
  return map[status] || '#94a3b8'
}

export function priorityColor(priority) {
  const map = { high: '#ef4444', medium: '#f59e0b', low: '#22c55e' }
  return map[priority] || '#94a3b8'
}

export function formatCurrency(value) {
  if (!value && value !== 0) return '—'
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000)     return `$${(value / 1_000).toFixed(0)}K`
  return `$${value}`
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

export function sortByDeadline(grants) {
  return [...grants].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline) - new Date(b.deadline)
  })
}
