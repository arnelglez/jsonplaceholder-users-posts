import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PostList } from '~/features/posts/ui/components/PostList'
import { createPostRequest, fetchPostsByUserId } from '~/features/posts/data/api/posts.api'
import { fetchUsers } from '~/features/users/data/api/users.api'
import {
  assertSafeApiPath,
  parsePost,
  parsePosts,
  parseUsers,
} from './validation'

describe('ataques SSRF / path injection', () => {
  it('bloquea query strings extra y encodings', () => {
    expect(() => assertSafeApiPath('/posts?userId=1&evil=2')).toThrow()
    expect(() => assertSafeApiPath('/posts?userId=1%0a')).toThrow()
    expect(() => assertSafeApiPath('/users/%2e%2e/admin')).toThrow()
    expect(() => assertSafeApiPath('https://evil.test/users')).toThrow()
    expect(() => assertSafeApiPath('/users/1/')).toThrow()
  })
})

describe('ataques DoS por listas gigantes', () => {
  it('rechaza arrays de usuarios demasiado grandes', () => {
    const huge = Array.from({ length: 500 }, (_, i) => ({
      id: (i % 10) + 1,
      name: 'x',
      username: 'x',
      email: 'x@x.com',
    }))
    expect(() => parseUsers(huge)).toThrow(/límite/)
  })

  it('rechaza arrays de posts demasiado grandes', () => {
    const huge = Array.from({ length: 500 }, () => ({
      id: 1,
      userId: 1,
      title: 't',
      body: 'b',
    }))
    expect(() => parsePosts(huge)).toThrow(/límite/)
  })
})

describe('ataques IDOR / userId inconsistente', () => {
  it('rechaza POST cuya respuesta apunta a otro usuario', () => {
    expect(() =>
      parsePost({ id: 99, userId: 2, title: 'x', body: 'y' }, 1),
    ).toThrow(/no corresponde/)
  })

  it('filtra posts cuyo userId no coincide con el solicitado', () => {
    const mixed = [
      { id: 1, userId: 1, title: 'a', body: 'a' },
      { id: 2, userId: 2, title: 'b', body: 'b' },
    ]
    const scoped = parsePosts(mixed, 1)
    expect(scoped).toHaveLength(1)
    expect(scoped[0].userId).toBe(1)
  })
})

describe('XSS almacenado vía API (MITM)', () => {
  it('renderiza markup como texto, sin ejecutar scripts', () => {
    const payload = {
      id: 1,
      userId: 1,
      title: '<img src=x onerror="window.__xss=1">',
      body: '<script>window.__xss=2</script>',
    }
    render(
      <PostList posts={[payload]} loading={false} error={null} onRetry={vi.fn()} />,
    )
    expect(screen.getByText(payload.title)).toBeInTheDocument()
    expect(document.querySelector('img[src="x"]')).toBeNull()
    expect(document.querySelector('script')).toBeNull()
    expect((window as Window & { __xss?: number }).__xss).toBeUndefined()
  })
})

describe('cliente fetch endurecido', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('rechaza content-type no JSON (respuesta honeypot)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          url: 'https://jsonplaceholder.typicode.com/users',
          headers: { get: () => 'text/html; charset=utf-8' },
          json: async () => ({}),
        } as unknown as Response),
      ),
    )
    await expect(fetchUsers()).rejects.toThrow(/contenido/)
  })

  it('rechaza origen de respuesta distinto (redirect SSRF)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          url: 'https://evil.test/posts',
          headers: { get: () => 'application/json' },
          json: async () => [],
        } as unknown as Response),
      ),
    )
    await expect(fetchPostsByUserId(1)).rejects.toThrow(/origen/)
  })

  it('rechaza userId fuera de rango en client', () => {
    expect(() => fetchPostsByUserId(99)).toThrow(/no permitido/)
    expect(() =>
      createPostRequest({ title: 't', body: 'b', userId: 99 }),
    ).toThrow(/formulario/)
  })
})
