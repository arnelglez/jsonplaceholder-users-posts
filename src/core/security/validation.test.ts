import { describe, expect, it } from 'vitest'
import {
  assertAllowedUserId,
  assertSafeApiPath,
  parseUser,
  validateCreatePostInput,
} from './validation'

describe('assertSafeApiPath', () => {
  it('acepta rutas permitidas', () => {
    expect(() => assertSafeApiPath('/users')).not.toThrow()
    expect(() => assertSafeApiPath('/posts?userId=3')).not.toThrow()
    expect(() => assertSafeApiPath('/users/5')).not.toThrow()
  })

  it('rechaza traversal y rutas arbitrarias', () => {
    expect(() => assertSafeApiPath('https://evil.test')).toThrow()
    expect(() => assertSafeApiPath('/users/../../../admin')).toThrow()
    expect(() => assertSafeApiPath('/comments')).toThrow()
  })
})

describe('assertAllowedUserId', () => {
  it('solo permite ids del sandbox de JSONPlaceholder', () => {
    expect(() => assertAllowedUserId(1)).not.toThrow()
    expect(() => assertAllowedUserId(10)).not.toThrow()
    expect(() => assertAllowedUserId(0)).toThrow()
    expect(() => assertAllowedUserId(11)).toThrow()
  })
})

describe('parseUser', () => {
  it('rechaza payloads mal formados', () => {
    expect(() => parseUser({ id: '1', name: 'x' })).toThrow()
    expect(() => parseUser(null)).toThrow()
  })
})

describe('validateCreatePostInput', () => {
  it('recorta validación de longitud en título', () => {
    const title = 'a'.repeat(201)
    const result = validateCreatePostInput({ title, body: 'ok', userId: 1 })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.title).toMatch(/200/)
    }
  })
})
