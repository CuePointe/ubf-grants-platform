import { useState, useCallback, useEffect } from 'react'
import { generateId } from '../lib/helpers.js'

const STORAGE_KEY = 'ubf_grants_v1'

function loadGrants() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveGrants(grants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grants))
  } catch {
    // storage full or unavailable
  }
}

export function useGrants() {
  const [grants, setGrants] = useState(loadGrants)

  useEffect(() => {
    saveGrants(grants)
  }, [grants])

  const addGrant = useCallback((data) => {
    const grant = {
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'Not Started',
      priority: 'medium',
      themes: [],
      ...data,
    }
    setGrants(prev => [grant, ...prev])
    return grant
  }, [])

  const updateGrant = useCallback((id, patch) => {
    setGrants(prev =>
      prev.map(g => g.id === id ? { ...g, ...patch, updatedAt: new Date().toISOString() } : g)
    )
  }, [])

  const deleteGrant = useCallback((id) => {
    setGrants(prev => prev.filter(g => g.id !== id))
  }, [])

  return { grants, addGrant, updateGrant, deleteGrant }
}
