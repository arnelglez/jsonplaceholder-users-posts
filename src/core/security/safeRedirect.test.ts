import { describe, expect, it } from 'vitest'
import { safeAppRedirectPath } from './safeRedirect'

describe('safeAppRedirectPath', () => {
  it('allows app home and valid user post routes', () => {
    expect(safeAppRedirectPath(undefined)).toBe('/app')
    expect(safeAppRedirectPath('/app')).toBe('/app')
    expect(safeAppRedirectPath('/app/users/3/posts')).toBe('/app/users/3/posts')
  })

  it('blocks open redirect and traversal-style paths', () => {
    expect(safeAppRedirectPath('//evil.com')).toBe('/app')
    expect(safeAppRedirectPath('/login')).toBe('/app')
    expect(safeAppRedirectPath('/app/users/99/posts')).toBe('/app')
    expect(safeAppRedirectPath('/app/users/1/posts/extra')).toBe('/app')
    expect(safeAppRedirectPath('/app\\@evil')).toBe('/app')
  })
})
