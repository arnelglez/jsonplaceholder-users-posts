import { describe, expect, it } from 'vitest'
import { verifyDemoLogin } from './credentials'

describe('verifyDemoLogin', () => {
  it('accepts admin / admin', () => {
    expect(verifyDemoLogin('admin', 'admin')).toBe(true)
    expect(verifyDemoLogin(' admin ', 'admin')).toBe(true)
  })

  it('rejects invalid credentials', () => {
    expect(verifyDemoLogin('admin', 'wrong')).toBe(false)
    expect(verifyDemoLogin('user', 'admin')).toBe(false)
  })
})
