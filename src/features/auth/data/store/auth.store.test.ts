import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from './auth.store'

describe('auth store lockout', () => {
  beforeEach(() => {
    useAuthStore.setState({
      isAuthenticated: false,
      failedAttempts: 0,
      lockedUntil: null,
    })
  })

  it('locks out after repeated failed logins', () => {
    for (let i = 0; i < 5; i++) {
      expect(useAuthStore.getState().login('wrong', 'wrong')).toBe(false)
    }
    expect(useAuthStore.getState().isLockedOut()).toBe(true)
    expect(useAuthStore.getState().login('admin', 'admin')).toBe(false)
  })

  it('clears lockout after the window expires', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00Z'))
    for (let i = 0; i < 5; i++) {
      useAuthStore.getState().login('wrong', 'x')
    }
    expect(useAuthStore.getState().isLockedOut()).toBe(true)
    vi.advanceTimersByTime(30_001)
    expect(useAuthStore.getState().isLockedOut()).toBe(false)
    expect(useAuthStore.getState().login('admin', 'admin')).toBe(true)
    vi.useRealTimers()
  })
})
