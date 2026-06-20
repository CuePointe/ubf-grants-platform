import { BATCHES } from './constants.js'

// Days remaining until deadline
export const daysLeft = (deadline) => {
  if (!deadline) return null
  return Math.ceil((new Date(deadline) - new Date()) / 86400000)
}

// Urgency badge style based on days remaining
export const urgencyStyle = (days) => {
  if (days === null)  return { bg: '#F5F5F5', color: '#9E9E9E', label: 'No deadline' }
  if (days < 0)       return { bg: '#ECEFF1', color: '#546E7A', label: 'Closed' }
  if (days === 0)     return { bg: '#FFEBEE', color: '#B71C1C', label: 'TODAY!' }
  if (days <= 7)      return { bg: '#FFEBEE', color: '#C62828', label: `${days}d left` }
  if (days <= 21)     return { bg: '#FFF3E0', color: '#E65100', label: `${days}d left` }
  if (days <= 60)     return { bg: '#FFFDE7', color: '#F57F17', label: `${days}d left` }
  return               { bg: '#E8F5E9', color: '#2E7D32', label: `${days}d left` }
}

// Status badge style
export const statusStyle = (status) => ({
  'Not Started':         { bg: '#F5F5F5',  color: '#616161' },
  'In Progress':         { bg: '#E3F2FD',  color: '#1565C0' },
  'Documents Gathering': { bg: '#FFF3E0',  color: '#E65100' },
  'Under Review':        { bg: '#F3E5F5',  color: '#6A1B9A' },
  'Submitted':           { bg: '#E8F5E9',  color: '#2E7D32' },
  'Awarded':             { bg: '#1B5E20',  color: '#FFFFFF' },
  'Rejected':            { bg: '#FFEBEE',  color: '#C62828' },
}[status] || { bg: '#F5F5F5', color: '#616161' })

// Batch style
export const batchStyle = (batch) => BATCHES[batch] || BATCHES[1]

// Classify batch from USD max value
export const classifyBatch = (highUsd) => {
  if (!highUsd || highUsd <= 0) return null
  if (highUsd <= 100000)        return 1
  if (highUsd <= 1000000)       return 2
  return 3
}

// Format currency
export const formatCurrency = (amount) => {
  if (!amount) return '$0'
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000)    return `$${(amount / 1000).toFixed(0)}K`
  return `$${amount}`
}

// Format date to readable
export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    })
  } catch { return dateStr }
}

// Generate unique ID
export const genId = () => Date.now() + Math.random().toString(36).slice(2, 7)

// Priority icon
export const priorityIcon = (p) =>
  p === 'high' ? '🔴' : p === 'medium' ? '🟡' : '🟢'

// Get initials from name
export const initials = (name) =>
  name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
